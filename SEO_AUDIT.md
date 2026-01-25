# SEO Audit — Medline Pathocare (Next.js)

**Date**: 2026-01-25  
**Audit type**: code-based technical + on-page (from repo review)  
**Stack**: Next.js App Router (`next@14.2.5`), Tailwind, React 18  

## Summary (prioritized)

## Current status (what’s done vs pending)

### Done in code
- **Canonical fix**: removed the global canonical from `app/layout.tsx` and added missing per-page canonicals.
- **Client-page metadata fix**:
  - `app/services/specialized-expertise/page.tsx` is now a Server Component with metadata + breadcrumbs.
  - `app/services/consultative-services/page.tsx` is now a Server Component with metadata + breadcrumbs, UI moved to `app/services/consultative-services/ConsultativeServicesClient.tsx`.
- **Structured data safety**: removed unverified `aggregateRating` from `components/StructuredData.tsx`.
- **OG image**:
  - `public/og.png` is present.
  - Open Graph + Twitter metadata updated to use **`/og.png`** instead of `/logo.png` (global + page overrides + `app/metadata.ts` helper defaults).

### Still pending (not yet accomplished)
- **Set `NEXT_PUBLIC_SITE_URL` in Vercel** (even if it’s the same domain)
  - Target value: `https://medlinepathocare.vercel.app`
  - Reason: prevents future base-url drift and keeps structured data + sitemap + canonicals consistent if hosting/domains change.
- **Thin/placeholder pages**
  - `/about` and `/blog` are still thin placeholders.
  - Options: publish content, or temporarily add `noindex` until ready.
- **Post-deploy verification**
  - Verify canonicals on key pages (view-source).
  - Verify social preview caches pull `og.png` (Facebook debugger / X card validator).
  - Submit/inspect in Google Search Console (sitemap + URL inspection).

### Critical
- **Incorrect canonical inheritance (duplicate signals)**
  - **Issue**: `app/layout.tsx` set a **global canonical** to the homepage (`alternates.canonical = siteUrl`). Any route that did not override metadata canonicals would inherit a canonical that points to `/`.
  - **Impact**: Google may treat many pages as duplicates of the homepage, weakening rankings and causing indexing/canonicalization issues.
  - **Where**: `app/layout.tsx`
  - **Fix**:
    - **DONE**: Removed the global canonical from `app/layout.tsx`.
    - **DONE**: Added canonicals to pages that were missing them.

- **Important routes cannot define metadata because they are Client Components**
  - **Issue**: In Next.js, `export const metadata` is only allowed in **Server Components**. Your pages:
    - `app/services/consultative-services/page.tsx` (`'use client'`)
    - `app/services/specialized-expertise/page.tsx` (`'use client'`)
    cannot export metadata. They will likely fall back to defaults and inherit the incorrect homepage canonical.
  - **Impact**: Weak/incorrect titles/descriptions/canonicals for key commercial pages.
  - **Fix**:
    - **DONE**:
      - `app/services/specialized-expertise/page.tsx`: converted to a Server Component and added metadata + breadcrumbs schema.
      - `app/services/consultative-services/page.tsx`: converted to a Server Component that exports metadata + breadcrumbs schema, and moved UI into `app/services/consultative-services/ConsultativeServicesClient.tsx`.

### High impact
- **Ensure the site base URL is explicitly set (even if it’s the same domain)**
  - **Context**: Your real production domain is `https://medlinepathocare.vercel.app`.
  - **Issue**: Many SEO outputs depend on `NEXT_PUBLIC_SITE_URL || 'https://medlinepathocare.vercel.app'`. Relying on defaults can bite you later if you add a custom domain, previews, or change hosting.
  - **Impact**: Canonicals/sitemaps/structured data URLs can drift if the base URL changes.
  - **Where**:
    - `app/layout.tsx`
    - `app/metadata.ts`
    - `app/robots.ts`
    - `app/sitemap.ts`
    - `components/StructuredData.tsx`
  - **Fix**:
    - Set `NEXT_PUBLIC_SITE_URL=https://medlinepathocare.vercel.app` in your Vercel project environment variables.
    - (Optional) centralize `siteUrl` from `lib/constants.ts` to avoid drift.

- **Structured data includes an AggregateRating (risk if not verifiable)**
  - **Issue**: `components/StructuredData.tsx` includes:
    - `aggregateRating: { ratingValue: "4.9", reviewCount: "50" }`
  - **Impact**: If not backed by real, user-visible reviews, this can be considered structured data spam and may reduce eligibility for rich results.
  - **Fix**:
    - **DONE**: Removed `aggregateRating` from `components/StructuredData.tsx` (you can re-add later if you publish verified reviews).

### Medium
- **Thin / placeholder pages**
  - **Issue**: `/about` and `/blog` currently contain placeholder content (“Content will be added here”).
  - **Impact**: Thin pages can weaken site quality signals and waste crawl budget.
  - **Where**:
    - `app/about/page.tsx`
    - `app/blog/page.tsx`
  - **Fix**:
    - Publish real content or temporarily `noindex` until ready.

- **OG image likely not optimal**
  - **Issue**: Many pages used `/logo.png` as Open Graph image.
  - **Impact**: Sharing previews often look better with a dedicated 1200×630 image and descriptive composition.
  - **Fix**:
    - **DONE**: Added `public/og.png` (1200×630) and updated Open Graph/Twitter metadata to use `/og.png`.

