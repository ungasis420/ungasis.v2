// src/components/build/GoldEfficiency.tsx
"use client";

// ──────────────────────────────────
// Types
// ──────────────────────────────────

interface GoldItem {
  name: string;
  cost: number | string;
}

interface GoldEfficiencyProps {
  coreItems: GoldItem[];
  situationalItems?: GoldItem[];
}

// ──────────────────────────────────
// Config
// ──────────────────────────────────

const BAR_MAX = 16_000;

// ──────────────────────────────────
// Helpers
// ──────────────────────────────────

function safeCost(val: number | string): number {
  const n =
    typeof val === "number"
      ? val
      : parseFloat(String(val).replace(/,/g, ""));
  return isNaN(n) ? 0 : n;
}

function getTierInfo(total: number) {
  if (total <= 8_000)
    return { label: "Budget", colorClass: "text-emerald-400", barHex: "#34d399" };
  if (total <= 11_000)
    return { label: "Efficient", colorClass: "text-teal-400", barHex: "#2dd4bf" };
  if (total <= 13_500)
    return { label: "Standard", colorClass: "text-amber-400", barHex: "#fbbf24" };
  if (total <= 16_000)
    return { label: "Premium", colorClass: "text-orange-400", barHex: "#fb923c" };
  return { label: "Luxury", colorClass: "text-red-400", barHex: "#f87171" };
}

function getItemBarHex(cost: number, maxCost: number): string {
  const ratio = maxCost > 0 ? cost / maxCost : 0;
  if (ratio >= 0.9) return "#fb923c";
  if (ratio >= 0.75) return "#f59e0b";
  if (ratio >= 0.6) return "#fbbf24";
  if (ratio >= 0.45) return "#fcd34d";
  if (ratio >= 0.3) return "#2dd4bf";
  if (ratio >= 0.15) return "#34d399";
  return "#6ee7b7";
}

function shortName(name: string): string {
  const abbrev: Record<string, string> = {
    "Ionian Boots of Lucidity": "Lucidity",
    "Black Mist Scythe": "BM Scythe",
    "Staff of Flowing Waters": "Flowing Water",
    "Ardent Censer": "Ardent",
    "Harmonic Echo": "Harmonic",
    "Morellonomicon": "Morellos",
  };
  if (abbrev[name]) return abbrev[name];
  const words = name.split(" ");
  if (words.length <= 2) return name;
  const two = words.slice(0, 2).join(" ");
  return two.length <= 12 ? two : words[0];
}

// ──────────────────────────────────
// Component
// ──────────────────────────────────

