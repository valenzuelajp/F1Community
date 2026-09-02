import { z } from 'zod';

/**
 * Login Form Validation Schema using Zod.
 * Zod provides type-safe runtime validation for both Client (React Hook Form)
 * and Server (Server Actions / NextAuth API Routes).
 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email address is required' })
    .email({ message: 'Please enter a valid email address (e.g. user@f1.com)' }),
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .min(6, { message: 'Password must be at least 6 characters long' }),
  rememberMe: z.boolean().default(false).optional(),
});

/**
 * TypeScript type inferred directly from Zod schema.
 * Ensures complete type safety across client form state and server payload.
 */
export type LoginInput = z.infer<typeof loginSchema>;
