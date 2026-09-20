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

/**
 * Registration Form Validation Schema.
 * Used by the /register server action + client form.
 */
export const registerSchema = z.object({
  name: z.string().max(60).optional(),
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters' })
    .max(30, { message: 'Username must be at most 30 characters' })
    .regex(/^[a-zA-Z0-9_]+$/, { message: 'Letters, numbers and underscores only' }),
  email: z.string().min(1).email({ message: 'Please enter a valid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .max(72, { message: 'Password must be at most 72 characters long' }),
});

export type RegisterInput = z.infer<typeof registerSchema>;
