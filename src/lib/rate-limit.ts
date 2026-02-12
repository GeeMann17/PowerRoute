import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { NextResponse } from 'next/server'

// Graceful degradation: if Redis is not configured, rate limiting is a no-op
function createRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) return null
  return new Redis({ url, token })
}

function createLimiter(
  tokens: number,
  window: `${number} s` | `${number} m` | `${number} h` | `${number} d`,
  prefix: string
): Ratelimit | null {
  const redis = createRedis()
  if (!redis) return null
  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(tokens, window),
    prefix: `ratelimit:${prefix}`,
  })
}

// Named limiters
export const publicFormLimiter = createLimiter(10, '1 h', 'public-form')
export const signupLimiter = createLimiter(5, '1 h', 'signup')
export const adminApiLimiter = createLimiter(60, '1 m', 'admin-api')
export const dashboardApiLimiter = createLimiter(60, '1 m', 'dashboard-api')

/**
 * Extract client IP from request headers.
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  return request.headers.get('x-real-ip') || 'unknown'
}

/**
 * Apply rate limiting. Returns a 429 NextResponse if blocked, or null if allowed.
 */
export async function applyRateLimit(
  limiter: Ratelimit | null,
  identifier: string
): Promise<NextResponse | null> {
  if (!limiter) return null // Redis not configured — allow all

  const result = await limiter.limit(identifier)

  if (!result.success) {
    const retryAfter = Math.ceil((result.reset - Date.now()) / 1000)
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.max(retryAfter, 1)),
          'X-RateLimit-Limit': String(result.limit),
          'X-RateLimit-Remaining': String(result.remaining),
          'X-RateLimit-Reset': String(result.reset),
        },
      }
    )
  }

  return null
}
