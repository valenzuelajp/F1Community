import Link from 'next/link';
import { Search, ShoppingBag, User, Zap } from 'lucide-react';

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">

        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-6 h-3.5 bg-gradient-to-r from-[#ff1801] to-[#e01500] rounded-[2px] shadow-sm shadow-red-600/50 group-hover:scale-105 transition-transform overflow-hidden">
            <div className="absolute inset-0 bg-white/20 -skew-x-12 translate-x-[-150%] group-hover:translate-x-[200%] transition-transform duration-700" />
          </div>
          <span className="font-extrabold tracking-wider text-sm sm:text-base text-white uppercase group-hover:text-red-400 transition-colors flex items-center gap-1.5">
            F1 PHILIPPINES
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 lg:gap-9 text-xs font-bold tracking-wider text-gray-300 uppercase">
          <Link href="/new-arrivals" className="nav-link">
            NEW ARRIVALS
          </Link>
          <Link href="/teams" className="nav-link">
            TEAMS
          </Link>
          <Link href="/drivers" className="nav-link">
            DRIVERS
          </Link>
          <Link href="/accessories" className="nav-link">
            ACCESSORIES
          </Link>
          <Link href="/sale" className="sale-badge">
            <Zap className="w-3 h-3 text-[#ff1801] fill-current" />
            SALE
          </Link>
        </nav>

        <div className="site-header__actions">
          <div className="relative hidden sm:block">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <Search className="w-3.5 h-3.5" />
            </div>
            <input
              type="text"
              placeholder="Search Store..."
              className="search-input"
            />
          </div>

          <Link href="/login" className="btn-signin">
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