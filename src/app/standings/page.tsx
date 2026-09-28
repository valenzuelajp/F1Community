import type { Metadata } from "next";
import { SiteNavbar } from "@/components/f1/SiteNavbar";
import { getTopDrivers } from "@/lib/f1/jolpica";
import "../home/home.css";

export const metadata: Metadata = {
  title: "F1 Standings – Formula 1 Merchandise",
  description: "The live Formula 1 drivers' championship table.",
  openGraph: {
    title: "F1 Standings – Formula 1 Merchandise",
    description: "The live Formula 1 drivers' championship table.",
    url: "https://f1store.com/standings",
  },
  alternates: {
    canonical: "https://f1store.com/standings",
  },
};

/**
 * Standings page — the full drivers' championship table.
 */
export default async function StandingsPage() {
  const topDrivers = await getTopDrivers(20);

  return (
    <main className="page font-sans selection:bg-[#ff1801] selection:text-white">
      <div className="page__glow" />
      <SiteNavbar />
      <section className="home-section">
        <div className="home-section__inner">
          <p className="home-section__eyebrow">Drivers&apos; championship</p>
          <h1 className="home-section__title">Standings</h1>
          {topDrivers.length > 0 ? (
            <ol className="home-table">
              {topDrivers.map((driver) => (
                <li key={driver.code} className="home-row">
                  <span className="home-row__position">{driver.position}</span>
                  <span className="home-row__code">{driver.code}</span>
                  <span className="home-row__name">{driver.name}</span>
                  <span className="home-row__team">{driver.team}</span>
                  <span className="home-row__points">{driver.points} pts</span>
                </li>
              ))}
            </ol>
          ) : (
            <p className="home-muted">Standings unavailable right now.</p>
          )}
        </div>
      </section>
    </main>
  );
}
