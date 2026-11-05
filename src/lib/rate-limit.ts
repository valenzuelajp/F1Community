/**
 * Minimal in-memory fixed-window rate limiter for auth flows.
 *
 * Keyed per email address so one attacker cannot lock out the whole site,
 * while brute-forcing a single account gets throttled. This is a
 * single-process store: it resets on redeploy and does not share state
 * across instances. Good enough for Auth V1; replace with Redis/Upstash
 * when the app runs on multiple servers.
 */
type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

export function checkRateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now >= bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  bucket.count += 1;
  return bucket.count <= limit;
}

/** Login: 10 attempts per 15 minutes, per email address. */
export function checkLoginRateLimit(email: string): boolean {
  return checkRateLimit(`login:${email.toLowerCase()}`, 10, 15 * 60 * 1000);
}

/** Registration: 5 new accounts per hour, per email address. */
export function checkRegisterRateLimit(email: string): boolean {
  return checkRateLimit(`register:${email.toLowerCase()}`, 5, 60 * 60 * 1000);
}
