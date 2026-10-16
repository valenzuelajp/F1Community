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
