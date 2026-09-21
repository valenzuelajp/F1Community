import { describe, expect, it } from 'vitest';
import { loginSchema, registerSchema } from './auth';

describe('loginSchema', () => {
  it('accepts valid credentials and defaults rememberMe to false', () => {
    expect(loginSchema.parse({ email: 'driver@example.com', password: 'raceweek' })).toEqual({
      email: 'driver@example.com',
      password: 'raceweek',
      rememberMe: false,
    });
  });

  it('rejects an invalid email address', () => {
    expect(loginSchema.safeParse({ email: 'not-an-email', password: 'raceweek' }).success).toBe(false);
  });
});

describe('registerSchema', () => {
  it('accepts an optional display name and valid account details', () => {
    expect(registerSchema.safeParse({
      name: 'Max Verstappen',
      username: 'max_verstappen',
      email: 'max@example.com',
      password: 'raceweek',
    }).success).toBe(true);
  });

  it('rejects usernames containing characters outside the supported set', () => {
    expect(registerSchema.safeParse({
      username: 'max-verstappen',
      email: 'max@example.com',
      password: 'raceweek',
    }).success).toBe(false);
  });
});
