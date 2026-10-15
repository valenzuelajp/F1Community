import Image from 'next/image';
import Link from 'next/link';
import './footer-alternatives.css';

/**
 * H02 alternatives — three restyles of the login page footer
 * (baseline: src/components/layout/LoginFooter.tsx, styles in login.css).
 *
 * Same wireframe content as the Classic footer ([Details] / [PAGE] directories,
 * newsletter, legal bottom bar), restyled to pair with the matching H01
 * header variant. Shared accessibility upgrades over the baseline:
 *  - link rows >= 40px tall (WCAG 2.5.8 target size)
 *  - newsletter input/button >= 44px, focus-within ring on the form
 *  - contrast >= 4.5:1 in every state (black text on red fills)
 *  - :focus-visible rings, aria-labelled socials, aria-hidden decorations
 *  - prefers-reduced-motion collapses all animation
 */

const SOCIALS = [
  { label: 'Facebook', icon: '/imgFacebook.svg', href: 'https://facebook.com' },
  { label: 'Twitter', icon: '/imgTwitter.svg', href: 'https://twitter.com' },
  { label: 'Instagram', icon: '/imgInstagram.svg', href: 'https://instagram.com' },
  { label: 'YouTube', icon: '/imgYoutube.svg', href: 'https://youtube.com' },
] as const;

const DIRECTORY_COLS = [0, 1] as const;
const DIRECTORY_LINKS = ['#page1', '#page2', '#page3', '#page4'] as const;

function FooterFrame({ variant }: { variant: 'f1f--pitwall' | 'f1f--grandstand' | 'f1f--hud' }) {
  const numbered = variant === 'f1f--pitwall';

  return (
    <footer className={`f1f ${variant}`}>
      <div className="f1f-inner">
        <div className="f1f-grid">
          {/* Brand Column */}
          <div className="f1f-brand">
            <div className="f1f-logo">
              <Image
                src="/imgLogoContainer.png"
                alt="Formula 1 Logo"
                fill
                sizes="140px"
                className="object-contain object-left"
              />
            </div>
            <span className="f1f-details">[Details]</span>
            <div className="f1f-socials">
              {SOCIALS.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="f1f-social"
                  aria-label={s.label}
                >
                  <Image src={s.icon} alt="" width={14} height={14} />
                </Link>
              ))}
            </div>
          </div>

          {/* Directory Columns */}
          {DIRECTORY_COLS.map((i) => (
            <div className="f1f-links" key={`col-${i}`}>
              <h3 className="f1f-col-title">
                {numbered ? (
                  <span className="f1f-idx" aria-hidden="true">
                    {`0${i + 1}`}
                  </span>
                ) : null}
                [PAGE]
              </h3>
              {DIRECTORY_LINKS.map((href) => (
                <Link href={href} className="f1f-link" key={href}>
                  [Page]
                </Link>
              ))}
            </div>
          ))}

          {/* Newsletter Column */}
          <div className="f1f-newsletter">
            <h3 className="f1f-news-title">JOIN THE NEWSLETTER</h3>
            <p className="f1f-news-desc">
              Subscribe for exclusive drop access and pre-season testing details.
            </p>
            <form action="#newsletter" className="f1f-news-form">
              <input
                type="email"
                placeholder="Enter your email address..."
                className="f1f-news-input"
                aria-label="Email address for newsletter"
              />
              <button type="submit" className="f1f-news-btn">
                SUBSCRIBE
              </button>
            </form>
            <p className="f1f-news-terms">
              By subscribing, you agree to our Privacy Policy and Terms of Use.
            </p>
          </div>
        </div>

        {/* Bottom Legal Notice */}
        <div className="f1f-bottom">
          <p className="f1f-copy">
            © 2026 Formula One Digital Media Limited. Merchandise Wireframe Proposal. All Rights Reserved.
          </p>
          <div className="f1f-legal">
            <Link href="#privacy">Privacy Policy</Link>
            <span aria-hidden="true">.</span>
            <Link href="#terms">Terms of Use</Link>
            <span aria-hidden="true">.</span>
            <Link href="#cookies">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ==========================================================================
   A — PIT WALL: refined telemetry editorial. Timing-sheet numbering,
   red slab states, calm density — pairs with the Pit Wall header.
   ========================================================================== */

export function FooterPitWall() {
  return <FooterFrame variant="f1f--pitwall" />;
}

/* ==========================================================================
   B — GRANDSTAND: velocity. Anton display type, slipstream hem on the top
   edge, forward-leaning streaks — pairs with the Grandstand header.
   ========================================================================== */

export function FooterGrandstand() {
  return <FooterFrame variant="f1f--grandstand" />;
}

/* ==========================================================================
   C — TELEMETRY HUD: instrument cluster. Scanlines, notched panels, LED
   markers, ticker bottom bar — pairs with the Telemetry HUD header.
   ========================================================================== */

export function FooterTelemetryHud() {
  return <FooterFrame variant="f1f--hud" />;
}
