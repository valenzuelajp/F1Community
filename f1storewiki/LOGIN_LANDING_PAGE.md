# Login Landing Page: Plan and Delivery

> **Status:** Complete  
> **Planned:** 2026-09-20  
> **Implemented:** 2026-09-20

## Goal

Make the F1-styled login screen the first page visitors see, using the supplied visual reference while retaining the existing NextAuth credentials flow.

## Plan (before implementation)

1. Rework `/login` as a desktop-first F1 race-week experience: full-width black/red hero, outlined sprint-qualifying title, driver artwork, angular login card, timing ticker, and partner strip.
2. Reuse existing optimized assets from `public/`, especially `imgSticker1.png` and `imgLogoContainer.png`; do not add a new image dependency.
3. Make `/` redirect to `/login` so the sign-in screen is the landing route.
4. Preserve a post-login destination to prevent an authenticated user from being returned to the login screen.
5. Verify TypeScript and the production build.

## Implementation (after delivery)

### Completed

- Rebuilt `src/app/login/page.tsx` around the approved F1 reference direction:
  - Full-width desktop shell with no maximum-width cap or side gutters.
  - Race-week hero with outlined `SPRINT QUALI` treatment, driver artwork, car number, and red track lighting.
  - Angular, high-contrast sign-in panel that retains the existing `LoginForm` behaviour.
  - Static live-timing ticker and team/partner bar below the hero.
  - Responsive layout: navigation reduces on smaller screens and the hero/form stack instead of clipping.
- Updated `src/app/page.tsx` to redirect `/` to `/login`.
- Preserved a post-login destination at `/home` in `src/app/home/page.tsx`.
- Updated the default successful credentials-login destination in `src/components/auth/LoginForm.tsx` from `/` to `/home`; this avoids redirecting a signed-in user back to `/login`.

### Validation

- `npm run typecheck` passes after the change.
- `npm run build` completes successfully.
- The local browser screenshot identified a desktop-width gutter caused by a `max-w-[1536px]` page shell; the cap was removed and the shell now uses `w-full`.

## Files Changed

| File                                | Purpose                              |
| ----------------------------------- | ------------------------------------ |
| `src/app/login/page.tsx`            | Full-screen F1 login landing design  |
| `src/app/page.tsx`                  | Root-to-login redirect               |
| `src/app/home/page.tsx`             | Post-login home destination          |
| `src/components/auth/LoginForm.tsx` | Default successful-login destination |

## Follow-up

- Connect the header and sale links when their destination routes exist.
- Replace the static timing and team labels with F1 API data in Phase 1.
- Add Playwright visual regression coverage once the local Python/Playwright helper is available.

## Iteration Log

### 2026-09-22 — Dynamic F1 content + beginner-friendly naming

- Hero is now **data-driven**: badge (ROUND 15 — 2026 SEASON), race info, season
  stats, and a per-second **countdown** come from the Jolpica F1 API via the new
  `src/lib/f1/jolpica.ts` client (`getNextF1Event()`, ISR revalidate 1h, static
  fallback when the API is down).
- New `src/components/f1/Countdown.tsx` (client component) for the ticking timer.
  It detects the visitor's time zone and shows the session start in local time
  (e.g. `Thu 24 Sep 16:30 · Asia/Manila (GMT+8)`) so dates/times can be checked.
  The countdown targets the **next** session (FP1 before a weekend), not the race.
- The giant outline hero title now **auto-adjusts** by session type
  (`GRAND PRIX!` / `FREE PRACTICE!` / `QUALI TIME!` / `SPRINT SHOOTOUT!` /
  `SEASON COMPLETE!`) with an auto `--compact` size for long words.
- Renamed login CSS **variables** and **class names** to match the content they
  hold (beginner-friendly findability); verified TSX ↔ CSS parity (68/68 classes).
- Driver image stays positioned behind the login card via `--driver-left`/`--driver-top`.
- Header nav (HOME/SCHEDULES/NEWS/STORE) nudged left via new tuning variables
  `--nav-left` (tablet) and `--nav-left-desktop` (desktop) in `login.css`.

Full walkthrough for beginners: [`LOGIN_DYNAMIC_F1_CONTENT.md`](LOGIN_DYNAMIC_F1_CONTENT.md).
