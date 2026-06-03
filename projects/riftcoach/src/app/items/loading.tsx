export default function LoadingItems() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="shimmer h-6 w-24 rounded-2xl bg-white/[0.06]" />
        <div className="shimmer h-4 w-72 rounded-2xl bg-white/[0.06]" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="rounded-3xl border border-white/10 bg-white/5 p-5 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3"><div className="shimmer h-12 w-12 rounded-2xl bg-white/[0.06]" /><div className="space-y-2"><div className="shimmer h-3 w-40 rounded-2xl bg-white/[0.06]" /><div className="shimmer h-3 w-20 rounded-2xl bg-white/[0.06]" /></div></div>
              <div className="shimmer h-5 w-16 rounded-full bg-white/[0.06]" />
            </div>
            <div className="shimmer h-3 w-52 rounded-2xl bg-white/[0.06]" /><div className="shimmer h-3 w-44 rounded-2xl bg-white/[0.06]" />
          </div>
        ))}
      </div>
    </div>
  )
}
