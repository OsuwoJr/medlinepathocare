'use client'

import { useEffect, useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import TestResultCard from '@/components/TestResultCard'

interface TestResult {
  id: string
  test_name: string
  test_id: string | null
  file_name: string
  uploaded_at: string
  notes: string | null
  file_url?: string | null
}

export default function PortalPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [results, setResults] = useState<TestResult[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
      return
    }

    if (status === 'authenticated') {
      fetchResults()
    }
  }, [status, session])

  const fetchResults = async () => {
    try {
      setLoading(true)
      setError('')

      const res = await fetch('/api/portal/results')
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to load results')
      }

      setResults(data.results ?? [])
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to load results'
      setError(message)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading' || (status === 'authenticated' && loading && results.length === 0 && !error)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto" />
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                My Test Results
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Welcome, {session.user?.name || session.user?.email}
              </p>
            </div>
            <div className="flex gap-4">
              <Link
                href="/"
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600"
              >
                Home
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Results List */}
        {error && (
          <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 text-red-700 dark:text-red-400 px-4 py-3 rounded mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <span>{error}</span>
            <button
              type="button"
              onClick={() => {
                setError('')
                fetchResults()
              }}
              className="shrink-0 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md transition-colors"
            >
              Try again
            </button>
          </div>
        )}

        {loading && results.length === 0 ? (
          <div className="grid gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 animate-pulse"
                aria-hidden
              >
                <div className="h-5 bg-gray-200 dark:bg-gray-600 rounded w-1/3 mb-3" />
                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/4 mb-2" />
                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/2" />
                <div className="mt-4 h-9 bg-gray-200 dark:bg-gray-600 rounded w-24" />
              </div>
            ))}
          </div>
        ) : results.length === 0 && !loading ? (
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-12 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              No test results available yet. Results will appear here once they are uploaded.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {loading && results.length > 0 && (
              <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                <span className="inline-block w-4 h-4 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" aria-hidden />
                Refreshing…
              </p>
            )}
            <div className="grid gap-6">
            {results.map((result) => (
              <TestResultCard
                key={result.id}
                testName={result.test_name}
                testId={result.test_id}
                fileName={result.file_name}
                uploadedAt={result.uploaded_at}
                notes={result.notes}
                fileUrl={result.file_url ?? null}
              />
            ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
