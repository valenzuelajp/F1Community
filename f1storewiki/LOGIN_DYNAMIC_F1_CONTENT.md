---
title: "Login Page: Dynamic F1 Content"
aliases:
  - Dynamic F1 Content
  - Login Dynamic
tags:
  - f1-community
  - wiki
  - login
  - f1
  - jolpica
date: 2026-09-23
status: complete
---

# Login Page: Dynamic F1 Content + Beginner-Friendly Naming

> **Status:** Done · **Session:** 2026-09-22
> **Goal:** Make the `/login` hero feel alive — it now reads the **real F1 schedule**
> and updates itself (badge, title, race info, countdown, stats) — and keep the
> code easy for a beginner to read.
>
> **Short version of what we did:**
>
> 1. Wired the hero to the **Jolpica F1 API** (schedule data) instead of hard-coded text.
> 2. Added a **live countdown** ("2d 03h 12m") that ticks every second.
> 3. The giant hero **title auto-adjusts**: `GRAND PRIX!`, `FREE PRACTICE!`,
>    `QUALI TIME!`, `SPRINT SHOOTOUT!`, `SEASON COMPLETE!` — depending on the calendar.
> 4. Renamed CSS **variables** and **class names** so their names say _what content
>    they hold_ (faster to find, easier to match TSX → CSS).

---

## 1. Where things live

| Path                              | What it is                                                        |
| :-------------------------------- | :---------------------------------------------------------------- |
| `src/app/login/page.tsx`          | The login page (a **Server Component** that fetches the F1 event) |
| `src/app/login/login.css`         | All the login page styles                                         |
| `src/lib/f1/jolpica.ts`           | **New** — Jolpica API client + `F1Event` model (ADR-013)          |
| `src/components/f1/Countdown.tsx` | **New** — client component that counts down second-by-second      |

> 💡 **Beginner tip — Server vs Client:**
> The page fetches data **on the server** (fast, cached, no flicker). The countdown
> has to tick every second, so it lives in a tiny **client** component. Rule of thumb:
> keep data fetching in Server Components, push only the interactive bits to client.

---

## 2. How the data flows

```
/ (redirects to /login)
        │
        ▼
login/page.tsx  ──(server)──►  getNextF1Event()        (src/lib/f1/jolpica.ts)
                                      │
                                      ▼
                        fetch "https://api.jolpi.ca/ergast/f1/current/races/"
                                      │   (ISR: re-fetches at most once an hour)
                                      ▼
                                   F1Event  (a plain, friendly object)
                                      │
        ┌─────────────────────────────┼──────────────────────────────┐
        ▼                             ▼                              ▼
  login-round-badge            login-race-meta               login-season-stats
  "ROUND 15 — 2026 SEASON"     "NEXT UP • FREE PRACTICE!"     "9 RACES REMAINING"
                               "Azerbaijan Grand Prix"        "14 COMPLETE / 23"
                               "Baku City Circuit • … starts in"
                               [<Countdown/> = next line below,
                                renders in-browser after mount]

        Countdown.tsx ('use client') ticks every 1s:  "2d 03h 12m"
```

If the API is unreachable, `fallbackF1Event()` returns safe static values so the
page **never crashes** (graceful degradation).

---

## 3. The `F1Event` model (one object that powers everything)

`getNextF1Event()` returns a single normalized object — the whole hero is built
from it:

| Field                                               | Meaning                                          | Example                      |
| :-------------------------------------------------- | :----------------------------------------------- | :--------------------------- |
| `headline`                                          | One-line "shout".                                | `"FREE PRACTICE!"`           |
| `title`                                             | Two-line title for the big outline text.         | `["FREE", "PRACTICE!"]`      |
| `isLive`                                            | `true` while a session is _currently happening_. | `false`                      |
| `nextSessionStart`                                  | Start of the next/current session (ISO).         | `"2026-09-24T10:30:00.000Z"` |
| `raceName`                                          | Name of the Grand Prix.                          | `"Azerbaijan Grand Prix"`    |
| `round` / `season`                                  | Which race / year.                               | `15` / `2026`                |
| `totalRounds` / `racesCompleted` / `racesRemaining` | Season progress.                                 | `23` / `14` / `9`            |
| `seasonOver`                                        | All races done → off season.                     | `false`                      |

### Session detection (the clever part)

For each race on the calendar, Jolpica gives the times of FP1/FP2/FP3,
Sprint Shootout, Sprint, and Qualifying. `collectSlots()` sorts them all into one
timeline. Then we pick the **next race weekend** and:

