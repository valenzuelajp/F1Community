---
title: "Development Guidelines: F1Community"
aliases:
  - Development
  - Development Guidelines
tags:
  - f1-community
  - wiki
  - development
date: 2026-09-23
status: active
---

# Development Guidelines: F1 Platform (Website + Store)

## Code Style & Conventions

### TypeScript
- **Strict mode**: Always enabled (`"strict": true`)
- **Explicit types**: For function params/returns, component props
- **No `any`**: Use `unknown` or proper types; `// @ts-explain` for rare exceptions
- **Type imports**: `import type { Foo } from 'bar'`
- **Interfaces over types**: For object shapes (extendable)
- **Enums**: Avoid; use `const` objects with `as const`

```ts
// Good
interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'compact';
}

// Avoid
type ProductCardProps = {
  product: any;
  variant: string;
}
```

### React / Next.js
- **Server Components by default**: Only add `'use client'` when needed (interactivity, hooks, browser APIs)
- **Component naming**: PascalCase, descriptive (`ProductCard`, not `PC`)
- **Props destructuring**: In function signature
- **Early returns**: For guards, loading/error states
- **Colocation**: Keep components near where used

```tsx
// Good - Server Component
async function ProductGrid({ categoryId }: { categoryId: string }) {
  const products = await getProducts(categoryId);
  return <ul>{products.map(p => <ProductCard key={p.id} product={p} />)}</ul>;
}

// Client Component - only when needed
'use client';
export function AddToCartButton({ variantId }: { variantId: string }) {
  const { addItem } = useCart();
  return <button onClick={() => addItem(variantId)}>Add to Cart</button>;
}
```

### File & Folder Structure
```
src/
├── app/                              # Next.js App Router
│   ├── (f1)/                         # F1 Website route group
│   │   ├── schedule/                 # Race calendar
│   │   ├── races/[id]/               # Race detail
│   │   ├── standings/                # Driver/Constructor standings
│   │   ├── news/                     # News feed
│   │   ├── live/                     # Live timing (race weekends)
│   │   ├── teams/[id]/               # Team profiles
│   │   ├── drivers/[id]/             # Driver profiles
│   │   └── layout.tsx                # F1 layout
│   ├── (shop)/                       # F1 Store route group
│   │   ├── catalog/                  # Product listing
│   │   ├── product/[id]/             # Product detail
│   │   ├── cart/                     # Shopping cart
│   │   ├── checkout/                 # Checkout flow
│   │   ├── account/                  # User account
│   │   └── layout.tsx                # Store layout
│   ├── (admin)/                      # Admin Dashboard route group
│   │   ├── products/                 # Product management
│   │   ├── orders/                   # Order management
│   │   ├── content/                  # Content management
│   │   └── layout.tsx                # Admin layout
│   ├── api/                          # Route handlers (webhooks, external APIs)
│   │   ├── f1/                       # F1 API proxies
│   │   │   ├── schedule/             # Proxies Jolpica schedule
│   │   │   ├── live/                 # Proxies f1-live-api
│   │   │   └── news/                 # Aggregates RSS feeds
│   │   └── shop/                     # Store APIs
│   ├── actions/                      # Server Actions
│   └── globals.css
├── components/
│   ├── ui/                           # Base components (Button, Input, Card)
│   ├── f1/                           # F1 Website components
│   │   ├── schedule/                 # RaceCard, SessionTable, Countdown
│   │   ├── standings/                # StandingsTable, PointsBreakdown
│   │   ├── live/                     # LiveLeaderboard, Telemetry, RaceControl
│   │   ├── news/                     # NewsCard, NewsFeed, ArticleView
│   │   └── profiles/                 # TeamCard, DriverCard
│   ├── shop/                         # Shop-specific (ProductCard, CartDrawer)
│   ├── admin/                        # Admin-specific
│   └── layout/                       # Header, Footer, Navigation (shared)
├── lib/
│   ├── utils.ts                      # Shared utilities (cn, formatters)
│   ├── validations/                  # Zod schemas
│   ├── constants/                    # Enums, config
│   ├── hooks/                        # Custom React hooks
│   └── f1/                           # F1 API clients
│       ├── jolpica.ts                # Jolpica F1 client
│       ├── live.ts                   # f1-live-api client
│       └── news.ts                   # News aggregator (RSS + RapidAPI)
├── hooks/                            # Shared hooks (useCart, useAuth, useF1)
├── store/                            # Zustand stores (cart, f1-data)
├── types/                            # Global TypeScript types
│   ├── f1.ts                         # F1 types (Race, Circuit, Session, etc.)
│   └── shop.ts                       # Shop types (Product, Cart, Order)
├── prisma/                           # Prisma schema + extensions
└── styles/                           # Global styles, Tailwind config
```

