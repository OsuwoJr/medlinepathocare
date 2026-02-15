'use client'

import { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { createBrowserClient } from '@/lib/supabase'

function CallbackContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'exchanging' | 'signing-in' | 'error'>('exchanging')

  useEffect(() => {
    const code = searchParams.get('code')
    const next = searchParams.get('next') ?? '/portal'
    const callbackUrl = next.startsWith('/') ? next : '/portal'

    if (!code) {
      router.replace(`/auth/signin?error=oauth_missing_code`)
      return
    }

    const supabase = createBrowserClient()
    supabase.auth
      .exchangeCodeForSession(code)
      .then(async ({ data, error }) => {
        if (error || !data.session) {
          router.replace(`/auth/signin?error=oauth_exchange`)
          return
        }
        const access_token = data.session.access_token
        const refresh_token = data.session.refresh_token
        if (!access_token || !refresh_token) {
          router.replace(`/auth/signin?error=oauth_exchange`)
          return
        }

        setStatus('signing-in')
        const res = await fetch('/api/auth/oauth-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ access_token, refresh_token }),
        })
        const body = await res.json().catch(() => ({}))
        if (!res.ok || !body.token) {
          router.replace(`/auth/signin?error=${body.error || 'oauth_exchange'}`)
          return
        }

        const result = await signIn('credentials', {
          token: body.token,
          redirect: false,
          callbackUrl,
        })
        if (result?.ok) {
          router.push(callbackUrl)
          router.refresh()
        } else {
          router.replace('/auth/signin?error=oauth_exchange')
        }
      })
      .catch(() => {
        router.replace('/auth/signin?error=oauth_exchange')
      })
  }, [router, searchParams])

  if (status === 'error') return null

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600 mx-auto" />
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          {status === 'exchanging' ? 'Completing sign-in…' : 'Signing you in…'}
        </p>
      </div>
    </div>
  )
}

/**
 * OAuth callback page. The code exchange must happen in the browser (PKCE:
 * code_verifier is stored here when the flow starts). We exchange the code
 * for a session, then get a one-time token from the API and complete NextAuth sign-in.
 */
export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600" />
        </div>
      }
    >
      <CallbackContent />
    </Suspense>
  )
}
