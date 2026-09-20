import { PrismaClient } from '@prisma/client';

// Reuse a single PrismaClient across server requests (serverless-friendly).
// Do not `new PrismaClient()` per request — connection exhaustion on cold starts.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const db = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db;
}