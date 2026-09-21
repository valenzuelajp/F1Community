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
        <div className="form-alert">
          <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
          <span className="font-medium">{authError}</span>
        </div>
      )}

      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="form-label">
              Display name <span className="text-gray-600">(optional)</span>
            </label>
            <div className="relative">
              <User className="pointer-events-none absolute inset-y-0 left-0 my-auto ml-3.5 h-4 w-4 text-gray-500" />
              <input {...register('name')} type="text" placeholder="Your name" className={`form-field ${errors.name ? 'form-field--invalid' : 'form-field--valid'}`} />
            </div>
            {errors.name && <p className="form-error">{errors.name.message}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="form-label">Username</label>
            <div className="relative">
              <AtSign className="pointer-events-none absolute inset-y-0 left-0 my-auto ml-3.5 h-4 w-4 text-gray-500" />
              <input {...register('username')} type="text" placeholder="champ_verstappen" className={`form-field ${errors.username ? 'form-field--invalid' : 'form-field--valid'}`} />
            </div>
            {errors.username && <p className="form-error">{errors.username.message}</p>}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="form-label">Email address</label>
          <div className="relative group">
            <Mail className="pointer-events-none absolute inset-y-0 left-0 my-auto ml-3.5 h-4 w-4 text-gray-500" />
            <input {...register('email')} type="email" placeholder="driver@yoursite.com" className={`form-field ${errors.email ? 'form-field--invalid' : 'form-field--valid'}`} />
          </div>
          {errors.email && <p className="form-error">{errors.email.message}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="form-label">Password</label>
          <div className="relative">
            <Lock className="pointer-events-none absolute inset-y-0 left-0 my-auto ml-3.5 h-4 w-4 text-gray-500" />
            <input
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              placeholder="At least 8 characters"
              className={`form-field pr-11 ${errors.password ? 'form-field--invalid' : 'form-field--valid'}`}
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
          {errors.password && <p className="form-error">{errors.password.message}</p>}
        </div>
      </div>

      <button type="submit" disabled={isLoading} className="group btn-primary">
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