---
title: "Progress Tracker: F1Community"
aliases:
  - Progress
  - Progress Tracker
tags:
  - f1-community
  - wiki
  - progress
date: 2026-09-23
status: active
---

# Progress Tracker: F1 Platform (Website + Store)

> [!info] Naming
> Project renamed from **F1Store** → **F1Community** (reference repo
> `valenzuelajp/F1Community`). It hosts **three experiences**: the F1 Community
> hub, the F1 Store Community, and the F1 Official Store (see [[WELCOME|Welcome]]).
> Older sections below still say "F1 Website / F1 Store".

## Overall Progress

| Phase                             | Status                           | Completion | Target Date |
| --------------------------------- | -------------------------------- | ---------- | ----------- |
| **Phase 0: Foundation**           | 🟡 In Progress                   | 40%        | 2026-09-25  |
| Phase 1a: F1 Schedule & Standings | ⏳ Not Started                   | 0%         | 2026-10-16  |
| Phase 1b: F1 News & Live          | ⏳ Not Started                   | 0%         | 2026-11-06  |
| Phase 2a: Store Core Catalog      | ⏳ Not Started                   | 0%         | 2026-12-04  |
| Phase 2b: Cart & Checkout         | ⏳ Not Started                   | 0%         | 2027-01-01  |
| Phase 3: User Accounts            | 🟡 In Progress (early auth only) | 10%        | 2027-01-29  |
| Phase 4: Admin Dashboard          | ⏳ Not Started                   | 0%         | 2027-02-26  |
| Phase 5: Polish & Launch          | ⏳ Not Started                   | 0%         | 2027-03-26  |

> Phase 3 pulled forward: a working (demo) credentials login + F1 Philippines auth UI were built ahead of the store catalog.

## Phase 0: Foundation - Detailed Progress

### Infrastructure Setup

- [x] Git repository initialized (repo now `A:\Github\F1Community`)
- [x] Wiki structure created (`A:\Github\F1Community\f1storewiki`)
- [x] Package.json & dependencies configured
- [x] TypeScript config established (strict mode)
- [x] ESLint + Prettier configured (Next + prettier-plugin-tailwindcss)
- [x] Base Next.js 14 App Router project
- [x] Docker Compose for PostgreSQL
- [x] Environment variables template (.env.example)
- [x] CI/CD pipeline (GitHub Actions - lint, typecheck, test, build, e2e, Vercel deploy)

### Project Configuration

- [x] Project overview documented (dual platform)
- [x] Technical stack finalized (incl. F1 APIs)
- [x] Database schema designed (store models: User, Account, Session, Category, Team, Driver, Product, ProductVariant, ProductImage, Cart, CartItem, Order, OrderItem, Address, WishlistItem, Collection, CollectionProduct)
- [x] Prisma seed data written (teams, drivers, categories, products, collection, admin + customer users)
- [x] F1 API reference documented (Jolpica, f1-live-api, RSS)
- [x] **Auth scaffold**: NextAuth (v4) credentials provider, Zod validation, `/api/auth/[...nextauth]` route, JWT session
- [x] **DB-backed login**: `authorize()` queries Prisma and verifies with bcrypt (`src/lib/auth.ts`) — verified live with seeded creds (2026-09-18)
- [x] **Registration**: `/register` page + server action (`src/app/actions/auth.ts`) — creates bcrypt-hashed users, duplicate email/username handled
- [x] **Seed typecheck drift fixed**: `username` added to `User` in `schema.prisma` (matches live Neon table) and supplied in `seed.ts`
- [x] **Migrations folder created**: `prisma/migrations/20260915024910_community_init` baseline matches live schema; `migrate status` = up to date
- [x] **Auth UI**: F1-branded login page (`/login`), LoginForm (demo quick-fill now seeded `customer@f1store.com`), RegisterForm, SocialAuth, AuthHeader
- [x] **Login visual pass**: angular black login tile, elevated two-column composition, and `imgSticker1.png` driver artwork beside the form
- [x] **Login landing page delivered**: `/` redirects to `/login`; the F1 race-week login experience is full-width on desktop with hero, ticker, and partner bar. Successful login defaults to `/home` (2026-09-20; see `LOGIN_LANDING_PAGE.md`)
- [x] **Login page made dynamic (Jolpica)**: hero badge, race info, per-second countdown, season stats, and auto-adjusting title now come from the real F1 schedule via `src/lib/f1/jolpica.ts` + `src/components/f1/Countdown.tsx`; login CSS variables/classes renamed to match their content (2026-09-22; see `LOGIN_DYNAMIC_F1_CONTENT.md`)
- [x] **Repository documentation**: current file tree added in `FILE_TREE.md`
- [x] **Security plan + database guide documented**: `SECURITY.md`, `DATABASE.md`
- [x] Figma design exports added (`assets/figma/...` - login, store, account, schedules/standings, admin screens)
- [ ] API contract defined (OpenAPI)
- [x] Component library chosen/created — interaction primitives + `/components-wynn` showcase (2026-09-24; includes **Wynn** login/auth set; see report below)
- [ ] Design system tokens defined
- [ ] F1 API clients created (Jolpica, Live, News) - **NO CODE YET**
- [ ] Route groups created ((f1), (shop))

