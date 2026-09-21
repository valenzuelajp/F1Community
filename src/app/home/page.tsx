import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Flag, ShoppingBag, Trophy } from 'lucide-react';
import './home.css';

export const metadata: Metadata = {
  title: 'Home | F1 Community Philippines',
  description: 'Formula 1 community, race-week apparel, and collector essentials.',
};

/**
 * Member Home Page
 * 
 * Cleanly separated styling in `./home.css`.
 * Easy to read and edit for any developer or beginner joining the project.
 */
export default function MemberHomePage() {
  return (
    <main className="home-page font-sans selection:bg-[#ff1801] selection:text-white">
      {/* Background radial glow */}
      <div className="home-radial-light" />

      {/* Hero Section */}
      <section className="home-hero-section bg-racing-grid">
        <div className="home-hero-container">

          {/* Tag badge */}
          <div className="home-pill-badge">
            <Flag className="h-4 w-4 text-red-500" />
            <span>Formula 1 Community Philippines</span>
          </div>

          {/* Hero Headline */}
          <h1 className="home-hero-headline f1-text-gradient">
            GEAR UP.<br />BRAKE LATE. FINISH FIRST.
          </h1>

          {/* Subtitle */}
          <p className="home-hero-subtext">
            Premium replicas, race-week apparel, and collector essentials from your favourite constructors and drivers.
          </p>

          {/* Call to Action Buttons */}
          <div className="home-actions-group">
            <Link href="#collection" className="home-btn-primary">
              <ShoppingBag className="h-4 w-4" />
              <span>Shop the collection</span>
            </Link>

            <Link href="#deals" className="home-btn-secondary">
              <Trophy className="h-4 w-4 text-red-500" />
              <span>Race week deals</span>
            </Link>
          </div>

        </div>
      </section>
    </main>
  );
}
