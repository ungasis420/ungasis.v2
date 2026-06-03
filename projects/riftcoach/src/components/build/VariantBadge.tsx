// src/components/build/VariantBadge.tsx
// Phase 5.8.1 Task 4 — Intent Badge
//
// Shows a colored badge when the build has been modified from default.
// Example: "🛡️ Tank Variant — Frontline engage — high armor/MR"
//
// USED BY: BuildView.tsx (passed as prop)
// DATA FROM: response header X-Build-Variant (parsed in page.tsx)

'use client'

import { motion } from 'framer-motion'

export interface VariantBadgeProps {
  intent: string
  label: string
  emoji: string
  color: string
  description?: string
  swapCount?: number
}

export function VariantBadge({
  intent,
  label,
  emoji,
  color,
  description,
  swapCount,
}: VariantBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="mb-3 flex flex-wrap items-center gap-2"
    >
      {/* Main badge pill */}
      <span
        className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold"
        style={{
          backgroundColor: `${color}20`,
          border: `1px solid ${color}40`,
          color: color,
        }}
      >
        <span>{emoji}</span>
        <span>{label}</span>
      </span>

      {/* Swap count pill */}
      {swapCount != null && swapCount > 0 && (
        <span
          className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.10)',
            color: 'rgba(255, 255, 255, 0.5)',
          }}
        >
          🔄 {swapCount} items swapped
        </span>
      )}

      {/* Description (if provided) */}
      {description && (
        <span
          className="text-xs"
          style={{ color: 'rgba(255, 255, 255, 0.4)' }}
        >
          — {description}
        </span>
      )}
    </motion.div>
  )
}