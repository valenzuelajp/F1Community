# Roadmap & Plans: F1Store

## Phase Overview

```
Phase 0: Foundation (4 weeks)     → Phase 1: Core Catalog (4 weeks)
Phase 2: Cart & Checkout (4 weeks) → Phase 3: User Accounts (4 weeks)
Phase 4: Admin Dashboard (4 weeks) → Phase 5: Polish & Launch (4 weeks)
```

---

## Phase 0: Foundation (Weeks 1-4)
**Target: 2026-09-25**

### Goals
- Production-ready development environment
- Deployed staging environment
- Core architecture decisions documented
- Team onboarding complete

### Deliverables
- [ ] Next.js 14+ project with App Router
- [ ] TypeScript strict mode configured
- [ ] ESLint (Airbnb/Next.js) + Prettier
- [ ] Husky + lint-staged pre-commit
- [ ] GitHub Actions CI (lint, typecheck, test)
- [ ] Vercel preview deployments
- [ ] Prisma schema + PostgreSQL (Docker)
- [ ] Database migrations workflow
- [ ] Environment management (.env.local, .env.production)
- [ ] Base UI component library (Button, Input, Card, etc.)
- [ ] Design tokens (colors, spacing, typography)
- [ ] Global layout (Header, Footer, Navigation)
- [ ] Error boundaries & logging setup
- [ ] Analytics + error tracking initialized

### Technical Decisions to Make
- [ ] CSS approach: Tailwind vs CSS Modules vs Styled Components
- [ ] State management: Zustand vs Redux Toolkit vs Context
- [ ] Form handling: React Hook Form + Zod
- [ ] Image optimization: Next/Image + Cloudinary/Vercel
- [ ] Font strategy: next/font (Google Fonts) vs self-hosted

---

## Phase 1: Core Catalog (Weeks 5-8)
**Target: 2026-10-25**

### Goals
- Browseable product catalog with filtering
- Product detail pages with variants
- Search functionality
- SEO-optimized pages

### Features
| Feature | Description | Priority |
|---------|-------------|----------|
| Homepage | Hero, featured collections, newsletter signup | P0 |
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

## Phase 2: Cart & Checkout (Weeks 9-12)
**Target: 2026-11-25**

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

## Phase 3: User Accounts (Weeks 13-16)
**Target: 2026-12-25**

### Goals
- Authentication & authorization
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

### Technical Tasks
- [ ] NextAuth.js v5 configuration
- [ ] Session management (JWT + database sessions)
- [ ] Role-based access (customer, admin)
- [ ] Protected routes (middleware)
- [ ] Account deletion (GDPR)
- [ ] Email provider (Resend / SendGrid)
- [ ] Email templates (React Email)
- [ ] Webhook: user.created → send welcome email

---

## Phase 4: Admin Dashboard (Weeks 17-20)
**Target: 2027-01-25**

### Goals
- Product & inventory management
- Order fulfillment workflow
- Analytics & reporting
- Content management

### Features
| Feature | Description | Priority |
|---------|-------------|----------|
| Admin Auth | Separate admin role, 2FA enforced | P0 |
| Dashboard | Revenue, orders, conversion, low stock alerts | P0 |
| Products CRUD | Create/edit/archive, variants, images, SEO, bulk actions | P0 |
| Inventory | Stock levels, reservations, low stock thresholds, history | P0 |
| Orders | List, filter, status workflow, fulfillment, refunds | P0 |
| Collections | Create/edit landing pages, scheduling | P1 |
| Customers | View, segment, export, lifetime value | P1 |
| Reports | Sales by period, product, channel; export CSV | P1 |

### Technical Tasks
- [ ] Admin route group (Next.js route groups)
- [ ] RBAC middleware (admin only)
- [ ] Data tables with sorting, filtering, pagination (TanStack Table)
- [ ] Image upload (direct to S3/Vercel Blob)
- [ ] Bulk operations (CSV import/export)
- [ ] Audit logging for admin actions
- [ ] Feature flags for gradual rollout

---

## Phase 5: Polish & Launch (Weeks 21-24)
**Target: 2027-02-25**

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
- [ ] Loyalty program
- [ ] Reviews & ratings
- [ ] Personalization (recommendations)
- [ ] International shipping / multi-currency
- [ ] Mobile app (React Native / Expo)
- [ ] B2B / wholesale portal
- [ ] Subscription products (e.g., "Season Pass" merchandise)

---

## Dependencies & Risks

| Dependency | Risk | Mitigation |
|------------|------|------------|
| Official F1 assets | Licensing delays | Start legal review Week 1; use placeholders |
| Stripe account approval | 2-4 weeks | Apply Week 1; test mode for dev |
| CMS content migration | Content team bandwidth | Parallel track; markdown fallback |
| Race calendar 2025 | Fixed dates | Plan launches around calendar; feature flags |

---

## Resource Allocation (Solo Dev)

| Phase | Focus Area | Hours/Week |
|-------|------------|------------|
| 0 | Infra, tooling, architecture | 15-20 |
| 1 | Catalog, SSR, components | 15-20 |
| 2 | Cart, payments, webhooks | 15-20 |
| 3 | Auth, emails, account pages | 15-20 |
| 4 | Admin, data tables, RBAC | 15-20 |
| 5 | Perf, a11y, testing, launch | 20-25 |

---

*Last updated: 2026-08-28 | Review cadence: Weekly (Sundays)*