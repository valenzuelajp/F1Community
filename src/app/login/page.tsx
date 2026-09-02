'use client';

import React from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, User, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import { LoginForm } from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#090b10] text-gray-200 flex flex-col justify-between font-sans selection:bg-[#ff1801] selection:text-white relative overflow-x-hidden">
      {/* -------------------- Subtle Ambient Track Lighting -------------------- */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 right-1/4 w-[32rem] h-[32rem] bg-red-600/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* -------------------- Top Navigation Bar -------------------- */}
      <header className="border-b border-white/10 bg-[#090b10]/95 backdrop-blur-md sticky top-0 z-50">
        <div className="w-full px-6 sm:px-10 lg:px-16 h-16 flex items-center justify-between">
          
          {/* Left Brand */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-6 h-3.5 bg-gradient-to-r from-[#ff1801] to-[#e01500] rounded-[2px] shadow-sm shadow-red-600/50 group-hover:scale-105 transition-transform overflow-hidden">
              <div className="absolute inset-0 bg-white/20 -skew-x-12 translate-x-[-150%] group-hover:translate-x-[200%] transition-transform duration-700" />
            </div>
            <span className="font-extrabold tracking-wider text-sm sm:text-base text-white uppercase group-hover:text-red-400 transition-colors flex items-center gap-1.5">
              F1 PHILIPPINES
            </span>
          </Link>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-9 text-xs font-bold tracking-wider text-gray-300 uppercase">
            <Link href="/new-arrivals" className="hover:text-white transition-colors relative py-1 hover:after:w-full after:w-0 after:h-0.5 after:bg-[#ff1801] after:absolute after:bottom-0 after:left-0 after:transition-all">
              NEW ARRIVALS
            </Link>
            <Link href="/teams" className="hover:text-white transition-colors relative py-1 hover:after:w-full after:w-0 after:h-0.5 after:bg-[#ff1801] after:absolute after:bottom-0 after:left-0 after:transition-all">
              TEAMS
            </Link>
            <Link href="/drivers" className="hover:text-white transition-colors relative py-1 hover:after:w-full after:w-0 after:h-0.5 after:bg-[#ff1801] after:absolute after:bottom-0 after:left-0 after:transition-all">
              DRIVERS
            </Link>
            <Link href="/accessories" className="hover:text-white transition-colors relative py-1 hover:after:w-full after:w-0 after:h-0.5 after:bg-[#ff1801] after:absolute after:bottom-0 after:left-0 after:transition-all">
              ACCESSORIES
            </Link>
            <Link
              href="/sale"
              className="flex items-center gap-1 text-[#ff1801] hover:text-white px-2.5 py-0.5 bg-red-950/40 border border-red-500/30 rounded text-[11px] font-extrabold tracking-widest transition-all hover:bg-[#ff1801] shadow-xs shadow-red-500/20"
            >
              <Zap className="w-3 h-3 text-[#ff1801] group-hover:text-white fill-current" />
              SALE
            </Link>
          </nav>

          {/* Right Action Items */}
          <div className="flex items-center gap-4 sm:gap-5">
            {/* Search Input Box */}
            <div className="relative hidden sm:block">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Search className="w-3.5 h-3.5" />
              </div>
              <input
                type="text"
                placeholder="Search Store..."
                className="w-44 lg:w-56 pl-9 pr-3.5 py-1.5 bg-[#12151f] border border-white/10 rounded-full text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-[#ff1801] focus:ring-1 focus:ring-[#ff1801]/30 transition-all"
              />
            </div>

            {/* Sign In Button / Pill */}
            <Link
              href="/login"
              className="px-3.5 py-1.5 bg-[#141824] hover:bg-[#1a2030] border border-white/10 hover:border-red-500/30 rounded-md text-xs font-semibold text-white transition-all shadow-xs"
            >
              Sign In
            </Link>

            {/* Profile Circle Icon */}
            <div className="text-gray-400 hover:text-white cursor-pointer transition-colors p-1">
              <User className="w-4 h-4" />
            </div>

            {/* Shopping Cart with Count */}
            <div className="relative cursor-pointer hover:opacity-80 transition-opacity p-1 group">
              <ShoppingBag className="w-4 h-4 text-gray-300 group-hover:text-white transition-colors" />
              <span className="absolute -top-1 -right-2 bg-gradient-to-r from-[#ff1801] to-[#d60e00] text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-sm shadow-red-600/50">
                3
              </span>
            </div>
          </div>

        </div>
      </header>

      {/* -------------------- Main Content (Full-Width Split Pane) -------------------- */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-white/10 min-h-[calc(100vh-16rem)]">
        
        {/* Left Brand & Hub Info Section */}
        <div className="flex flex-col justify-center items-center lg:items-end px-6 sm:px-12 py-12 lg:py-16 lg:pr-16 xl:pr-24 bg-[#0d1017] relative bg-racing-grid">
          <div className="max-w-md w-full space-y-8 relative z-10">
            
            <div className="space-y-4">
              <div className="w-14 h-8 bg-gradient-to-r from-[#ff1801] via-[#e01500] to-[#b30500] rounded-[2px] shadow-lg shadow-red-600/30 flex items-center justify-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-2 h-full bg-white/20 -skew-x-12" />
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight uppercase leading-none f1-text-gradient">
                F1 PHILIPPINES
              </h1>
              
              <p className="text-sm sm:text-base text-gray-400 font-normal leading-relaxed">
                The ultimate premium portal for Formula 1 fans and collectors in the Philippines.
              </p>
            </div>

            {/* Official Replicas Hub Card */}
            <div className="bg-gradient-to-b from-[#111420] to-[#0e111a] border border-white/10 hover:border-red-500/30 rounded-xl p-5 sm:p-6 space-y-4 shadow-xl transition-all group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#ff1801] animate-pulse" />
                  <span className="text-xs font-extrabold text-[#ff1801] uppercase tracking-wider">
                    OFFICIAL REPLICAS HUB
                  </span>
                </div>
                <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest px-2 py-0.5 rounded bg-white/5 border border-white/5">
                  AUTHENTICATED
                </span>
              </div>
              
              <div className="h-px bg-gradient-to-r from-red-600/40 via-white/10 to-transparent" />
              
              <div className="grid grid-cols-3 gap-2 text-xs sm:text-sm">
                <div className="space-y-0.5">
                  <span className="text-gray-400 text-[11px] block">Constructors:</span>
                  <span className="font-extrabold text-white text-sm">10</span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-gray-400 text-[11px] block">Drivers:</span>
                  <span className="font-extrabold text-white text-sm">20</span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-gray-400 text-[11px] block">Season:</span>
                  <span className="font-extrabold text-[#ff1801] text-sm">2026</span>
                </div>
              </div>
            </div>

            {/* Quality Guarantee Badge */}
            <div className="flex items-center gap-3 text-xs text-gray-400 pt-2">
              <div className="flex items-center gap-1.5 text-emerald-400/90 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Official Licensed Gear</span>
              </div>
              <span className="text-gray-600">•</span>
              <span className="text-gray-400">Direct Factory Shipments</span>
            </div>

          </div>
        </div>

        {/* Right Form Card Container */}
        <div className="flex flex-col justify-center items-center lg:items-start px-6 sm:px-12 py-12 lg:py-16 lg:pl-16 xl:pl-24 bg-[#090b10] relative">
          <div className="w-full max-w-[430px] bg-gradient-to-b from-[#121624] to-[#0e111a] border-t-2 border-t-[#ff1801] border-x border-b border-white/10 rounded-2xl p-7 sm:p-9 f1-card-glow space-y-6 relative">
            
            {/* Header in Card */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/50 border border-red-500/30 text-red-400 text-[10px] font-bold tracking-widest uppercase mb-1">
                <Sparkles className="w-3 h-3 text-[#ff1801]" />
                COMMUNITY PORTAL
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
                WELCOME BACK
              </h2>
              <p className="text-xs text-gray-400">
                Sign in to access your official F1 membership account.
              </p>
            </div>

            <LoginForm />
          </div>
        </div>

      </main>

      {/* -------------------- Footer Section -------------------- */}
      <footer className="border-t border-white/10 bg-[#08090e] pt-12 pb-8 text-xs text-gray-400">
        <div className="w-full px-6 sm:px-10 lg:px-16 space-y-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Col 1: Shop Intro */}
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

            {/* Col 2: Customer Service */}
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

            {/* Col 3: About Shop */}
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

            {/* Col 4: Join Newsletter */}
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

          {/* Bottom Bar */}
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
    </div>
  );
}


