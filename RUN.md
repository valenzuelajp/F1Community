# How to Run F1Community (F1 Store)

Local development uses a **SQLite file database** — no database server, no
accounts, no cloud needed. The dev database (`prisma/dev.db`, including a
starter admin login) ships inside the clone.

## 1. Prerequisites

- **Node.js 20+** (includes npm). Check with:
  ```
  node --version
  npm --version
  ```
- **Git** (to clone the repo).
- That's it — no Postgres, Docker, or Neon account for local dev.

## 2. Clone and install

In PowerShell:

```
git clone <your-repo-url>
cd F1Community
npm install
```

## 3. Create your local env file

`.env.local` is **gitignored** (it holds secrets, so it never travels with
the repo). Each machine creates its own from the template:

```
cp .env.example .env.local
```

Then open `.env.local` and set a real `NEXTAUTH_SECRET` (any long random
string). Leave `DATABASE_URL=file:./dev.db` as is — that points at the
dev database file.

## 4. Database (usually nothing to do)

`prisma/dev.db` comes with the clone. Only run these when needed:

```
npm run db:push    # only after a schema change — syncs it into dev.db
npm run db:admin   # ensures admin@f1store.com / admin123 exists (ADMIN role, never deletes anything)
```

`npm run db:admin` prints `DB connection OK` on success — that line is your
proof the database round-trip works.

## 5. Run it

```
npm run dev
```

- Site: `http://localhost:3000` (redirects to `/home`)
- Sign in: `http://localhost:3000/login` with `admin@f1store.com` / `admin123`
- Register a new account at `http://localhost:3000/register` — it signs in
  the same way and lands on `/home`.

## 6. Other useful commands

```
npm run typecheck  # TypeScript check
npm run test:run   # unit tests (vitest)
npm run lint       # ESLint
npm run build      # production build check
```

## Troubleshooting

| Symptom | Fix |
|---|---|
| `Environment variable not found: DATABASE_URL` | You have no `.env.local` — do step 3. |
| `Can't reach database server` / login fails | Wrong `DATABASE_URL`, or the client was generated for the other schema. Dev default: `file:./dev.db` + `npm run db:generate`. |
| Port 3000 busy | Another dev server is already running — reuse it or stop it first. |
| Fresh schema change not reflected | Run `npm run db:push`, restart `npm run dev`. |

## Production (separate setup)

Production uses **Neon Postgres**, not SQLite. The owner shares the Neon
`DATABASE_URL` privately (never in a commit, chat, or wiki page) and it goes
into the host's env (e.g. Vercel env vars), not `.env.local`. Dual-schema
details live in `f1storewiki/DATABASE.md`.

## Conventions

- `dev.db` is a committed **starter file** — day-to-day data edits stay
  local-only. Two devs committing different rows = binary merge conflict.
- Ship schema via `db:push`/migrations, seed data via `db:admin`, never by
  committing a dirty `dev.db`.
- Connection strings are passwords: local `.env.local` only, **never
  committed**.
