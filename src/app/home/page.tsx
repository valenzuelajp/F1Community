import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { CountdownBoxes } from '@/components/f1/CountdownBoxes';
import { SessionTimes } from '@/components/f1/SessionTimes';
import { SiteNavbar } from '@/components/f1/SiteNavbar';
import { formatNewsShortDate, getNewsTopic } from '@/components/f1/NewsCard';
import { NewsGridFilter } from '@/components/f1/NewsGridFilter';
import { NewsTicker } from '@/components/f1/NewsTicker';
import { getConstructorStandings, getNextF1Event, getTopDrivers } from '@/lib/f1/jolpica';
import { constructorColor } from '@/lib/f1/teams';
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
 * Member Home Page — pit-wall broadcast theme (post-login landing).
 *
 * Maximalist split (desktop): race-week hero left, newsroom right.
 * One 1240px container, left-aligned section titles, no eyebrows.
 * Styling lives in `./home.css` (`pit-*`, `race-hero*`, `news-*`,
 * `tower*`, `ticker*` blocks), shared with the /news, /schedule,
 * /standings pages. Easy to read and edit for any developer or
 * beginner joining the project.
 */

/** Session start as "Fri 17:30 UTC" — server-safe, no hydration drift. */
function heroSessionTime(iso: string): string {
  const date = new Date(iso);
  const weekday = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    timeZone: "UTC",
  }).format(date);
  const time = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
  }).format(date);
  return `${weekday} ${time} UTC`;
}

