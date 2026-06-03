import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function LoadingTierList() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="shimmer h-6 w-40 rounded-2xl bg-white/[0.06]" />
        <div className="shimmer h-4 w-72 rounded-2xl bg-white/[0.06]" />
      </div>
      <Card className="glass rounded-3xl border-white/10">
        <CardHeader className="pb-2"><CardTitle className="text-base">Loading…</CardTitle></CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-3">
                  <div className="shimmer h-[54px] w-[54px] rounded-2xl bg-white/[0.06]" />
                  <div className="flex-1 space-y-2">
                    <div className="shimmer h-3 w-32 rounded-2xl bg-white/[0.06]" />
                    <div className="shimmer h-3 w-20 rounded-2xl bg-white/[0.06]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
