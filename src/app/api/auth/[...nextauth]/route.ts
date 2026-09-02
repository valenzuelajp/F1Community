import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';

/**
 * NextAuth API Route Handlers (GET & POST)
 * Handles incoming authentication requests for Next.js 14 App Router.
 */
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

