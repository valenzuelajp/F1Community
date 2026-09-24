# Progress Tracker: F1 Platform (Website + Store)

> Project renamed from **F1Store** → **F1Community** (used here as reference repo `valenzuelajp/F1Community`).

## Overall Progress

| Phase | Status | Completion | Target Date |
|-------|--------|------------|-------------|
| **Phase 0: Foundation** | 🟡 In Progress | 40% | 2026-09-25 |
| Phase 1a: F1 Schedule & Standings | ⏳ Not Started | 0% | 2026-10-16 |
| Phase 1b: F1 News & Live | ⏳ Not Started | 0% | 2026-11-06 |
| Phase 2a: Store Core Catalog | ⏳ Not Started | 0% | 2026-12-04 |
| Phase 2b: Cart & Checkout | ⏳ Not Started | 0% | 2027-01-01 |
| Phase 3: User Accounts | 🟡 In Progress (early auth only) | 10% | 2027-01-29 |
| Phase 4: Admin Dashboard | ⏳ Not Started | 0% | 2027-02-26 |
| Phase 5: Polish & Launch | ⏳ Not Started | 0% | 2027-03-26 |

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
- [x] **Repository documentation**: current file tree added in `FILE_TREE.md`
- [x] **Security plan + database guide documented**: `SECURITY.md`, `DATABASE.md`
- [x] Figma design exports added (`assets/figma/...` - login, store, account, schedules/standings, admin screens)
- [ ] API contract defined (OpenAPI)
- [x] Component library chosen/created — interaction primitives + `/components-wynn` showcase (2026-09-24; see Components Showcase below)
- [ ] Design system tokens defined
- [ ] F1 API clients created (Jolpica, Live, News) - **NO CODE YET**
- [ ] Route groups created ((f1), (shop))

### Development Environment
- [ ] Local dev server verified (*login + register verified end-to-end 2026-09-18*)
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

| Milestone | Target | Actual | Status |
|-----------|--------|--------|--------|
| Repo + Wiki initialized | 2026-08-28 | 2026-08-28 | ✅ Done |
| Auth scaffold + login UI | 2026-09-02 | 2026-09-02 | ✅ Done |
| Registration flow (incl. assets) | 2026-09-15 | 2026-09-15 (assets) / **2026-09-18 (code: /register + server action)** | ✅ Done |
| DB-backed login (authorize → Prisma + bcrypt) | 2026-09-15 | 2026-09-18 | ✅ Done |
| Migrations folder (CI `db:migrate deploy`) | 2026-09-05 | 2026-09-18 | ✅ Done |
| Dev environment ready | 2026-09-05 | — | 🟡 In Progress |
| F1 APIs integrated (Jolpica, Live, News) | 2026-09-15 | — | ⏳ Pending |
| First deploy (staging) | 2026-09-20 | — | ⏳ Pending |
| F1 Website MVP (Schedule + News) | 2026-11-06 | — | ⏳ Pending |
| Store MVP (Catalog + Checkout) | 2027-01-01 | — | ⏳ Pending |
| Full Platform feature complete | 2027-02-26 | — | ⏳ Pending |
| Production launch | 2027-03-26 | — | ⏳ Pending |

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

| Week | Planned Tasks | Completed | Carryover |
|------|---------------|-----------|-----------|
| 2026-W35 | 12 | 3 | 9 |
| 2026-W36-W37 | Auth scaffold + login UI | 4 | 6 |
| 2026-W38 | Registration (code) + DB-auth + migrations | 3 | 0 |

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

**Route:** `/components-wynn` (`src/app/components-wynn/page.tsx` + `components.css`)  
**Aesthetic:** Pit Wall Telemetry (full-width, racing-grid bg, Anton display type, F1 red accents, staggered card entrance).

### Layout
- Removed centered max-width layout; full-width page.
- **3-column specimen grid** for short-form components; each card labeled with ID, name, and category tag (no card description/footer).
- Split sections with legends: **Short-form content** vs **Long-form content**.
- Card hover glow (`box-shadow`) removed; border highlight + lift only.

### Short-form specimens (P01–P07)
| ID | Component | Interaction |
|----|-----------|-------------|
| P01 | Modal | Open/close overlay dialog |
| P02 | Tooltip | Hover hint |
| P03 | Toast | Auto-dismiss feedback |
| P04 | Dropdown | Anchored menu select |
| P05 | Toggle | On/off switch |
| P06 | Loading | Async button (idle → loading → done + toast) |
| P07 | Segmented | Q1/Q2/Q3 group select |

### Long-form specimens (P08–P10)
| ID | Component | Interaction |
|----|-----------|-------------|
| P08 | Accordion | Vertical disclosure, long body copy |
| P09 | Tabs | Race/Quali/Setup panels with long text |
| P10 | Horizontal | Horizontal accordion — collapsed strips expand side-by-side |

### Related
- Global interaction styles live in `src/app/globals.css` (modal, tooltip, toast, accordion).
- Frontend skill applied: `.opencode/skills/frontend/SKILL.md`.
- Typecheck: only pre-existing Prisma `username` errors (unrelated).

---

*Last updated: 2026-09-24 | Next review: 2026-09-25*
