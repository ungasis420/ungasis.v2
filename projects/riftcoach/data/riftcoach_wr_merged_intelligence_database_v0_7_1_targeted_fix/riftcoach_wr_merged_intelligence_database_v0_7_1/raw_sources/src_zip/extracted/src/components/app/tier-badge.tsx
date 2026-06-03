'use client'

import { cn } from '@/lib/utils'

/**
 * TierBadge — Phase 1.2
 *
 * Renders a tier label (S+, S, A, B, C) with tier-specific colors
 * and a subtle pulse glow animation on S+ and S tiers.
 */

const TIER_STYLES: Record<string, { bg: string; text: string; glow: string; pulse: boolean }> = {
  'S+': {
    bg: 'bg-amber-500/15',
    text: 'text-amber-300',
    glow: 'shadow-amber-500/30',
    pulse: true,
  },
  S: {
    bg: 'bg-orange-500/12',
    text: 'text-orange-300',
    glow: 'shadow-orange-500/25',
    pulse: true,
  },
  A: {
    bg: 'bg-violet-500/12',
    text: 'text-violet-300',
    glow: 'shadow-violet-500/20',
    pulse: false,
  },
  B: {
    bg: 'bg-sky-500/10',
    text: 'text-sky-300',
    glow: 'shadow-sky-500/15',
    pulse: false,
  },
  C: {
    bg: 'bg-slate-500/10',
    text: 'text-slate-400',
    glow: 'shadow-slate-500/10',
    pulse: false,
  },
}

const DEFAULT_STYLE = {
  bg: 'bg-white/5',
  text: 'text-muted-foreground',
  glow: '',
  pulse: false,
}

export function TierBadge({
  tier,
  className,
}: {
  tier: string
  className?: string
}) {
  const s = TIER_STYLES[tier] ?? DEFAULT_STYLE

  return (
    <span
      className={cn(
        'relative inline-flex items-center justify-center rounded-full border border-white/10 px-2.5 py-0.5 text-xs font-semibold tracking-wide',
        s.bg,
        s.text,
        s.glow && `shadow-lg ${s.glow}`,
        s.pulse && 'tier-pulse',
        className
      )}
    >
      {/* Inner glow ring for S+ / S */}
      {s.pulse && (
        <span
          className={cn(
            'absolute inset-0 rounded-full opacity-40',
            tier === 'S+' ? 'tier-ring-gold' : 'tier-ring-orange'
          )}
        />
      )}
      <span className="relative">{tier}</span>
    </span>
  )
}
