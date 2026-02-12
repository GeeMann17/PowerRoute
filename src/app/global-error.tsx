'use client'

import { useEffect } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Global application error:', error)
  }, [error])

  return (
    <html lang="en">
      <body className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-red-100 p-4 rounded-full w-fit mx-auto mb-6">
            <AlertTriangle className="h-12 w-12 text-red-600" />
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Something Went Wrong
          </h1>
          
          <p className="text-gray-600 mb-6">
            We encountered a critical error. Please try refreshing the page.
          </p>

          {error.digest && (
            <p className="text-xs text-gray-400 mb-6 font-mono">
              Error ID: {error.digest}
            </p>
          )}

          <button
            onClick={reset}
            className="inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </button>
        </div>
      </body>
    </html>
  )
}
