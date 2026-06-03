// src/components/build/RuneList.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";

// ──────────────────────────────────
// Types
// ──────────────────────────────────
interface Rune {
  slot: string;
  name: string;
  description: string;
  reason?: string;
}

interface RuneListProps {
  runes: Rune[];
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
export function RuneList({ runes, reasoningLoading }: RuneListProps) {
  if (!runes || runes.length === 0) return null;

  return (
    <div>
      <h5 className="text-base font-semibold text-white/90 mb-3">
        🔮 Rune Page
      </h5>

      <div className="space-y-2">
        {runes.map((r, i) => (
          <div
            key={i}
            className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5"
          >
            {/* Rune name + slot */}
            <p className="text-sm font-medium">
              <span className="text-violet-400">{r.slot}</span>
              <span className="text-white/40"> — </span>
              <span className="text-violet-300">{r.name}</span>
            </p>

            {/* Description */}
            <p className="mt-1 text-xs text-white/50 leading-relaxed">
              {r.description}
            </p>

            {/* AI reasoning (fades in from Wave 2) */}
            <AnimatePresence>
              {r.reason && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="mt-1.5 text-xs text-violet-300/70 leading-relaxed"
                >
                  💡 {r.reason}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Shimmer while loading */}
            {reasoningLoading && !r.reason && <ReasonShimmer />}
          </div>
        ))}
      </div>
    </div>
  );
}