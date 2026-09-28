import type { Metadata } from "next";
import { SiteNavbar } from "@/components/f1/SiteNavbar";
import { NewsCard } from "@/components/f1/NewsCard";
import { getTopNews } from "@/lib/f1/news";
import "../home/home.css";

export const metadata: Metadata = {
  title: "F1 News – Formula 1 Merchandise",
  description: "Every live Formula 1 headline in one archive.",
  openGraph: {
    title: "F1 News – Formula 1 Merchandise",
    description: "Every live Formula 1 headline in one archive.",
    url: "https://f1store.com/news",
  },
  alternates: {
    canonical: "https://f1store.com/news",
  },
};

/**
 * News archive page — every live story in one grid.
 * Section/card styles are shared from `../home/home.css`.
 */
export default async function NewsPage() {
  const news = await getTopNews();

  return (
    <main className="page font-sans selection:bg-[#ff1801] selection:text-white">
      <div className="page__glow" />
      <SiteNavbar />
      <section className="home-section">
        <div className="home-section__inner home-section__inner--wide">
          <p className="home-section__eyebrow">Archive</p>
          <h1 className="home-section__title">Every F1 story</h1>
          <p className="home-section__subtext">
            Live headlines from {news[0]?.source ?? "F1 Community"} · refreshed every 30 minutes.
          </p>
          {news.length > 0 ? (
            <div className="news-grid">
              {news.map((item) => (
                <NewsCard key={item.url} item={item} />
              ))}
            </div>
          ) : (
            <p className="home-muted">News unavailable right now.</p>
          )}
        </div>
      </section>
    </main>
  );
}
