"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { Button } from "../shared/button";
import { AsyncButton } from "../shared/async-button";

export default function SignOutButton() {
  return (
    <AsyncButton
      variant="ghost"
      onClick={() => signOut({ callbackUrl: "/" })}
      className="p-2 text-gray-500 hover:text-red-600 rounded-lg transition-colors gap-2"
      title="Sign out"
    >
      <LogOut size={18} />
    </AsyncButton>
  );
}
