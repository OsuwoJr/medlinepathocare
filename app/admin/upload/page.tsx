'use client'

import { useState, FormEvent } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

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
    router.push('/admin/signin')
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
      <div className="flex items-center justify-center p-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-amber-500 border-t-transparent mx-auto" />
          <p className="mt-4 text-slate-600 dark:text-slate-400">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 sm:p-8 lg:p-10">
      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Upload test result
        </h1>
        <p className="mt-1 text-slate-600 dark:text-slate-400">
          Attach a result file for a client. The client must have signed up first.
        </p>

        <div className="mt-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow rounded-xl p-6">
          {error && (
            <div className="rounded-lg bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 px-4 py-3 mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 px-4 py-3 mb-4">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Client email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="client@example.com"
              />
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                The client must have signed up first.
              </p>
            </div>

            <div>
              <label
                htmlFor="testName"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Test name *
              </label>
              <input
                id="testName"
                name="testName"
                type="text"
                required
                value={testName}
                onChange={(e) => setTestName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="e.g., Complete Blood Count"
              />
            </div>

            <div>
              <label
                htmlFor="testId"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Test ID (optional)
              </label>
              <input
                id="testId"
                name="testId"
                type="text"
                value={testId}
                onChange={(e) => setTestId(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="e.g., CBC-2025-001"
              />
            </div>

            <div>
              <label
                htmlFor="file"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Result file (PDF / image) *
              </label>
              <input
                id="file"
                name="file"
                type="file"
                required
                accept=".pdf,.png,.jpg,.jpeg,application/pdf,image/png,image/jpeg,image/jpg"
                onChange={handleFileChange}
                className="mt-1 block w-full text-sm text-slate-500 dark:text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-amber-500/10 file:text-amber-600 dark:file:text-amber-400 hover:file:bg-amber-500/20"
              />
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                PDF or image (PNG, JPG). Max 10MB.
              </p>
              {file && (
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                  Selected: {file.name} ({(file.size / 1024).toFixed(1)} KB)
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="notes"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Notes (optional)
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="Any additional notes..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2.5 px-4 rounded-lg text-sm font-semibold text-slate-900 bg-amber-500 hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Uploading...' : 'Upload result'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
