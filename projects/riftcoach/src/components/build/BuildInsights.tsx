// src/components/build/BuildInsights.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";

// ──────────────────────────────────
// Types
// ──────────────────────────────────
interface BuildInsightsProps {
  /** 2-3 sentence overall build analysis from AI */
  insights: string;
  /** True while AI reasoning is generating */
  isLoading?: boolean;
}

// ──────────────────────────────────
// Shimmer (shown while reasoning loads)
// ──────────────────────────────────
function InsightsShimmer() {
  return (
    <div className="space-y-2">
      <div className="h-4 w-full rounded bg-white/[0.06] animate-pulse" />
      <div className="h-4 w-5/6 rounded bg-white/[0.06] animate-pulse" />
      <div className="h-4 w-3/4 rounded bg-white/[0.06] animate-pulse" />
    </div>
  );
}

// ──────────────────────────────────
// Component
// ──────────────────────────────────
export function BuildInsights({ insights, isLoading }: BuildInsightsProps) {
  // Don't render anything if there's no insights AND we're not loading
  if (!insights && !isLoading) return null;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">🧠</span>
        <h5 className="text-base font-semibold text-white/90">
          Build Analysis
        </h5>

        {/* Subtle "AI" badge */}
        <span
          className="text-[10px] font-medium uppercase tracking-widest px-1.5 py-0.5 rounded"
          style={{
            background: "rgba(14, 165, 233, 0.12)",
            color: "rgba(14, 165, 233, 0.7)",
            border: "1px solid rgba(14, 165, 233, 0.15)",
          }}
        >
          AI
        </span>
      </div>

      {/* Loading state */}
      {isLoading && !insights && <InsightsShimmer />}

      {/* Insights text (fades in when reasoning arrives) */}
      <AnimatePresence>
        {insights && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <p
              className="text-sm leading-relaxed"
              style={{ color: "rgba(255, 255, 255, 0.7)" }}
            >
              {insights}
            </p>

            {/* Decorative accent line */}
            <div
              className="mt-3 h-px w-16 rounded-full"
              style={{
                background:
                  "linear-gradient(to right, rgba(14, 165, 233, 0.4), transparent)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}