1. **A session is running now** (now is within a 3-hour window of a session start)
   → `isLive: true`, headline shows the live session.
2. **Weekend is upcoming** (or started but not finished) → count down to that
   weekend's **next** session.
3. **All races already ran** → off season → `SEASON COMPLETE!`, `seasonOver: true`.

```ts
// Example glimpse (real logic in src/lib/f1/jolpica.ts)
const TITLES: Record<SessionType, [string, string]> = {
  practice: ["FREE", "PRACTICE!"],
  "sprint-qualifying": ["SPRINT", "SHOOTOUT!"],
  qualifying: ["QUALI", "TIME!"],
  sprint: ["SPRINT", "RACE!"],
  race: ["GRAND", "PRIX!"],
};
```

---

## 4. The auto-adjusting hero title

The huge outlined title used to be hard-coded `SPRINT / QUALI!!!!`. Now it renders:

```tsx
<h1
  className={`login-hero-title${longWord ? " login-hero-title--compact" : ""}`}
>
  {event.title[0]}
  <br />
  {event.title[1]}
</h1>
```

- It always shows the **current/next session type** (`event.title` from the model).
- If either line is ≥ 9 characters (`SHOOTOUT!`, `PRACTICE!`, `COMPLETE!`), the
  `--compact` modifier slightly shrinks the font so the word never overflows the
  wrap (auto-adjusted at every breakpoint in `login.css`).
- **No race left?** The model returns `["SEASON", "COMPLETE!"]` automatically.

---

## 5. Countdown, time zones & "which session is it counting to?"

### The countdown targets the **next** session, not always the race

`getNextF1Event()` returns the **next/current** session on the calendar. So on
Thursday before a GP weekend the hero counts down to **FP1**, the next day to
**Qualifying**, and only on Sunday to the **Grand Prix itself**. This is deliberate
("NEXT UP • FREE PRACTICE!" is the hook). Google's "Baku GP starts Sat 7:00 PM"
is the _race_ start — a different, later session.

### Time zone handling (verified with the Philippines user)

- Jolpica returns **UTC** times; the countdown compares two absolute instants
  (`target - Date.now()`), so the **duration is correct in any time zone**.
- The `Countdown` component (client) also detects the visitor's zone and converts
  the session start to their local clock, so the user can verify the numbers:

  ```
  detected time zone : e.g. Asia/Manila or Australia/Perth (both GMT+8 — identical clocks)
  next session (FP1) : Thu 24 Sep 4:30 PM   → countdown "1d 23h …"
  Grand Prix itself  : Sat 26 Sep 7:00 PM   → (matches Google's 7:00 PM)
  ```

  > ⚠️ The zone **name** always reflects the user's _device_ setting. Australia/Perth
  > vs Asia/Manila differ only by name (both are UTC+8, no DST) so the clock shown
  > is identical — but a device on "Perth" (a common Windows picker default) will
  > report `Australia/Perth`. We show the name on purpose so users can spot that.

- Detection uses `Intl.DateTimeFormat().resolvedOptions().timeZone` (IANA name,
  e.g. `Asia/Manila`) plus a `shortOffset` label (`GMT+8`, manual fallback).
- **Privacy:** this is 100% client-side — the browser reads the user's own device
  timezone setting; nothing is stored, sent to the server, or used to identify
  anyone (no cookie / no consent banner needed). We do **not** guess timezones
  server-side via IP geolocation (that would be personal-data collection).
  The shown zone name exists so a user with a misconfigured device clock can
  spot the discrepancy.
- **Hydration safety:** the wall-clock readout depends on the visitor's zone, so
  the countdown renders nothing during SSR and only shows text after mount —
  this guarantees the server never disagrees with the browser (no hydration error).

---

## 6. Naming conventions (so beginners can find things fast)

We renamed the CSS so a class/variable name = **the content it holds**. Same idea
for variables and classes. Keep using this idea for new code.

### CSS variables (renamed in `login.css` only)

| Old name              | New name            | What it holds                  |
| :-------------------- | :------------------ | :----------------------------- |
| `--f1-red`            | `--brand-red`       | The official F1 red accent     |
| `--f1-black`          | `--black`           | Plain black                    |
| `--f1-dark-bg`        | `--page-background` | Page background color          |
| `--f1-card-bg`        | `--card-background` | Login card background          |
| `--f1-card-border`    | `--card-border-red` | Card red border accent         |
| `--f1-card-glow`      | `--card-glow-red`   | Card red glow shadow           |
| `--login-driver-left` | `--driver-left`     | Driver image horizontal offset |
| `--login-driver-top`  | `--driver-top`      | Driver image vertical offset   |

