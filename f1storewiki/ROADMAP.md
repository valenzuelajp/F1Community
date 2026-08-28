# Roadmap & Plans: F1 Platform (Website + Store)

## Phase Overview

```
Phase 0: Foundation (4 weeks)     → Phase 1a: F1 Schedule & Standings (3 weeks)
Phase 1b: F1 News & Live (3 weeks) → Phase 2a: Store Core Catalog (4 weeks)
Phase 2b: Cart & Checkout (4 weeks) → Phase 3: User Accounts (4 weeks)
Phase 4: Admin Dashboard (4 weeks) → Phase 5: Polish & Launch (4 weeks)
```

**Total: ~26 weeks (solo dev) | Target Launch: 2027-02-25**

---

## Phase 0: Foundation (Weeks 1-4)
**Target: 2026-09-25**

### Goals
- Production-ready development environment
- Deployed staging environment
- Core architecture decisions documented
- F1 API integrations working

### Deliverables
- [x] Next.js 14+ project with App Router
- [x] TypeScript strict mode configured
- [x] ESLint (Airbnb/Next.js) + Prettier
- [x] Husky + lint-staged pre-commit
- [x] GitHub Actions CI (lint, typecheck, test)
- [x] Vercel preview deployments
- [x] Prisma schema + PostgreSQL (Docker)
- [x] Database migrations workflow
- [x] Environment management (.env.local, .env.production)
- [x] Base UI component library (Button, Input, Card, etc.)
- [x] Design tokens (colors, spacing, typography)
- [x] Global layout (Header, Footer, Navigation)
- [x] Error boundaries & logging setup (Sentry)
- [x] Analytics + error tracking initialized (PostHog)
- [ ] **F1 API clients**: Jolpica (schedule), f1-live-api (live), News aggregator
- [ ] **Extended Prisma schema**: Race, Circuit, NewsArticle, Team, Driver, Season
- [ ] **Route groups**: `(f1)` for website, `(shop)` for store
- [ ] Shared navigation/header with dual navigation

### Technical Decisions (Mostly Made)
- [x] CSS: Tailwind CSS
- [x] State: Zustand + TanStack Query
- [x] Forms: React Hook Form + Zod
- [x] Images: Next/Image + Vercel Blob
- [x] Fonts: next/font (Inter + F1 brand font)
- [x] F1 Schedule: Jolpica (free, no auth)
- [x] F1 Live: f1-live-api (free tier)
- [x] F1 News: RSS + RapidAPI fallback

---

## Phase 1a: F1 Website - Schedule & Standings (Weeks 5-7)
**Target: 2026-10-16**

### Goals
- Complete race calendar for current + next season
- Driver & Constructor standings
- Team & Driver profile pages
- SEO-optimized, ISR-cached pages

### Features
| Feature | Description | Priority |
|---------|-------------|----------|
| Homepage (F1) | Next race countdown, standings snapshot, latest news, featured race | P0 |
| Schedule Page | Full season calendar, filter by year, circuit cards with session times | P0 |
| Race Detail | Circuit info, session schedule (local/UTC), results, weather | P0 |
| Standings | Driver & Constructor tables, historical comparison, points breakdown | P0 |
| Team Profiles | Team info, drivers, car, history, merchandise link | P1 |
| Driver Profiles | Driver bio, stats, current season, team, merchandise link | P1 |

### Technical Tasks
- [ ] Jolpica client with caching (TanStack Query, 1hr stale)
- [ ] Race/Season/Circuit Prisma models + seed data
- [ ] Schedule page (Server Component, ISR 3600s)
- [ ] Race detail page with session times timezone conversion
- [ ] Standings page with historical data
- [ ] Team/Driver profile pages
- [ ] Structured data (Event, SportsEvent JSON-LD)
- [ ] Sitemap generation for F1 routes

### Design Requirements
- [ ] F1 brand color system (team colors as CSS variables)
- [ ] Countdown timer component (next race)
- [ ] Session schedule table (practice, quali, sprint, race)
- [ ] Standing tables with responsive horizontal scroll
- [ ] Loading skeletons for all async data

---

## Phase 1b: F1 Website - News & Live (Weeks 8-10)
**Target: 2026-11-06**

### Goals
- Aggregated news feed from multiple sources
- Live timing during race weekends
- Race weekend hub page

### Features
| Feature | Description | Priority |
|---------|-------------|----------|
| News Feed | Aggregated feed (F1.com, ESPN, BBC, Sky, Autosport), categories, search | P0 |
| Article Page | Full article view, source attribution, related articles, share | P0 |
| Live Timing | Real-time leaderboard, gaps, sectors, mini-sectors, telemetry (race weekends) | P0 |
| Race Control | Messages, penalties, flags, safety car, virtual safety car | P1 |
| Weather | Track/air temp, humidity, wind, rainfall (live + forecast) | P1 |
| Team Radio | Audio clips during live sessions | P2 |
| Weekend Hub | Unified page: schedule + live + news + standings for current event | P0 |

