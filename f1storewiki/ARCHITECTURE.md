---
title: "Architecture Decision Records (ADR)"
aliases:
  - Architecture
  - ADR
tags:
  - f1-community
  - wiki
  - architecture
  - adr
date: 2026-09-23
status: active
---

# Architecture Decision Records (ADR): F1Store

## Format

Each ADR follows:
- **Status**: Proposed | Accepted | Deprecated | Superseded
- **Context**: What problem are we solving?
- **Decision**: What did we choose?
- **Consequences**: Trade-offs, risks, follow-up work

---

## ADR-001: Framework Choice - Next.js 14+ App Router
**Date**: 2026-08-28 | **Status**: Accepted

### Context
Need a React framework with SSR/SSG, excellent DX, and strong ecosystem for e-commerce.

### Decision
Use **Next.js 14+ with App Router** (React Server Components by default).

### Consequences
- ✅ Native RSC support reduces client bundle
- ✅ Built-in routing, image optimization, font optimization
- ✅ Vercel native deployment
- ✅ Large community, extensive documentation
- ⚠️ Learning curve for RSC patterns
- ⚠️ App Router still maturing (some bugs/limitations)
- ⚠️ Vendor lock-in to Vercel for zero-config deployment

### Alternatives Considered
- Remix: Strong but smaller ecosystem
- Astro: Great for content, weaker for complex e-commerce
- Plain React + Vite: No SSR, more setup

---

## ADR-002: Styling - Tailwind CSS
**Date**: 2026-08-28 | **Status**: Proposed

### Context
Need rapid UI development, consistent design system, small production bundle.

### Decision
Use **Tailwind CSS v3+** with Tailwind UI / Headless UI for components.

### Consequences
- ✅ Utility-first = fast iteration, no context switching
- ✅ JIT compiler = tiny production CSS (~10KB)
- ✅ Design tokens in config = consistent system
- ✅ Headless UI = accessible primitives
- ⚠️ HTML can become verbose
- ⚠️ Team must learn utilities (ramp-up time)
- ⚠️ Not ideal for highly dynamic theming (CSS vars help)

### Alternatives Considered
- CSS Modules: No design system enforcement
- Styled Components: Runtime overhead, larger bundle
- Vanilla CSS + CSS Variables: More boilerplate

---

## ADR-003: Database - PostgreSQL + Prisma ORM
**Date**: 2026-08-28 | **Status**: Accepted

### Context
Need type-safe database access, migrations, relational data for products/orders.

### Decision
**PostgreSQL** (managed via **Neon**, formerly Docker-local, with Prisma ORM). Migrations are
version-controlled in `prisma/migrations/` (baseline applied 2026-09-18).

### Consequences
- ✅ End-to-end type safety (DB → API → UI)
- ✅ Prisma Migrate = version-controlled schema
- ✅ Prisma Studio = visual DB management
- ✅ PostgreSQL = mature, JSON support, full-text search
- ✅ Neon = managed pooling, PITR backups, branch previews
- ⚠️ Prisma adds build-time dependency
- ⚠️ Cold starts with serverless (mitigate with pooler + singleton client)
- ⚠️ Env/schema drift risk — keep schema.prisma ↔ DB in sync (see DATABASE.md)

### Alternatives Considered
- Drizzle ORM: Lighter, but less mature ecosystem
- Supabase: Adds vendor lock-in, but great DX
- PlanetScale (MySQL): Branching workflow, but MySQL

---

## ADR-004: State Management - Zustand + TanStack Query
**Date**: 2026-08-28 | **Status**: Proposed

### Context
Need client state (cart, UI) + server state (products, user) management.

### Decision
- **Zustand** for client state (cart, filters, UI state)
- **TanStack Query (React Query)** for server state (fetching, caching, mutations)

### Consequences
- ✅ Zustand: Tiny (~1KB), simple API, TypeScript-first
- ✅ TanStack Query: Best-in-class server state, deduping, retries
- ✅ Clear separation: client vs server state
- ✅ Both work with RSC (client components only)
- ⚠️ Two libraries to learn
- ⚠️ Zustand persistence needs custom middleware

### Alternatives Considered
- Redux Toolkit: Overkill, boilerplate
- Context + useReducer: No caching, re-render issues
- Jotai/Recoil: Atomic model, less familiar

---

## ADR-005: Authentication - NextAuth.js v4 (v5/Auth.js on roadmap)
**Date**: 2026-08-28 | **Status**: Superseded (implementation used v4)

### Context
Need auth for customers + admins, multiple providers, session management.