### Development Environment

- [ ] Local dev server verified (_login + register verified end-to-end 2026-09-18_)
- [x] Database migrations folder created (`prisma/migrations` + baseline `community_init` — CI `db:migrate deploy` can now run)
- [ ] Lint green at repo level (**blocked**: `eslint-config-next@16` vs `eslint@8`/Next 14 mismatch — see TASKS.md)
- [ ] Storybook configured
- [ ] Testing framework exercised (Vitest + Playwright installed, no tests written yet)
- [ ] Error tracking (Sentry)
- [ ] Analytics (PostHog/GA4)

## Phase 3 (Pulled Forward): Auth Flow - Detailed Progress

### Done (merged to `main`)

- [x] NextAuth credentials provider with Zod `loginSchema` validation
- [x] `src/lib/auth.ts` (JWT strategy, role on token/session)
- [x] **DB-backed `authorize()`** — Prisma user lookup + `bcrypt.compare` (seeded creds login verified live)
- [x] `src/app/api/auth/[...nextauth]/route.ts`
- [x] `src/app/login/page.tsx` - F1 Philippines layout with top navigation, driver sticker, and angular login tile
- [x] `src/components/auth/LoginForm.tsx` (validated form, show/hide password, demo quick-fill → seeded user)
- [x] **`/register` page + `RegisterForm` + registration server action** (bcrypt + unique username/email, `src/app/actions/auth.ts`)
- [x] `src/components/auth/SocialAuth.tsx` (Google/Apple stubs)
- [x] `src/components/auth/AuthHeader.tsx` (F1/Store platform switcher)
- [x] Prisma schema expanded for auth (User/Account/Session/VerificationToken + role enum + `username`)
- [x] bcrypt hashing in seeds (admin/customer demo users)
- [x] `prisma/migrations/` baseline created (CI `db:migrate deploy` unblocked)
- [x] Full-width F1 login landing page, root redirect, and safe post-login `/home` destination (2026-09-20)

### Unfinished / Open

- [ ] Social buttons still `alert()` stubs; "Forgot password" link is `#forgot`; store nav links (new-arrivals, teams, drivers, accessories, sale) have no pages.
- [ ] NextAuth version mismatch: package.json = **v4**, GUIDE.md aligns with **v4** after doc pass.
- [ ] **Lint infra broken** (pre-existing): `eslint-config-next@16.3.4` requires eslint 9/flat config; repo pins `eslint@8` + Next 14.2. `pnpm lint` fails before app code. Fix: pin `eslint-config-next@^14` or move to eslint 9. `pnpm typecheck` passes.
- [ ] Auth hardening (rate limiting, CSP, cookie flags, email verification) tracked in `SECURITY.md`.

## Milestone Tracker

| Milestone                                     | Target     | Actual                                                                 | Status         |
| --------------------------------------------- | ---------- | ---------------------------------------------------------------------- | -------------- |
| Repo + Wiki initialized                       | 2026-08-28 | 2026-08-28                                                             | ✅ Done        |
| Auth scaffold + login UI                      | 2026-09-02 | 2026-09-02                                                             | ✅ Done        |
| Registration flow (incl. assets)              | 2026-09-15 | 2026-09-15 (assets) / **2026-09-18 (code: /register + server action)** | ✅ Done        |
| DB-backed login (authorize → Prisma + bcrypt) | 2026-09-15 | 2026-09-18                                                             | ✅ Done        |
| Migrations folder (CI `db:migrate deploy`)    | 2026-09-05 | 2026-09-18                                                             | ✅ Done        |
| Dev environment ready                         | 2026-09-05 | —                                                                      | 🟡 In Progress |
| F1 APIs integrated (Jolpica, Live, News)      | 2026-09-15 | —                                                                      | ⏳ Pending     |
| First deploy (staging)                        | 2026-09-20 | —                                                                      | ⏳ Pending     |
| F1 Website MVP (Schedule + News)              | 2026-11-06 | —                                                                      | ⏳ Pending     |
| Store MVP (Catalog + Checkout)                | 2027-01-01 | —                                                                      | ⏳ Pending     |
| Full Platform feature complete                | 2027-02-26 | —                                                                      | ⏳ Pending     |
| Production launch                             | 2027-03-26 | —                                                                      | ⏳ Pending     |

