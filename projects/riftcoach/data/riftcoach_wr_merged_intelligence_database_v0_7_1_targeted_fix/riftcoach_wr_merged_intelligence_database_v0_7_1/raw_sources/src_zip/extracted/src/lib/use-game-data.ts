'use client'

import * as React from 'react'

export type LoadState<T> = {
  data: T | null
  loading: boolean
  error: string | null
}

const cache = new Map<string, unknown>()

export function useGameData<T = unknown>(url: string): LoadState<T> {
  const [state, setState] = React.useState<LoadState<T>>({
    data: (cache.get(url) as T) ?? null,
    loading: !cache.has(url),
    error: null,
  })

  React.useEffect(() => {
    let cancelled = false
    const ctrl = new AbortController()

    async function run() {
      if (cache.has(url)) return
      try {
        const res = await fetch(url, { signal: ctrl.signal })
        if (!res.ok) throw new Error(`Failed to load ${url}: ${res.status}`)
        const json = (await res.json()) as T
        cache.set(url, json)
        if (!cancelled) setState({ data: json, loading: false, error: null })
      } catch (err) {
        if (cancelled) return
        const message = err instanceof Error ? err.message : 'Unknown error'
        setState({ data: null, loading: false, error: message })
      }
    }

    run()

    return () => {
      cancelled = true
      ctrl.abort()
    }
  }, [url])

  return state
}
