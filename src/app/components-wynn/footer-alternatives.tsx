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

/* ==========================================================================
   LOADING SKELETON — the H02 loading state, one per variant.

   Renders on the SAME root classes as the real footers (`.login-footer` /
   `.f1f f1f--*`), so the variant chrome (backgrounds, hems, scanlines,
   borders, type family) is real and only the content blocks shimmer.
   Mirrors the real footer grid — brand + 2 directory columns + newsletter +
   legal bar — so the swap to loaded content causes no layout shift.

   a11y: all blocks decorative (aria-hidden); one visually-hidden
   role="status" announces "Loading footer…" to screen readers.
   ========================================================================== */

export type FooterSkeletonVariant =
  | 'Classic'
  | 'Pit Wall'
  | 'Grandstand'
  | 'Telemetry HUD';

const FOOTER_SK_CLASS: Record<FooterSkeletonVariant, string> = {
  Classic: 'login-footer f1fsk f1fsk--classic',
  'Pit Wall': 'f1f f1f--pitwall f1fsk f1fsk--pitwall',
  Grandstand: 'f1f f1f--grandstand f1fsk f1fsk--grandstand',
  'Telemetry HUD': 'f1f f1f--hud f1fsk f1fsk--hud',
};

export function FooterSkeleton({ variant = 'Classic' }: { variant?: FooterSkeletonVariant }) {
  return (
    <footer className={FOOTER_SK_CLASS[variant]}>
      <div className="f1fsk-inner" aria-hidden="true">
        <div className="f1fsk-grid">
          {/* Brand Column */}
          <div className="f1fsk-brand">
            <span className="f1fsk-logo" />
            <span className="f1fsk-bar f1fsk-bar--details" />
            <div className="f1fsk-socials">
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className="f1fsk-social" />
              ))}
            </div>
          </div>

          {/* Directory Columns */}
          {[0, 1].map((i) => (
            <div className="f1fsk-col" key={`sk-col-${i}`}>
              <span className="f1fsk-title" />
              <span className="f1fsk-bar f1fsk-bar--link" />
              <span className="f1fsk-bar f1fsk-bar--link" />
              <span className="f1fsk-bar f1fsk-bar--link" />
              <span className="f1fsk-bar f1fsk-bar--link" />
            </div>
          ))}

          {/* Newsletter Column */}
          <div className="f1fsk-news">
            <span className="f1fsk-bar f1fsk-bar--news-title" />
            <span className="f1fsk-bar f1fsk-bar--desc" />
            <span className="f1fsk-bar f1fsk-bar--desc f1fsk-bar--desc-short" />
            <div className="f1fsk-form">
              <span className="f1fsk-input" />
              <span className="f1fsk-submit" />
            </div>
            <span className="f1fsk-bar f1fsk-bar--terms" />
          </div>
        </div>

        {/* Bottom Legal Notice */}
        <div className="f1fsk-bottom">
          <span className="f1fsk-bar f1fsk-bar--copy" />
          <span className="f1fsk-bar f1fsk-bar--legal" />
        </div>
      </div>

      <span className="components-sr" role="status">
        Loading footer…
      </span>
    </footer>
  );
}
