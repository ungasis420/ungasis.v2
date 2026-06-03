'use client'

import { cn } from '@/lib/utils'

/**
 * Shimmer — Phase 1.2
 *
 * A placeholder block with a sweeping shimmer animation.
 * Use instead of plain `animate-pulse` divs.
 */
export function Shimmer({
  className,
  style,
}: {
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <div
      className={cn(
        'shimmer rounded-2xl bg-white/[0.06]',
        className
      )}
      style={style}
    />
  )
}
