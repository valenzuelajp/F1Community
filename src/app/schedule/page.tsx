import type { Metadata } from "next";
import { SiteNavbar } from "@/components/f1/SiteNavbar";
import { Countdown } from "@/components/f1/Countdown";
import { getNextF1Event } from "@/lib/f1/jolpica";
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
export default async function SchedulePage() {
  const event = await getNextF1Event();

  return (
    <main className="page font-sans selection:bg-[#ff1801] selection:text-white">
      <div className="page__glow" />
      <SiteNavbar />
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
    </main>
  );
}
