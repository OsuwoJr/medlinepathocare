'use client'

import { useState, FormEvent } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ALLOWED_EXTENSIONS = ['.pdf', '.png', '.jpg', '.jpeg']
const ALLOWED_TYPES = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg']

export default function AdminUploadPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [testName, setTestName] = useState('')
  const [testId, setTestId] = useState('')
  const [notes, setNotes] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  if (status === 'unauthenticated') {
    router.push('/auth/signin')
    return null
  }

  const validateFile = (f: File): string | null => {
    if (f.size > MAX_FILE_SIZE) {
      return 'File must be 10MB or smaller.'
    }
    const ext = '.' + f.name.split('.').pop()?.toLowerCase()
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return 'File must be a PDF or image (PNG, JPG, JPEG).'
    }
    if (!ALLOWED_TYPES.includes(f.type)) {
      return 'File type not allowed. Use PDF or image (PNG, JPG, JPEG).'
    }
    return null
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    setFile(selected ?? null)
    setError('')
    if (selected) {
      const msg = validateFile(selected)
      if (msg) setError(msg)
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!file) {
      setError('Please select a file.')
      return
    }

    const fileError = validateFile(file)
    if (fileError) {
      setError(fileError)
      return
    }

    setLoading(true)

    try {
      const formData = new FormData()
      formData.set('email', email)
      formData.set('testName', testName)
      formData.set('testId', testId)
      formData.set('notes', notes)
      formData.set('file', file)

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error ?? 'Upload failed.')
      }

      setSuccess('Test result uploaded successfully.')
      setEmail('')
      setTestName('')
      setTestId('')
      setNotes('')
      setFile(null)
      const input = document.getElementById('file') as HTMLInputElement
      if (input) input.value = ''
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload result.')
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto" />
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Upload Test Result
          </h1>
          <div className="flex gap-3">
            <Link
              href="/portal"
              className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600"
            >
              Portal
            </Link>
            <Link
              href="/"
              className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600"
            >
              Home
            </Link>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          {error && (
            <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 text-red-700 dark:text-red-400 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-100 dark:bg-green-900/30 border border-green-400 text-green-700 dark:text-green-400 px-4 py-3 rounded mb-4">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Client Email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="client@example.com"
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                The client must have signed up first.
              </p>
            </div>

            <div>
              <label
                htmlFor="testName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Test Name *
              </label>
              <input
                id="testName"
                name="testName"
                type="text"
                required
                value={testName}
                onChange={(e) => setTestName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="e.g., Complete Blood Count"
              />
            </div>

            <div>
              <label
                htmlFor="testId"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Test ID (Optional)
              </label>
              <input
                id="testId"
                name="testId"
                type="text"
                value={testId}
                onChange={(e) => setTestId(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="e.g., CBC-2025-001"
              />
            </div>

            <div>
              <label
                htmlFor="file"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Result File (PDF / Image) *
              </label>
              <input
                id="file"
                name="file"
                type="file"
                required
                accept=".pdf,.png,.jpg,.jpeg,application/pdf,image/png,image/jpeg,image/jpg"
                onChange={handleFileChange}
                className="mt-1 block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 dark:file:bg-primary-900/30 dark:file:text-primary-300"
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                PDF or image (PNG, JPG). Max 10MB.
              </p>
              {file && (
                <p className="mt-1 text-xs text-gray-600 dark:text-gray-300">
                  Selected: {file.name} ({(file.size / 1024).toFixed(1)} KB)
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="notes"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Notes (Optional)
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Any additional notes..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Uploading...' : 'Upload Result'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
