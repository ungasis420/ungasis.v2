'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { portraitCandidates } from '@/lib/slug-normalizer'

/**
 * HexPortrait — Phase 1.1
 *
 * Accepts EITHER:
 *   • `src`       — a single known path (legacy), OR
 *   • `championId`— a slug like "dr_mundo"; the component auto-generates
 *                    multiple candidate paths and tries them in order.
 *
 * If ALL candidates fail (or none provided), shows text initials.
 */
export function HexPortrait({
  src,
  championId,
  alt,
  size = 54,
  fallback,
  className,
}: {
  src?: string | null
  championId?: string
  alt: string
  size?: number
  fallback: string
  className?: string
}) {
  // Build ordered candidate list
  const candidates = React.useMemo(() => {
    const list: string[] = []
    // If an explicit src was given, try it first
    if (src) list.push(src)
    // Then add slug-normalizer candidates (skipping duplicates)
    if (championId) {
      for (const c of portraitCandidates(championId)) {
        if (!list.includes(c)) list.push(c)
      }
    }
    return list
  }, [src, championId])

  const [idx, setIdx] = React.useState(0)
  const [exhausted, setExhausted] = React.useState(candidates.length === 0)

  // Reset state when candidates change (e.g. different champion)
  React.useEffect(() => {
    setIdx(0)
    setExhausted(candidates.length === 0)
  }, [candidates])

  const handleError = React.useCallback(() => {
    setIdx((prev) => {
      const next = prev + 1
      if (next >= candidates.length) {
        setExhausted(true)
        return prev
      }
      return next
    })
  }, [candidates.length])

  const currentSrc = !exhausted && candidates.length > 0 ? candidates[idx] : null

  return (
    <div
      className={cn(
        'hex-frame relative shrink-0',
        'ring-1 ring-white/15 shadow-[0_10px_28px_rgba(0,0,0,0.45)]',
        className
      )}
      style={{ width: size, height: size }}
      aria-label={alt}
    >
      {!currentSrc ? (
        <div className="hex-frame flex h-full w-full items-center justify-center bg-white/5 text-xs font-semibold text-muted-foreground">
          {fallback}
        </div>
      ) : (
        <img
          key={currentSrc}
          src={currentSrc}
          alt={alt}
          width={size}
          height={size}
          className="hex-frame object-cover"
          style={{ width: size, height: size }}
          onError={handleError}
          loading="lazy"
          decoding="async"
        />
      )}
      {/* Glossy shine overlay */}
      <div className="pointer-events-none absolute inset-0 hex-frame bg-[linear-gradient(145deg,rgba(255,255,255,0.18),transparent_55%)]" />
    </div>
  )
}
