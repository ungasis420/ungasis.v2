import React from 'react';
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
import {
  getRealTotalRequisitions,
  getRealFillRate,
  getRealCancelRate,
  getRealAvgTimeToFill,
  getRealStatusDistribution,
  getRealByFunction,
  getRealByCountry,
  getRealOpenReqsAging,
} from '@/lib/data-engine';

const STATUS_COLORS: Record<string, string> = {
  Filled: '#22c55e',
  Cancelled: '#ef4444',
  Open: '#00d4ff',
  'On Hold': '#f59e0b',
  'Pending Approval': '#a78bfa',
};

export default function ExecutiveDashboard() {
  const totalReqs = getRealTotalRequisitions();
  const fillRate = getRealFillRate();
  const cancelRate = getRealCancelRate();
  const avgTTF = getRealAvgTimeToFill();
  const status = getRealStatusDistribution();
  const byFunction = getRealByFunction().slice(0, 10);
  const byCountry = getRealByCountry();
  const aging = getRealOpenReqsAging();

  const kpiCards = [
    { label: 'Total Requisitions', value: totalReqs.toLocaleString(), color: '#00d4ff', badge: 'Total Volume' },
    { label: 'Fill Rate', value: `${fillRate.toFixed(1)}%`, color: '#22c55e', badge: 'Success Rate' },
    { label: 'Cancel Rate', value: `${cancelRate.toFixed(1)}%`, color: '#ef4444', badge: 'Loss Metrics' },
    { label: 'Avg Time to Fill', value: `${avgTTF.toFixed(0)}d`, color: '#f59e0b', badge: 'Avg Duration' },
    { label: 'Open Reqs', value: status.open.toLocaleString(), color: '#a78bfa', badge: 'Active Hiring' },
    { label: 'On Hold', value: status.onHold.toLocaleString(), color: '#6b7280', badge: 'Paused Volume' },
    { label: 'Pending Approval', value: status.pendingApproval.toLocaleString(), color: '#fb923c', badge: 'In Review' },
  ];

  const statusData = [
    { name: 'Filled', value: status.filled },
    { name: 'Cancelled', value: status.cancelled },
    { name: 'Open', value: status.open },
    { name: 'On Hold', value: status.onHold },
    { name: 'Pending Approval', value: status.pendingApproval },
  ];

  const agingData = [
    { name: '0-30 days', value: aging.under30, color: '#22c55e' },
    { name: '30-60 days', value: aging.between30and60, color: '#00d4ff' },
    { name: '60-90 days', value: aging.between60and90, color: '#f59e0b' },
    { name: '90+ days', value: aging.over90, color: '#ef4444' },
  ];

  const tooltipStyle = {
    backgroundColor: '#09090b',
    borderColor: '#27272a',
    borderRadius: '0.75rem',
    color: '#ffffff',
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 text-zinc-100 font-sans antialiased">
      {/* ROW 1: KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {kpiCards.map((card, idx) => (
          <div
            key={idx}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[140px] transition-all duration-300 hover:border-white/20"
          >
            <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: card.color }} />
            <div className="flex justify-between items-start">
              <span className="text-sm text-zinc-400 font-medium">{card.label}</span>
              <span
                className="text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider"
                style={{ backgroundColor: `${card.color}15`, color: card.color }}
              >
                {card.badge}
              </span>
            </div>
            <div className="mt-4 flex items-baseline">
              <span className="text-3xl font-bold tracking-tight" style={{ color: card.color }}>
                {card.value}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ROW 2: Status Distribution + Open Reqs Aging */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:border-white/20">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">📊 Requisition Status Distribution</h3>
            <p className="text-xs text-zinc-400 mt-1">Breakdown of all requisitions by current status</p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="h-64 w-full md:w-1/2 flex justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} (${((percent ?? 0) * 100).toFixed(0)}%)`}
                    labelLine={{ stroke: '#52525b', strokeWidth: 1 }}
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.name] || '#6b7280'} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} wrapperStyle={{ zIndex: 50 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full md:w-1/2 flex flex-wrap md:flex-col gap-3 justify-center">
              {statusData.map((entry, index) => (
                <div key={index} className="flex items-center gap-4 bg-white/5 px-4 py-2.5 rounded-xl border border-white/5 min-w-[140px]">
                  <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: STATUS_COLORS[entry.name] || '#6b7280' }} />
                  <div className="flex flex-col">
                    <span className="text-xs text-zinc-400 font-medium">{entry.name}</span>
                    <span className="text-sm font-bold text-white mt-0.5">{entry.value.toLocaleString()} Requisitions</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:border-white/20">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">⏳ Open Requisitions Aging</h3>
            <p className="text-xs text-zinc-400 mt-1">How long open requisitions have been active</p>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={agingData} margin={{ top: 10, right: 10, left: -10, bottom: 10 }}>
                <CartesianGrid stroke="#27272a" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" stroke="#52525b" tick={{ fill: '#ffffff' }} fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#52525b" tick={{ fill: '#ffffff' }} fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }} wrapperStyle={{ zIndex: 50 }} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={60}>
                  {agingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ROW 3: By Function */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:border-white/20">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">🏗️ Requisitions by Function (Top 10)</h3>
          <p className="text-xs text-zinc-400 mt-1">Job function breakdown across the full requisition pipeline</p>
        </div>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={byFunction} layout="vertical" margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
              <CartesianGrid stroke="#27272a" strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" stroke="#52525b" tick={{ fill: '#ffffff' }} fontSize={11} tickLine={false} axisLine={false} />
              <YAxis type="category" dataKey="name" stroke="#52525b" tick={{ fill: '#ffffff', fontSize: 11 }} width={220} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }} wrapperStyle={{ zIndex: 50 }} />
              <Bar dataKey="count" fill="#00d4ff" radius={[0, 6, 6, 0]} maxBarSize={18} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ROW 4: By Country */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:border-white/20">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">🌍 Requisitions by Country</h3>
          <p className="text-xs text-zinc-400 mt-1">Geographic distribution of the requisition pipeline</p>
        </div>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={byCountry} margin={{ top: 10, right: 10, left: -10, bottom: 30 }}>
              <CartesianGrid stroke="#27272a" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" stroke="#52525b" tick={{ fill: '#ffffff', fontSize: 10 }} angle={-35} textAnchor="end" interval={0} tickLine={false} axisLine={false} />
              <YAxis stroke="#52525b" tick={{ fill: '#ffffff' }} fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }} wrapperStyle={{ zIndex: 50 }} />
              <Bar dataKey="count" fill="#a78bfa" radius={[6, 6, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
