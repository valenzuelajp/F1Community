'use client';

import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#08090e] pt-12 pb-8 text-xs text-gray-400">
      <div className="w-full px-6 sm:px-10 lg:px-16 space-y-10">

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
              <li><Link href="#contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="#shipping" className="hover:text-white transition-colors">Shipping & Delivery</Link></li>
              <li><Link href="#returns" className="hover:text-white transition-colors">Returns & Refunds</Link></li>
              <li><Link href="#size-guide" className="hover:text-white transition-colors">Size Guide</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-bold text-white uppercase text-xs tracking-wider">
              ABOUT SHOP
            </h4>
            <ul className="space-y-2">
              <li><Link href="#heritage" className="hover:text-white transition-colors">Our Heritage</Link></li>
              <li><Link href="#sustainability" className="hover:text-white transition-colors">Sustainability</Link></li>
              <li><Link href="#careers" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="#licensing" className="hover:text-white transition-colors">Official Licensing</Link></li>
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
                className="flex-1 px-3.5 py-2.5 bg-[#12151e] border border-white/10 rounded-md text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-[#ff1801] focus:ring-1 focus:ring-[#ff1801]/30 transition-all"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-gradient-to-r from-[#ff1801] to-[#e01500] hover:from-[#ff2d1a] hover:to-[#ff1801] text-white font-extrabold text-xs uppercase tracking-wider rounded-md transition-all shadow-md shadow-red-600/30 hover:shadow-red-600/50 shrink-0 cursor-pointer"
              >
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-500 text-[11px]">
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