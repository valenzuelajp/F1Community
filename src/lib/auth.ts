import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { loginSchema } from '@/lib/validations/auth';

/**
 * NextAuth.js v4 Configuration
 * Configures authentication providers (Credentials),
 * custom pages (/login), and JWT session callbacks.
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
        // 1. Validate credentials with Zod schema
        const validatedFields = loginSchema.safeParse(credentials);

        if (!validatedFields.success) {
          return null;
        }

        const { email, password } = validatedFields.data;

        // 2. Demo authentication check (Will connect to Prisma database user lookup in Phase 3)
        if (email && password.length >= 6) {
          return {
            id: 'f1-fan-1',
            name: 'Lewis Fan',
            email: email,
            image: '/avatars/driver-placeholder.jpg',
            role: 'CUSTOMER',
          };
        }

        return null;
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
  secret: process.env.NEXTAUTH_SECRET || 'f1-store-dev-secret-key-1234567890',
};

