'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, AlertCircle, CheckCircle2, Eye, EyeOff, Lock, Mail, ArrowRight } from 'lucide-react';
import { loginSchema, type LoginInput } from '@/lib/validations/auth';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);

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
    setAuthSuccess(null);

    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setAuthError('Invalid credentials. Please check your email and password.');
      } else {
        setAuthSuccess('Welcome back to F1 Philippines! Telemetry syncing...');
      }
    } catch {
      setAuthError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Alert Notifications */}
      {authError && (
        <div className="flex items-center gap-2.5 p-3.5 bg-red-950/80 border border-red-500/50 rounded-lg text-xs text-red-200 animate-in fade-in slide-in-from-top-1 duration-200">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span className="font-medium">{authError}</span>
        </div>
      )}

      {authSuccess && (
        <div className="flex items-center gap-2.5 p-3.5 bg-emerald-950/80 border border-emerald-500/50 rounded-lg text-xs text-emerald-200 animate-in fade-in slide-in-from-top-1 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-medium">{authSuccess}</span>
        </div>
      )}

      {/* Email Address */}
      <div className="space-y-1.5">
        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          EMAIL ADDRESS
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500 group-focus-within:text-[#ff1801] transition-colors">
            <Mail className="w-4 h-4" />
          </div>
          <input
            {...register('email')}
            type="email"
            placeholder="driver@f1-philippines.com"
            className={`w-full pl-10 pr-4 py-3 bg-[#0a0d14] border rounded-lg text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-[#ff1801] focus:ring-1 focus:ring-[#ff1801]/40 transition-all ${
              errors.email ? 'border-red-500 bg-red-950/10' : 'border-white/10 hover:border-white/20'
            }`}
          />
        </div>
        {errors.email && (
          <p className="text-xs text-red-400 font-medium pl-1">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-1.5">
        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          PASSWORD
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500 group-focus-within:text-[#ff1801] transition-colors">
            <Lock className="w-4 h-4" />
          </div>
          <input
            {...register('password')}
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••••••"
            className={`w-full pl-10 pr-11 py-3 bg-[#0a0d14] border rounded-lg text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-[#ff1801] focus:ring-1 focus:ring-[#ff1801]/40 transition-all ${
              errors.password ? 'border-red-500 bg-red-950/10' : 'border-white/10 hover:border-white/20'
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-500 hover:text-gray-300 transition-colors"
            tabIndex={-1}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errors.password && (
          <p className="text-xs text-red-400 font-medium pl-1">{errors.password.message}</p>
        )}
      </div>

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between pt-1">
        <label className="flex items-center gap-2.5 cursor-pointer select-none group">
          <input
            {...register('rememberMe')}
            type="checkbox"
            className="w-4 h-4 rounded bg-[#0a0d14] border-white/20 text-[#ff1801] focus:ring-0 focus:ring-offset-0 cursor-pointer accent-[#ff1801] transition-transform group-hover:scale-105"
          />
          <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
            Remember me
          </span>
        </label>

        <Link
          href="#forgot"
          className="text-xs font-semibold text-[#ff1801] hover:text-red-400 hover:underline transition-all"
        >
          Forgot password?
        </Link>
      </div>

      {/* Sign In Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="group relative w-full py-3.5 px-4 bg-gradient-to-r from-[#ff1801] to-[#e01500] hover:from-[#ff2d1a] hover:to-[#ff1801] active:from-[#cc1400] text-white font-extrabold text-xs uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer shadow-lg shadow-red-600/30 hover:shadow-red-600/50 hover:shadow-xl mt-2 overflow-hidden"
      >
        <span className="absolute inset-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>SIGNING IN...</span>
          </>
        ) : (
          <>
            <span>SIGN IN</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </button>

      {/* Demo Credentials Quick Fill */}
      <div className="pt-1 flex items-center justify-between text-[11px] text-gray-500 border-t border-white/5">
        <span>Test demo account:</span>
        <button
          type="button"
          onClick={() => {
            setValue('email', 'driver@f1-philippines.com');
            setValue('password', 'racing2026!');
          }}
          className="text-gray-400 hover:text-[#ff1801] transition-colors underline decoration-dotted cursor-pointer"
        >
          Auto-fill credentials
        </button>
      </div>

      {/* Don't have an account */}
      <div className="text-center pt-2">
        <p className="text-xs text-gray-400">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="font-bold text-white hover:text-[#ff1801] hover:underline transition-colors">
            Sign up
          </Link>
        </p>
      </div>
    </form>
  );
}

