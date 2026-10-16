# Personal rules — Wynn

Personal scope rules for Wynn's sessions only. The general rules in
`rules.md` still apply to everyone; this file only further restricts what
Wynn's sessions may touch.

## My role: components only

- I build **components for use on the website** — I do not change the live
  site itself.
- All component work happens on the **`/components-wynn` showcase**: its
  page, cards, and `*-alternatives.*` files under `src/app/components-wynn/`.
- **Do not modify live pages** — `src/app/login/page.tsx`,
  `src/app/login/login.css`, or shared components the live pages use
  (`LoginNavHeader`, `LoginFooter`, …) — unless the user explicitly asks for
  that edit in the moment.
- **Reading is fine, editing is not**: live components/classes may be read and
  mirrored in the showcase; never restyle or refactor them in place.
- Baseline ("Classic") variants render the live design **as-is** via the live
  classes (e.g. `.login-podium*` from `login.css`) — never restyle Classic.
- If a showcase task seems to require a live-page edit, **stop and ask
  first** rather than making it.

## Pattern: auto-scrolling carousel (marquee / ticker) — no duplicates

Moves continuously right-to-left. This is **not** a scrollable container —
no scrollbar, scroll wheel, snapping, drag, arrows, JS scroll loops, or
duplicated item sets. If a scrollbar appears, the implementation is wrong.

How it works (single set of items, seamless by construction):

- **Viewport** (outer): fixed box, `overflow: hidden` — clips only, never
  scrolls. Establish a size container (`container-type: inline-size`) so
  items can be positioned relative to its width.
- **Items**: each `position: absolute; top: 50%` inside a relative group;
  vertically centred with `transform: translate(X, -50%)`.
- **Motion**: each item runs its own CSS `@keyframes`, `linear`,
  `infinite`: `translate(100cqi, -50%)` → `translate(calc(-100% - 6px),
  -50%)` — from just past the right edge to just past the left edge. Both
  ends are off-screen, so the per-item restart is invisible.
- **Seamless parade**: stagger with a negative `animation-delay`:
  `calc((var(--i) - <count>) * <duration> / <count>)`. Every item shares
  the same duration, so spacing = journey / count stays constant and the
  order of appearance follows the index order. No copy of the set exists.
- **Continuous loop**: never pauses — no hover stop, no reduced-motion
  stop (specimen default). Add a pause (`animation-play-state: paused`)
  only if explicitly asked.

```css
.marquee {
  position: relative;
  overflow: hidden;           /* clips only, no scrollbar */
  container-type: inline-size;
  height: 64px;
}

.item {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(100cqi, -50%);
  animation: scroll-left var(--dur) linear infinite;
  animation-delay: calc((var(--i) - var(--count)) * var(--dur) / var(--count));
}

@keyframes scroll-left {
  from { transform: translate(100cqi, -50%); }
  to   { transform: translate(calc(-100% - 6px), -50%); }
}
```
