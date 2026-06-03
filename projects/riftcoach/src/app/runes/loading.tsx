export default function LoadingRunes() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="shimmer h-6 w-24 rounded-2xl bg-white/[0.06]" />
        <div className="shimmer h-4 w-80 rounded-2xl bg-white/[0.06]" />
      </div>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="rounded-3xl border border-white/10 bg-white/5 p-5 space-y-4">
          <div className="shimmer h-4 w-32 rounded-2xl bg-white/[0.06]" />
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 3 }).map((_, j) => (
              <div key={j} className="rounded-3xl border border-white/10 bg-white/5 p-4 space-y-3">
                <div className="flex gap-3"><div className="shimmer h-12 w-12 rounded-2xl bg-white/[0.06]" /><div className="space-y-2 flex-1"><div className="shimmer h-3 w-32 rounded-2xl bg-white/[0.06]" /><div className="shimmer h-3 w-20 rounded-2xl bg-white/[0.06]" /></div></div>
                <div className="shimmer h-3 w-full rounded-2xl bg-white/[0.06]" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
