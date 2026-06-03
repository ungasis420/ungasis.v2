// src/components/build/CounterStrategy.tsx
"use client";

import { motion } from "framer-motion";

// ──────────────────────────────────
// Types
// ──────────────────────────────────
interface Counter {
  threat_category: string;
  description: string;
  counter_items: string[];
  counter_runes: string[];
  strategy: string;
}

interface CounterStrategyProps {
  strategies: Counter[];
}

// ──────────────────────────────────
// Component
// ──────────────────────────────────
export function CounterStrategy({ strategies }: CounterStrategyProps) {
  if (!strategies || strategies.length === 0) return null;

  return (
    <div>
      <h5 className="text-base font-semibold text-white/90 mb-3">
        🛡️ Counter Strategies
      </h5>

      <div className="space-y-2.5">
        {strategies.map((cs, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.25 }}
            className="rounded-lg px-3 py-2.5"
            style={{
              background: "rgba(251, 191, 36, 0.06)",
              border: "1px solid rgba(251, 191, 36, 0.12)",
            }}
          >
            {/* Threat category header */}
            <div className="flex items-center gap-2">
              <span
                className="text-sm font-medium"
                style={{ color: "#fbbf24" }}
              >
                {cs.threat_category}
              </span>
            </div>

            {/* Description */}
            {cs.description && (
              <p className="mt-1 text-xs text-white/40 leading-relaxed">
                {cs.description}
              </p>
            )}

            {/* Counter Items */}
            {cs.counter_items.length > 0 && (
              <div className="mt-2">
                <p className="text-[10px] text-amber-400/50 uppercase tracking-wider mb-1">
                  Counter Items
                </p>
                {cs.counter_items.map((item, j) => (
                  <p
                    key={j}
                    className="text-xs text-white/60 leading-relaxed"
                  >
                    🗡️ {item}
                  </p>
                ))}
              </div>
            )}

            {/* Counter Runes */}
            {cs.counter_runes.length > 0 && (
              <div className="mt-2">
                <p className="text-[10px] text-violet-400/50 uppercase tracking-wider mb-1">
                  Counter Runes
                </p>
                {cs.counter_runes.map((rune, j) => (
                  <p
                    key={j}
                    className="text-xs text-white/60 leading-relaxed"
                  >
                    🔮 {rune}
                  </p>
                ))}
              </div>
            )}

            {/* Strategy notes */}
            {cs.strategy && (
              <p className="mt-2 text-xs text-amber-300/50 leading-relaxed italic">
                💡 {cs.strategy}
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}