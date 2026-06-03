'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { Sidebar } from './sidebar'
import { ThemeToggle } from './theme-toggle'
import { AnimatedBackground } from './animated-background'

const MOBILE_NAV = [
  { href: '/', label: 'Dashboard' },
  { href: '/tierlist', label: 'Tier List' },
  { href: '/draft', label: 'Draft' },
  { href: '/synergy', label: 'Synergies' },
  { href: '/builds', label: 'Builds' },
  { href: '/items', label: 'Items' },
  { href: '/runes', label: 'Runes' },
  { href: '/spells', label: 'Spells' },
  { href: '/coach', label: 'Coach' },
  { href: '/review', label: 'Review' },
  { href: '/climb', label: 'Climb' },
  { href: '/settings', label: 'Settings' },
]

export function AppShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = React.useState(false)
  const pathname = usePathname()

  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <div className="relative flex">
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)} />

        <div className={cn('flex min-h-screen w-full flex-col', 'lg:pl-0')}>
          {/* Mobile topbar */}
          <div className="sticky top-0 z-40 flex items-center justify-between gap-2 border-b border-white/10 bg-background/40 px-4 py-3 backdrop-blur-xl lg:hidden">
            <div className="flex items-center gap-2">
              <Sheet>
                {/*
                  FIX: Don't use asChild + <Button> inside SheetTrigger.
                  SheetTrigger already renders a <button>, so nesting another
                  <button> inside it causes hydration errors.
                  Instead, style the SheetTrigger directly.
                */}
                <SheetTrigger
                  className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60"
                  aria-label="Open navigation"
                >
                  <Menu className="h-4 w-4" />
                </SheetTrigger>
                <SheetContent side="left" className="border-white/10 bg-background/80 backdrop-blur-xl">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="text-sm font-semibold">RiftCoach</div>
                    <ThemeToggle />
                  </div>
                  <nav className="space-y-1">
                    {MOBILE_NAV.map((item) => {
                      const active = pathname === item.href
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={cn(
                            'block rounded-2xl px-3 py-2 text-sm',
                            active
                              ? 'bg-white/10 text-foreground'
                              : 'text-muted-foreground hover:bg-white/5'
                          )}
                        >
                          {item.label}
                        </Link>
                      )
                    })}
                  </nav>
                </SheetContent>
              </Sheet>
              <div className="text-sm font-semibold">{titleFromPath(pathname)}</div>
            </div>
            <ThemeToggle />
          </div>

          {/* Main content */}
          <main
            className={cn(
              'relative mx-auto w-full max-w-[1400px] flex-1 px-4 pb-10 pt-6 lg:px-6 lg:pt-10',
              collapsed ? 'lg:pl-2' : 'lg:pl-2'
            )}
          >
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}

function titleFromPath(pathname: string) {
  if (pathname === '/') return 'Dashboard'
  const map: Record<string, string> = {
    '/tierlist': 'Tier List',
    '/draft': 'Draft Helper',
    '/synergy': 'Synergies',
    '/builds': 'Builds',
    '/items': 'Items',
    '/runes': 'Runes',
    '/spells': 'Spells',
    '/coach': 'AI Coach',
    '/review': 'Match Review',
    '/climb': 'Climb Guide',
    '/settings': 'Settings',
  }
  return map[pathname] ?? 'RiftCoach'
}
