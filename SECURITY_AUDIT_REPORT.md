# 🔒 Security Audit Report - Medline Pathocare
**Date:** January 2025  
**Auditor:** Application Security & DevSecOps Review  
**Application:** Next.js 14 Web Application  
**Status:** ⚠️ **CRITICAL ISSUES FOUND**

---

## Executive Summary

This security audit identified **15 security vulnerabilities** ranging from **CRITICAL** to **LOW** severity. The application lacks several essential security controls including Content Security Policy, input validation, rate limiting, and proper error handling. Immediate action is required to address critical issues.

### Risk Score: **HIGH** 🔴

---

## 🔴 CRITICAL VULNERABILITIES

### 1. Missing Content Security Policy (CSP)
**Severity:** CRITICAL  
**Location:** `next.config.js`  
**Risk:** XSS attacks, data injection, clickjacking

**Issue:**
- No Content Security Policy headers configured
- Application vulnerable to XSS attacks
- No protection against unauthorized script execution

**Impact:**
- Attackers can inject malicious scripts
- Potential data theft and session hijacking
- Compliance violations (HIPAA/GDPR concerns for medical data)

**Recommendation:**
```javascript
// Add to next.config.js headers()
{
  key: 'Content-Security-Policy',
  value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://wa.me; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://formspree.io https://wa.me; frame-ancestors 'self';"
}
```

---

### 2. XSS Vulnerability via dangerouslySetInnerHTML
**Severity:** CRITICAL  
**Location:** `components/StructuredData.tsx:126`  
**Risk:** Cross-Site Scripting (XSS)

**Issue:**
```typescript
dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
```

**Impact:**
- If `structuredData` contains user-controlled input, XSS is possible
- Currently safe (static data), but dangerous pattern

**Recommendation:**
- Use Next.js `<Script>` component with `type="application/ld+json"`
- Or validate/sanitize all data before JSON.stringify
- Consider using a library like DOMPurify if user input is ever involved

**Fix:**
```typescript
import Script from 'next/script';

return (
  <Script
    id="structured-data"
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
  />
);
```

---

### 3. Missing Input Validation & Sanitization
**Severity:** CRITICAL  
**Location:** `components/BookingModal.tsx`, `app/providers/referral-form/page.tsx`  
**Risk:** Injection attacks, XSS, data corruption

**Issue:**
- No server-side validation
- No input sanitization on client-side
- Forms accept arbitrary input without length/format checks
- Phone numbers, emails, names not validated

**Impact:**
- SQL injection (if backend added later)
- XSS via form submissions
- Data integrity issues
- Potential DoS via large payloads

**Recommendation:**
```typescript
// Add validation library (zod, yup, or joi)
import { z } from 'zod';

const bookingSchema = z.object({
  name: z.string().min(2).max(100).regex(/^[a-zA-Z\s'-]+$/),
  email: z.string().email().max(255).optional(),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/),
  message: z.string().max(1000).optional(),
});

// Validate before submission
const validated = bookingSchema.safeParse(formData);
if (!validated.success) {
  // Handle validation errors
}
```

---

### 4. Sensitive Data in Client-Side Code
**Severity:** CRITICAL  
**Location:** Multiple files  
**Risk:** Information disclosure

**Issue:**
- Phone number hardcoded: `'254796168900'` in `BookingModal.tsx:58`
- Email hardcoded: `'medlinepathocarelab@gmail.com'` in `contact/page.tsx:8`
- Google verification code exposed in metadata: `layout.tsx:107`
- Formspree endpoint may be exposed if set

**Impact:**
- Contact information scraping
- Potential spam/phishing
- Verification codes can be misused

**Recommendation:**
- Move sensitive data to environment variables
- Use `NEXT_PUBLIC_*` only for truly public data
- Consider using a contact form API instead of exposing emails

---

### 5. Missing Rate Limiting
**Severity:** CRITICAL  
**Location:** All form submissions  
**Risk:** DoS, spam, abuse

**Issue:**
- No rate limiting on form submissions
- BookingModal can be spammed
- Referral form has no protection
- WhatsApp link generation unlimited

**Impact:**
- Form spam/abuse
- Potential DoS attacks
- Resource exhaustion
- Cost implications (if using paid services)

**Recommendation:**
- Implement rate limiting middleware
- Use services like Upstash Redis or Vercel Edge Config
- Add CAPTCHA for forms
- Implement client-side debouncing

**Example:**
```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Implement rate limiting logic
  // Check IP, user agent, etc.
  return NextResponse.next();
}
```

---

## 🟠 HIGH SEVERITY ISSUES

### 6. Missing CSRF Protection
**Severity:** HIGH  
**Location:** Form submissions  
**Risk:** Cross-Site Request Forgery

