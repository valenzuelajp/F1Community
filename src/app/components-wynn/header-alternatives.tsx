import Image from 'next/image';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import './header-alternatives.css';

/**
 * H01 alternatives — three restyles of the Login Navigation Bar
 * (baseline: src/components/layout/LoginNavHeader.tsx).
 *
 * Shared accessibility upgrades over the baseline:
 *  - links/pills are >= 44px tall (WCAG 2.5.8 target size)
 *  - link text >= 12.8px, contrast >= 4.5:1 in every state
 *  - real <ul>/<li> nav markup + aria-current="page" on the active item
 *  - :focus-visible rings instead of hover-only affordances
 *  - decorative dividers/brackets hidden from the a11y tree
 *  - prefers-reduced-motion collapses all animation
 */

const NAV_ITEMS = [
  { label: 'Home', href: '/home' },
  { label: 'Schedules', href: '#schedules' },
  { label: 'News', href: '#news' },
  { label: 'Store', href: '#store' },
] as const;

function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/home"
      className={`f1h-logo ${className ?? ''}`.trim()}
      aria-label="Formula 1 home"
    >
      <Image
        src="/imgLogoContainer.png"
        alt=""
        fill
        sizes="(max-width: 640px) 130px, 155px"
        priority
      />
    </Link>
  );
}

/* ==========================================================================
   A — PIT WALL: refined telemetry editorial.
   Timing-sheet numbering, red slab underline for state, calm density.
   ========================================================================== */

export function HeaderPitWall() {
  return (
    <header className="f1h f1h--pitwall">
      <div className="f1h-inner">
        <Logo />

        <nav aria-label="Primary" className="f1h-nav">
          <ul className="f1h-nav-list">
            {NAV_ITEMS.map((item, i) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="f1h-link"
                  aria-current={i === 0 ? 'page' : undefined}
                >
                  <span className="f1h-idx" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="f1h-actions">
          <Link href="#sale" className="f1h-cta">
            Sale
          </Link>
          <button type="button" className="f1h-menu">
            <Menu className="h-4 w-4" aria-hidden="true" />
            <span>Menu</span>
          </button>
        </div>
      </div>
    </header>
  );
}

/* ==========================================================================
   B — GRANDSTAND: race-day maximalism.
   Anton display type, hard-skewed pills with offset blocks, checkered hem,
   staggered load-in (motion-gated).
   ========================================================================== */

export function HeaderGrandstand() {
  return (
    <header className="f1h f1h--grandstand">
      <div className="f1h-inner">
        <Logo />

        <nav aria-label="Primary" className="f1h-nav">
          <ul className="f1h-nav-list">
            {NAV_ITEMS.map((item, i) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="f1h-link"
                  aria-current={i === 0 ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="f1h-actions">
          <Link href="#sale" className="f1h-cta">
            <span>Sale</span>
          </Link>
          <button type="button" className="f1h-menu">
            <Menu className="h-4 w-4" aria-hidden="true" />
            <span>Menu</span>
          </button>
        </div>
      </div>
    </header>
  );
}

/* ==========================================================================
   C — TELEMETRY HUD: pit-wall instrument cluster.
   Bracketed links, pulsing LED, scanline texture, notched action boxes,
   live timing strip.
   ========================================================================== */

export function HeaderTelemetryHud() {
  return (
    <header className="f1h f1h--hud">
      <div className="f1h-inner">
        <Logo />

        <nav aria-label="Primary" className="f1h-nav">
          <ul className="f1h-nav-list">
            {NAV_ITEMS.map((item, i) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="f1h-link"
                  aria-current={i === 0 ? 'page' : undefined}
                >
                  <span className="f1h-bracket" aria-hidden="true">
                    [
                  </span>
                  {item.label}
                  <span className="f1h-bracket" aria-hidden="true">
                    ]
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="f1h-actions">
          <Link href="#sale" className="f1h-cta">
            <span className="f1h-cta-led" aria-hidden="true" />
            <span>Sale</span>
          </Link>
          <button type="button" className="f1h-menu">
            <Menu className="h-4 w-4" aria-hidden="true" />
            <span>Menu</span>
          </button>
        </div>
      </div>

      {/* Live-timing ticker: its own strip under the bar, not jammed in the nav */}
      <div className="f1h-ticker" aria-hidden="true">
        <span className="f1h-ticker-cell f1h-ticker-cell--live">
          <span className="f1h-led" />
          Live
        </span>
        <span className="f1h-ticker-cell">R21 · Suzuka</span>
        <span className="f1h-ticker-cell">Lap 12/53</span>
        <span className="f1h-ticker-cell">Air 24°C</span>
        <span className="f1h-ticker-cell">Track 38°C</span>
        <span className="f1h-ticker-cell f1h-ticker-cell--muted">
          DRS Enabled
        </span>
      </div>
    </header>
  );
}

/* ==========================================================================
   LOADING SKELETON — the H01 loading state, one per variant.

   Renders on the SAME root classes as the real headers (`.login-header` /
   `.f1h f1h--*`), so the variant chrome (backgrounds, hems, scanlines,
   borders, bar height) is real and only the content blocks shimmer.
   Geometry mirrors the real bar — logo / 4 nav links / Sale + Menu pills —
   so the swap to loaded content causes no layout shift. The HUD variant
   keeps its ticker strip skeletonized too.

   a11y: all blocks decorative (aria-hidden); one visually-hidden
   role="status" announces "Loading navigation…" to screen readers.
   ========================================================================== */

export type HeaderSkeletonVariant =
  | 'Classic'
  | 'Pit Wall'
  | 'Grandstand'
  | 'Telemetry HUD';

const HEADER_SK_CLASS: Record<HeaderSkeletonVariant, string> = {
  Classic: 'login-header f1hsk f1hsk--classic',
  'Pit Wall': 'f1h f1h--pitwall f1hsk f1hsk--pitwall',
  Grandstand: 'f1h f1h--grandstand f1hsk f1hsk--grandstand',
  'Telemetry HUD': 'f1h f1h--hud f1hsk f1hsk--hud',
};

const TICKER_CELL_WIDTHS = [48, 64, 56, 44, 72, 52] as const;

export function HeaderSkeleton({ variant = 'Classic' }: { variant?: HeaderSkeletonVariant }) {
  return (
    <header className={HEADER_SK_CLASS[variant]}>
      <div className="f1hsk-inner" aria-hidden="true">
        <span className="f1hsk-logo" />
        <span className="f1hsk-links">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="f1hsk-link" />
          ))}
        </span>
        <span className="f1hsk-actions">
          <span className="f1hsk-pill f1hsk-pill--cta" />
          <span className="f1hsk-pill f1hsk-pill--menu" />
        </span>
      </div>

      {variant === 'Telemetry HUD' && (
        <div className="f1hsk-ticker" aria-hidden="true">
          {TICKER_CELL_WIDTHS.map((w, i) => (
            <span key={i} className="f1hsk-ticker-cell">
              {i === 0 && <span className="f1hsk-led" />}
              <span className="f1hsk-ticker-bar" style={{ width: w }} />
            </span>
          ))}
        </div>
      )}

      <span className="components-sr" role="status">
        Loading navigation…
      </span>
    </header>
  );
}
