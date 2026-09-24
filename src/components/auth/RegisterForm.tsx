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
 * Mirrors LoginForm structure with `login-*` classes so it sits
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
    <form onSubmit={handleSubmit(onSubmit)} className="login-form" noValidate>
      {/* Top Header & Racing Slashes */}
      <div className="login-form-header">
        <div>
          <h2 className="login-form-title">
            JOIN THE <span className="text-[#ff1801]">GRID</span>
          </h2>
          <p className="login-form-subtitle">
            CREATE YOUR ACCOUNT FOR PREDICTIONS,{" "}
            <span className="text-[#ff1801]">LIVE</span> STANDINGS &amp; TEAM
            GEAR
          </p>
        </div>

        <div className="login-form-slashes" aria-hidden="true">
          <span className="login-form-slash" />
          <span className="login-form-slash" />
          <span className="login-form-slash" />
        </div>
      </div>

      {/* Error alert */}
      {authError && (
        <div className="auth-error-banner">
          <AlertCircle className="auth-error-icon" />
          <span>{authError}</span>
        </div>
      )}

      {/* Inputs Stack */}
      <div className="login-form-inputs">
        {/* Display name */}
        <div className="login-input">
          <div className="login-input-icon">
            <User className="h-3.5 w-3.5 text-gray-400" />
          </div>
          <input
            {...register("name")}
            type="text"
            placeholder="DISPLAY NAME"
            className={`login-input-field ${errors.name ? "has-error" : ""}`}
          />
        </div>
        {errors.name && (
          <p className="auth-error-text">{errors.name.message}</p>
        )}

        {/* Username */}
        <div className="login-input">
          <div className="login-input-icon">
            <AtSign className="h-3.5 w-3.5 text-gray-400" />
          </div>
          <input
            {...register("username")}
            type="text"
            placeholder="USERNAME"
            className={`login-input-field ${errors.username ? "has-error" : ""}`}
          />
        </div>
        {errors.username && (
          <p className="auth-error-text">{errors.username.message}</p>
        )}

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

      {/* Primary Red Submit Button with Arrow */}
      <button
        type="submit"
        disabled={isLoading}
        className="login-btn-primary group"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>CREATING ACCOUNT...</span>
          </>
        ) : (
          <>
            <span className="login-btn-label">CREATE ACCOUNT</span>
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

      {/* Bottom Switcher */}
      <div className="login-form-footer">
        <span className="login-form-footer-note">ALREADY HAVE AN ACCOUNT?</span>
        <Link href="/login" className="login-form-footer-link">
          LOG IN &gt;
        </Link>
      </div>
    </form>
  );
}
