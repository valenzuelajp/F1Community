import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { LoginForm } from '@/components/auth/LoginForm';
import './login.css';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Sign in to access live timing, race predictions, and exclusive team updates.',
};

/**
 * Formula 1 Login Page
 * 
 * Pixel-accurate implementation matching reference wireframe `Screenshot 2026-09-16 122645.png`:
 * - Full-width black navigation header with F1 logo, uppercase links, SALE pill, and MENU pill
 * - High-intensity racing hero with crowd backdrop, giant outline "SPRINT QUALI!!!!" title,
 *   star orbit ornament, celebrating driver cutout, "01" watermark, plus cross matrix,
 *   and cyber-chamfered login card
 * - Live telemetry timing ticker bar with glowing LIVE indicator
 * - Constructor sponsors strip showcasing all 10 F1 team logos
 * - Pirelli 5-compound tires divider with horizontal center strike
 * - 4-column wireframe footer with official F1 branding, social icons, [PAGE] directories,
 *   newsletter subscription box, and legal notices
 */
export default function LoginPage() {
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

          {/* Primary Navigation Links with Vertical Dividers */}
          <nav aria-label="Primary navigation" className="login-nav">
            <div className="login-nav-items">
              <Link href="/home" className="login-nav-link">HOME</Link>
              <span className="login-nav-divider" aria-hidden="true" />
              <Link href="#schedules" className="login-nav-link">SCHEDULES</Link>
              <span className="login-nav-divider" aria-hidden="true" />
              <Link href="#news" className="login-nav-link">NEWS</Link>
              <span className="login-nav-divider" aria-hidden="true" />
              <Link href="#store" className="login-nav-link">STORE</Link>
            </div>
          </nav>

          {/* Header Action Buttons: SALE & MENU */}
          <div className="login-header-actions">
            <Link href="#sale" className="login-sale-pill">SALE</Link>
            <button
              type="button"
              aria-label="Open menu"
              className="login-menu-pill"
            >
              <Menu className="h-4 w-4" aria-hidden="true" />
              <span>MENU</span>
            </button>
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

            {/* Left Column: SPRINT QUALI Title & Metadata Hooks */}
            <div className="login-hero-left">
              <div className="login-hero-title-wrap">
                <h1 className="login-hero-title">
                  SPRINT<br />QUALI!!!!
                </h1>
                <div className="login-hero-star" aria-hidden="true">
                  <Image
                    src="/img104.svg"
                    alt="Sparkle star ornament"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* F1 Car/Logo Badge */}
              <div className="login-hero-badge" aria-hidden="true">
                <Image
                  src="/imgLogoContainer.png"
                  alt="F1 Logo"
                  fill
                  className="object-contain object-left"
                />
              </div>

              {/* Metadata Labels */}
              <div className="login-hero-meta">
                <span className="login-meta-hook">[TITLEHOOK]</span>
                <span className="login-meta-title">[TITLE]</span>
                <span className="login-meta-details">[DETAILS]</span>
              </div>

              {/* Real-time Interaction Statistics */}
              <div className="login-stats">
                <div className="login-stat">
                  <span className="login-stat-value--red">[INTERACTIONDATA]+</span>
                  <span className="login-stat-label">ACTIVE FANATICS</span>
                </div>
                <div className="login-stat">
                  <span className="login-stat-value">[PREDICTIONDATA]★</span>
                  <span className="login-stat-label">PREDICTION RATING</span>
                </div>
              </div>
            </div>

            {/* Right Column: Floating Chamfered Auth Card with Driver Composition */}
            <div className="login-card-anchor">
              {/* "01" Watermark behind card & driver */}
              <span className="login-watermark" aria-hidden="true">01</span>

              {/* Driver celebrating cutout positioned directly beside on the leftside of login-card */}
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
                <Suspense fallback={<div className="h-72 animate-pulse rounded bg-white/5" />}>
                  <LoginForm />
                </Suspense>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================================
          3. LIVE TIMING TELEMETRY TICKER
          ===================================================================== */}
      <section aria-label="Live race telemetry timing" className="login-telemetry">
        <div className="login-live-cell">
          <span className="login-live-dot" />
          <span>LIVE</span>
        </div>
        <div className="login-telemetry-data">
          <span>LAP [TIMEDATA]</span>
          <span className="login-telemetry-slash">/</span>
          <span>[NAM1] [TIMEDATA1]</span>
          <span className="login-telemetry-slash">/</span>
          <span>[NAM2] [TIMEDATA2]</span>
          <span className="login-telemetry-slash">/</span>
          <span>[NAM3] [TIMEDATA3]</span>
          <span className="login-telemetry-slash">/</span>
          <span className="login-telemetry-phase">[PHASE]</span>
        </div>
      </section>

      {/* =====================================================================
          4. TRUSTED TEAMS SPONSORS STRIP
          ===================================================================== */}
      <section className="login-teams">
        <h2 className="login-teams-heading">
          TRUSTED BY THE WORLD&apos;S MOST INNOVATIVE TEAMS
        </h2>
        <div className="login-teams-row">
          <div className="login-team-logo">
            <Image src="/imgAlfa800X800.png" alt="Alfa Romeo" fill className="object-contain" />
          </div>
          <div className="login-team-logo">
            <Image src="/imgAlpha800X800.png" alt="AlphaTauri" fill className="object-contain" />
          </div>
          <div className="login-team-logo">
            <Image src="/imgAlpine800X800.png" alt="Alpine" fill className="object-contain" />
          </div>
          <div className="login-team-logo">
            <Image src="/imgAston800X800.png" alt="Aston Martin" fill className="object-contain" />
          </div>
          <div className="login-team-logo">
            <Image src="/imgFerrari800X800.png" alt="Ferrari" fill className="object-contain" />
          </div>
          <div className="login-team-logo">
            <Image src="/imgHaas800X800.png" alt="Haas" fill className="object-contain" />
          </div>
          <div className="login-team-logo">
            <Image src="/imgMcLaren800X800.png" alt="McLaren" fill className="object-contain" />
          </div>
          <div className="login-team-logo">
            <Image src="/imgMercedes800X800.png" alt="Mercedes" fill className="object-contain" />
          </div>
          <div className="login-team-logo">
            <Image src="/imgRedbull800X8001.png" alt="Red Bull Racing" fill className="object-contain" />
          </div>
          <div className="login-team-logo">
            <Image src="/imgTeamWilliams.png" alt="Williams" fill className="object-contain" />
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. PIRELLI TIRE COMPOUNDS STRIP DIVIDER
          ===================================================================== */}
      <section className="login-tires" aria-hidden="true">
        <div className="login-tires-line" />
        <div className="login-tires-cluster">
          <div className="login-tire">
            <Image src="/soft-red-tire-134-5892.png" alt="Pirelli Soft Red Compound" fill className="object-contain" />
          </div>
          <div className="login-tire">
            <Image src="/soft-yellow-tire-134-5985.png" alt="Pirelli Medium Yellow Compound" fill className="object-contain" />
          </div>
          <div className="login-tire">
            <Image src="/soft-white-tire-134-6078.png" alt="Pirelli Hard White Compound" fill className="object-contain" />
          </div>
          <div className="login-tire">
            <Image src="/soft-green-tire-134-6171.png" alt="Pirelli Intermediate Green Compound" fill className="object-contain" />
          </div>
          <div className="login-tire">
            <Image src="/soft-blue-tire-134-6264.png" alt="Pirelli Wet Blue Compound" fill className="object-contain" />
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
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="login-social-pill" aria-label="Facebook">
                <Image src="/imgFacebook.svg" alt="Facebook" width={14} height={14} />
              </Link>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="login-social-pill" aria-label="Twitter">
                <Image src="/imgTwitter.svg" alt="Twitter" width={14} height={14} />
              </Link>
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="login-social-pill" aria-label="Instagram">
                <Image src="/imgInstagram.svg" alt="Instagram" width={14} height={14} />
              </Link>
              <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="login-social-pill" aria-label="YouTube">
                <Image src="/imgYoutube.svg" alt="YouTube" width={14} height={14} />
              </Link>
            </div>
          </div>

          {/* Directory Column 1 */}
          <div className="login-footer-links">
            <h3 className="login-footer-col-title">[PAGE]</h3>
            <Link href="#page1" className="login-footer-link">[Page]</Link>
            <Link href="#page2" className="login-footer-link">[Page]</Link>
            <Link href="#page3" className="login-footer-link">[Page]</Link>
            <Link href="#page4" className="login-footer-link">[Page]</Link>
          </div>

          {/* Directory Column 2 */}
          <div className="login-footer-links">
            <h3 className="login-footer-col-title">[PAGE]</h3>
            <Link href="#page1" className="login-footer-link">[Page]</Link>
            <Link href="#page2" className="login-footer-link">[Page]</Link>
            <Link href="#page3" className="login-footer-link">[Page]</Link>
            <Link href="#page4" className="login-footer-link">[Page]</Link>
          </div>

          {/* Newsletter Column */}
          <div className="login-footer-newsletter">
            <h3 className="login-newsletter-title">JOIN THE NEWSLETTER</h3>
            <p className="login-newsletter-desc">
              Subscribe for exclusive drop access and pre-season testing details.
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
          <p>© 2026 Formula One Digital Media Limited. Merchandise Wireframe Proposal. All Rights Reserved.</p>
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
