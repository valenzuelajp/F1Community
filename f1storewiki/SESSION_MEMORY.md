---
title: "Session Memory — Login Page Work (2026-09-22)"
aliases:
  - Session Memory
  - Pick Up Here
tags:
  - f1-community
  - wiki
  - login
  - session
date: 2026-09-23
status: active
---

# Session Memory — Login Page Work (2026-09-22)

> **What this file is:** the single memory of what was done to `/login` on
> **2026-09-22**, where everything lives on the `A:` drive, what's tunable, and
> what's still pending. A beginner — or a brand-new AI session — can read this
> one file and instantly know where things stand.
>
> **Repo (on A:):** `A:\Github\F1Community` — this is a local working copy.
> **Wiki (on A:):** `A:\Github\F1Community\f1storewiki\`

---

## 1. What was accomplished today

`/login` is no longer a static mockup — its hero is **powered by the real F1
schedule** (Jolpica API) and the code is beginner-friendly.

| Done                         | Detail                                                                                                                                                                                                                        |
| :--------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ✅ Live F1 data              | Badge `ROUND 15 — 2026 SEASON`, race name, circuit/city, season stats come from `getNextF1Event()` in `src/lib/f1/jolpica.ts` (Jolpica `/current/races/`, ISR `revalidate: 3600`, static `fallbackF1Event()` if API is down). |
| ✅ Live countdown            | `src/components/f1/Countdown.tsx` (client) ticks every second → `1d 23h 21m`. Targets the **next session** (FP1 → Qualifying → Sprint → Race), not always the race.                                                           |
| ✅ Time-zone aware           | Countdown detects the visitor's IANA zone + GMT offset (client-side only, **no data leaves the browser — privacy-safe**). Shows 12-hour local start, e.g. `Thu 24 Sep 4:30 PM · Asia/Manila (GMT+8)`.                         |
| ✅ Auto title                | Giant outline hero title changes by session: `GRAND PRIX!` / `FREE PRACTICE!` / `QUALI TIME!` / `SPRINT SHOOTOUT!` / `SEASON COMPLETE!` (+ auto `--compact` size for long words).                                             |
| ✅ Race info above countdown | `.login-race-info` ("…— starts in") is a separate line; the countdown is its own flex child below it in `.login-race-meta`.                                                                                                   |
| ✅ Readable naming           | Login CSS **variables** + **class names** renamed to match the content they hold (see `LOGIN_DYNAMIC_F1_CONTENT.md` §6 for the rename maps). Verified TSX ↔ CSS parity: 67/67 classes + `.login-countdown-start`.             |
| ✅ Verified data             | Azerbaijan GP: FP1 `2026-09-24 08:30 UTC` (Thu 4:30 PM Manila), Race `2026-09-26 11:00 UTC` (Sat 7:00 PM Manila = Google's "7:00 PM"). 2026 season = 23 races.                                                                |

## 2. Files involved (all under `A:\Github\F1Community\`)

| File                                      | Role                                                                                                                                 |
| :---------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| `src/app/login/page.tsx`                  | Async **Server Component**; fetches `getNextF1Event()` with try/catch → `fallbackF1Event()`. Renders badge, title, race meta, stats. |
| `src/app/login/login.css`                 | All login styles + tunable CSS variables (top of file).                                                                              |
| `src/lib/f1/jolpica.ts`                   | **New** Jolpica client: `F1Event` model, session slots/timeline, `getNextF1Event()`, `fallbackF1Event()`.                            |
| `src/components/f1/Countdown.tsx`         | **New** client countdown; timezone detect + 12-hour local start; renders only after mount (hydration-safe).                          |
| `f1storewiki/LOGIN_DYNAMIC_F1_CONTENT.md` | Beginner walkthrough (this work).                                                                                                    |
| `f1storewiki/LOGIN_LANDING_PAGE.md`       | Plan/delivery + Iteration Log.                                                                                                       |
| `f1storewiki/PROGRESS.md`, `TASKS.md`     | Progress tracker + task board updated.                                                                                               |

## 3. Tunable knobs (top of `login.css` → `:root`)

```css
--driver-left: -10%; /* driver image: bigger = RIGHT, negative = LEFT */
--driver-top: 10%; /* driver image: bigger = DOWN */
--nav-left: -5rem; /* nav links at tablet+ (640px): negative = LEFT */
--nav-left-desktop: -16rem; /* nav links at desktop (1024px+) */
/* compact hero title triggers automatically when a line is ≥ 9 chars */
```

## 4. Verification (PowerShell only on this machine)

```powershell
npx tsc --noEmit -p tsconfig.json                      # typecheck (silent = pass)
(Invoke-WebRequest -Uri "http://localhost:3000/login" -UseBasicParsing).StatusCode   # 200
```

Class-parity check (every `login-*` class used in page.tsx must exist in login.css):

```powershell
$tsx=(Get-Content "src/app/login/page.tsx" -Raw); $css=(Get-Content "src/app/login/login.css" -Raw)
$used=[regex]::Matches($tsx,'className="([^"]*login-[^"]*)"')|%{$_.Groups[1].Value -split " "}|?{$_ -match "^login-"}|Sort-Object -Unique
$missing=$used|?{$css -notmatch ("\."+[regex]::Escape($_)+"\s*[,{:]?")}
if($missing){$missing}else{"All login-* classes have CSS rules."}
```

## 5. Pending / open items

- ⏳ **Nav position tweak awaiting visual confirm.** Server serves the new offsets
  (`--nav-left: -5rem`, `--nav-left-desktop: -16rem`) but the user may have had a
  cached stylesheet. Fix: hard refresh `Ctrl+Shift+R`, then check in DevTools:
  ```js
  document.querySelector(".login-nav-items").getBoundingClientRect().left;
  ```
  If still not moving, check the viewport width (links are hidden < 640px) and
  whether `.login-nav-items` computes `left: auto` (an override).
- ⏳ Countdown duration is next-session by design; **user confirmed keep** (not race).
- ⏳ Harness browser tools are unavailable in this session (Brave path missing),
  so visual checks relied on SSR HTML + math + served CSS inspection.

## 6. Gotchas / quirks that saved time

- **Window's timezone picker has no "Manila"** → Filipino users often end up on
  `Australia/Perth` (still GMT+8, same clock). Zone name is shown so users catch it.
- Countdown/local time renders **client-side only** (after mount) to avoid React
  hydration mismatches → SSR shows an empty `.login-countdown` span. That is normal.
- Jolpica rate limit ~500 req/hour → keep ISR `revalidate: 3600`.
- 2026 calendar = **23 races** (fallback matches this).
- `.login-countdown-start` is styled in `login.css` but rendered by the shared
  `Countdown.tsx` (login is the only consumer right now).
- Only `login.css` variables were renamed; `globals.css` `--f1-*` tokens are shared
  and were left untouched.

---

_Next planned work: reuse `getNextF1Event()` for the homepage countdown and a
session schedule table (TASKS.md → F1 API client milestone)._
