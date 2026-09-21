import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { LoginForm } from '@/components/auth/LoginForm';
import './login.css';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your F1 Store account to access live timing, race predictions, and exclusive Formula 1 merchandise updates.',
  openGraph: {
    title: 'Sign In – F1 Store Account',
    description: 'Sign in to your F1 Store account to access live timing, race predictions, and exclusive Formula 1 merchandise updates.',
    url: 'https://f1store.com/login',
  },
  alternates: {
    canonical: 'https://f1store.com/login',
  },
};

/**
 * Formula 1 Login Page
 *
 * Pixel-accurate implementation matching reference wireframe:
 * - High-intensity racing hero with crowd backdrop, giant outline "SPRINT QUALI" title,
 *   star orbit ornament, celebrating driver cutout, "01" watermark, plus cross matrix,
 *   and cyber-chamfered login card
 * - Live telemetry timing ticker bar with glowing LIVE indicator
 * - Constructor sponsors strip showcasing all 10 F1 team logos
 * - Pirelli 5-compound tires divider with horizontal center strike
 */
export default function LoginPage() {
  return (
    <main className="page">
      {/* =====================================================================
          HERO BANNER & LOGIN CARD STAGE
          ===================================================================== */}
      <section className="hero">
        {/* Background Atmosphere Layers */}
        <div className="hero__backdrop">
          <Image
            src="/imgLogin.png"
            alt="Crowd cheering at the Grand Prix"
            fill
            sizes="100vw"
            className="object-cover object-bottom"
            priority
          />
        </div>
        <div className="hero__overlay" aria-hidden="true" />

        {/* Hero Content Container */}
        <div className="hero__inner">
          <div className="hero__grid">

            {/* Left Column: SPRINT QUALI Title & Metadata Hooks */}
            <div className="hero__left">
              <div className="hero__title-wrap">
                <h1 className="hero__title">
                  SPRINT<br />QUALIFY
                </h1>
                <div className="hero__star" aria-hidden="true">
                  <Image
                    src="/img104.svg"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* F1 Car/Logo Badge */}
              <div className="hero__badge" aria-hidden="true">
                <Image
                  src="/imgLogoContainer.png"
                  alt=""
                  fill
                  className="object-contain object-left"
                />
              </div>

              {/* Metadata Labels */}
              <div className="hero__meta">
                <span className="meta__hook">LIVE</span>
                <span className="meta__title">RACE WEEKEND</span>
                <span className="meta__details">QUALIFYING SESSION</span>
              </div>

              {/* Real-time Interaction Statistics */}
              <div className="stats">
                <div className="stats__item">
                  <span className="stats__value--red">12,500+</span>
                  <span className="stats__label">ACTIVE FANATICS</span>
                </div>
                <div className="stats__item">
                  <span className="stats__value">98.7★</span>
                  <span className="stats__label">PREDICTION RATING</span>
                </div>
              </div>
            </div>

            {/* Right Column: Floating Chamfered Auth Card with Driver Composition */}
            <div className="auth-card">
              {/* "01" Watermark behind card & driver */}
              <span className="hero__watermark" aria-hidden="true">01</span>

              {/* Driver celebrating cutout */}
              <div className="hero__driver" aria-hidden="true">
                <Image
                  src="/imgSticker1.png"
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 340px, 520px"
                  className="object-contain object-bottom drop-shadow-[0_28px_35px_rgba(0,0,0,0.85)]"
                />
              </div>

              {/* Plus grid matrix */}
              <div className="hero__plus-grid" aria-hidden="true">
                <Image
                  src="/imgOrnament24.svg"
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>

              {/* The Login Card */}
              <div className="auth-card__inner">
                <Suspense fallback={<div className="h-72 animate-pulse rounded bg-white/5" />}>
                  <LoginForm />
                </Suspense>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================================
          LIVE TIMING TELEMETRY TICKER
          ===================================================================== */}
      <section aria-label="Live race telemetry timing" className="telemetry">
        <div className="telemetry__live">
          <span className="telemetry__dot" />
          <span>LIVE</span>
        </div>
        <div className="telemetry__data">
          <span>LAP 42/57</span>
          <span className="telemetry__slash">/</span>
          <span>VER 1:31.456</span>
          <span className="telemetry__slash">/</span>
          <span>NOR 1:31.789</span>
          <span className="telemetry__slash">/</span>
          <span>LEC 1:32.012</span>
          <span className="telemetry__slash">/</span>
          <span className="telemetry__phase">SECTOR 3</span>
        </div>
      </section>

      {/* =====================================================================
          TRUSTED TEAMS SPONSORS STRIP
          ===================================================================== */}
      <section className="teams">
        <h2 className="teams__heading">
          TRUSTED BY THE WORLD&apos;S MOST INNOVATIVE TEAMS
        </h2>
        <div className="teams__row">
          <div className="teams__logo">
            <Image src="/imgAlfa800X800.png" alt="Alfa Romeo" fill className="object-contain" />
          </div>
          <div className="teams__logo">
            <Image src="/imgAlpha800X800.png" alt="AlphaTauri" fill className="object-contain" />
          </div>
          <div className="teams__logo">
            <Image src="/imgAlpine800X800.png" alt="Alpine" fill className="object-contain" />
          </div>
          <div className="teams__logo">
            <Image src="/imgAston800X800.png" alt="Aston Martin" fill className="object-contain" />
          </div>
          <div className="teams__logo">
            <Image src="/imgFerrari800X800.png" alt="Ferrari" fill className="object-contain" />
          </div>
          <div className="teams__logo">
            <Image src="/imgHaas800X800.png" alt="Haas" fill className="object-contain" />
          </div>
          <div className="teams__logo">
            <Image src="/imgMcLaren800X800.png" alt="McLaren" fill className="object-contain" />
          </div>
          <div className="teams__logo">
            <Image src="/imgMercedes800X800.png" alt="Mercedes" fill className="object-contain" />
          </div>
          <div className="teams__logo">
            <Image src="/imgRedbull800X8001.png" alt="Red Bull Racing" fill className="object-contain" />
          </div>
          <div className="teams__logo">
            <Image src="/imgTeamWilliams.png" alt="Williams" fill className="object-contain" />
          </div>
        </div>
      </section>

      {/* =====================================================================
          PIRELLI TIRE COMPOUNDS STRIP DIVIDER
          ===================================================================== */}
      <section className="tires" aria-hidden="true">
        <div className="tires__line" />
        <div className="tires__cluster">
          <div className="tires__item">
            <Image src="/soft-red-tire-134-5892.png" alt="Pirelli Soft Red Compound" fill className="object-contain" />
          </div>
          <div className="tires__item">
            <Image src="/soft-yellow-tire-134-5985.png" alt="Pirelli Medium Yellow Compound" fill className="object-contain" />
          </div>
          <div className="tires__item">
            <Image src="/soft-white-tire-134-6078.png" alt="Pirelli Hard White Compound" fill className="object-contain" />
          </div>
          <div className="tires__item">
            <Image src="/soft-green-tire-134-6171.png" alt="Pirelli Intermediate Green Compound" fill className="object-contain" />
          </div>
          <div className="tires__item">
            <Image src="/soft-blue-tire-134-6264.png" alt="Pirelli Wet Blue Compound" fill className="object-contain" />
          </div>
        </div>
      </section>
    </main>
  );
}
