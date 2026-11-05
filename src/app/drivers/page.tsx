import type { Metadata } from "next";
import Image from "next/image";
import { SiteNavbar } from "@/components/f1/SiteNavbar";
import { SiteTicker } from "@/components/f1/SiteTicker";
import { SiteFooter } from "@/components/f1/SiteFooter";
import { getTopDrivers } from "@/lib/f1/jolpica";
import { constructorColor } from "@/lib/f1/teams";
import "../home/home.css";

export const metadata: Metadata = {
  title: "Drivers – F1 Store",
  description: "The current Formula 1 drivers' championship standings.",
  alternates: { canonical: "https://f1store.com/drivers" },
};

/**
 * Drivers page — the full drivers' championship table.
 * Live data from the F1 API; constructor-color edge per row.
 * Shares `./home.css` (`home-table` rows + `driver-*` extras).
 */
export default async function DriversPage() {
  const drivers = await getTopDrivers(20);

  return (
    <main className="page font-sans selection:bg-[#ff1801] selection:text-white">
      <div className="page__glow" />
      <SiteNavbar />
      <SiteTicker />
      <section className="home-section">
        <div className="home-section__inner">
          <p className="home-section__eyebrow">Drivers&apos; championship</p>
          <h2 className="home-section__title">Meet the grid</h2>
          {drivers.length > 0 ? (
            <ol className="home-table">
              {drivers.map((driver) => (
                <li
                  key={driver.code}
                  className="home-row"
                  style={{ boxShadow: `inset 3px 0 0 ${constructorColor(driver.team)}` }}
                >
                  <span className="home-row__position">{driver.position}</span>
                  {driver.photo ? (
                    <Image
                      src={driver.photo}
                      alt=""
                      width={40}
                      height={40}
                      className="driver-row__photo"
                    />
                  ) : (
                    <span className="driver-row__photo driver-row__photo--fallback">
                      {driver.code}
                    </span>
                  )}
                  <span className="home-row__code">{driver.code}</span>
                  <span className="home-row__name">{driver.name}</span>
                  <span className="home-row__team">{driver.team}</span>
                  <span className="home-row__points">
                    {driver.points} pts · {driver.wins} wins
                  </span>
                </li>
              ))}
            </ol>
          ) : (
            <p className="home-muted">Standings unavailable right now.</p>
          )}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
