import type { Metadata } from "next";
import { SiteNavbar } from "@/components/f1/SiteNavbar";
import { SiteTicker } from "@/components/f1/SiteTicker";
import { SiteFooter } from "@/components/f1/SiteFooter";
import { Countdown } from "@/components/f1/Countdown";
import { getNextF1Event, getSeasonCalendar } from "@/lib/f1/jolpica";
import "../home/home.css";

export const metadata: Metadata = {
  title: "F1 Schedule – Formula 1 Merchandise",
  description: "The next Formula 1 Grand Prix: circuit, countdown, and session start in your local time.",
  openGraph: {
    title: "F1 Schedule – Formula 1 Merchandise",
    description: "The next Formula 1 Grand Prix: circuit, countdown, and session start.",
    url: "https://f1store.com/schedule",
  },
  alternates: {
    canonical: "https://f1store.com/schedule",
  },
};

/**
 * Schedule page — the next Grand Prix up close.
 * Renders the countdown only when a real session date exists.
 */

/** "Sun 13:00 UTC" — server-safe, no time-zone hydration risk. */
function formatSessionTime(iso: string): string {
  const d = new Date(iso);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${days[d.getUTCDay()]} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())} UTC`;
}
/** "20 Sep" — server-safe UTC date, no hydration risk. */
function formatRaceDate(iso: string): string {
  const d = new Date(iso);
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return `${d.getUTCDate()} ${months[d.getUTCMonth()]}`;
}
export default async function SchedulePage() {
  const event = await getNextF1Event();

  // Additive section: the page survives without it if the API is down.
  let calendar: Awaited<ReturnType<typeof getSeasonCalendar>> | null = null;
  try {
    calendar = await getSeasonCalendar();
  } catch {
    calendar = null;
  }

  return (
    <main className="page font-sans selection:bg-[#ff1801] selection:text-white">
      <div className="page__glow" />
      <SiteNavbar />
      <SiteTicker />
      <section className="home-section">
        <div className="home-section__inner">
          <p className="home-section__eyebrow">
            Round {event.round} of {event.totalRounds} · Season {event.season}
          </p>
          <h1 className="home-section__title">{event.raceName}</h1>
          <p className="home-section__subtext">
            {event.circuitName} · {event.locality}, {event.country}
          </p>
          {event.isLive ? (
            <p className="home-live-pill">Live now</p>
          ) : event.nextSessionStart ? (
            <Countdown
              target={event.nextSessionStart}
              className="home-countdown"
              showStartTime
            />
          ) : (
            <p className="home-muted">
              {event.seasonOver ? "Season complete — see you next year." : "Schedule unavailable right now."}
            </p>
          )}
        </div>
      </section>
      {event.sessions.length > 0 && (
        <section className="home-section" aria-label="Weekend schedule">
          <div className="home-section__inner">
            <p className="home-section__eyebrow">Weekend schedule</p>
            <h2 className="home-section__title">Every session</h2>
            <ol className="timeline">
              {event.sessions.map((s) => (
                <li
                  key={`${s.label}-${s.start}`}
                  className={`timeline__row timeline__row--${s.state}`}
                >
                  <span className="timeline__dot" aria-hidden="true" />
                  <span className="timeline__label">{s.label}</span>
                  <span className="timeline__time">{formatSessionTime(s.start)}</span>
                  <span className="timeline__state">
                    {s.state === "live" ? "Live" : s.state === "done" ? "Done" : "Upcoming"}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}
      {calendar && calendar.races.length > 0 && (
        <section className="home-section" aria-label="Season calendar">
          <div className="home-section__inner">
            <p className="home-section__eyebrow">Season {calendar.season}</p>
            <h2 className="home-section__title">Full calendar</h2>
            <ol className="calendar">
              {calendar.races.map((race) => (
                <li
                  key={race.round}
                  className={`calendar__row calendar__row--${race.status}`}
                >
                  <span className="calendar__round">{race.round}</span>
                  <span className="calendar__main">
                    <span className="calendar__name">{race.raceName}</span>
                    <span className="calendar__circuit">
                      {race.circuitName} · {race.locality}, {race.country}
                    </span>
                  </span>
                  <span className="calendar__date">
                    {race.start ? formatRaceDate(race.start) : "TBA"}
                  </span>
                  <span className="calendar__status">
                    {race.status === "completed" ? "Done" : "Upcoming"}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}
      <SiteFooter />
    </main>
  );
}
