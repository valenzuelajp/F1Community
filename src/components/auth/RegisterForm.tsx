'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Eye, EyeOff, Loader2, Lock, Mail, User, AtSign, ArrowRight } from 'lucide-react';
import { registerSchema, type RegisterInput } from '@/lib/validations/auth';
import { registerUser } from '@/app/actions/auth';
import Link from 'next/link';

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', username: '', email: '', password: '' },
  });

  const onSubmit = async (data: RegisterInput) => {
    setIsLoading(true);
    setAuthError(null);

    try {
      const result = await registerUser(data);
      if (result?.error) {
        setAuthError(result.error);
      }
    } catch {
      // redirect() inside the action sends the user to /login on success
    } finally {
      setIsLoading(false);
    }
  };

  const fieldClass = (invalid: boolean) =>
    `w-full rounded-md border bg-[#0f1723] py-3 pl-10 pr-4 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ff1801]/40 ${
      invalid ? 'border-red-500' : 'border-white/10 hover:border-white/20'
    }`;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="mb-5 text-left">
        <h2 className="text-[20px] font-black uppercase leading-none tracking-[0.04em] text-white md:text-[24px]">
          JOIN THE <span className="text-[#ff1801]">GRID</span>
        </h2>
        <p className="mt-3 max-w-[330px] text-[10px] font-bold uppercase leading-[1.35] tracking-[0.08em] text-white/80">
          CREATE YOUR ACCOUNT FOR PREDICTIONS, <span className="text-[#ff1801]">LIVE</span> STANDINGS &amp; TEAM GEAR
        </p>
      </div>

      {authError && (
        <div className="flex items-center gap-2.5 rounded-lg border border-red-500/50 bg-red-950/80 p-3 text-xs text-red-200">
          <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
          <span className="font-medium">{authError}</span>
        </div>
      )}

      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="block text-[10px] font-bold uppercase tracking-[0.24em] text-gray-400">
              Display name <span className="text-gray-600">(optional)</span>
            </label>
            <div className="relative">
              <User className="pointer-events-none absolute inset-y-0 left-0 my-auto ml-3.5 h-4 w-4 text-gray-500" />
              <input {...register('name')} type="text" placeholder="Your name" className={fieldClass(!!errors.name)} />
            </div>
            {errors.name && <p className="pl-1 text-xs text-red-400">{errors.name.message}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="block text-[10px] font-bold uppercase tracking-[0.24em] text-gray-400">Username</label>
            <div className="relative">
              <AtSign className="pointer-events-none absolute inset-y-0 left-0 my-auto ml-3.5 h-4 w-4 text-gray-500" />
              <input {...register('username')} type="text" placeholder="champ_verstappen" className={fieldClass(!!errors.username)} />
            </div>
            {errors.username && <p className="pl-1 text-xs text-red-400">{errors.username.message}</p>}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-[10px] font-bold uppercase tracking-[0.24em] text-gray-400">Email address</label>
          <div className="relative group">
            <Mail className="pointer-events-none absolute inset-y-0 left-0 my-auto ml-3.5 h-4 w-4 text-gray-500" />
            <input {...register('email')} type="email" placeholder="driver@yoursite.com" className={fieldClass(!!errors.email)} />
          </div>
          {errors.email && <p className="pl-1 text-xs text-red-400">{errors.email.message}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="block text-[10px] font-bold uppercase tracking-[0.24em] text-gray-400">Password</label>
          <div className="relative">
            <Lock className="pointer-events-none absolute inset-y-0 left-0 my-auto ml-3.5 h-4 w-4 text-gray-500" />
            <input
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              placeholder="At least 8 characters"
              className={`${fieldClass(!!errors.password)} pr-11`}
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

      <button
        type="submit"
        disabled={isLoading}
        className="group flex w-full items-center justify-center gap-2 rounded-md bg-gradient-to-r from-[#ff1801] to-[#d91200] px-4 py-3 text-[10px] font-black uppercase tracking-[0.24em] text-white shadow-[0_0_18px_rgba(255,24,1,0.3)] transition-all hover:from-[#ff2d1a] hover:to-[#ff1801] disabled:opacity-60"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Creating account</span>
          </>
        ) : (
          <>
            <span>Create account</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </button>

      <div className="pt-3 text-center text-[11px] text-gray-400">
        Already have an account?{' '}
        <Link href="/login" className="font-bold text-white transition-colors hover:text-[#ff1801]">
          Log in
        </Link>
      </div>
    </form>
  );
}