### Naming Conventions
| Type | Convention | Example |
|------|------------|---------|
| Files (components) | PascalCase | `ProductCard.tsx`, `RaceCard.tsx` |
| Files (utils, hooks) | camelCase | `formatPrice.ts`, `useCart.ts`, `useLiveTiming.ts` |
| Folders | kebab-case | `product-card/`, `race-card/`, `api-utils/` |
| Variables/functions | camelCase | `getProductById`, `cartItems`, `fetchRaceSchedule` |
| Constants | UPPER_SNAKE_CASE | `MAX_CART_ITEMS`, `JOLPICA_BASE_URL` |
| Types/Interfaces | PascalCase | `Product`, `CartState`, `Race`, `Session` |
| Zod schemas | PascalCase + `Schema` | `ProductSchema`, `RaceScheduleSchema` |
| CSS classes | Tailwind utilities | No custom CSS unless necessary |

### Git Workflow
- **Branch naming**: `type/short-description` (e.g., `feat/f1-schedule-page`, `fix/cart-total`, `docs/readme-update`)
- **Commit messages**: Conventional Commits
  ```
  feat(f1-web): add race schedule page with Jolpica
  feat(f1-store): add product variant selector
  fix: correct cart total calculation
  docs: update API documentation
  refactor: extract cart logic to hook
  test: add unit tests for formatPrice
  ```
- **PRs**: Small, focused (<400 lines), self-reviewed before requesting review
- **Main branch**: Protected, require PR + CI pass

### Testing Standards
- **Unit tests**: Pure functions, utilities, validators, hooks (Vitest)
- **Component tests**: Interactive UI components (React Testing Library)
- **Integration tests**: Server Actions, API routes (Vitest + test DB)
- **E2E tests**: Critical user flows (Playwright)
- **Coverage**: >80% for new code; 100% for utils/validators
- **Naming**: `*.test.ts` (unit), `*.test.tsx` (component), `*.e2e.ts` (E2E)

### Performance Guidelines
- **Images**: Always use `<Image />` with `width`/`height`, `priority` for above-fold
- **Fonts**: `next/font` with `variable` for CSS custom properties
- **Scripts**: `next/script` with `strategy="lazyOnload"` for third-party
- **Bundle**: Monitor with `@next/bundle-analyzer`; keep client bundles small
- **Caching**: Use `fetch(..., { next: { revalidate: 3600 } })` for ISR
- **Database**: Select only needed fields; use `include`/`select` in Prisma
- **F1 APIs**: Aggressive caching (TanStack Query 1hr stale, ISR 3600s)
- **Live Data**: SSE only during active sessions; cleanup on unmount

### Accessibility (WCAG 2.1 AA)
- **Semantic HTML**: `<button>`, `<nav>`, `<main>`, heading hierarchy
- **Focus management**: Visible focus rings (`focus-visible:ring-2`)
- **ARIA**: Only when native HTML insufficient
- **Color contrast**: 4.5:1 normal, 3:1 large text (Tailwind `text-gray-900` on `bg-white`)
- **Keyboard**: All interactive elements reachable and operable
- **Screen readers**: `alt` text, `aria-label` for icon buttons, form labels
- **Live Regions**: `aria-live="polite"` for live timing updates

### Security
- **Never commit secrets**: Use `.env.local` (gitignored), `.env.example` for template
- **Validate all inputs**: Zod schemas on Server Actions + Route Handlers
- **Sanitize output**: React auto-escapes; be careful with `dangerouslySetInnerHTML`
- **CSP**: Configure via `next.config.js` headers
- **Rate limiting**: On auth endpoints, checkout, webhooks, F1 API proxies
- **Dependencies**: `npm audit` in CI; Dependabot alerts

### Database (Prisma)
- **Migrations**: Always create via `prisma migrate dev`; never edit generated SQL
- **Seeding**: `prisma/seed.ts` for dev data; run on `postinstall`
- **Indexes**: Add `@@index([field])` for query patterns
- **Relations**: Explicit `relation` names for clarity
- **Soft deletes**: `deletedAt` DateTime? + middleware for `findMany`
- **F1 Reference Data**: Teams, Drivers, Circuits seeded once, rarely updated

