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
> fix. **Last full audit: 2026-09-23. Re-audited 2026-10-02 against the live tree** (ticks below marked 2026-10-02).

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
- [x] **Dead anchors in nav** — site navbar now links real routes (`/home` `/schedule` `/standings` `/news` `/drivers` `/teams` `/new-to-f1`); Store/Sale pills removed 2026-09-28 (real shop = future project)
- [ ] **Newsletter form** — `action="#newsletter"` is a No-Op; no submit handler, no backend
- [ ] **Forgot-password link** — `#forgot` dead; needs real reset flow (see [[SECURITY|Security]] P1)
- [x] **Register page JSX malformed (P0)** — rebuilt 2026-09-24 as a 1:1 mirror of the login shell (same header/hero/card/telemetry/podium/teams/tires/footer; card renders `RegisterForm`; header pill → /login); `npm run typecheck` passes

## B. Login page — non-functional UI (P1)

- [x] **MENU pill / mobile nav** — fullscreen hamburger menu shipped 2026-09-29 (`MobileMenu.tsx` + overlay, Escape/link-tap close, logout inside)
- [ ] **SocialAuth not rendered** — component is dead code (`alert()` stubs); no OAuth providers configured (`auth.ts`)
- [x] **Timing ticker is live** — `NewsTicker` (headlines + next session + red LIVE tag) on `/home` since 2026-09-28; countdown boxes live on hero

## C. Login page — design & polish (P1–P2)

- [ ] **Hero backdrop `imgLogin.png` is pure black (alpha only)** — replaced with a real
      color asset candidate: `imgImage1-5.png`, `race-week-variant*.png`, `login-1440.png` (P2)
- [x] **Motion / focus-visible / reduced-motion** — auth inputs have focus styles + labels (2026-09-24); site motion system (rise-in, hover, live pulse) all disabled under `prefers-reduced-motion` (2026-09-29)
- [ ] **Decorative arrows carry `alt="arrow"`** — should be `alt=""`/`aria-hidden`
- [ ] **No loading skeleton states** for hero/podium data
- [x] **Leaderboard/API-failure states** — Countdown renders only with a real date (login/register/home/schedule all guard null via `fallbackF1Event()` pattern); neutral offline copy otherwise
- [x] **Register/login visual parity** — register rebuilt 1:1 on the login shell + shared `auth__*` classes (2026-09-24)

## D. SEO & metadata (P0–P1)

> Full plan + code snippets in [[SEO|SEO Plan]].

- [x] `src/app/robots.ts` (exists)
- [x] `src/app/sitemap.ts` (exists, f1store.com URLs)
- [ ] Add `public/og-image.png` (1200×630) — referenced in `layout.tsx` but **absent**
- [ ] Add favicon (`icon.svg` / `favicon.ico`), `apple-touch-icon.png`, `manifest.json` — referenced but **absent**
- [ ] Fix `metadataBase` — currently falls back to `NEXTAUTH_URL`/localhost
- [ ] Add `alternates.canonical` per route
- [ ] Improve generic titles (`/home` = "Home", `/login` = "Login")
- [ ] Add JSON-LD structured data (Phase 1a: `SportsEvent`)

## E. Security (P0–P1)

> Full checklist in [[SECURITY|Security Plan]].

- [x] **Remove demo-credentials leak** on login page (done 2026-09-24: demo button + its CSS deleted from `LoginForm`; verified zero references remain)
- [x] Rate limit auth endpoints (done 2026-09-24: `src/lib/rate-limit.ts` in-memory throttle — 10 logins/15min, 5 registers/hour per email — wired into `authorize` + `registerUser`)
- [x] Production `NEXTAUTH_SECRET` policy (done 2026-09-24: `auth.ts` throws when unset in real prod runtime; dev fallback + `next build` exemption kept — no `.env*` files exist locally, only `.env.example`)
- [ ] CSP + security headers via `next.config.js` `headers()`
- [ ] `NEXTAUTH_URL` per environment (currently localhost in `.env.local`)
- [ ] Cookie hardening (`secure` in prod) + `sameSite`
- [ ] OAuth providers (replace `SocialAuth` stubs)
- [ ] Password reset flow (P1)

## F. Infrastructure & DX (P1)

- [x] **`npm run lint` fixed** — repo pins `eslint-config-next@14.2.35` + `eslint@8.57.1`; lint clean since 2026-09-25 (old `@16` claims were stale)
- [x] **Test suite started** — `src/lib/validations/auth.test.ts`, 7 tests green (`npm run test:run`); coverage beyond auth still open
- [ ] Error boundaries & logging (Sentry) — ROADMAP Phase 0
- [ ] Analytics (PostHog) — ROADMAP Phase 0
- [ ] Merge `Assets` branch (team/driver/track images) into main

## Feature backlog (not gaps — future phases)

New capabilities (live API, store catalog, admin, payments) are **not missing work**;
they belong on the [[ROADMAP|Roadmap]] and [[TASKS|Task Board]].

| Phase | What | Status |
| :---- | :--- | :----- |
| 1a | F1 Schedule & Standings | 🟢 Live (`/schedule` timeline + calendar, `/standings`, `/drivers`, `/teams` on Jolpica data) |
| 1b | F1 News & Live | 🟢 Live (`/home` news hub + `/news` archive on Sky/BBC RSS; live timing/why-watch parked in `futureplans.md`) |
| 2a | Store Core Catalog | ⏳ Not started |
| 2b | Cart & Checkout | ⏳ Not started |
| 3 | User Accounts (auth) | 🟡 Early auth only |
| 4 | Admin Dashboard | ⏳ Not started |
| 5 | Polish & Launch | ⏳ Not started |

---

*Last updated: 2026-10-02 (re-audit) · Part of the [[README|F1Store Wiki]]*