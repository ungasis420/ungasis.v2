'use client'

import * as React from 'react'
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useGameData } from '@/lib/use-game-data'
import { HexPortrait } from '@/components/app/hex-portrait'
import { TierBadge } from '@/components/app/tier-badge'
import { MotionCard } from '@/components/app/motion-card'
import { StaggerGrid, StaggerItem } from '@/components/app/stagger-grid'
import { Shimmer } from '@/components/app/shimmer'
import { motion, AnimatePresence } from 'framer-motion'

/* ── Types ─────────────────────────────────────────────────────────────────── */

type Champion = {
  id: string
  name: string
  tier: string
  roles: string[]
  classes?: string[]
  style?: string
  image?: string
}

type CounterEntry = {
  id: string
  name: string
  threat: 'major' | 'even' | 'minor'
  tip: string
}

type CounterData = {
  champion: string
  role: string
  counters: CounterEntry[]
  note?: string
}

type DuoPair = {
  support: string
  adc: string
  score: number
  tag: string
  note: string
}

type SynergyData = {
  duo_lane: DuoPair[]
  team_comps: unknown[]
}

/* ── Constants ─────────────────────────────────────────────────────────────── */

const ROLES = ['Baron', 'Jungle', 'Mid', 'Duo', 'Support'] as const
type Role = (typeof ROLES)[number]

const THREAT_STYLES: Record<string, { border: string; bg: string; text: string; label: string }> = {
  major: { border: 'border-red-500/25', bg: 'bg-red-500/8', text: 'text-red-300', label: 'Hard Counter' },
  even: { border: 'border-amber-500/25', bg: 'bg-amber-500/8', text: 'text-amber-300', label: 'Skill Matchup' },
  minor: { border: 'border-emerald-500/25', bg: 'bg-emerald-500/8', text: 'text-emerald-300', label: 'Slight Edge' },
}

const MY_POOL = ['karma', 'swain', 'nautilus', 'senna', 'seraphine', 'soraka', 'milio']

/* ── Page ──────────────────────────────────────────────────────────────────── */

