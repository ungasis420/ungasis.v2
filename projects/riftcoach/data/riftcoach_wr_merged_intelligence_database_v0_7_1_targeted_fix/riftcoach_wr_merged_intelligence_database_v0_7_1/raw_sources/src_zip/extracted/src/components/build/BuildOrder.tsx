// src/components/build/BuildOrder.tsx
// ────────────────────────────────────────────────────────────────
// Phase 5.7 — Build Order with AI Rationale
//
// WHY: Before, build order was just a flat sequence:
//   "Scythe → Ardent → Boots → Staff → Redemption → Harmonic"
//
// AFTER: Each item has a WHY explaining its position:
//   "1. Scythe: Gold gen sustains lane income without farming"
//   "2. Ardent: ADC power spike — Inspire (E) triggers Sanctify"
//   "3. Boots: Roam timer for dragon fights at 5-6 min"
//
// USES: Glassmorphism theme, Framer Motion stagger animations
// ────────────────────────────────────────────────────────────────

"use client";

import { motion } from "framer-motion";

// ── Types ──────────────────────────────────────────────────────
interface BuildOrderItem {
  name: string;
  cost?: number;
}

interface BuildOrderProps {
  /** Core items in purchase order (from build engine) */
  items: BuildOrderItem[];
  /** AI-generated rationale per item position (from reasoning API) */
  buildOrderRationale?: string[];
  /** Whether AI reasoning is still loading */
  isLoading?: boolean;
}

// ── Animation Variants ─────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
};

// ── Helper: Match rationale to item ────────────────────────────
/**
 * AI returns rationale like:
 *   "Black Mist Scythe: Gold gen sustains lane..."
 *   "Ardent Censer: ADC power spike..."
 *
 * We match by checking if the rationale line starts with
 * the item name (case-insensitive), then extract the text
 * after the colon.
 *
 * If no match found, fall back to positional index.
 *
 * Analogy: Like matching name tags to seats at a dinner —
 * try the name first, then fall back to seat number.
 */
function getRationaleForItem(
  itemName: string,
  index: number,
  rationale?: string[]
): string | null {
  if (!rationale || rationale.length === 0) return null;

  // Strategy 1: Find by item name prefix (most reliable)
  const normName = itemName.toLowerCase().trim();
  const matched = rationale.find((r) => {
    const normR = r.toLowerCase().trim();
    return normR.startsWith(normName + ":") || normR.startsWith(normName + " —");
  });

  if (matched) {
    // Extract text after "Item Name: " or "Item Name — "
    const colonIdx = matched.indexOf(":");
    const dashIdx = matched.indexOf("—");
    const splitIdx =
      colonIdx !== -1 && (dashIdx === -1 || colonIdx < dashIdx)
        ? colonIdx
        : dashIdx;

    if (splitIdx !== -1) {
      return matched.slice(splitIdx + 1).trim();
    }
    return matched;
  }

  // Strategy 2: Fall back to positional index
  if (index < rationale.length) {
    const fallback = rationale[index];
    // Strip leading "Item Name: " if present from positional match
    const colonIdx = fallback.indexOf(":");
    if (colonIdx !== -1 && colonIdx < 40) {
      return fallback.slice(colonIdx + 1).trim();
    }
    return fallback;
  }

  return null;
}

// ── Step Number Badge ──────────────────────────────────────────
function StepBadge({ step }: { step: number }) {
  return (
    <div
      className="flex-shrink-0 flex items-center justify-center rounded-full font-bold text-xs"
      style={{
        width: "28px",
        height: "28px",
        background: "rgba(99, 102, 241, 0.25)",
        border: "1px solid rgba(99, 102, 241, 0.4)",
        color: "#a5b4fc",
      }}
    >
      {step}
    </div>
  );
}

