---
title: "F1 Community Hub — Scope & Product Notes"
aliases:
  - F1 Community Hub
  - Hub
  - Discussion
  - Product Notes
tags:
  - f1-community
  - wiki
  - hub
  - product
date: 2026-09-23
status: active
---

# 🏎️ F1 Community Hub — Scope & Product Notes

> [!abstract] What this is
> The **hub** is the first experience to build inside F1Community. This page holds
> its **product scope and a running log of notes** as features get decided.
> New notes get appended below — keep this file up to date.

[[WELCOME|🏁 Welcome]] · [[README|📚 Wiki Index]] · [[PROGRESS|Progress]] · [[TASKS|Task Board]]

---

## Hub contents (2026-09-23)

The F1 Community hub consists of four pillars:

| Pillar | What it is |
| :----- | :--------- |
| **Schedule** | Race calendar, session times, upcoming/next race |
| **Discussion** | Reddit-style — see spec below |
| **Leaderboard** | Updated driver/constructor standings |
| **News** | Updated F1 news feed |

## Discussion spec (Reddit-style)

> [!warning] Decided 2026-09-23 — build to this
> - Users can **post** and **comment on other posts** (like Reddit)
> - Posts/comments can be made **anonymously OR with your username**
> - **No chat function for now** (explicitly out of scope until later)

## Priority (2026-09-23)

1. **Login + Register first** — get authentication done and solid (see
   [[WELCOME|How the website works]], [[SECURITY|Security Plan]])
2. Then the hub pillars above (Schedule → Discussion → Leaderboard → News)
3. Store experiences (**F1 Store Community**, **F1 Official Store**) come after

## Notes log

