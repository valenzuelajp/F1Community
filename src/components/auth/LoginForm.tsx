"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, AlertCircle, Eye, EyeOff, Lock, Mail } from "lucide-react";
import Image from "next/image";
import { loginSchema, type LoginInput } from "@/lib/validations/auth";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import "./auth-forms.css";

/**
 * Login Form Component
 *
 * Pixel-accurate implementation matching Figma screenshot `Screenshot 2026-09-16 122645.png`:
 * - Distinctive angled racing card corner cutout with red triple-stripes.
 * - Red primary LOGIN button with arrow icon pill.
 * - Clean "OR" divider and secondary black "CONTINUE AS GUEST" button.
 * - Minimalist inline inputs with dark fill and icon prefixes.
 * - "DON'T HAVE AN ACCOUNT? REGISTER >" footer callout.
 */
export function LoginForm() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true);
    setAuthError(null);

    try {
      const result = await signIn("credentials", {
        email: data.email.trim().toLowerCase(),
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setAuthError(
          "Invalid credentials. Please check your email and password.",
        );
      } else {
        // Same-origin guard: never follow a callbackUrl off this site.
        const raw =
          new URLSearchParams(window.location.search).get("callbackUrl") ||
          "/home";
        let callbackUrl = "/home";
        try {
          const target = new URL(raw, window.location.origin);
          if (target.origin === window.location.origin) {
            callbackUrl = `${target.pathname}${target.search}${target.hash}`;
          }
        } catch {
          callbackUrl = "/home";
        }
        window.location.assign(callbackUrl);
      }
    } catch {
      setAuthError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="auth" noValidate>
      {/* Top Header & Racing Slashes */}
      <div className="auth__form-header">
        <div>
          <h2 className="auth__form-title">
            WELCOME BACK, <span className="text-[#ff1801]">CHAMP</span>
          </h2>
          <p className="auth__form-subtitle">
            LOG IN NOW TO UPDATE YOUR PREDICTIONS BEFORE <span className="text-[#ff1801]">F1</span> BEGINS
          </p>
        </div>

        {/* 3 Red diagonal slashes */}
        <div className="auth__form-slashes" aria-hidden="true">
          <span className="auth__form-slash" />
          <span className="auth__form-slash" />
          <span className="auth__form-slash" />
        </div>
      </div>

      {/* Account created notification */}
      {searchParams.get("registered") === "1" && (
        <p className="auth-status-banner" role="status">
          Account created. Log in to join the grid.
        </p>
      )}

      {/* Error alert */}
      {authError && (
        <div className="auth-error-banner" role="alert">
          <AlertCircle className="auth-error-icon" />
          <span>{authError}</span>
        </div>
      )}

      {/* Inputs Stack */}
      <div className="auth__form-inputs">
        {/* Email */}
        <label className="auth__sr-only" htmlFor="login-email">
          Email address
        </label>
        <div className="auth__input">
          <div className="auth__input-icon">
            <Mail className="h-3.5 w-3.5 text-gray-400" />
          </div>
          <input
            id="login-email"
            {...register("email")}
            type="email"
            autoComplete="email"
            placeholder="EMAIL ADDRESS"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "login-email-error" : undefined}
            className={`auth__input-field ${errors.email ? 'has-error' : ''}`}
          />
        </div>
        {errors.email && (
          <p id="login-email-error" className="auth-error-text">{errors.email.message}</p>
        )}

        {/* Password */}
        <label className="auth__sr-only" htmlFor="login-password">
          Password
        </label>
        <div className="auth__input">
          <div className="auth__input-icon">
            <Lock className="h-3.5 w-3.5 text-gray-400" />
          </div>
          <input
            id="login-password"
            {...register("password")}
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="PASSWORD"
            aria-invalid={errors.password ? true : undefined}
            aria-describedby={errors.password ? "login-password-error" : undefined}
            className={`auth__input-field ${errors.password ? 'has-error' : ''}`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="auth__password-toggle"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="h-3.5 w-3.5" />
            ) : (
              <Eye className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
        {errors.password && (
          <p id="login-password-error" className="auth-error-text">{errors.password.message}</p>
        )}
      </div>

      {/* Primary Red Login Button with Arrow */}
      <button
        type="submit"
        disabled={isLoading}
        className="auth__btn--primary group"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>LOGGING IN...</span>
          </>
        ) : (
          <>
            <span className="auth__btn-label">LOGIN</span>
            <span className="auth__btn-arrow">
              <Image src="/imgRectangle427.png" alt="arrow" width={32} height={32} />
            </span>
          </>
        )}
      </button>

      {/* OR Divider */}
      <div className="auth__divider">
        <span>OR</span>
      </div>

      {/* Continue as Guest Button */}
      <Link href="/home" className="auth__btn--secondary group">
        <span className="auth__btn-label">CONTINUE AS GUEST</span>
        <span className="auth__btn-arrow">
          <Image src="/imgRectangle427.png" alt="arrow" width={32} height={32} />
        </span>
      </Link>

      {/* Bottom Switcher */}
      <div className="auth__form-footer">
        <span className="auth__footer-note">DON&apos;T HAVE AN ACCOUNT?</span>
        <Link href="/register" className="auth__footer-link">
          REGISTER &gt;
        </Link>
      </div>

    </form>
  );
}
