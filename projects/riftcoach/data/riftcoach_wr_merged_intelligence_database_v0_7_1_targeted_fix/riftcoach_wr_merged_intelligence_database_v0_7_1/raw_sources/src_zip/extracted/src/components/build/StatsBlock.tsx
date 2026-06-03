// src/components/build/StatsBlock.tsx
"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

// ──────────────────────────────────
// Types
// ──────────────────────────────────

interface StatsData {
  total_ap?: number;
  total_hp?: number;
  total_ad?: number;
  total_armor?: number;
  total_mr?: number;
  total_ah?: number;
  ehp_physical?: number;
  ehp_magic?: number;
}

interface StatsBlockProps {
  stats: StatsData;
}

/** Each axis on the radar */
interface RadarPoint {
  stat: string;
  value: number;
  fullMark: number;
  raw: number;
  unit: string;
}

/** Recharts tooltip payload */
interface TooltipPayloadItem {
  payload: RadarPoint;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
}

// ──────────────────────────────────
// Config: max values for each stat
// ──────────────────────────────────

/**
 * These are the "realistic max" for a full 6-item build
 * in Wild Rift. They normalize each stat to 0–1 so the
 * radar shape is meaningful (not just "HP is always huge").
 *
 * Think of it like: 500 AP = "max AP you'd realistically get"
 * So 290 AP = 290/500 = 0.58 on the radar.
 */
const STAT_CONFIG: {
  key: keyof StatsData;
  label: string;
  max: number;
  unit: string;
}[] = [
  { key: "total_ap",    label: "AP",    max: 500, unit: "" },
  { key: "total_hp",    label: "HP",    max: 3500, unit: "" },
  { key: "total_ad",    label: "AD",    max: 350, unit: "" },
  { key: "total_armor", label: "Armor", max: 300, unit: "" },
  { key: "total_mr",    label: "MR",    max: 200, unit: "" },
  { key: "total_ah",    label: "AH",    max: 100, unit: "" },
];

// ──────────────────────────────────
// Helpers
// ──────────────────────────────────

function safeNum(val: unknown): number {
  if (typeof val === "number") return val;
  const parsed = parseFloat(String(val));
  return isNaN(parsed) ? 0 : parsed;
}

/** Get dominant stat label */
function getDominantStat(data: RadarPoint[]): string {
  const best = data.reduce((a, b) => (a.value > b.value ? a : b));
  return best.stat;
}

// ──────────────────────────────────
// Custom Tooltip (glassmorphism)
// ──────────────────────────────────

function StatsTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;

  const point = payload[0].payload;

  return (
    <div
      className="rounded-lg px-3 py-2 shadow-xl"
      style={{
        background: "rgba(255, 255, 255, 0.06)",
        border: "1px solid rgba(255, 255, 255, 0.10)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
      }}
    >
      <p className="text-[11px] text-white/50 uppercase tracking-wider">
        {point.stat}
      </p>
      <p className="text-lg font-bold text-violet-400">
        {point.raw.toLocaleString()}
        {point.unit}
      </p>
      <p className="text-xs text-white/40">
        {Math.round(point.value)}% of max
      </p>
    </div>
  );
}

// ──────────────────────────────────
// Custom Axis Label
// ──────────────────────────────────

interface AxisTickProps {
  payload: { value: string };
  x: number;
  y: number;
  cx: number;
  cy: number;
}

// src/components/build/StatsBlock.tsx

const CustomAxisTick = (props: any) => {
  const { payload, x, y } = props;

  return (
    <text
      x={x}
      y={y}
      dy={16}
      textAnchor="middle"
      fill="#9CA3AF"
      fontSize={10}
    >
      {payload?.value}
    </text>
  );
};

// ──────────────────────────────────
// Component
// ──────────────────────────────────

export function StatsBlock({ stats }: StatsBlockProps) {
  if (!stats) return null;

  // Build radar data: normalize each stat to 0–100 scale
  const radarData: RadarPoint[] = STAT_CONFIG.map(({ key, label, max, unit }) => {
    const raw = safeNum(stats[key]);
    return {
      stat: label,
      value: Math.min(100, (raw / max) * 100),
      fullMark: 100,
      raw,
      unit,
    };
  });

  const dominant = getDominantStat(radarData);

  // EHP values (shown below radar, not on radar)
  const ehpPhys = safeNum(stats.ehp_physical);
  const ehpMagic = safeNum(stats.ehp_magic);

  return (
    <div>
      {/* Section Title */}
      <h4 className="text-base font-semibold text-white/90 mb-0.5">
        📊 Build Stats
      </h4>
      <p className="text-xs text-white/40 mb-3">
        Dominant stat:{" "}
        <span className="text-violet-400 font-medium">{dominant}</span>
      </p>

      {/* Radar Chart */}
      <div className="w-full h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart
            data={radarData}
            cx="50%"
            cy="50%"
            outerRadius="72%"
          >
            {/* Grid rings */}
            <PolarGrid
              stroke="rgba(255, 255, 255, 0.08)"
              radialLines={true}
            />

            {/* Axis labels: AP, HP, AD, Armor, MR, AH */}
            <PolarAngleAxis
              dataKey="stat"
              tick={CustomAxisTick as any}
            />

            {/* Hide the numeric ring labels (cleaner look) */}
            <PolarRadiusAxis
              domain={[0, 100]}
              tick={false}
              axisLine={false}
            />

            {/* Tooltip */}
            <Tooltip content={<StatsTooltip />} />

            {/* The radar shape */}
            <Radar
              dataKey="value"
              stroke="#8b5cf6"
              strokeWidth={2}
              fill="#8b5cf6"
              fillOpacity={0.15}
              dot={{
                r: 4,
                fill: "#8b5cf6",
                stroke: "rgba(9, 9, 11, 0.8)",
                strokeWidth: 2,
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Raw stat values in a grid below the radar */}
      <div className="grid grid-cols-3 gap-x-4 gap-y-2 mt-2 px-1">
        {radarData.map((pt) => (
          <div key={pt.stat} className="flex items-baseline gap-1.5">
            <span className="text-xs text-white/40 w-12">{pt.stat}</span>
            <span className="text-sm font-semibold text-white/80">
              {pt.raw.toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      {/* EHP row */}
      {(ehpPhys > 0 || ehpMagic > 0) && (
        <div className="flex gap-6 mt-3 px-1">
          {ehpPhys > 0 && (
            <div className="flex items-baseline gap-1.5">
              <span className="text-xs text-white/40">EHP (Phys)</span>
              <span className="text-sm font-semibold text-amber-400">
                {ehpPhys.toLocaleString()}
              </span>
            </div>
          )}
          {ehpMagic > 0 && (
            <div className="flex items-baseline gap-1.5">
              <span className="text-xs text-white/40">EHP (Magic)</span>
              <span className="text-sm font-semibold text-sky-400">
                {ehpMagic.toLocaleString()}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}