### Technical Tasks
- [ ] RSS parser for Formula1.com, ESPN, BBC, Sky feeds
- [ ] RapidAPI client for aggregated news (fallback)
- [ ] NewsArticle Prisma model + cron job for ingestion (hourly)
- [ ] f1-live-api SSE client with React hooks
- [ ] Live timing components (leaderboard, driver timing, sectors)
- [ ] Race weekend detection (current/next race from Jolpica)
- [ ] Feature flag: live timing only during active sessions
- [ ] WebSocket/SSE connection management (reconnect, cleanup)
- [ ] Rate limiting handling (100 req/min f1-live-api)

### Design Requirements
- [ ] News card layout (image, title, source, timestamp, category)
- [ ] Live timing table (pos, driver, team, gap, interval, sectors, tire)
- [ ] Mini-sector visualization (color-coded segments)
- [ ] Race control message feed (real-time)
- [ ] "LIVE" indicator badge during active sessions
- [ ] Mobile-optimized live timing (horizontal scroll)

---

## Phase 2a: F1 Store - Core Catalog (Weeks 11-14)
**Target: 2026-12-04**

### Goals
- Browseable product catalog with filtering
- Product detail pages with variants
- Search functionality
- SEO-optimized pages

### Features
| Feature | Description | Priority |
|---------|-------------|----------|
| Homepage (Store) | Hero with current season, featured collections, latest drops | P0 |
| PLP (Listing) | Grid, infinite scroll, filters (team, driver, category, price) | P0 |
| PDP (Detail) | Gallery, variant selector, size guide, description, reviews | P0 |
| Search | Autocomplete, results page, filters, empty states | P1 |
| Collections | Curated landing pages (e.g., "2024 Season", "Team Mercedes") | P1 |
| Navigation | Mega menu with team/driver/category hierarchy | P0 |

### Technical Tasks
- [ ] Product data model (Prisma): Product, Variant, Category, Team, Driver, Image
- [ ] CMS integration for content (Contentful/Sanity)
- [ ] Server Components for catalog pages (SEO + performance)
- [ ] Client Components for interactive filters
- [ ] URL state management (nuqs or searchParams)
- [ ] Image optimization pipeline
- [ ] Sitemap.xml + robots.txt generation
- [ ] Structured data (Product, BreadcrumbList JSON-LD)

### Design Requirements
- [ ] Responsive breakpoints: 320px, 768px, 1024px, 1440px
- [ ] Team color theming system
- [ ] Loading skeletons for all async components
- [ ] Empty states for no results, no products

---

## Phase 2b: Cart & Checkout (Weeks 15-18)
**Target: 2027-01-01**

### Goals
- Persistent shopping cart
- Guest + authenticated checkout
- Payment integration (Stripe)
- Order confirmation flow

### Features
| Feature | Description | Priority |
|---------|-------------|----------|
| Mini Cart | Slide-over drawer, quantity edit, remove, subtotal | P0 |
| Cart Page | Full page, promo codes, shipping estimate, continue shopping | P0 |
| Checkout | Multi-step: Shipping → Payment → Review → Confirmation | P0 |
| Payments | Stripe Elements, Apple Pay, Google Pay, saved cards | P0 |
| Guest Checkout | Email capture, optional account creation post-purchase | P1 |
| Order Confirmation | Email + page, order number, estimated delivery | P0 |

### Technical Tasks
- [ ] Cart state: Zustand (persisted to localStorage + sync to server)
- [ ] Server Actions for cart mutations
- [ ] Stripe integration: PaymentIntent, webhooks, refunds
- [ ] Address validation (Google Places / Loqate)
- [ ] Shipping calculation (flat rate + free threshold)
- [ ] Tax calculation (Stripe Tax or TaxJar)
- [ ] Inventory reservation (hold stock during checkout)
- [ ] Idempotency keys for all mutations
- [ ] Webhook handlers: payment_intent.succeeded, order.created

### Compliance
- [ ] PCI SAQ-A compliance (Stripe Elements handles card data)
- [ ] GDPR: data export, deletion, consent
- [ ] Terms of Service + Privacy Policy pages

---

## Phase 3: User Accounts (Weeks 19-22)
**Target: 2027-01-29**

### Goals
- Authentication & authorization (shared across website + store)
- Order history & tracking
- Wishlist / saved items
- Profile management

