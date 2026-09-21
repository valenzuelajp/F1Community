import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { RegisterForm } from '@/components/auth/RegisterForm';

export const metadata: Metadata = { title: 'Create Account' };

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-[#000000] text-white selection:bg-[#ff1801] selection:text-white">
      <div className="mx-auto max-w-[1600px] bg-[#000000]">
        <header className="auth-header">
          <div className="absolute inset-x-0 top-0 h-[3px] bg-[#ff1801]" />
          <div className="absolute inset-0 bg-[#05090f]" />

          <div className="relative z-10 flex h-[70px] items-center gap-4 px-4 sm:px-6 lg:px-8">
            <div className="register-logo">
              <Image
                src="/imgLogoContainer.png"
                alt="F1 logo"
                fill
                sizes="(max-width: 640px) 180px, 205px"
                className="object-cover object-center drop-shadow-[0_0_18px_rgba(255,24,1,0.22)]"
                priority
              />
            </div>
            <div className="ml-auto hidden items-center gap-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white/80 sm:flex">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Free account
              </span>
            </div>
          </div>
        </header>

        <section className="relative flex min-h-[calc(100vh-70px)] items-center overflow-hidden bg-[#0A0E14]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(113,20,16,0.6),transparent_45%),linear-gradient(135deg,#0A0E14_0%,#10151F_55%,#190807_100%)]" />
          <div className="absolute inset-0 bg-racing-grid opacity-20" />

          <div className="relative z-10 mx-auto w-full max-w-[1180px] px-4 py-10 sm:px-8 lg:px-12">
            <div className="relative mx-auto max-w-[470px]">
              <div className="auth-card--glass">
                <div className="absolute right-8 top-8 flex gap-1">
                  <span className="deco-skew" />
                  <span className="deco-skew" />
                  <span className="deco-skew" />
                </div>
                <RegisterForm />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}