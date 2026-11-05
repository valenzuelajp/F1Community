import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import { loginSchema } from '@/lib/validations/auth';
import { checkLoginRateLimit } from '@/lib/rate-limit';
import { db } from '@/lib/db';

/**
 * Resolves the NextAuth secret. Fails closed when a real production server
 * starts without NEXTAUTH_SECRET, but stays permissive for local dev and
 * for `next build` (which evaluates this module with no env configured).
 */
function resolveAuthSecret(): string {
  const configured = process.env.NEXTAUTH_SECRET;
  if (configured) {
    return configured;
  }
  if (process.env.NODE_ENV === 'production' && process.env.NEXT_PHASE !== 'phase-production-build') {
    throw new Error('NEXTAUTH_SECRET is not set. Refusing to start with an insecure default.');
  }
  return 'f1-store-dev-secret-key-1234567890';
}

/**
 * NextAuth.js v4 Configuration
 * Configures authentication providers (Credentials),
 * custom pages (/login), and JWT session callbacks.
 *
 * `authorize()` queries the `users` table via Prisma and verifies the
 * password with bcrypt. Clients that store plaintext or no hash cannot
 * sign in — run `pnpm db:seed` to create demo users.
 */
export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // 1. Validate credentials with Zod schema (server-side re-check)
        const validatedFields = loginSchema.safeParse(credentials);

        if (!validatedFields.success) {
          return null;
        }

        const { email: rawEmail, password } = validatedFields.data;
        // Belt-and-braces: the schema already lowercases, but the DB lookup
        // must never depend on caller casing.
        const email = rawEmail.toLowerCase();

        // Throttle brute force against a single account.
        if (!checkLoginRateLimit(email)) {
          return null;
        }

        // 2. Look up the user by email in the database
        const user = await db.user.findUnique({
          where: { email },
          select: {
            id: true,
            email: true,
            username: true,
            name: true,
            image: true,
            role: true,
            passwordHash: true,
            emailVerified: true,
          },
        });

        if (!user || !user.passwordHash) {
          return null; // No user or no password set (OAuth-only account)
        }

        // 3. Constant-time bcrypt comparison
        const passwordMatches = await compare(password, user.passwordHash);

        if (!passwordMatches) {
          return null;
        }

        // 4. Return the user object; JWT callback adds id + role to the token
        return {
          id: user.id,
          name: user.name ?? user.username,
          email: user.email,
          image: user.image ?? undefined,
          role: user.role,
        };
      },
    }),
  ],
  pages: {
    signIn: '/login', // Custom F1 + Store branded login page
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role || 'CUSTOMER';
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        (session.user as Record<string, unknown>).id = token.id as string;
        (session.user as Record<string, unknown>).role = token.role as string;
      }
      return session;
    },
  },
  secret: resolveAuthSecret(),
};