---
title: "Current Repository File Tree"
aliases:
  - File Tree
  - Files
tags:
  - f1-community
  - wiki
  - reference
date: 2026-09-23
status: active
---

# Current Repository File Tree

> Snapshot of the F1Community repository as of 2026-10-02.
>
> Generated and machine-local directories are intentionally omitted: `node_modules/`, `.next/`, `dist/`, `build/`, `coverage/`, `.git/`, and local environment files.

```text
F1Community/
├── .env.example
├── .gitignore
├── docker-compose.yml
├── next-env.d.ts
├── next.config.js
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── RUN.md (local run guide: install → env → db:admin → dev)
├── tailwind.config.js
├── tsconfig.json
│
├── assets/
│   ├── Assets/
│   │   ├── Images/
│   │   │   ├── imgAlfa800X800.png
│   │   │   ├── imgAlpine800X800.png
│   │   │   ├── imgAlpha800X800.png
│   │   │   ├── imgAston800X800.png
│   │   │   ├── imgDriversAlbon23.png
│   │   │   ├── imgDriversAlonso14.png
│   │   │   ├── imgDriversAntonelli12.png
│   │   │   ├── imgDriversBearman87.png
│   │   │   ├── imgDriversBortoleto5.png
│   │   │   ├── imgDriversBottas77.png
│   │   │   ├── imgDriversColapinto43.png
│   │   │   ├── imgDriversGasly10.png
│   │   │   ├── imgDriversHadjar6.png
│   │   │   ├── imgDriversHamilton44.png
│   │   │   ├── imgDriversHulkenberg27.png
│   │   │   ├── imgDriversLawson30.png
│   │   │   ├── imgDriversLeclerc16.png
│   │   │   ├── imgDriversLindblad41.png
│   │   │   ├── imgDriversNorris4.png
│   │   │   ├── imgDriversOcon31.png
│   │   │   ├── imgDriversPerez11.png
│   │   │   ├── imgDriversPiastri81.png
│   │   │   ├── imgDriversRussel63.png
│   │   │   ├── imgDriversSainz55.png
│   │   │   ├── imgDriversStroll18.png
│   │   │   ├── imgDriversVerstappen3.png
│   │   │   ├── imgSticker1.png
│   │   │   ├── imgFerrari800X800.png
│   │   │   ├── imgHaas800X800.png
│   │   │   ├── imgMcLaren800X800.png
│   │   │   ├── imgMercedes800X800.png
│   │   │   ├── imgRedbull800X8001.png
│   │   │   └── imgTeamWilliams.png
│   │   └── Svg/
│   │       ├── img104.svg
│   │       ├── imgCenterPin.svg
│   │       ├── imgColorRingBackground.svg
│   │       ├── imgColorRingBackground1.svg
│   │       ├── imgColorRingBackground2.svg
│   │       ├── imgColorRingBackground3.svg
│   │       ├── imgColorRingBackground4.svg
│   │       ├── imgFacebook.svg
│   │       ├── imgFrame59.svg
│   │       ├── imgHubCenterBronze.svg
│   │       ├── imgHubOuterRing.svg
│   │       ├── imgInnerSidewallEdge.svg
│   │       ├── imgInstagram.svg
│   │       ├── imgLine1.svg
│   │       ├── imgLine236.svg
│   │       ├── imgLine240.svg
│   │       ├── imgOrnament24.svg
│   │       ├── imgOrnament69.svg
│   │       ├── imgRimInnerHighlight.svg
│   │       ├── imgRimOuterRing.svg
│   │       ├── imgShape.svg
│   │       ├── imgTopLogoGroup.svg
│   │       ├── imgTopLogoGroup1.svg
│   │       ├── imgTopLogoGroup2.svg
│   │       ├── imgTopLogoGroup3.svg
│   │       ├── imgTopLogoGroup4.svg
│   │       ├── imgTwitter.svg
│   │       ├── imgVector.svg
│   │       └── imgYoutube.svg
│   └── figma/
│       ├── manifest.json
│       └── screens/
│           ├── main/png/
│           │   ├── Frame 143.png
│           │   ├── Home (Responsive).png
│           │   └── image.png
│           └── References/png/
│               ├── 04-Calendar.png
│               ├── asymmetric-news-hero.png
│               ├── canvas-gallery.png
│               ├── Driver Radio.png
│               ├── Driver.png
│               ├── f1-account - Variation 2 - Centered.png
│               ├── f1-account.png
│               ├── f1-admin.png
│               ├── f1-login.png
│               ├── f1-schedules-standings - Variation 2 - Centered.png
│               ├── f1-store - Variation 2 - Centered.png
│               ├── f1-store - Variation 3 - Split Layout.png
│               ├── Frame 16.png
│               ├── Frame 79.png
│               ├── Frame 84.png
│               ├── hero-banner.png
│               └── login-card.png
│
├── f1storewiki/
│   ├── ARCHITECTURE.md
│   ├── COMMUNITY_HUB.md (session notes log)
│   ├── DATABASE.md (dual-schema guide + onboarding)
│   ├── DEVELOPMENT.md
│   ├── F1_API_REFERENCE.md
│   ├── FIGMA_MCP_SETUP.md
│   ├── FILE_TREE.md
│   ├── futureplans.md (parked: AI stakes, real store)
│   ├── GAPS.md (living audit)
│   ├── GUIDE.md
│   ├── LOGIN_DYNAMIC_F1_CONTENT.md
│   ├── LOGIN_LANDING_PAGE.md
│   ├── PLAN.md
│   ├── PROGRESS.md
│   ├── PROJECT_OVERVIEW.md
│   ├── README.md (wiki index)
│   ├── ROADMAP.md
│   ├── SECURITY.md
│   ├── SEO.md
│   ├── SESSION_MEMORY.md
│   ├── TASKS.md
│   ├── WELCOME.md
│   └── DrawingBoardWiki/
│       ├── Home.md
│       ├── Phase-1-Setup.md
│       ├── Phase-2-Server.md
│       ├── Phase-3-Canvas.md
│       ├── Phase-4-Tools.md
│       └── Phase-5-State.md
│
├── prisma/
│   ├── create-admin.ts (`npm run db:admin` — non-destructive admin upsert)
│   ├── dev.db (committed starter data; day-to-day edits stay local-only)
│   ├── migrations/
│   ├── schema.postgresql.prisma (production)
│   ├── schema.prisma (SQLite dev)
│   └── seed.ts
│
├── public/
│   ├── imgButtonLogin.png
│   ├── imgButtonLogin1.png
│   ├── imgDriversHamilton44.png
│   ├── imgDriversLeclerc16.png
│   ├── imgDriversNorris4.png
│   ├── imgDriversPiastri81.png
│   ├── imgDriversRussel63.png
│   ├── imgDriversVerstappen3.png
│   ├── imgFacebook.svg
│   ├── imgFrame74.png
│   ├── imgHeader.png
│   ├── imgImage1.png
│   ├── imgImage2.png
│   ├── imgImage3.png
│   ├── imgImage4.png
│   ├── imgImage5.png
│   ├── imgImage6.png
│   ├── imgImage7.png
│   ├── imgImage8.png
│   ├── imgInstagram.svg
│   ├── imgLogin.png
│   ├── imgLogoF1.png (trimmed mark; imgLogoContainer.png deleted 2026-09-28)
│   ├── imgRectangle427.png
│   ├── imgSticker1.png
│   ├── imgTopLogoGroup.svg
│   ├── imgTopLogoGroup1.svg
│   ├── imgTopLogoGroup2.svg
│   ├── imgTopLogoGroup3.svg
│   ├── imgTopLogoGroup4.svg
│   ├── imgTwitter.svg
│   └── imgYoutube.svg
│
└── src/
    ├── middleware.ts (guests pass everywhere; signed-in /login|/register → /home)
    ├── app/
    │   ├── actions/auth.ts (registerUser server action)
    │   ├── api/auth/[...nextauth]/route.ts
    │   ├── components-wynn/page.tsx
    │   ├── drivers/page.tsx
    │   ├── globals.css (carbon weave + pit tokens + motion)
    │   ├── home/page.tsx (+ home.css — news hub + race hero)
    │   ├── layout.tsx (Barlow Condensed/Barlow via next/font)
    │   ├── login/page.tsx (+ login/login.css)
    │   ├── new-to-f1/page.tsx (beginner guide)
    │   ├── news/page.tsx (archive)
    │   ├── page.tsx (redirects / → /home)
    │   ├── register/page.tsx
    │   ├── robots.ts
    │   ├── schedule/page.tsx (timeline + full calendar)
    │   ├── sitemap.ts
    │   ├── standings/page.tsx
    │   └── teams/page.tsx
    ├── components/
    │   ├── auth/
    │   │   ├── AuthHeader.tsx
    │   │   ├── LoginForm.tsx
    │   │   ├── LogoutButton.tsx
    │   │   ├── RegisterForm.tsx
    │   │   └── SocialAuth.tsx (OAuth stubs)
    │   ├── f1/
    │   │   ├── Countdown.tsx
    │   │   ├── CountdownBoxes.tsx
    │   │   ├── MobileMenu.tsx (phone overlay)
    │   │   ├── NewsCard.tsx (+ getNewsTopic tags)
    │   │   ├── NewsGridFilter.tsx
    │   │   ├── NewsTicker.tsx
    │   │   ├── SessionTimes.tsx (local-first times)
    │   │   └── SiteNavbar.tsx (+ site-navbar.css)
    │   └── layout/
    │       ├── AppShell.tsx
    │       ├── SiteFooter.tsx
    │       └── SiteHeader.tsx
    └── lib/
        ├── auth.ts (prod NEXTAUTH_SECRET enforced)
        ├── db.ts
        ├── f1/
        │   ├── jolpica.ts (schedule, standings, calendar, timeline)
        │   ├── news.ts (Sky/BBC RSS + static fallback)
        │   └── teams.ts (constructorColor map)
        ├── rate-limit.ts (login/register throttle)
        ├── utils.ts
        └── validations/auth.ts (+ auth.test.ts, 7 tests)
```

## Current Login Surface

- Route: `src/app/login/page.tsx`
- Form: `src/components/auth/LoginForm.tsx`
- Auth API: `src/app/api/auth/[...nextauth]/route.ts`
- Auth configuration: `src/lib/auth.ts`
- Requested login artwork: `assets/Assets/Images/imgSticker1.png`, served by the page as `/imgSticker1.png`

## Current Routes (2026-10-02)

- `/` → `/home` (public news hub: race-week hero, news ticker, live news, top-10 standings towers)
- `/news` archive · `/schedule` (session timeline + full season calendar) · `/standings` · `/drivers` · `/teams` · `/new-to-f1` beginner guide
- `/login`, `/register` (auth pages; signed-in users bounce to `/home` via `src/middleware.ts`)
