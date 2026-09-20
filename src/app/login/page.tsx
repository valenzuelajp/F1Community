import type { Metadata } from 'next';
import Image from 'next/image';
import { Menu, Sparkles } from 'lucide-react';
import { LoginForm } from '@/components/auth/LoginForm';

export const metadata: Metadata = { title: 'Login' };

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-[#ff1801] selection:text-white">
      <div className="w-full overflow-hidden bg-[#050505]">
        <header className="relative border-b-2 border-white bg-[#06080d]">
          <div className="relative z-10 flex h-[74px] items-center gap-4 px-5 sm:px-8 lg:h-[92px] lg:px-12">
            <div className="relative h-[34px] w-[122px] shrink-0 overflow-hidden sm:h-[40px] sm:w-[148px]">
              <Image src="/imgLogoContainer.png" alt="F1 logo" fill sizes="(max-width: 640px) 122px, 148px" className="object-cover object-center" priority />
            </div>

            <nav aria-label="Primary navigation" className="ml-auto hidden items-center gap-5 text-[10px] font-black uppercase tracking-[0.08em] text-white/80 lg:flex">
              <a href="#" className="transition-colors hover:text-[#ff1801]">Home</a>
              <span aria-hidden="true" className="h-5 border-r-2 border-white/80" />
              <a href="#" className="transition-colors hover:text-[#ff1801]">Schedules</a>
              <span aria-hidden="true" className="h-5 border-r-2 border-white/80" />
              <a href="#" className="transition-colors hover:text-[#ff1801]">News</a>
              <span aria-hidden="true" className="h-5 border-r-2 border-white/80" />
              <a href="#" className="transition-colors hover:text-[#ff1801]">Store</a>
            </nav>

            <div className="ml-auto flex items-center gap-3 lg:ml-8">
              <button className="rounded bg-white px-6 py-2 text-[10px] font-black uppercase tracking-[0.08em] text-[#0d1117] transition-transform hover:-translate-y-px">Sale</button>
              <button aria-label="Open menu" className="flex h-9 w-[78px] items-center justify-center gap-2 rounded-full bg-white text-[10px] font-bold uppercase tracking-wide text-[#121212]">
                <Menu className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="hidden sm:inline">Menu</span>
              </button>
            </div>
          </div>
        </header>

        <section className="relative min-h-[620px] overflow-hidden border-b border-white/30 bg-[#090909] lg:min-h-[650px]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_73%_55%,rgba(142,21,12,0.65),transparent_30%),linear-gradient(90deg,#090909_0%,rgba(9,9,9,0.93)_28%,rgba(18,5,4,0.42)_70%,#160504_100%)]" />
          <div className="absolute inset-0 bg-racing-grid opacity-[0.12]" />
          <div className="absolute inset-0 bg-[linear-gradient(145deg,transparent_48%,rgba(225,24,1,0.12)_48.1%,transparent_48.4%)]" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#7b180d]/35 to-transparent" />

          <div className="relative z-10 mx-auto flex min-h-[620px] max-w-[1320px] items-center px-5 py-8 sm:px-10 lg:min-h-[650px] lg:px-12">
            <div className="relative grid w-full items-center lg:grid-cols-[minmax(0,1fr)_minmax(330px,420px)]">
              <div className="relative z-20 flex flex-col items-start gap-5 pt-3 lg:col-start-1 lg:row-start-1 lg:pt-8">
                <h1 className="f1-outline-title max-w-[600px] font-[family-name:var(--font-display)] text-[4.4rem] uppercase leading-[0.78] sm:text-[6.2rem] lg:text-[8.5rem]">
                  Sprint<br />quali!!! <Sparkles className="inline h-8 w-8 text-[#ff1801] sm:h-10 sm:w-10" />
                </h1>
                <div className="mt-2 flex flex-col items-start gap-1.5">
                  <span className="border-2 border-white bg-[#ff1801] px-2 py-0.5 text-[11px] font-black uppercase tracking-tight text-white">Race week</span>
                  <span className="text-sm font-black uppercase tracking-[0.08em] text-white/95">The Singapore Grand Prix</span>
                  <span className="text-[11px] font-medium text-white/65">Sign in for live timing, race predictions and team updates.</span>
                </div>
                <div className="flex gap-8 pt-3">
                  <div><div className="text-2xl font-black text-white">12.4K+</div><div className="text-[10px] font-bold uppercase tracking-wide text-[#ff1801]">Active fans</div></div>
                  <div><div className="text-2xl font-black text-white">4.8★</div><div className="text-[10px] font-bold uppercase tracking-wide text-[#ff1801]">Fan rating</div></div>
                </div>
              </div>

              <div className="pointer-events-none relative z-10 h-[270px] sm:h-[380px] lg:col-start-1 lg:row-start-1 lg:h-[625px]">
                <span className="pointer-events-none absolute right-4 top-0 z-0 hidden select-none font-[family-name:var(--font-display)] text-[7rem] leading-none text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.72)] sm:block sm:text-[10rem] lg:right-8 lg:top-3 lg:text-[14rem]">01</span>
                <Image src="/imgSticker1.png" alt="Formula 1 driver" fill sizes="(max-width: 1024px) 68vw, 720px" className="z-10 object-contain object-center object-bottom drop-shadow-[0_24px_28px_rgba(0,0,0,0.68)] lg:object-right" priority />
              </div>

              <div className="relative z-20 mt-4 w-full max-w-[420px] justify-self-center lg:mt-0 lg:justify-self-end">
                <div className="relative border border-white/10 bg-[#050608]/95 px-7 pb-8 pt-8 shadow-[0_22px_45px_rgba(0,0,0,0.62)] backdrop-blur-xl [clip-path:polygon(0_0,100%_0,100%_90%,90%_100%,0_100%)] sm:px-9 sm:pt-9">
                  <div className="absolute right-8 top-8 flex gap-1" aria-hidden="true"><span className="h-5 w-1.5 -skew-x-[20deg] bg-[#ff1801]" /><span className="h-5 w-1.5 -skew-x-[20deg] bg-[#ff1801]" /><span className="h-5 w-1.5 -skew-x-[20deg] bg-[#ff1801]" /></div>
                  <LoginForm />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section aria-label="Live race timing" className="flex min-h-12 items-center overflow-x-auto border-b border-white/25 bg-black text-[10px] font-bold uppercase whitespace-nowrap">
          <div className="flex h-12 items-center border-r border-white/20 px-7 text-white"><span className="mr-3 h-4 w-4 rounded-full bg-[#ff1801] shadow-[0_0_12px_rgba(255,24,1,0.85)]" />Live</div>
          <div className="flex items-center gap-5 px-7 text-white/85"><span>Lap 26 / 61</span><span className="text-white">VER 1:32.472</span><span>LEC +0.614</span><span>NOR +1.023</span><span className="text-[#ff1801]">Sprint qualifying</span></div>
        </section>

        <section className="border-b border-white/20 bg-[#050505] px-6 py-7 text-center sm:py-8">
          <p className="mb-5 text-xs font-black uppercase tracking-tight text-white">Follow every corner of the season</p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[11px] font-black uppercase tracking-[0.12em] text-white/50 sm:gap-x-12"><span>Ferrari</span><span>McLaren</span><span>Mercedes</span><span>Red Bull Racing</span><span>Williams</span></div>
        </section>
      </div>
    </main>
  );
}
