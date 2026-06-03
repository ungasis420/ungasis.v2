'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BarChart3,
  BookOpen,
  Brain,
  ChevronsLeft,
  ChevronsRight,
  Compass,
  Flame,
  GanttChartSquare,
  LayoutDashboard,
  Link2,
  ListOrdered,
  ScrollText,
  Settings,
  Swords,
} from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ThemeToggle } from './theme-toggle'

type NavItem = {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
}

const NAV: NavItem[] = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/tierlist', label: 'Tier List', icon: ListOrdered, badge: 'Meta' },
  { href: '/draft', label: 'Draft', icon: Swords },
  { href: '/synergy', label: 'Synergies', icon: Link2, badge: 'New' },
  { href: '/builds', label: 'Builds', icon: BookOpen },
  { href: '/items', label: 'Items', icon: Flame },
  { href: '/runes', label: 'Runes', icon: ScrollText },
  { href: '/spells', label: 'Spells', icon: Compass },
  { href: '/coach', label: 'Coach', icon: Brain },
  { href: '/review', label: 'Review', icon: BarChart3 },
  { href: '/climb', label: 'Climb', icon: GanttChartSquare },
  { href: '/settings', label: 'Settings', icon: Settings },
]

export function Sidebar({
  collapsed,
  onToggle,
  className,
}: {
  collapsed: boolean
  onToggle: () => void
  className?: string
}) {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        'relative hidden lg:flex h-[calc(100vh-24px)] m-3 flex-col rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl shadow-black/40',
        'before:pointer-events-none before:absolute before:inset-0 before:rounded-3xl before:bg-[radial-gradient(60%_60%_at_30%_10%,rgba(99,102,241,0.22),transparent_60%)]',
        collapsed ? 'w-[84px]' : 'w-[280px]',
        className
      )}
    >
      <div className="relative flex items-center justify-between gap-2 px-4 py-4">
        <div className={cn('flex items-center gap-3', collapsed && 'justify-center w-full')}>
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-indigo-500/90 to-fuchsia-500/70 shadow-lg shadow-indigo-500/20" />
          {!collapsed && (
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-wide">RiftCoach</div>
              <div className="text-xs text-muted-foreground">Phase 2</div>
            </div>
          )}
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className={cn(
            'h-9 w-9 rounded-2xl border border-white/10 bg-white/5 backdrop-blur hover:bg-white/10',
            collapsed && 'absolute right-2'
          )}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
        </Button>
      </div>

      <ScrollArea className="relative flex-1 px-2 pb-2">
        <nav className="space-y-1">
          {NAV.map((item) => {
            const active = pathname === item.href
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'group relative flex items-center gap-3 rounded-2xl px-3 py-2 text-sm transition',
                  'hover:bg-white/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 focus-visible:ring-offset-0',
                  active ? 'bg-white/10 text-foreground shadow-sm shadow-indigo-500/15' : 'text-muted-foreground'
                )}
              >
                {active && (
                  <span className="absolute inset-0 -z-10 rounded-2xl bg-[linear-gradient(90deg,rgba(99,102,241,0.22),rgba(217,70,239,0.10),transparent)]" />
                )}
                <span
                  className={cn(
                    'flex h-9 w-9 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur',
                    active ? 'text-indigo-200' : 'text-muted-foreground group-hover:text-foreground'
                  )}
                >
                  <Icon className="h-4 w-4" />
                </span>
                {!collapsed && <span className="flex-1 truncate">{item.label}</span>}
                {!collapsed && item.badge && (
                  <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-muted-foreground">
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>
      </ScrollArea>

      <div className="relative mt-auto flex items-center gap-2 px-4 py-3">
        <ThemeToggle />
        {!collapsed && (
          <div className="text-xs text-muted-foreground">Tip: use Settings for API keys</div>
        )}
      </div>
    </aside>
  )
}
