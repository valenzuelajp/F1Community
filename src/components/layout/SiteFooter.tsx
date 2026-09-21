'use client';

import React from 'react';
import Link from 'next/link';
import './layout.css';

/**
 * Site Footer Component
 *
 * Provides customer service links, store info, and newsletter signup.
 * Styles are cleanly separated into `layout.css`.
 */
export function SiteFooter() {
  return (
    <footer className="site-footer" aria-label="Site footer">
      <div className="footer-container">

        {/* 4-column footer layout */}
        <div className="footer-main-grid">
          {/* Brand and overview */}
          <div className="footer-col-about">
            <div className="footer-brand">
              <div className="footer-brand-square" />
              <span className="footer-brand-title">
                F1 SHOP
              </span>
            </div>
            <p className="max-w-sm leading-relaxed text-gray-400">
              The official hub for premium Formula 1 constructors, driver replica apparel, and accessory components.
            </p>
          </div>

          {/* Customer service links */}
          <div className="footer-col-links">
            <h4 className="footer-col-heading">
              CUSTOMER SERVICE
            </h4>
            <ul className="footer-links-list">
              <li><Link href="#contact" className="footer-nav-link">Contact Us</Link></li>
              <li><Link href="#shipping" className="footer-nav-link">Shipping &amp; Delivery</Link></li>
              <li><Link href="#returns" className="footer-nav-link">Returns &amp; Refunds</Link></li>
              <li><Link href="#size-guide" className="footer-nav-link">Size Guide</Link></li>
            </ul>
          </div>

          {/* Company links */}
          <div className="footer-col-links">
            <h4 className="footer-col-heading">
              ABOUT SHOP
            </h4>
            <ul className="footer-links-list">
              <li><Link href="#heritage" className="footer-nav-link">Our Heritage</Link></li>
              <li><Link href="#sustainability" className="footer-nav-link">Sustainability</Link></li>
              <li><Link href="#careers" className="footer-nav-link">Careers</Link></li>
              <li><Link href="#licensing" className="footer-nav-link">Official Licensing</Link></li>
            </ul>
          </div>

          {/* Newsletter subscription form */}
          <div className="footer-col-newsletter">
            <h4 className="footer-col-heading">
              JOIN THE NEWSLETTER
            </h4>
            <p className="leading-relaxed text-gray-400">
              Subscribe for exclusive drop access and pre-season testing details.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="newsletter-form" aria-label="Newsletter subscription">
              <input
                type="email"
                placeholder="Enter your email address..."
                className="newsletter-input"
              />
              <button
                type="submit"
                className="newsletter-btn"
              >
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>

        {/* Legal & copyright bar */}
        <div className="footer-bottom-bar">
          <p>© 2026 Formula One Digital Media Limited. All Rights Reserved.</p>
          <nav className="footer-legal-links" aria-label="Legal links">
            <Link href="#privacy" className="hover:text-gray-400 transition-colors">Privacy Policy</Link>
            <Link href="#terms" className="hover:text-gray-400 transition-colors">Terms of Use</Link>
            <Link href="#cookies" className="hover:text-gray-400 transition-colors">Cookies</Link>
          </nav>
        </div>

      </div>
    </footer>
  );
}