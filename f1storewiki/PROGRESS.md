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
- [x] **Auth UI**: F1-branded login page (`/login`), LoginForm, SocialAuth, AuthHeader, global F1 styling
- [x] Figma design exports added (`assets/figma/...` - login, store, account, schedules/standings, admin screens)
- [ ] API contract defined (OpenAPI)
- [ ] Component library chosen/created
- [ ] Design system tokens defined
- [ ] F1 API clients created (Jolpica, Live, News) - **NO CODE YET**
- [ ] Route groups created ((f1), (shop))

### Development Environment
- [ ] Local dev server verified
- [ ] Database migrations folder created (`prisma/migrations` **MISSING** - CI `db:migrate deploy` will fail)
- [ ] Storybook configured
- [ ] Testing framework exercised (Vitest + Playwright installed, no tests written yet)
- [ ] Error tracking (Sentry)
- [ ] Analytics (PostHog/GA4)

## Phase 3 (Pulled Forward): Auth Flow - Detailed Progress

### Done (merged to `main`)
- [x] NextAuth credentials provider with Zod `loginSchema` validation
- [x] `src/lib/auth.ts` (JWT strategy, role on token/session)
- [x] `src/app/api/auth/[...nextauth]/route.ts`
- [x] `src/app/login/page.tsx` - F1 Philippines split-pane layout (brand hub + login card)
- [x] `src/components/auth/LoginForm.tsx` (validated form, show/hide password, success/error alerts, demo quick-fill)
- [x] `src/components/auth/SocialAuth.tsx` (Google/Apple stubs)
- [x] `src/components/auth/AuthHeader.tsx` (F1/Store platform switcher)
- [x] Prisma schema expanded for auth (User/Account/Session/VerificationToken + role enum)
- [x] bcrypt hashing available in seeds (admin/customer demo users)

### Unfinished / Broken
- [ ] **`/register` route missing** - `LoginForm` links to `/register` (404). PR #2 "Add registration flow" merged **assets only**; the registration code was never merged to `main`.
- [ ] **Login not DB-backed** - `lib/auth.ts` still uses a mock check; seeded bcrypt users (`admin@f1store.com` / `admin123`, `customer@f1store.com` / `customer123`) cannot actually log in.
- [ ] **Typecheck fails** - `prisma/seed.ts` `username` is required by the generated Prisma client but the field is absent from `schema.prisma` (schema/client drift).
- [ ] Social buttons are `alert()` stubs; "Forgot password" link is `#forgot`; store nav links (new-arrivals, teams, drivers, accessories, sale) have no pages.
- [ ] NextAuth version mismatch: package.json = **v4**, GUIDE.md documents **v5** `handlers`.

## Milestone Tracker

| Milestone | Target | Actual | Status |
|-----------|--------|--------|--------|
| Repo + Wiki initialized | 2026-08-28 | 2026-08-28 | ✅ Done |
| Auth scaffold + login UI | 2026-09-02 | 2026-09-02 | ✅ Done |
| Registration flow (incl. assets) | 2026-09-15 | 2026-09-15 (partial - assets only) | 🟡 Partial |
| Dev environment ready | 2026-09-05 | — | 🟡 In Progress |
| F1 APIs integrated (Jolpica, Live, News) | 2026-09-15 | — | ⏳ Pending |
| First deploy (staging) | 2026-09-20 | — | ⏳ Pending |
| F1 Website MVP (Schedule + News) | 2026-11-06 | — | ⏳ Pending |
| Store MVP (Catalog + Checkout) | 2027-01-01 | — | ⏳ Pending |
| Full Platform feature complete | 2027-02-26 | — | ⏳ Pending |
| Production launch | 2027-03-26 | — | ⏳ Pending |

## Current Sprint (Week of 2026-09-16)

### Goals
- [ ] Fix `prisma/seed.ts` typecheck (reconcile `username` between schema and client)
- [ ] Create `prisma/migrations/` so CI `db:migrate deploy` passes
- [ ] Build `/register` page and wire registration server action with bcrypt + DB
- [ ] Make `authorize()` query Prisma for the user (seeded creds work)
- [ ] Verify `pnpm dev`, `pnpm lint`, `pnpm typecheck`, `pnpm build`
- [ ] Merge pending `Assets` branch (team/driver images)

### Blockers
- `prisma/seed.ts` fails typecheck (schema/client drift on `username`) - blocks CI

## Velocity & Metrics

| Week | Planned Tasks | Completed | Carryover |
|------|---------------|-----------|-----------|
| 2026-W35 | 12 | 3 | 9 |
| 2026-W36-W37 | Auth scaffold + login UI | 4 | 6 |
| 2026-W38 | Registration (code) | 0 | 1 |

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

*Last updated: 2026-09-16 | Next review: 2026-09-18*