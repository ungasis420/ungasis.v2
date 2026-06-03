'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { assetCandidates } from '@/lib/slug-normalizer'

/**
 * SmartImage — Phase 1.1
 *
 * Like HexPortrait but for rectangular icons (items, runes, spells).
 * Accepts EITHER `src` (explicit path) or `assetId` + `dir` + `ext`
 * to auto-generate candidate paths via the slug normalizer.
 */
export function SmartImage({
  src,
  assetId,
  dir,
  ext = '.png',
  alt,
  size = 32,
  rounded = 'rounded-xl',
  className,
}: {
  src?: string | null
  assetId?: string
  dir?: string          // e.g. '/images/items/'
  ext?: string          // e.g. '.png'
  alt: string
  size?: number
  rounded?: string
  className?: string
}) {
  const candidates = React.useMemo(() => {
    const list: string[] = []
    if (src) list.push(src)
    if (assetId && dir) {
      for (const c of assetCandidates(assetId, dir, ext)) {
        if (!list.includes(c)) list.push(c)
      }
    }
    return list
  }, [src, assetId, dir, ext])

  const [idx, setIdx] = React.useState(0)
  const [exhausted, setExhausted] = React.useState(candidates.length === 0)

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

  if (!currentSrc) {
    return (
      <div
        className={cn(
          'flex items-center justify-center border border-white/10 bg-white/5 text-[10px] font-medium text-muted-foreground',
          rounded,
          className
        )}
        style={{ width: size, height: size, minWidth: size }}
        aria-label={alt}
      >
        {alt.slice(0, 2).toUpperCase()}
      </div>
    )
  }

  return (
    <img
      key={currentSrc}
      src={currentSrc}
      alt={alt}
      width={size}
      height={size}
      className={cn('border border-white/10 object-cover', rounded, className)}
      style={{ width: size, height: size, minWidth: size }}
      onError={handleError}
      loading="lazy"
      decoding="async"
    />
  )
}
