'use client'

import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useGameData } from '@/lib/use-game-data'
import { SmartImage } from '@/components/app/smart-image'
import { StaggerGrid, StaggerItem } from '@/components/app/stagger-grid'
import { Shimmer } from '@/components/app/shimmer'
import { motion } from 'framer-motion'

type Rune = { id: string; name: string; type: string; slot: string; path?: string; effect?: string; cooldown?: string; image?: string }

const PATHS = ['All', 'Domination', 'Precision', 'Resolve', 'Sorcery'] as const
const SLOT_ORDER = ['keystone', 'primary_1', 'primary_2', 'primary_3', 'secondary_1', 'secondary_2', 'secondary_3']

export default function RunesPage() {
  const { data, loading, error } = useGameData<Rune[]>('/data/runes.json')
  const [path, setPath] = React.useState<(typeof PATHS)[number]>('All')
  const [q, setQ] = React.useState('')

  const runes = React.useMemo(() => {
    const list = data ?? []
    const query = q.trim().toLowerCase()
    return list
      .filter((r) => (path === 'All' ? true : r.path === path || r.type === path))
      .filter((r) => !query ? true : r.name.toLowerCase().includes(query) || r.id.includes(query))
  }, [data, path, q])

  const grouped = React.useMemo(() => groupBySlot(runes), [runes])

  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Runes</h1>
          <p className="text-sm text-muted-foreground">Grouped by slot. Icons auto-resolve. Tiles animate in.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search runes..."
            className="max-w-sm rounded-2xl border-white/10 bg-white/5 backdrop-blur" />
          <div className="flex flex-wrap gap-2">
            {PATHS.map((p) => (
              <button key={p} type="button" onClick={() => setPath(p)}
                className={cn('rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs backdrop-blur transition',
                  p === path ? 'bg-white/10 text-foreground glow' : 'text-muted-foreground hover:bg-white/8')}>
                {p}
              </button>
            ))}
          </div>
        </div>
      </header>

      {error && <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">{error}</div>}

      {loading ? (
        <div className="space-y-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-3xl border border-white/10 bg-white/5 p-5 space-y-4">
              <Shimmer className="h-4 w-32" />
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 3 }).map((_, j) => (
                  <div key={j} className="rounded-3xl border border-white/10 bg-white/5 p-4 space-y-3">
                    <div className="flex gap-3"><Shimmer className="h-12 w-12 !rounded-2xl" /><div className="space-y-2 flex-1"><Shimmer className="h-3 w-32" /><Shimmer className="h-3 w-20" /></div></div>
                    <Shimmer className="h-3 w-full" /><Shimmer className="h-3 w-3/4" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {SLOT_ORDER.filter((s) => grouped.has(s)).map((slot, si) => (
            <motion.div
              key={slot}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: si * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Card className="glass rounded-3xl border-white/10">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{prettySlot(slot)}</CardTitle>
                    <Badge variant="secondary" className="border-white/10 bg-white/5">{grouped.get(slot)?.length ?? 0}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <StaggerGrid className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {(grouped.get(slot) ?? []).map((r) => (
                      <StaggerItem key={r.id}>
                        <div className="rounded-3xl border border-white/10 bg-white/5 p-4 glass-hover transition-shadow hover:shadow-[0_16px_48px_rgba(99,102,241,0.10)]">
                          <div className="flex items-start gap-3">
                            <SmartImage src={r.image} assetId={r.id} dir="/images/runes/" alt={r.name} size={48} rounded="rounded-2xl" />
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <div className="truncate font-medium">{r.name}</div>
                                {r.path && <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-muted-foreground">{r.path}</span>}
                              </div>
                              <div className="text-xs text-muted-foreground">{r.type}</div>
                            </div>
                          </div>
                          {r.effect && <p className="mt-3 text-sm text-muted-foreground line-clamp-3">{r.effect}</p>}
                          {r.cooldown && <div className="mt-2 text-xs text-muted-foreground">CD: {r.cooldown}</div>}
                        </div>
                      </StaggerItem>
                    ))}
                  </StaggerGrid>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

function groupBySlot(list: Rune[]) {
  const m = new Map<string, Rune[]>()
  for (const r of list) { const key = r.slot || 'other'; if (!m.has(key)) m.set(key, []); m.get(key)!.push(r) }
  for (const [, v] of m.entries()) v.sort((a, b) => a.name.localeCompare(b.name))
  return m
}

function prettySlot(slot: string) {
  const map: Record<string, string> = { keystone: 'Keystone', primary_1: 'Primary Slot 1', primary_2: 'Primary Slot 2', primary_3: 'Primary Slot 3', secondary_1: 'Secondary Slot 1', secondary_2: 'Secondary Slot 2', secondary_3: 'Secondary Slot 3' }
  return map[slot] ?? slot
}
