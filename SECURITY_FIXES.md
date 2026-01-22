# 🚀 Quick Security Fixes Implementation Guide

This guide provides step-by-step instructions to fix the critical security vulnerabilities identified in the audit.

---

## 🔴 Priority 1: Critical Fixes (Do First!)

### Fix 1: Update Security Headers in next.config.js

**File:** `next.config.js`

Replace the entire `headers()` function with:

```javascript
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
            "script-src 'self' 'unsafe-inline' https://wa.me",
            "style-src 'self' 'unsafe-inline'",
            "img-src 'self' data: https:",
            "font-src 'self' data: https://fonts.gstatic.com",
            "connect-src 'self' https://formspree.io https://wa.me",
            "frame-ancestors 'self'",
          ].join('; ')
        },
      ],
    },
  ];
},
```

---

### Fix 2: Install Validation Library

```bash
npm install zod
```

---

### Fix 3: Create Validation Schema

**Create new file:** `lib/validation.ts`

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

---

### Fix 4: Update BookingModal with Validation

**File:** `components/BookingModal.tsx`

Add import at top:
```typescript
import { bookingSchema, type BookingFormData } from '@/lib/validation';
```

Update `handleSubmit` function:
```typescript
const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsSubmitting(true);
  setSubmitStatus('idle');

  // Validate input
  const validationResult = bookingSchema.safeParse(formData);
  if (!validationResult.success) {
    setSubmitStatus('error');
    setIsSubmitting(false);
    // You can show specific validation errors here
    console.error('Validation errors:', validationResult.error.errors);
    return;
  }

  try {
    if (formData.preferredContact === 'whatsapp') {
      // Sanitize inputs before using
      const sanitizedName = formData.name.trim().substring(0, 100);
      const sanitizedEmail = formData.email?.trim().substring(0, 255) || '';
      const sanitizedPhone = formData.phone.trim().substring(0, 15);
      const sanitizedMessage = formData.message?.trim().substring(0, 1000) || '';

      const whatsappMessage = `*Test Booking Request*

*Test Details:*
• Test Name: ${test.title}
• Test ID: ${test.id}
• Price: KES ${test.price.toLocaleString('en-KE', { minimumFractionDigits: 2 })}

*Customer Details:*
• Name: ${sanitizedName}
• Email: ${sanitizedEmail}
• Phone: ${sanitizedPhone}

${sanitizedMessage ? `*Additional Message:*\n${sanitizedMessage}\n\n` : ''}Booking Date: ${new Date().toLocaleString('en-KE', { 
        dateStyle: 'full', 
        timeStyle: 'short' 
      })}`;

      const encodedMessage = encodeURIComponent(whatsappMessage);
      const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '254796168900';
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        preferredContact: 'email',
        message: '',
      });
      setTimeout(() => {
        onClose();
        setSubmitStatus('idle');
      }, 2000);
    } else {
      const formspreeEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
      
      if (!formspreeEndpoint) {
        setSubmitStatus('error');
        setIsSubmitting(false);
        return;
      }
      
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          testName: test.title,
          testId: test.id,
          testPrice: test.price,
          customerName: formData.name.trim(),
          customerEmail: formData.email?.trim() || '',
          customerPhone: formData.phone.trim(),
          preferredContact: formData.preferredContact,
          message: formData.message?.trim() || '',
          bookingDate: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          preferredContact: 'email',
          message: '',
        });
        setTimeout(() => {
          onClose();
          setSubmitStatus('idle');
        }, 2000);
      } else {
        setSubmitStatus('error');
      }
    }
  } catch (error) {
    // Secure error handling
    if (process.env.NODE_ENV === 'development') {
      console.error('Booking submission error:', error);
    } else {
      console.error('An error occurred. Please try again.');
    }
    setSubmitStatus('error');
  } finally {
    setIsSubmitting(false);
  }
};
```

---

### Fix 5: Add Input Length Limits to Form Fields

**File:** `components/BookingModal.tsx`

Update input fields:
```typescript
<input
  type="text"
  id="name"
  required
  maxLength={100}
  value={formData.name}
  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
/>

<input
  type="email"
  id="email"
  maxLength={255}
  value={formData.email}
  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
/>

<input
  type="tel"
  id="phone"
  required
  maxLength={15}
  pattern="^\+?[1-9]\d{1,14}$"
  value={formData.phone}
  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
/>

<textarea
  id="message"
  rows={3}
  maxLength={1000}
  value={formData.message}
  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
  placeholder="Any special requests or notes..."
/>
```

