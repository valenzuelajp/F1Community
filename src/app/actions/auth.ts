'use server';

import { Prisma } from '@prisma/client';
import { hash } from 'bcryptjs';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { registerSchema, type RegisterInput } from '@/lib/validations/auth';

/**
 * Registration server action.
 * Validates with Zod, hashes the password (bcrypt, cost 12), then inserts
 * into the `users` table. Unique violations (email/username) return a
 * user-facing error instead of throwing.
 */
export async function registerUser(input: RegisterInput): Promise<{ error?: string }> {
  const parsed = registerSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Please check your details.' };
  }

  const { name, username, email, password } = parsed.data;
  const passwordHash = await hash(password, 12);

  try {
    await db.user.create({
      data: {
        username,
        email: email.toLowerCase(),
        name: name || username,
        passwordHash,
      },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
      return { error: 'That email or username is already taken. Try logging in instead.' };
    }
    return { error: 'Could not create your account right now. Please try again.' };
  }

  redirect('/login?registered=1');
}