import Image from 'next/image';
import type { CSSProperties } from 'react';
import type { F1StandingDriver } from '@/lib/f1/jolpica';
import './standings-alternatives.css';

/**
 * H03 alternatives — three restyles of the Championship Standings
 * (baseline: the live `.login-podium` markup on /login, styles in login.css).
 *
 * Classic renders the original login markup via the shared `.login-podium*`
 * classes; the variants re-skin the same data to pair with the matching H01
 * header / H02 footer variant. Shared accessibility upgrades in the variants:
 *  - real <ol> semantics + screen-reader position text
 *  - contrast >= 4.5:1 in every state (red on black, not white on red)
 *  - portraits decorative (alt="") — the driver is already named in text
 */

const TEAM_ACCENTS: Record<string, string> = {
  Mercedes: '#27f4d2',
  Ferrari: '#e8002d',
  'Red Bull Racing': '#3671c6',
  McLaren: '#ff8000',
  'Aston Martin': '#229971',
  Alpine: '#0093cc',
  Williams: '#64c4ff',
  'Racing Bulls': '#6692ff',
  'Haas F1 Team': '#b6babd',
  Sauber: '#52e252',
  'Kick Sauber': '#52e252',
};

/* ==========================================================================
   CLASSIC — the live login markup (`.login-podium*` from login.css).
   ========================================================================== */

export function StandingsClassic({
  drivers,
  season,
}: {
  drivers: F1StandingDriver[];
  season: string | number;
}) {
  if (drivers.length === 0) return null;

  return (
    <section aria-label="Top 3 championship drivers" className="login-podium">
      <h2 className="login-podium-title">TOP 3 — {season} CHAMPIONSHIP</h2>
      <div className="login-podium-row">
        {drivers.map((driver) => (
          <div
            key={driver.code}
            className={`login-podium-cell login-podium-cell--${driver.position}`}
          >
            <span className="login-podium-info">
              <span className="login-podium-name">{driver.name.toUpperCase()}</span>
              <span className="login-podium-team">{driver.team.toUpperCase()}</span>
              <span className="login-podium-points">
                {driver.points} <span className="login-podium-pts">PTS</span>
              </span>
            </span>
            {driver.photo && (
              <span className="login-podium-photo">
                <Image
                  src={driver.photo}
                  alt={`${driver.name} portrait`}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 112px, (min-width: 640px) 96px, 72px"
                />
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

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
