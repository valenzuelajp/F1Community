import Image from 'next/image';
import type { CSSProperties } from 'react';
import type { F1StandingDriver } from '@/lib/f1/jolpica';

/**
 * Championship leaderboard (top 3 by points) — used by the login page and
 * the H03 specimen on /components-wynn.
 *
 * Each cell carries its constructor's colour as a top-edge accent, an
 * outlined position number (gold / silver / bronze for P1-3), and the
 * driver portrait fading into the card. Data comes from the Jolpica
 * driverstandings API (ISR hourly) via `getTopDrivers`.
 */

export const TEAM_ACCENTS: Record<string, string> = {
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

export function ChampionshipStandings({
  drivers,
  season,
}: {
  drivers: F1StandingDriver[];
  season: string | number;
}) {
  if (drivers.length === 0) return null;

  return (
    <section aria-label="Top championship drivers" className="login-podium">
      <h2 className="login-podium-title">
        <span className="login-podium-title-rule" aria-hidden="true" />
        TOP 3 — {season} CHAMPIONSHIP
        <span className="login-podium-title-rule" aria-hidden="true" />
      </h2>
      <ol className="login-podium-row">
        {drivers.map((driver) => {
          const accent = TEAM_ACCENTS[driver.team] ?? 'rgba(255, 255, 255, 0.35)';
          return (
            <li
              key={driver.code}
              className={`login-podium-cell login-podium-cell--${driver.position}`}
              style={{ '--team-c': accent } as CSSProperties}
            >
              <span className="login-podium-rank" aria-hidden="true">
                {String(driver.position).padStart(2, '0')}
              </span>
              <span className="login-podium-info">
                <span className="login-podium-sr">Position {driver.position}.</span>
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
                    className="object-cover object-top"
                    sizes="(min-width: 1024px) 120px, (min-width: 640px) 96px, 80px"
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
