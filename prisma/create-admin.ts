// Create (or ensure) an admin login without touching any other data.
//
// Run with: npm run db:admin
// Reads DATABASE_URL from the environment (.env.local, never committed).
// Unlike `prisma/seed.ts`, this script is NON-DESTRUCTIVE: it upserts a
// single user by email and never deletes anything, so it is safe to run
// against a shared/dev database to verify the DB connection works.
//
// Credentials come from the environment with seed-compatible defaults:
//   ADMIN_EMAIL=admin@f1store.com ADMIN_USERNAME=admin ADMIN_PASSWORD=admin123
// If the user already exists, only the role is ensured (ADMIN) — an
// existing password is never overwritten.

import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

interface AdminResult {
  id: string;
  email: string;
  username: string;
  role: string;
  created: boolean;
}

async function ensureAdmin(): Promise<AdminResult> {
  const email = (process.env.ADMIN_EMAIL ?? 'admin@f1store.com').trim().toLowerCase();
  const username = (process.env.ADMIN_USERNAME ?? 'admin').trim();
  const password = process.env.ADMIN_PASSWORD ?? 'admin123';

  const existing = await prisma.user.findUnique({
    where: { email },
    select: { id: true, email: true, username: true, role: true },
  });

  if (existing) {
    if (existing.role !== 'ADMIN') {
      await prisma.user.update({ where: { email }, data: { role: 'ADMIN' } });
    }
    return { ...existing, role: 'ADMIN', created: false };
  }

  const passwordHash = await hash(password, 12);
  const created = await prisma.user.create({
    data: {
      email,
      username,
      name: 'Admin User',
      passwordHash,
      role: 'ADMIN',
      emailVerified: new Date(),
    },
    select: { id: true, email: true, username: true, role: true },
  });
  return { ...created, created: true };
}

async function main(): Promise<void> {
  // Proves the connection works before touching the users table.
  await prisma.$queryRaw`SELECT 1`;
  console.log('DB connection OK');

  const admin = await ensureAdmin();
  console.log(admin.created ? 'Admin created:' : 'Admin already exists:');
  console.log(`  ${admin.username} <${admin.email}> role=${admin.role}`);
  console.log('Sign in at /login with the admin email + password.');
}

main()
  .catch((e: unknown) => {
    console.error('db:admin failed:', e instanceof Error ? e.message : e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
