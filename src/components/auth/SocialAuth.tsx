'use client';

import React from 'react';

/**
 * Social Login Buttons component.
 * Renders quick OAuth sign-in options for Google and Apple.
 */
export function SocialAuth() {
  return (
    <div className="space-y-4">
      {/* Divider */}
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-[#12141d] px-3 text-gray-400 font-medium">Or continue with</span>
        </div>
      </div>

      {/* Social Buttons Grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* Google OAuth Button */}
        <button
          type="button"
          onClick={() => alert('Google Sign-In integration ready!')}
          className="flex items-center justify-center gap-2 py-2.5 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-semibold text-gray-200 transition-all hover:scale-[1.02]"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          Google
        </button>

        {/* Apple OAuth Button */}
        <button
          type="button"
          onClick={() => alert('Apple Sign-In integration ready!')}
          className="flex items-center justify-center gap-2 py-2.5 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-semibold text-gray-200 transition-all hover:scale-[1.02]"
        >
          <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 170 170">
            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.72.13-9.57-1.97-14.56-6.3-3.14-2.76-7.05-7.44-11.75-14.04-6.62-9.49-11.89-20.4-15.82-32.73-3.92-12.33-5.89-24.36-5.89-36.09 0-15.42 3.86-28.32 11.58-38.69 7.72-10.37 17.65-15.68 29.79-15.93 5.41 0 11.22 1.34 17.43 4.02 6.21 2.68 10.32 4.06 12.33 4.14 1.77 0 5.92-1.42 12.45-4.26 6.53-2.84 12.28-4.14 17.25-3.9 13.06.63 23.51 5.37 31.35 14.22-11.53 6.94-17.15 16.71-16.86 29.31.28 9.94 4.12 18.23 11.52 24.87 7.4 6.64 16.27 10.37 26.61 11.19-2.27 6.84-5.32 13.91-9.15 21.21zM119.22 31.62c0-7.39 2.68-14.49 8.04-21.3 5.36-6.81 12.18-10.74 20.46-11.78.26 1.06.39 2.15.39 3.27 0 7.31-2.78 14.44-8.34 21.38-5.56 6.94-12.43 10.87-20.6 11.78-.14-1.07-.21-2.18-.21-3.35z" />
          </svg>
          Apple
        </button>
      </div>
    </div>
  );
}
