'use client'

import * as React from 'react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn, formatNumber } from '@/lib/utils'
import { useGameData } from '@/lib/use-game-data'
import { SmartImage } from '@/components/app/smart-image'
import { MotionCard } from '@/components/app/motion-card'
import { StaggerGrid, StaggerItem } from '@/components/app/stagger-grid'
import { Shimmer } from '@/components/app/shimmer'

type Item = { id: string; name: string; category: string; tier?: string; cost?: number; stats?: string[]; passive?: string; image?: string }

const CATS = ['All', 'Physical', 'Magic', 'Defense', 'Support', 'Boots'] as const

export default function ItemsPage() {
  const { data, loading, error } = useGameData<Item[]>('/data/items.json')
  const [cat, setCat] = React.useState<(typeof CATS)[number]>('All')
  const [q, setQ] = React.useState('')

  const items = React.useMemo(() => {
    const list = data ?? []
    const query = q.trim().toLowerCase()
    return list
      .filter((i) => (cat === 'All' ? true : i.category === cat))
      .filter((i) => !query ? true : i.name.toLowerCase().includes(query) || i.id.includes(query))
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [data, cat, q])

  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Items</h1>
          <p className="text-sm text-muted-foreground">Icons auto-resolve. Cards animate in with stagger.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search items..."
            className="max-w-sm rounded-2xl border-white/10 bg-white/5 backdrop-blur" />
          <div className="flex flex-wrap gap-2">
            {CATS.map((c) => (
              <button key={c} type="button" onClick={() => setCat(c)}
                className={cn('rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs backdrop-blur transition',
                  c === cat ? 'bg-white/10 text-foreground glow' : 'text-muted-foreground hover:bg-white/8')}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </header>

      {error && <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">{error}</div>}

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="rounded-3xl border border-white/10 bg-white/5 p-5 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3"><Shimmer className="h-12 w-12 !rounded-2xl" /><div className="space-y-2"><Shimmer className="h-3 w-40" /><Shimmer className="h-3 w-20" /></div></div>
                <Shimmer className="h-5 w-16 !rounded-full" />
              </div>
              <Shimmer className="h-3 w-52" /><Shimmer className="h-3 w-44" />
            </div>
          ))}
        </div>
      ) : (
        <StaggerGrid className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((it) => (
            <StaggerItem key={it.id}>
              <MotionCard>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <SmartImage src={it.image} assetId={it.id} dir="/images/items/" alt={it.name} size={48} rounded="rounded-2xl" />
                      <div>
                        <CardTitle className="text-base leading-tight">{it.name}</CardTitle>
                        <div className="text-xs text-muted-foreground">{it.category}</div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {it.tier && <Badge variant="secondary" className="border-white/10 bg-white/5">{it.tier}</Badge>}
                      {typeof it.cost === 'number' && <div className="text-xs text-muted-foreground">{formatNumber?.(it.cost) ?? it.cost}g</div>}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  {it.stats?.length ? (
                    <div className="flex flex-wrap gap-2">
                      {it.stats.slice(0, 4).map((s) => (
                        <span key={s} className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-muted-foreground">{s}</span>
                      ))}
                    </div>
                  ) : null}
                  {it.passive ? <p className="text-sm text-muted-foreground line-clamp-3">{it.passive}</p> : null}
                </CardContent>
              </MotionCard>
            </StaggerItem>
          ))}
        </StaggerGrid>
      )}
    </div>
  )
}
