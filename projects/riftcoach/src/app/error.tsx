// src/app/error.tsx
// QF-4: Root error boundary — catches any unhandled error in the app
// Shows a graceful error UI instead of a white screen

'use client'

import { useEffect } from 'react'
import { AlertTriangle, Home, RefreshCw } from 'lucide-react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[RiftCoach] Unhandled error:', error)
  }, [error])

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        {/* Icon */}
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20">
          <AlertTriangle className="h-8 w-8 text-red-400" />
        </div>

        {/* Title */}
        <h2 className="mb-2 text-center text-xl font-bold text-foreground">
          Something went wrong
        </h2>

        {/* Message */}
        <p className="mb-6 text-center text-sm text-muted-foreground">
          RiftCoach hit an unexpected error. This usually fixes itself — try
          refreshing the page.
        </p>

        {/* Error details (dev mode only) */}
        {process.env.NODE_ENV === 'development' && error?.message && (
          <div className="mb-6 rounded-lg border border-red-500/20 bg-red-500/5 p-3">
            <p className="break-all font-mono text-xs text-red-400">
              {error.message}
            </p>
            {error.digest && (
              <p className="mt-1 text-xs text-red-400/60">
                Digest: {error.digest}
              </p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <a
            href="/"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-muted-foreground transition hover:bg-white/10 hover:text-foreground"
          >
            <Home className="h-4 w-4" />
            Go Home
          </a>
          <button
            onClick={() => reset()}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-indigo-500/30 bg-indigo-500/20 px-4 py-3 text-sm font-medium text-indigo-400 transition hover:bg-indigo-500/30"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>
        </div>
      </div>
    </div>
  )
}