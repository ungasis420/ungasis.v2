'use client'

import * as React from 'react'
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { useGameData } from '@/lib/use-game-data'
import { SmartImage } from '@/components/app/smart-image'
import { MotionCard } from '@/components/app/motion-card'
import { StaggerGrid, StaggerItem } from '@/components/app/stagger-grid'
import { Shimmer } from '@/components/app/shimmer'

type Build = { id: string; name: string; role: string; summary?: string; items?: string[]; runes?: string[]; spells?: string[] }
type Item = { id: string; name: string; image?: string }
type Rune = { id: string; name: string; image?: string }
type Spell = { id: string; name: string; image?: string }

const ROLES = ['All', 'Baron', 'Jungle', 'Mid', 'Duo', 'Support'] as const
const DIR_MAP = { item: '/images/items/', rune: '/images/runes/', spell: '/images/spells/' } as const

export default function BuildsPage() {
  const buildsState = useGameData<Build[]>('/data/builds.json')
  const itemsState = useGameData<Item[]>('/data/items.json')
  const runesState = useGameData<Rune[]>('/data/runes.json')
  const spellsState = useGameData<Spell[]>('/data/spells.json')
  const [role, setRole] = React.useState<(typeof ROLES)[number]>('All')

  const itemsById = React.useMemo(() => toMap(itemsState.data), [itemsState.data])
  const runesById = React.useMemo(() => toMap(runesState.data), [runesState.data])
  const spellsById = React.useMemo(() => toMap(spellsState.data), [spellsState.data])

  const list = React.useMemo(() => {
    const builds = buildsState.data ?? []
    return role === 'All' ? builds : builds.filter((b) => b.role === role)
  }, [buildsState.data, role])

  const loading =
    buildsState.loading || itemsState.loading || runesState.loading || spellsState.loading

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">Builds</h1>
        <p className="text-sm text-muted-foreground">
          Icons auto-resolve via slug normalizer. Cards animate in.
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          {ROLES.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={cn(
                'rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs backdrop-blur transition',
                r === role
                  ? 'bg-white/10 text-foreground glow'
                  : 'text-muted-foreground hover:bg-white/8'
              )}
            >
              {r}
            </button>
          ))}
        </div>
      </header>

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-3xl border border-white/10 bg-white/5 p-5 space-y-4">
              <div className="flex justify-between">
                <Shimmer className="h-4 w-40" />
                <Shimmer className="h-5 w-16 !rounded-full" />
              </div>
              <Shimmer className="h-3 w-56" />
              {[1, 2, 3].map((j) => (
                <div key={j}>
                  <Shimmer className="h-3 w-12 mb-2" />
                  <div className="flex gap-2">
                    {[1, 2, 3].map((k) => (
                      <Shimmer key={k} className="h-10 w-28" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <StaggerGrid className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {list.map((b, index) => (
            <StaggerItem key={`${b.id}-${b.role}-${index}`}>
              <MotionCard>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between gap-3">
                    <CardTitle className="text-base">{b.name}</CardTitle>
                    <Badge variant="secondary" className="border-white/10 bg-white/5">
                      {b.role}
                    </Badge>
                  </div>
                  {b.summary && (
                    <div className="text-sm text-muted-foreground">{b.summary}</div>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  <IconRow label="Items" ids={b.items ?? []} lookup={itemsById} kind="item" />
                  <IconRow label="Runes" ids={b.runes ?? []} lookup={runesById} kind="rune" />
                  <IconRow label="Spells" ids={b.spells ?? []} lookup={spellsById} kind="spell" />
                </CardContent>
              </MotionCard>
            </StaggerItem>
          ))}
        </StaggerGrid>
      )}
    </div>
  )
}

function IconRow({
  label,
  ids,
  lookup,
  kind,
}: {
  label: string
  ids: string[]
  lookup: Map<string, any>
  kind: 'item' | 'rune' | 'spell'
}) {
  return (
    <div>
      <div className="mb-2 text-xs text-muted-foreground">{label}</div>
      <div className="flex flex-wrap gap-2">
        {ids.length === 0 ? (
          <span className="text-xs text-muted-foreground">—</span>
        ) : (
          ids.map((id, idx) => {
            const obj = lookup.get(id)
            const name = (obj?.name as string) ?? id
            return (
              <div
                key={`${id}-${idx}`}
                className="group flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-2 py-1"
                title={name}
              >
                <SmartImage
                  src={obj?.image}
                  assetId={id}
                  dir={DIR_MAP[kind]}
                  alt={name}
                  size={32}
                  rounded="rounded-lg"
                />
                <span className="max-w-[160px] truncate text-xs text-muted-foreground group-hover:text-foreground">
                  {name}
                </span>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

function toMap<T extends { id: string }>(arr: T[] | null) {
  const m = new Map<string, T>()
  ;(arr ?? []).forEach((x) => m.set(x.id, x))
  return m
}