### Decision
**NextAuth.js v4** with credentials + OAuth providers (installed `next-auth@^4.24.15`). Upgrade to **v5 (Auth.js)** remains a planned follow-up; the original v5 ADR is archived below.

> Superseded note (2026-09-16): production code on `main` implements NextAuth.js **v4** (`authOptions` + `NextAuth(authOptions)` route handler). See TASKS.md for the v5 upgrade item. The v5 proposal text is preserved here for reference.
>
> Update (2026-09-18): `authorize()` is now **DB-backed** — Prisma user lookup
> (`src/lib/db.ts` singleton) + `bcrypt.compare` against `passwordHash`. Registration
> server action lives in `src/app/actions/auth.ts`. The v4 docs in `GUIDE.md` match
> the shipped code.

### Consequences
- ✅ Built for Next.js (works with App Router route handler pattern)
- ✅ Multiple providers (Google, Apple, Email, Credentials)
- ✅ JWT sessions + callback hooks
- ✅ DB-backed `authorize()` (Prisma + bcrypt, verified 2026-09-18)
- ✅ Registration server action (`src/app/actions/auth.ts`) with unique-aware error handling
- ⚠️ v4 API differs from v5 (`handlers`, `auth()` middleware) - docs updated to match v4
- ⚠️ OAuth providers still stubs; password reset flow pending

### Alternatives Considered
- Clerk: Great DX, but paid at scale
- Lucia: Lightweight, but more manual setup
- Custom JWT: Reinventing the wheel

---

## ADR-006: Payments - Stripe
**Date**: 2026-08-28 | **Status**: Accepted

### Context
Need global payments, subscriptions (future), PCI compliance.

### Decision
**Stripe** with PaymentElement, Stripe Checkout, or Elements.

### Consequences
- ✅ Industry standard, global coverage
- ✅ PCI SAQ-A (Elements handles card data)
- ✅ Subscriptions, Connect, Billing for future
- ✅ Excellent docs, test mode, webhooks
- ⚠️ Fees (2.9% + 30¢ US)
- ⚠️ Account approval can take weeks
- ⚠️ Webhook handling complexity

### Alternatives Considered
- Braintree: Similar, less developer-friendly
- Adyen: Enterprise-focused
- Square: US-centric

---

## ADR-007: CMS - Contentful (or Sanity)
**Date**: 2026-08-28 | **Status**: Proposed

### Context
Marketing/content team needs to manage homepage, collections, banners without code.

### Decision
**Contentful** (or Sanity as alternative) for headless content.

### Consequences
- ✅ Content team independence
- ✅ Structured content modeling
- ✅ Preview/deployment workflows
- ✅ GraphQL/REST APIs
- ⚠️ Cost at scale
- ⚠️ Additional integration complexity
- ⚠️ Content modeling upfront work

### Alternatives Considered
- Sanity: Real-time, customizable studio, self-hosted option
- WordPress Headless: Familiar, but PHP baggage
- Markdown files in repo: Dev-only, no content team access

---

## ADR-008: Search - Algolia (or Meilisearch)
**Date**: 2026-08-28 | **Status**: Proposed

### Context
Fast, typo-tolerant product search with faceting.

### Decision
**Algolia** (managed) or **Meilisearch** (self-hosted) for product search.

### Consequences
- ✅ Algolia: Managed, instant search, analytics, merchandising
- ✅ Meilisearch: Open-source, self-hosted, Meilisearch Cloud
- ⚠️ Algolia: Cost scales with records/operations
- ⚠️ Meilisearch: Operational overhead (if self-hosted)

### Alternatives Considered
- PostgreSQL full-text: Basic, no typo tolerance
- Typesense: Similar to Meilisearch, less mature
- Elasticsearch: Overkill, complex

---

## ADR-009: Hosting - Vercel
**Date**: 2026-08-28 | **Status**: Accepted

### Context
Need zero-config Next.js deployment, edge network, preview deployments.

### Decision
**Vercel** for hosting (staging + production).

### Consequences
- ✅ Native Next.js support (App Router, ISR, Edge)
- ✅ Automatic preview deployments per PR
- ✅ Edge Functions, Image Optimization, Analytics
- ✅ Git integration, rollback, env management
- ⚠️ Vendor lock-in
- ⚠️ Pricing at high scale
- ⚠️ Function duration limits (60s hobby, 800s pro)

### Alternatives Considered
- AWS Amplify / ECS: More control, more ops
- Netlify: Good Next.js support, but Vercel is first-party
- Docker + Kubernetes: Full control, high ops burden

---

