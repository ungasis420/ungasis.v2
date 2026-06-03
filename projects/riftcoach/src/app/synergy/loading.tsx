export default function LoadingSynergy() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="shimmer h-6 w-32 rounded-2xl bg-white/[0.06]" />
        <div className="shimmer h-4 w-80 rounded-2xl bg-white/[0.06]" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-3xl border border-white/10 bg-white/5 p-5 space-y-3">
            <div className="flex gap-3">
              <div className="shimmer h-11 w-11 rounded-2xl bg-white/[0.06]" />
              <div className="shimmer h-11 w-11 rounded-2xl bg-white/[0.06]" />
              <div className="flex-1 space-y-2">
                <div className="shimmer h-3 w-40 rounded-2xl bg-white/[0.06]" />
                <div className="shimmer h-3 w-24 rounded-2xl bg-white/[0.06]" />
              </div>
            </div>
            <div className="shimmer h-3 w-full rounded-2xl bg-white/[0.06]" />
          </div>
        ))}
      </div>
    </div>
  )
}
