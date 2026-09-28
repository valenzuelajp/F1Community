import Image from "next/image";
import Link from "next/link";
import { LogoutButton } from "@/components/auth/LogoutButton";
import "./site-navbar.css";

/** Real routes in the navbar. Store/Sale stay "soon" pills (no pages yet). */
const NAV_LINKS = [
  { href: "/home", label: "Home" },
  { href: "/news", label: "News" },
  { href: "/schedule", label: "Schedule" },
  { href: "/standings", label: "Standings" },
];

/**
 * Shared sticky navbar (home/news/schedule/standings).
 * Logo is always visible; section links collapse below 640px;
 * the Log out button stays visible on every screen size.
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
            sizes="(max-width: 640px) 180px, (max-width: 1024px) 196px, 208px"
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
          <span className="site-navbar__soon" title="Coming soon">Store</span>
          <span className="site-navbar__soon" title="Coming soon">Sale</span>
        </nav>
        <LogoutButton />
      </div>
    </header>
  );
}
