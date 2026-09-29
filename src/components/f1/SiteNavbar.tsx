import Image from "next/image";
import Link from "next/link";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { MobileMenu } from "./MobileMenu";
import "./site-navbar.css";

/** Real routes in the navbar (mockup order). */
export const NAV_LINKS = [
  { href: "/home", label: "Home" },
  { href: "/schedule", label: "Schedule" },
  { href: "/standings", label: "Standings" },
  { href: "/news", label: "News" },
  { href: "/teams", label: "Teams" },
  { href: "/drivers", label: "Drivers" },
  { href: "/new-to-f1", label: "New to F1?" },
];

/**
 * Shared sticky navbar (home/schedule/standings/news/teams/drivers/new-to-f1).
 * Logo is always visible; on phones the links live behind the
 * hamburger menu, on larger screens they render inline.
 * The Log out button stays visible on every screen size.
 */
export function SiteNavbar() {
  return (
    <header className="site-navbar">
      <div className="site-navbar__inner">
        <Link href="/home" className="site-navbar__logo" aria-label="F1 Store home">
          <Image
            src="/imgLogoF1.png"
            alt="Formula 1 Logo"
            fill
            sizes="(max-width: 640px) 116px, (max-width: 1024px) 130px, 145px"
            className="object-contain object-left"
            priority
          />
        </Link>
        <nav className="site-navbar__links" aria-label="Site">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="site-navbar__link">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="site-navbar__actions">
          <LogoutButton />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
