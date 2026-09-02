import Link from 'next/link';
import { Flag, ShoppingBag, LogIn } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-red-600/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-3xl z-10 space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-950/80 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-widest">
          <Flag className="w-4 h-4 text-red-500 animate-pulse" />
          F1 Platform — Website & Store
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
          Welcome to <span className="f1-gradient-text">F1 Platform</span>
        </h1>

        <p className="text-lg text-gray-300 max-w-xl mx-auto leading-relaxed">
          The ultimate Formula 1 hub combining real-time race telemetry, news, standings, and official team merchandise.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-6 py-3.5 f1-btn-primary text-white font-bold rounded-xl text-sm transition-all"
          >
            <LogIn className="w-4 h-4" />
            Go to Login Page
          </Link>

          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold rounded-xl text-sm transition-all"
          >
            <ShoppingBag className="w-4 h-4 text-red-500" />
            Explore Store Catalog
          </Link>
        </div>
      </div>
    </main>
  );
}