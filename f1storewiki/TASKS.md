# Task Board: F1 Platform (Website + Store)

## Task Management System

This board tracks all actionable work. Tasks flow: **Backlog → Ready → In Progress → Review → Done**

### Labels
- `P0` - Critical path / blocker
- `P1` - High priority
- `P2` - Medium priority
- `P3` - Nice to have
- `bug` - Defect
- `tech-debt` - Refactoring/maintenance
- `docs` - Documentation
- `f1-web` - F1 Website feature
- `f1-store` - F1 Store feature

---

## Current Sprint: Auth Completion + Foundation Cleanup (Week of 2026-09-16)

### In Progress
| Task | Label | Assignee | Notes |
|------|-------|----------|-------|
| Fix `prisma/seed.ts` typecheck (`username` drift schema vs client) | P0, bug | — | CI-blocking |
| Create `prisma/migrations/` folder (CI runs `db:migrate deploy`) | P0 | — | First migration needed |
| Build `/register` page + registration server action (bcrypt + DB) | P0, f1-store | — | Link exists in LoginForm; page missing (404) |
| Wire NextAuth `authorize()` to Prisma user lookup | P0, f1-store | — | Replace mock check; seeded creds must work |

### Ready (Next Up)
| Task | Label | Dependencies | Estimate |
|------|-------|--------------|----------|
| Merge `Assets` branch (team/driver/track images) into main | P1 | Auth done | 30m |
| Global layout (Header, Footer, Nav) w/ real routes | P1 | UI components | 3h |
| Build base UI components (Button, Input, Card) | P1 | Tailwind configured | 4h |
| Create route groups `(f1)` + `(shop)` | P0, f1-web | — | 1h |
| F1 API clients (Jolpica, live, news) | P0, f1-web | Route groups | 3h |
| Set up error tracking (Sentry) | P2 | Vercel deployed | 1h |
| Configure analytics (PostHog) | P2 | Vercel deployed | 1h |

---

## Backlog - Phase 0: Foundation (Extended for F1 Platform)

| Task | Label | Estimate | Notes |
|------|-------|----------|-------|
| Design system tokens (colors, spacing, typography) | P1 | 3h | Figma → Tailwind config |
| Set up Storybook | P2 | 2h | Document UI components |
| Configure testing (Vitest + Playwright) | P2 | 3h | Unit + E2E |
| ✔ Create `.env.example` with all required vars | P1 | 30m | Done - committed |
| Set up database migration workflow | P1 | 1h | `prisma migrate dev` + seeding (*migrations/ folder missing*) |
| API contract (OpenAPI/Swagger) | P2 | 2h | For future mobile/integrations |
| Configure font optimization (next/font) | P1 | 30m | Inter + F1 brand font |
| Set up image optimization pipeline | P1 | 1h | Vercel Blob / Cloudinary |
| **Create F1 API client: Jolpica (schedule/standings)** | P0, f1-web | 3h | `src/lib/f1/jolpica.ts` |
| **Create F1 API client: f1-live-api (live timing)** | P0, f1-web | 3h | `src/lib/f1/live.ts` |
| **Create F1 API client: News aggregator (RSS + RapidAPI)** | P1, f1-web | 4h | `src/lib/f1/news.ts` |
| **Extend Prisma schema with F1 models** | P0, f1-web | 3h | Race, Circuit, NewsArticle, Season, Session |
| **Create route groups: (f1) and (shop)** | P0, f1-web | 1h | `src/app/(f1)/`, `src/app/(shop)/` |
| **Create shared navigation with dual nav** | P1, f1-web | 2h | Header with Website/Store toggle |
| **Seed F1 reference data (teams, drivers, circuits)** | P1, f1-web | 2h | 2024/2025 season data |

## Backlog - Auth / Registration (Pulled forward from Phase 3)

| Task | Label | Estimate | Notes |
|------|-------|----------|-------|
| ~~Add `username` to User model OR remove from client~~ | P0, bug | 1h | Fix seed typecheck drift |
| **Build `/register` page (shared auth layout)** | P0 | 3h | PR #2 only merged assets - code missing |
| Registration server action (Zod + bcrypt + unique username) | P0 | 2h | `src/app/actions/auth.ts` |
| NextAuth `authorize()` → Prisma user lookup (bcrypt compare) | P0 | 2h | Replace mock in `src/lib/auth.ts` |
| Connect OAuth providers (Google, Apple) | P1 | 2h | Replace `SocialAuth` stubs |
| Forgot-password / reset flow | P1 | 3h | `#forgot` link is a placeholder |
| Demo user docs + auto-fill parity with seeded bcrypt users | P1 | 1h | LoginForm quick-fill uses `driver@f1-philippines.com` |

---

## Backlog - Phase 1a: F1 Website - Schedule & Standings