export default function DraftPage() {
  const champState = useGameData<Champion[]>('/data/champions.json')
  const counterState = useGameData<CounterData[]>('/data/counters.json')
  const synergyState = useGameData<SynergyData>('/data/synergies.json')

  const [role, setRole] = React.useState<Role>('Support')
  const [query, setQuery] = React.useState('')
  const [picked, setPicked] = React.useState<Champion | null>(null)

  // AI state
  const [aiQuery, setAiQuery] = React.useState('')
  const [aiResponse, setAiResponse] = React.useState('')
  const [aiLoading, setAiLoading] = React.useState(false)

  const champsById = React.useMemo(() => {
    const m = new Map<string, Champion>()
    ;(champState.data ?? []).forEach((c) => m.set(c.id, c))
    return m
  }, [champState.data])

  /* ── Filtered champion list for picker ──────────────────────────────────── */
  const pickable = React.useMemo(() => {
    const list = champState.data ?? []
    const q = query.trim().toLowerCase()
    return list
      .filter((c) => c.roles?.includes(role))
      .filter((c) => (!q ? true : c.name.toLowerCase().includes(q) || c.id.includes(q)))
      .sort((a, b) => tierRank(a.tier) - tierRank(b.tier) || a.name.localeCompare(b.name))
  }, [champState.data, role, query])

  /* ── Counters for the picked champion ───────────────────────────────────── */
  const myCounters = React.useMemo(() => {
    if (!picked) return null
    const data = counterState.data ?? []
    return data.find(
      (c) => c.champion === picked.id && c.role === role
    ) ?? data.find(
      (c) => c.champion === picked.id
    ) ?? null
  }, [counterState.data, picked, role])

  /* ── Who does the picked champion counter? (reverse lookup) ─────────────── */
  const countersFor = React.useMemo(() => {
    if (!picked) return []
    const data = counterState.data ?? []
    const results: { champion: string; role: string; threat: string; tip: string }[] = []
    for (const entry of data) {
      for (const c of entry.counters) {
        if (c.id === picked.id) {
          results.push({
            champion: entry.champion,
            role: entry.role,
            threat: c.threat,
            tip: c.tip,
          })
        }
      }
    }
    return results
  }, [counterState.data, picked])

  /* ── Duo synergies (if Support role) ────────────────────────────────────── */
  const duoSynergies = React.useMemo(() => {
    if (!picked || role !== 'Support') return []
    const duos = synergyState.data?.duo_lane ?? []
    return duos
      .filter((d) => d.support === picked.id)
      .sort((a, b) => b.score - a.score)
  }, [synergyState.data, picked, role])

  /* ── Top picks for role (quick reference) ───────────────────────────────── */
  const topPicks = React.useMemo(() => {
    const list = champState.data ?? []
    return list
      .filter((c) => c.roles?.includes(role))
      .sort((a, b) => tierRank(a.tier) - tierRank(b.tier))
      .slice(0, 8)
  }, [champState.data, role])

  /* ── AI draft advice ────────────────────────────────────────────────────── */
  const handleAiAdvice = React.useCallback(async () => {
    const prompt = aiQuery.trim() ||
      (picked
        ? `I'm playing ${picked.name} ${role}. What should I watch out for in draft and what are my best/worst matchups?`
        : `What are the best picks for ${role} lane in the current meta?`)

    setAiLoading(true)
    setAiResponse('')
    setAiQuery('')

    try {
      const res = await fetch('/api/draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [{ role: 'user', content: prompt }] }),
      })
      if (!res.ok || !res.body) throw new Error('AI request failed')

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let text = ''
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        text += decoder.decode(value, { stream: true })
        setAiResponse(text)
      }
    } catch {
      setAiResponse('AI is unavailable. Check Settings → API keys.')
    } finally {
      setAiLoading(false)
    }
  }, [aiQuery, picked, role])

  const loading = champState.loading || counterState.loading || synergyState.loading

  return (
    <div className="space-y-6">
      {/* ── Header + Role Selector ──────────────────────────────────────── */}
      <header className="space-y-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Draft Helper</h1>
          <p className="text-sm text-muted-foreground">
            Pick a role → select your champion → see counters, synergies, and AI advice.
            <span className="ml-1 text-xs text-indigo-300">162 matchups wired</span>
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {ROLES.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => { setRole(r); setPicked(null); setQuery('') }}
              className={cn(
                'rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium backdrop-blur transition',
                r === role ? 'bg-white/10 text-foreground glow' : 'text-muted-foreground hover:bg-white/8'
              )}
            >
              {r}
            </button>
          ))}
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
        {/* ── Left: Champion Picker ──────────────────────────────────────── */}
        <div className="space-y-4">
          {/* Search */}
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${role} champions...`}
            className="rounded-2xl border-white/10 bg-white/5 backdrop-blur"
          />

          {/* My pool quick-pick (Support only) */}
          {role === 'Support' && (
            <div>
              <div className="mb-2 text-xs text-muted-foreground">My Pool</div>
              <div className="flex flex-wrap gap-2">
                {MY_POOL.map((id) => {
                  const c = champsById.get(id)
                  if (!c) return null
                  const active = picked?.id === id
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setPicked(active ? null : c)}
                      className={cn(
                        'flex items-center gap-1.5 rounded-2xl border px-2 py-1 text-xs transition',
                        active
                          ? 'border-indigo-500/40 bg-indigo-500/15 text-foreground glow'
                          : 'border-white/10 bg-white/5 text-muted-foreground hover:bg-white/8'
                      )}
                    >
                      <HexPortrait championId={id} alt={c.name} size={24} fallback={c.name.slice(0, 2).toUpperCase()} />
                      {c.name}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Top picks */}
          <Card className="glass rounded-3xl border-white/10">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">Top {role} Picks</CardTitle>
                <span className="text-xs text-muted-foreground">{loading ? '…' : `${topPicks.length} shown`}</span>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Shimmer className="h-10 w-10 !rounded-2xl" />
                      <div className="flex-1 space-y-1"><Shimmer className="h-3 w-28" /><Shimmer className="h-3 w-16" /></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-1">
                  {topPicks.map((c) => {
                    const active = picked?.id === c.id
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setPicked(active ? null : c)}
                        className={cn(
                          'flex w-full items-center justify-between gap-3 rounded-2xl px-3 py-2 text-left text-sm transition',
                          active
                            ? 'bg-white/10 text-foreground shadow-sm shadow-indigo-500/15'
                            : 'text-muted-foreground hover:bg-white/5'
                        )}
                      >
                        <div className="flex items-center gap-2.5">
                          <HexPortrait championId={c.id} src={c.image} alt={c.name} size={36} fallback={initials(c.name)} />
                          <span className={cn(active && 'text-foreground')}>{c.name}</span>
                        </div>
                        <TierBadge tier={c.tier} />
                      </button>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Full list (scrollable) */}
          <Card className="glass rounded-3xl border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">All {role} Champions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="max-h-[300px] space-y-1 overflow-y-auto pr-1">
                {loading ? (
                  Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3 py-1">
                      <Shimmer className="h-8 w-8 !rounded-xl" />
                      <Shimmer className="h-3 w-32" />
                    </div>
                  ))
                ) : (
                  pickable.map((c) => {
                    const active = picked?.id === c.id
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setPicked(active ? null : c)}
                        className={cn(
                          'flex w-full items-center justify-between gap-2 rounded-xl px-2 py-1.5 text-left text-xs transition',
                          active
                            ? 'bg-white/10 text-foreground'
                            : 'text-muted-foreground hover:bg-white/5'
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <HexPortrait championId={c.id} src={c.image} alt={c.name} size={28} fallback={initials(c.name)} />
                          <span>{c.name}</span>
                        </div>
                        <TierBadge tier={c.tier} className="text-[9px] px-1.5" />
                      </button>
                    )
                  })
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ── Right: Counter / Synergy / AI panels ──────────────────────── */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {!picked ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="glass rounded-3xl border-white/10">
                  <CardContent className="flex min-h-[200px] items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <div className="text-lg">👈 Pick a champion</div>
                      <div className="mt-1 text-sm">Select from the left panel to see counters, synergies, and AI advice</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key={picked.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="space-y-6"
              >
                {/* ── Selected champion header ─────────────────────────── */}
                <MotionCard>
                  <CardContent className="flex items-center gap-4 py-5">
                    <HexPortrait championId={picked.id} src={picked.image} alt={picked.name} size={64} fallback={initials(picked.name)} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold">{picked.name}</span>
                        <TierBadge tier={picked.tier} />
                        <Badge variant="secondary" className="border-white/10 bg-white/5">{role}</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {picked.classes?.join(' / ') ?? '—'}
                        {picked.style ? ` • ${picked.style}` : ''}
                      </div>
                    </div>
                  </CardContent>
                </MotionCard>

                {/* ── Counters Panel ───────────────────────────────────── */}
                <MotionCard delay={0.06}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">🛡️ Who Counters {picked.name}</CardTitle>
                      <span className="text-xs text-muted-foreground">
                        {myCounters ? `${myCounters.counters.length} matchups` : 'No data yet'}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {!myCounters ? (
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-muted-foreground">
                        No counter data for {picked.name} ({role}) yet. More matchups coming in future updates.
                      </div>
                    ) : (
                      <StaggerGrid className="space-y-3">
                        {myCounters.counters.map((c) => {
                          const s = THREAT_STYLES[c.threat] ?? THREAT_STYLES.even
                          const champ = champsById.get(c.id)
                          return (
                            <StaggerItem key={c.id}>
                              <div className={cn('rounded-3xl border p-4', s.border, s.bg)}>
                                <div className="flex items-start gap-3">
                                  <HexPortrait championId={c.id} alt={c.name} size={44} fallback={c.name.slice(0, 2).toUpperCase()} />
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                      <span className="font-medium">{c.name}</span>
                                      <span className={cn('rounded-full border px-2 py-0.5 text-[10px] font-semibold', s.border, s.text)}>
                                        {s.label}
                                      </span>
                                      {champ && <TierBadge tier={champ.tier} className="text-[9px] px-1.5" />}
                                    </div>
                                    <p className="mt-1 text-sm text-muted-foreground">{c.tip}</p>
                                  </div>
                                </div>
                              </div>
                            </StaggerItem>
                          )
                        })}
                      </StaggerGrid>
                    )}
                  </CardContent>
                </MotionCard>

                {/* ── Reverse: Who does this champion counter? ─────────── */}
                {countersFor.length > 0 && (
                  <MotionCard delay={0.12}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">⚔️ {picked.name} Counters</CardTitle>
                        <span className="text-xs text-muted-foreground">{countersFor.length} matchups</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <StaggerGrid className="space-y-3">
                        {countersFor.map((cf, i) => {
                          const champ = champsById.get(cf.champion)
                          const s = THREAT_STYLES[cf.threat] ?? THREAT_STYLES.even
                          return (
                            <StaggerItem key={`${cf.champion}-${i}`}>
                              <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                                <div className="flex items-start gap-3">
                                  <HexPortrait championId={cf.champion} alt={champ?.name ?? cf.champion} size={44} fallback={(champ?.name ?? cf.champion).slice(0, 2).toUpperCase()} />
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                      <span className="font-medium">{champ?.name ?? cf.champion}</span>
                                      <Badge variant="secondary" className="border-white/10 bg-white/5 text-[10px]">{cf.role}</Badge>
                                      <span className={cn('rounded-full border px-2 py-0.5 text-[10px] font-semibold', s.border, s.text)}>
                                        vs {s.label}
                                      </span>
                                    </div>
                                    <p className="mt-1 text-sm text-muted-foreground">{cf.tip}</p>
                                  </div>
                                </div>
                              </div>
                            </StaggerItem>
                          )
                        })}
                      </StaggerGrid>
                    </CardContent>
                  </MotionCard>
                )}

                {/* ── Duo Synergies (Support only) ────────────────────── */}
                {role === 'Support' && duoSynergies.length > 0 && (
                  <MotionCard delay={0.18}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">💞 Best ADC Pairings</CardTitle>
                        <span className="text-xs text-muted-foreground">{duoSynergies.length} pairings</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <StaggerGrid className="grid gap-3 sm:grid-cols-2">
                        {duoSynergies.map((d, i) => {
                          const adc = champsById.get(d.adc)
                          return (
                            <StaggerItem key={`${d.adc}-${i}`}>
                              <div className="rounded-3xl border border-white/10 bg-white/5 p-4 glass-hover">
                                <div className="flex items-center gap-3">
                                  <HexPortrait championId={d.adc} alt={adc?.name ?? d.adc} size={42} fallback={(adc?.name ?? d.adc).slice(0, 2).toUpperCase()} />
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                      <span className="font-medium text-sm">{adc?.name ?? d.adc}</span>
                                      <ScoreBar score={d.score} />
                                    </div>
                                    <div className="flex items-center gap-1.5 mt-0.5">
                                      <Badge variant="secondary" className={cn('border-white/10 text-[10px]', tagColor(d.tag))}>{d.tag}</Badge>
                                    </div>
                                  </div>
                                </div>
                                <p className="mt-2 text-xs text-muted-foreground">{d.note}</p>
                              </div>
                            </StaggerItem>
                          )
                        })}
                      </StaggerGrid>
                    </CardContent>
                  </MotionCard>
                )}

                {/* ── AI Draft Advice ─────────────────────────────────── */}
                <MotionCard delay={0.24}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">🤖 AI Draft Advice</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex gap-2">
                      <Input
                        value={aiQuery}
                        onChange={(e) => setAiQuery(e.target.value)}
                        placeholder={`Ask about ${picked.name} draft...`}
                        className="rounded-2xl border-white/10 bg-white/5 backdrop-blur"
                        onKeyDown={(e) => e.key === 'Enter' && !aiLoading && handleAiAdvice()}
                      />
                      <button
                        type="button"
                        onClick={handleAiAdvice}
                        disabled={aiLoading}
                        className={cn(
                          'shrink-0 rounded-2xl border border-white/10 bg-indigo-500/20 px-4 py-2 text-xs font-medium text-indigo-200 backdrop-blur transition',
                          'hover:bg-indigo-500/30',
                          aiLoading && 'opacity-50 cursor-not-allowed'
                        )}
                      >
                        {aiLoading ? 'Thinking…' : 'Ask AI'}
                      </button>
                    </div>

                    {/* Quick prompts */}
                    <div className="flex flex-wrap gap-2">
                      {[
                        `Best bans when playing ${picked.name}?`,
                        `${picked.name} teamfight positioning?`,
                        `Early game tips for ${picked.name}?`,
                      ].map((prompt) => (
                        <button
                          key={prompt}
                          type="button"
                          onClick={() => { setAiQuery(prompt); }}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] text-muted-foreground transition hover:bg-white/8"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>

                    {aiResponse && (
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <div className="whitespace-pre-wrap text-sm text-muted-foreground">{aiResponse}</div>
                      </div>
                    )}
                  </CardContent>
                </MotionCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

/* ── Helper components ─────────────────────────────────────────────────────── */

function ScoreBar({ score }: { score: number }) {
  const pct = (score / 10) * 100
  const color = score >= 9 ? 'bg-amber-400' : score >= 7 ? 'bg-violet-400' : score >= 5 ? 'bg-sky-400' : 'bg-slate-400'
  return (
    <div className="flex items-center gap-1.5">
      <div className="h-1.5 w-14 overflow-hidden rounded-full bg-white/10">
        <div className={cn('h-full rounded-full', color)} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-[10px] text-muted-foreground">{score}/10</span>
    </div>
  )
}

function tagColor(tag: string) {
  const map: Record<string, string> = {
    poke: 'text-sky-300 bg-sky-500/12',
    kill: 'text-red-300 bg-red-500/12',
    combo: 'text-violet-300 bg-violet-500/12',
    utility: 'text-emerald-300 bg-emerald-500/12',
    sustain: 'text-green-300 bg-green-500/12',
    hypercarry: 'text-amber-300 bg-amber-500/12',
    scaling: 'text-orange-300 bg-orange-500/12',
    protect: 'text-blue-300 bg-blue-500/12',
  }
  return map[tag] ?? 'bg-white/5 text-muted-foreground'
}

function initials(name: string) {
  return name.split(' ').slice(0, 2).map((p) => p[0]).join('').toUpperCase()
}

function tierRank(t: string) {
  const map: Record<string, number> = { 'S+': 0, S: 1, A: 2, B: 3, C: 4 }
  return map[t] ?? 9
}
