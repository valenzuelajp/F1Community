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

> [!tip] Adding a note
> Append to the table above with today's date any time the product decision changes.

---

*Last updated: 2026-09-23 · Part of the [[README|F1Store Wiki]]*