export default async function MemberHomePage() {
  const [event, topDrivers, news, topConstructors] = await Promise.all([
    getNextF1Event(),
    getTopDrivers(10),
    getTopNews(),
    getConstructorStandings(5).catch(() => []),
  ]);

  return (
    <main className="page font-pit-body selection:bg-pit-red selection:text-white">
      {/* Background radial glow */}
      <div className="page__glow" />

      <SiteNavbar />

      <NewsTicker
        headlines={news.map((item) => item.title)}
        nextLabel={
          event.nextSessionStart
            ? `Next session · ${event.raceName} · ${heroSessionTime(event.nextSessionStart)}`
            : `Next race · ${event.raceName}`
        }
        isLive={event.isLive}
      />

      {/* Maximalist split: race intel left, newsroom right (stacked below 1280px) */}
      <div className="pit-split">
        <div className="pit-split__race">
      {/* Race-week hero: badge + title + countdown, top-5 tower + team bars */}
      <section className="race-hero">
        <div className="race-hero__inner">
          <span className="race-hero__roundbg" aria-hidden="true">
            {event.round}
          </span>
          <div className="race-hero__main">
            <p className="round-badge">Round {event.round}</p>
            <h1 className="race-hero__title">{event.raceName}</h1>
            <p className="race-hero__circuit">
              {event.circuitName} · {event.locality}, {event.country}
            </p>
            {event.isLive ? (
              <p className="home-live-pill">Live now</p>
            ) : event.nextSessionStart ? (
              <CountdownBoxes
                target={event.nextSessionStart}
                className="race-hero__countdown"
              />
            ) : (
              <p className="home-muted">
                {event.seasonOver ? 'Season complete — see you next year.' : 'Schedule unavailable right now.'}
              </p>
            )}
            {event.sessions.length > 0 ? (
              <SessionTimes sessions={event.sessions} />
            ) : null}
          </div>
          {topDrivers.length > 0 ? (
            <aside className="race-hero__tower" aria-label="Top 5 drivers">
              <p className="race-hero__tower-heading">Top 5</p>
              <ol className="race-hero__tower-list">
                {topDrivers.slice(0, 5).map((driver) => {
                  const gap = (topDrivers[0]?.points ?? driver.points) - driver.points;
                  return (
                    <li
                      key={driver.code}
                      className="race-hero__tower-row"
                      style={{ boxShadow: `inset 3px 0 0 ${constructorColor(driver.team)}` }}
                    >
                      <span className="race-hero__tower-pos">{driver.position}</span>
                      <span className="race-hero__tower-code">{driver.code}</span>
                      <span className="race-hero__tower-gap">
                        {gap <= 0 ? '—' : `+${gap}`}
                      </span>
                    </li>
                  );
                })}
              </ol>
              {topConstructors.length > 0 ? (
                <div className="team-bars" aria-label="Top 3 constructors">
                  {topConstructors.slice(0, 3).map((team) => {
                    const leader = topConstructors[0]?.points ?? team.points;
                    const width =
                      leader > 0
                        ? Math.max(4, Math.round((team.points / leader) * 100))
                        : 0;
                    return (
                      <div key={team.name} className="team-bar">
                        <span className="team-bar__name">{team.name}</span>
                        <span className="team-bar__track">
                          <span
                            className="team-bar__fill"
                            style={{
                              width: `${width}%`,
                              backgroundColor: constructorColor(team.name),
                            }}
                          />
                        </span>
                        <span className="team-bar__points">{team.points}</span>
                      </div>
                    );
                  })}
                </div>
              ) : null}
              <a className="race-hero__tower-link" href="/standings">
                Full standings
              </a>
            </aside>
          ) : null}
        </div>
      </section>
        </div>
        <div className="pit-split__news">
      {/* Newsroom */}
      <section id="news" className="home-section home-section--band">
        <div className="pit-container">
          <h2 className="section-title">F1 newsroom</h2>
          {news.length > 0 ? (
            <>
              <div className="news-top">
                <a
                  className="news-hero"
                  href={news[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
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
                    <span className="topic-chip">{getNewsTopic(news[0].title)}</span>
                    {news[0].source}
                    {news[0].publishedAt ? ` · ${formatNewsShortDate(news[0].publishedAt)}` : ''}
                  </p>
                  <h3 className="news-hero__title">{news[0].title}</h3>
                  <p className="news-card__summary">{news[0].summary}</p>
                </a>
                <aside className="news-side" aria-label="More headlines">
                  <p className="news-side__heading">Latest updates</p>
                  <ul className="news-side__list">
                    {news.slice(1, 5).map((item) => (
                      <li key={item.url} className="news-side__row">
                        <a href={item.url} target="_blank" rel="noopener noreferrer">
                          <span className="news-side__title">{item.title}</span>
                          <span className="news-side__meta">
                            <span className="topic-chip">{getNewsTopic(item.title)}</span>
                            {item.source}
                            {item.publishedAt ? ` · ${formatNewsShortDate(item.publishedAt)}` : ''}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </aside>
              </div>
              {news.length > 5 ? <NewsGridFilter items={news.slice(5, 9)} /> : null}
              <p className="news-credit">Headlines and photos: Sky Sports, BBC Sport.</p>
            </>
          ) : (
            <p className="home-muted">News unavailable right now.</p>
          )}
        </div>
      </section>
        </div>
      </div>

      {/* Standings Tower */}
      <section id="drivers" className="home-section">
        <div className="pit-container">
          <h2 className="section-title">Standings</h2>
          <div className="tower-grid">
            <div className="tower">
              <h3 className="tower__heading">Drivers</h3>
              {topDrivers.length > 0 ? (
                <ol className="tower__list">
                  {topDrivers.map((driver) => {
                    const gap = (topDrivers[0]?.points ?? driver.points) - driver.points;
                    return (
                      <li
                        key={driver.code}
                        className="tower__row"
                        style={{ boxShadow: `inset 3px 0 0 ${constructorColor(driver.team)}` }}
                      >
                        <span className="tower__pos">{driver.position}</span>
                        <span className="tower__who">
                          <span className="tower__code">{driver.code}</span>
                          <span className="tower__name">{driver.name}</span>
                        </span>
                        <span className="tower__meta">
                          <span className="tower__points">{driver.points} pts</span>
                          <span className="tower__gap">{gap === 0 ? '—' : `-${gap}`}</span>
                        </span>
                      </li>
                    );
                  })}
                </ol>
              ) : (
                <p className="home-muted">Standings unavailable right now.</p>
              )}
              <a className="tower__link" href="/standings">
                Full standings
              </a>
            </div>
            <div className="tower tower--mini">
              <h3 className="tower__heading">Constructors</h3>
              {topConstructors.length > 0 ? (
                <ol className="tower__list">
                  {topConstructors.map((team) => {
                    const gap = (topConstructors[0]?.points ?? team.points) - team.points;
                    return (
                      <li
                        key={team.name}
                        className="tower__row"
                        style={{ boxShadow: `inset 3px 0 0 ${constructorColor(team.name)}` }}
                      >
                        <span className="tower__pos">{team.position}</span>
                        <span className="tower__who">
                          <span className="tower__name">{team.name}</span>
                        </span>
                        <span className="tower__meta">
                          <span className="tower__points">{team.points} pts</span>
                          <span className="tower__gap">{gap === 0 ? '—' : `-${gap}`}</span>
                        </span>
                      </li>
                    );
                  })}
                </ol>
              ) : (
                <p className="home-muted">Standings unavailable right now.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pit-footer">
        <div className="pit-container">
          <div className="checker" aria-hidden="true" />
          <p className="pit-footer__note">Store coming soon.</p>
        </div>
      </footer>
    </main>
  );
}