| Task | Label | Estimate | Dependencies |
|------|-------|----------|--------------|
| Build F1 Homepage (next race countdown, standings, news) | P0, f1-web | 4h | Jolpica client, News client |
| Build Schedule Page (season calendar, filter by year) | P0, f1-web | 4h | Jolpica client, ISR |
| Build Race Detail Page (circuit, sessions, results, weather) | P0, f1-web | 5h | Jolpica client, timezone |
| Build Standings Page (Driver + Constructor tables) | P0, f1-web | 4h | Jolpica client, historical |
| Build Team Profile Pages (info, drivers, car, merch link) | P1, f1-web | 3h | Team data, Store link |
| Build Driver Profile Pages (bio, stats, season, merch link) | P1, f1-web | 3h | Driver data, Store link |
| Add structured data (Event, SportsEvent JSON-LD) | P1, f1-web | 2h | Schedule, Race pages |
| Generate sitemap for F1 routes | P1, f1-web | 1h | Next.js sitemap |
| Implement team color theming system (CSS variables) | P1, f1-web | 2h | Tailwind config |
| Create countdown timer component (next race) | P1, f1-web | 1h | Jolpica next race |
| Create session schedule table component | P1, f1-web | 2h | Race detail |
| Create responsive standings table component | P1, f1-web | 2h | Standings page |

---

## Backlog - Phase 1b: F1 Website - News & Live

| Task | Label | Estimate | Dependencies |
|------|-------|----------|--------------|
| RSS parser for Formula1.com, ESPN, BBC, Sky feeds | P0, f1-web | 3h | News client |
| RapidAPI client for aggregated news (fallback) | P1, f1-web | 2h | RapidAPI key |
| NewsArticle Prisma model + cron job (hourly ingestion) | P0, f1-web | 3h | Prisma, cron |
| Build News Feed Page (aggregated, categories, search) | P0, f1-web | 4h | News data, UI |
| Build Article Detail Page (full view, source, related) | P0, f1-web | 3h | News data |
| f1-live-api SSE client with React hooks | P0, f1-web | 4h | Live client |
| Build Live Timing Page (leaderboard, gaps, sectors, telemetry) | P0, f1-web | 5h | SSE client, race detection |
| Build Race Control Messages feed (penalties, flags) | P1, f1-web | 3h | Live client |
| Build Weather component (track/air temp, humidity, wind) | P1, f1-web | 2h | Live client |
| Build Team Radio audio player (live sessions) | P2, f1-web | 3h | Live client |
| Build Weekend Hub page (schedule + live + news + standings) | P0, f1-web | 4h | All F1 data |
| Feature flag: live timing only during active sessions | P1, f1-web | 1h | Race detection |
| SSE connection management (reconnect, cleanup) | P1, f1-web | 2h | Live client |
| Rate limiting handling (100 req/min f1-live-api) | P1, f1-web | 1h | Live client |

---

## Backlog - Phase 2a: F1 Store - Core Catalog

| Task | Label | Estimate | Dependencies |
|------|-------|----------|--------------|
| Design Product/Category/Team/Driver Prisma models | P0, f1-store | 2h | — |
| Seed database with sample F1 data | P1, f1-store | 2h | Models done |
| Build Product Listing Page (PLP) with Server Components | P0, f1-store | 4h | Models, UI components |
| Implement filter sidebar (team, driver, category, price) | P0, f1-store | 3h | PLP, URL state |
| Build Product Detail Page (PDP) with variant selector | P0, f1-store | 4h | Models, images |
| Implement image gallery with zoom/thumbnails | P1, f1-store | 3h | PDP |
| Add structured data (Product, BreadcrumbList JSON-LD) | P1, f1-store | 2h | PLP, PDP |
| Build homepage with hero + featured collections | P1, f1-store | 3h | CMS/content |
| Implement search (Algolia/Meilisearch integration) | P1, f1-store | 4h | Product data indexed |
| Create collection landing pages | P2, f1-store | 3h | CMS, routing |
| Mega menu navigation component | P1, f1-store | 3h | Team/Driver taxonomy |

---

## Backlog - Phase 2b: Cart & Checkout

| Task | Label | Estimate | Dependencies |
|------|-------|----------|--------------|
| Cart state management (Zustand + localStorage) | P0, f1-store | 2h | — |
| Mini cart slide-over drawer | P0, f1-store | 3h | Cart state |
| Cart page with promo code support | P0, f1-store | 3h | Cart state |
| Stripe integration setup | P0, f1-store | 2h | Stripe account |
| Checkout flow: Shipping → Payment → Review | P0, f1-store | 6h | Cart, Stripe |
| Stripe PaymentElement + Apple/Google Pay | P0, f1-store | 3h | Stripe |
| Webhook handlers for payment events | P0, f1-store | 2h | Stripe CLI tunneling |
| Order confirmation page + email | P0, f1-store | 2h | Webhooks |
| Guest checkout + post-purchase account creation | P1, f1-store | 3h | Auth (Phase 3) |
| Address validation autocomplete | P1, f1-store | 2h | Google Places API |
| Shipping calculation logic | P1, f1-store | 2h | Business rules |
| Inventory reservation during checkout | P2, f1-store | 3h | Prisma transactions |