**Issue:**
- No CSRF tokens on forms
- Formspree endpoint vulnerable to CSRF
- No SameSite cookie configuration

**Impact:**
- Attackers can submit forms on behalf of users
- Unauthorized actions

**Recommendation:**
- Use Next.js built-in CSRF protection
- Implement CSRF tokens for form submissions
- Configure SameSite cookies

---

### 7. Insecure Error Handling
**Severity:** HIGH  
**Location:** `components/BookingModal.tsx:117`  
**Risk:** Information disclosure

**Issue:**
```typescript
console.error('Booking submission error:', error);
```

**Impact:**
- Error details exposed in browser console
- Stack traces may reveal internal structure
- Sensitive information leakage

**Recommendation:**
```typescript
// Log errors securely
if (process.env.NODE_ENV === 'development') {
  console.error('Booking submission error:', error);
} else {
  // Send to error tracking service (Sentry, LogRocket)
  // Don't expose details to user
  console.error('An error occurred. Please try again.');
}
```

---

### 8. Missing Security Headers
**Severity:** HIGH  
**Location:** `next.config.js`  
**Risk:** Various attacks

**Issue:**
Missing headers:
- `Strict-Transport-Security` (HSTS)
- `Permissions-Policy`
- `X-XSS-Protection` (legacy but still useful)
- `Content-Security-Policy` (already mentioned)

**Recommendation:**
```javascript
{
  key: 'Strict-Transport-Security',
  value: 'max-age=31536000; includeSubDomains; preload'
},
{
  key: 'Permissions-Policy',
  value: 'camera=(), microphone=(), geolocation=()'
},
{
  key: 'X-XSS-Protection',
  value: '1; mode=block'
}
```

---

### 9. localStorage XSS Risk
**Severity:** HIGH  
**Location:** `components/ThemeProvider.tsx`  
**Risk:** XSS via localStorage manipulation

**Issue:**
- localStorage values not sanitized
- If compromised, malicious scripts can inject values
- Values directly used in DOM manipulation

**Impact:**
- Persistent XSS attacks
- Theme/accessibility settings can be hijacked

**Recommendation:**
```typescript
// Validate localStorage values
const validateTheme = (value: string | null): Theme | null => {
  if (value === 'light' || value === 'dark') return value as Theme;
  return null;
};

const savedTheme = validateTheme(localStorage.getItem('theme'));
```

---

### 10. Missing Environment Variable Validation
**Severity:** HIGH  
**Location:** `components/BookingModal.tsx:79`  
**Risk:** Runtime errors, misconfiguration

**Issue:**
```typescript
const formspreeEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
// No validation if undefined
```

**Impact:**
- Application crashes if env var missing
- Silent failures
- Poor user experience

**Recommendation:**
```typescript
const formspreeEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
if (!formspreeEndpoint) {
  throw new Error('NEXT_PUBLIC_FORMSPREE_ENDPOINT is required');
}
// Or handle gracefully
if (!formspreeEndpoint) {
  setSubmitStatus('error');
  return;
}
```

---

## 🟡 MEDIUM SEVERITY ISSUES

### 11. No Request Size Limits
**Severity:** MEDIUM  
**Location:** Form submissions  
**Risk:** DoS via large payloads

**Issue:**
- No maximum length validation on text inputs
- Message field can accept unlimited text
- Potential memory exhaustion

**Recommendation:**
- Add maxLength attributes to inputs
- Validate payload size server-side
- Implement request size limits in Next.js config

---

### 12. Missing HTTPS Enforcement
**Severity:** MEDIUM  
**Location:** Production deployment  
**Risk:** Man-in-the-middle attacks

**Issue:**
- No explicit HTTPS redirect
- HSTS header missing (mentioned above)

**Recommendation:**
- Ensure Vercel/production enforces HTTPS
- Add HSTS header
- Use `forceHttps` in deployment config

---

### 13. Exposed Admin Paths in robots.txt
**Severity:** MEDIUM  
**Location:** `app/robots.ts:11`  
**Risk:** Information disclosure

**Issue:**
```typescript
disallow: ['/api/', '/_next/', '/admin/'],
```

**Impact:**
- Reveals existence of `/admin/` path
- Security through obscurity, but still a concern

**Recommendation:**
- If `/admin/` doesn't exist, remove it
- If it exists, ensure proper authentication
- Consider not listing it to avoid reconnaissance

---

### 14. Missing Dependency Security Scanning
**Severity:** MEDIUM  
**Location:** `package.json`  
**Risk:** Vulnerable dependencies

**Issue:**
- No automated dependency scanning
- No security audit in CI/CD
- Dependencies may have known vulnerabilities