### Features
| Feature | Description | Priority |
|---------|-------------|----------|
| Auth | Email/password, OAuth (Google, Apple), magic links | P0 |
| Account Dashboard | Orders, addresses, payment methods, preferences | P0 |
| Order History | List, detail, reorder, return initiation, tracking | P0 |
| Wishlist | Save products, share, price drop notifications | P1 |
| Address Book | CRUD, default billing/shipping, validation | P0 |
| Email Notifications | Order confirmed, shipped, delivered, password reset | P0 |
| F1 Preferences | Favorite team/driver, notification settings | P1 |

### Technical Tasks
- [ ] NextAuth.js v5 configuration
- [ ] Session management (JWT + database sessions)
- [ ] Role-based access (customer, admin)
- [ ] Protected routes (middleware)
- [ ] Account deletion (GDPR)
- [ ] Email provider (Resend / SendGrid)
- [ ] Email templates (React Email)
- [ ] Webhook: user.created → send welcome email
- [ ] Shared auth across (f1) and (shop) route groups

---

## Phase 4: Admin Dashboard (Weeks 23-26)
**Target: 2027-02-26**

### Goals
- Product & inventory management
- Order fulfillment workflow
- Analytics & reporting
- Content management (news, race previews)

### Features
| Feature | Description | Priority |
|---------|-------------|----------|
| Admin Auth | Separate admin role, 2FA enforced | P0 |
| Dashboard | Revenue, orders, conversion, low stock alerts, traffic | P0 |
| Products CRUD | Create/edit/archive, variants, images, SEO, bulk actions | P0 |
| Inventory | Stock levels, reservations, low stock thresholds, history | P0 |
| Orders | List, filter, status workflow, fulfillment, refunds | P0 |
| Collections | Create/edit landing pages, scheduling | P1 |
| Customers | View, segment, export, lifetime value | P1 |
| Reports | Sales by period, product, channel; export CSV | P1 |
| Content | News articles, race previews, team/driver bios | P1 |

### Technical Tasks
- [ ] Admin route group (Next.js route groups)
- [ ] RBAC middleware (admin only)
- [ ] Data tables with sorting, filtering, pagination (TanStack Table)
- [ ] Image upload (direct to S3/Vercel Blob)
- [ ] Bulk operations (CSV import/export)
- [ ] Audit logging for admin actions
- [ ] Feature flags for gradual rollout

---

## Phase 5: Polish & Launch (Weeks 27-30)
**Target: 2027-03-26**

### Goals
- Performance optimization
- Accessibility compliance
- Load testing
- Production launch

### Features
| Feature | Description | Priority |
|---------|-------------|----------|
| Performance | LCP < 2.5s, image optimization, font optimization, caching | P0 |
| Accessibility | WCAG 2.1 AA, keyboard nav, screen readers, color contrast | P0 |
| SEO | Meta tags, Open Graph, sitemap, structured data, canonical URLs | P0 |
| Testing | E2E critical paths, load test (k6), chaos engineering | P0 |
| Monitoring | Uptime, error rates, core web vitals, business metrics | P0 |
| Launch Checklist | DNS, SSL, CDN, rollback plan, on-call rotation | P0 |

### Post-Launch (Phase 6+)
- [ ] Loyalty program (cross-platform)
- [ ] Reviews & ratings
- [ ] Personalization (recommendations)
- [ ] International shipping / multi-currency
- [ ] Mobile app (React Native / Expo)
- [ ] B2B / wholesale portal
- [ ] Subscription products (e.g., "Season Pass" merchandise)
- [ ] Fantasy F1 integration
- [ ] Race-day flash sales (live timing + store integration)

---

## Dependencies & Risks

| Dependency | Risk | Mitigation |
|------------|------|------------|
| Official F1 assets | Licensing delays | Start legal review Week 1; use placeholders |
| Stripe account approval | 2-4 weeks | Apply Week 1; test mode for dev |
| CMS content migration | Content team bandwidth | Parallel track; markdown fallback |
| Race calendar 2025 | Fixed dates | Plan launches around calendar; feature flags |
| Jolpica API rate limits | 500 req/hr | Aggressive caching, ISR, fallback to static |
| f1-live-api availability | Free tier limits | Cache, fallback to static race data |
| News source changes | RSS feed breaks | Multiple sources, monitoring alerts |

---

## Resource Allocation (Solo Dev)

| Phase | Focus Area | Hours/Week |
|-------|------------|------------|
| 0 | Infra, tooling, architecture, F1 APIs | 15-20 |
| 1a | F1 Schedule, Standings, SSR/ISR | 15-20 |
| 1b | F1 News, Live timing, SSE | 15-20 |
| 2a | Store Catalog, SSR, components | 15-20 |
| 2b | Cart, payments, webhooks | 15-20 |
| 3 | Auth, emails, account pages | 15-20 |
| 4 | Admin, data tables, RBAC | 15-20 |
| 5 | Perf, a11y, testing, launch | 20-25 |

---

*Last updated: 2026-08-28 | Review cadence: Weekly (Sundays)*