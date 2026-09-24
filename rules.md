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
