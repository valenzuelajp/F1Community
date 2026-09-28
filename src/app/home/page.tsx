import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Flag, ShoppingBag, Trophy } from 'lucide-react';
import { Countdown } from '@/components/f1/Countdown';
import { SiteNavbar } from '@/components/f1/SiteNavbar';
import { NewsCard, formatNewsDate } from '@/components/f1/NewsCard';
import { getNextF1Event, getTopDrivers } from '@/lib/f1/jolpica';
import { getTopNews } from '@/lib/f1/news';
import './home.css';

export const metadata: Metadata = {
  title: 'F1 Store Home – Formula 1 Merchandise',
  description: 'Premium Formula 1 replicas, race-week apparel, and collector essentials from your favourite constructors and drivers.',
  openGraph: {
    title: 'F1 Store Home – Formula 1 Merchandise',
    description: 'Premium Formula 1 replicas, race-week apparel, and collector essentials.',
    url: 'https://f1store.com/home',
  },
  alternates: {
    canonical: 'https://f1store.com/home',
  },
};

/**
 * Member Home Page — the news hub (post-login landing).
 *
 * News first, then: next-race teaser (live schedule data), shop
 * categories, and the full top-10 drivers' championship. Styling lives
 * in `./home.css` (`home__*` + `news-*` blocks), shared with the
 * /news, /schedule, and /standings pages.
 * Easy to read and edit for any developer or beginner joining the project.
 */
export default async function MemberHomePage() {
  const [event, topDrivers, news] = await Promise.all([
    getNextF1Event(),
    getTopDrivers(10),
    getTopNews(),
  ]);

  return (
    <main className="page font-sans selection:bg-[#ff1801] selection:text-white">
      {/* Background radial glow */}
      <div className="page__glow" />

      <SiteNavbar />

      {/* Latest News */}
      <section id="news" className="home-section">
        <div className="home-section__inner home-section__inner--wide">
          <p className="home-section__eyebrow">Latest updates</p>
          <h2 className="home-section__title">F1 newsroom</h2>
          <p className="home-section__subtext">
            Live headlines from {news[0]?.source ?? 'F1 Community'} · refreshed every 30 minutes.
          </p>
          {news.length > 0 ? (
            <>
              <div className="news-top">
                <article className="news-hero">
                  {news[0].image ? (
                    <div className="news-hero__media">
                      <Image
                        src={news[0].image}
                        alt=""
                        fill
                        sizes="(max-width: 1024px) 100vw, 48rem"
                        className="object-cover"
                      />
                    </div>
                  ) : null}
                  <p className="news-card__meta">
                    {news[0].source}
                    {news[0].publishedAt ? ` · ${formatNewsDate(news[0].publishedAt)}` : ''}
                  </p>
                  <h3 className="news-hero__title">{news[0].title}</h3>
                  <p className="news-card__summary">{news[0].summary}</p>
                  <a
                    className="news-card__cta"
                    href={news[0].url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read Story
                  </a>
                </article>
                <aside className="news-side" aria-label="More headlines">
                  <p className="news-side__heading">Latest updates</p>
                  <ul className="news-side__list">
                    {news.slice(1, 5).map((item) => (
                      <li key={item.url} className="news-side__row">
                        <a href={item.url} target="_blank" rel="noopener noreferrer">
                          <span className="news-side__title">{item.title}</span>
                          <span className="news-side__meta">
                            {item.source}
                            {item.publishedAt ? ` · ${formatNewsDate(item.publishedAt)}` : ''}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </aside>
              </div>
              {news.length > 5 ? (
                <div className="news-grid">
                  {news.slice(5).map((item) => (
                    <NewsCard key={item.url} item={item} />
                  ))}
                </div>
              ) : null}
            </>
          ) : (
            <p className="home-muted">News unavailable right now.</p>
          )}
        </div>
      </section>

      {/* Next Race Teaser */}
      <section id="next-race" className="home-section">
        <div className="home-section__inner">
          <p className="home-section__eyebrow">Round {event.round} · Season {event.season}</p>
          <h2 className="home-section__title">{event.raceName}</h2>
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
              {event.seasonOver ? 'Season complete — see you next year.' : 'Schedule unavailable right now.'}
            </p>
          )}
        </div>
      </section>

      {/* Shop Categories */}
      <section id="categories" className="home-section">
        <div className="home-section__inner">
          <p className="home-section__eyebrow">The collection</p>
          <h2 className="home-section__title">Shop by category</h2>
          <div className="home-cards">
            <article className="home-card">
              <ShoppingBag className="home-card__icon" />
              <h3 className="home-card__title">Replicas</h3>
              <p className="home-card__text">Team kits and driver caps straight from the paddock.</p>
            </article>
            <article className="home-card">
              <Flag className="home-card__icon" />
              <h3 className="home-card__title">Race-week apparel</h3>
              <p className="home-card__text">Grand-prix tees and hoodies for lights out.</p>
            </article>
            <article className="home-card">
              <Trophy className="home-card__icon" />
              <h3 className="home-card__title">Collector essentials</h3>
              <p className="home-card__text">Miniatures, posters, and numbered keepsakes.</p>
            </article>
          </div>
        </div>
      </section>

      {/* Top Drivers Snippet */}
      <section id="drivers" className="home-section">
        <div className="home-section__inner">
          <p className="home-section__eyebrow">Drivers&apos; championship</p>
          <h2 className="home-section__title">Top drivers</h2>
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