**Recommendation:**
```bash
# Add to package.json scripts
"security:audit": "npm audit",
"security:fix": "npm audit fix"

# Add to CI/CD pipeline
npm audit --audit-level=moderate
```

**Tools:**
- `npm audit`
- Snyk
- Dependabot (GitHub)
- OWASP Dependency-Check

---

### 15. Weak Type Safety in Error Handling
**Severity:** MEDIUM  
**Location:** Error catch blocks  
**Risk:** Type errors, poor error handling

**Issue:**
```typescript
catch (error) {
  console.error('Booking submission error:', error);
  // error type is 'unknown', not properly typed
}
```

**Recommendation:**
```typescript
catch (error) {
  if (error instanceof Error) {
    // Handle Error instance
  } else {
    // Handle unknown error
  }
}
```

---

## 🟢 LOW SEVERITY / BEST PRACTICES

### 16. Missing Security.txt File
**Severity:** LOW  
**Recommendation:** Add `/public/.well-known/security.txt`

```text
Contact: security@medlinepathocare.com
Expires: 2025-12-31T23:59:59.000Z
Preferred-Languages: en
```

---

### 17. Missing Security Monitoring
**Severity:** LOW  
**Recommendation:**
- Implement error tracking (Sentry, LogRocket)
- Add security event logging
- Monitor for suspicious activities

---

### 18. No Security Headers Testing
**Severity:** LOW  
**Recommendation:**
- Add automated security header tests
- Use tools like securityheaders.com
- Include in CI/CD pipeline

---

## 📋 Immediate Action Items (Priority Order)

### Week 1 - Critical Fixes
1. ✅ Add Content Security Policy
2. ✅ Fix dangerouslySetInnerHTML usage
3. ✅ Add input validation to all forms
4. ✅ Move sensitive data to environment variables
5. ✅ Implement rate limiting

### Week 2 - High Priority
6. ✅ Add CSRF protection
7. ✅ Fix error handling
8. ✅ Add missing security headers
9. ✅ Sanitize localStorage usage
10. ✅ Validate environment variables

### Week 3 - Medium Priority
11. ✅ Add request size limits
12. ✅ Ensure HTTPS enforcement
13. ✅ Review robots.txt
14. ✅ Set up dependency scanning
15. ✅ Improve error type safety

---

## 🛠️ Implementation Guide

### Step 1: Update next.config.js
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://wa.me",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "font-src 'self' data:",
              "connect-src 'self' https://formspree.io https://wa.me",
              "frame-ancestors 'self'",
            ].join('; ')
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig
```

### Step 2: Add Input Validation
Create `lib/validation.ts`:
```typescript
import { z } from 'zod';

export const bookingSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name contains invalid characters'),
  email: z.string()
    .email('Invalid email address')
    .max(255, 'Email too long')
    .optional()
    .or(z.literal('')),
  phone: z.string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format')
    .min(10, 'Phone number too short')
    .max(15, 'Phone number too long'),
  message: z.string()
    .max(1000, 'Message must be less than 1000 characters')
    .optional()
    .or(z.literal('')),
  preferredContact: z.enum(['email', 'whatsapp']),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
```

### Step 3: Create Rate Limiting Middleware
Create `middleware.ts`:
```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple in-memory rate limiter (use Redis in production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export function middleware(request: NextRequest) {
  // Rate limit form submissions
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const ip = request.ip || 'unknown';
    const now = Date.now();
    const windowMs = 60 * 1000; // 1 minute
    const maxRequests = 10;

    const record = rateLimitMap.get(ip);
    
    if (record) {
      if (now < record.resetTime) {
        if (record.count >= maxRequests) {
          return NextResponse.json(
            { error: 'Too many requests' },
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
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
```

---

## 📊 Security Checklist

- [ ] Content Security Policy implemented
- [ ] All inputs validated and sanitized
- [ ] Rate limiting enabled
- [ ] CSRF protection added
- [ ] Security headers configured
- [ ] Error handling secured
- [ ] Environment variables validated
- [ ] Dependencies scanned
- [ ] HTTPS enforced
- [ ] Security monitoring enabled
- [ ] Security.txt file added
- [ ] Penetration testing completed
- [ ] Security documentation updated

---

## 🔗 Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security Best Practices](https://nextjs.org/docs/app/building-your-application/configuring/security-headers)
- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)

---

## 📝 Notes

- This audit focused on the frontend application
- Backend security (if added later) should be audited separately
- Regular security audits recommended quarterly
- Consider engaging professional penetration testing
- Medical data handling requires HIPAA compliance review

---

**Report Generated:** January 2025  
**Next Review:** April 2025
