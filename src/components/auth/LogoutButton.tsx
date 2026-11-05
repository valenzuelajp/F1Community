"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";

/**
 * Log out button (used in the site navbar).
 * Signs out via NextAuth, then lands on `/login`.
 */
export function LogoutButton({ className }: { className?: string }) {
  const [busy, setBusy] = useState(false);

  return (
    <button
      type="button"
      disabled={busy}
      onClick={() => {
        setBusy(true);
        void signOut({ callbackUrl: "/login" });
      }}
      className={className ?? "site-navbar__logout"}
    >
      {busy ? "Signing out…" : "Log out"}
    </button>
  );
}
