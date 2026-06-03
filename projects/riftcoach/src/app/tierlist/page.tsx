'use client'

import * as React from 'react'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { useGameData } from '@/lib/use-game-data'
import { HexPortrait } from '@/components/app/hex-portrait'
import { TierBadge } from '@/components/app/tier-badge'
import { MotionCard } from '@/components/app/motion-card'
import { StaggerGrid, StaggerItem } from '@/components/app/stagger-grid'
import { Shimmer } from '@/components/app/shimmer'

type Champion = {
  id: string
  name: string
  tier: string
  roles: string[]
  classes?: string[]
  style?: string
  adaptiveType?: string
  rangeType?: string
  resource?: string
  image?: string
  splash?: string
}

const ALL_ROLES = ['All', 'Baron', 'Jungle', 'Mid', 'Duo', 'Support'] as const

export default function TierListPage() {
  const { data, loading, error } = useGameData<Champion[]>('/data/champions.json')
  const [role, setRole] = React.useState<(typeof ALL_ROLES)[number]>('All')
  const [query, setQuery] = React.useState('')
  const [selected, setSelected] = React.useState<Champion | null>(null)

  const champions = React.useMemo(() => {
    const list = data ?? []
    const q = query.trim().toLowerCase()
    return list
      .filter((c) => (role === 'All' ? true : c.roles?.includes(role)))
      .filter((c) => (!q ? true : c.name.toLowerCase().includes(q) || c.id.includes(q)))
      .sort((a, b) => tierRank(a.tier) - tierRank(b.tier) || a.name.localeCompare(b.name))
  }, [data, role, query])

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Tier List</h1>
            <p className="text-sm text-muted-foreground">
              Portraits auto-resolve via slug normalizer. Tier badges glow on S+ / S.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            {ALL_ROLES.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={cn(
                  'rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs backdrop-blur transition',
                  r === role ? 'bg-white/10 text-foreground glow' : 'text-muted-foreground hover:bg-white/8'
                )}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search champion..."
            className="max-w-sm rounded-2xl border-white/10 bg-white/5 backdrop-blur"
          />
          <div className="sm:hidden flex flex-wrap gap-2">
            {ALL_ROLES.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={cn(
                  'rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs backdrop-blur transition',
                  r === role ? 'bg-white/10 text-foreground glow' : 'text-muted-foreground hover:bg-white/8'
                )}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </header>

      <Card className="glass rounded-3xl border-white/10">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Champions</CardTitle>
            <div className="text-xs text-muted-foreground">
              {loading ? 'Loading…' : `${champions.length} shown`}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
              {error}
            </div>
          )}

          {loading ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center gap-3">
                    <Shimmer className="h-[54px] w-[54px] !rounded-2xl" />
                    <div className="flex-1 space-y-2">
                      <Shimmer className="h-3 w-32" />
                      <Shimmer className="h-3 w-20" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <StaggerGrid className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {champions.map((c) => (
                <StaggerItem key={c.id}>
                  <MotionCard
                    asButton
                    onClick={() => setSelected(c)}
                    className="flex w-full items-center justify-between gap-3 p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60"
                  >
                    <div className="flex items-center gap-3">
                      <HexPortrait
                        src={c.image}
                        championId={c.id}
                        alt={c.name}
                        size={54}
                        fallback={initials(c.name)}
                      />
                      <div>
                        <div className="font-medium leading-tight">{c.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {(c.roles ?? []).join(' • ')}
                        </div>
                      </div>
                    </div>
                    <TierBadge tier={c.tier} />
                  </MotionCard>
                </StaggerItem>
              ))}
            </StaggerGrid>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="glass border-white/10 backdrop-blur-xl sm:max-w-2xl rounded-3xl">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <HexPortrait
                    src={selected.image}
                    championId={selected.id}
                    alt={selected.name}
                    size={60}
                    fallback={initials(selected.name)}
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-semibold">{selected.name}</span>
                      <TierBadge tier={selected.tier} />
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {(selected.roles ?? []).join(' • ')}
                      {selected.classes?.length ? ` • ${selected.classes.join(' / ')}` : ''}
                    </div>
                  </div>
                </DialogTitle>
              </DialogHeader>

              <div className="grid gap-3 sm:grid-cols-2">
                <Info label="Style" value={selected.style ?? '—'} />
                <Info label="Damage" value={selected.adaptiveType ?? '—'} />
                <Info label="Range" value={selected.rangeType ?? '—'} />
                <Info label="Resource" value={selected.resource ?? '—'} />
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs text-muted-foreground">Tip</div>
                <div className="text-sm">Use Draft + Builds for matchup and loadout guidance.</div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-sm font-medium">{value}</div>
    </div>
  )
}

function initials(name: string) {
  return name.split(' ').slice(0, 2).map((p) => p[0]).join('').toUpperCase()
}

function tierRank(t: string) {
  const map: Record<string, number> = { 'S+': 0, S: 1, A: 2, B: 3, C: 4 }
  return map[t] ?? 9
}
