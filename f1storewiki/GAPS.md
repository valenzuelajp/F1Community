---
title: "Gaps & Missing Work (Living Audit)"
aliases:
  - Gaps
  - Gap Analysis
  - What's Missing
tags:
  - f1-community
  - wiki
  - audit
  - gaps
date: 2026-09-23
status: active
---

# 🕳️ Gaps & Missing Work (Living Audit)

> [!abstract] What this is
> The **single living inventory** of what's missing, broken, or not-yet-built across
> F1Community. Tick items off as they land. Each gap links to the doc that owns the
> fix. **Last full audit: 2026-09-23.**

[[WELCOME|🏁 Welcome]] · [[README|📚 Wiki Index]] · [[SEO|SEO Plan]] · [[SECURITY|Security Plan]]

---

## How to use this

- `[ ]` = open · `[x]` = done (tick when merged/fixed)
- **Owner docs**: [[SEO|SEO]], [[SECURITY|Security]], [[DATABASE|Database]],
  [[TASKS|Task Board]], [[LOGIN_LANDING_PAGE|Login]]
- Priorities: **P0** = blocks launch · **P1** = before scale · **P2** = polish

## A. Login page — correctness & placeholders (P0)

> Audited 2026-09-23. Full plan in [[LOGIN_LANDING_PAGE|Login Landing Page]].

- [ ] **Placeholder footer content** — `[Details]` links, `[PAGE]`/`[Page]` ghost columns
- [ ] **Dead anchors in footer** — `#privacy`, `#terms`, `#cookies` point nowhere
- [ ] **Dead anchors in nav** — `#schedules`, `#news`, `#store`, `#sale` (nav has no sections to jump to yet)
- [ ] **Newsletter form** — `action="#newsletter"` is a No-Op; no submit handler, no backend
- [ ] **Forgot-password link** — `#forgot` dead; needs real reset flow (see [[SECURITY|Security]] P1)

## B. Login page — non-functional UI (P1)

- [ ] **MENU pill** — rendered but has no `onClick`; no mobile nav drawer
- [ ] **SocialAuth not rendered** — component is dead code (`alert()` stubs); no OAuth providers configured (`auth.ts`)
- [ ] **Timing ticker is static text** — no live events fed in yet

## C. Login page — design & polish (P1–P2)

- [ ] **Hero backdrop `imgLogin.png` is pure black (alpha only)** — replaced with a real
      color asset candidate: `imgImage1-5.png`, `race-week-variant*.png`, `login-1440.png` (P2)
- [ ] **No motion / focus-visible / reduced-motion handling**
- [ ] **Decorative arrows carry `alt="arrow"`** — should be `alt=""`/`aria-hidden`
- [ ] **No loading skeleton states** for hero/podium data
- [ ] **Leaderboard hides on API failure** — should fall back to a friendly state (see `fallbackF1Event()` pattern)
- [ ] **Register page uses a different visual language** than login (parity target)

## D. SEO & metadata (P0–P1)

> Full plan + code snippets in [[SEO|SEO Plan]].

- [ ] Create `src/app/robots.ts`
- [ ] Create `src/app/sitemap.ts`
- [ ] Add `public/og-image.png` (1200×630) — referenced in `layout.tsx` but **absent**
- [ ] Add favicon (`icon.svg` / `favicon.ico`), `apple-touch-icon.png`, `manifest.json` — referenced but **absent**
- [ ] Fix `metadataBase` — currently falls back to `NEXTAUTH_URL`/localhost
- [ ] Add `alternates.canonical` per route
- [ ] Improve generic titles (`/home` = "Home", `/login` = "Login")
- [ ] Add JSON-LD structured data (Phase 1a: `SportsEvent`)

## E. Security (P0–P1)

> Full checklist in [[SECURITY|Security Plan]].

- [ ] **Remove demo-credentials leak** on login page (exposes `customer123`)
- [ ] Rate limit auth endpoints (`/api/auth/callback/credentials`, `/register`)
- [ ] Production `NEXTAUTH_SECRET` policy (dev fallback is hardcoded in `src/lib/auth.ts`)
- [ ] CSP + security headers via `next.config.js` `headers()`
- [ ] `NEXTAUTH_URL` per environment (currently localhost in `.env.local`)
- [ ] Cookie hardening (`secure` in prod) + `sameSite`
- [ ] OAuth providers (replace `SocialAuth` stubs)
- [ ] Password reset flow (P1)

## F. Infrastructure & DX (P1)

- [ ] **`pnpm lint` broken** — `eslint-config-next@16` (eslint 9 flat) vs `eslint@8` + Next 14. Pin `^14` or upgrade eslint to 9 (see [[TASKS|Task Board]] P0)
- [ ] **No test suite** — Vitest/Playwright installed, zero tests
- [ ] Error boundaries & logging (Sentry) — ROADMAP Phase 0
- [ ] Analytics (PostHog) — ROADMAP Phase 0
- [ ] Merge `Assets` branch (team/driver/track images) into main

## Feature backlog (not gaps — future phases)

New capabilities (live API, store catalog, admin, payments) are **not missing work**;
they belong on the [[ROADMAP|Roadmap]] and [[TASKS|Task Board]].

| Phase | What | Status |
| :---- | :--- | :----- |
| 1a | F1 Schedule & Standings | ⏳ Not started |
| 1b | F1 News & Live | ⏳ Not started |
| 2a | Store Core Catalog | ⏳ Not started |
| 2b | Cart & Checkout | ⏳ Not started |
| 3 | User Accounts (auth) | 🟡 Early auth only |
| 4 | Admin Dashboard | ⏳ Not started |
| 5 | Polish & Launch | ⏳ Not started |

---

*Last updated: 2026-09-23 · Part of the [[README|F1Store Wiki]]*