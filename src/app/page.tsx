import Link from 'next/link';
import { Flag, ShoppingBag, LogIn, ShieldCheck, Truck, Trophy } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="flex-1 bg-[#090b10] text-gray-200 font-sans selection:bg-[#ff1801] selection:text-white relative overflow-hidden">
      {/* Ambient Track Lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[32rem] h-[32rem] bg-red-600/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative bg-racing-grid">
        <div className="w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-28 text-center z-10 relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-950/80 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-widest mb-6">
            <Flag className="w-4 h-4 text-red-500 animate-pulse" />
            Official Formula 1 Merchandise — Philippines
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight uppercase leading-none f1-text-gradient">
            GEAR UP.<br />BRAKE LATE.&nbsp; FINISH FIRST.
          </h1>

          <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto mt-6 leading-relaxed">
            Premium replicas, race-week apparel, and collector essentials from your favorite constructors and
            drivers — shipped straight to your pit box.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-8">
            <Link
              href="/new-arrivals"
              className="group relative inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#ff1801] to-[#e01500] hover:from-[#ff2d1a] hover:to-[#ff1801] text-white font-extrabold text-xs uppercase tracking-wider rounded-lg overflow-hidden shadow-lg shadow-red-600/30 hover:shadow-red-600/50 transition-all"
            >
              <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <ShoppingBag className="w-4 h-4" />
              Shop the Collection
            </Link>
            <Link
              href="/sale"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all"
            >
              <Trophy className="w-4 h-4 text-red-500" />
              Race Week Deals
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-y border-white/10 bg-[#0d1017]">
        <div className="w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-xs text-gray-400">
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% Official Licensed Gear</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Truck className="w-4 h-4 text-emerald-400" />
            <span>Direct Factory Shipments</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <LogIn className="w-4 h-4 text-emerald-400" />
            <Link href="/login" className="hover:text-white transition-colors">
              Member Access Portal
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}