## Current Sprint (Week of 2026-09-16) — Review 2026-09-18

### Goals

- [x] Fix `prisma/seed.ts` + schema typecheck drift (`username` reconciled across schema/client/DB)
- [x] Create `prisma/migrations/` so CI `db:migrate deploy` passes (baseline `community_init`)
- [x] Build `/register` page + registration server action with bcrypt + DB (`src/app/actions/auth.ts`)
- [x] Make `authorize()` query Prisma for the user (seeded creds verified live: `customer@f1store.com` / `customer123`)
- [x] Verify `pnpm db:generate`, `pnpm typecheck`, `migrate status` — all green
- [ ] `pnpm lint` — **blocked by pre-existing eslint-config-next@16 / eslint@8 mismatch** (see above)
- [ ] Merge pending `Assets` branch (team/driver images)
- [ ] Add security hardening items (rate limit, CSP, cookie flags) per `SECURITY.md`

### Blockers (2026-09-18 status)

- ~~`prisma/seed.ts` typecheck drift~~ → **resolved**
- ~~`prisma/migrations` missing~~ → **resolved**
- **`pnpm lint` fails pre-existing**: `eslint-config-next@16.3.4` (flat-config/eslint 9) vs installed `eslint@8.57.1` + Next 14.2.35. Need dep pin fix in a dedicated PR.

## Velocity & Metrics

| Week         | Planned Tasks                              | Completed | Carryover |
| ------------ | ------------------------------------------ | --------- | --------- |
| 2026-W35     | 12                                         | 3         | 9         |
| 2026-W36-W37 | Auth scaffold + login UI                   | 4         | 6         |
| 2026-W38     | Registration (code) + DB-auth + migrations | 3         | 0         |

## Definition of Done

A task is **Done** when:

- [ ] Code written and self-reviewed
- [ ] TypeScript compiles without errors
- [ ] Linting passes
- [ ] Unit tests written (>80% coverage for new code)
- [ ] Integration tests pass (if applicable)
- [ ] Storybook story added (for UI components)
- [ ] Documented in relevant wiki pages
- [ ] Deployed to preview environment
- [ ] Peer reviewed (if team > 1)

---

## Components Showcase Report — `components` branch (2026-09-24)

**Wynn** · Route: `/components-wynn` (`src/app/components-wynn/page.tsx` + `components.css`)  
**Aesthetic:** Pit Wall Telemetry (full-width, racing-grid bg, Anton display type, F1 red accents, staggered card entrance).

### Layout — **Wynn**
- Removed centered max-width layout; full-width page.
- **3-column specimen grid** for short-form components (responsive: **1-col &lt;640px · 2-col 640–1023px · 3-col ≥1024px**); each card labeled with ID, name, and category tag (no card description/footer).
- Split sections with legends: **Short-form content** vs **Long-form content**.
- Card hover glow (`box-shadow`) removed; border highlight + lift only.
- Grouped existing specimens under a **Basic interaction** `fieldset`/`legend` with indented contents.

### Short-form specimens (P01–P07) — **Wynn**
| ID | Component | Interaction |
|----|-----------|-------------|
| P01 | Modal | Open/close overlay dialog |
| P02 | Tooltip | Hover hint |
| P03 | Toast | Auto-dismiss feedback |
| P04 | Dropdown | Anchored menu select |
| P05 | Toggle | On/off switch |
| P06 | Loading | Async button (idle → loading → done + toast) |
| P07 | Segmented | Q1/Q2/Q3 group select |

### Long-form specimens (P08–P10) — **Wynn**
| ID | Component | Interaction |
|----|-----------|-------------|
| P08 | Accordion | Vertical disclosure, long body copy |
| P09 | Tabs | Race/Quali/Setup panels with long text |
| P10 | Horizontal | Horizontal accordion — collapsed strips expand side-by-side |

### Related — **Wynn**
- Horizontal accordion: full-width fill, content-height sizing, slower expand + label fade on trigger.
- Global interaction styles live in `src/app/globals.css` (modal, tooltip, toast, accordion).
- Typecheck: only pre-existing Prisma `username` errors (unrelated).

