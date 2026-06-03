'use client'

import * as React from 'react'
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useGameData } from '@/lib/use-game-data'
import { SmartImage } from '@/components/app/smart-image'
import { MotionCard } from '@/components/app/motion-card'
import { StaggerGrid, StaggerItem } from '@/components/app/stagger-grid'
import { Shimmer } from '@/components/app/shimmer'

type Spell = { id: string; name: string; effect: string; cooldown: number; bestOn?: string; image?: string }

export default function SpellsPage() {
  const { data, loading, error } = useGameData<Spell[]>('/data/spells.json')

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Summoner Spells</h1>
        <p className="text-sm text-muted-foreground">Icons auto-resolve. Cards stagger in with hover lift.</p>
      </header>

      {error && <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">{error}</div>}

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-3xl border border-white/10 bg-white/5 p-5 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3"><Shimmer className="h-12 w-12 !rounded-2xl" /><div className="space-y-2"><Shimmer className="h-3 w-28" /><Shimmer className="h-3 w-40" /></div></div>
                <Shimmer className="h-5 w-14 !rounded-full" />
              </div>
              <Shimmer className="h-3 w-56" /><Shimmer className="h-3 w-44" />
            </div>
          ))}
        </div>
      ) : (
        <StaggerGrid className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {(data ?? []).map((s) => (
            <StaggerItem key={s.id}>
              <MotionCard>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <SmartImage src={s.image} assetId={s.id} dir="/images/spells/" alt={s.name} size={48} rounded="rounded-2xl" />
                      <div>
                        <CardTitle className="text-base">{s.name}</CardTitle>
                        {s.bestOn && <div className="text-xs text-muted-foreground">Best on: {s.bestOn}</div>}
                      </div>
                    </div>
                    <Badge variant="secondary" className="border-white/10 bg-white/5">{s.cooldown}s</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{s.effect}</p>
                </CardContent>
              </MotionCard>
            </StaggerItem>
          ))}
        </StaggerGrid>
      )}
    </div>
  )
}
