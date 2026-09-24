import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Flag, ShoppingBag, Trophy } from 'lucide-react';
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
 * Member Home Page
 * 
 * Cleanly separated styling in `./home.css`.
 * Easy to read and edit for any developer or beginner joining the project.
 */
export default function MemberHomePage() {
  return (
    <main className="page font-sans selection:bg-[#ff1801] selection:text-white">
      {/* Background radial glow */}
      <div className="page__glow" />

      {/* Hero Section */}
      <section className="hero bg-racing-grid">
        <div className="hero__inner">

          {/* Tag badge */}
          <div className="hero__badge">
            <Flag className="h-4 w-4 text-red-500" />
            <span>Formula 1 Community Philippines</span>
          </div>

          {/* Hero Headline */}
          <h1 className="hero__headline f1-text-gradient">
            GEAR UP.<br />BRAKE LATE. FINISH FIRST.
          </h1>

          {/* Subtitle */}
          <p className="hero__subtext">
            Premium replicas, race-week apparel, and collector essentials from your favourite constructors and drivers.
          </p>

          {/* Call to Action Buttons */}
          <div className="hero__actions">
            <Link href="/home" className="hero__btn--primary">
              <ShoppingBag className="h-4 w-4" />
              <span>Shop the collection</span>
            </Link>

            <Link href="/home" className="hero__btn--secondary">
              <Trophy className="h-4 w-4 text-red-500" />
              <span>Race week deals</span>
            </Link>
          </div>

        </div>
      </section>
    </main>
  );
}
