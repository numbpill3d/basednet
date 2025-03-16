import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { withAuth } from 'next-auth/middleware';
import { getToken } from 'next-auth/jwt';

// Initialize rate limiter
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(20, '10 s'),
});

export default withAuth(
  async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;

    // Rate limiting for API routes
    if (path.startsWith('/api/')) {
      const ip = req.ip ?? '127.0.0.1';
      const { success, limit, reset, remaining } = await ratelimit.limit(ip);

      if (!success) {
        return new NextResponse('Too Many Requests', {
          status: 429,
          headers: {
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': remaining.toString(),
            'X-RateLimit-Reset': reset.toString(),
          },
        });
      }
    }

    // Add security headers
    const response = NextResponse.next();
    response.headers.set('X-DNS-Prefetch-Control', 'on');
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    response.headers.set('X-Frame-Options', 'SAMEORIGIN');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set(
      'Content-Security-Policy',
      "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;"
    );

    return response;
  },
  {
    callbacks: {
      authorized: async ({ req }) => {
        const token = await getToken({ req });
        const path = req.nextUrl.pathname;

        // Public routes
        if (
          path === '/' ||
          path.startsWith('/auth/') ||
          path.startsWith('/api/auth/') ||
          path.startsWith('/_next/') ||
          path.startsWith('/static/')
        ) {
          return true;
        }

        // Protected routes require authentication
        return !!token;
      },
    },
  }
);