---

### Fix 6: Fix StructuredData Component

**File:** `components/StructuredData.tsx`

Replace the return statement:
```typescript
import Script from 'next/script';

// ... existing code ...

return (
  <Script
    id={`structured-data-${type}`}
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
  />
);
```

---

### Fix 7: Secure localStorage Usage

**File:** `components/ThemeProvider.tsx`

Add validation functions:
```typescript
const validateTheme = (value: string | null): Theme | null => {
  if (value === 'light' || value === 'dark') return value as Theme;
  return null;
};

const validateContrast = (value: string | null): Contrast | null => {
  if (value === 'normal' || value === 'high') return value as Contrast;
  return null;
};

const validateFontSize = (value: string | null): FontSize | null => {
  if (value === 'base' || value === 'large' || value === 'xl') return value as FontSize;
  return null;
};
```

Update useEffect:
```typescript
useEffect(() => {
  setMounted(true);
  // Load preferences from localStorage with validation
  const savedTheme = validateTheme(localStorage.getItem('theme'));
  const savedContrast = validateContrast(localStorage.getItem('contrast'));
  const savedFontSize = validateFontSize(localStorage.getItem('fontSize'));

  if (savedTheme) setTheme(savedTheme);
  if (savedContrast) setContrast(savedContrast);
  if (savedFontSize) setFontSizeState(savedFontSize);
}, []);
```

---

### Fix 8: Move Sensitive Data to Environment Variables

**Create/Update:** `.env.local` (add to .gitignore if not already)

```env
NEXT_PUBLIC_SITE_URL=https://medlinepathocare.vercel.app
NEXT_PUBLIC_WHATSAPP_NUMBER=254796168900
NEXT_PUBLIC_CONTACT_EMAIL=medlinepathocarelab@gmail.com
NEXT_PUBLIC_FORMSPREE_ENDPOINT=your_formspree_endpoint_here
```

**Update:** `components/BookingModal.tsx`
```typescript
const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '254796168900';
```

**Update:** `app/contact/page.tsx`
```typescript
const phoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER || '+254796168900';
const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'medlinepathocarelab@gmail.com';
```

---

### Fix 9: Add Rate Limiting (Simple Client-Side)

**File:** `components/BookingModal.tsx`

Add debouncing:
```typescript
import { useState, useRef } from 'react';

// Add inside component
const lastSubmitTime = useRef<number>(0);
const MIN_SUBMIT_INTERVAL = 5000; // 5 seconds

const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  
  // Rate limiting check
  const now = Date.now();
  if (now - lastSubmitTime.current < MIN_SUBMIT_INTERVAL) {
    alert('Please wait a few seconds before submitting again.');
    return;
  }
  lastSubmitTime.current = now;

  // ... rest of submit logic
};
```

---

## 🟠 Priority 2: High Priority Fixes

### Fix 10: Create Middleware for Rate Limiting

**Create new file:** `middleware.ts` (in root directory)

```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple in-memory rate limiter
// For production, use Redis or a proper rate limiting service
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export function middleware(request: NextRequest) {
  // Only apply to API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
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
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
```

---

## ✅ Testing Your Fixes

After implementing the fixes:

1. **Test Security Headers:**
   ```bash
   # Visit your site and check headers
   curl -I https://medlinepathocare.vercel.app
   # Or use: https://securityheaders.com
   ```

2. **Test Input Validation:**
   - Try submitting forms with invalid data
   - Try XSS payloads: `<script>alert('XSS')</script>`
   - Try SQL injection: `' OR '1'='1`

3. **Test Rate Limiting:**
   - Submit form multiple times quickly
   - Should see rate limit message

4. **Check Console:**
   - No sensitive errors should be visible
   - No exposed stack traces

---

## 📝 Next Steps

1. ✅ Implement all Priority 1 fixes
2. ✅ Test thoroughly
3. ✅ Deploy to staging
4. ✅ Run security scan: `npm audit`
5. ✅ Review security headers: https://securityheaders.com
6. ✅ Deploy to production
7. ✅ Schedule next security audit

---

## 🔗 Additional Resources

- [Next.js Security Headers](https://nextjs.org/docs/app/building-your-application/configuring/security-headers)
- [Zod Validation](https://zod.dev/)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)

---

**Remember:** Security is an ongoing process, not a one-time fix. Regular audits and updates are essential!
