---
title: "Developer & Architecture Guide"
aliases:
  - Guide
  - Developer Guide
  - Tutorial
tags:
  - f1-community
  - wiki
  - guide
date: 2026-09-23
status: active
---

# Formula 1 Platform: Developer & Architecture Guide

> [!abstract] What this is
> The beginner-friendly deep dive — how each system works, how the code is
> structured, and the key concepts. **Three experiences ([[WELCOME|Community hub,
> Store Community, Official Store]]) share one Next.js project and one account.**

---

## Table of Contents
1. [Platform Architecture & Multi-Experience Vision](#1-platform-architecture--multi-experience-vision)
2. [Authentication Flow (NextAuth v4 + Next.js 14)](#2-authentication-flow-nextauth-v4--nextjs-14)
3. [Data Validation with Zod](#3-data-validation-with-zod)
4. [Client Components vs. Server Components](#4-client-components-vs-server-components)
5. [Interactive Form Handling (React Hook Form)](#5-interactive-form-handling-react-hook-form)
6. [Design System & Styling (Tailwind + F1 Branding)](#6-design-system--styling-tailwind--f1-branding)
7. [File Directory Reference](#7-file-directory-reference)

---

## 1. Platform Architecture & Multi-Experience Vision

Our application unifies **three experiences** into a single Next.js project, all
behind **one account**:

```mermaid
flowchart TD
    Root[F1Community Root<br/>Shared Auth & Nav] --> Hub[F1 Community hub]
    Root --> SC[F1 Store Community]
    Root --> OS[F1 Official Store]
    Hub --> H1[Schedule]
    Hub --> H2[Discussion · Reddit-style]
    Hub --> H3[Leaderboard]
    Hub --> H4[News]
    SC --> S1[Community-driven store experience]
    OS --> S2[Product Catalog & Teams]
    OS --> S3[Cart & Checkout / Stripe]
    Hub -. one account .- SC
    SC -. one account .- OS
    OS -. one account .- Hub
```

A user logs in **once** and gains access to the hub (schedule, discussion,
leaderboard, news), the community store, and the official store. See
[[COMMUNITY_HUB|Hub scope & notes]].

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

## 2. Authentication Flow (NextAuth v4 + Next.js 14)

> **Note**: The project currently uses **NextAuth v4** (`next-auth@^4.24.15`, ADR-005 "v5/Auth.js" was proposed but NOT adopted — upgrade to v5 is still an open decision). The snippets below match the code actually in `main`.

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
   ├── Looks up the user by email via Prisma (src/lib/db.ts)
   ├── Verifies password with bcrypt.compare (constant-time)
   └── Returns user object or null
         │
         ▼
[ JWT Session Issued ] ─── (Encrypted cookie saved in browser)
```

### Core Code Breakdown

#### 📄 `src/app/api/auth/[...nextauth]/route.ts`
In Next.js 14 App Router, dynamic folder names with brackets `[...]` act as catch-all handlers. Any request to `/api/auth/signin`, `/api/auth/signout`, or `/api/auth/session` is handled here:

```typescript
import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
```

#### 📄 `src/lib/auth.ts`
Configures authentication providers (Credentials), session strategies, and callbacks:

```typescript
import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import { loginSchema } from '@/lib/validations/auth';
import { db } from '@/lib/db'; // shared PrismaClient singleton

export const authOptions: AuthOptions = {
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
        const validatedFields = loginSchema.safeParse(credentials);
        if (!validatedFields.success) return null;

        const { email, password } = validatedFields.data;

        // 2. Look up the user by email in the database
        const user = await db.user.findUnique({
          where: { email },
          select: {
            id: true, email: true, username: true, name: true,
            image: true, role: true, passwordHash: true, emailVerified: true,
          },
        });
        if (!user || !user.passwordHash) return null; // no user / OAuth-only account

        // 3. Constant-time bcrypt comparison
        const passwordMatches = await compare(password, user.passwordHash);
        if (!passwordMatches) return null;

        // 4. Return user object; jwt callback adds id + role to the token
        return { id: user.id, name: user.name ?? user.username, email: user.email,
                 image: user.image ?? undefined, role: user.role };
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
};
```

### Registration (mirror of the login flow)

`/register` uses the same three-layer pattern: **client** `RegisterForm`
(React Hook Form + `registerSchema`) → **server action** `registerUser` in
`src/app/actions/auth.ts` (re-validates with the same Zod schema, `hash(password, 12)`,
then `db.user.create`). A failed unique constraint (`P2002` on `email` or `username`)
returns a friendly "already taken" message instead of crashing. Success redirects to
`/login?registered=1`. All three layers in one file each — nothing shared, nothing hidden.

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
import { Mail, Lock, Eye, EyeOff, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);

  // Initialize React Hook Form with Zod schema resolver
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', rememberMe: false },
  });

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true);
    setAuthError(null);
    setAuthSuccess(null);

    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false, // Prevents full page reload on submission
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
      {authError && <div className="...">{authError}</div>}
      {authSuccess && <div className="...">{authSuccess}</div>}

      {/* Email Field with register() hook */}
      <div>
        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">EMAIL ADDRESS</label>
        <input
          {...register('email')}
          type="email"
          placeholder="driver@f1-philippines.com"
          className={`w-full pl-10 pr-4 py-3 bg-[#0a0d14] border rounded-lg text-sm ${errors.email ? 'border-red-500' : 'border-white/10'}`}
        />
        {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
      </div>

      {/* Password Field with Show/Hide Toggle */}
      <div>
        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">PASSWORD</label>
        <div className="relative">
          <input
            {...register('password')}
            type={showPassword ? 'text' : 'password'}
            className="w-full pl-10 pr-11 py-3 bg-[#0a0d14] border rounded-lg text-sm border-white/10"
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label="Toggle password visibility">
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errors.password && <p className="text-xs text-red-400">{errors.password.message}</p>}
      </div>

      {/* Sign In Button */}
      <button type="submit" disabled={isLoading} className="w-full f1-btn-primary py-3 rounded-xl font-bold">
        {isLoading ? <Loader2 className="animate-spin" /> : 'SIGN IN'}
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

For the complete current repository tree, including assets, wiki files, Prisma files, public files, and source files, see [FILE_TREE.md](FILE_TREE.md). The structure below highlights the files most relevant to authentication and the database.

| Path | Purpose |
| :--- | :--- |
| [`src/lib/validations/auth.ts`](file:///a:/Github/F1Community/src/lib/validations/auth.ts) | Zod validation rules (`loginSchema`, `registerSchema`) & TypeScript types |
| [`src/lib/auth.ts`](file:///a:/Github/F1Community/src/lib/auth.ts) | NextAuth.js v4 setup, credentials provider & session callbacks |
| [`src/lib/db.ts`](file:///a:/Github/F1Community/src/lib/db.ts) | Shared PrismaClient singleton |
| [`src/app/actions/auth.ts`](file:///a:/Github/F1Community/src/app/actions/auth.ts) | Registration server action (Zod + bcrypt + DB insert) |
| [`src/app/api/auth/[...nextauth]/route.ts`](file:///a:/Github/F1Community/src/app/api/auth/%5B...nextauth%5D/route.ts) | Next.js 14 catch-all authentication API route |
| [`src/components/auth/AuthHeader.tsx`](file:///a:/Github/F1Community/src/components/auth/AuthHeader.tsx) | Header with F1 branding and platform switcher toggle |
| [`src/components/auth/LoginForm.tsx`](file:///a:/Github/F1Community/src/components/auth/LoginForm.tsx) | Client form with validation, password toggle & submit states |
| [`src/components/auth/RegisterForm.tsx`](file:///a:/Github/F1Community/src/components/auth/RegisterForm.tsx) | Client registration form (name/username/email/password) |
| [`src/components/auth/SocialAuth.tsx`](file:///a:/Github/F1Community/src/components/auth/SocialAuth.tsx) | Google & Apple OAuth sign-in options (stubs) |
| [`src/app/login/page.tsx`](file:///a:/Github/F1Community/src/app/login/page.tsx) | F1 Philippines split-screen login layout with brand hub |
| [`src/app/register/page.tsx`](file:///a:/Github/F1Community/src/app/register/page.tsx) | Registration page (same visual language as login) |
| [`src/app/globals.css`](file:///a:/Github/F1Community/src/app/globals.css) | F1 brand tokens, button glow utilities & glassmorphism |
| [`prisma/schema.prisma`](file:///a:/Github/F1Community/prisma/schema.prisma) | Database models (User/Account/Session + store catalog) |
| [`prisma/seed.ts`](file:///a:/Github/F1Community/prisma/seed.ts) | Dev seed: teams/drivers/products + bcrypt demo users |
