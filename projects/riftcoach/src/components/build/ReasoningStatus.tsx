// src/components/build/ReasoningStatus.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";

// ──────────────────────────────────
// Types
// ──────────────────────────────────
interface ReasoningStatusProps {
  /** True while AI reasoning is generating */
  isLoading: boolean;
  /** True if reasoning failed */
  hasError: boolean;
  /** Error message to display */
  errorMessage?: string;
  /** True if reasoning loaded successfully */
  hasReasoning: boolean;
}

// ──────────────────────────────────
// Spinner (CSS-only, no extra deps)
// ──────────────────────────────────
function Spinner() {
  return (
    <span
      className="inline-block h-3.5 w-3.5 rounded-full border-2 border-t-transparent animate-spin"
      style={{ borderColor: "rgba(14, 165, 233, 0.5)", borderTopColor: "transparent" }}
    />
  );
}

// ──────────────────────────────────
// Component
// ──────────────────────────────────
export function ReasoningStatus({
  isLoading,
  hasError,
  errorMessage,
  hasReasoning,
}: ReasoningStatusProps) {
  return (
    <AnimatePresence mode="wait">
      {/* ── Loading state ── */}
      {isLoading && (
        <motion.div
          key="loading"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.25 }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
          style={{
            background: "rgba(14, 165, 233, 0.06)",
            border: "1px solid rgba(14, 165, 233, 0.12)",
          }}
        >
          <Spinner />
          <span className="text-xs text-sky-400/70">
            AI is analyzing your build...
          </span>
        </motion.div>
      )}

      {/* ── Success state (brief flash, then fades out) ── */}
      {!isLoading && hasReasoning && !hasError && (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.25 }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
          style={{
            background: "rgba(16, 185, 129, 0.06)",
            border: "1px solid rgba(16, 185, 129, 0.12)",
          }}
        >
          <span className="text-xs">✅</span>
          <span className="text-xs text-emerald-400/70">
            AI reasoning loaded
          </span>
        </motion.div>
      )}

      {/* ── Error state ── */}
      {!isLoading && hasError && (
        <motion.div
          key="error"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.25 }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
          style={{
            background: "rgba(239, 68, 68, 0.06)",
            border: "1px solid rgba(239, 68, 68, 0.12)",
          }}
        >
          <span className="text-xs">⚠️</span>
          <span className="text-xs text-red-400/70">
            {errorMessage || "Reasoning unavailable — build data is still accurate"}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}