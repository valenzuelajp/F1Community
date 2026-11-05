import { NAV_LINKS } from "./SiteNavbar";
import { Wordmark } from "./Wordmark";
import "./site-shell.css";

/**
 * Shared site footer (content pages only — login/register keep own footers).
 * Solid panel block: chequer divider, text wordmark, real nav links,
 * unofficial fan-project disclaimer. Pinned to the viewport bottom by
 * `margin-top: auto` inside the flex-column `.page` shell.
 */
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="chequer" aria-hidden="true" />
      <div className="site-footer__inner">
        <Wordmark />
        <nav className="site-footer__nav" aria-label="Footer">
          {NAV_LINKS.map((link) => (
            <a key={link.href} className="site-footer__nav-link" href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <p className="site-footer__disclaimer">
          Unofficial fan project. Not affiliated with Formula 1, Formula One
          Digital Media Limited, or the FIA.
        </p>
      </div>
    </footer>
  );
}
