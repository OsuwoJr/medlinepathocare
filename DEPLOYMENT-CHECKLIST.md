# OAuth Deployment Checklist

Use this checklist to verify your OAuth setup after deploying the fix for `oauth_exchange`.

---

## 1. Code Changes (Already Done)

- ✅ Installed `@supabase/ssr`
- ✅ Updated `lib/supabase.ts` to use `createBrowserClient` from `@supabase/ssr` (cookies)
- ✅ Created `lib/supabase-server.ts` with `createServerClient` for server-side use
- ✅ Changed `/auth/callback` from client page to server Route Handler
- ✅ Build verified

---

## 2. Deploy to Vercel

**Push to your repository** so Vercel deploys the latest code:

```bash
git add .
git commit -m "Fix OAuth: use @supabase/ssr for PKCE with cookies"
git push origin main
```

Wait for Vercel to deploy. Check the deployment logs for any errors.

---

## 3. Vercel Environment Variables

In **Vercel Dashboard** → Project → **Settings** → **Environment Variables**, verify for **Production**:

| Variable | Value | Required |
|----------|-------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://hwyymtgpkntbaefgpyzb.supabase.co` | ✅ Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | (your anon key) | ✅ Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | (your service role key) | ✅ Yes |
| `NEXTAUTH_URL` | `https://medlinepathocare.vercel.app` | ✅ **Critical** |
| `NEXTAUTH_SECRET` | (your secret) | ✅ Yes |
| `ADMIN_EMAILS` | `medlinepathocarelab@gmail.com` | Optional |

**Critical**: `NEXTAUTH_URL` must be your **production URL**, not `http://localhost:3000`. If this is wrong, NextAuth sign-in will fail.

After changing any env vars, **redeploy** (Vercel → Deployments → ⋯ → Redeploy).

---

## 4. Supabase Dashboard Configuration

Go to [Supabase Dashboard](https://app.supabase.com) → your project → **Authentication** → **URL Configuration**:

### Redirect URLs

Add these **exact** URLs (case-sensitive, no trailing slash):

- ✅ `https://medlinepathocare.vercel.app/auth/callback`
- ✅ `http://localhost:3000/auth/callback` (for local testing)

### Site URL

Set to:

- ✅ `https://medlinepathocare.vercel.app`

**Important**: If these don't match exactly, Supabase may redirect to the wrong URL or reject the redirect, causing `oauth_missing_code` or `oauth_exchange`.

### Provider Configuration

For **Google** (or any provider you use):

1. Go to **Authentication** → **Providers** → **Google**
2. Ensure it's **Enabled**
3. **Client ID** and **Client Secret** must be from your Google Cloud Console project
4. In **Google Cloud Console** → APIs & Services → Credentials → OAuth 2.0 Client ID:
   - **Authorized redirect URIs** must include:  
     `https://hwyymtgpkntbaefgpyzb.supabase.co/auth/v1/callback`  
     (copy this exact URL from Supabase Dashboard → Authentication → Providers → Google)

Repeat for Facebook, X, or any other provider.

---

## 5. Test the Flow

After deploying and configuring:

1. Open **https://medlinepathocare.vercel.app/auth/signin** (or `/auth/signup`)
2. Click **"Continue with Google"**
3. You should:
   - Redirect to Google
   - Sign in
   - Redirect back to your site
   - **Briefly see the callback page** (no visible UI, just a redirect)
   - Land on `/auth/signin?token=...`
   - Immediately sign in and redirect to `/portal`

**If you see `oauth_exchange`**:
- Check browser console for errors
- Verify Supabase Redirect URLs match exactly
- Verify `NEXTAUTH_URL` in Vercel is correct
- Check Supabase logs (Dashboard → Logs) for auth errors

**If you see `oauth_missing_code`**:
- Supabase Redirect URLs don't include your callback URL
- Or the Site URL is wrong

---

## 6. Clear Old Sessions

If you were testing before the fix, clear your browser cookies for `medlinepathocare.vercel.app` to remove any old/broken sessions.

---

## Common Issues

| Error | Cause | Fix |
|-------|-------|-----|
| `oauth_exchange` | PKCE code_verifier not in cookies, or old code was deployed | Deploy latest code with @supabase/ssr server callback |
| `oauth_missing_code` | Redirect URL not in Supabase allowed list | Add callback URL to Supabase Dashboard → URL Configuration |
| Redirect loop | NEXTAUTH_URL is wrong (localhost in production) | Set NEXTAUTH_URL to production URL in Vercel env vars |
| "Invalid email" | Provider didn't return email | Check provider settings (e.g. Google OAuth scope includes email) |

---

Once OAuth works, you're all set!
