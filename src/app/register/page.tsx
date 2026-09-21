import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { RegisterForm } from '@/components/auth/RegisterForm';
import './register.css';

export const metadata: Metadata = {
  title: 'Create Account | F1 Hub',
  description: 'Join the grid and create your account for race predictions, live standings, and team gear.',
};

/**
 * Register Page
 *
 * Cleanly separated styling in `./register.css` to allow easy edits
 * without nested utility clutter.
 */
export default function RegisterPage() {
  return (
    <main className="register-page">
      <div className="register-container">

        {/* --- Top Navigation Header --- */}
        <header className="register-header">
          <div className="register-header-topline" />
          <div className="register-header-content">
            <div className="register-logo-box">
              <Image
                src="/imgLogoContainer.png"
                alt="F1 Logo"
                fill
                sizes="(max-width: 640px) 180px, 205px"
                className="object-cover object-center drop-shadow-[0_0_18px_rgba(255,24,1,0.22)]"
                priority
              />
            </div>

            <div className="register-badge-pill">
              <span className="register-status-dot" />
              <span>Free account</span>
            </div>
          </div>
        </header>

        {/* --- Register Form Section --- */}
        <section className="register-form-section">
          <div className="register-glow-layer" />
          <div className="bg-racing-grid absolute inset-0 opacity-20" />

          <div className="register-content-wrapper">
            <div className="register-card-wrapper">
              <div className="register-card">
                {/* Racing corner accents */}
                <div className="racing-stripes-accent" aria-hidden="true">
                  <span className="racing-stripe" />
                  <span className="racing-stripe" />
                  <span className="racing-stripe" />
                </div>

                <RegisterForm />
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}