## How to create/adjust `public/og.png` (if you want to improve it later)

### Recommended (fast + looks professional)
- **Create a 1200×630 design** in Canva / Figma / Photopea:
  - Canvas size: **1200 × 630**
  - Background: solid white or a simple gradient matching your brand
  - Place `logo.png` centered (or left) and add short text (optional): “Medline Pathocare”
  - Export as **PNG**
  - Save it to: `public/og.png`

### If you want to use only the logo (no text)
- Still export at **1200×630** and center the logo; this avoids bad crops on WhatsApp/X/Facebook previews.

## What was fixed in this repo (implementation notes)

- **Canonical fix**
  - Removed global canonical from `app/layout.tsx`
  - Added canonicals where missing:
    - `app/privacy/page.tsx`
    - `app/terms/page.tsx`
    - `app/accessibility/page.tsx`

- **Metadata for services pages**
  - `app/services/specialized-expertise/page.tsx`: now exports metadata + breadcrumb schema
  - `app/services/consultative-services/page.tsx`: now exports metadata + breadcrumb schema, UI moved to `app/services/consultative-services/ConsultativeServicesClient.tsx`

- **Structured data safety**
  - Removed non-verified `aggregateRating` from `components/StructuredData.tsx`

### Low / informational
- **Meta keywords**
  - Present on multiple pages. Google generally ignores meta keywords; not harmful but not a ranking lever.

## Indexability & crawl controls

### Robots
- **Present**: `app/robots.ts`
  - Allows `/`
  - Disallows `/_next/` and `/api/` (fine)
  - Includes sitemap reference `.../sitemap.xml`

### Sitemap
- **Present**: `app/sitemap.ts`
  - Static list of primary routes (good for now)
  - Uses `lastModified: new Date().toISOString()` on every request (acceptable, but note it changes constantly)
  - Does not include future dynamic pages (e.g., blog posts / test detail pages)

## On-page SEO (per key route)

### Homepage (`/`)
- **Good**:
  - Unique title/description and canonical set in `app/page.tsx`
  - Clear H1 and strong above-the-fold messaging
- **Opportunity**:
  - Consider adding internal links to `/services/test-catalog` deeper sections (already linked) and add short supporting copy for target keywords.

### Services hub (`/services`)
- **Good**: metadata + canonical set (`app/services/page.tsx`)
- **Good**: breadcrumbs schema is included at `app/services/layout.tsx`

### Test catalog (`/services/test-catalog`)
- **Good**: metadata + canonical set (`app/services/test-catalog/layout.tsx`)
- **Risk**: query parameters
  - You use `?search=...` patterns (also referenced in `WebSite` structured data).
  - This can create many crawlable URL variants if linked externally.
  - **Mitigation** (optional): keep canonical pointing to `/services/test-catalog` (already set) and avoid generating crawlable internal links to search variants.

### Legal pages (`/privacy`, `/terms`, `/accessibility`)
- **Risk**: they currently define `metadata.title/description` but **do not set canonical** in-page, so they can inherit the global homepage canonical.
- **Fix**: add `alternates.canonical` to each page’s metadata, or remove the global canonical and use `metadataBase` + per-page canonicals.

## Technical SEO notes (Next.js specifics)

### Metadata strategy
- You already have a helper `generateMetadata()` in `app/metadata.ts`. Consider using it consistently so every route sets:
  - `title`, `description`
  - `openGraph`
  - `twitter`
  - `alternates.canonical`

### Performance & CWV risks (code-level)
- Images use `next/image` with `sizes` and lazy loading in cards (good).
- No heavy third-party scripts detected in the reviewed files.
- Main risk to monitor is **client-heavy pages** (large interactive UIs) increasing JS payload; keep interactivity scoped to where needed.

## File-by-file action list

### Must change
- `app/layout.tsx`
  - Remove site-wide `alternates.canonical = siteUrl` (or replace with per-path logic).
  - Keep `metadataBase` set.

- `app/services/consultative-services/page.tsx`
  - Split into server `page.tsx` (metadata + wrapper) and client component for interactive logic.

- `app/services/specialized-expertise/page.tsx`
  - Convert to server component (remove `'use client'`) and add metadata with canonical.

### Should change
- `app/privacy/page.tsx`, `app/terms/page.tsx`, `app/accessibility/page.tsx`
  - Add canonical in metadata (`alternates.canonical`).

- `components/StructuredData.tsx`
  - Remove `aggregateRating` unless you can validate it with real reviews.

- Production environment
  - Ensure `NEXT_PUBLIC_SITE_URL` is set to the real domain.

## Recommended next steps (implementation order)

### Phase 1 (today)
- Fix canonical strategy and ensure all routes have correct canonicals.
- Fix consultative/specialized pages so they can set metadata.

### Phase 2 (this week)
- Add/upgrade OG image (`public/og.png`) and set consistent OG/Twitter previews.
- Improve local SEO structured data fields (full address, map URL, opening hours, etc.).

### Phase 3 (growth)
- Add individual SEO landing pages for high-intent queries:
  - test detail pages (one per test),
  - provider-focused pages,
  - condition-based informational pages (with medical review process if applicable).

