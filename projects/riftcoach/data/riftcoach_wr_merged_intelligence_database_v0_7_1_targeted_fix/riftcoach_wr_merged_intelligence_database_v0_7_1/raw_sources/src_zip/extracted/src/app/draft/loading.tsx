export default function LoadingDraft() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="shimmer h-6 w-36 rounded-2xl bg-white/[0.06]" />
        <div className="shimmer h-4 w-80 rounded-2xl bg-white/[0.06]" />
      </div>
      <div className="flex gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="shimmer h-8 w-20 rounded-full bg-white/[0.06]" />
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
        <div className="space-y-4">
          <div className="shimmer h-10 rounded-2xl bg-white/[0.06]" />
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="shimmer h-9 w-9 rounded-2xl bg-white/[0.06]" />
                <div className="flex-1 space-y-1">
                  <div className="shimmer h-3 w-28 rounded-2xl bg-white/[0.06]" />
                  <div className="shimmer h-3 w-16 rounded-2xl bg-white/[0.06]" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 flex items-center justify-center">
          <div className="shimmer h-4 w-56 rounded-2xl bg-white/[0.06]" />
        </div>
      </div>
    </div>
  )
}
