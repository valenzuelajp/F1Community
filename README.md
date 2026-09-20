# F1Store

Official Formula 1 merchandise e-commerce platform built with Next.js 14, TypeScript, and PostgreSQL.

## Quick Start

### Prerequisites
- Node.js 20+
- PostgreSQL 15+ (or Docker)
- pnpm (recommended) or npm

### Installation

```bash
# Clone and install
git clone <repo-url>
cd F1Store
pnpm install

# Set up environment
cp .env.example .env.local
# Edit .env.local with your values (DATABASE_URL → Neon, NEXTAUTH_SECRET)

# Set up database (migrations already checked in)
pnpm db:generate
pnpm db:migrate deploy   # or pnpm db:migrate in dev
pnpm db:seed

# Start development server
pnpm dev
```

Visit `http://localhost:3000`

## Demo Accounts (from `pnpm db:seed`)

| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@f1store.com` | `admin123` |
| Customer | `customer@f1store.com` | `customer123` |

The Login page's **Demo credentials** button auto-fills the customer account.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
├── components/             # React components
│   ├── ui/                # Base UI components
│   ├── shop/              # Shop-specific components
│   └── layout/            # Layout components
├── lib/                    # Utilities, validations, constants
├── hooks/                  # Custom React hooks
├── store/                  # Zustand stores
├── types/                  # TypeScript types
└── styles/                 # Global styles

prisma/
├── schema.prisma          # Database schema
├── migrations/            # Migration history
└── seed.ts               # Development seed data
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm typecheck` | Run TypeScript compiler check |
| `pnpm test` | Run unit tests (Vitest) |
| `pnpm test:e2e` | Run E2E tests (Playwright) |
| `pnpm db:studio` | Open Prisma Studio |
| `pnpm db:migrate` | Create and run migration |

## Tech Stack

- **Framework**: Next.js 14 (App Router, Server Components)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL + Prisma ORM
- **Auth**: NextAuth.js v4 (v5 upgrade planned)
- **Payments**: Stripe
- **Testing**: Vitest + Playwright
- **Hosting**: Vercel

## Documentation

- **Wiki**: See `../f1storewiki` for project tracking, roadmap, and decisions
- **ADRs**: Architecture Decision Records in `../f1storewiki/ARCHITECTURE.md`
- **Development Guidelines**: `../f1storewiki/DEVELOPMENT.md`
- **Security Plan**: `../f1storewiki/SECURITY.md`
- **Database Guide**: `../f1storewiki/DATABASE.md`

## Contributing

1. Read the [Development Guidelines](../f1storewiki/DEVELOPMENT.md)
2. Check [Current Tasks](../f1storewiki/TASKS.md) for available work
3. Follow the [Git Workflow](../f1storewiki/DEVELOPMENT.md#git-workflow)
4. Ensure all checks pass: `pnpm lint && pnpm typecheck && pnpm test`

## License

Private - All rights reserved.