# Agent Rules

Rules the AI assistant MUST always follow when working in this repository.

## ️GitHub / Git — DO NOT TOUCH

- **Never interact with GitHub** (or any other git remote).
- **Never** commit, push, pull, fetch, fork, open PRs, create/delete branches,
  or run the `gh` CLI — unless the user explicitly says to.
- The working copy lives on the local `A:` drive. Keep ALL work there.
- Do not run `git add` / `git commit` on your own. The user commits their own work.
- If you ever touched git by mistake, say so immediately and offer to undo it.

## Working style

- Document what you did in `f1storewiki/` when the user asks (they like a
  written memory record on disk).
- Follow the existing conventions in `f1storewiki/DEVELOPMENT.md`.

## Progress → Wiki (Wynn)

Every time progress is made (feature, fix, refactor, UI change), update the
wiki (`f1storewiki/PROGRESS.md` and any other relevant page) with **what was
adjusted**.

- Tag Wynn’s changes with the special identifier **`Wynn`** so other
  developers know what was interacted with or changed by Wynn.
- Example: `**Wynn:** rebuilt /components-wynn grid; removed card glow`
- Prefer a short bullet list under a dated section/heading for each progress pass.
- Keep shared files (login, PROGRESS, etc.) in sync with `main` when possible
  to reduce merge conflicts.

## Copy TSX / Copy CSS exports

When generating paste-ready **Copy TSX** / **Copy CSS** (or similar export chips):

- **Bake** decisions already resolved at copy time (variant, labels, accent,
  background, block order) into the final output.
- Emit the final `className` / CSS rules — **do not** emit runtime branches the
  recipient does not need (e.g. no `const isSvg = true` + ternary when the
  variant is fixed for that copy).
- Copy CSS should include **only** rules that apply to the selected variant.
- Live showcase components may keep runtime props; **exports should not**.
- **TSX must be a single module**: at most one `'use client'`, one import block
  at the top, no mid-file directives/imports after component bodies.
- **Import hygiene**: emit only imports the selected blocks/variant need
  (no unused `useRef` / `MouseEvent` / lucide icons).
- **CSS width must match the TSX width** baked at copy time (no hard-coded
  default that fights the inline style).
- Dedupe shared CSS rules when composing Mini Login blocks (e.g. `.auth__input`
  once for email+password; `.auth__btn-label` / `.auth__btn-arrow` /
  `.components-auth-arrow` once for login+guest).
