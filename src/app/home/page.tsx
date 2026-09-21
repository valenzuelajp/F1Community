import Link from 'next/link';
import { Flag, ShoppingBag, Trophy } from 'lucide-react';

export default function MemberHomePage() {
  return (
    <main className="relative flex-1 overflow-hidden bg-[#090b10] font-sans text-gray-200 selection:bg-[#ff1801] selection:text-white">
      <div className="pointer-events-none absolute left-1/4 top-0 h-96 w-96 rounded-full bg-red-600/10 blur-3xl" />
      <section className="relative bg-racing-grid">
        <div className="relative mx-auto w-full max-w-5xl px-6 py-20 text-center sm:px-10 lg:px-16 lg:py-28">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-950/80 px-4 py-2 text-xs font-bold uppercase tracking-widest text-red-400">
            <Flag className="h-4 w-4 text-red-500" /> Formula 1 Community Philippines
          </div>
          <h1 className="f1-text-gradient text-4xl font-extrabold leading-none tracking-tight sm:text-6xl">GEAR UP.<br />BRAKE LATE. FINISH FIRST.</h1>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-gray-400 sm:text-base">Premium replicas, race-week apparel, and collector essentials from your favourite constructors and drivers.</p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-8">
            <Link href="/new-arrivals" className="home-cta-primary"><ShoppingBag className="h-4 w-4" />Shop the collection</Link>
            <Link href="/sale" className="home-cta-secondary"><Trophy className="h-4 w-4 text-red-500" />Race week deals</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