### Login / auth set on `/components-wynn` — **Wynn** (2026-09-24)
- Added as a second fieldset **Login components** on the same page (no separate route).
- Short-form **L01–L12** (responsive grid): Text Input, Password, Error Banner, Status Banner, Remember Row, Login Button, Guest Button, OR Divider, Platform Tabs, Social Auth, Form Header, Footer Callout.
- Long-form **L13–L14** (1-col): Mini Login composite, Auth Header + platform tabs.
- Previews reuse `src/components/auth/auth-forms.css` (imported only in `components-wynn`).
- **Wynn:** Mini Login **composes the same field-control components** as L01–L12 (shared React components) — edits to those components update both the cards and Mini Login.
- **Wynn:** Mini Login has a **drag resize bar** under the form (pointer drag + arrow keys) to change form width (240–520px).
- **Wynn:** Primary LOGIN button uses **`/public/login-btn.svg?v=2`** (`preserveAspectRatio="none"`, `#ce1503`, evenodd tip cut) via `.components-login-svg-btn` — stretched to **38px** to match Classic.
- **Wynn:** L06 card has a **Variant** dropdown **below the specimen** (inside the card, not in the header) switching **Classic** (gradient) vs **Variant 2** (user SVG) designs.
- **Wynn:** L07 Guest Button has the same **Variant** dropdown **below the specimen** — **Classic** (outline) vs **Variant 2** (`/public/guest-btn.svg`, `preserveAspectRatio="none"`, `#ff1801`).
- **Wynn:** OR Divider (L08) shows **`[line] OR [line]`** via `.auth__divider::before/::after` (also applies to real login form).
- **Wynn:** Mini Login (L13) is a **drag-and-drop builder**: right **Components palette** (drag or click to add), **drop zones** between blocks for insert/reorder, grip on section chips, **Remove section** in the hotspot panel. Still supports click-to-edit (variants, labels, accent, password reveal) + **Reset layout** + resize bar. (Hint/chip bar under the form removed.)
- **Wynn:** L13 Mini Login palette footer has **Copy TSX** + **Copy CSS** (full form in current builder order/config) + Reset layout (snapshot comment dump removed).
- **Wynn:** **`LOGIN_COMPONENTS` registry** drives both the **Login components** fieldset cards and the **Mini Login palette** — add an entry once and it shows up as a palette option (optional `defaultInMini`, `MiniBody`, `MiniPanel`, `Specimen`).
- **Wynn:** **L13 Mini Login** has a **Background** Variant dropdown (**Classic | Variant 2 | Variant 3**) under the specimen — applies `components-mini-login--bg-classic|v2|v3` to the form container (not a separate card). Variant 3 uses **`/public/mini-login-bg.svg?v=1`** (`preserveAspectRatio="none"`, `background-size: 100% 100%`) so it stretches with the responsive form width (no fixed size). Variant 2 remains a CSS placeholder.
- **Wynn:** Every login card except Mini Login has **Variant** (dropdown if multi-variant, disabled **Classic** otherwise) + **Copy TSX** + **Copy CSS** (paste-ready component + rules for the active variant; builders live in `src/app/components-wynn/export-code.ts`).
- **Wynn:** **Copy TSX / Copy CSS export rule:** bake copy-time decisions (variant, labels, accent, bg, order) into the output as final `className` / CSS — do **not** emit runtime branches the recipient does not need (e.g. no `const isSvg = true` + ternary when the variant is already fixed). Live showcase components may keep runtime props; exports should not. Copy CSS only includes rules that apply to the selected variant.
- **Wynn:** **Copy TSX / Copy CSS seamlessness pass:** every Copy TSX goes through `finalizeTsx()` (single `'use client'`, one top import block, no mid-file imports). Mini Login imports are conditional (glow → `useRef`/`MouseEvent`; blocks → only needed lucide icons). Mini Login Copy CSS bakes the builder **width** (matches TSX inline style), emits accent overrides only for present blocks, and dedupes shared rules (`.auth__input` for email+password; btn label/arrow + `.components-auth-arrow` for login+guest). `buildLoginTsx` uses the same single-module normalizer.
- **Wynn:** **L15 · Backdrop — Back Image** added to Login components (`type: 'sticker'`, named **Back Image** — not "Background Image"): frame/border removed; specimen is the transparent cutout `/public/imgSticker1.png` (3000×1988) with `/public/imgOrnament24.svg?v=2` star grid at the bottom and an editable **2-digit watermark number**. Hidden from the Mini Login palette (`hideFromPalette`) since it is a backdrop layer, not a droppable form block. Copy TSX/CSS via `stickerTsX()` / `STICKER_CSS` in `export-code.ts`. Meta count **Auth 13+02** now matches 13 field-control cards + 2 composites.
- **Wynn:** **L15 watermark number field:** card control has a **Number (2 digits)** text input (digits only, `maxLength 2`, placeholder `01`, prompt "accepts 2 digits (00–99)") under the Variant chip — the value renders as the preview overlay and is **baked at copy time** into Copy TSX (literal text) via `exportOpts.num`; empty/non-digit input falls back to `01` and single digits zero-pad (`7 → 07`). Control UI redesigned as a compact single-row pill (`№` glyph label + 3ch monospace tabular centered input) matching the Variant chip height — fixes the old stacked field's misalignment and the COPY CSS row wrap; hover/focus get accent border + glow, `№` turns accent on focus. Overlay style per reference screenshot: **Karantina** (Google Fonts `@import` at top of `components.css` + in `STICKER_CSS`), `font-size: min(700px, 42cqw)` (export uses same container query), `letter-spacing: -0.06em` (digits tight), `color: transparent` fill, `-webkit-text-stroke: 1.5px #ffffff`. Layer order: **watermark number behind the driver cutout (`z-index: 0`) at the upper right** (`right: 2%; top: 4%`), photo above it (`z-index: 1`), stars `z-index: 0` bottom-center.
- **Wynn:** **L15 composition matched to reference screenshot:** portrait frame `aspect-ratio: 7 / 8`, **no background of its own** (transparent — the card's theme shows through; the blue `#0e1326` fill and duplicate stripes were removed on request); photo sized `width: 135%; height: 135%` centered (`top/left: 50%`, `translate(-50%, -50%)`) with `object-fit: contain` and **`max-width: none`** (Tailwind preflight's `img { max-width: 100% }` was silently clamping every enlargement — this was the bug behind the driver not growing; 165% was then rejected as "too stretched for the container", so 135% makes the full cutout fit with margins on all sides); Ornament 24 kept at its **original size and full grid** (SVG restored to `viewBox 0 0 511 379`, `?v=2`) — sized per the user's DevTools-tuned values: `width: 50%` (natural height), `bottom: calc(1% + 50px)`, `transform: translateX(-40%)`, **behind the driver cutout** (`z-index: 0` vs photo `z-index: 1`) — the larger driver covers it except at silhouette gaps. All rules mirrored in export `STICKER_CSS` (incl. `container-type: inline-size` so the export's `cqw` units resolve). Verified via Playwright (msedge) screenshots against the user's reference; typecheck clean (5 pre-existing Prisma `username` errors only).
- **Wynn:** **Back Image behind the Mini Login container** (user: "how the back image is formed, is how it should be put behind the container of the mini login, with the back image being more to the left so that it may pop out more"): the form is wrapped in `.components-mini-scene` (`position: relative; width: fit-content`) holding two children in tree order — `.components-mini-login__back` (absolute, `top: 50%`/`translateY(-50%)` centered, `left: -40%`, `width: 100%`, `z-index: 0`, `pointer-events: none`) and the form itself (relative, `z-index: auto`) — so the back image keeps its **exact L15 formation** (`.components-back-image` `aspect-ratio: 7/8`, photo 135%, `01`, stars) and paints **behind the form's opaque background where they overlap, popping out to the left** (40% of frame width protrudes; verified by pixel probes: overlap samples = form bg `06080D`, protrusion = driver). Ancestors already have `overflow: visible` (`.components-mini-login-row` chain), so the pop-out isn't clipped. Export parity: Copy TSX wraps `mini-login-scene` → `mini-login__back` → `mini-login` (backImg div before the form; glow handler indent fixed); Copy CSS emits `.mini-login-scene`/`.mini-login__back` + `BACK_IMAGE_CSS` (=`STICKER_CSS` minus its `@import`, which is line 1 of the output) and the `> *:not()` chrome rule for **all** variants. Pasted Copy-export test (`MiniLoginExport.tsx` + `mini-login.css`, width 520) regenerated from live clipboard; typecheck clean (5 pre-existing only).
- **Wynn:** Meta count: **Auth 13+02** (L01–L14; Mini Login is L13).

---

*Last updated: 2026-09-24 (Wynn) | Next review: 2026-09-25*
