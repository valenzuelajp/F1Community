import Image from 'next/image';
import type { CSSProperties } from 'react';
import type { F1StandingDriver } from '@/lib/f1/jolpica';
import { TEAM_ACCENTS } from '@/components/f1/ChampionshipStandings';
import './standings-alternatives.css';

/**
 * H03 alternatives — three restyles of the Championship Standings
 * (baseline: src/components/f1/ChampionshipStandings.tsx).
 *
 * Same data shape as the Classic; restyled to pair with the matching H01
 * header / H02 footer variant. Shared accessibility upgrades over the
 * baseline:
 *  - real <ol> semantics + screen-reader position text, decorative rank
 *    kept out of the a11y tree
 *  - contrast >= 4.5:1 in every state (red on black, not white on red)
 *  - portraits decorative (alt="") — the driver is already named in text
 *  - prefers-reduced-motion honoured on every animation / transform
 */

function StandingsFrame({
  variant,
  drivers,
  season,
}: {
  variant: 'f1st--pitwall' | 'f1st--grandstand' | 'f1st--hud';
  drivers: F1StandingDriver[];
  season: string | number;
}) {
  if (drivers.length === 0) return null;

  return (
    <section aria-label="Top championship drivers" className={`f1st ${variant}`}>
      <h2 className="f1st-title">
        <span className="f1st-title-rule" aria-hidden="true" />
        TOP 3 — {season} CHAMPIONSHIP
        <span className="f1st-title-rule" aria-hidden="true" />
      </h2>
      <ol className="f1st-row">
        {drivers.map((driver) => {
          const accent = TEAM_ACCENTS[driver.team] ?? 'rgba(255, 255, 255, 0.35)';
          return (
            <li
              key={driver.code}
              className={`f1st-cell f1st-cell--${driver.position}`}
              style={{ '--team-c': accent } as CSSProperties}
            >
              <span className="f1st-rank" aria-hidden="true">
                {String(driver.position).padStart(2, '0')}
              </span>
              <span className="f1st-info">
                <span className="f1st-sr">Position {driver.position}.</span>
                <span className="f1st-name">{driver.name.toUpperCase()}</span>
                <span className="f1st-team">{driver.team.toUpperCase()}</span>
                <span className="f1st-points">
                  {driver.points} <span className="f1st-pts">PTS</span>
                </span>
              </span>
              {driver.photo && (
                <span className="f1st-photo">
                  <Image
                    src={driver.photo}
                    alt=""
                    fill
                    className="object-cover object-top"
                    sizes="(min-width: 640px) 100px, 84px"
                  />
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}

/* ==========================================================================
   A — PIT WALL: timing-sheet editorial. Small red index numbers, gold /
   silver / bronze slab on the left edge, monochrome portraits.
   ========================================================================== */

export function StandingsPitWall({
  drivers,
  season,
}: {
  drivers: F1StandingDriver[];
  season: string | number;
}) {
  return <StandingsFrame variant="f1st--pitwall" drivers={drivers} season={season} />;
}

/* ==========================================================================
   B — GRANDSTAND: velocity. Solid red ranks leaning forward, Anton display
   type, team-colour speed streaks under the names.
   ========================================================================== */

export function StandingsGrandstand({
  drivers,
  season,
}: {
  drivers: F1StandingDriver[];
  season: string | number;
}) {
  return <StandingsFrame variant="f1st--grandstand" drivers={drivers} season={season} />;
}

/* ==========================================================================
   C — TELEMETRY HUD: instrument cluster. Notched panels, LED team strip,
   bracketed names, tabular timing numbers.
   ========================================================================== */

export function StandingsTelemetryHud({
  drivers,
  season,
}: {
  drivers: F1StandingDriver[];
  season: string | number;
}) {
  return <StandingsFrame variant="f1st--hud" drivers={drivers} season={season} />;
}