export function GoldEfficiency({
  coreItems,
  situationalItems,
}: GoldEfficiencyProps) {
  if (!coreItems || coreItems.length === 0) return null;

  const itemCosts = coreItems.map((item) => ({
    name: item.name,
    cost: safeCost(item.cost),
  }));

  const totalCost = itemCosts.reduce((sum, i) => sum + i.cost, 0);
  const tier = getTierInfo(totalCost);
  const mainBarPct = Math.min(100, (totalCost / BAR_MAX) * 100);

  const sorted = [...itemCosts].sort((a, b) => b.cost - a.cost);
  const maxItemCost = sorted[0]?.cost || 1;
  const mostExpensive = sorted[0];

  let runningTotal = 0;
  const buildPath = itemCosts.map((item) => {
    runningTotal += item.cost;
    return { ...item, cumulative: runningTotal };
  });

  const sitCosts = (situationalItems ?? []).map((item) => ({
    name: item.name,
    cost: safeCost(item.cost),
  }));

  const tierTicks = [
    { label: "8k", gold: 8_000, color: "text-emerald-400/50" },
    { label: "11k", gold: 11_000, color: "text-teal-400/50" },
    { label: "13.5k", gold: 13_500, color: "text-amber-400/50" },
    { label: "16k", gold: 16_000, color: "text-orange-400/50" },
  ];

  return (
    <div>
      {/* ── Title ── */}
      <h4 className="text-base font-semibold text-white/90 mb-1">
        💰 Gold Efficiency
      </h4>

      {/* Subtitle — each piece is its own span with explicit gaps */}
      <div className="flex flex-wrap items-baseline gap-x-2 text-xs text-white/40 mb-5">
        <span>
          Total:{" "}
          <span className="text-amber-400 font-bold text-sm">
            {totalCost.toLocaleString()}g
          </span>
        </span>
        <span className="text-white/15">·</span>
        <span className={`font-medium ${tier.colorClass}`}>
          {tier.label}
        </span>
        <span className="text-white/15">·</span>
        <span>
          Spike:{" "}
          <span className="text-white/60">{mostExpensive.name}</span>
        </span>
      </div>

      {/* ── Main Budget Bar ── */}
      <div className="mb-6">
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "30px",
            borderRadius: "8px",
            backgroundColor: "rgba(255, 255, 255, 0.06)",
            border: "1px solid rgba(255, 255, 255, 0.06)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              width: `${mainBarPct}%`,
              borderRadius: "7px",
              backgroundColor: tier.barHex,
              opacity: 0.7,
              transition: "width 0.7s ease-out",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10,
            }}
          >
            <span className="text-xs font-bold text-white drop-shadow-md tracking-wide">
              {totalCost.toLocaleString()}g
              <span className="text-white/50 font-normal ml-2">
                / {(BAR_MAX / 1000).toFixed(0)}k
              </span>
            </span>
          </div>
        </div>

        <div className="relative w-full h-4 mt-1">
          {tierTicks.map((tp) => {
            const pct = Math.min((tp.gold / BAR_MAX) * 100, 96);
            return (
              <div
                key={tp.label}
                className="absolute flex flex-col items-center"
                style={{
                  left: `${pct}%`,
                  transform: "translateX(-50%)",
                }}
              >
                <div
                  style={{
                    width: "1px",
                    height: "6px",
                    backgroundColor: "rgba(255,255,255,0.15)",
                  }}
                />
                <span className={`text-[9px] ${tp.color} mt-px`}>
                  {tp.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Per-Item Breakdown ── */}
      <p className="text-[11px] text-white/40 uppercase tracking-wider mb-3">
        Cost Breakdown
      </p>

      <div className="space-y-3">
        {sorted.map((item, i) => {
          const pct = (item.cost / maxItemCost) * 100;
          const sharePct =
            totalCost > 0
              ? ((item.cost / totalCost) * 100).toFixed(1)
              : "0";
          const isSpike = i === 0;
          const barHex = getItemBarHex(item.cost, maxItemCost);

          return (
            <div key={item.name}>
              {/* Name + cost */}
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className={`text-xs truncate ${
                      isSpike
                        ? "text-white/90 font-medium"
                        : "text-white/65"
                    }`}
                  >
                    {item.name}
                  </span>
                  {isSpike && (
                    <span className="text-[9px] text-orange-400/90 bg-orange-400/10 rounded px-1.5 py-px shrink-0 font-medium">
                      SPIKE
                    </span>
                  )}
                </div>
                <div className="flex items-baseline gap-2 shrink-0 ml-2">
                  <span className="text-xs text-amber-400 font-mono font-medium">
                    {item.cost.toLocaleString()}g
                  </span>
                  <span className="text-[10px] text-white/30 w-[38px] text-right tabular-nums">
                    {sharePct}%
                  </span>
                </div>
              </div>

              {/* Bar — with visible track border */}
              <div
                style={{
                  width: "100%",
                  height: "8px",
                  borderRadius: "9999px",
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.04)",
                }}
              >
                <div
                  style={{
                    width: `${pct}%`,
                    height: "100%",
                    borderRadius: "9999px",
                    backgroundColor: barHex,
                    opacity: 0.75,
                    transition: "width 0.5s ease",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Cumulative Build Path ── */}
      <div className="mt-6 pt-4 border-t border-white/[0.06]">
        <p className="text-[11px] text-white/40 uppercase tracking-wider mb-3">
          Cumulative Build Path
        </p>

        <div className="flex gap-1.5 items-end" style={{ height: "90px" }}>
          {buildPath.map((item, i) => {
            const heightPct = (item.cumulative / totalCost) * 100;
            const isLast = i === buildPath.length - 1;
            const barHex = isLast
              ? "#fbbf24"
              : `rgba(56, 189, 248, ${0.3 + (i / buildPath.length) * 0.4})`;

            return (
              <div
                key={item.name + i}
                className="flex-1 flex flex-col items-center"
                style={{ height: "100%" }}
              >
                <div className="flex-1 w-full flex items-end">
                  <div
                    style={{
                      width: "100%",
                      height: `${heightPct}%`,
                      minHeight: "6px",
                      borderRadius: "4px 4px 0 0",
                      backgroundColor: barHex,
                    }}
                  />
                </div>
                <p className="text-[9px] text-white/40 font-mono mt-1 text-center">
                  {(item.cumulative / 1000).toFixed(1)}k
                </p>
                <p className="text-[8px] text-white/30 text-center truncate w-full leading-tight mt-px">
                  {shortName(item.name)}
                </p>
              </div>
            );
          })}
        </div>

        <div className="flex justify-between mt-2">
          <span className="text-[9px] text-white/20">1st item</span>
          <span className="text-[9px] text-amber-400/50 font-mono">
            → {totalCost.toLocaleString()}g full build
          </span>
        </div>
      </div>

      {/* ── Situational Swap Costs ── */}
      {sitCosts.length > 0 && (
        <div className="mt-4 pt-3 border-t border-white/[0.06]">
          <p className="text-[11px] text-white/40 uppercase tracking-wider mb-2.5">
            Situational Swap Costs
          </p>
          <div className="flex flex-wrap gap-2">
            {sitCosts.map((item) => (
              <div
                key={item.name}
                className="
                  rounded-lg border border-white/[0.08] bg-white/[0.03]
                  px-3 py-2
                  flex items-baseline gap-2
                  hover:bg-white/[0.05] transition-colors
                "
              >
                <span className="text-xs text-white/60">{item.name}</span>
                <span className="text-xs text-amber-400 font-mono font-medium">
                  {item.cost.toLocaleString()}g
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}