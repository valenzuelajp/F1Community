import type { Metadata } from 'next';
import { Gauge, Timer, Trophy, Zap } from 'lucide-react';
import { SiteNavbar } from '@/components/f1/SiteNavbar';
import '../home/home.css';

export const metadata: Metadata = {
  title: 'New to F1? — Beginner’s Guide | F1 Store',
  description:
    'New to Formula 1? Learn the weekend format, how points work, tires, and DRS — four ideas that make your first race make sense.',
};

/**
 * New-to-F1 beginner guide page.
 * The four "start here" concepts that used to live on /home, moved here
 * so the homepage stays a news river. Same card styles as home
 * (`home-card*` in `../home/home.css`) — no new CSS.
 */
export default function NewToF1Page() {
  return (
    <main className="page font-sans selection:bg-[#ff1801] selection:text-white">
      {/* Background radial glow */}
      <div className="page__glow" />

      <SiteNavbar />

      <section className="home-section">
        <div className="home-section__inner">
          <p className="home-section__eyebrow">Beginner&apos;s guide</p>
          <h1 className="home-section__title">New to Formula 1?</h1>
          <p className="home-section__subtext">
            Four ideas that make your first race make sense — no jargon, no homework.
          </p>
          <div className="welcome-grid">
            <article className="home-card">
              <Timer className="home-card__icon" />
              <h3 className="home-card__title">The weekend format</h3>
              <p className="home-card__text">Three practices, then qualifying sets the grid, then the Grand Prix — usually Sunday. Some weekends add a Saturday sprint.</p>
            </article>
            <article className="home-card">
              <Trophy className="home-card__icon" />
              <h3 className="home-card__title">How points work</h3>
              <p className="home-card__text">Top 10 score, 25 for the win down to 1 for 10th, plus a point for fastest lap. Both championships add up all season.</p>
            </article>
            <article className="home-card">
              <Gauge className="home-card__icon" />
              <h3 className="home-card__title">Tires in 10 seconds</h3>
              <p className="home-card__text">Soft is fastest but fades, hard lasts longest. Watch the colors — red, yellow, white. Strategy lives here.</p>
            </article>
            <article className="home-card">
              <Zap className="home-card__icon" />
              <h3 className="home-card__title">What is DRS?</h3>
              <p className="home-card__text">A flap that opens on straights in marked zones when a car is within a second of the one ahead — F1&apos;s overtaking button.</p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