> ⚠️ **Important:** the global `--f1-*` tokens in `src/app/globals.css` were
> **not** renamed — other pages still use them. Only the login-local variables changed.

### Class names (renamed in both `page.tsx` and `login.css`)

| Old class            | New class             | Content it holds                              |
| :------------------- | :-------------------- | :-------------------------------------------- |
| `login-hero-badge`   | `login-round-badge`   | The "ROUND 15 — 2026 SEASON" pill             |
| `login-hero-meta`    | `login-race-meta`     | The race info block (labels + name + details) |
| `login-meta-hook`    | `login-session-label` | "NEXT UP • FREE PRACTICE!"                    |
| `login-meta-title`   | `login-race-name`     | "Azerbaijan Grand Prix"                       |
| `login-meta-details` | `login-race-info`     | Circuit, city, and the countdown              |
| `login-stats`        | `login-season-stats`  | The RACES REMAINING / COMPLETE stats          |
| `login-card-anchor`  | `login-card-stage`    | The stage behind/around the login card        |

**Rule of thumb:** if you can't tell what an element contains from its class name,
rename it. Every `login-*` class used in `page.tsx` has a matching rule in
`login.css` (automated check, 68/68).

> `.login-countdown-start` is the one `login-*` class that lives inside the
> shared `Countdown.tsx` component (it renders the local time + zone line) — it
> is styled in `login.css` because the login page is currently the only consumer.

---

## 7. How to verify your changes (Windows / PowerShell)

```powershell
# 1. TypeScript check (nothing printed = success)
npx tsc --noEmit -p tsconfig.json

# 2. Page is up and returns 200 (dev server runs in the background)
(Invoke-WebRequest -Uri "http://localhost:3000/login" -UseBasicParsing).StatusCode

# 3. Quick sanity: every login-* class used in TSX exists in CSS
$tsx = (Get-Content "src/app/login/page.tsx" -Raw)
$css = (Get-Content "src/app/login/login.css" -Raw)
$used = [regex]::Matches($tsx, 'className="([^"]*login-[^"]*)"') |
        ForEach-Object { $_.Groups[1].Value -split " " } |
        Where-Object { $_ -match "^login-" } | Sort-Object -Unique
$missing = $used | Where-Object { $css -notmatch ("\." + [regex]::Escape($_) + "\s*[,{:]?") }
if ($missing) { $missing } else { "All login-* classes have CSS rules." }
```

Expected right now (during the 2026 season, before the Azerbaijan GP weekend):

```
login-hero-title login-hero-title--compact  →  "FREE" <br> "PRACTICE!"
login-round-badge                           →  "ROUND 15 - 2026 SEASON"
login-race-name                             →  "Azerbaijan Grand Prix"
login-race-info                             →  "Baku City Circuit • Baku, Azerbaijan - starts in"
login-countdown (after mount, client-only)  →  below the info line:
                                                "1d 23h 21m" + "Thu 24 Sep 4:30 PM · <device zone> (GMT+8)"
                                                (12-hour clock, visitor's time zone)
login-season-stats                          →  9 RACES REMAINING • 14 COMPLETE / 23 ROUNDS
```

> ⏱️ The countdown + local time/zone line renders **only in the browser** (it needs
> the visitor's time zone), so SSR shows an empty `.login-countdown` span. That is
> intentional and prevents React hydration mismatches.

---

## 8. What's next (open ideas)

- **Reuse `getNextF1Event()`** on the homepage (`/home`) for a next-race countdown.
- Build a **session schedule table** from the same Jolpica data (TASKS.md P1).
- Add standings support to the Jolpica client (`/current/driverstandings/`).
- Keep the ISR `revalidate: 3600` pattern — Jolpica is rate-limited (500 req/hour).

---

## 9. Gotchas we learned

- **PowerShell only** on this machine (no bash). `npx tsc` works fine.
- The dev server runs as a **background process**; re-fetch `/login` to see fresh SSR.
- The 2026 calendar has **23 races** — the static fallback matches this now.
- Renaming CSS but not TSX (or vice-versa) breaks the design — always rename both
  files together, then run the class check above.
- Only `login.css` variables were renamed; `globals.css` `--f1-*` tokens are shared.

---

_Part of the login landing page plan → see [`LOGIN_LANDING_PAGE.md`](LOGIN_LANDING_PAGE.md)._
