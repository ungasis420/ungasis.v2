// src/components/build/SpellList.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";

// ──────────────────────────────────
// Types
// ──────────────────────────────────
interface Spell {
  name: string;
  cooldown: number | string;
  effect: string;
  reason?: string;
}

interface SpellListProps {
  spells: Spell[];
  reasoningLoading?: boolean;
}

// ──────────────────────────────────
// Shimmer
// ──────────────────────────────────
function ReasonShimmer() {
  return (
    <div className="mt-1.5 space-y-1">
      <div className="h-3 w-3/4 rounded bg-white/[0.06] animate-pulse" />
      <div className="h-3 w-1/2 rounded bg-white/[0.06] animate-pulse" />
    </div>
  );
}

// ──────────────────────────────────
// Component
// ──────────────────────────────────
export function SpellList({ spells, reasoningLoading }: SpellListProps) {
  if (!spells || spells.length === 0) return null;

  return (
    <div>
      <h5 className="text-base font-semibold text-white/90 mb-3">
        ⚔️ Summoner Spells
      </h5>

      <div className="space-y-2">
        {spells.map((s, i) => (
          <div
            key={i}
            className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5"
          >
            {/* Spell name + cooldown */}
            <p className="text-sm font-medium">
              <span className="text-sky-300">{s.name}</span>
              <span className="ml-2 text-xs text-white/40">
                ({s.cooldown}s CD)
              </span>
            </p>

            {/* Effect description */}
            <p className="mt-1 text-xs text-white/50 leading-relaxed">
              {s.effect}
            </p>

            {/* AI reasoning (fades in from Wave 2) */}
            <AnimatePresence>
              {s.reason && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="mt-1.5 text-xs text-sky-300/70 leading-relaxed"
                >
                  💡 {s.reason}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Shimmer while loading */}
            {reasoningLoading && !s.reason && <ReasonShimmer />}
          </div>
        ))}
      </div>
    </div>
  );
}