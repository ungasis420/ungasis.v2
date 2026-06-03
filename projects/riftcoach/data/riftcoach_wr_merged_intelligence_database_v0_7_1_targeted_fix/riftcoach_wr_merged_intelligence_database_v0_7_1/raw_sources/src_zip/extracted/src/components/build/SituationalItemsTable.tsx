// src/components/build/SituationalItemsTable.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";

// ──────────────────────────────────
// Types
// ──────────────────────────────────
interface SituationalItem {
  name: string;
  cost: number | string;
  stats: string;
  passive: string;
  when?: string;
  reason?: string;
}

interface SituationalItemsTableProps {
  items: SituationalItem[];
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
export function SituationalItemsTable({
  items,
  reasoningLoading,
}: SituationalItemsTableProps) {
  if (!items || items.length === 0) return null;

  return (
    <div>
      <h5 className="text-base font-semibold text-white/90 mb-3">
        🛡️ Situational Items
      </h5>

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-[11px] uppercase tracking-wider text-white/50 text-left py-2 px-2">
              Item
            </th>
            <th className="text-[11px] uppercase tracking-wider text-white/50 text-left py-2 px-2">
              Cost
            </th>
            <th className="text-[11px] uppercase tracking-wider text-white/50 text-left py-2 px-2">
              Stats
            </th>
            <th className="text-[11px] uppercase tracking-wider text-white/50 text-left py-2 px-2">
              Passive / Effect
            </th>
          </tr>
        </thead>

        <tbody>
          {items.map((item, i) => (
            <tr key={i} className="group">
              <td className="py-2 px-2 text-white/90 hover:bg-white/[0.03]">
                {item.name}
              </td>
              <td className="py-2 px-2 font-mono text-amber-400 hover:bg-white/[0.03]">
                {Number(item.cost).toLocaleString()}g
              </td>
              <td className="py-2 px-2 text-white/70 hover:bg-white/[0.03]">
                {item.stats}
              </td>
              <td className="py-2 px-2 text-white/70 hover:bg-white/[0.03]">
                {item.passive}

                {/* When to use (from build data) */}
                {item.when && (
                  <p className="mt-1 text-xs text-amber-400/60">
                    ⏰ {item.when}
                  </p>
                )}

                {/* AI Reasoning (fades in from Wave 2) */}
                <AnimatePresence>
                  {item.reason && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="mt-1.5 text-xs text-cyan-300/70 leading-relaxed"
                    >
                      💡 {item.reason}
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Shimmer while loading */}
                {reasoningLoading && !item.reason && <ReasonShimmer />}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}