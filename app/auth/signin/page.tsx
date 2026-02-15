'use client'

import { useState, FormEvent, Suspense, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { createBrowserClient } from '@/lib/supabase'

const OAUTH_PROVIDERS = [
  { id: 'google', label: 'Continue with Google' },
  { id: 'facebook', label: 'Continue with Facebook' },
  { id: 'twitter', label: 'Continue with X (Twitter)' },
] as const

function SignInForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const registered = searchParams.get('registered') === '1'
  const reset = searchParams.get('reset') === '1'
  const oauthError = searchParams.get('error')
  const token = searchParams.get('token')
  const callbackUrl = searchParams.get('callbackUrl') || '/portal'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [oauthLoading, setOauthLoading] = useState<string | null>(null)

  // Complete OAuth sign-in when redirected back with token
  useEffect(() => {
    if (!token) return
    setLoading(true)
    signIn('credentials', { token, redirect: false, callbackUrl }).then((result) => {
      setLoading(false)
      if (result?.ok) {
        router.push(callbackUrl)
        router.refresh()
      } else {
        setError('Sign-in link expired or invalid. Please try again.')
      }
    })
  }, [token, callbackUrl, router])

  const handleOAuth = async (provider: 'google' | 'facebook' | 'twitter') => {
    setOauthLoading(provider)
    setError('')
    try {
      const supabase = createBrowserClient()
      const redirectTo = typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : undefined
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider,
        options: { redirectTo, queryParams: { next: callbackUrl } },
      })
      if (oauthError) {
        setError(oauthError.message)
        setOauthLoading(null)
        return
      }
      // Supabase redirects the browser; no need to push
    } catch {
      setError('Could not start sign-in. Please try again.')
      setOauthLoading(null)
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Invalid email or password')
      } else if (result?.ok) {
        router.push('/portal')
        router.refresh()
      }
    } catch {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Or{' '}
            <Link href="/auth/signup" className="font-medium text-primary-600 hover:text-primary-500">
              create a new account
            </Link>
          </p>
          {registered && (
            <p className="mt-2 text-center text-sm text-green-600 dark:text-green-400">
              Account created. Sign in to continue.
            </p>
          )}
          {reset && (
            <p className="mt-2 text-center text-sm text-green-600 dark:text-green-400">
              Password updated. Sign in with your new password.
            </p>
          )}
          {oauthError && (
            <p className="mt-2 text-center text-sm text-amber-600 dark:text-amber-400">
              {oauthError === 'oauth_no_email' && 'Sign-in failed: no email from provider.'}
              {oauthError === 'oauth_exchange' && 'Sign-in failed. Please try again.'}
              {oauthError === 'oauth_config' && 'OAuth is not configured. Use email sign-in.'}
              {oauthError === 'oauth_missing_code' && 'Invalid sign-in link. Please try again.'}
              {!['oauth_no_email', 'oauth_exchange', 'oauth_config', 'oauth_missing_code'].includes(oauthError) && 'Sign-in failed. Please try again.'}
            </p>
          )}
        </div>
        <div className="mt-6 space-y-3">
          {OAUTH_PROVIDERS.map((p) => (
            <button
              key={p.id}
              type="button"
              disabled={!!oauthLoading || !!loading}
              onClick={() => handleOAuth(p.id)}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 text-sm font-medium"
            >
              {oauthLoading === p.id ? (
                <span className="animate-pulse">Redirecting…</span>
              ) : (
                p.label
              )}
            </button>
          ))}
        </div>
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400">Or sign in with email</span>
          </div>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 text-red-700 dark:text-red-400 px-4 py-3 rounded">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <Link href="/auth/forgot-password" className="text-sm font-medium text-primary-600 hover:text-primary-500">
                  Forgot your password?
                </Link>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function SignInPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900 dark:border-white" />
      </div>
    }>
      <SignInForm />
    </Suspense>
  )
}
