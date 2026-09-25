import { describe, expect, it } from 'vitest';
import { loginSchema, registerSchema } from './auth';

describe('loginSchema', () => {
  it('accepts valid credentials', () => {
    expect(loginSchema.parse({ email: 'driver@example.com', password: 'raceweek' })).toEqual({
      email: 'driver@example.com',
      password: 'raceweek',
    });
  });

  it('trims and lowercases the email address', () => {
    expect(loginSchema.parse({ email: '  Driver@Example.COM  ', password: 'raceweek' }).email).toBe(
      'driver@example.com',
    );
  });

  it('rejects passwords shorter than 8 characters', () => {
    expect(loginSchema.safeParse({ email: 'driver@example.com', password: 'short' }).success).toBe(false);
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

  it('trims and lowercases the registration email', () => {
    const result = registerSchema.safeParse({
      username: 'max_verstappen',
      email: '  Max@Example.COM  ',
      password: 'raceweek',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe('max@example.com');
    }
  });

  it('rejects usernames containing characters outside the supported set', () => {    expect(registerSchema.safeParse({
      username: 'max-verstappen',
      email: 'max@example.com',
      password: 'raceweek',
    }).success).toBe(false);
  });
});
