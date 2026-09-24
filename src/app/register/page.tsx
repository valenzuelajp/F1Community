import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { RegisterForm } from '@/components/auth/RegisterForm';
import './register.css';

export const metadata: Metadata = {
  title: 'Create Account – Join F1 Store',
  description: 'Create your free F1 Store account for race predictions, live standings, and exclusive Formula 1 team gear.',
  openGraph: {
    title: 'Create Account – Join F1 Store',
    description: 'Create your free F1 Store account for race predictions, live standings, and exclusive Formula 1 team gear.',
    url: 'https://f1store.com/register',
  },
  alternates: {
    canonical: 'https://f1store.com/register',
  },
};

/**
 * Register Page
 *
 * Cleanly separated styling in `./register.css` to allow easy edits
 * without nested utility clutter.
 */
export default function RegisterPage() {
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
                alt="F1 Logo"
                fill
                sizes="(max-width: 640px) 180px, 205px"
                className="object-cover object-center drop-shadow-[0_0_18px_rgba(255,24,1,0.22)]"
                priority
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

                <RegisterForm />
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}