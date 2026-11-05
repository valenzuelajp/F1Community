import Image from 'next/image';
import type { CSSProperties } from 'react';
import './sponsors-alternatives.css';

/**
 * H05 alternatives — three restyles of the login page sponsors strip
 * (baseline: the live `.login-teams` markup on /login, styles in login.css).
 *
 * Classic renders the live static wrap row as-is. The variants turn the
 * strip into a true scrolling carousel WITHOUT duplicating the logo set:
 * each item is absolutely positioned and animates across the viewport on
 * its own timeline, staggered by a negative animation-delay so the single
 * set forms a continuous right-to-left parade. A restart is invisible
 * because it happens off-screen. The loop never pauses (no hover stop).
 * Shared accessibility upgrades:
 *  - one set only — every logo link stays in the tab order once
 *  - the viewport only ever clips — never a scrollable container
 *    (no reduced-motion pause: showcase specimens always scroll)
 *  - :focus-visible rings on every logo link
 */

const TEAM_SPONSORS = [
  { name: 'Audi F1 Team', href: 'https://audif1.com/', src: '/imgAudi800X800.png' },
  { name: 'Racing Bulls', href: 'https://www.visacashapprb.com/', src: '/imgVcarb800X800.png' },
  { name: 'Alpine', href: 'https://www.alpinecars.com/', src: '/imgAlpine800X800.png' },
  { name: 'Aston Martin', href: 'https://www.astonmartinf1.com/', src: '/imgAston800X800.png' },
  { name: 'Ferrari', href: 'https://www.ferrari.com/en-EN/formula1', src: '/imgFerrari800X800.png' },
  { name: 'Haas', href: 'https://www.haasf1team.com/', src: '/imgHaas800X800.png' },
  { name: 'McLaren', href: 'https://www.mclaren.com/racing/formula-1/', src: '/imgMcLaren800X800.png' },
  { name: 'Mercedes', href: 'https://www.mercedesamgf1.com/', src: '/imgMercedes800X800.png' },
  { name: 'Red Bull Racing', href: 'https://www.redbullracing.com/', src: '/imgRedbull800X8001.png' },
  { name: 'Williams', href: 'https://www.williamsf1.com/', src: '/imgTeamWilliams.png' },
] as const;

/* ==========================================================================
   CLASSIC — the live login markup (`.login-teams*` from login.css).
   ========================================================================== */

export function SponsorsClassic() {
  return (
    <section className="login-teams">
      <h2 className="login-teams-heading">
        TRUSTED BY THE WORLD&apos;S MOST INNOVATIVE TEAMS
      </h2>
      <div className="login-teams-row">
        {TEAM_SPONSORS.map((t) => (
          <a
            key={t.name}
            href={t.href}
            target="_blank"
            rel="noopener noreferrer"
            className="login-team-logo"
            aria-label={`Visit ${t.name} official website`}
          >
            <Image src={t.src} alt={t.name} fill className="object-contain" />
          </a>
        ))}
      </div>
    </section>
  );
}

/* ==========================================================================
   Shared marquee frame for the three animated variants — single item set.
   ========================================================================== */

function SponsorsFrame({ variant }: { variant: 'f1sp--pitwall' | 'f1sp--grandstand' | 'f1sp--hud' }) {
  const heading =
    variant === 'f1sp--pitwall'
      ? 'TRUSTED TEAMS — OFFICIAL PARTNERS'
      : variant === 'f1sp--hud'
        ? '[ SPONSOR ARRAY · TRUSTED TEAMS ]'
        : "TRUSTED BY THE WORLD'S MOST INNOVATIVE TEAMS";

  return (
    <section className={`f1sp ${variant}`}>
      <h2 className="f1sp-heading">
        <span className="f1sp-heading-rule" aria-hidden="true" />
        {heading}
        <span className="f1sp-heading-rule" aria-hidden="true" />
      </h2>
      <div className="f1sp-viewport">
        <ul className="f1sp-group">
          {TEAM_SPONSORS.map((t, i) => (
            <li
              key={t.name}
              className="f1sp-item"
              style={{ '--f1sp-i': i } as CSSProperties}
            >
              {variant === 'f1sp--pitwall' && (
                <span className="f1sp-idx" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
              )}
              <a
                href={t.href}
                target="_blank"
                rel="noopener noreferrer"
                className="f1sp-logo"
                aria-label={`Visit ${t.name} official website`}
              >
                <Image src={t.src} alt={t.name} fill className="object-contain" sizes="80px" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ==========================================================================
   A — PIT WALL: timing-sheet editorial. Calm charcoal, Barlow Semi
   Condensed, index numbering, monochrome logos, slow pit-lane scroll.
   ========================================================================== */

export function SponsorsPitWall() {
  return <SponsorsFrame variant="f1sp--pitwall" />;
}

/* ==========================================================================
   B — GRANDSTAND: velocity. Slipstream hem, Anton display type, skewed
   red speed streaks under each logo, fast scroll.
   ========================================================================== */

export function SponsorsGrandstand() {
  return <SponsorsFrame variant="f1sp--grandstand" />;
}

/* ==========================================================================
   C — TELEMETRY HUD: instrument cluster. Scanlines, notched logo cells,
   glowing red LED edge, Chakra Petch ticker type.
   ========================================================================== */

export function SponsorsTelemetryHud() {
  return <SponsorsFrame variant="f1sp--hud" />;
}

/* ==========================================================================
   LOADING SKELETON — the H05 loading state, one per variant.

   Renders on the SAME root classes as the real strips (`.login-teams` /
   `.f1sp f1sp--*`), so the variant chrome (backgrounds, hems, scanlines,
   flanked heading rules) is real and only the title + logo blocks shimmer.
   One block per real logo (10), sized to the real cells, so the swap to
   loaded content causes no layout shift. Static row — shimmer is the only
   motion while data loads.

   a11y: all blocks decorative (aria-hidden); one visually-hidden
   role="status" announces "Loading sponsor logos…" to screen readers.
   ========================================================================== */

export type SponsorsSkeletonVariant =
  | 'Classic'
  | 'Pit Wall'
  | 'Grandstand'
  | 'Telemetry HUD';

const SPONSORS_SK_CLASS: Record<SponsorsSkeletonVariant, string> = {
  Classic: 'login-teams f1ssk f1ssk--classic',
  'Pit Wall': 'f1sp f1sp--pitwall f1ssk f1ssk--pitwall',
  Grandstand: 'f1sp f1sp--grandstand f1ssk f1ssk--grandstand',
  'Telemetry HUD': 'f1sp f1sp--hud f1ssk f1ssk--hud',
};

export function SponsorsSkeleton({ variant = 'Classic' }: { variant?: SponsorsSkeletonVariant }) {
  return (
    <section className={SPONSORS_SK_CLASS[variant]}>
      <div className="f1ssk-heading" aria-hidden="true">
        <span className="f1ssk-rule" />
        <span className="f1ssk-title" />
        <span className="f1ssk-rule" />
      </div>

      <div className="f1ssk-row" aria-hidden="true">
        {TEAM_SPONSORS.map((t, i) => (
            <span key={t.name} className="f1ssk-item" style={{ '--f1ssk-i': i } as CSSProperties}>
            {variant === 'Pit Wall' && (
              <span className="f1ssk-idx">{String(i + 1).padStart(2, '0')}</span>
            )}
            <span className="f1ssk-logo" />
          </span>
        ))}
      </div>

      <span className="components-sr" role="status">
        Loading sponsor logos…
      </span>
    </section>
  );
}