## ADR-010: Monorepo vs Polyrepo
**Date**: 2026-08-28 | **Status**: Proposed

### Context
Single developer now, but may scale. Wiki separate from code.

### Decision
**Polyrepo**: Separate repos for `F1Store` (app) and `f1storewiki` (docs).

### Consequences
- ✅ Clear separation of concerns
- ✅ Independent deployment pipelines
- ✅ Wiki can be public while app is private
- ⚠️ Cross-repo references need manual sync
- ⚠️ Shared tooling/config duplication

### Alternatives Considered
- Monorepo (Turborepo/Nx): Shared packages, atomic commits
- Single repo with `/wiki` folder: Simpler, but mixed concerns

---

## ADR-011: Testing Strategy
**Date**: 2026-08-28 | **Status**: Proposed

### Context
Need confidence in changes, prevent regressions, CI integration.

### Decision
- **Vitest** for unit/integration tests (fast, Vite-native)
- **Playwright** for E2E tests (cross-browser, reliable)
- **React Testing Library** for component tests
- Target: >80% coverage for new code

### Consequences
- ✅ Vitest: Fast, TypeScript, Jest-compatible API
- ✅ Playwright: Best E2E DX, auto-waiting, traces
- ✅ RTL: Encourages testing behavior, not implementation
- ⚠️ Three tools to maintain
- ⚠️ E2E tests slow in CI (parallelize)

### Alternatives Considered
- Jest: Slower, configuration overhead
- Cypress: Good but Playwright has better multi-browser
- Storybook test runner: Component-only

---

## ADR-012: API Pattern - Server Actions + Route Handlers
**Date**: 2026-08-28 | **Status**: Proposed

### Context
Next.js App Router offers multiple data fetching/mutation patterns.

### Decision
- **Server Actions** for mutations (forms, cart, checkout)
- **Route Handlers** for webhooks, APIs consumed externally
- **Server Components** for data fetching (direct DB access)

### Consequences
- ✅ Server Actions: Progressive enhancement, no API layer
- ✅ Direct DB in Server Components: No over-fetching
- ✅ Route Handlers: Standard Web Request/Response API
- ⚠️ Server Actions: Client component boundary needed
- ⚠️ No generated OpenAPI from Server Actions (manual)

### Alternatives Considered
- tRPC: End-to-end types, but extra layer
- REST API (Route Handlers only): More boilerplate
- GraphQL: Overkill for single frontend

---

## ADR-013: F1 Schedule API - Jolpica (Jolpi.ca)
**Date**: 2026-08-28 | **Status**: Accepted

### Context
Need Formula 1 race calendar, session times, results, and standings data for the F1 Website.

### Decision
Use **Jolpica F1 API** (`https://api.jolpi.ca/ergast/f1/`) - the successor to Ergast API.

### Consequences
- ✅ Free, no authentication required
- ✅ Ergast-compatible endpoints (drop-in replacement)
- ✅ Comprehensive data: seasons, races, circuits, drivers, constructors, standings, results
- ✅ Rate limit: 500 requests/hour (sufficient with caching)
- ✅ CORS enabled, JSON responses
- ⚠️ Rate limit requires caching strategy (ISR + TanStack Query)
- ⚠️ Community-run (not official F1), but reliable successor
- ⚠️ No live timing data (only historical/schedule)

### Alternatives Considered
- Ergast API: Deprecated/shut down end of 2024
- Sportradar F1 API: Comprehensive but paid ($500+/month), requires contract
- Official F1 API: Not publicly documented, requires partnership
- FastF1 (Python): Server-side only, not suitable for web frontend

---

## ADR-014: F1 Live Timing API - f1-live-api
**Date**: 2026-08-28 | **Status**: Proposed

### Context
Need real-time telemetry, leaderboard, sectors, mini-sectors, weather, race control messages during race weekends.

### Decision
Use **f1-live-api** (`https://f1-live-api.onrender.com`) - connects directly to F1's SignalR WebSocket feed.

### Consequences
- ✅ Free tier available (100 req/min, 10 SSE connections/min)
- ✅ Real-time data: timing, telemetry, track status, race control, team radio
- ✅ SSE (Server-Sent Events) for live updates (~3.7 Hz)
- ✅ Historical archive access (every session back to 2018)
- ✅ No authentication required for free tier
- ✅ Auto-documentation at `/` and `/docs`
- ⚠️ Free tier rate limits (100 req/min)
- ⚠️ Community project (not official), but connects to official F1 feed
- ⚠️ Only works during live sessions for real-time data
- ⚠️ Requires SSE connection management (reconnect, cleanup)

