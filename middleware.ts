import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple in-memory rate limiter for API routes
// For production, use Redis or a proper rate limiting service
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export default auth((req) => {
  const pathname = req.nextUrl.pathname;

  // Rate limit API routes, but skip auth, admin, and portal (portal returns 401 when unauthenticated)
  const skipRateLimit =
    pathname.startsWith('/api/auth') ||
    pathname.startsWith('/api/admin') ||
    pathname.startsWith('/api/portal');
  if (pathname.startsWith('/api/') && !skipRateLimit) {
    const ip = (req as NextRequest).ip || req.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();
    const windowMs = 60 * 1000; // 1 minute
    const maxRequests = 10;

    const record = rateLimitMap.get(ip);

    if (record) {
      if (now < record.resetTime) {
        if (record.count >= maxRequests) {
          return NextResponse.json(
            { error: 'Too many requests. Please try again later.' },
            { status: 429 }
          );
        }
        record.count++;
      } else {
        rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
      }
    } else {
      rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    }

    return NextResponse.next();
  }

  // Protect /portal - require authentication, use client sign-in
  if (pathname.startsWith('/portal')) {
    if (!req.auth) {
      const signInUrl = new URL('/auth/signin', req.nextUrl.origin);
      signInUrl.searchParams.set('callbackUrl', req.nextUrl.pathname);
      return Response.redirect(signInUrl);
    }
  }

  // Protect /admin (except admin sign-in) - require auth + admin role
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/signin')) {
    if (!req.auth) {
      const signInUrl = new URL('/admin/signin', req.nextUrl.origin);
      signInUrl.searchParams.set('callbackUrl', req.nextUrl.pathname);
      return Response.redirect(signInUrl);
    }
    const role = (req.auth.user as { role?: string } | undefined)?.role;
    if (role !== 'admin') {
      return Response.redirect(new URL('/', req.nextUrl.origin));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/api/:path*', '/portal/:path*', '/admin/:path*'],
};
