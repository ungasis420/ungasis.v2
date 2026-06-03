export default function LoadingSpells() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="shimmer h-6 w-40 rounded-2xl bg-white/[0.06]" />
        <div className="shimmer h-4 w-72 rounded-2xl bg-white/[0.06]" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-3xl border border-white/10 bg-white/5 p-5 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3"><div className="shimmer h-12 w-12 rounded-2xl bg-white/[0.06]" /><div className="space-y-2"><div className="shimmer h-3 w-28 rounded-2xl bg-white/[0.06]" /><div className="shimmer h-3 w-40 rounded-2xl bg-white/[0.06]" /></div></div>
              <div className="shimmer h-5 w-14 rounded-full bg-white/[0.06]" />
            </div>
            <div className="shimmer h-3 w-56 rounded-2xl bg-white/[0.06]" /><div className="shimmer h-3 w-44 rounded-2xl bg-white/[0.06]" />
          </div>
        ))}
      </div>
    </div>
  )
}
