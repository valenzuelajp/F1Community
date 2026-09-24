---
title: "SEO Plan & Strategy"
aliases:
  - SEO
  - Search Engine Optimization
tags:
  - f1-community
  - wiki
  - seo
date: 2026-09-23
status: active
---

# 🔍 SEO Plan & Strategy

> [!info] What this doc covers
> How F1Community shows up in search engines: current state, route-by-route
> metadata strategy, robots/sitemap, Open Graph/Twitter cards, and a checklist of
> what's missing today.

[[WELCOME|🏁 Welcome]] · [[README|📚 Wiki Index]] · [[GAPS|Gaps & Missing Work]]

---

## 1. Why SEO matters for this project

The site's entry point is `/login` (the landing route). Visitors arrive via search,
social shares, and direct links. Without basic SEO metadata and crawler support:

- 🚫 Social shares (Twitter/Facebook) render as bare links, no card preview
- 🚫 Search engines get generic titles and no sitemap to discover routes
- 🚫 `metadataBase` falls back to `localhost` → OG/URL resolution breaks in prod

The good news: the **base metadata is already wired** in `src/app/layout.tsx`
(title template, description, keywords, Open Graph, Twitter card, robots). What's
missing is the **supporting files and per-route polish**.

## 2. Current state (audited 2026-09-23)

### ✅ Already in place

| Item                        | Where                                                        |
| :-------------------------- | :----------------------------------------------------------- |
| Root metadata               | `src/app/layout.tsx` — title template, description, keywords, OG, Twitter, `robots: index, follow` |
| Per-route `metadata`        | `login`, `register`, `home` pages export their own `Metadata` |
| Fonts (next/font)           | Inter + Anton, `display: swap`                               |
| Image optimization          | `next/image` everywhere                                      |

### ❌ Missing / broken

| Item                            | Detail                                                                                           |
| :------------------------------ | :----------------------------------------------------------------------------------------------- |
| `app/robots.ts`                 | **Does not exist** — no `robots.txt` generated at all                                             |
| `app/sitemap.ts`                | **Does not exist** — crawlers must guess routes                                                   |
| `og-image.png` (1200×630)       | Referenced in `layout.tsx` metadata but **absent from `public/`** → broken OG card                |
| `favicon.ico` / `icon.svg`      | Referenced in app but **absent from `public/`**                                                   |
| `apple-touch-icon.png`          | Referenced but **absent**                                                                         |
| `manifest.json`                 | Referenced but **absent**                                                                         |
| `metadataBase`                  | Uses `NEXTAUTH_URL` (defaults to `http://localhost:3000`) → wrong in prod until set               |
| Canonical URLs / `alternates`   | **None** anywhere                                                                                 |
| Generic page titles             | `/home` title is literally `"Home"`; `/login` is just `"Login"`                                   |
| Structured data (JSON-LD)       | **None** (planned in ROADMAP Phase 1a: Event / SportsEvent)                                        |

## 3. Route-by-route metadata strategy

> [!note] Site structure
> F1Community hosts **three experiences** under one Next.js app — **F1 Community**
> (the hub: schedule, standings, news, live), **F1 Store Community**, and
> **F1 Official Store** — all share a single account. Route metadata below covers
> the live surface today; store routes join as phases 2a/2b ship.

| Route      | Title pattern                                        | Description suggestion                                                      | Index? |
| :--------- | :--------------------------------------------------- | :-------------------------------------------------------------------------- | :----- |
| `/`        | `F1Community — Official F1 Merchandise & Community`  | Formula 1 community hub: schedule, standings, official team merch.          | yes    |
| `/login`   | `Login — F1Community`                                | Sign in for live timing, race predictions & team updates.                   | yes    |
| `/register`| `Create Account — F1Community`                      | Join the grid — race predictions, live standings, team gear.                | yes    |
| `/home`    | `Home — F1Community` (or `My Hub`)                   | Member home: your F1 space.                                                 | noindex (gated) |

> [!tip] Title convention
> Tie into the existing template `%s | F1Store` in `layout.tsx` so pages render as
> `Login | F1Store`. Decide whether to keep the "F1Store" brand or switch the
> template to "F1Community" for consistency with the repo rename.

## 4. Robots, sitemap & canonical (the plan)

### `src/app/robots.ts`
```ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXTAUTH_URL ?? "https://f1community.com";
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/auth/"] },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
```

### `src/app/sitemap.ts`
```ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXTAUTH_URL ?? "https://f1community.com";
  const routes = ["", "/login", "/register"]; // extend as pages ship
  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}
```

### Canonical & metadataBase
- Add `export const metadata = { alternates: { canonical: "/" } }` (or the route's
  path) on each page.
- Set `NEXTAUTH_URL` to the real production URL so `metadataBase` resolves OG and
  canonical URLs correctly instead of `localhost`.
- Use `trailingSlash: false` consistently (default).

## 5. Open Graph / Twitter cards

The metadata in `layout.tsx` already defines both cards — they just need real assets:

| Asset                        | Size      | Notes                                            |
| :--------------------------- | :-------- | :----------------------------------------------- |
| `public/og-image.png`        | 1200×630  | Brand-red gradient + F1 logo + tagline           |
| `public/icon.svg` (favicon)  | 32×32+    | F1-style mark; also `favicon.ico` for older browsers |
| `public/apple-touch-icon.png`| 180×180   | iOS home-screen icon                             |

> [!warning] Verify after adding assets
> Run `pnpm build && pnpm start`, then check
> `/sitemap.xml`, `/robots.txt`, and the LinkedIn/Facebook/Twitter card validators.

## 6. Structured data (future, Phase 1a+)

- Races: `SportsEvent` / `Event` JSON-LD (dates, circuit, location)
- Products: `Product` + `BreadcrumbList` JSON-LD (Phase 2a)
- Articles: `NewsArticle` (Phase 1b)

Tracked in [[ROADMAP|Roadmap]] Phase 1a and [[TASKS|Task Board]].

## 7. Checklist — SEO

- [ ] Create `src/app/robots.ts`
- [ ] Create `src/app/sitemap.ts`
- [ ] Add `public/og-image.png` (1200×630), favicons, `apple-touch-icon`, `manifest.json`
- [ ] Set real `NEXTAUTH_URL` / metadataBase for production
- [ ] Add `alternates.canonical` per route
- [ ] Improve per-route titles (no bare `"Home"` / `"Login"`)
- [ ] noindex gated pages (e.g. account/checkout once they exist)
- [ ] Validate robots + sitemap + social cards after deploy

See the living status of these in [[GAPS|Gaps & Missing Work]].

---

*Last updated: 2026-09-23 · Part of the [[README|F1Store Wiki]]*