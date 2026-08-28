# Project Overview: F1Store

## Vision

Build a modern, performant e-commerce website for Formula 1 merchandise, providing fans with an authentic shopping experience for official F1 team and driver merchandise.

## Core Objectives

1. **Authentic F1 Experience** - Official branding, team colors, driver collections
2. **High Performance** - Fast load times, optimized for global CDN delivery
3. **Scalable Architecture** - Handle traffic spikes during race weekends
4. **Developer Experience** - Clean codebase, easy to maintain and extend

## Target Audience

- Formula 1 fans globally
- Casual viewers converted during race weekends
- Collectors seeking official merchandise

## Scope

### In Scope (MVP)
- Product catalog (teams, drivers, categories)
- Shopping cart & checkout
- User accounts & order history
- Admin dashboard for inventory management
- Responsive design (mobile-first)
- Search & filtering

### Out of Scope (Future Phases)
- Loyalty/rewards program
- Live race integration
- AR product visualization
- Multi-language support (beyond EN)
- Mobile app

## Technical Stack (Proposed)

| Layer | Technology | Rationale |
|-------|------------|-----------|
| Frontend | Next.js 14+ (App Router) | React ecosystem, SSR/SSG, excellent DX |
| Styling | Tailwind CSS | Utility-first, fast iteration, small bundle |
| State | Zustand + TanStack Query | Lightweight, server state management |
| Auth | NextAuth.js | Built for Next.js, multiple providers |
| Database | PostgreSQL (Prisma ORM) | Relational, type-safe, mature ecosystem |
| Payments | Stripe | Industry standard, global support |
| Hosting | Vercel | Native Next.js support, edge network |
| CMS | Contentful or Sanity | Headless, team-friendly content editing |
| Search | Algolia or Meilisearch | Fast, typo-tolerant product search |

## Key Features

### Customer-Facing
- **Homepage**: Hero with current season, featured collections, latest drops
- **Catalog**: Filterable by team, driver, category, price, new arrivals
- **Product Pages**: High-res galleries, size guides, related products
- **Cart**: Persistent, mini-cart drawer, guest checkout option
- **Checkout**: Address validation, multiple payment methods, order summary
- **Account**: Order history, wishlist, addresses, notifications

### Admin-Facing
- **Dashboard**: Sales metrics, low stock alerts, recent orders
- **Products CRUD**: Variants, images, SEO, inventory tracking
- **Orders**: Status management, fulfillment, refunds
- **Collections**: Curated pages for campaigns (e.g., "Monaco GP Collection")

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

*Document created: 2026-08-28 | Last updated: 2026-08-28*