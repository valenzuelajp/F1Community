import type { Metadata } from "next";
import { SiteNavbar } from "@/components/f1/SiteNavbar";
import { SiteTicker } from "@/components/f1/SiteTicker";
import { SiteFooter } from "@/components/f1/SiteFooter";
import { getConstructorStandings } from "@/lib/f1/jolpica";
import { constructorColor } from "@/lib/f1/teams";
import "../home/home.css";

export const metadata: Metadata = {
  title: "Teams – F1 Store",
  description: "The current Formula 1 constructors' championship standings.",
  alternates: { canonical: "https://f1store.com/teams" },
};

/**
 * Teams page — the full constructors' championship table.
 * Live data from the F1 API; constructor-color edge per row.
 * Shares `./home.css` (`home-table` rows).
 */
export default async function TeamsPage() {
  const teams = await getConstructorStandings(10);

  return (
    <main className="page font-sans selection:bg-[#ff1801] selection:text-white">
      <div className="page__glow" />
      <SiteNavbar />
      <SiteTicker />
      <section className="home-section">
        <div className="home-section__inner">
          <p className="home-section__eyebrow">Constructors&apos; championship</p>
          <h2 className="home-section__title">The teams</h2>
          {teams.length > 0 ? (
            <ol className="home-table">
              {teams.map((team) => (
                <li
                  key={team.name}
                  className="home-row"
                  style={{ boxShadow: `inset 3px 0 0 ${constructorColor(team.name)}` }}
                >
                  <span className="home-row__position">{team.position}</span>
                  <span className="home-row__name">{team.name}</span>
                  <span className="home-row__team">{team.nationality}</span>
                  <span className="home-row__points">
                    {team.points} pts · {team.wins} wins
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
