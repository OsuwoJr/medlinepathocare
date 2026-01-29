'use client'

interface TestResultCardProps {
  testName: string
  testId: string | null
  fileName: string
  uploadedAt: string
  notes: string | null
  fileUrl: string | null
}

export default function TestResultCard({
  testName,
  testId,
  fileName,
  uploadedAt,
  notes,
  fileUrl,
}: TestResultCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {testName}
          </h3>
          {testId && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Test ID: {testId}
            </p>
          )}
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            {new Date(uploadedAt).toLocaleDateString('en-KE', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
          {notes && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 italic">
              {notes}
            </p>
          )}
        </div>
        {fileUrl && (
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium shrink-0"
          >
            View PDF
          </a>
        )}
      </div>
    </div>
  )
}
