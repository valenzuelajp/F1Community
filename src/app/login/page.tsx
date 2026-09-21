import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { LoginForm } from '@/components/auth/LoginForm';
import './login.css';

export const metadata: Metadata = {
  title: 'Formula 1® - Login',
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
    <main className="figma-login-viewport">
      {/* =====================================================================
          1. TOP NAVIGATION HEADER
          ===================================================================== */}
      <header className="figma-top-header">
        <div className="figma-header-inner">
          {/* F1 Official Logo */}
          <Link href="/home" className="figma-logo-wrap" aria-label="Formula 1 Home">
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
          <nav aria-label="Primary navigation" className="figma-nav-cluster">
            <div className="figma-nav-items">
              <Link href="/home" className="figma-nav-link">HOME</Link>
              <span className="figma-nav-bar-divider" aria-hidden="true" />
              <Link href="#schedules" className="figma-nav-link">SCHEDULES</Link>
              <span className="figma-nav-bar-divider" aria-hidden="true" />
              <Link href="#news" className="figma-nav-link">NEWS</Link>
              <span className="figma-nav-bar-divider" aria-hidden="true" />
              <Link href="#store" className="figma-nav-link">STORE</Link>
            </div>
          </nav>

          {/* Header Action Buttons: SALE & MENU */}
          <div className="figma-header-btns">
            <Link href="#sale" className="figma-btn-sale-pill">SALE</Link>
            <button
              type="button"
              aria-label="Open menu"
              className="figma-btn-menu-pill"
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
      <section className="figma-hero-stage">
        {/* Background Atmosphere Layers */}
        <div className="figma-crowd-backdrop">
          <Image
            src="/imgLogin.png"
            alt="Crowd cheering at the Grand Prix"
            fill
            sizes="100vw"
            className="object-cover object-bottom"
            priority
          />
        </div>
        <div className="figma-red-atmosphere-layer" aria-hidden="true" />

        {/* Hero Content Container */}
        <div className="figma-hero-inner">
          <div className="figma-hero-columns">

            {/* Left Column: SPRINT QUALI Title & Metadata Hooks */}
            <div className="figma-left-hero">
              <div className="figma-title-assembly">
                <h1 className="figma-sprint-quali-h1">
                  SPRINT<br />QUALI!!!!
                </h1>
                <div className="figma-star-orbit-art" aria-hidden="true">
                  <Image
                    src="/img104.svg"
                    alt="Sparkle star ornament"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* F1 Car/Logo Badge */}
              <div className="figma-f1-red-badge" aria-hidden="true">
                <Image
                  src="/imgLogoContainer.png"
                  alt="F1 Logo"
                  fill
                  className="object-contain object-left"
                />
              </div>

              {/* Metadata Labels */}
              <div className="figma-hero-metadata">
                <span className="figma-hook-label">[TITLEHOOK]</span>
                <span className="figma-title-label">[TITLE]</span>
                <span className="figma-details-label">[DETAILS]</span>
              </div>

              {/* Real-time Interaction Statistics */}
              <div className="figma-stats-row">
                <div className="figma-stat-unit">
                  <span className="figma-stat-val-red">[INTERACTIONDATA]+</span>
                  <span className="figma-stat-caption">ACTIVE FANATICS</span>
                </div>
                <div className="figma-stat-unit">
                  <span className="figma-stat-val-white">[PREDICTIONDATA]★</span>
                  <span className="figma-stat-caption">PREDICTION RATING</span>
                </div>
              </div>
            </div>

            {/* Right Column: Floating Chamfered Auth Card with Driver Composition */}
            <div className="figma-right-card-anchor">
              {/* "01" Watermark behind card & driver */}
              <span className="figma-watermark-01" aria-hidden="true">01</span>

              {/* Driver celebrating cutout positioned directly beside on the leftside of figma-auth-chamfer-card */}
              <div className="figma-driver-silhouette" aria-hidden="true">
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
              <div className="figma-plus-cross-cluster" aria-hidden="true">
                <Image
                  src="/imgOrnament24.svg"
                  alt="Decorative plus grid matrix"
                  fill
                  className="object-contain"
                />
              </div>

              {/* The Login Card */}
              <div className="figma-auth-chamfer-card">
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
      <section aria-label="Live race telemetry timing" className="figma-telemetry-bar">
        <div className="figma-live-cell">
          <span className="figma-live-dot-solid" />
          <span>LIVE</span>
        </div>
        <div className="figma-telemetry-scroll">
          <span>LAP [TIMEDATA]</span>
          <span className="figma-telemetry-slash">/</span>
          <span>[NAM1] [TIMEDATA1]</span>
          <span className="figma-telemetry-slash">/</span>
          <span>[NAM2] [TIMEDATA2]</span>
          <span className="figma-telemetry-slash">/</span>
          <span>[NAM3] [TIMEDATA3]</span>
          <span className="figma-telemetry-slash">/</span>
          <span className="figma-phase-red">[PHASE]</span>
        </div>
      </section>

      {/* =====================================================================
          4. TRUSTED TEAMS SPONSORS STRIP
          ===================================================================== */}
      <section className="figma-trusted-section">
        <h2 className="figma-trusted-heading">
          TRUSTED BY THE WORLD&apos;S MOST INNOVATIVE TEAMS
        </h2>
        <div className="figma-teams-row">
          <div className="figma-team-logo-item">
            <Image src="/imgAlfa800X800.png" alt="Alfa Romeo" fill className="object-contain" />
          </div>
          <div className="figma-team-logo-item">
            <Image src="/imgAlpha800X800.png" alt="AlphaTauri" fill className="object-contain" />
          </div>
          <div className="figma-team-logo-item">
            <Image src="/imgAlpine800X800.png" alt="Alpine" fill className="object-contain" />
          </div>
          <div className="figma-team-logo-item">
            <Image src="/imgAston800X800.png" alt="Aston Martin" fill className="object-contain" />
          </div>
          <div className="figma-team-logo-item">
            <Image src="/imgFerrari800X800.png" alt="Ferrari" fill className="object-contain" />
          </div>
          <div className="figma-team-logo-item">
            <Image src="/imgHaas800X800.png" alt="Haas" fill className="object-contain" />
          </div>
          <div className="figma-team-logo-item">
            <Image src="/imgMcLaren800X800.png" alt="McLaren" fill className="object-contain" />
          </div>
          <div className="figma-team-logo-item">
            <Image src="/imgMercedes800X800.png" alt="Mercedes" fill className="object-contain" />
          </div>
          <div className="figma-team-logo-item">
            <Image src="/imgRedbull800X8001.png" alt="Red Bull Racing" fill className="object-contain" />
          </div>
          <div className="figma-team-logo-item">
            <Image src="/imgTeamWilliams.png" alt="Williams" fill className="object-contain" />
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. PIRELLI TIRE COMPOUNDS STRIP DIVIDER
          ===================================================================== */}
      <section className="figma-tires-divider-section" aria-hidden="true">
        <div className="figma-tires-line" />
        <div className="figma-tires-cluster">
          <div className="figma-tire-item">
            <Image src="/soft-red-tire-134-5892.png" alt="Pirelli Soft Red Compound" fill className="object-contain" />
          </div>
          <div className="figma-tire-item">
            <Image src="/soft-yellow-tire-134-5985.png" alt="Pirelli Medium Yellow Compound" fill className="object-contain" />
          </div>
          <div className="figma-tire-item">
            <Image src="/soft-white-tire-134-6078.png" alt="Pirelli Hard White Compound" fill className="object-contain" />
          </div>
          <div className="figma-tire-item">
            <Image src="/soft-green-tire-134-6171.png" alt="Pirelli Intermediate Green Compound" fill className="object-contain" />
          </div>
          <div className="figma-tire-item">
            <Image src="/soft-blue-tire-134-6264.png" alt="Pirelli Wet Blue Compound" fill className="object-contain" />
          </div>
        </div>
      </section>

      {/* =====================================================================
          6. WIREFRAME PROPOSAL FOOTER
          ===================================================================== */}
      <footer className="figma-page-footer">
        <div className="figma-footer-content-grid">
          {/* Brand Column */}
          <div className="figma-footer-brand-col">
            <div className="figma-footer-logo-box">
              <Image
                src="/imgLogoContainer.png"
                alt="Formula 1 Logo"
                fill
                className="object-contain object-left"
              />
            </div>
            <span className="figma-footer-details-txt">[Details]</span>
            <div className="figma-footer-socials">
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="figma-social-pill" aria-label="Facebook">
                <Image src="/imgFacebook.svg" alt="Facebook" width={14} height={14} />
              </Link>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="figma-social-pill" aria-label="Twitter">
                <Image src="/imgTwitter.svg" alt="Twitter" width={14} height={14} />
              </Link>
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="figma-social-pill" aria-label="Instagram">
                <Image src="/imgInstagram.svg" alt="Instagram" width={14} height={14} />
              </Link>
              <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="figma-social-pill" aria-label="YouTube">
                <Image src="/imgYoutube.svg" alt="YouTube" width={14} height={14} />
              </Link>
            </div>
          </div>

          {/* Directory Column 1 */}
          <div className="figma-footer-links-col">
            <h3 className="figma-footer-col-title">[PAGE]</h3>
            <Link href="#page1" className="figma-footer-link">[Page]</Link>
            <Link href="#page2" className="figma-footer-link">[Page]</Link>
            <Link href="#page3" className="figma-footer-link">[Page]</Link>
            <Link href="#page4" className="figma-footer-link">[Page]</Link>
          </div>

          {/* Directory Column 2 */}
          <div className="figma-footer-links-col">
            <h3 className="figma-footer-col-title">[PAGE]</h3>
            <Link href="#page1" className="figma-footer-link">[Page]</Link>
            <Link href="#page2" className="figma-footer-link">[Page]</Link>
            <Link href="#page3" className="figma-footer-link">[Page]</Link>
            <Link href="#page4" className="figma-footer-link">[Page]</Link>
          </div>

          {/* Newsletter Column */}
          <div className="figma-footer-newsletter-col">
            <h3 className="figma-newsletter-title">JOIN THE NEWSLETTER</h3>
            <p className="figma-newsletter-desc">
              Subscribe for exclusive drop access and pre-season testing details.
            </p>
            <form action="#newsletter" className="figma-newsletter-input-combo">
              <input
                type="email"
                placeholder="Enter your email address..."
                className="figma-newsletter-field"
                aria-label="Email address for newsletter"
              />
              <button type="submit" className="figma-newsletter-submit">
                SUBSCRIBE
              </button>
            </form>
            <p className="figma-newsletter-terms">
              By subscribing, you agree to our Privacy Policy and Terms of Use.
            </p>
          </div>
        </div>

        {/* Bottom Legal Notice */}
        <div className="figma-footer-bottom-bar">
          <p>© 2026 Formula One Digital Media Limited. Merchandise Wireframe Proposal. All Rights Reserved.</p>
          <div className="figma-footer-legal-links">
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