// ── Arrow Connector ────────────────────────────────────────────
function ArrowConnector() {
  return (
    <div className="flex justify-center" style={{ padding: "2px 0 2px 13px" }}>
      <div
        style={{
          width: "2px",
          height: "16px",
          background: "linear-gradient(to bottom, rgba(99, 102, 241, 0.4), rgba(99, 102, 241, 0.1))",
        }}
      />
    </div>
  );
}

// ── Loading Skeleton ───────────────────────────────────────────
function RationaleSkeleton() {
  return (
    <div className="flex items-center gap-2 mt-1">
      <div
        className="animate-pulse rounded"
        style={{
          width: "16px",
          height: "16px",
          background: "rgba(255, 255, 255, 0.06)",
        }}
      />
      <div
        className="animate-pulse rounded"
        style={{
          width: "70%",
          height: "14px",
          background: "rgba(255, 255, 255, 0.06)",
        }}
      />
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════════════════════════════════

export default function BuildOrder({
  items,
  buildOrderRationale,
  isLoading = false,
}: BuildOrderProps) {
  // Don't render if no items
  if (!items || items.length === 0) return null;

  const hasRationale =
    buildOrderRationale && buildOrderRationale.length > 0;

  return (
    <motion.div
      className="rounded-2xl p-5"
      style={{
        background: "rgba(255, 255, 255, 0.04)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(20px)",
      }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* ── Section Header ── */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg">📖</span>
        <h3
          className="text-sm font-semibold tracking-wide uppercase"
          style={{ color: "rgba(255, 255, 255, 0.9)" }}
        >
          Build Order
        </h3>
        {hasRationale && (
          <span
            className="text-xs px-2 py-0.5 rounded-full"
            style={{
              background: "rgba(99, 102, 241, 0.15)",
              color: "#a5b4fc",
              border: "1px solid rgba(99, 102, 241, 0.3)",
            }}
          >
            AI
          </span>
        )}
      </div>

      {/* ── Quick Sequence (always shown) ── */}
      <div
        className="flex flex-wrap items-center gap-1 mb-4 text-xs"
        style={{ color: "rgba(255, 255, 255, 0.5)" }}
      >
        {items.map((item, i) => (
          <span key={item.name} className="flex items-center gap-1">
            <span style={{ color: "rgba(255, 255, 255, 0.8)" }}>
              {item.name}
            </span>
            {i < items.length - 1 && (
              <span style={{ color: "rgba(99, 102, 241, 0.6)" }}>→</span>
            )}
          </span>
        ))}
      </div>

      {/* ── Detailed Rationale (shown when AI provides it) ── */}
      {(hasRationale || isLoading) && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {items.map((item, index) => {
            const rationale = getRationaleForItem(
              item.name,
              index,
              buildOrderRationale
            );
            const isLast = index === items.length - 1;

            return (
              <div key={item.name}>
                <motion.div
                  className="flex items-start gap-3"
                  variants={itemVariants}
                >
                  {/* Step number */}
                  <StepBadge step={index + 1} />

                  {/* Item info + rationale */}
                  <div className="flex-1 min-w-0">
                    {/* Item name + cost */}
                    <div className="flex items-center gap-2">
                      <span
                        className="text-sm font-medium"
                        style={{ color: "rgba(255, 255, 255, 0.9)" }}
                      >
                        {item.name}
                      </span>
                      {item.cost && (
                        <span
                          className="text-xs"
                          style={{ color: "rgba(250, 204, 21, 0.7)" }}
                        >
                          {item.cost.toLocaleString()}g
                        </span>
                      )}
                    </div>

                    {/* AI rationale or loading skeleton */}
                    {isLoading && !rationale ? (
                      <RationaleSkeleton />
                    ) : rationale ? (
                      <p
                        className="text-xs mt-1 leading-relaxed"
                        style={{ color: "rgba(255, 255, 255, 0.55)" }}
                      >
                        💡 {rationale}
                      </p>
                    ) : null}
                  </div>
                </motion.div>

                {/* Arrow connector between items */}
                {!isLast && <ArrowConnector />}
              </div>
            );
          })}
        </motion.div>
      )}
    </motion.div>
  );
}