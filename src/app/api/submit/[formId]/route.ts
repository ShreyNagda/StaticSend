import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Form from "@/models/Form";
import Submission from "@/models/Submission";
import User from "@/models/User";
import { sendEmail } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";
import { getSubmissionNotificationEmailTemplate } from "@/lib/email-templates";

export async function OPTIONS(
  req: Request,
  { params }: { params: Promise<{ formId: string }> }
) {
  const { formId } = await params;
  let corsOrigin = "*";
  try {
    await connectDB();
    const form = await Form.findById(formId);
    const reqOrigin = req.headers.get("origin");
    if (
      form &&
      Array.isArray(form.allowedUrls) &&
      form.allowedUrls.length > 0
    ) {
      if (reqOrigin && form.allowedUrls.includes(reqOrigin)) {
        corsOrigin = reqOrigin;
      }
    }
  } catch {}
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": corsOrigin,
      "Access-Control-Allow-Methods": "POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ formId: string }> }
) {
  // Get IP address from request headers (works for Vercel/Next.js)
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  const limit = rateLimit(ip);
  if (!limit.success) {
    return NextResponse.json(
      { message: `Too many requests. Try again later.` },
      {
        status: 429,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Retry-After": Math.ceil(
            (limit.reset - Date.now()) / 1000
          ).toString(),
        },
      }
    );
  }

  let corsOrigin = "*";
  try {
    const { formId } = await params;

    // Parse body based on content type
    const contentType = req.headers.get("content-type") || "";
    let data: Record<string, unknown> = {};

    if (contentType.includes("application/json")) {
      data = await req.json();
    } else if (
      contentType.includes("application/x-www-form-urlencoded") ||
      contentType.includes("multipart/form-data")
    ) {
      const formData = await req.formData();
      formData.forEach((value, key) => {
        data[key] = value;
      });
    }

    await connectDB();

    const form = await Form.findById(formId);
    if (!form || !form.isActive) {
      return NextResponse.json(
        { message: "Form not found or inactive" },
        { status: 404 }
      );
    }

    // Determine CORS origin
    const reqOrigin = req.headers.get("origin");
    const normalize = (url: string) =>
      url.trim().replace(/\/+$/, "").toLowerCase();
    const reqOriginNorm = reqOrigin ? normalize(reqOrigin) : "";
    const allowed = Array.isArray(form.allowedUrls)
      ? form.allowedUrls.map(normalize)
      : [];
    const isStaticSend = reqOriginNorm.endsWith("staticsend.vercel.app");
    console.log(
      "Request Origin:",
      reqOrigin,
      "Allowed URLs:",
      form.allowedUrls
    );
    if (allowed.length > 0) {
      if ((reqOriginNorm && allowed.includes(reqOriginNorm)) || isStaticSend) {
        corsOrigin = reqOrigin || "*";
      } else {
        // Not allowed
        return NextResponse.json(
          {
            message: "Origin not allowed",
            debug: { reqOrigin, allowedUrls: form.allowedUrls },
          },
          { status: 403, headers: { "Access-Control-Allow-Origin": "*" } }
        );
      }
    }

    // Create submission
    await Submission.create({
      formId,
      data,
    });

    // Send email notification if enabled
    if (form.settings.emailNotifications) {
      const user = await User.findById(form.userId);
      if (user && user.email) {
        // Format data for email
        const dataHtml = Object.entries(data)
          .map(([key, value]) => `<strong>${key}:</strong> ${value}`)
          .join("<br>");

        await sendEmail({
          to: user.email,
          subject: `New submission for ${form.name}`,
          html: getSubmissionNotificationEmailTemplate(
            form.name,
            formId,
            dataHtml
          ),
        });
      }
    }

    return NextResponse.json(
      { message: "Submission received successfully" },
      { status: 200, headers: { "Access-Control-Allow-Origin": corsOrigin } }
    );
  } catch (error) {
    console.error("Submission error:", error);
    // fallback to '*' if corsOrigin is not set
    return NextResponse.json(
      { message: "Something went wrong" },
      {
        status: 500,
        headers: { "Access-Control-Allow-Origin": corsOrigin || "*" },
      }
    );
  }
}
