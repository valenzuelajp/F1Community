import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";

/**
 * Top navigation header used by the F1 Login page.
 *
 * Black bar with the F1 logo, uppercase primary links (HOME / SCHEDULES /
 * NEWS / STORE) split by vertical dividers, plus the SALE and MENU pills.
 * Styles live in `src/app/login/login.css` (`.login-header*`).
 */
export function LoginNavHeader() {
  return (
    <header className="login-header">
      <div className="login-header-inner">
        {/* F1 Official Logo */}
        <Link href="/home" className="login-logo" aria-label="Formula 1 Home">
          <Image
            src="/imgLogoContainer.png"
            alt="Formula 1 Logo"
            fill
            sizes="(max-width: 640px) 130px, 155px"
            className="object-contain object-left"
            priority
          />
        </Link>

        {/* Primary Navigation Links with Vertical Dividers */}
        <nav aria-label="Primary navigation" className="login-nav">
          <div className="login-nav-items">
            <Link href="/home" className="login-nav-link">
              HOME
            </Link>
            <span className="login-nav-divider" aria-hidden="true" />
            <Link href="#schedules" className="login-nav-link">
              SCHEDULES
            </Link>
            <span className="login-nav-divider" aria-hidden="true" />
            <Link href="#news" className="login-nav-link">
              NEWS
            </Link>
            <span className="login-nav-divider" aria-hidden="true" />
            <Link href="#store" className="login-nav-link">
              STORE
            </Link>
          </div>
        </nav>

        {/* Header Action Buttons: SALE & MENU */}
        <div className="login-header-actions">
          <Link href="#sale" className="login-sale-pill">
            <span className="login-sale-led" aria-hidden="true" />
            <span>SALE</span>
          </Link>
          <button
            type="button"
            aria-label="Open menu"
            className="login-menu-pill"
          >
            <Menu className="h-4 w-4" aria-hidden="true" />
            <span>MENU</span>
          </button>
        </div>
      </div>
    </header>
  );
}
