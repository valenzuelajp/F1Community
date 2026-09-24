---
title: "Project Overview: F1Community"
aliases:
  - Project Overview
  - Overview
tags:
  - f1-community
  - wiki
  - overview
date: 2026-09-23
status: active
---

# Project Overview: F1 Platform

## Vision

Build a comprehensive **F1 Community website** combining three experiences under
**one account**: the **F1 Community** hub (schedule, news, live timing, standings),
the **F1 Store Community**, and the **F1 Official Store** — giving fans a complete
F1 digital experience.

> [!note] Three experiences, one account
> 1. **F1 Community** — schedule, standings, news, live timing (the hub)
> 2. **F1 Store Community** — community-driven store experience
> 3. **F1 Official Store** — official merchandise e-commerce
> One sign-in grants access to all three. See [[WELCOME|How the website works]].

## Core Objectives

1. **Authentic F1 Experience** - Official branding, team colors, driver collections, real-time data
2. **High Performance** - Fast load times, optimized for global CDN delivery, race-weekend scale
3. **Scalable Architecture** - Handle traffic spikes during race weekends across all three experiences
4. **Developer Experience** - Clean codebase, easy to maintain and extend
5. **Unified Platform** - Shared auth, design system, infrastructure across the hub + both stores

## Target Audience

- Formula 1 fans globally (website + store)
- Casual viewers converted during race weekends (website → store funnel)
- Collectors seeking official merchandise (store)
- Fantasy/analytics users (website live data)

## Scope

### In Scope (MVP - Combined Platform)

#### F1 Website
- Race calendar & schedule (2024, 2025 seasons)
- Live timing & telemetry (race weekends)
- Driver & Constructor standings
- Team & Driver profiles
- News aggregation (official F1, ESPN, BBC, Sky F1)

#### F1 Store
- Product catalog (teams, drivers, categories)
- Shopping cart & checkout
- User accounts & order history
- Admin dashboard for inventory management
- Responsive design (mobile-first)
- Search & filtering

### Out of Scope (Future Phases)
- Loyalty/rewards program (cross-platform)
- Live race integration with store (race-day flash sales)
- AR product visualization
- Multi-language support (beyond EN)
- Mobile app
- Fantasy F1 integration

## Core Objectives

1. **Authentic F1 Experience** - Official branding, team colors, driver collections, real-time data
2. **High Performance** - Fast load times, optimized for global CDN delivery, race-weekend scale
3. **Scalable Architecture** - Handle traffic spikes during race weekends across both properties
4. **Developer Experience** - Clean codebase, easy to maintain and extend
5. **Unified Platform** - Shared auth, design system, infrastructure across website and store

> The vision above (F1 Community hub + **Store Community** + **Official Store**)
> matches the naming in [[WELCOME|Welcome]]. Section headers still use the older
> "F1 Website / F1 Store" labels — treat them as the hub and the two store experiences.

## Technical Stack (Proposed)

| Layer | Technology | Rationale |
|-------|------------|-----------|
| Frontend | Next.js 14+ (App Router) | React ecosystem, SSR/SSG, excellent DX |
| Styling | Tailwind CSS | Utility-first, fast iteration, small bundle |
| State | Zustand + TanStack Query | Lightweight, server state management |
| Auth | NextAuth.js v4 (v5 upgrade planned) | Built for Next.js, multiple providers |
| Database | PostgreSQL (Prisma ORM) | Relational, type-safe, mature ecosystem |
| Payments | Stripe | Industry standard, global support |
| Hosting | Vercel | Native Next.js support, edge network |
| CMS | Contentful or Sanity | Headless, team-friendly content editing |
| Search | Algolia or Meilisearch | Fast, typo-tolerant product search |
| **F1 Schedule API** | **Jolpica F1 (Jolpi.ca)** | Free, no auth, Ergast-compatible, 500 req/hr |
| **F1 Live API** | **f1-live-api** | Free tier, real-time telemetry via SSE |
| **F1 News** | **RSS + RapidAPI** | Formula1.com RSS, ESPN, BBC, Sky F1 aggregation |

## Key Features

### F1 Website (Customer-Facing)
- **Homepage**: Current race countdown, latest news, standings snapshot, next race info
- **Schedule**: Full season calendar with circuit details, session times (local + UTC), results
- **Race Weekend Hub**: Live timing, session tracker, team radio, weather, race control messages
- **Standings**: Driver & Constructor tables with historical comparison
- **Teams/Drivers**: Profiles with stats, bio, current season performance, merchandise links
- **News Feed**: Aggregated from Formula1.com, ESPN F1, BBC F1, Sky F1, Autosport

### F1 Store (Customer-Facing)
- **Homepage**: Hero with current season, featured collections, latest drops
- **Catalog**: Filterable by team, driver, category, price, new arrivals
- **Product Pages**: High-res galleries, size guides, related products
- **Cart**: Persistent, mini-cart drawer, guest checkout option
- **Checkout**: Address validation, multiple payment methods, order summary
- **Account**: Order history, wishlist, addresses, notifications

### Admin-Facing (Shared)
- **Dashboard**: Sales metrics, low stock alerts, recent orders, traffic analytics
- **Products CRUD**: Variants, images, SEO, inventory tracking
- **Orders**: Status management, fulfillment, refunds
- **Collections**: Curated pages for campaigns (e.g., "Monaco GP Collection")
- **Content Management**: News articles, race previews, team/driver bios (CMS)

## Success Metrics

- **Performance**: LCP < 2.5s, CLS < 0.1, TTI < 3.5s
- **Conversion**: > 2.5% checkout completion rate
- **Availability**: 99.9% uptime during race weekends
- **DX**: < 5 min new dev onboarding, < 30s hot reload

## Constraints & Risks

| Risk | Mitigation |
|------|------------|
| Race weekend traffic spikes | Auto-scaling, edge caching, CDN |
| Official licensing requirements | Legal review, approved asset pipeline |
| International shipping complexity | Phased rollout (US/EU first) |
| Image-heavy catalog performance | Next/Image, WebP/AVIF, responsive images |

## Glossary

- **SKU**: Stock Keeping Unit (unique product variant identifier)
- **PDP**: Product Detail Page
- **PLP**: Product Listing Page
- **AOV**: Average Order Value
- **GMV**: Gross Merchandise Value

---

*Document created: 2026-08-28 | Last updated: 2026-09-16*

> **Naming note**: Project rebranded to **F1 Philippines / F1Community** (see login UI). This doc still uses "F1 Platform / F1Store" terminology; update once branding is final.