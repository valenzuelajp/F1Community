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

| File | Purpose |
|------|---------|
| `src/app/login/page.tsx` | Full-screen F1 login landing design |
| `src/app/page.tsx` | Root-to-login redirect |
| `src/app/home/page.tsx` | Post-login home destination |
| `src/components/auth/LoginForm.tsx` | Default successful-login destination |

## Follow-up

- Connect the header and sale links when their destination routes exist.
- Replace the static timing and team labels with F1 API data in Phase 1.
- Add Playwright visual regression coverage once the local Python/Playwright helper is available.
