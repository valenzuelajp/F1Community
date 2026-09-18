import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';
import { LoginForm } from '@/components/auth/LoginForm';

export const metadata: Metadata = { title: 'Login' };

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#000000] text-white selection:bg-[#ff1801] selection:text-white">
      <div className="mx-auto max-w-[1600px] bg-[#000000]">
        <header className="relative border-b border-white/10 bg-[#05090f]">
          <div className="absolute inset-x-0 top-0 h-[3px] bg-[#ff1801]" />
          <div className="absolute inset-0 bg-[#05090f]" />

          <div className="relative z-10 flex h-[70px] items-center gap-4 px-4 sm:px-6 lg:px-8">
            <div className="relative ml-2 h-[42px] w-[180px] shrink-0 overflow-hidden sm:ml-4 sm:h-[46px] sm:w-[205px]">
              <Image
                src="/imgLogoContainer.png"
                alt="F1 logo"
                fill
                sizes="(max-width: 640px) 180px, 205px"
                className="object-cover object-center drop-shadow-[0_0_18px_rgba(255,24,1,0.22)]"
                priority
              />
            </div>

            <nav className="hidden items-center gap-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white/80 lg:flex lg:gap-4">
              <a href="#" className="text-white">Home</a>
              <span className="h-4 border-r border-white/30" />
              <a href="#" className="text-white/80">Schedules</a>
              <span className="h-4 border-r border-white/30" />
              <a href="#" className="text-white/80">News</a>
              <span className="h-4 border-r border-white/30" />
              <a href="#" className="text-white/80">Store</a>
            </nav>

            <div className="ml-auto flex items-center gap-2.5 sm:gap-3">
              <button className="rounded-full bg-white px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-[#0d1117]">
                Sale
              </button>
              <button aria-label="Open menu" className="flex h-9 w-9 items-center justify-center rounded border border-white/20 bg-[#0d1218] text-lg text-white/80">
                ☰
              </button>
            </div>
          </div>
        </header>

        <section className="relative min-h-[calc(100vh-70px)] overflow-hidden bg-[#0A0E14]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_88%_82%,rgba(113,20,16,0.72),transparent_42%),linear-gradient(135deg,#0A0E14_0%,#10151F_55%,#190807_100%)]" />
          <div className="absolute inset-0 bg-racing-grid opacity-20" />
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#2B0A0A]/45 via-[#250b08]/10 to-transparent" />

          <div className="relative z-10 mx-auto flex min-h-[calc(100vh-70px)] max-w-[1180px] items-center justify-center px-4 py-8 sm:px-8 lg:px-12">
            <div className="relative grid w-full max-w-[980px] items-center lg:grid-cols-[minmax(0,1fr)_minmax(360px,470px)]">
              {/* Copy stack — same cell as sticker on lg, paints above it */}
              <div className="relative z-20 flex flex-col items-start justify-start gap-4 pt-4 lg:col-start-1 lg:row-start-1 lg:pt-8">
                <h1 className="font-[family-name:var(--font-display)] text-5xl text-white sm:text-6xl lg:text-7xl">
                  SPRINT QUALI!!!{' '}
                  <Sparkles className="inline h-8 w-8 text-[#ff1801] sm:h-10 sm:w-10" />
                </h1>
                <div className="flex flex-col items-start gap-1.5">
                  <span className="rounded-full bg-[#ff1801]/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-white">
                    RACE WEEK
                  </span>
                  <span className="text-sm font-bold uppercase tracking-[0.18em] text-white/90">
                    2026 SEASON OPENER
                  </span>
                  <span className="text-[11px] text-gray-400">
                    Sign in for live standings, schedules &amp; team gear.
                  </span>
                </div>
                <div className="flex gap-8 pt-2">
                  <div>
                    <div className="text-2xl font-black text-[#ff1801]">12.4K+</div>
                    <div className="text-[10px] uppercase tracking-wide text-gray-400">Active fans</div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-[#ff1801]">4.8★</div>
                    <div className="text-[10px] uppercase tracking-wide text-gray-400">Fan rating</div>
                  </div>
                </div>
              </div>

              <div className="pointer-events-none relative z-10 h-[300px] sm:h-[430px] lg:col-start-1 lg:row-start-1 lg:h-[590px]">
                <span className="pointer-events-none absolute right-16 top-0 z-0 hidden select-none font-[family-name:var(--font-display)] text-[7rem] text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.9)] sm:block sm:text-[10rem] lg:top-4 lg:text-[13rem]">
                  01
                </span>
                <Image
                  src="/imgSticker1.png"
                  alt="Formula 1 driver sticker"
                  fill
                  sizes="(max-width: 1024px) 55vw, 600px"
                  className="z-10 object-contain object-center object-bottom drop-shadow-[0_20px_28px_rgba(0,0,0,0.55)] lg:object-right"
                  priority
                />
              </div>

              <div className="relative z-20 mt-5 w-full max-w-[470px] justify-self-center lg:-ml-16 lg:mt-0 lg:justify-self-start">
                <div className="relative border border-white/10 bg-[var(--f1-card-glass)] px-7 pb-8 pt-8 shadow-[0_18px_45px_rgba(0,0,0,0.5)] backdrop-blur-xl [clip-path:polygon(0_0,100%_0,100%_90%,90%_100%,0_100%)] sm:px-9 sm:pt-9">
                  <div className="absolute right-8 top-8 flex gap-1">
                    <span className="h-5 w-1.5 -skew-x-[20deg] bg-[#ff1801]" />
                    <span className="h-5 w-1.5 -skew-x-[20deg] bg-[#ff1801]" />
                    <span className="h-5 w-1.5 -skew-x-[20deg] bg-[#ff1801]" />
                  </div>
                  <LoginForm />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}


