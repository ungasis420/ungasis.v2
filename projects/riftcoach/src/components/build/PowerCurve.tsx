// src/components/build/PowerCurve.tsx
"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// ──────────────────────────────────
// Types
// ──────────────────────────────────

interface PowerCurveData {
  early: number | string;
  mid: number | string;
  late: number | string;
}

interface PowerCurveProps {
  data: PowerCurveData;
}

interface ChartPoint {
  phase: string;
  power: number;
}

interface TooltipPayloadItem {
  value: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}

// ──────────────────────────────────
// Helpers
// ──────────────────────────────────

/** Convert any value to a number 0–1 safely */
function toNumber(raw: number | string): number {
  if (typeof raw === "number") return Math.min(1, Math.max(0, raw));
  const parsed = parseFloat(String(raw));
  if (!isNaN(parsed)) return Math.min(1, Math.max(0, parsed));
  const map: Record<string, number> = {
    "very weak": 0.15, weak: 0.25, low: 0.25,
    moderate: 0.5, medium: 0.5, average: 0.5,
    strong: 0.75, high: 0.8,
    "very strong": 0.9, dominant: 0.95, peak: 1.0,
  };
  return map[String(raw).toLowerCase().trim()] ?? 0.5;
}

/** 0–1 → label */
function getLabel(v: number): string {
  if (v >= 0.85) return "Dominant";
  if (v >= 0.7) return "Strong";
  if (v >= 0.5) return "Moderate";
  if (v >= 0.3) return "Weak";
  return "Very Weak";
}

/** 0–1 → Tailwind color class */
function getColor(v: number): string {
  if (v >= 0.85) return "text-emerald-400";
  if (v >= 0.7) return "text-cyan-400";
  if (v >= 0.5) return "text-yellow-400";
  if (v >= 0.3) return "text-orange-400";
  return "text-red-400";
}

// ──────────────────────────────────
// Custom Tooltip
// ──────────────────────────────────

function PowerTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  const power = payload[0].value;
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
        {label} Game
      </p>
      <p className="text-lg font-bold text-cyan-400">
        {(power * 100).toFixed(0)}%
      </p>
      <p className={`text-xs ${getColor(power)}`}>
        {getLabel(power)}
      </p>
    </div>
  );
}

// ──────────────────────────────────
// Component
// ──────────────────────────────────

export function PowerCurve({ data }: PowerCurveProps) {
  if (!data) return null;

  const chartData: ChartPoint[] = [
    { phase: "Early", power: toNumber(data.early) },
    { phase: "Mid",   power: toNumber(data.mid) },
    { phase: "Late",  power: toNumber(data.late) },
  ];

  const peak = chartData.reduce((a, b) => (a.power >= b.power ? a : b));

  return (
    <div>
      <h4 className="text-base font-semibold text-white/90 mb-0.5">
        ⚡ Power Curve
      </h4>
      <p className="text-xs text-white/40 mb-3">
        Peaks{" "}
        <span className="text-cyan-400 font-medium">{peak.phase}</span>{" "}
        game at{" "}
        <span className="text-cyan-400 font-medium">
          {(peak.power * 100).toFixed(0)}%
        </span>
        {" · "}
        {getLabel(peak.power)}
      </p>

      <div className="w-full h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 8, right: 16, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="powerGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#0ea5e9" stopOpacity={0.4} />
                <stop offset="50%"  stopColor="#0ea5e9" stopOpacity={0.12} />
                <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0.02} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.06)"
              vertical={false}
            />

            <XAxis
              dataKey="phase"
              tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }}
              axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
              tickLine={false}
            />

            <YAxis
              domain={[0, 1]}
              ticks={[0, 0.25, 0.5, 0.75, 1.0]}
              tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 11 }}
              axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
              tickLine={false}
              tickFormatter={(v: number) => `${(v * 100).toFixed(0)}%`}
              width={38}
            />

            <Tooltip
              content={<PowerTooltip />}
              cursor={{ stroke: "rgba(255,255,255,0.1)", strokeWidth: 1 }}
            />

            <Area
              type="monotone"
              dataKey="power"
              stroke="#0ea5e9"
              strokeWidth={2.5}
              fill="url(#powerGrad)"
              dot={{
                r: 5,
                fill: "#0ea5e9",
                stroke: "rgba(9,9,11,0.8)",
                strokeWidth: 2,
              }}
              activeDot={{
                r: 7,
                fill: "#38bdf8",
                stroke: "rgba(9,9,11,0.8)",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Phase summary row below chart */}
      <div className="flex justify-between mt-3 px-2">
        {chartData.map((pt) => (
          <div key={pt.phase} className="text-center">
            <p className="text-xs text-white/40">{pt.phase}</p>
            <p className={`text-sm font-semibold ${getColor(pt.power)}`}>
              {(pt.power * 100).toFixed(0)}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}