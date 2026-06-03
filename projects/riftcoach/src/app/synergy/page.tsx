'use client'

import * as React from 'react'
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useGameData } from '@/lib/use-game-data'
import { HexPortrait } from '@/components/app/hex-portrait'
import { MotionCard } from '@/components/app/motion-card'
import { StaggerGrid, StaggerItem } from '@/components/app/stagger-grid'
import { Shimmer } from '@/components/app/shimmer'
import { motion } from 'framer-motion'

type DuoPair = { support: string; adc: string; score: number; tag: string; note: string }
type TeamComp = { name: string; description: string; core: string[]; flex: string[]; strength: string; weakness: string }
type SynergyData = { patch: string; updated: string; duo_lane: DuoPair[]; team_comps: TeamComp[] }
type Champion = { id: string; name: string; image?: string; roles: string[] }

const TAG_COLORS: Record<string, string> = {
  poke: 'text-sky-300 bg-sky-500/12',
  kill: 'text-red-300 bg-red-500/12',
  combo: 'text-violet-300 bg-violet-500/12',
  utility: 'text-emerald-300 bg-emerald-500/12',
  sustain: 'text-green-300 bg-green-500/12',
  hypercarry: 'text-amber-300 bg-amber-500/12',
  scaling: 'text-orange-300 bg-orange-500/12',
  protect: 'text-blue-300 bg-blue-500/12',
}

const MY_POOL = ['karma', 'swain', 'nautilus', 'senna', 'seraphine', 'soraka', 'milio']

