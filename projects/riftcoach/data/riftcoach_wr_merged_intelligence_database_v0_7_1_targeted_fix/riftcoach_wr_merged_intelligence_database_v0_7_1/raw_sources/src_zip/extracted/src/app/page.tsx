'use client'

import Link from 'next/link'
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MotionCard } from '@/components/app/motion-card'
import { StaggerGrid, StaggerItem } from '@/components/app/stagger-grid'

const tiles = [
  { href: '/tierlist', title: 'Tier List', desc: 'Meta ranks with portraits + filters', tag: 'Meta' },
  { href: '/draft', title: 'Draft Helper', desc: 'Pick/ban guidance + counters + AI', tag: 'Live' },
  { href: '/builds', title: 'Builds', desc: 'Build templates with item + rune icons', tag: 'Core' },
  { href: '/items', title: 'Items', desc: 'Full item catalog with icons + search', tag: 'Ref' },
  { href: '/runes', title: 'Runes', desc: 'Runes grouped by path/slot with icons', tag: 'Ref' },
  { href: '/spells', title: 'Spells', desc: 'Summoner spells + cooldowns with icons', tag: 'Ref' },
  { href: '/coach', title: 'AI Coach', desc: 'Streaming chat + quick prompts', tag: 'AI' },
  { href: '/review', title: 'Match Review', desc: 'Stats input → AI insights', tag: 'AI' },
  { href: '/climb', title: 'Climb Guide', desc: 'Rank-based guidance and fundamentals', tag: 'Guide' },
  { href: '/settings', title: 'Settings', desc: 'Smart Router + API keys + model picks', tag: 'Config' },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-2">
        <div className="text-2xl font-semibold tracking-tight">RiftCoach</div>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Cinematic UI live — animated background, staggered cards, tier badge glow, shimmer skeletons, and page transitions.
        </p>
      </header>

      <StaggerGrid className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tiles.map((t) => (
          <StaggerItem key={t.href}>
            <Link href={t.href} className="block h-full">
              <MotionCard className="h-full">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{t.title}</CardTitle>
                    <Badge variant="secondary" className="border-white/10 bg-white/5">
                      {t.tag}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{t.desc}</p>
                </CardContent>
              </MotionCard>
            </Link>
          </StaggerItem>
        ))}
      </StaggerGrid>

      <div className="grid gap-4 lg:grid-cols-2">
        <MotionCard delay={0.3}>
          <CardHeader>
            <CardTitle className="text-base">Quick Start</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>1) Go to <span className="text-foreground">Settings</span> and paste your OpenRouter keys.</p>
            <p>2) Try <span className="text-foreground">Draft Helper</span> for pick/counter guidance.</p>
            <p>3) Open <span className="text-foreground">Tier List</span> and click a champion for details.</p>
          </CardContent>
        </MotionCard>

        <MotionCard delay={0.36}>
          <CardHeader>
            <CardTitle className="text-base">What's New in Phase 1.2</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• Animated gradient orbs drifting behind the UI</p>
            <p>• Staggered card entrance animations</p>
            <p>• Tier badges glow (S+ gold pulse, S orange pulse)</p>
            <p>• Shimmer sweep loading skeletons</p>
            <p>• Hover lift + glow on all cards</p>
            <p>• Film-grain texture overlay</p>
          </CardContent>
        </MotionCard>
      </div>
    </div>
  )
}
