'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  const resolved = theme === 'system' ? systemTheme : theme
  const isDark = resolved === 'dark'

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className={cn(
        'h-9 w-9 rounded-xl border border-white/10 bg-white/5 backdrop-blur hover:bg-white/10',
        className
      )}
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      {!mounted ? (
        <span className="block h-4 w-4" />
      ) : isDark ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </Button>
  )
}
