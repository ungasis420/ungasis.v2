'use client';

import React, { useEffect, useState } from 'react';
import { useDashboardStore } from '@/stores/dashboard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function ReqAnalytics() {
  const [isMounted, setIsMounted] = useState(false);
  const requisitions = useDashboardStore((state) => state.requisitions);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full min-h-[400px] flex items-center justify-center text-zinc-400 font-sans antialiased animate-pulse">
        Loading Requisition Analytics...
      </div>
    );
  }

  // SECTION 1: Status breakdown
  const statusCounts = { Filled: 0, Open: 0, Cancelled: 0, 'On Hold': 0 };
  requisitions.forEach((r) => {
    const s = r.requisitionStatus;
    if (s === 'Filled' || s === 'Closed') statusCounts.Filled++;
    else if (s === 'Open') statusCounts.Open++;
    else if (s === 'Cancelled') statusCounts.Cancelled++;
    else if (s === 'On Hold') statusCounts['On Hold']++;
  });
  const statusData = [
    { status: 'Filled', count: statusCounts.Filled, color: '#22c55e' },
    { status: 'Open', count: statusCounts.Open, color: '#00d4ff' },
    { status: 'Cancelled', count: statusCounts.Cancelled, color: '#ef4444' },
    { status: 'On Hold', count: statusCounts['On Hold'], color: '#f59e0b' },
  ];

  // SECTION 2: Aging analysis
  const ageBuckets = [0, 0, 0, 0, 0];
  requisitions.forEach((r) => {
    const age = r.age ?? 0;
    if (age <= 30) ageBuckets[0]++;
    else if (age <= 60) ageBuckets[1]++;
    else if (age <= 90) ageBuckets[2]++;
    else if (age <= 120) ageBuckets[3]++;
    else ageBuckets[4]++;
  });
  const agingData = ['0-30d', '31-60d', '61-90d', '91-120d', '120+d'].map((bucket, i) => ({
    bucket,
    count: ageBuckets[i],
  }));

  // SECTION 3: Workload by Recruiter
  const recruiterCounts: Record<string, number> = {};
  requisitions.forEach((r) => {
    const name = `${r.taFirstName || ''} ${r.taLastName || ''}`.trim() || 'Unassigned';
    recruiterCounts[name] = (recruiterCounts[name] || 0) + 1;
  });
  const recruiterData = Object.entries(recruiterCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 15);

  const tooltipStyle = { backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '0.75rem', color: '#ffffff' };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 text-zinc-100 font-sans antialiased">
      <div className="flex flex-col gap-1 mb-2">
        <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">📊 Requisition Analytics Insights</h2>
        <p className="text-xs text-zinc-400">In-depth status distribution, aging breakdown, and recruiter workload analysis</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SECTION 1: Status breakdown */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:border-white/20 flex flex-col justify-between">
          <div className="mb-4">
            <h3 className="text-md font-semibold text-white flex items-center gap-2">🟢 Status Breakdown</h3>
            <p className="text-xs text-zinc-400 mt-1">Active volume categorized by requisition status</p>
          </div>
          <div className="h-64 w-full">
            {requisitions.length === 0 ? (
              <div className="h-full flex items-center justify-center text-zinc-500 text-sm">No status data available</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={statusData} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
                  <CartesianGrid stroke="#27272a" strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" stroke="#52525b" tick={{ fill: '#a1a1aa' }} fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis type="category" dataKey="status" stroke="#52525b" tick={{ fill: '#ffffff' }} fontSize={11} tickLine={false} axisLine={false} width={80} />
                  <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }} />
                  <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={24}>
                    {statusData.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* SECTION 2: Aging analysis */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:border-white/20 flex flex-col justify-between">
          <div className="mb-4">
            <h3 className="text-md font-semibold text-white flex items-center gap-2">📅 Aging Analysis</h3>
            <p className="text-xs text-zinc-400 mt-1">Distribution of requisitions by age buckets (days)</p>
          </div>
          <div className="h-64 w-full">
            {requisitions.length === 0 ? (
              <div className="h-full flex items-center justify-center text-zinc-500 text-sm">No aging data available</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={agingData} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
                  <CartesianGrid stroke="#27272a" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="bucket" stroke="#52525b" tick={{ fill: '#ffffff' }} fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#52525b" tick={{ fill: '#a1a1aa' }} fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }} />
                  <Bar dataKey="count" fill="#a78bfa" radius={[4, 4, 0, 0]} maxBarSize={45} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      {/* SECTION 3: Workload by Recruiter */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:border-white/20">
        <div className="mb-4">
          <h3 className="text-md font-semibold text-white flex items-center gap-2">👤 Workload by Recruiter</h3>
          <p className="text-xs text-zinc-400 mt-1">Top 15 recruiters ranked by volume of requisition assignments</p>
        </div>
        <div className="h-96 w-full">
          {recruiterData.length === 0 ? (
            <div className="h-full flex items-center justify-center text-zinc-500 text-sm">No recruiter workload data available</div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={recruiterData} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid stroke="#27272a" strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" stroke="#52525b" tick={{ fill: '#a1a1aa' }} fontSize={11} tickLine={false} axisLine={false} />
                <YAxis type="category" dataKey="name" stroke="#52525b" tick={{ fill: '#ffffff' }} fontSize={11} tickLine={false} axisLine={false} width={140} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }} />
                <Bar dataKey="count" fill="#00d4ff" radius={[0, 4, 4, 0]} barSize={14} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}
