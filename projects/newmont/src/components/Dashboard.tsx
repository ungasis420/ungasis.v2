'use client';

import React, { useMemo } from 'react';
import { useDashboardStore } from '@/stores/dashboard';
import { useCountUp, Stagger, BarChart, DonutChart } from '@/components/Charts';
import { CCIcons } from '@/components/Icons';
import { MOCK_DATA } from '@/lib/mock-data';
import { realData } from '@/lib/real-data';

const STATUS_COLORS: Record<string, string> = {
  Filled: 'var(--green)',
  Closed: 'var(--green)',
  Cancelled: 'var(--red)',
  Open: 'var(--accent)',
  'On Hold': 'var(--amber)',
};

const getStatusColor = (status: string): string => {
  return STATUS_COLORS[status] || 'var(--gray)';
};

interface KpiCardProps {
  k: {
    id: string;
    label: string;
    value: number;
    suffix: string;
    decimals?: number;
    color: string;
    icon: keyof typeof CCIcons;
    subtitle: string;
  };
  active?: boolean;
}

function KpiCard({ k, active = true }: KpiCardProps) {
  const I = CCIcons[k.icon];
  const val = useCountUp(k.value, { decimals: k.decimals || 0, active, duration: 1300 });

  return (
    <div className="card kpi" style={{ '--c': k.color } as React.CSSProperties}>
      <div className="kpi-top">
        <div className="kpi-label">{k.label}</div>
        <div className="kpi-icon">
          <I />
        </div>
      </div>
      <div className="kpi-value">
        {val}
        {k.suffix}
      </div>
      <div className="kpi-foot">
        <span className="kpi-note">{k.subtitle}</span>
      </div>
    </div>
  );
}

interface DashboardViewProps {
  active?: boolean;
}