### Alternatives Considered
- Official F1 TV / F1 API: Requires F1 TV Pro subscription (~$80/year), complex auth
- OpenF1: Similar to f1-live-api, but less maintained
- Sportradar Live: Paid, enterprise only
- Custom SignalR client: High effort, maintenance burden

---

## ADR-015: F1 News Aggregation - RSS + RapidAPI
**Date**: 2026-08-28 | **Status**: Proposed

### Context
Need latest F1 news from multiple sources (official, major publishers) for news feed.

### Decision
Dual-source approach:
1. **Primary**: RSS feeds from Formula1.com, ESPN F1, BBC F1, Sky Sports F1
2. **Fallback/Enhancement**: RapidAPI "F1 Latest News" (aggregates 5+ sources)

### Consequences
- ✅ RSS: Free, no rate limits, standard format, reliable
- ✅ Multiple sources = redundancy if one feed breaks
- ✅ RapidAPI: Single endpoint for aggregated news, free tier
- ✅ Can implement cron job for hourly ingestion
- ⚠️ RSS parsing requires handling different feed formats
- ⚠️ RapidAPI free tier has limits (100 req/month on free)
- ⚠️ No official F1 news API (Formula1.com doesn't publish one)
- ⚠️ Content scraping may violate ToS (RSS is intended for syndication)

### Alternatives Considered
- Formula1.com official API: Not publicly available
- Single RSS source: Risk of feed changes/breakage
- Custom scrapers: High maintenance, legal risk
- NewsAPI.org: General news, not F1-specific, paid tiers

---

## ADR-016: Route Groups - Dual Platform Structure
**Date**: 2026-08-28 | **Status**: Proposed

### Context
Single Next.js app serving both F1 Website (content-heavy, SSR/ISR) and F1 Store (e-commerce, interactive).

### Decision
Use Next.js Route Groups:
- `src/app/(f1)/` - F1 Website (schedule, news, live, standings)
- `src/app/(shop)/` - F1 Store (catalog, cart, checkout, account)
- `src/app/(admin)/` - Admin Dashboard (shared)
- Shared components, auth, layout at root level

### Consequences
- ✅ Clear separation of concerns
- ✅ Shared authentication, design system, utilities
- ✅ Independent layouts per group
- ✅ Single deployment, shared infrastructure
- ✅ Easy cross-linking (website → store for merch)
- ⚠️ Shared bundle size (mitigate with dynamic imports)
- ⚠️ Route group naming affects URL structure (no prefix)

### Alternatives Considered
- Separate Next.js apps: Duplicate infra, auth, components
- Single app with path prefixes: Less clean separation
- Monorepo with shared packages: Overhead for solo dev

---

## Decision Log

| ADR | Title | Status | Date |
|-----|-------|--------|------|
| 001 | Next.js 14+ App Router | Accepted | 2026-08-28 |
| 002 | Tailwind CSS | Proposed | 2026-08-28 |
| 003 | PostgreSQL + Prisma (Neon) | Accepted | 2026-08-28 |
| 004 | Zustand + TanStack Query | Proposed | 2026-08-28 |
| 005 | NextAuth.js v4 (v5 upgrade planned) | Superseded | 2026-08-28 |
| 006 | Stripe Payments | Accepted | 2026-08-28 |
| 007 | Contentful/Sanity CMS | Proposed | 2026-08-28 |
| 008 | Algolia/Meilisearch Search | Proposed | 2026-08-28 |
| 009 | Vercel Hosting | Accepted | 2026-08-28 |
| 010 | Polyrepo Structure | Proposed | 2026-08-28 |
| 011 | Vitest + Playwright Testing | Proposed | 2026-08-28 |
| 012 | Server Actions + Route Handlers | Proposed | 2026-08-28 |
| 013 | F1 Schedule API - Jolpica | Accepted | 2026-08-28 |
| 014 | F1 Live Timing API - f1-live-api | Proposed | 2026-08-28 |
| 015 | F1 News Aggregation - RSS + RapidAPI | Proposed | 2026-08-28 |
| 016 | Route Groups - Dual Platform | Proposed | 2026-08-28 |

---

*Template for new ADRs:*
```markdown
## ADR-XXX: [Title]
**Date**: YYYY-MM-DD | **Status**: Proposed

### Context
[What problem are we solving?]

### Decision
[What did we choose?]

### Consequences
- ✅ [Benefits]
- ⚠️ [Trade-offs/risks]

### Alternatives Considered
- [Option 1]: [Why not chosen]
- [Option 2]: [Why not chosen]
```