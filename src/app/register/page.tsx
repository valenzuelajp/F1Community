import React, { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { Countdown } from "@/components/f1/Countdown";
import {
  fallbackF1Event,
  getNextF1Event,
  getTopDrivers,
} from "@/lib/f1/jolpica";
import type { F1StandingDriver } from "@/lib/f1/jolpica";
import "../login/login.css";

export const metadata: Metadata = {
  title: "Create Account",
  description:
    "Join the grid and create your account for race predictions, live standings, and team gear.",
};

/**
 * Register Page — 1:1 copy of the login shell.
 * Same header, hero, telemetry, podium, teams, tires, footer.
 * Only the auth card swaps LoginForm → RegisterForm.
 */
export default async function RegisterPage() {
  let event = fallbackF1Event();
  try {
    event = await getNextF1Event();
  } catch {
    // keep fallback
  }

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
    <main className="page">
      <div className="register__shell">

        {/* --- Top Navigation Header --- */}
        <header className="register__header">
          <div className="register__header-topline" />
          <div className="register__header-inner">
            <div className="register__logo">
              <Image
                src="/imgLogoContainer.png"
                alt="Formula 1 Logo"
                fill
                className="object-contain object-left"
              />
            </div>

            <div className="register__badge">
              <span className="register__dot" />
              <span>Free account</span>
            </div>
          </div>
        </header>

        {/* --- Register Form Section --- */}
        <section className="register__form-area">
          <div className="register__glow" />
          <div className="bg-racing-grid absolute inset-0 opacity-20" />

          <div className="register__content">
            <div className="register__card-wrap">
              <div className="register__card">
                {/* Racing corner accents */}
                <div className="racing-stripes-accent" aria-hidden="true">
                  <span className="racing-stripe" />
                  <span className="racing-stripe" />
                  <span className="racing-stripe" />
                </div>

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