export default function Dashboard({ active = true }: DashboardViewProps) {
  const requisitions = useDashboardStore((s) => s.requisitions);

  // Check if store has loaded CSV data
  const hasData = requisitions.length > 0;

  // KPIs derived from store if loaded, otherwise fallback
  const kpis = useMemo(() => {
    if (!hasData) return MOCK_DATA.kpis;

    const total = requisitions.length;
    const filledCount = requisitions.filter(
      (r) => r.requisitionStatus === 'Filled' || r.requisitionStatus === 'Closed'
    ).length;
    const fillRate = total > 0 ? (filledCount / total) * 100 : 0;

    const ttfReqs = requisitions.filter((r) => r.timeToFill !== null && r.timeToFill !== undefined);
    const avgTTF =
      ttfReqs.length > 0
        ? ttfReqs.reduce((sum, r) => sum + (r.timeToFill as number), 0) / ttfReqs.length
        : 0;

    const cancelledCount = requisitions.filter((r) => r.requisitionStatus === 'Cancelled').length;
    const cancelRate = total > 0 ? (cancelledCount / total) * 100 : 0;

    const openCount = requisitions.filter((r) => r.requisitionStatus === 'Open').length;
    const holdCount = requisitions.filter((r) => r.requisitionStatus === 'On Hold').length;

    return [
      {
        id: 'reqs',
        label: 'Total Requisitions',
        value: total,
        suffix: '',
        color: 'var(--accent)',
        icon: 'layers' as const,
        subtitle: 'all-time',
      },
      {
        id: 'fill',
        label: 'Fill Rate',
        value: fillRate,
        suffix: '%',
        decimals: 1,
        color: 'var(--green)',
        icon: 'target' as const,
        subtitle: 'all-time',
      },
      {
        id: 'ttf',
        label: 'Avg Time to Fill',
        value: avgTTF,
        suffix: ' days',
        decimals: 1,
        color: 'var(--amber)',
        icon: 'clock' as const,
        subtitle: 'all-time',
      },
      {
        id: 'cancel',
        label: 'Cancel Rate',
        value: cancelRate,
        suffix: '%',
        decimals: 1,
        color: 'var(--red)',
        icon: 'alert' as const,
        subtitle: 'all-time',
      },
      {
        id: 'open',
        label: 'Open Reqs',
        value: openCount,
        suffix: '',
        color: 'var(--purple)',
        icon: 'folder' as const,
        subtitle: 'current period',
      },
      {
        id: 'hold',
        label: 'On Hold',
        value: holdCount,
        suffix: '',
        color: 'var(--gray)',
        icon: 'pause' as const,
        subtitle: 'current period',
      },
    ];
  }, [requisitions, hasData]);

  // TTF by Country derived from store if loaded, otherwise fallback from realData.byCountry
  const ttfByCountry = useMemo(() => {
    if (!hasData) {
      return realData.byCountry
        .filter((c) => c.name !== 'Unspecified')
        .slice(0, 5)
        .map((c) => ({
          country: c.name,
          days: realData.timeToFill.average,
          open: 0,
        }));
    }

    const countryGroups: Record<string, { totalTTF: number; count: number; open: number }> = {};
    requisitions.forEach((r) => {
      const country = r.careerSiteFilterCountry || 'Unknown';
      if (!countryGroups[country]) {
        countryGroups[country] = { totalTTF: 0, count: 0, open: 0 };
      }
      if (r.requisitionStatus === 'Open') {
        countryGroups[country].open += 1;
      }
      if (r.timeToFill !== null && r.timeToFill !== undefined) {
        countryGroups[country].totalTTF += r.timeToFill;
        countryGroups[country].count += 1;
      }
    });

    return Object.entries(countryGroups)
      .map(([country, data]) => ({
        country,
        days: data.count > 0 ? Math.round(data.totalTTF / data.count) : 0,
        open: data.open,
      }))
      .filter((c) => c.days > 0)
      .sort((a, b) => b.days - a.days)
      .slice(0, 5); // Take top 5 for executive dashboard comparison
  }, [requisitions, hasData]);

  // Requisitions Status Distribution derived from store if loaded, otherwise fallback
  const statusDist = useMemo(() => {
    if (!hasData) return MOCK_DATA.statusDist;

    const total = requisitions.length;
    const counts: Record<string, number> = {};
    requisitions.forEach((r) => {
      const status = r.requisitionStatus || 'Unknown';
      counts[status] = (counts[status] || 0) + 1;
    });

    return Object.entries(counts).map(([name, count]) => ({
      name,
      pct: parseFloat(((count / total) * 100).toFixed(1)),
      count,
      color: getStatusColor(name),
    }));
  }, [requisitions, hasData]);

  const total = hasData ? requisitions.length : MOCK_DATA.TOTAL;
  const slaTarget = MOCK_DATA.SLA_TARGET;

  return (
    <div className="view">
      <div className="view-intro">
        <div className="view-eyebrow">Executive Overview</div>
        <div className="view-title">Global Recruiting Performance</div>
        <div className="view-desc">
          Rolling 12-month view across 13 operating countries. Pipeline health, speed-to-fill, and
          coverage at a-glance.
        </div>
      </div>

      <Stagger className="kpi-grid" active={active}>
        {kpis.map((k) => (
          <KpiCard key={k.id} k={k as any} active={active} />
        ))}
      </Stagger>

      <div className="charts-row">
        <div className="card">
          <div className="card-head">
            <div>
              <div className="card-title">Time to Fill by Country</div>
              <div className="card-sub">
                Average days from open to offer accept · dashed line = {slaTarget}-day SLA target
              </div>
            </div>
          </div>
          <BarChart data={ttfByCountry} target={slaTarget} active={active} />
        </div>

        <div className="card">
          <div className="card-head">
            <div>
              <div className="card-title">Requisition Status</div>
              <div className="card-sub">Distribution across pipeline</div>
            </div>
          </div>
          <DonutChart data={statusDist} total={total} active={active} />
        </div>
      </div>
    </div>
  );
}
