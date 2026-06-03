// src/app/coach/error.tsx
// QF-4: Coach-specific error boundary
// More helpful error messages for AI chat failures

'use client'

import { useEffect } from 'react'
import { Bot, Home, RefreshCw, Sparkles } from 'lucide-react'

export default function CoachError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[RiftCoach Coach] Error:', error)
  }, [error])

  // Detect common error types for better messaging
  const msg = error?.message?.toLowerCase() ?? ''
  const isApiError =
    msg.includes('api') || msg.includes('fetch') || msg.includes('network')
  const isStreamError =
    msg.includes('stream') || msg.includes('response body')

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        {/* Icon */}
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-500/20">
          <Bot className="h-8 w-8 text-indigo-400" />
        </div>

        {/* Title */}
        <h2 className="mb-2 text-center text-xl font-bold text-foreground">
          <Sparkles className="mr-1 inline h-5 w-5 text-indigo-400" />
          Coach Hit a Snag
        </h2>

        {/* Context-aware message */}
        <p className="mb-4 text-center text-sm text-muted-foreground">
          {isApiError
            ? 'The AI provider might be temporarily down. Your API keys and chat history are safe.'
            : isStreamError
              ? 'The response stream was interrupted. This happens occasionally with free AI models.'
              : 'The coach page crashed unexpectedly. Your chat history is saved in your browser.'}
        </p>

        {/* Quick fix tips */}
        <div className="mb-6 rounded-lg border border-white/10 bg-white/5 p-3">
          <p className="mb-2 text-xs font-semibold text-foreground">
            💡 Quick fixes:
          </p>
          <ul className="space-y-1 text-xs text-muted-foreground">
            <li>• Click &quot;Try Again&quot; — the AI will use a different model</li>
            <li>• Check that your .env.local has valid API keys</li>
            <li>• Make sure npm run dev is running without errors</li>
          </ul>
        </div>

        {/* Error details (dev mode only) */}
        {process.env.NODE_ENV === 'development' && error?.message && (
          <div className="mb-6 rounded-lg border border-red-500/20 bg-red-500/5 p-3">
            <p className="break-all font-mono text-xs text-red-400">
              {error.message}
            </p>
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