'use client';

import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-4 h-2.5 bg-[#ff1801] rounded-[2px]" />
              <span className="font-extrabold text-sm text-white tracking-wider uppercase">
                F1 SHOP
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              The official hub for premium Formula 1 constructors, driver replica apparel, and accessory components. Wireframe prototype.
            </p>
          </div>

          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-bold text-white uppercase text-xs tracking-wider">
              CUSTOMER SERVICE
            </h4>
            <ul className="space-y-2">
              <li><Link href="#contact" className="footer-link">Contact Us</Link></li>
              <li><Link href="#shipping" className="footer-link">Shipping & Delivery</Link></li>
              <li><Link href="#returns" className="footer-link">Returns & Refunds</Link></li>
              <li><Link href="#size-guide" className="footer-link">Size Guide</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-bold text-white uppercase text-xs tracking-wider">
              ABOUT SHOP
            </h4>
            <ul className="space-y-2">
              <li><Link href="#heritage" className="footer-link">Our Heritage</Link></li>
              <li><Link href="#sustainability" className="footer-link">Sustainability</Link></li>
              <li><Link href="#careers" className="footer-link">Careers</Link></li>
              <li><Link href="#licensing" className="footer-link">Official Licensing</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-bold text-white uppercase text-xs tracking-wider">
              JOIN THE NEWSLETTER
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Subscribe for exclusive drop access and pre-season testing details.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2 pt-1">
              <input
                type="email"
                placeholder="Enter your email address..."
                className="newsletter-input"
              />
              <button type="submit" className="subscribe-btn">
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Formula One Digital Media Limited. Merchandise Wireframe Proposal. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="#privacy" className="hover:text-gray-400 transition-colors">Privacy Policy</Link>
            <Link href="#terms" className="hover:text-gray-400 transition-colors">Terms of Use</Link>
            <Link href="#cookies" className="hover:text-gray-400 transition-colors">Cookies</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}