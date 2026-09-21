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
      <div className="header-inner">

        {/* Brand Link */}
        <Link href="/" className="header-brand group">
          <div className="header-brand-badge">
            <div className="header-brand-shimmer" />
          </div>
          <span className="header-brand-title">
            F1 PHILIPPINES
          </span>
        </Link>

        {/* Main Navigation Links */}
        <nav className="header-nav" aria-label="Main navigation">
          <Link href="/new-arrivals" className="header-nav-link">
            NEW ARRIVALS
          </Link>
          <Link href="/teams" className="header-nav-link">
            TEAMS
          </Link>
          <Link href="/drivers" className="header-nav-link">
            DRIVERS
          </Link>
          <Link href="/accessories" className="header-nav-link">
            ACCESSORIES
          </Link>
          <Link href="/sale" className="header-sale-pill">
            <Zap className="h-3 w-3 fill-current text-[#ff1801]" />
            SALE
          </Link>
        </nav>

        {/* Right Actions: Search, Auth, Profile, Cart */}
        <div className="header-actions">
          <div className="header-search">
            <div className="header-search-icon">
              <Search className="h-3.5 w-3.5" />
            </div>
            <input
              type="text"
              placeholder="Search Store..."
              className="header-search-input"
              aria-label="Search store"
            />
          </div>

          <Link href="/login" className="header-signin">
            Sign In
          </Link>

          <div className="header-icon-btn" role="button" aria-label="User account" tabIndex={0}>
            <User className="h-4 w-4" />
          </div>

          <div className="header-cart" role="button" aria-label="Shopping cart, 3 items" tabIndex={0}>
            <ShoppingBag className="h-4 w-4 text-gray-300" />
            <span className="header-cart-count" aria-hidden="true">
              3
            </span>
          </div>
        </div>

      </div>
    </header>
  );
}