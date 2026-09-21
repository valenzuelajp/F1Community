import React from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, User, Zap } from 'lucide-react';
import './layout.css';

/**
 * Site Header Component
 *
 * Provides main navigation, store search, and profile/cart actions.
 * Styles are separated into `layout.css`.
 */
export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header-container">

        {/* Brand Link */}
        <Link href="/" className="brand-link group">
          <div className="brand-badge-square">
            <div className="brand-shimmer" />
          </div>
          <span className="brand-title">
            F1 PHILIPPINES
          </span>
        </Link>

        {/* Main Navigation Links */}
        <nav className="site-nav">
          <Link href="/new-arrivals" className="site-nav-link">
            NEW ARRIVALS
          </Link>
          <Link href="/teams" className="site-nav-link">
            TEAMS
          </Link>
          <Link href="/drivers" className="site-nav-link">
            DRIVERS
          </Link>
          <Link href="/accessories" className="site-nav-link">
            ACCESSORIES
          </Link>
          <Link href="/sale" className="nav-sale-pill">
            <Zap className="h-3 w-3 fill-current text-[#ff1801]" />
            SALE
          </Link>
        </nav>

        {/* Right Actions: Search, Auth, Profile, Cart */}
        <div className="header-actions">
          <div className="search-input-box">
            <div className="search-icon">
              <Search className="h-3.5 w-3.5" />
            </div>
            <input
              type="text"
              placeholder="Search Store..."
              className="search-input-field"
            />
          </div>

          <Link href="/login" className="btn-sign-in">
            Sign In
          </Link>

          <div className="header-icon-btn">
            <User className="h-4 w-4" />
          </div>

          <div className="cart-icon-btn">
            <ShoppingBag className="h-4 w-4 text-gray-300" />
            <span className="cart-counter-badge">
              3
            </span>
          </div>
        </div>

      </div>
    </header>
  );
}