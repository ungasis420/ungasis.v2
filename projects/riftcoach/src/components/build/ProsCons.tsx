// src/components/build/ProsCons.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";

// ──────────────────────────────────
// Types
// ──────────────────────────────────
interface ProsConsProps {
  pros: string[];
  cons: string[];
  consMitigation?: string[];
  reasoningLoading?: boolean;
}

// ──────────────────────────────────
// Shimmer
// ──────────────────────────────────
function ListShimmer({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-2 mt-2">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="h-4 rounded bg-white/[0.06] animate-pulse"
          style={{ width: `${75 - i * 10}%` }}
        />
      ))}
    </div>
  );
}

// ──────────────────────────────────
// Component
// ──────────────────────────────────
export function ProsCons({ pros, cons, consMitigation, reasoningLoading }: ProsConsProps) {
  const hasPros = pros && pros.length > 0;
  const hasCons = cons && cons.length > 0;
  const hasMitigation = consMitigation && consMitigation.length > 0;

  // Show shimmer if reasoning is loading (pros/cons haven't arrived yet)
  if (!hasPros && !hasCons && !reasoningLoading) return null;

  return (
    <div>
      <h5 className="text-base font-semibold text-white/90 mb-3">
        ⚖️ Pros & Cons
      </h5>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* ── Pros ── */}
        <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/[0.04] px-4 py-3">
          <p className="text-sm font-semibold text-emerald-400 mb-2">
            ✅ Strengths
          </p>

          <AnimatePresence>
            {hasPros && (
              <motion.ul
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35 }}
                className="space-y-1.5"
              >
                {pros.map((p, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.25 }}
                    className="text-xs text-white/70 leading-relaxed"
                  >
                    • {p}
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>

          {reasoningLoading && !hasPros && <ListShimmer count={4} />}
        </div>

        {/* ── Cons ── */}
        <div className="rounded-lg border border-red-500/20 bg-red-500/[0.04] px-4 py-3">
          <p className="text-sm font-semibold text-red-400 mb-2">
            ❌ Weaknesses
          </p>

          <AnimatePresence>
            {hasCons && (
              <motion.ul
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35 }}
                className="space-y-1.5"
              >
                {cons.map((c, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.25 }}
                    className="text-xs text-white/70 leading-relaxed"
                  >
                    • {c}

                    {/* ── Mitigation (inline under each con) ── */}
                    {hasMitigation && consMitigation[i] && (
                      <span className="block mt-0.5 text-amber-400/70 pl-3">
                        ↳ {consMitigation[i]}
                      </span>
                    )}
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>

          {reasoningLoading && !hasCons && <ListShimmer count={4} />}
        </div>
      </div>
    </div>
  );
}