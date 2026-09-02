# Formula 1 Platform: Developer & Architecture Guide

Welcome to the development guide for the **Formula 1 Platform (F1 Website + F1 Store)**. This document serves as a tutorial, explaining how each system works, how the code is structured, and the key concepts you need to learn.

---

## Table of Contents
1. [Platform Architecture & Dual-Domain Vision](#1-platform-architecture--dual-domain-vision)
2. [Authentication Flow (NextAuth v5 + Next.js 14)](#2-authentication-flow-nextauth-v5--nextjs-14)
3. [Data Validation with Zod](#3-data-validation-with-zod)
4. [Client Components vs. Server Components](#4-client-components-vs-server-components)
5. [Interactive Form Handling (React Hook Form)](#5-interactive-form-handling-react-hook-form)
6. [Design System & Styling (Tailwind + F1 Branding)](#6-design-system--styling-tailwind--f1-branding)
7. [File Directory Reference](#7-file-directory-reference)

---

## 1. Platform Architecture & Dual-Domain Vision

Our application unifies two different web experiences into a single Next.js project:

```
                     ┌─────────────────────────────────────────┐
                     │          F1 Platform Root               │
                     │          (Shared Auth & Nav)            │
                     └────────────────────┬────────────────────┘
                                          │
                  ┌───────────────────────┴───────────────────────┐
                  ▼                                               ▼
     ┌────────────────────────┐                     ┌───────────────────────────┐
     │      (f1) Website      │                     │        (shop) Store       │
     ├────────────────────────┤                     ├───────────────────────────┤
     │ • Live Telemetry & SSE │                     │ • Product Catalog & Teams │
     │ • Race Calendar        │                     │ • Cart & Checkout         │
     │ • Standings & Results  │                     │ • Stripe Payments         │
     │ • News Aggregation     │                     │ • User Orders & Addresses │
     └────────────────────────┘                     └───────────────────────────┘
```

A user logs in **once** and gains access to both their favorite teams/standings and their shopping cart/order history.

---

## 2. Authentication Flow (NextAuth v5 + Next.js 14)

### How It Works Under the Hood

```
[ User Form Submission ]
         │
         ▼
[ Client Validation ] ─── (Zod schema: format & length checks)
         │
         ▼
[ signIn('credentials') ] ─── (Sends POST to Next.js API)
         │
         ▼
[ /api/auth/[...nextauth]/route.ts ] ─── (Catches route & forwards to Auth.js)
         │
         ▼
[ authorize() in src/lib/auth.ts ]
   ├── Runs server-side Zod validation
   ├── Checks user against Database (Prisma)
   └── Returns user object or error
         │
         ▼
[ JWT Session Issued ] ─── (Encrypted cookie saved in browser)
```

### Core Code Breakdown

#### 📄 `src/app/api/auth/[...nextauth]/route.ts`
In Next.js 14 App Router, dynamic folder names with brackets `[...]` act as catch-all handlers. Any request to `/api/auth/signin`, `/api/auth/signout`, or `/api/auth/session` is handled here:

```typescript
import { handlers } from '@/lib/auth';

// NextAuth v5 exports standard GET and POST Web Handlers
export const { GET, POST } = handlers;
```

#### 📄 `src/lib/auth.ts`
Configures authentication providers, session strategies, and callbacks:

```typescript
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { loginSchema } from '@/lib/validations/auth';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      // authorize() runs on the server when someone logs in
      async authorize(credentials) {
        // 1. Validate incoming data with Zod
        const validated = loginSchema.safeParse(credentials);
        if (!validated.success) return null;

        const { email, password } = validated.data;

        // 2. Validate credentials (demo check, replaced with DB in Phase 3)
        if (email && password.length >= 6) {
          return {
            id: 'f1-fan-1',
            name: 'Lewis Fan',
            email: email,
            role: 'CUSTOMER',
          };
        }
        return null; // Triggers invalid credentials error
      },
    }),
  ],
  pages: {
    signIn: '/login', // Route for our custom login page
  },
  session: {
    strategy: 'jwt', // Stateless JSON Web Token stored in secure cookies
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role || 'CUSTOMER';
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        (session.user as Record<string, unknown>).id = token.id as string;
        (session.user as Record<string, unknown>).role = token.role as string;
      }
      return session;
    },
  },
});
```

---

## 3. Data Validation with Zod

### Why Zod?
Instead of writing repetitive `if (!email.includes('@'))` statements, **Zod** gives us:
1. Declarative, readable rules.
2. Shared schemas between the browser and server.
3. Automatically inferred TypeScript types.

#### 📄 `src/lib/validations/auth.ts`

```typescript
import { z } from 'zod';

export const loginSchema = z.object({
  // Must not be empty and must be a valid email format
  email: z
    .string()
    .min(1, { message: 'Email address is required' })
    .email({ message: 'Please enter a valid email address (e.g. user@f1.com)' }),

  // Must not be empty and must have at least 6 characters
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .min(6, { message: 'Password must be at least 6 characters long' }),

  // Optional checkbox boolean
  rememberMe: z.boolean().default(false).optional(),
});

// Inferred TypeScript type (no duplicate interfaces needed!)
export type LoginInput = z.infer<typeof loginSchema>;
```

---

## 4. Client Components vs. Server Components

In Next.js 14 App Router:
- **Server Components (Default)**: Render on the server, have zero impact on JavaScript bundle size, and can fetch directly from databases or external APIs.
- **Client Components (`'use client'`)**: Run in the browser. Required whenever you use browser events (`onClick`, `onChange`), React hooks (`useState`, `useEffect`), or form libraries.

**Rule of Thumb**: Keep pages and data-fetching in Server Components; push interactivity into small, focused Client Components.

---

## 5. Interactive Form Handling (React Hook Form)

#### 📄 `src/components/auth/LoginForm.tsx`

We pair **React Hook Form** with `@hookform/resolvers/zod` to connect our Zod schema directly to input fields without unnecessary re-renders.

```tsx
'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginInput } from '@/lib/validations/auth';
import { signIn } from 'next-auth/react';
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';

export function LoginForm({ activeTab }: { activeTab: 'f1' | 'store' }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize React Hook Form with Zod schema resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true);
    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false, // Prevents full page reload on submission
    });
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Email Field with register() hook */}
      <div>
        <label className="text-xs font-semibold text-gray-300">Email</label>
        <input
          {...register('email')}
          type="email"
          placeholder="fan@formula1.com"
          className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white"
        />
        {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
      </div>

      {/* Password Field with Show/Hide Toggle */}
      <div>
        <label className="text-xs font-semibold text-gray-300">Password</label>
        <div className="relative">
          <input
            {...register('password')}
            type={showPassword ? 'text' : 'password'}
            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-400 hover:text-white"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errors.password && <p className="text-xs text-red-400">{errors.password.message}</p>}
      </div>

      {/* Dynamic Submit Button */}
      <button type="submit" disabled={isLoading} className="w-full f1-btn-primary py-3 rounded-xl font-bold">
        {isLoading ? <Loader2 className="animate-spin" /> : `Sign In to ${activeTab === 'f1' ? 'F1 Website' : 'F1 Store'}`}
      </button>
    </form>
  );
}
```

---

## 6. Design System & Styling (Tailwind + F1 Branding)

#### 📄 `src/app/globals.css`

To achieve the Formula 1 aesthetic, we defined core brand tokens and CSS utilities:

- **Official F1 Red**: `#E10600` (`--f1-red`)
- **Dark Carbon Background**: `#0A0B0E`
- **Glassmorphic Panels**: Backdrop blur with subtle white borders.

```css
:root {
  --f1-red: #E10600;
  --f1-dark: #0F1015;
}

body {
  color: #F3F4F6;
  background-color: #0A0B0E;
  background-image: 
    radial-gradient(at 0% 0%, rgba(225, 6, 0, 0.15) 0px, transparent 50%),
    radial-gradient(at 100% 100%, rgba(15, 16, 21, 0.9) 0px, transparent 50%);
}

.glass-panel {
  background: rgba(18, 20, 29, 0.75);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
}

.f1-btn-primary {
  background: linear-gradient(135deg, #E10600 0%, #C00400 100%);
  box-shadow: 0 4px 14px rgba(225, 6, 0, 0.4);
}
```

---

## 7. File Directory Reference

| Path | Purpose |
| :--- | :--- |
| [`src/lib/validations/auth.ts`](file:///a:/Github/F1Store/F1Store/src/lib/validations/auth.ts) | Zod validation rules & TypeScript types |
| [`src/lib/auth.ts`](file:///a:/Github/F1Store/F1Store/src/lib/auth.ts) | NextAuth.js v5 setup, credentials provider & session callbacks |
| [`src/app/api/auth/[...nextauth]/route.ts`](file:///a:/Github/F1Store/F1Store/src/app/api/auth/%5B...nextauth%5D/route.ts) | Next.js 14 catch-all authentication API route |
| [`src/components/auth/AuthHeader.tsx`](file:///a:/Github/F1Store/F1Store/src/components/auth/AuthHeader.tsx) | Header with F1 branding and platform switcher toggle |
| [`src/components/auth/LoginForm.tsx`](file:///a:/Github/F1Store/F1Store/src/components/auth/LoginForm.tsx) | Client form with validation, password toggle & submit states |
| [`src/components/auth/SocialAuth.tsx`](file:///a:/Github/F1Store/F1Store/src/components/auth/SocialAuth.tsx) | Google & Apple OAuth sign-in options |
| [`src/app/login/page.tsx`](file:///a:/Github/F1Store/F1Store/src/app/login/page.tsx) | Split-screen login layout with feature preview sidebar |
| [`src/app/globals.css`](file:///a:/Github/F1Store/F1Store/src/app/globals.css) | F1 brand tokens, button glow utilities & glassmorphism |
