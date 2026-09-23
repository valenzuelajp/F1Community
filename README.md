# F1Community

> A Formula 1 community platform combining F1 data, race schedules, standings, news, predictions, discussion, member accounts, and a future merchandise experience — built around one cohesive product and one account system.

**Repository:** `valenzuelajp/F1Community`  
**Framework:** Next.js 14 / App Router  
**Language:** TypeScript  
**Database:** PostgreSQL + Prisma  
**Authentication:** NextAuth.js v4 + credentials authentication  
**F1 data:** Jolpica / Ergast-compatible API integration  
**Package manager:** pnpm  
**Testing:** Vitest + Playwright  
**Deployment target:** Vercel + Neon PostgreSQL

---

## Table of Contents

- [What Is F1Community?](#what-is-f1community)
- [Project Vision](#project-vision)
- [Current Status](#current-status)
- [Product Areas](#product-areas)
- [Authentication](#authentication)
- [F1 Data](#f1-data)
- [UI and Design Direction](#ui-and-design-direction)
- [Architecture](#architecture)
- [Repository Structure](#repository-structure)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database](#database)
- [Available Scripts](#available-scripts)
- [Development Workflow](#development-workflow)
- [Testing and Quality Gates](#testing-and-quality-gates)
- [Security Requirements](#security-requirements)
- [Accessibility Requirements](#accessibility-requirements)
- [Performance and SEO](#performance-and-seo)
- [Design Reference and Visual Accuracy](#design-reference-and-visual-accuracy)
- [F1Community Page Map](#f1community-page-map)
- [Roadmap](#roadmap)
- [Definition of Done](#definition-of-done)
- [Documentation / Wiki](#documentation--wiki)
- [Contributing](#contributing)
- [Git Workflow](#git-workflow)
- [Troubleshooting](#troubleshooting)
- [Important Development Rules](#important-development-rules)
- [License](#license)

---

# What Is F1Community?

F1Community is a Formula 1-focused web platform designed around **one account, multiple connected experiences**.

The project is evolving from its original F1 merchandise/store foundation into a broader F1 community product. The long-term platform is intended to combine:

1. **F1 information** — schedules, sessions, standings, drivers, teams, circuits, results, and live-session information.
2. **Community** — discussion, member profiles, predictions, participation, and future social/community features.
3. **News** — curated or integrated Formula 1 news and race-weekend information.
4. **Store** — a future merchandise/e-commerce experience integrated into the same platform and account system.
5. **Authentication** — one account system shared across the F1, community, and store experiences.

The goal is not to create several disconnected websites. The goal is one coherent product with a common design system, account system, navigation model, information architecture, security model, and engineering workflow.

---

# Project Vision

```text
                         F1COMMUNITY
                              |
             +----------------+----------------+
             |                |                |
             v                v                v
          F1 DATA          COMMUNITY          NEWS
             |                |                |
       schedules          discussion       race news
       standings          predictions      articles
       drivers            profiles         updates
       teams              leaderboard
       circuits
       live
             |
             +----------------+----------------+
                              |
                              v
                            STORE
                              |
                       merchandise / sales
```

The platform should feel like an F1 product first and a collection of technical features second.

Core principles:

- F1-specific visual language
- strong race-weekend hierarchy
- fast access to schedules and standings
- clear live/offline states
- responsive layouts
- accessible interaction
- trustworthy data presentation
- secure accounts
- reusable components
- predictable project organization

---

# Current Status

## Phase 0 — Foundation / Authentication

The project currently has a working foundation for:

- Next.js App Router
- TypeScript
- PostgreSQL + Prisma
- database migrations
- credentials-based authentication
- registration
- bcrypt password hashing
- Zod validation
- dynamic F1 content on the authentication experience
- F1 API service utilities
- project wiki and architecture documentation

### Authentication is functional, but not production-complete

The following still need to be completed before authentication should be treated as production-ready:

- [ ] forgot-password / password-reset flow
- [ ] email verification
- [ ] authentication rate limiting
- [ ] production-safe secret enforcement
- [ ] consistent email normalization
- [ ] final password policy
- [ ] actual Remember Me behavior
- [ ] safe callback URL handling
- [ ] accessible labels and controls
- [ ] functional mobile navigation
- [ ] logout/session UX
- [ ] protected member routes
- [ ] account management
- [ ] login/register visual parity
- [ ] complete authentication E2E coverage

A working login form is not the same thing as production-ready authentication.

---

# Product Areas

## F1 Home

The main F1 entry point should provide the current race-weekend context, including:

- current race
- current session
- countdowns
- live/offline state
- schedule preview
- standings preview
- drivers
- teams
- news
- community entry points
- predictions

## Schedule

The schedule experience should support:

- season calendar
- race weekends
- practice sessions
- qualifying
- sprint sessions where applicable
- race
- session dates/times
- circuit information
- completed/upcoming/live states
- race results

## Standings

Planned standings include:

- driver championship
- constructor championship
- points
- position
- movement/change where supported
- season context

## Drivers

The driver area should provide:

- driver identity
- team
- number
- nationality
- championship position
- points
- race results
- season statistics

## Teams

The team area should provide:

- team identity
- logo
- drivers
- championship position
- points
- season results

## Live F1

The live experience will eventually provide race-weekend/session information from a suitable data source.

Until real live timing is integrated, the UI must **not fabricate telemetry**. If a live feed is unavailable, the interface should clearly communicate that state.

## News

The news area will eventually define:

- source attribution
- article metadata
- images
- categories
- publication date
- article pages
- SEO metadata
- empty/error states

## Community

The community experience is a core long-term feature.

Planned capabilities include:

- discussion
- posts
- comments/replies
- member profiles
- predictions
- participation
- leaderboard
- race-weekend interaction

## Store

The store is a future/secondary product area and should not block the F1/community foundation.

Future store capabilities include:

- product catalog
- product details
- categories
- cart
- checkout
- orders
- inventory
- customer account
- administrative management
- payment processing

---

# Authentication

Authentication currently uses **NextAuth.js v4 credentials authentication** backed by the application's PostgreSQL database.

## Current architecture

```text
REGISTER
   |
   v
RegisterForm
   |
   v
Zod validation
   |
   v
registerUser()
   |
   v
bcrypt password hash
   |
   v
Prisma
   |
   v
PostgreSQL / Neon


LOGIN
   |
   v
LoginForm
   |
   v
Zod validation
   |
   v
NextAuth Credentials
   |
   v
authorize()
   |
   v
Prisma
   |
   v
bcrypt.compare()
   |
   v
JWT session
```

## Authentication principles

The authentication system must:

- never store plaintext passwords
- hash passwords with bcrypt
- validate input server-side
- normalize account identifiers consistently
- avoid exposing account existence during sensitive recovery operations
- rate-limit authentication endpoints
- use secure production secrets
- use secure cookie/session configuration in production
- validate redirect/callback destinations
- enforce authorization server-side
- provide useful but non-sensitive errors
- invalidate appropriate sessions after security-sensitive account changes

## Login

The login experience is designed around the project's F1 visual reference and includes:

- email
- password
- password visibility control
- Remember Me
- Forgot Password
- login action
- guest entry where the product configuration allows it
- registration entry
- dynamic F1/race-weekend visual content

### Login completion checklist

- [ ] credential authentication
- [ ] loading state
- [ ] invalid credential state
- [ ] network/server failure state
- [ ] accessible labels
- [ ] keyboard-accessible controls
- [ ] password visibility control
- [ ] Remember Me behavior
- [ ] Forgot Password
- [ ] rate limiting
- [ ] safe callback handling
- [ ] production secret validation
- [ ] logout
- [ ] session expiration behavior
- [ ] E2E coverage

## Register

Registration currently supports basic account creation and should evolve into full account onboarding.

Target fields:

- display name
- username
- email
- password
- confirm password
- terms/privacy acceptance

Target lifecycle:

```text
Registration form
      |
      v
Client validation
      |
      v
Server validation
      |
      v
Normalize email
      |
      v
Check account uniqueness
      |
      v
Hash password
      |
      v
Create account
      |
      v
Email verification
      |
      v
Account ready
      |
      v
Login / member hub
```

### Registration completion checklist

- [ ] shared validation policy
- [ ] confirm password
- [ ] password strength feedback
- [ ] email normalization
- [ ] username validation
- [ ] terms/privacy acceptance
- [ ] duplicate account handling
- [ ] email verification
- [ ] rate limiting
- [ ] accessible labels
- [ ] keyboard support
- [ ] loading/error/success states
- [ ] E2E coverage

---

# F1 Data

The project uses an F1 data service layer rather than scattering external API requests throughout React components.

## Data flow

```text
External F1 API
      |
      v
F1 service / adapter layer
      |
      v
Normalized application data
      |
      v
Server components / route handlers
      |
      v
React UI
```

Principles:

- keep external API calls out of presentational components
- normalize API responses
- cache where appropriate
- handle upstream failures
- expose explicit unavailable states
- distinguish current season from historical data
- never fabricate missing live data
- isolate API-specific naming from UI components

Target F1 data includes:

- seasons
- races
- circuits
- sessions
- drivers
- constructors
- driver standings
- constructor standings
- qualifying results
- race results
- sprint results
- pit-stop data where available
- lap/timing data where a reliable live provider is available

---

# UI and Design Direction

The project uses a strong Formula 1-inspired visual language based on supplied reference designs.

The primary reference currently being developed around is the F1 authentication/home composition containing:

- black/dark shell
- F1 red accent
- F1 logo treatment
- top navigation
- large editorial hero typography
- race/session messaging
- driver imagery
- login card
- live ticker
- team logos
- tire compound strip
- footer/navigation system

The visual reference is a **design specification**, not a single background image.

The implementation must use real HTML, React components, CSS, accessible controls, and real data.

## Visual accuracy target

The approved reference should be reproduced as accurately as possible at its reference viewport.

Visual QA should compare:

- header height
- logo placement
- navigation spacing
- typography
- hero dimensions
- hero title placement
- driver image placement
- login card dimensions
- login card position
- ticker height
- team spacing
- tire strip positioning
- footer proportions
- borders
- shadows
- colors
- responsive behavior

“Pixel accurate” applies to the approved reference viewport. Other screen sizes should preserve the design system with intentional responsive behavior rather than forcing one desktop screenshot into every viewport.

---

# Architecture

F1Community uses a Next.js App Router architecture.

```text
Application routes
        |
        v
Feature components
        |
        v
Domain/service layer
        |
        +------> F1 API
        |
        +------> Database / Prisma
        |
        +------> Authentication
        |
        +------> News providers
        |
        +------> Store/payment services
```

## Architecture principles

### Components have clear responsibilities

Avoid putting an entire complex page into one giant component when it contains independent visual systems.

A target F1 authentication composition is:

```text
F1PageShell
├── F1Header
├── F1Hero
│   ├── HeroBackground
│   ├── HeroTitle
│   ├── HeroDriver
│   └── LoginCard
├── LiveTicker
├── TeamStrip
├── TireCompoundStrip
└── F1Footer
```

### UI should not own domain logic unnecessarily

Use service functions for F1 data, database operations, and domain actions.

### Authentication logic belongs server-side

Do not implement credential verification only in client code.

### External providers should be isolated

The UI should not need to know whether data came from Jolpica, Ergast-compatible endpoints, or a future provider.

### Prefer reusable primitives

Common UI patterns should be shared:

- buttons
- inputs
- cards
- alerts
- loading states
- empty states
- error states
- dialogs
- navigation

---

# Repository Structure

```text
F1Community/
│
├── .github/
│   └── workflows/                 # CI/CD workflows
│
├── assets/                        # Design/reference/source assets
│
├── f1storewiki/                   # Project documentation and planning wiki
│   ├── README.md
│   ├── PROJECT_OVERVIEW.md
│   ├── PROGRESS.md
│   ├── ROADMAP.md
│   ├── TASKS.md
│   ├── ARCHITECTURE.md
│   ├── DEVELOPMENT.md
│   ├── SECURITY.md
│   ├── DATABASE.md
│   ├── GAPS.md
│   ├── F1_API_REFERENCE.md
│   ├── LOGIN_LANDING_PAGE.md
│   ├── COMMUNITY_HUB.md
│   ├── SEO.md
│   └── ...
│
├── prisma/
│   ├── schema.prisma               # Database schema
│   ├── migrations/                 # Migration history
│   └── seed.ts                     # Development seed data
│
├── public/                         # Public website assets
│
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── actions/                # Server actions
│   │   ├── api/                    # Route handlers
│   │   ├── login/                  # Login UI
│   │   ├── register/               # Registration UI
│   │   ├── home/                   # Home/member experience
│   │   ├── globals.css             # Global CSS
│   │   └── layout.tsx              # Root layout
│   │
│   ├── components/
│   │   ├── auth/                   # Authentication components
│   │   ├── layout/                 # Shared layout components
│   │   ├── f1/                     # F1 components as the platform grows
│   │   └── ui/                     # Reusable UI primitives
│   │
│   └── lib/
│       ├── auth/                   # Authentication helpers
│       ├── db/                     # Database helpers
│       ├── f1/                     # F1 services
│       ├── validation/             # Zod schemas
│       └── ...
│
├── .env.example
├── docker-compose.yml
├── next.config.js
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
└── README.md
```

The tree will evolve as the F1, community, and store domains become more complete. Keep the wiki's `FILE_TREE.md` synchronized with major structural changes.

---

# Technology Stack

| Area | Technology |
|------|------------|
| Framework | Next.js 14 |
| Rendering | React / App Router |
| Language | TypeScript |
| Styling | CSS / Tailwind where appropriate |
| Database | PostgreSQL |
| ORM | Prisma |
| Authentication | NextAuth.js v4 |
| Password hashing | bcrypt / bcryptjs |
| Validation | Zod |
| F1 data | Jolpica / Ergast-compatible API |
| Client state | React / Zustand where appropriate |
| Unit tests | Vitest |
| E2E tests | Playwright |
| Hosting | Vercel target |
| Database hosting | Neon target |
| Payments | Stripe planned for store |
| Design | Figma / reference-driven workflow |

---

# Prerequisites

Recommended local environment:

- Node.js 20+
- pnpm
- PostgreSQL 15+ or Neon PostgreSQL
- Git
- modern Chromium/Firefox/Safari browser

---

# Getting Started

## 1. Clone

```bash
git clone https://github.com/valenzuelajp/F1Community.git
cd F1Community
```

## 2. Install

```bash
pnpm install
```

## 3. Configure environment

```bash
cp .env.example .env.local
```

Edit `.env.local` with local database and authentication configuration.

Never commit `.env.local` or real secrets.

## 4. Generate Prisma client

```bash
pnpm db:generate
```

## 5. Apply migrations

For an existing database:

```bash
pnpm db:migrate deploy
```

For local development:

```bash
pnpm db:migrate
```

## 6. Seed development data when needed

```bash
pnpm db:seed
```

Seed accounts are for local development only. Do not expose development credentials or seeded passwords in production documentation or UI.

## 7. Start development server

```bash
pnpm dev
```

Open `http://localhost:3000`.

---

# Environment Variables

Use `.env.example` as the authoritative list of variable names.

Typical categories include:

```text
DATABASE_URL
NEXTAUTH_SECRET
NEXTAUTH_URL
F1 API configuration
future email configuration
future payment configuration
```

Rules:

- never commit `.env.local`
- never place production secrets in source code
- never use a known fallback secret in production
- rotate compromised secrets immediately
- use separate development/production credentials
- use platform secret storage for deployment

Production should fail clearly if a required security secret is missing.

---

# Database

The database is PostgreSQL accessed through Prisma.

## Workflow

```bash
pnpm db:generate
pnpm db:migrate
pnpm db:studio
pnpm db:seed
```

## Rules

- schema changes must be intentional
- migrations must be committed with related code
- do not manually alter production tables without a migration plan
- test migrations before deployment
- do not expose database credentials
- use transactions where related writes must succeed together
- add indexes for frequently queried fields as the product grows

---

# Available Scripts

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Start development server |
| `pnpm build` | Create production build |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm typecheck` | Run TypeScript checks |
| `pnpm test` | Run unit tests |
| `pnpm test:e2e` | Run Playwright E2E tests |
| `pnpm db:generate` | Generate Prisma client |
| `pnpm db:migrate` | Create/apply development migration |
| `pnpm db:migrate deploy` | Apply committed migrations |
| `pnpm db:studio` | Open Prisma Studio |
| `pnpm db:seed` | Seed development data |

Before considering a feature complete, run the relevant lint, typecheck, test, build, and manual QA checks.

---

# Development Workflow

```text
Plan
  |
  v
Design
  |
  v
Implement
  |
  v
Data/API
  |
  v
Loading + empty + error states
  |
  v
Security
  |
  v
Accessibility
  |
  v
Tests
  |
  v
Performance
  |
  v
Documentation
  |
  v
Visual / functional QA
  |
  v
Deploy
  |
  v
Production verification
```

A feature is not complete simply because its primary screen renders.

---

# Testing and Quality Gates

## Unit tests

Use unit tests for:

- validation schemas
- utility functions
- data normalization
- domain logic
- authentication helpers

## Integration tests

Use integration tests for:

- database operations
- authentication operations
- API/service adapters
- important server actions

## E2E tests

Critical journeys should include:

```text
Register
  -> verification
  -> login
  -> protected member area
  -> logout
```

and:

```text
Login
  -> invalid credentials
  -> valid credentials
  -> redirect
  -> protected route
```

## Minimum authentication matrix

| Scenario | Expected result |
|----------|-----------------|
| Valid login | User authenticated |
| Wrong password | Generic authentication error |
| Unknown account | Generic authentication error |
| Empty email | Validation error |
| Invalid email | Validation error |
| Empty password | Validation error |
| Registration success | Account created |
| Duplicate email | Safe error |
| Duplicate username | Safe error |
| Password mismatch | Validation error |
| Invalid password | Validation error |
| Logout | Session cleared |
| Protected route unauthenticated | Redirect/deny |
| Expired session | Re-authentication required |
| Password reset request | Generic response |
| Invalid reset token | Reset rejected |
| Used reset token | Reset rejected |

---

# Security Requirements

Security is a release requirement, not an optional enhancement.

## Baseline

- HTTPS in production
- secure cookies
- appropriate SameSite behavior
- production-grade authentication secret
- server-side validation
- password hashing
- rate limiting
- CSRF protections where applicable
- safe redirect handling
- authorization checks on protected resources
- role enforcement for administrative features
- safe error messages
- no secrets in source control
- no plaintext passwords
- dependency security review
- security headers where appropriate
- safe database access

## Authentication security

The completed system should support:

- login throttling
- password recovery with short-lived single-use tokens
- email verification
- session invalidation after sensitive account changes
- password change flow
- account/session management
- generic password-reset responses
- protection against account enumeration

## Admin security

Administrative capabilities must never rely only on hidden UI controls. Every sensitive server action must verify authorization server-side.

---

# Accessibility Requirements

Accessibility is part of the definition of done.

Forms should provide:

- real labels
- keyboard operation
- visible focus
- appropriate autocomplete attributes
- clear validation errors
- accessible error announcements where necessary
- accessible password visibility controls
- semantic buttons and links
- sufficient contrast
- meaningful headings
- alt text for meaningful images

The F1 visual aesthetic must not override basic accessibility requirements.

---

# Performance and SEO

## Performance

- optimize large F1 images
- avoid unnecessary client-side JavaScript
- use Server Components where appropriate
- lazy-load non-critical imagery
- cache appropriate F1 data
- avoid repeated upstream requests
- prevent layout shift
- keep interactive components focused

## SEO

Important public F1 pages should eventually have:

- unique title
- useful description
- canonical URL
- Open Graph metadata
- social metadata where appropriate
- structured data where appropriate
- crawlable content
- descriptive URLs
- meaningful headings

Authenticated/private pages should be treated appropriately for indexing.

---

# Design Reference and Visual Accuracy

The login experience currently acts as one of the primary visual references for the platform.

The reference contains:

```text
F1 header
   |
   v
Hero / race-weekend composition
   |
   +-- large outlined editorial title
   +-- F1/race imagery
   +-- login card
   +-- race/session metadata
   |
   v
Live ticker
   |
   v
Team strip
   |
   v
Tire compound strip
   |
   v
Footer
```

## Implementation rule

Do not implement the reference as one giant screenshot/background.

The design must be recreated using:

- semantic HTML
- React components
- CSS
- real assets
- responsive behavior
- accessible controls
- dynamic data

## Recommended component decomposition

```text
components/
└── f1/
    ├── shell/
    │   ├── F1Header.tsx
    │   └── F1Footer.tsx
    ├── hero/
    │   ├── F1Hero.tsx
    │   ├── HeroBackground.tsx
    │   ├── HeroTitle.tsx
    │   └── HeroDriver.tsx
    ├── auth/
    │   └── LoginCard.tsx
    ├── live/
    │   └── LiveTicker.tsx
    ├── teams/
    │   └── TeamStrip.tsx
    └── tires/
        └── TireCompoundStrip.tsx
```

This is a target architecture and should be introduced deliberately rather than through an uncontrolled rewrite.

---

# F1Community Page Map

The long-term application is expected to evolve toward:

```text
/
├── schedule/
├── standings/
├── drivers/
├── drivers/[driverId]/
├── teams/
├── teams/[teamId]/
├── circuits/
├── circuits/[circuitId]/
├── live/
├── news/
├── news/[slug]/
│
├── community/
│   ├── discussions/
│   ├── discussions/[id]/
│   ├── predictions/
│   ├── leaderboard/
│   └── members/[username]/
│
├── login/
├── register/
├── forgot-password/
├── reset-password/
├── verify-email/
│
├── account/
│   ├── profile/
│   ├── security/
│   └── sessions/
│
└── store/
    ├── products/
    ├── products/[slug]/
    ├── cart/
    ├── checkout/
    └── orders/
```

This is a target map; actual routes may evolve as implementation proceeds.

---

# Roadmap

## Phase 0 — Foundation

- [x] Next.js foundation
- [x] TypeScript foundation
- [x] Prisma/PostgreSQL foundation
- [x] credentials authentication foundation
- [x] registration foundation
- [x] F1 service foundation
- [ ] password recovery
- [ ] email verification
- [ ] rate limiting
- [ ] complete session/account management
- [ ] security hardening
- [ ] final authentication E2E coverage

## Phase 1 — F1 MVP

- [ ] schedule
- [ ] standings
- [ ] drivers
- [ ] teams
- [ ] circuits
- [ ] race results
- [ ] news foundation

## Phase 2 — Live F1

- [ ] live session detection
- [ ] supported live data
- [ ] live timing where a reliable provider is available
- [ ] graceful unavailable state
- [ ] race-weekend dashboard

## Phase 3 — Community

- [ ] member profiles
- [ ] discussion
- [ ] comments/replies
- [ ] predictions
- [ ] leaderboard
- [ ] race-weekend interaction

## Phase 4 — Store

- [ ] catalog
- [ ] product pages
- [ ] cart
- [ ] checkout
- [ ] payments
- [ ] orders
- [ ] inventory
- [ ] administration

## Phase 5 — Production

- [ ] security review
- [ ] accessibility review
- [ ] performance review
- [ ] SEO review
- [ ] legal/privacy review
- [ ] complete automated tests
- [ ] monitoring
- [ ] backups
- [ ] deployment verification
- [ ] final QA

---

# Definition of Done

A feature is not complete because its main UI exists.

Expected lifecycle:

```text
Design
  -> Build
  -> Data/API
  -> Loading state
  -> Empty state
  -> Error state
  -> Security
  -> Accessibility
  -> Tests
  -> Performance
  -> Documentation
  -> Deployment
  -> Production verification
```

## G0 — Foundation

- [ ] architecture documented
- [ ] database stable
- [ ] authentication secure
- [ ] authorization defined
- [ ] CI/CD operational
- [ ] security baseline complete

## G1 — F1 MVP

- [ ] schedule
- [ ] standings
- [ ] drivers
- [ ] teams
- [ ] news foundation

## G2 — Live F1

- [ ] live session detection
- [ ] supported live data
- [ ] graceful unavailable state
- [ ] live UI performance verified

## G3 — Store

- [ ] catalog
- [ ] cart
- [ ] checkout
- [ ] payments
- [ ] orders
- [ ] inventory
- [ ] admin

## G4 — Production

- [ ] security review
- [ ] accessibility review
- [ ] performance review
- [ ] SEO review
- [ ] legal/privacy review
- [ ] test suite passing
- [ ] monitoring
- [ ] backups
- [ ] deployment verification
- [ ] final QA

---

# Documentation / Wiki

The `f1storewiki/` directory is the project's planning and engineering knowledge base.

Important documents include:

| Document | Purpose |
|----------|---------|
| `PROJECT_OVERVIEW.md` | Product and project overview |
| `PROGRESS.md` | Current implementation status |
| `ROADMAP.md` | Development roadmap |
| `TASKS.md` | Current task/backlog tracking |
| `ARCHITECTURE.md` | Architecture decisions |
| `DEVELOPMENT.md` | Development standards and workflow |
| `SECURITY.md` | Security requirements and hardening |
| `DATABASE.md` | Database and Prisma documentation |
| `GAPS.md` | Known gaps and technical debt |
| `F1_API_REFERENCE.md` | F1 API integration reference |
| `LOGIN_LANDING_PAGE.md` | Login design and implementation notes |
| `COMMUNITY_HUB.md` | Community hub direction |
| `SEO.md` | Search/metadata strategy |
| `FILE_TREE.md` | Repository structure reference |

## Documentation rule

When a significant implementation changes:

1. update the relevant code
2. update tests
3. update the relevant wiki document
4. update progress/task status
5. record architecture decisions when appropriate
6. keep planned and implemented functionality clearly separated

Documentation must not claim a feature is implemented when it is only planned.

---

# Contributing

Before making changes:

1. Read this README.
2. Read the relevant wiki document.
3. Check `TASKS.md`.
4. Check `PROGRESS.md`.
5. Check `GAPS.md` for known problems.
6. Understand the current architecture.
7. Avoid unrelated refactors.
8. Add or update tests for behavior changes.
9. Update documentation when architecture or workflows change.

## Code quality expectations

New code should:

- use TypeScript appropriately
- avoid unnecessary `any`
- have clear names
- keep functions focused
- separate UI and domain logic
- validate external/user input
- handle errors explicitly
- provide loading/empty/error states
- be keyboard accessible
- avoid duplicated business logic
- avoid hardcoded secrets
- avoid fake data presented as real data

---

# Git Workflow

Use branches for development work.

```text
main
 |
 +---- feature/auth-improvements
 +---- feature/schedule
 +---- feature/community
 +---- fix/login-accessibility
 +---- docs/project-readme
```

Rules:

- keep `main` stable
- use descriptive branch names
- keep commits focused
- do not mix unrelated changes
- update documentation with meaningful architecture changes
- review diffs before merging
- run validation before merging

Suggested commit style:

```text
feat: add race schedule service
fix: normalize login email
security: add auth rate limiting
docs: update authentication architecture
refactor: split F1 hero components
test: add login e2e coverage
```

---

# Troubleshooting

## Database connection problems

Check:

1. `DATABASE_URL`
2. database availability
3. Prisma client generation
4. migration state
5. network access

Try:

```bash
pnpm db:generate
pnpm db:migrate
pnpm db:studio
```

## Authentication problems

Check:

1. `NEXTAUTH_SECRET`
2. `NEXTAUTH_URL`
3. database connection
4. user record
5. password hash
6. browser cookies
7. callback/redirect destination
8. server logs

## Build failures

Run:

```bash
pnpm lint
pnpm typecheck
pnpm build
```

Fix the first meaningful error before chasing downstream errors.

## Styling problems

Check:

- global CSS
- page CSS
- responsive breakpoint
- asset dimensions
- stacking context / z-index
- font loading
- browser viewport

For reference-driven pages, compare against the approved screenshot instead of making arbitrary visual changes.

---

# Important Development Rules

## 1. Do not fake F1 data

If a live API does not provide data, show a clear unavailable state.

Do not invent:

- lap numbers
- driver positions
- timing
- race status
- telemetry
- results

## 2. Do not fake security

A button labelled “Forgot Password” is not a password recovery system.

A checkbox labelled “Remember Me” is not Remember Me unless session behavior changes.

A hidden admin button is not authorization.

A login form is not production authentication without the surrounding security lifecycle.

## 3. Do not expose secrets

Never commit:

- production database URLs
- API keys
- NextAuth secrets
- Stripe secrets
- email credentials
- private tokens
- production passwords

## 4. Do not treat design as an image

The F1 reference design must be recreated as real UI.

## 5. Keep planned and implemented features separate

Use:

- **Implemented**
- **In progress**
- **Planned**
- **Blocked**
- **Deferred**

Do not describe planned features as working features.

## 6. Prefer understandable components

Another developer should be able to open a page and quickly understand:

- what the page renders
- where its data comes from
- which components it uses
- where its business logic lives
- how it handles errors

## 7. Preserve the F1 design language

New features should feel like part of the same product.

Use shared:

- typography
- spacing
- color tokens
- borders
- motion principles
- card patterns
- navigation patterns
- responsive behavior

## 8. Accessibility is not optional

Every new interactive component should work with keyboard navigation and provide meaningful semantics.

## 9. Test before declaring completion

At minimum validate the relevant:

```text
lint
  +
typecheck
  +
tests
  +
build
  +
manual QA
```

## 10. Update the documentation

If implementation changes the architecture, route structure, authentication behavior, API strategy, database, security posture, or product scope, update the wiki.

---

# License

Private project — All rights reserved.

This project is not an official Formula 1 / FIA / Liberty Media product unless explicitly stated otherwise. Formula 1-related names, marks, logos, team marks, driver images, and other third-party assets remain subject to their respective owners' rights and licenses.

---

# Project Principle

> **Build the F1 experience first. Build the community around it. Keep one account across the platform. Make every feature understandable, secure, accessible, testable, and maintainable.**

---

_Last README review: 2026-09-23_
