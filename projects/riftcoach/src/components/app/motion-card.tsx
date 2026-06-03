'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

/**
 * MotionCard — Phase 1.2
 *
 * A glass card that:
 *   • Fades + slides in on mount (stagger-friendly via custom prop)
 *   • Lifts on hover with a subtle glow
 *   • Accepts children like a normal div
 */

type MotionCardProps = {
  children: React.ReactNode
  /** Delay in seconds for staggered entrance (default 0) */
  delay?: number
  /** Extra classes */
  className?: string
  /** onClick handler */
  onClick?: () => void
  /** Render as button for accessibility */
  asButton?: boolean
}

export function MotionCard({
  children,
  delay = 0,
  className,
  onClick,
  asButton = false,
}: MotionCardProps) {
  const Component = asButton ? motion.button : motion.div

  return (
    <Component
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.35,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        y: -3,
        scale: 1.01,
        transition: { duration: 0.2 },
      }}
      whileTap={onClick ? { scale: 0.985 } : undefined}
      onClick={onClick}
      className={cn(
        'glass rounded-3xl border border-white/10',
        'hover:shadow-[0_20px_60px_rgba(99,102,241,0.12)]',
        'transition-shadow duration-300',
        onClick && 'cursor-pointer',
        asButton && 'w-full text-left',
        className
      )}
    >
      {children}
    </Component>
  )
}
