// src/components/build/SynergyChamps.tsx
"use client";

import { motion } from "framer-motion";

// ──────────────────────────────────
// Types
// ──────────────────────────────────
interface Synergy {
  champion: string;
  role: string;
  synergy_type: string;
  score: number;
  reason: string;
  notes: string;
}

interface SynergyChampsProps {
  synergies: Synergy[];
  synergyRationale?: Record<string, string>; // 🆕
}


// ──────────────────────────────────
// Score → color mapping
// ──────────────────────────────────
function scoreColor(score: number): string {
  if (score >= 0.9) return "#34d399";  // emerald — S-tier
  if (score >= 0.7) return "#60a5fa";  // blue — strong
  if (score >= 0.5) return "#a78bfa";  // violet — good
  return "#94a3b8";                    // slate — situational
}

function scoreTier(score: number): string {
  if (score >= 0.9) return "S";
  if (score >= 0.7) return "A";
  if (score >= 0.5) return "B";
  return "C";
}

// ──────────────────────────────────
// Component
// ──────────────────────────────────
export function SynergyChamps({ synergies, synergyRationale }: SynergyChampsProps) {
  if (!synergies || synergies.length === 0) return null;

  return (
    <div>
      <h5 className="text-base font-semibold text-white/90 mb-3">
        🤝 Best Synergies
      </h5>

      <div className="space-y-2">
        {synergies.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06, duration: 0.25 }}
            className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5"
          >
            {/* Top row: champion name + synergy type badge + score */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {/* Champion name */}
                <span className="text-sm font-medium text-emerald-300">
                  {s.champion}
                </span>

                {/* Synergy type badge */}
                <span
                  className="text-[10px] font-medium uppercase tracking-wider px-1.5 py-0.5 rounded"
                  style={{
                    background: "rgba(52, 211, 153, 0.1)",
                    color: "rgba(52, 211, 153, 0.7)",
                    border: "1px solid rgba(52, 211, 153, 0.15)",
                  }}
                >
                  {s.synergy_type}
                </span>
              </div>

              {/* Score tier badge */}
              <span
                className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                style={{
                  background: `${scoreColor(s.score)}15`,
                  color: scoreColor(s.score),
                  border: `1px solid ${scoreColor(s.score)}25`,
                }}
              >
                {scoreTier(s.score)} ({(s.score * 100).toFixed(0)}%)
              </span>
            </div>

            {/* Reason */}
            {/* AI rationale (priority) */}
            {synergyRationale?.[s.champion] ? (
              <p className="mt-1.5 text-xs text-white/50 leading-relaxed">
                💡 {synergyRationale[s.champion]}
              </p>
            ) : (
              <p className="mt-1.5 text-xs text-white/50 leading-relaxed">
                {s.reason || s.notes}
              </p>
            )}

            {/* Notes (if different from reason) */}
            {s.notes && s.notes !== s.reason && (
              <p className="mt-1 text-xs text-emerald-400/40 leading-relaxed">
                💡 {s.notes}
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}