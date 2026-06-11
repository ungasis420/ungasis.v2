'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  useDashboardStore,
  selectTotalReqs,
  selectFillRate,
  selectAvgTTF,
  selectCancelRate,
  selectOpenReqs,
  selectOnHold,
  selectTTFByCountry,
  selectStatusDistribution,
} from '@/stores/dashboard';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const STATUS_COLORS: Record<string, string> = {
  Filled: '#22c55e',
  Closed: '#22c55e',
  Cancelled: '#ef4444',
  Open: '#00d4ff',
  'On Hold': '#f59e0b',
};

const getStatusColor = (status: string): string => {
  return STATUS_COLORS[status] || '#6b7280';
};

export default function ExecutiveDashboard() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const totalReqs = useDashboardStore(selectTotalReqs);
  const fillRate = useDashboardStore(selectFillRate);
  const avgTTF = useDashboardStore(selectAvgTTF);
  const cancelRate = useDashboardStore(selectCancelRate);
  const openReqs = useDashboardStore(selectOpenReqs);
  const onHold = useDashboardStore(selectOnHold);
  const requisitions = useDashboardStore((s) => s.requisitions);
  const ttfByCountry = useMemo(
    () => selectTTFByCountry(useDashboardStore.getState()),
    [requisitions]
  );
  const statusDistribution = useMemo(
    () => selectStatusDistribution(useDashboardStore.getState()),
    [requisitions]
  );

  if (!isMounted) {
    return (
      <div className="w-full space-y-6 text-zinc-100 font-sans antialiased min-h-screen flex items-center justify-center">
        <div className="text-zinc-400 animate-pulse">Loading Dashboard Metrics...</div>
      </div>
    );
  }

  const formatPercent = (val: number) => `${(val * 100).toFixed(1)}%`;
  const formatTTF = (val: number) => `${val.toFixed(1)}d`;

  const kpiCards = [
    {
      label: 'Total Requisitions',
      value: totalReqs,
      color: '#00d4ff',
      badge: 'Total Volume',
    },
    {
      label: 'Fill Rate',
      value: formatPercent(fillRate),
      color: '#22c55e',
      badge: 'Success Rate',
    },
    {
      label: 'Average Time to Fill',
      value: formatTTF(avgTTF),
      color: '#f59e0b',
      badge: 'Avg Duration',
    },
    {
      label: 'Cancellation Rate',
      value: formatPercent(cancelRate),
      color: '#ef4444',
      badge: 'Loss Metrics',
    },
    {
      label: 'Open Requisitions',
      value: openReqs,
      color: '#a78bfa',
      badge: 'Active Hiring',
    },
    {
      label: 'On Hold',
      value: onHold,
      color: '#6b7280',
      badge: 'Paused Volume',
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 text-zinc-100 font-sans antialiased">
      {/* ROW 1: 6 KPI Cards in 3-Col Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {kpiCards.map((card, idx) => (
          <div
            key={idx}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[140px] transition-all duration-300 hover:border-white/20"
          >
            <div
              className="absolute top-0 left-0 right-0 h-1"
              style={{ backgroundColor: card.color }}
            />
            <div className="flex justify-between items-start">
              <span className="text-sm text-zinc-400 font-medium">{card.label}</span>
              <span
                className="text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider"
                style={{
                  backgroundColor: `${card.color}15`,
                  color: card.color,
                }}
              >
                {card.badge}
              </span>
            </div>
            <div className="mt-4 flex items-baseline">
              <span
                className="text-3xl font-bold tracking-tight"
                style={{ color: card.color }}
              >
                {card.value}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ROW 2: BarChart for TTF by Country */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:border-white/20">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            ⏱️ Average Time to Fill (TTF) by Country
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            Recruitment cycle speed comparison across geographic regions (measured in days)
          </p>
        </div>
        <div className="h-80 w-full">
          {ttfByCountry.length === 0 ? (
            <div className="h-full flex items-center justify-center text-zinc-500 text-sm">
              No historical hiring speed data available
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={ttfByCountry}
                margin={{ top: 10, right: 10, left: -10, bottom: 10 }}
              >
                <CartesianGrid stroke="#27272a" strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="country"
                  stroke="#52525b"
                  tick={{ fill: '#ffffff' }}
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#52525b"
                  tick={{ fill: '#ffffff' }}
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  unit="d"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#09090b',
                    borderColor: '#27272a',
                    borderRadius: '0.75rem',
                    color: '#ffffff',
                  }}
                  cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                />
                <Bar
                  dataKey="avgTTF"
                  fill="#00d4ff"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={60}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* ROW 3: PieChart for Status Distribution */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:border-white/20">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            📊 Requisition Status Distribution
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            Visual breakdown of all active and legacy hiring requisitions by status
          </p>
        </div>
        {statusDistribution.length === 0 ? (
          <div className="h-48 w-full flex items-center justify-center text-zinc-500 text-sm">
            No status data available
          </div>
        ) : (
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="h-64 w-full md:w-1/2 flex justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={85}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} (${((percent ?? 0) * 100).toFixed(0)}%)`}
                    labelLine={{ stroke: '#52525b', strokeWidth: 1 }}
                  >
                    {statusDistribution.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={getStatusColor(entry.name)}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#09090b',
                      borderColor: '#27272a',
                      borderRadius: '0.75rem',
                      color: '#ffffff',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full md:w-1/2 flex flex-wrap md:flex-col gap-3 justify-center md:pl-12">
              {statusDistribution.map((entry, index) => {
                const color = getStatusColor(entry.name);
                return (
                  <div
                    key={index}
                    className="flex items-center gap-4 bg-white/5 px-4 py-2.5 rounded-xl border border-white/5 min-w-[140px]"
                  >
                    <div
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: color }}
                    />
                    <div className="flex flex-col">
                      <span className="text-xs text-zinc-400 font-medium">{entry.name}</span>
                      <span className="text-sm font-bold text-white mt-0.5">
                        {entry.value} Requisitions
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
