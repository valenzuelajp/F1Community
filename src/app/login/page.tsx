import React, { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LoginForm } from "@/components/auth/LoginForm";
import { Countdown } from "@/components/f1/Countdown";
import {
  fallbackF1Event,
  getNextF1Event,
  getTopDrivers,
} from "@/lib/f1/jolpica";
import type { F1StandingDriver } from "@/lib/f1/jolpica";
import "./login.css";

export const metadata: Metadata = {
  title: "Login",
  description:
    "Sign in to access live timing, race predictions, and exclusive team updates.",
};

/**
 * Formula 1 Login Page
 *
 * Pixel-accurate implementation matching reference wireframe `Screenshot 2026-09-16 122645.png`:
 * - Full-width black navigation header with F1 logo, uppercase links, SALE pill, and MENU pill
 * - High-intensity racing hero with crowd backdrop, giant outline "SPRINT QUALI!!!!" title,
 *   dynamic next-race badge, live F1 countdown from the Jolpica schedule, and season stats
 * - Celebrating driver cutout behind the login card, with "01" watermark and plus cross matrix
 * - Cyber-chamfered login card
 * - Live telemetry timing ticker bar with glowing LIVE indicator
 * - Constructor sponsors strip showcasing all 10 F1 team logos
 * - Pirelli 5-compound tires divider with horizontal center strike
 * - 4-column wireframe footer with official F1 branding, social icons, [PAGE] directories,
 *   newsletter subscription box, and legal notices
 */
