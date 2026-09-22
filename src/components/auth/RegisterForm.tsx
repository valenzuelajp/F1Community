'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Eye, EyeOff, Loader2, Lock, Mail, User, AtSign, ArrowRight } from 'lucide-react';
import { registerSchema, type RegisterInput } from '@/lib/validations/auth';
import { registerUser } from '@/app/actions/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import './auth-forms.css';

/**
 * Register Form Component
 *
 * Handles account registration with Zod validation.
 * All styling is cleanly maintained in `auth-forms.css`.
 */
export function RegisterForm() {
  const router = useRouter();
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
      } else if (result?.success) {
        router.push('/login?registered=1');
      }
    } catch {
      setAuthError('Could not create your account right now. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      {/* Header title */}
      <div className="mb-5 text-left">
        <h2 className="auth-form-title">
          JOIN THE <span className="auth-accent-text">GRID</span>
        </h2>
        <p className="auth-form-subtitle">
          CREATE YOUR ACCOUNT FOR PREDICTIONS, <span className="auth-accent-text">LIVE</span> STANDINGS &amp; TEAM GEAR
        </p>
      </div>

      {/* Error Banner */}
      {authError && (
        <div className="auth-error-banner">
          <AlertCircle className="auth-error-icon" />
          <span className="font-medium">{authError}</span>
        </div>
      )}

      {/* Fields */}
      <div className="auth-fields-stack">
        {/* Name & Username grid */}
        <div className="auth-grid-two-col">
          <div className="auth-field-group">
            <label className="auth-field-label">
              Display name <span className="text-gray-500">(optional)</span>
            </label>
            <div className="auth-input-wrapper">
              <div className="auth-input-icon">
                <User className="h-4 w-4" />
              </div>
              <input
                {...register('name')}
                type="text"
                placeholder="Your name"
                className={`auth-input ${errors.name ? 'has-error' : ''}`}
              />
            </div>
            {errors.name && <p className="auth-error-text">{errors.name.message}</p>}
          </div>

          <div className="auth-field-group">
            <label className="auth-field-label">Username</label>
            <div className="auth-input-wrapper">
              <div className="auth-input-icon">
                <AtSign className="h-4 w-4" />
              </div>
              <input
                {...register('username')}
                type="text"
                placeholder="champ_verstappen"
                className={`auth-input ${errors.username ? 'has-error' : ''}`}
              />
            </div>
            {errors.username && <p className="auth-error-text">{errors.username.message}</p>}
          </div>
        </div>

        {/* Email Field */}
        <div className="auth-field-group">
          <label className="auth-field-label">Email address</label>
          <div className="auth-input-wrapper">
            <div className="auth-input-icon">
              <Mail className="h-4 w-4" />
            </div>
            <input
              {...register('email')}
              type="email"
              placeholder="driver@yoursite.com"
              className={`auth-input ${errors.email ? 'has-error' : ''}`}
            />
          </div>
          {errors.email && <p className="auth-error-text">{errors.email.message}</p>}
        </div>

        {/* Password Field */}
        <div className="auth-field-group">
          <label className="auth-field-label">Password</label>
          <div className="auth-input-wrapper">
            <div className="auth-input-icon">
              <Lock className="h-4 w-4" />
            </div>
            <input
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              placeholder="At least 8 characters"
              className={`auth-input auth-input-password ${errors.password ? 'has-error' : ''}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="auth-password-toggle"
              tabIndex={-1}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && <p className="auth-error-text">{errors.password.message}</p>}
        </div>
      </div>

      {/* Submit Button */}
      <div className="auth-actions-stack">
        <button
          type="submit"
          disabled={isLoading}
          className="auth-submit-btn group"
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
      </div>

      {/* Switch to login prompt */}
      <div className="auth-footer-prompt">
        Already have an account?{' '}
        <Link href="/login" className="auth-switch-link">
          Log in
        </Link>
      </div>
    </form>
  );
}
