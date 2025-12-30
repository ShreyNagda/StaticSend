// Simple in-memory rate limiter for Next.js Edge/serverless API routes
// For production, use a distributed store like Redis

const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5; // max requests per window per IP

const ipMap = new Map<string, { count: number; start: number }>();

export function rateLimit(ip: string): {
  success: boolean;
  remaining: number;
  reset: number;
} {
  const now = Date.now();
  const entry = ipMap.get(ip);
  if (!entry || now - entry.start > WINDOW_MS) {
    ipMap.set(ip, { count: 1, start: now });
    return {
      success: true,
      remaining: MAX_REQUESTS - 1,
      reset: now + WINDOW_MS,
    };
  }
  if (entry.count < MAX_REQUESTS) {
    entry.count++;
    return {
      success: true,
      remaining: MAX_REQUESTS - entry.count,
      reset: entry.start + WINDOW_MS,
    };
  }
  return { success: false, remaining: 0, reset: entry.start + WINDOW_MS };
}
