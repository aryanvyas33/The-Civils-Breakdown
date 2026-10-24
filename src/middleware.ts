import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

// In-memory token bucket rate limiter
// Maps IP -> { count, resetTime }
const rateLimitMap = new Map<string, RateLimitRecord>();

const WINDOW_MS = 60 * 1000; // 1 minute sliding window
const MAX_REQUESTS = 60; // 60 requests per minute per IP for /api/*

function cleanupOldEntries(now: number) {
  if (rateLimitMap.size > 2000) {
    rateLimitMap.forEach((record, ip) => {
      if (now > record.resetTime) {
        rateLimitMap.delete(ip);
      }
    });
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Rate limit all /api/* routes against scrapers & DDoS
  if (pathname.startsWith('/api/')) {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      request.headers.get('cf-connecting-ip') ||
      '127.0.0.1';

    const now = Date.now();
    cleanupOldEntries(now);

    const record = rateLimitMap.get(ip);

    if (!record || now > record.resetTime) {
      rateLimitMap.set(ip, { count: 1, resetTime: now + WINDOW_MS });
    } else {
      record.count += 1;
      if (record.count > MAX_REQUESTS) {
        const retryAfterSeconds = Math.max(1, Math.ceil((record.resetTime - now) / 1000));
        return new NextResponse(
          JSON.stringify({
            success: false,
            error: 'Rate limit exceeded. Too many requests. Please retry shortly.',
            retryAfter: retryAfterSeconds,
          }),
          {
            status: 429,
            headers: {
              'Content-Type': 'application/json',
              'Retry-After': String(retryAfterSeconds),
              'X-RateLimit-Limit': String(MAX_REQUESTS),
              'X-RateLimit-Remaining': '0',
              'X-RateLimit-Reset': String(Math.ceil(record.resetTime / 1000)),
            },
          }
        );
      }
    }
  }

  const response = NextResponse.next();

  // Enforce baseline security headers at Edge
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - static assets
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico)$).*)',
  ],
};
