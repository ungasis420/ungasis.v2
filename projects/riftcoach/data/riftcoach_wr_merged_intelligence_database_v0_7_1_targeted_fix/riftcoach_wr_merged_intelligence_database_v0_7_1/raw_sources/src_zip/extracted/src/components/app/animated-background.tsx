'use client'

/**
 * AnimatedBackground — Phase 1.2
 *
 * Renders 5 soft gradient orbs that drift slowly across the viewport.
 * Pure CSS @keyframes — no requestAnimationFrame, no canvas, no JS particles.
 * Sits behind everything (z-0, pointer-events-none).
 */
export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Base dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(222,84%,5%)] to-[hsl(222,84%,3%)]" />

      {/* Orb 1 — large indigo, top-left drift */}
      <div className="orb orb-1" />

      {/* Orb 2 — fuchsia/pink, right drift */}
      <div className="orb orb-2" />

      {/* Orb 3 — cyan accent, bottom */}
      <div className="orb orb-3" />

      {/* Orb 4 — subtle violet, center-right */}
      <div className="orb orb-4" />

      {/* Orb 5 — deep blue, slow roam */}
      <div className="orb orb-5" />

      {/* Noise/grain overlay for cinematic texture */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22><filter id=%22n%22><feTurbulence baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/></filter><rect width=%22200%22 height=%22200%22 filter=%22url(%23n)%22 opacity=%220.5%22/></svg>')]" />
    </div>
  )
}
