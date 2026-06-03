// src/components/build/MatchupList.tsx
"use client";

import { motion } from "framer-motion";

// ──────────────────────────────────
// Types
// ──────────────────────────────────
interface Matchup {
  champion: string;
  difficulty: number;
  advantage?: string;
  threat_level?: string;
  reason: string;
  win_condition: string[];
  counterplay: string[];
}

interface MatchupListProps {
  matchups: Matchup[];
  mode: "strong" | "weak";
  matchupRationale?: Record<string, string>; // 🆕
}

// ──────────────────────────────────
// Color + label helpers
// ──────────────────────────────────
function getAccent(mode: "strong" | "weak") {
  return mode === "strong"
    ? { color: "#34d399", bg: "rgba(52, 211, 153, 0.08)", border: "rgba(52, 211, 153, 0.15)" }
    : { color: "#f87171", bg: "rgba(248, 113, 113, 0.08)", border: "rgba(248, 113, 113, 0.15)" };
}

function getDifficultyBadge(matchup: Matchup, mode: "strong" | "weak"): string {
  if (mode === "strong") {
    return matchup.advantage || (matchup.difficulty <= 0.3 ? "Hard Counter" : "Favorable");
  }
  return matchup.threat_level || (matchup.difficulty >= 0.8 ? "Hard Counter" : "Dangerous");
}

function getDifficultyColor(matchup: Matchup, mode: "strong" | "weak"): string {
  if (mode === "strong") {
    if (matchup.difficulty <= 0.3) return "#34d399"; // easy — emerald
    if (matchup.difficulty <= 0.5) return "#60a5fa"; // moderate — blue
    return "#a78bfa"; // skill — violet
  }
  if (matchup.difficulty >= 0.8) return "#f87171"; // hard counter — red
  if (matchup.difficulty >= 0.6) return "#fb923c"; // dangerous — orange
  return "#fbbf24"; // skill — amber
}

// ──────────────────────────────────
// Component
// ──────────────────────────────────
export function MatchupList({ matchups, mode, matchupRationale }: MatchupListProps) {
  if (!matchups || matchups.length === 0) return null;

  const accent = getAccent(mode);
  const icon = mode === "strong" ? "💪" : "⚠️";
  const title = mode === "strong" ? "Strong Against" : "Weak Against";

  return (
    <div>
      <h5 className="text-base font-semibold text-white/90 mb-3">
        {icon} {title}
      </h5>

      <div className="space-y-2">
        {matchups.map((m, i) => {
          const badge = getDifficultyBadge(m, mode);
          const badgeColor = getDifficultyColor(m, mode);

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: mode === "strong" ? -8 : 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06, duration: 0.25 }}
              className="rounded-lg px-3 py-2.5"
              style={{
                background: accent.bg,
                border: `1px solid ${accent.border}`,
              }}
            >
              {/* Top row: champion name + difficulty badge */}
              <div className="flex items-center justify-between">
                <span
                  className="text-sm font-medium"
                  style={{ color: accent.color }}
                >
                  {m.champion}
                </span>

                <span
                  className="text-[10px] font-medium uppercase tracking-wider px-1.5 py-0.5 rounded"
                  style={{
                    background: `${badgeColor}15`,
                    color: badgeColor,
                    border: `1px solid ${badgeColor}25`,
                  }}
                >
                  {badge}
                </span>
              </div>

              {/* Reason */}
              {/* AI rationale (priority) */}
              {matchupRationale?.[m.champion] ? (
                <p className="mt-1.5 text-xs text-white/50 leading-relaxed">
                  💡 {matchupRationale[m.champion]}
                </p>
              ) : (
                <p className="mt-1.5 text-xs text-white/50 leading-relaxed">
                  {m.reason}
                </p>
              )}

              {/* Win conditions (for strong) or Counterplay (for weak) */}
              {mode === "strong" && m.win_condition && m.win_condition.length > 0 && (
                <div className="mt-1.5">
                  <p className="text-[10px] text-emerald-400/50 uppercase tracking-wider mb-0.5">
                    Win Condition
                  </p>
                  {m.win_condition.map((wc, j) => (
                    <p key={j} className="text-xs text-emerald-300/40 leading-relaxed">
                      • {wc}
                    </p>
                  ))}
                </div>
              )}

              {mode === "weak" && m.counterplay && m.counterplay.length > 0 && (
                <div className="mt-1.5">
                  <p className="text-[10px] text-amber-400/50 uppercase tracking-wider mb-0.5">
                    How to Play Around It
                  </p>
                  {m.counterplay.map((cp, j) => (
                    <p key={j} className="text-xs text-amber-300/40 leading-relaxed">
                      ↳ {cp}
                    </p>
                  ))}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}