---

## Backlog - Phase 3: User Accounts (Shared)

| Task | Label | Estimate | Dependencies |
|------|-------|----------|--------------|
| NextAuth.js v5 configuration | P0 | 3h | — |
| OAuth providers (Google, Apple) | P1 | 2h | Credentials |
| Protected routes middleware | P0 | 1h | NextAuth |
| Account dashboard layout | P1 | 2h | Auth |
| Order history page with tracking | P1 | 3h | Orders API |
| Wishlist feature (save/remove/share) | P2 | 3h | Auth, Products |
| Address book CRUD | P1 | 2h | Auth |
| Email templates (React Email) | P1 | 3h | Resend/SendGrid |
| Email triggers (order, shipping, password reset) | P1 | 2h | Webhooks |
| Account deletion (GDPR) | P2 | 2h | Auth |
| F1 Preferences (favorite team/driver, notifications) | P1, f1-web | 2h | Auth, Profile |

---

## Backlog - Phase 4: Admin Dashboard (Shared)

| Task | Label | Estimate | Dependencies |
|------|-------|----------|--------------|
| Admin route group + RBAC middleware | P0 | 2h | Auth |
| Admin dashboard with metrics cards | P1 | 3h | Analytics |
| Products CRUD with TanStack Table | P0 | 5h | Admin routes |
| Variant management inline | P1 | 3h | Products CRUD |
| Image upload to Vercel Blob/S3 | P1 | 2h | Products CRUD |
| Orders management (status workflow) | P0 | 4h | Orders API |
| Inventory management + low stock alerts | P1 | 3h | Products |
| Collections/page builder | P2 | 4h | CMS |
| Customer management + segmentation | P2 | 3h | Auth, Orders |
| Reports + CSV export | P2 | 3h | Analytics |
| Audit logging for admin actions | P2 | 2h | All admin |
| Content management (news, race previews, bios) | P1, f1-web | 3h | CMS |

---

## Backlog - Phase 5: Polish & Launch

| Task | Label | Estimate | Dependencies |
|------|-------|----------|--------------|
| Performance audit + optimization | P0 | 8h | All features |
| WCAG 2.1 AA accessibility audit | P0 | 6h | All UI |
| SEO audit (meta, OG, sitemap, structured data) | P0 | 4h | All pages |
| E2E test critical paths (Playwright) | P0 | 4h | Features done |
| Load testing (k6) | P0 | 3h | Staging deployed |
| Monitoring dashboards (Vercel, Sentry, PostHog) | P0 | 2h | All integrated |
| Launch checklist + runbook | P0 | 2h | — |
| DNS + SSL + CDN configuration | P0 | 1h | Domain acquired |
| Rollback plan documented | P1 | 1h | CI/CD |

---

## Completed Tasks

| Task | Completed | Notes |
|------|-----------|-------|
| Create wiki structure (README, OVERVIEW, PROGRESS, ROADMAP, TASKS, ARCHITECTURE, DEVELOPMENT) | 2026-08-28 | Foundation for project tracking |
| Update PROJECT_OVERVIEW with F1 Website scope | 2026-08-28 | Dual platform vision |
| Update ROADMAP with phased F1 + Store plan | 2026-08-28 | 26-week roadmap |
| Create F1_API_REFERENCE with all API endpoints and recommendations | 2026-08-28 | Jolpica, f1-live-api, RSS, RapidAPI documented |
| F1-branded auth flow + login UI (NextAuth v4, Zod, `/login`) | 2026-09-02 | PR #1 - full login experience |
| Prisma schema expanded for auth + store relations | 2026-09-02 | User/Account/Session + cart/order/collection linkage |
| Seeded bcrypt demo users (admin + customer) | 2026-09-02 | `prisma/seed.ts` |
| GitHub Actions CI pipeline | 2026-09-02 | lint, typecheck, test, build, e2e, Vercel deploy |
| Docker Compose for PostgreSQL | 2026-09-02 | `docker-compose.yml` |
| Figma design references exported (auth/store/account/schedules/admin) | 2026-09-15 | `assets/figma/` |
| Team/driver/track image assets prepared | 2026-09-15 | `Assets` branch - **not yet merged to main** |
| Login visual pass + current repository file tree documentation | 2026-09-16 | `/login` uses `imgSticker1.png`; see `FILE_TREE.md` |

---

## Task Template

When adding new tasks, use this format:

```markdown
| Task Name | Label | Estimate | Dependencies | Notes |
|-----------|-------|----------|--------------|-------|
| [Description] | P0/P1/P2/P3 | Xh | [Task IDs] | [Context] |
```

---

*Last updated: 2026-09-16 | Sprint review: Weekly (Sundays)*