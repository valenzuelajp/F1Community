import Link from 'next/link';
import { Search, ShoppingBag, User, Zap } from 'lucide-react';

export function SiteHeader() {
  return (
    <header className="border-b border-white/10 bg-[#090b10]/95 backdrop-blur-md sticky top-0 z-50">
      <div className="w-full px-6 sm:px-10 lg:px-16 h-16 flex items-center justify-between">

        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-6 h-3.5 bg-gradient-to-r from-[#ff1801] to-[#e01500] rounded-[2px] shadow-sm shadow-red-600/50 group-hover:scale-105 transition-transform overflow-hidden">
            <div className="absolute inset-0 bg-white/20 -skew-x-12 translate-x-[-150%] group-hover:translate-x-[200%] transition-transform duration-700" />
          </div>
          <span className="font-extrabold tracking-wider text-sm sm:text-base text-white uppercase group-hover:text-red-400 transition-colors flex items-center gap-1.5">
            F1 PHILIPPINES
          </span>
        </Link>

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
            <Zap className="w-3 h-3 text-[#ff1801] fill-current" />
            SALE
          </Link>
        </nav>

        <div className="flex items-center gap-4 sm:gap-5">
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

          <Link
            href="/login"
            className="px-3.5 py-1.5 bg-[#141824] hover:bg-[#1a2030] border border-white/10 hover:border-red-500/30 rounded-md text-xs font-semibold text-white transition-all shadow-xs"
          >
            Sign In
          </Link>

          <div className="text-gray-400 hover:text-white cursor-pointer transition-colors p-1">
            <User className="w-4 h-4" />
          </div>

          <div className="relative cursor-pointer hover:opacity-80 transition-opacity p-1 group">
            <ShoppingBag className="w-4 h-4 text-gray-300 group-hover:text-white transition-colors" />
            <span className="absolute -top-1 -right-2 bg-gradient-to-r from-[#ff1801] to-[#d60e00] text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-sm shadow-red-600/50">
              3
            </span>
          </div>
        </div>

      </div>
    </header>
  );
}