### Error Handling
- **Server Actions**: Return `{ error: string }` or `{ data: T }` (never throw)
- **Client**: Try/catch with user-friendly toasts (Sonner/React Hot Toast)
- **Logging**: Sentry for errors; structured logs for debugging
- **Boundary**: `error.tsx` per route segment; `global-error.tsx` for root
- **F1 APIs**: Graceful degradation (cached data fallback, error boundaries)

### Documentation
- **JSDoc**: For exported utilities, complex functions, Zod schemas
- **README**: Per package/folder if non-obvious
- **ADR**: For architectural decisions (see ARCHITECTURE.md)
- **Wiki**: Keep PROJECT_OVERVIEW, PROGRESS, ROADMAP, TASKS current
- **Wynn marker**: When Wynn completes progress, record what changed in the wiki and prefix/tag those notes with **`Wynn`** so other devs can see which interactions/changes came from Wynn (see `rules.md` → Progress → Wiki)

---

## F1-Specific Guidelines

### API Client Patterns
```ts
// lib/f1/jolpica.ts - Server-side client with caching
export async function getRaceSchedule(season: string = 'current') {
  const response = await fetch(`${JOLPICA_BASE_URL}/${season}/races/`, {
    next: { revalidate: 3600 }, // ISR: 1 hour
  });
  return response.json();
}

// lib/f1/live.ts - Client-side SSE hook
export function useLiveTiming(sessionKey?: string) {
  // TanStack Query with SSE subscription
  // Auto-cleanup on unmount
  // Reconnect with exponential backoff
}
```

### Timezone Handling
- All Jolpica times are UTC
- Convert to user's local timezone using `Intl.DateTimeFormat`
- Display both UTC and local for race sessions
- Store user preference in localStorage/cookies

### Team Color System
```ts
// lib/constants/teams.ts
export const TEAM_COLORS = {
  mercedes: { primary: '#00D2BE', secondary: '#000000' },
  ferrari: { primary: '#DC143C', secondary: '#FFD700' },
  // ... all 10 teams
} as const;

// Usage: CSS variables or Tailwind arbitrary values
<div className="bg-[#00D2BE] text-white" />
```

### Race Weekend Detection
- Use Jolpica to determine current/next race
- Enable live timing features only during active sessions
- Feature flag: `NEXT_PUBLIC_ENABLE_LIVE_TIMING`

### Cross-Platform Linking
- F1 Website → Store: Team/Driver profile pages link to filtered catalog
- Store → Website: Product pages link to race schedule for relevant GP
- Shared: User preferences (favorite team/driver) sync across both

---

## Tooling Configuration

### Required VS Code Extensions
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- Prisma
- TypeScript Vue Language Features (for TS)
- GitLens

### Settings (`.vscode/settings.json`)
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "tailwindCSS.includeLanguages": {
    "typescript": "typescript",
    "typescriptreact": "typescript"
  }
}
```

### Pre-commit (Husky + lint-staged)
```json
// package.json
"lint-staged": {
  "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
  "*.{json,md,css}": ["prettier --write"]
}
```

### CI Pipeline (GitHub Actions)
```yaml
# .github/workflows/ci.yml
jobs:
  lint: { runs: eslint, prettier }
  typecheck: { runs: tsc --noEmit }
  test: { runs: vitest --coverage }
  build: { runs: next build }
  e2e: { runs: playwright test }
```

---

## AI Assistant Guidelines

When working with AI on this codebase:

1. **Read the wiki first**: README → PROJECT_OVERVIEW → PROGRESS → ROADMAP → TASKS
2. **Follow ADRs**: Check ARCHITECTURE.md before proposing new patterns
3. **Match conventions**: Use existing components, hooks, utilities
4. **Update docs**: After significant changes, update relevant wiki files
5. **Test your changes**: Run lint, typecheck, tests before claiming done
6. **Small increments**: One logical change per task/commit

### Context to Provide AI
- Current sprint goal (from PROGRESS.md)
- Relevant ADRs for the area you're working on
- Existing component patterns to follow
- Any blockers or decisions needed

---

*Last updated: 2026-09-16 | Review: Monthly or on major stack changes*