"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  User,
  AtSign,
} from "lucide-react";
import Image from "next/image";
import { registerSchema, type RegisterInput } from "@/lib/validations/auth";
import { registerUser } from "@/app/actions/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./auth-forms.css";

/**
 * Register Form Component — login-card visual language.
 *
 * Mirrors LoginForm structure with the shared `auth__*` classes so it sits
 * 1:1 inside the login shell: header + slashes, stacked inputs,
 * red primary button with arrow, footer switcher.
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
    defaultValues: { name: "", username: "", email: "", password: "" },
  });

  const onSubmit = async (data: RegisterInput) => {
    setIsLoading(true);
    setAuthError(null);

    try {
      const result = await registerUser(data);
      if (result?.error) {
        setAuthError(result.error);
      } else if (result?.success) {
        router.push("/login?registered=1");
      }
    } catch {
      setAuthError(
        "Could not create your account right now. Please try again.",
      );
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
            JOIN THE <span className="text-[#ff1801]">GRID</span>
          </h2>
          <p className="auth__form-subtitle">
            CREATE YOUR ACCOUNT FOR PREDICTIONS,{" "}
            <span className="text-[#ff1801]">LIVE</span> STANDINGS &amp; TEAM
            GEAR
          </p>
        </div>

        <div className="auth__form-slashes" aria-hidden="true">
          <span className="auth__form-slash" />
          <span className="auth__form-slash" />
          <span className="auth__form-slash" />
        </div>
      </div>

      {/* Error alert */}
      {authError && (
        <div className="auth-error-banner" role="alert">
          <AlertCircle className="auth-error-icon" />
          <span>{authError}</span>
        </div>
      )}

      {/* Inputs Stack */}
      <div className="auth__form-inputs">
        {/* Display name */}
        <label className="auth__sr-only" htmlFor="register-name">
          Display name
        </label>
        <div className="auth__input">
          <div className="auth__input-icon">
            <User className="h-3.5 w-3.5 text-gray-400" />
          </div>
          <input
            id="register-name"
            {...register("name")}
            type="text"
            autoComplete="name"
            placeholder="DISPLAY NAME"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "register-name-error" : undefined}
            className={`auth__input-field ${errors.name ? "has-error" : ""}`}
          />
        </div>
        {errors.name && (
          <p id="register-name-error" className="auth-error-text">{errors.name.message}</p>
        )}

        {/* Username */}
        <label className="auth__sr-only" htmlFor="register-username">
          Username
        </label>
        <div className="auth__input">
          <div className="auth__input-icon">
            <AtSign className="h-3.5 w-3.5 text-gray-400" />
          </div>
          <input
            id="register-username"
            {...register("username")}
            type="text"
            autoComplete="username"
            placeholder="USERNAME"
            aria-invalid={errors.username ? true : undefined}
            aria-describedby={errors.username ? "register-username-error" : undefined}
            className={`auth__input-field ${errors.username ? "has-error" : ""}`}
          />
        </div>
        {errors.username && (
          <p id="register-username-error" className="auth-error-text">{errors.username.message}</p>
        )}

        {/* Email */}
        <label className="auth__sr-only" htmlFor="register-email">
          Email address
        </label>
        <div className="auth__input">
          <div className="auth__input-icon">
            <Mail className="h-3.5 w-3.5 text-gray-400" />
          </div>
          <input
            id="register-email"
            {...register("email")}
            type="email"
            autoComplete="email"
            placeholder="EMAIL ADDRESS"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "register-email-error" : undefined}
            className={`auth__input-field ${errors.email ? "has-error" : ""}`}
          />
        </div>
        {errors.email && (
          <p id="register-email-error" className="auth-error-text">{errors.email.message}</p>
        )}

        {/* Password */}
        <label className="auth__sr-only" htmlFor="register-password">
          Password
        </label>
        <div className="auth__input">
          <div className="auth__input-icon">
            <Lock className="h-3.5 w-3.5 text-gray-400" />
          </div>
          <input
            id="register-password"
            {...register("password")}
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="PASSWORD"
            aria-invalid={errors.password ? true : undefined}
            aria-describedby={errors.password ? "register-password-error" : undefined}
            className={`auth__input-field ${errors.password ? "has-error" : ""}`}
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
          <p id="register-password-error" className="auth-error-text">{errors.password.message}</p>
        )}
      </div>

      {/* Primary Red Submit Button with Arrow */}
      <button
        type="submit"
        disabled={isLoading}
        className="auth__btn--primary group"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>CREATING ACCOUNT...</span>
          </>
        ) : (
          <>
            <span className="auth__btn-label">CREATE ACCOUNT</span>
            <span className="auth__btn-arrow">
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

      {/* Bottom Switcher */}
      <div className="auth__form-footer">
        <span className="auth__footer-note">ALREADY HAVE AN ACCOUNT?</span>
        <Link href="/login" className="auth__footer-link">
          LOG IN &gt;
        </Link>
      </div>
    </form>
  );
}
