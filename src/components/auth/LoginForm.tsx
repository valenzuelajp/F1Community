'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, AlertCircle, Eye, EyeOff, Lock, Mail, ArrowRight } from 'lucide-react';
import { loginSchema, type LoginInput } from '@/lib/validations/auth';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true);
    setAuthError(null);

    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setAuthError('Invalid credentials. Please check your email and password.');
      } else {
        const callbackUrl = new URLSearchParams(window.location.search).get('callbackUrl') || '/home';
        window.location.assign(callbackUrl);
      }
    } catch {
      setAuthError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="mb-5 text-left">
        <h2 className="text-[20px] font-black uppercase leading-none tracking-[0.04em] text-white md:text-[24px]">
          WELCOME BACK, <span className="text-[#ff1801]">CHAMP</span>
        </h2>
        <p className="mt-3 max-w-[330px] text-[10px] font-bold uppercase leading-[1.35] tracking-[0.08em] text-white/80">
          LOG IN NOW TO UPDATE YOUR PREDICTIONS BEFORE <span className="text-[#ff1801]">F1</span> BEGINS
        </p>
      </div>

      {authError && (
        <div className="flex items-center gap-2.5 rounded-lg border border-red-500/50 bg-red-950/80 p-3 text-xs text-red-200">
          <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
          <span className="font-medium">{authError}</span>
        </div>
      )}

      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="block text-[10px] font-bold uppercase tracking-[0.24em] text-gray-400">
            Email address
          </label>
          <div className="relative group">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-500 transition-colors group-focus-within:text-[#ff1801]">
              <Mail className="h-4 w-4" />
            </div>
            <input
              {...register('email')}
              type="email"
              placeholder="driver@yoursite.com"
              className={`w-full rounded-md border bg-[#0f1723] py-3 pl-10 pr-4 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ff1801]/40 ${
                errors.email ? 'border-red-500' : 'border-white/10 hover:border-white/20'
              }`}
            />
          </div>
          {errors.email && <p className="pl-1 text-xs text-red-400">{errors.email.message}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="block text-[10px] font-bold uppercase tracking-[0.24em] text-gray-400">
            Password
          </label>
          <div className="relative group">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-500 transition-colors group-focus-within:text-[#ff1801]">
              <Lock className="h-4 w-4" />
            </div>
            <input
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••••••"
              className={`w-full rounded-md border bg-[#0f1723] py-3 pl-10 pr-11 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ff1801]/40 ${
                errors.password ? 'border-red-500' : 'border-white/10 hover:border-white/20'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-500 transition-colors hover:text-gray-200"
              tabIndex={-1}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && <p className="pl-1 text-xs text-red-400">{errors.password.message}</p>}
        </div>
      </div>

      <div className="flex items-center justify-between pt-1">
        <label className="flex cursor-pointer items-center gap-2.5 text-[10px] uppercase tracking-[0.18em] text-gray-400">
          <input
            {...register('rememberMe')}
            type="checkbox"
            className="h-4 w-4 rounded border-white/20 bg-[#0f1723] text-[#ff1801] accent-[#ff1801]"
          />
          Remember me
        </label>

        <Link href="#forgot" className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#ff1801] transition-colors hover:text-red-400">
          Forgot password?
        </Link>
      </div>

      <div className="space-y-2.5 pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="group flex w-full items-center justify-center gap-2 rounded-md bg-gradient-to-r from-[#ff1801] to-[#d91200] px-4 py-3 text-[10px] font-black uppercase tracking-[0.24em] text-white shadow-[0_0_18px_rgba(255,24,1,0.3)] transition-all hover:from-[#ff2d1a] hover:to-[#ff1801] disabled:opacity-60"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Signing in</span>
            </>
          ) : (
            <>
              <span>Login</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => {
            setValue('email', 'customer@f1store.com');
            setValue('password', 'customer123');
          }}
          className="flex w-full items-center justify-center gap-2 rounded-md border border-white/10 bg-[#0b1017] px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.22em] text-white/80 transition-colors hover:border-white/20 hover:text-white"
        >
          Demo credentials
        </button>
      </div>

      <div className="pt-3 text-center text-[11px] text-gray-400">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="font-bold text-white transition-colors hover:text-[#ff1801]">
          Sign up
        </Link>
      </div>
    </form>
  );
}