| Date | Note |
| :--- | :--- |
| 2026-09-23 | Hub = schedule + discussion (Reddit-style, anonymous-or-username, **no chat**) + updated leaderboard + updated news. Focus login/register first. Stores later. |
| 2026-09-23 | Tooling: moved **all opencode skills + plugins to the A: HDD** (`A:\opencode-memory\skills` = 22 skills, `A:\opencode-memory\plugins` = 3 local plugin dirs via `plugins` in `opencode.jsonc`). All 5 configured plugins were **already broken** (V1 plugin API fails V2 schema check; `opencode-notificator`/`opencode-type-inject` don't exist on npm — 404), so removal/nothing lost. |
| 2026-09-23 | Tooling: researched + installed **4 new plugins** to `A:\opencode-memory\plugins`. **Verified working on V2.0.14**: `superpowers` v6.4.1 (git clone — 15 skills now live: brainstorming, systematic-debugging, writing-plans, TDD, etc.) and `opencode-dcp` 3.2.0 (context pruning; needed full devDeps install for `@opencode-ai/plugin`). **Dead on V2 (V1 API, removed from config, dirs kept)**: `opencode-notify` 0.3.1 + `opencode-plugin-updates` 1.0.2 — both export async `(input) => hooks`, which V2 rejects; plugin-updates also had no root entry file. Gotcha learned: opencode's local-dir loader needs a root `server.js`/`index.js` shim (dcp ships one; superpowers' `index.js` is its shim). |
| 2026-09-24 | Login fixes: logo on `/login` now links to `/login` (was `/home`); removed demo-credentials button + dead `.auth__demo-*` CSS from `LoginForm` (also fixes a latent crash — the button called a `setValue` that was never defined). Typecheck surfaces pre-existing broken JSX in `src/app/register/page.tsx` (unclosed tags) — logged in GAPS §A, repair pending. |
| 2026-09-24 | Register repair: rebuilt `src/app/register/page.tsx` (malformed JSX, typecheck red) as a 1:1 copy of the login shell — card renders `RegisterForm`, header pill points to /login, imports shared `../login/login.css`. `npm run typecheck` green. Found: RegisterForm's `login-*` classes have zero CSS anywhere (form renders unstyled) — restyle to `auth__*` is the next step. |
| 2026-09-24 | Auth V1 hardening done: `RegisterForm` `login-*` → `auth__*` classes (now styled, zero new CSS); `LoginForm` trims+lowercases email, same-origin `callbackUrl` guard, dead REMEMBER ME + mispointed FORGOT row removed (dead `.auth__form-options/.auth__remember/.auth__checkbox/.auth__forgot` CSS deleted); `loginSchema` pw min 6→8 (matches register), email trim+lowercase in both schemas, `rememberMe` dropped; `auth.ts` throws when `NEXTAUTH_SECRET` missing in real prod (exempts `next build` — no `.env*` files exist locally, only `.env.example`); new `src/lib/rate-limit.ts` (in-memory: 10 logins/15min, 5 registers/hour per email) wired into `authorize` + `registerUser`; `auth.test.ts` updated + 3 new tests. Verified: typecheck clean, vitest 7/7, `npm run build` green (`/login`, `/register`). Manual visual check pending. |
| 2026-09-24 | Login/register design pass done: screen-reader labels + `aria-invalid`/`aria-describedby` on all auth inputs, password toggles keyboard-focusable with visible focus styles, error banners use `role="alert"`; fixed unstyled register footer link (`auth__form-footer-link` → `auth__footer-link`); header logo constrained to header height (132px/154px); deleted unused `.login-nav*`/`.login-menu-pill` CSS. Verified: typecheck clean, vitest 7/7, `npm run build` green. |
| 2026-09-24 | Header logo enlarged (132×34 → 164×42 mobile, 154×38 → 172×44 tablet, new 188×48 desktop rule) with matching `sizes` hints on /login + /register; `white-space: nowrap` on header pill so tiny screens can't wrap it. Responsive base already mobile-first (single column, card ≤420px, scrolling telemetry) — verified typecheck clean + `npm run build` green. |
| 2026-09-25 | DB/admin bootstrap for colleagues: new non-destructive `prisma/create-admin.ts` + `npm run db:admin` (upserts `admin@f1store.com`/`admin123` as ADMIN, env-overridable; unlike `db:seed` it never deletes). `DATABASE.md` gained a colleague-onboarding section (own DB per dev — Neon branch or `docker compose up -d`, `.env.local` from `.env.example`, `db:push`, `db:admin`, sign in at /login). No live `DATABASE_URL` exists in this shell and none is committed — real URLs stay in gitignored `.env.local`/private share only. Typecheck clean; live-DB run still pending a real URL. |
| 2026-09-25 | **Clone-and-go dev DB (SQLite) + live admin created.** `prisma/schema.prisma` is now the SQLite dev schema (auto-created `prisma/dev.db`, gitignored); Postgres prod schema preserved untouched as `prisma/schema.postgresql.prisma`. Dev-only compromises (Prisma 5.22 SQLite limits): money `Decimal @db.Decimal` → `Float`, `Role`/`OrderStatus`/`AddressType` enums → `String` + string literals in `seed.ts`/`create-admin.ts` (assignable under both clients), `Json` addresses → `String`. New scripts: `db:generate:prod`, `db:migrate:prod` (explicit `--schema`); `db:migrate` pinned to the Postgres schema; dev flow is `db:push` only (keeps `prisma/migrations/` Postgres-only). `.env.example` + new gitignored `.env.local` default to `file:./dev.db`. **Verified end-to-end: `db:push` created dev.db, `db:admin` → `DB connection OK` + `admin <admin@f1store.com> role=ADMIN`, throwaway script proved the exact login ops (`findUnique` + bcrypt `admin123` → true, script deleted), typecheck clean, vitest 7/7, `npm run build` green. `DATABASE.md` rewritten for the dual-schema workflow. Colleagues now get a working DB + admin login with 4 commands and zero accounts. |
| 2026-09-28 | **dev.db ships with the clone + /home enriched as the post-login landing.** `.gitignore`: removed `prisma/dev.db*` (plus repaired NUL-byte corruption from old appends — file was unreadable as "binary"; also split a glued `.turbo`+`opencode/opencode.json` line, now 61 clean lines). `DATABASE.md` onboarding updated: fresh clones already contain dev.db + starter admin, `db:push` only needed after schema changes, new local-only-data convention (never commit a dirty dev.db — binary merge conflicts). `/home` (`MemberHomePage`) enriched in place: kept hero, CTAs now anchor to `#categories`/`#next-race` (were self-loops to `/home`), new next-race teaser (`getNextF1Event` + guarded `Countdown` — renders only with a real date, else neutral note), shop-category cards, top-3 drivers list (`getTopDrivers(3)`), all in new `home__*` BEM blocks in `home.css`. Root `/` now `redirect('/home')` (was blank). Verified: typecheck clean, vitest 7/7, `npm run build` green (`/home` 1.53kB). No middleware/route-gating (none exists) — parked with LIVE-badge + wiki-sync threads. |
| 2026-09-28 | **Logo asset fixed + home navbar.** Root cause of the tiny header logos: `public/imgLogoContainer.png` is a 3464×3464 square with the F1 mark in a thin middle band (huge baked-in padding), so `object-contain` in the wide-short header boxes shrank the mark to ~14px tall. Fix: new `public/imgLogoF1.png` (1965×543 crop via temp `trim-f1-logo.ps1`, .NET System.Drawing bbox crop, old file untouched); all 4 usages (login/register header + footer) now point at it — same containers, mark finally fills the box. New sticky `home-navbar` on `/home` (logo 180/196/208px tiers, slightly bigger than login's 164/172/188; anchor links Next race/Categories/Top drivers, links hidden <640px; added `id="drivers"`). Verified: zero `imgLogoContainer` refs in `src/`, typecheck clean, `npm run build` green. Old `imgLogoContainer.png` still in `public/` (dead weight — owner to delete on commit). |
| 2026-09-28 | New `RUN.md` at repo root: clone-and-run instructions for other machines (Node 20+, clone, `npm install`, `cp .env.example .env.local` + set `NEXTAUTH_SECRET`, dev.db ships in clone so usually no DB step, `npm run dev` → `/home`, admin login, troubleshooting table for the `DATABASE_URL`/port-3000 errors, production-Neon pointer, local-only-data conventions). Uncommitted per no-git rule. |
| 2026-09-28 | **E2E proof: register + login work against dev.db.** Drove the real paths (not just unit tests): `registerUser` server action → `{success:true}`, CUSTOMER row created; real HTTP POST to `/api/auth/callback/credentials` on the running dev server → `302 http://localhost:3000/home` + session cookie set. Probe user deleted afterwards — dev.db left clean. Tooling notes: Playwright MCP unusable here (hardcoded Brave path missing); PS 5.1 `Invoke-WebRequest` chokes on the 302 (`curl.exe -w '%{http_code} %{redirect_url}'` + cookie jar is the reliable pattern); plain `tsx` does NOT load `.env.local` (only Next.js does) so standalone scripts need `DATABASE_URL` set explicitly; repo `package.json` has no `"type":"module"` so tsx compiles `.ts` as CJS — no top-level await, wrap in `main()`. |
| 2026-09-28 | Fixed `npm run db:admin` crash (`DATABASE_URL` not found): two stacked causes — (1) no `.env.local` existed in this checkout (created from `.env.example`; gitignored, never committed), (2) plain `tsx` never loads env files (only `next` commands do), so added a tiny dependency-free `.env.local` loader at the top of `prisma/create-admin.ts` (skips comments/blanks, strips quotes, never overrides real env). Verified: `db:admin` → `DB connection OK`, admin exists as ADMIN; typecheck clean. |
| 2026-09-28 | **`/home` is now a live news hub + full standings.** New server-only `src/lib/f1/news.ts` (zero-dep targeted RSS parser: Sky Sports F1 RSS primary `https://www.skysports.com/rss/12433`, BBC Sport F1 RSS fallback — both verified live and keyless; static 3-item fallback so the section never renders empty; news ISR 30min; Sky `BST` dates normalized to offsets since V8 can't parse them). Probe proved 9 real items with 1920×1080 images + valid dates before wiring. `home/page.tsx`: newsroom section (hero = newest, `LATEST UPDATES` sidebar = next 4, grid = rest; `pubDate` per card; Read Story links out with source credit) + standings expanded top-3 → top-10 (`getTopDrivers(10)`); navbar adds News link + disabled Schedules/Store/Sale 'soon' pills (those routes don't exist). `next.config.js` gains `ichef.bbci.co.uk` + `**.365dm.com` remotePatterns. Verified: typecheck clean, `npm run build` green with `/home` prerendered (RSS fetch succeeded at build time). |
| 2026-09-28 | **Logout + news-first home + dedicated pages.** New: `LogoutButton.tsx` (client, NextAuth `signOut` → `/login`, sits outside the collapsing links row so it stays visible on mobile), shared `SiteNavbar.tsx` + `site-navbar.css` (Home/News/Schedule/Standings links; Store/Sale stay disabled soon pills), shared `NewsCard.tsx` (also exports `formatNewsDate`). New routes: `/news` (full story archive), `/schedule` (next GP + guarded countdown), `/standings` (top-20 table) — all server components reusing the jolpica/news helpers, importing shared `home.css` sections (repo precedent: register shares `login.css`). `/home` rewritten news-first: hero + `bg-racing-grid` usage deleted (utility stays in globals unused), old home navbar deleted. `home.css` pruned via script (dead hero + home-navbar blocks out; `.page`/`.page__glow` moved to `globals.css`; fixed an em-dash mojibake the PS5.1-written script left in the header). Verified: typecheck clean, vitest 7/7, build green (`/home` 1.71kB, `/news` + `/standings` 456B, `/schedule` 1.09kB, all prerendered). |

> [!tip] Adding a note
> Append to the table above with today's date any time the product decision changes.

---

*Last updated: 2026-09-23 · Part of the [[README|F1Store Wiki]]*