export default async function LoginPage() {
  // Next/current F1 event from Jolpica (ISR, revalidated hourly).
  // Falls back to static values so the page never breaks when the API is down.
  let event = fallbackF1Event();
  try {
    event = await getNextF1Event();
  } catch {
    // keep fallback
  }

  // Championship top 3 by points (same Jolpica client, same ISR caching).
  // Empty array on failure → the leaderboard section hides itself.
  let topDrivers: F1StandingDriver[] = [];
  try {
    topDrivers = await getTopDrivers(3);
  } catch {
    // keep empty
  }

  const roundLabel = `ROUND ${String(event.round).padStart(2, "0")}`;
  const seasonLabel = `${event.season} SEASON`;
  const hookLabel = event.isLive
    ? `LIVE • ${event.headline}`
    : `NEXT UP • ${event.headline}`;

  return (
    <main className="login-viewport">
      {/* =====================================================================
          1. TOP NAVIGATION HEADER
          ===================================================================== */}
      <header className="login-header">
        <div className="login-header-inner">
          {/* F1 Official Logo */}
          <Link href="/home" className="login-logo" aria-label="Formula 1 Home">
            <Image
              src="/imgLogoContainer.png"
              alt="Formula 1 Logo"
              fill
              sizes="(max-width: 640px) 130px, 155px"
              className="object-contain object-left"
              priority
            />
          </Link>
          <div className="login-header-actions">
            <Link href="/register" className="login-sale-pill">
              JOIN THE GRID
            </Link>
          </div>
        </div>
      </header>

      {/* =====================================================================
          2. HERO BANNER & LOGIN CARD STAGE
          ===================================================================== */}
      <section className="login-hero">
        {/* Background Atmosphere Layers */}
        <div className="login-hero-backdrop">
          <Image
            src="/imgLogin.png"
            alt="Crowd cheering at the Grand Prix"
            fill
            sizes="100vw"
            className="object-cover object-bottom"
            priority
          />
        </div>
        <div className="login-hero-overlay" aria-hidden="true" />

        {/* Hero Content Container */}
        <div className="login-hero-inner">
          <div className="login-hero-grid">
            {/* Left Column: Dynamic Event Title + Race Info */}
            <div className="login-hero-left">
              <div className="login-hero-title-wrap">
                {/* Title auto-adjusts to the current event:
                    GRAND PRIX! / FREE PRACTICE! / QUALI TIME! / SEASON COMPLETE! ...
                    Long words (like "SHOOTOUT!") get a slightly smaller size
                    via the --compact modifier so they never overflow the wrap. */}
                <h1
                  className={`login-hero-title${
                    Math.max(event.title[0].length, event.title[1].length) >= 9
                      ? " login-hero-title--compact"
                      : ""
                  }`}
                >
                  {event.title[0]}
                  <br />
                  {event.title[1]}
                </h1>
              </div>

              {/* Next Race Badge — dynamic red pill styled by .login-round-badge */}
              <div className="login-round-badge">
                <span>
                  {roundLabel} — {seasonLabel}
                </span>
              </div>

              {/* Race & Session Info — labels, race name, info (countdown sits below) */}
              <div className="login-race-meta">
                <span className="login-session-label">{hookLabel}</span>
                <span className="login-race-name">{event.raceName}</span>
                <span className="login-race-info">
                  {event.isLive ? (
                    <>
                      {event.locality}, {event.country} — session in progress
                    </>
                  ) : event.seasonOver ? (
                    <>
                      See you next season — {event.locality}, {event.country}
                    </>
                  ) : (
                    <>
                      {event.circuitName} • {event.locality}, {event.country} —
                      starts in
                    </>
                  )}
                </span>
                {!event.isLive && !event.seasonOver && (
                  <Countdown
                    target={event.nextSessionStart!}
                    className="login-countdown"
                    showStartTime
                  />
                )}
              </div>

              {/* Season Statistics */}
              <div className="login-season-stats">
                <div className="login-stat">
                  <span className="login-stat-value--red">
                    {event.racesRemaining}
                  </span>
                  <span className="login-stat-label">RACES REMAINING</span>
                </div>
                <div className="login-stat">
                  <span className="login-stat-value">
                    {event.racesCompleted}
                  </span>
                  <span className="login-stat-label">
                    RACES COMPLETE — {event.totalRounds} ROUNDS
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Floating Chamfered Auth Card with Driver Composition */}
            <div className="login-card-stage">
              {/* "01" Watermark behind card & driver */}
              <span className="login-watermark" aria-hidden="true">
                01
              </span>

              {/* Driver celebrating cutout — positioned behind the login card (z-index layering) */}
              <div className="login-driver" aria-hidden="true">
                <Image
                  src="/imgSticker1.png"
                  alt="Formula 1 champion celebrating with helmet"
                  fill
                  sizes="(max-width: 1024px) 340px, 520px"
                  className="object-contain object-bottom drop-shadow-[0_28px_35px_rgba(0,0,0,0.85)]"
                  priority
                />
              </div>

              {/* Plus grid matrix positioned underneath driver beside card */}
              <div className="login-plus-grid" aria-hidden="true">
                <Image
                  src="/imgOrnament24.svg"
                  alt="Decorative plus grid matrix"
                  fill
                  className="object-contain"
                />
              </div>

              {/* The Login Card */}
              <div className="login-card">
                <Suspense
                  fallback={
                    <div className="h-72 animate-pulse rounded bg-white/5" />
                  }
                >
                  <LoginForm />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. LIVE TIMING TELEMETRY TICKER
          The LIVE badge follows the real F1 schedule: it shows "LIVE" only
          while a session is actually running (event.isLive from Jolpica).
          Outside a session it reads OFFLINE; after the last race it reads
          OFF SEASON. When offline the ticker shows the next session instead
          of placeholder telemetry.
          ===================================================================== */}
      <section
        aria-label={
          event.isLive ? "Live race telemetry timing" : "Race telemetry offline"
        }
        className="login-telemetry"
      >
        <div
          className={`login-live-cell${
            event.isLive ? "" : " login-live-cell--off"
          }`}
        >
          <span className="login-live-dot" />
          <span>{event.isLive ? "LIVE" : "OFFLINE"}</span>
        </div>

        <div className="login-telemetry-data">
          {event.isLive ? (
            <>
              <span>LAP [TIMEDATA]</span>
              <span className="login-telemetry-slash">/</span>
              <span>[NAM1] [TIMEDATA1]</span>
              <span className="login-telemetry-slash">/</span>
              <span>[NAM2] [TIMEDATA2]</span>
              <span className="login-telemetry-slash">/</span>
              <span>[NAM3] [TIMEDATA3]</span>
              <span className="login-telemetry-slash">/</span>
              <span className="login-telemetry-phase">{event.headline}</span>
            </>
          ) : (
            <>
              <span>NO LIVE SESSION</span>
              <span className="login-telemetry-slash">/</span>
              <span>{event.raceName}</span>
              <span className="login-telemetry-slash">/</span>
              <span className="login-telemetry-phase">
                {event.seasonOver
                  ? "SEASON COMPLETE"
                  : `NEXT: ${event.headline}`}
              </span>
            </>
          )}
        </div>
      </section>

      {/* =====================================================================
          3b. CHAMPIONSHIP LEADERBOARD (TOP 3 BY POINTS)
          Live driver standings from the Jolpica schedule API (ISR hourly).
          Hidden entirely when the API is unavailable.
          ===================================================================== */}
      {topDrivers.length > 0 && (
        <section
          aria-label="Top 3 championship drivers"
          className="login-podium"
        >
          <h2 className="login-podium-title">
            TOP 3 — {event.season} CHAMPIONSHIP
          </h2>
          <div className="login-podium-row">
            {topDrivers.map((driver) => (
              <div
                key={driver.code}
                className={`login-podium-cell login-podium-cell--${driver.position}`}
              >
                <span className="login-podium-info">
                  <span className="login-podium-name">
                    {driver.name.toUpperCase()}
                  </span>
                  <span className="login-podium-team">
                    {driver.team.toUpperCase()}
                  </span>
                  <span className="login-podium-points">
                    {driver.points}{" "}
                    <span className="login-podium-pts">PTS</span>
                  </span>
                </span>
                {driver.photo && (
                  <span className="login-podium-photo">
                    <Image
                      src={driver.photo}
                      alt={`${driver.name} portrait`}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 112px, (min-width: 640px) 96px, 72px"
                    />
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* =====================================================================
          4. TRUSTED TEAMS SPONSORS STRIP
          ===================================================================== */}
      <section className="login-teams">
        <h2 className="login-teams-heading">
          TRUSTED BY THE WORLD&apos;S MOST INNOVATIVE TEAMS
        </h2>
        {/* Each logo links to its official team website (external, new tab). */}
        <div className="login-teams-row">
          <a
            href="https://audif1.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="login-team-logo"
            aria-label="Visit Audi F1 Team official website"
          >
            <Image
              src="/imgAudi800X800.png"
              alt="Audi F1 Team"
              fill
              className="object-contain"
            />
          </a>
          <a
            href="https://www.visacashapprb.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="login-team-logo"
            aria-label="Visit Racing Bulls official website"
          >
            <Image
              src="/imgVcarb800X800.png"
              alt="Racing Bulls"
              fill
              className="object-contain"
            />
          </a>
          <a
            href="https://www.alpinecars.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="login-team-logo"
            aria-label="Visit Alpine official website"
          >
            <Image
              src="/imgAlpine800X800.png"
              alt="Alpine"
              fill
              className="object-contain"
            />
          </a>
          <a
            href="https://www.astonmartinf1.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="login-team-logo"
            aria-label="Visit Aston Martin official website"
          >
            <Image
              src="/imgAston800X800.png"
              alt="Aston Martin"
              fill
              className="object-contain"
            />
          </a>
          <a
            href="https://www.ferrari.com/en-EN/formula1"
            target="_blank"
            rel="noopener noreferrer"
            className="login-team-logo"
            aria-label="Visit Ferrari official website"
          >
            <Image
              src="/imgFerrari800X800.png"
              alt="Ferrari"
              fill
              className="object-contain"
            />
          </a>
          <a
            href="https://www.haasf1team.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="login-team-logo"
            aria-label="Visit Haas official website"
          >
            <Image
              src="/imgHaas800X800.png"
              alt="Haas"
              fill
              className="object-contain"
            />
          </a>
          <a
            href="https://www.mclaren.com/racing/formula-1/"
            target="_blank"
            rel="noopener noreferrer"
            className="login-team-logo"
            aria-label="Visit McLaren official website"
          >
            <Image
              src="/imgMcLaren800X800.png"
              alt="McLaren"
              fill
              className="object-contain"
            />
          </a>
          <a
            href="https://www.mercedesamgf1.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="login-team-logo"
            aria-label="Visit Mercedes official website"
          >
            <Image
              src="/imgMercedes800X800.png"
              alt="Mercedes"
              fill
              className="object-contain"
            />
          </a>
          <a
            href="https://www.redbullracing.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="login-team-logo"
            aria-label="Visit Red Bull Racing official website"
          >
            <Image
              src="/imgRedbull800X8001.png"
              alt="Red Bull Racing"
              fill
              className="object-contain"
            />
          </a>
          <a
            href="https://www.williamsf1.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="login-team-logo"
            aria-label="Visit Williams official website"
          >
            <Image
              src="/imgTeamWilliams.png"
              alt="Williams"
              fill
              className="object-contain"
            />
          </a>
        </div>
      </section>

      {/* =====================================================================
          5. PIRELLI TIRE COMPOUNDS STRIP DIVIDER
          ===================================================================== */}
      <section className="login-tires" aria-hidden="true">
        <div className="login-tires-line" />
        <div className="login-tires-cluster">
          <div className="login-tire">
            <Image
              src="/soft-red-tire-134-5892.png"
              alt="Pirelli Soft Red Compound"
              fill
              className="object-contain"
            />
          </div>
          <div className="login-tire">
            <Image
              src="/soft-yellow-tire-134-5985.png"
              alt="Pirelli Medium Yellow Compound"
              fill
              className="object-contain"
            />
          </div>
          <div className="login-tire">
            <Image
              src="/soft-white-tire-134-6078.png"
              alt="Pirelli Hard White Compound"
              fill
              className="object-contain"
            />
          </div>
          <div className="login-tire">
            <Image
              src="/soft-green-tire-134-6171.png"
              alt="Pirelli Intermediate Green Compound"
              fill
              className="object-contain"
            />
          </div>
          <div className="login-tire">
            <Image
              src="/soft-blue-tire-134-6264.png"
              alt="Pirelli Wet Blue Compound"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </section>

      {/* =====================================================================
          6. WIREFRAME PROPOSAL FOOTER
          ===================================================================== */}
      <footer className="login-footer">
        <div className="login-footer-grid">
          {/* Brand Column */}
          <div className="login-footer-brand">
            <div className="login-footer-logo">
              <Image
                src="/imgLogoContainer.png"
                alt="Formula 1 Logo"
                fill
                className="object-contain object-left"
              />
            </div>
            <span className="login-footer-details">[Details]</span>
            <div className="login-footer-socials">
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="login-social-pill"
                aria-label="Facebook"
              >
                <Image
                  src="/imgFacebook.svg"
                  alt="Facebook"
                  width={14}
                  height={14}
                />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="login-social-pill"
                aria-label="Twitter"
              >
                <Image
                  src="/imgTwitter.svg"
                  alt="Twitter"
                  width={14}
                  height={14}
                />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="login-social-pill"
                aria-label="Instagram"
              >
                <Image
                  src="/imgInstagram.svg"
                  alt="Instagram"
                  width={14}
                  height={14}
                />
              </Link>
              <Link
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="login-social-pill"
                aria-label="YouTube"
              >
                <Image
                  src="/imgYoutube.svg"
                  alt="YouTube"
                  width={14}
                  height={14}
                />
              </Link>
            </div>
          </div>

          {/* Directory Column 1 */}
          <div className="login-footer-links">
            <h3 className="login-footer-col-title">[PAGE]</h3>
            <Link href="#page1" className="login-footer-link">
              [Page]
            </Link>
            <Link href="#page2" className="login-footer-link">
              [Page]
            </Link>
            <Link href="#page3" className="login-footer-link">
              [Page]
            </Link>
            <Link href="#page4" className="login-footer-link">
              [Page]
            </Link>
          </div>

          {/* Directory Column 2 */}
          <div className="login-footer-links">
            <h3 className="login-footer-col-title">[PAGE]</h3>
            <Link href="#page1" className="login-footer-link">
              [Page]
            </Link>
            <Link href="#page2" className="login-footer-link">
              [Page]
            </Link>
            <Link href="#page3" className="login-footer-link">
              [Page]
            </Link>
            <Link href="#page4" className="login-footer-link">
              [Page]
            </Link>
          </div>

          {/* Newsletter Column */}
          <div className="login-footer-newsletter">
            <h3 className="login-newsletter-title">JOIN THE NEWSLETTER</h3>
            <p className="login-newsletter-desc">
              Subscribe for exclusive drop access and pre-season testing
              details.
            </p>
            <form action="#newsletter" className="login-newsletter-form">
              <input
                type="email"
                placeholder="Enter your email address..."
                className="login-newsletter-input"
                aria-label="Email address for newsletter"
              />
              <button type="submit" className="login-newsletter-btn">
                SUBSCRIBE
              </button>
            </form>
            <p className="login-newsletter-terms">
              By subscribing, you agree to our Privacy Policy and Terms of Use.
            </p>
          </div>
        </div>

        {/* Bottom Legal Notice */}
        <div className="login-footer-bottom">
          <p>
            © 2026 Formula One Digital Media Limited. Merchandise Wireframe
            Proposal. All Rights Reserved.
          </p>
          <div className="login-footer-legal">
            <Link href="#privacy">Privacy Policy</Link>
            <span aria-hidden="true">.</span>
            <Link href="#terms">Terms of Use</Link>
            <span aria-hidden="true">.</span>
            <Link href="#cookies">Cookies</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
