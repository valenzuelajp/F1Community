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
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true);
    setAuthError(null);

    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setAuthError(
          "Invalid credentials. Please check your email and password.",
        );
      } else {
        const callbackUrl =
          new URLSearchParams(window.location.search).get("callbackUrl") ||
          "/home";
        window.location.assign(callbackUrl);
      }
    } catch {
      setAuthError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="login-form" noValidate>
      {/* Top Header & Racing Slashes */}
      <div className="login-form-header">
        <div>
          <h2 className="login-form-title">
            WELCOME BACK, <span className="text-[#ff1801]">CHAMP</span>
          </h2>
          <p className="login-form-subtitle">
            LOG IN NOW TO UPDATE YOUR PREDICTIONS BEFORE{" "}
            <span className="text-[#ff1801]">F1</span> BEGINS
          </p>
        </div>

        {/* 3 Red diagonal slashes */}
        <div className="login-form-slashes" aria-hidden="true">
          <span className="login-form-slash" />
          <span className="login-form-slash" />
          <span className="login-form-slash" />
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
        <div className="auth-error-banner">
          <AlertCircle className="auth-error-icon" />
          <span>{authError}</span>
        </div>
      )}

      {/* Inputs Stack */}
      <div className="login-form-inputs">
        {/* Email */}
        <div className="login-input">
          <div className="login-input-icon">
            <Mail className="h-3.5 w-3.5 text-gray-400" />
          </div>
          <input
            {...register("email")}
            type="email"
            placeholder="EMAIL ADDRESS"
            className={`login-input-field ${errors.email ? "has-error" : ""}`}
          />
        </div>
        {errors.email && (
          <p className="auth-error-text">{errors.email.message}</p>
        )}

        {/* Password */}
        <div className="login-input">
          <div className="login-input-icon">
            <Lock className="h-3.5 w-3.5 text-gray-400" />
          </div>
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="PASSWORD"
            className={`login-input-field ${errors.password ? "has-error" : ""}`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="login-password-toggle"
            tabIndex={-1}
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
          <p className="auth-error-text">{errors.password.message}</p>
        )}
      </div>

      {/* Options Row */}
      <div className="login-form-options">
        <label className="login-remember">
          <input
            {...register("rememberMe")}
            type="checkbox"
            className="login-checkbox"
          />
          <span>REMEMBER ME</span>
        </label>

        <Link href="#forgot" className="login-forgot">
          FORGOT PASSWORD?
        </Link>
      </div>

      {/* Primary Red Login Button with Arrow */}
      <button
        type="submit"
        disabled={isLoading}
        className="login-btn-primary group"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>LOGGING IN...</span>
          </>
        ) : (
          <>
            <span className="login-btn-label">LOGIN</span>
            <span className="login-btn-arrow">
              <Image
                src="/imgRectangle427.png"
                alt="arrow"
                width={16}
                height={16}
              />
            </span>
          </>
        )}
      </button>

      {/* OR Divider */}
      <div className="login-or-divider">
        <span>OR</span>
      </div>

      {/* Continue as Guest Button */}
      <Link href="/home" className="login-btn-secondary group">
        <span className="login-btn-label">CONTINUE AS GUEST</span>
        <span className="login-btn-arrow">
          <Image
            src="/imgRectangle427.png"
            alt="arrow"
            width={16}
            height={16}
          />
        </span>
      </Link>

      {/* Bottom Switcher */}
      <div className="login-form-footer">
        <span className="login-form-footer-note">
          DON&apos;T HAVE AN ACCOUNT?
        </span>
        <Link href="/register" className="login-form-footer-link">
          REGISTER &gt;
        </Link>
      </div>
    </form>
  );
}