export default function SynergyPage() {
  const synState = useGameData<SynergyData>('/data/synergies.json')
  const champState = useGameData<Champion[]>('/data/champions.json')
  const [filter, setFilter] = React.useState<'all' | 'my_pool'>('my_pool')
  const [q, setQ] = React.useState('')

  const champsById = React.useMemo(() => {
    const m = new Map<string, Champion>()
    ;(champState.data ?? []).forEach((c) => m.set(c.id, c))
    return m
  }, [champState.data])

  const duos = React.useMemo(() => {
    const list = synState.data?.duo_lane ?? []
    const query = q.trim().toLowerCase()
    return list
      .filter((d) => (filter === 'my_pool' ? MY_POOL.includes(d.support) : true))
      .filter((d) =>
        !query
          ? true
          : d.support.includes(query) ||
            d.adc.includes(query) ||
            d.tag.includes(query) ||
            (champsById.get(d.support)?.name ?? '').toLowerCase().includes(query) ||
            (champsById.get(d.adc)?.name ?? '').toLowerCase().includes(query)
      )
      .sort((a, b) => b.score - a.score)
  }, [synState.data, filter, q, champsById])

  const comps = synState.data?.team_comps ?? []
  const loading = synState.loading || champState.loading

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Synergies</h1>
          <p className="text-sm text-muted-foreground">
            Duo lane pairings ranked by synergy score (1–10). Team comp archetypes with core/flex picks.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search support, ADC, or tag..."
            className="max-w-sm rounded-2xl border-white/10 bg-white/5 backdrop-blur"
          />
          <div className="flex gap-2">
            {(['my_pool', 'all'] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={cn(
                  'rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs backdrop-blur transition',
                  f === filter ? 'bg-white/10 text-foreground glow' : 'text-muted-foreground hover:bg-white/8'
                )}
              >
                {f === 'my_pool' ? 'My Pool' : 'All Supports'}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ── Duo Lane Synergies ─────────────────────────────────────────────── */}
      <section>
        <h2 className="mb-4 text-lg font-semibold tracking-tight">
          Duo Lane Pairings
          <span className="ml-2 text-sm font-normal text-muted-foreground">
            {loading ? '' : `${duos.length} shown`}
          </span>
        </h2>

        {loading ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-3xl border border-white/10 bg-white/5 p-5 space-y-3">
                <div className="flex gap-3"><Shimmer className="h-12 w-12 !rounded-2xl" /><Shimmer className="h-12 w-12 !rounded-2xl" /><div className="flex-1 space-y-2"><Shimmer className="h-3 w-40" /><Shimmer className="h-3 w-24" /></div></div>
                <Shimmer className="h-3 w-full" />
              </div>
            ))}
          </div>
        ) : (
          <StaggerGrid className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {duos.map((d, i) => {
              const sup = champsById.get(d.support)
              const adc = champsById.get(d.adc)
              return (
                <StaggerItem key={`${d.support}-${d.adc}-${i}`}>
                  <MotionCard>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <HexPortrait
                            championId={d.support}
                            alt={sup?.name ?? d.support}
                            size={42}
                            fallback={(sup?.name ?? d.support).slice(0, 2).toUpperCase()}
                          />
                          <span className="text-xs text-muted-foreground">+</span>
                          <HexPortrait
                            championId={d.adc}
                            alt={adc?.name ?? d.adc}
                            size={42}
                            fallback={(adc?.name ?? d.adc).slice(0, 2).toUpperCase()}
                          />
                          <div className="ml-1">
                            <div className="text-sm font-medium leading-tight">
                              {sup?.name ?? d.support} + {adc?.name ?? d.adc}
                            </div>
                            <div className="flex items-center gap-2">
                              <ScoreBar score={d.score} />
                              <Badge className={cn('border-white/10 text-[10px]', TAG_COLORS[d.tag] ?? 'bg-white/5 text-muted-foreground')} variant="secondary">
                                {d.tag}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{d.note}</p>
                    </CardContent>
                  </MotionCard>
                </StaggerItem>
              )
            })}
          </StaggerGrid>
        )}
      </section>

      {/* ── Team Comp Archetypes ───────────────────────────────────────────── */}
      <section>
        <h2 className="mb-4 text-lg font-semibold tracking-tight">Team Comp Archetypes</h2>
        <div className="space-y-4">
          {comps.map((comp, ci) => (
            <motion.div
              key={comp.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: ci * 0.06 }}
            >
              <MotionCard>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{comp.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{comp.description}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="mb-1.5 text-xs text-muted-foreground">Core picks</div>
                    <div className="flex flex-wrap gap-2">
                      {comp.core.map((id) => {
                        const c = champsById.get(id)
                        return (
                          <div key={id} className="flex items-center gap-1.5 rounded-2xl border border-white/10 bg-white/5 px-2 py-1">
                            <HexPortrait championId={id} alt={c?.name ?? id} size={28} fallback={(c?.name ?? id).slice(0, 2).toUpperCase()} />
                            <span className="text-xs">{c?.name ?? id}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  <div>
                    <div className="mb-1.5 text-xs text-muted-foreground">Flex options</div>
                    <div className="flex flex-wrap gap-2">
                      {comp.flex.map((id) => {
                        const c = champsById.get(id)
                        return (
                          <div key={id} className="flex items-center gap-1.5 rounded-2xl border border-white/10 bg-white/5 px-2 py-1 opacity-70">
                            <HexPortrait championId={id} alt={c?.name ?? id} size={24} fallback={(c?.name ?? id).slice(0, 2).toUpperCase()} />
                            <span className="text-xs text-muted-foreground">{c?.name ?? id}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-3">
                      <div className="text-xs text-emerald-300">Strength</div>
                      <div className="text-sm text-muted-foreground">{comp.strength}</div>
                    </div>
                    <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-3">
                      <div className="text-xs text-red-300">Weakness</div>
                      <div className="text-sm text-muted-foreground">{comp.weakness}</div>
                    </div>
                  </div>
                </CardContent>
              </MotionCard>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}

function ScoreBar({ score }: { score: number }) {
  const pct = (score / 10) * 100
  const color =
    score >= 9 ? 'bg-amber-400' : score >= 7 ? 'bg-violet-400' : score >= 5 ? 'bg-sky-400' : 'bg-slate-400'
  return (
    <div className="flex items-center gap-1.5">
      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-white/10">
        <div className={cn('h-full rounded-full', color)} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-[10px] text-muted-foreground">{score}/10</span>
    </div>
  )
}
