"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { NAV_LINKS } from "./SiteNavbar";

/**
 * Hamburger menu below 900px for the site navbar.
 * Opens a dropdown panel directly below the bar with the section
 * links and the Log out button.
 * 900px and up keep the inline links row, so this renders nothing there.
 *
 * NOTE: the panel is position:absolute (NOT fixed) on purpose — the
 * navbar uses backdrop-filter, which traps fixed descendants inside
 * the bar. A fullscreen fixed overlay can never work from in here.
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
    };
  }, [open ]);

  return (
    <>
      <button
        type="button"
        className="mobile-menu__button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="mobile-menu__bar" />
        <span className="mobile-menu__bar" />
        <span className="mobile-menu__bar" />
      </button>

      {open && (
        <div id="mobile-menu" className="mobile-menu__panel" role="dialog" aria-modal="false" aria-label="Site menu">
          <button
            type="button"
            className="mobile-menu__close"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>
          <nav className="mobile-menu__links" aria-label="Site">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="mobile-menu__link"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <LogoutButton className="mobile-menu__logout" />
        </div>
      )}
    </>
  );
}
