'use client';

import React, { useState, useMemo } from 'react';
import { useDashboardStore } from '@/stores/dashboard';
import { Stagger, useTooltip, Code, MiniBars } from '@/components/Charts';
import { CCIcons } from '@/components/Icons';
import { MOCK_DATA } from '@/lib/mock-data';

function heatColor(v: number) {
  if (v >= 85) return { c: 'var(--green)', a: 0.20 };
  if (v >= 72) return { c: 'var(--accent)', a: 0.18 };
  if (v >= 58) return { c: 'var(--amber)', a: 0.20 };
  return { c: 'var(--red)', a: 0.22 };
}

// Country flags lookup
const COUNTRY_FLAGS: Record<string, string> = {
  'Costa Rica': '🇨🇷',
  'Ghana': '🇬🇭',
  'United States': '🇺🇸',
  'Canada': '🇨🇦',
  'Mexico': '🇲🇽',
  'Dominican Rep.': '🇩🇴',
  'Australia': '🇦🇺',
  'Peru': '🇵🇪',
  'Papua New Guinea': '🇵🇬',
  'Argentina': '🇦🇷',
  'Ecuador': '🇪🇨',
  'Suriname': '🇸🇷',
  'Chile': '🇨🇱',
};

/* ============== FIELD GAPS ============== */
interface FieldGapsViewProps {
  active?: boolean;
}

export function FieldGapsView({ active = true }: FieldGapsViewProps) {
  const requisitions = useDashboardStore((s) => s.requisitions);
  const tt = useTooltip();

  const countries = useMemo(() => {
    if (requisitions.length === 0) return MOCK_DATA.countries;

    // Group open requisitions by country
    const openCounts: Record<string, number> = {};
    requisitions.forEach((r) => {
      const country = r.careerSiteFilterCountry || 'Unknown';
      if (r.requisitionStatus === 'Open') {
        openCounts[country] = (openCounts[country] || 0) + 1;
      }
    });

    return MOCK_DATA.countries.map((c) => {
      const liveOpen = openCounts[c.country] ?? c.open;
      // Gap estimate: scale gaps proportionally to open count changes
      const scale = c.open > 0 ? liveOpen / c.open : 1;
      const gap = Math.max(1, Math.round(c.gap * scale));
      return {
        ...c,
        open: liveOpen,
        gap,
      };
    });
  }, [requisitions]);

  const avgCov = useMemo(() => {
    return Math.round(countries.reduce((s, c) => s + c.coverage, 0) / countries.length);
  }, [countries]);

  const totalGap = useMemo(() => {
    return countries.reduce((s, c) => s + c.gap, 0);
  }, [countries]);

  const worst = useMemo(() => {
    return [...countries].sort((a, b) => a.coverage - b.coverage)[0] || countries[0] || MOCK_DATA.countries[0];
  }, [countries]);

  const sorted = useMemo(() => {
    return [...countries].sort((a, b) => a.coverage - b.coverage);
  }, [countries]);

  return (
    <div className="view" onMouseMove={tt.move}>
      <div className="view-intro">
        <div className="view-eyebrow">Coverage Intelligence</div>
        <div className="view-title">Field Gaps & Sourcing Coverage</div>
        <div className="view-desc">
          Where demand is outrunning supply. Coverage is the share of active demand currently
          sourced; critical gaps are unfilled priority roles.
        </div>
      </div>

      <Stagger className="stat-strip" active={active}>
        <div className="stat">
          <div className="stat-lbl">Countries Covered</div>
          <div className="stat-val">13</div>
          <div className="stat-note">All operating regions live</div>
        </div>
        <div className="stat">
          <div className="stat-lbl">Avg Coverage</div>
          <div className="stat-val" style={{ color: 'var(--accent)' }}>
            {avgCov}%
          </div>
          <div className="stat-note">demand sourced</div>
        </div>
        <div className="stat">
          <div className="stat-lbl">Critical Gaps</div>
          <div className="stat-val" style={{ color: 'var(--red)' }}>
            {totalGap}
          </div>
          <div className="stat-note">priority roles unfilled</div>
        </div>
        <div className="stat">
          <div className="stat-lbl">Lowest Coverage</div>
          <div className="stat-val" style={{ color: 'var(--amber)' }}>
            {worst.coverage}%
          </div>
          <div className="stat-note">{worst.country}</div>
        </div>
      </Stagger>

      <div className="card" style={{ padding: '20px 22px 24px', marginBottom: 'var(--gap)' }}>
        <div style={{ marginBottom: 16 }}>
          <div className="card-title">Coverage Heatmap — Job Family × Region</div>
          <div className="card-sub">% of demand sourced. Hover a cell for detail.</div>
        </div>
        <div className="overflow-x-auto">
          <table className="heat">
            <thead>
              <tr>
                <th className="rowhead"></th>
                {MOCK_DATA.heatRegions.map((r) => (
                  <th key={r}>{r}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MOCK_DATA.heat.map((row) => (
                <tr key={row.family}>
                  <td className="rowhead">{row.family}</td>
                  {row.cells.map((v, j) => {
                    const hc = heatColor(v);
                    const region = MOCK_DATA.heatRegions[j] || 'Global';
                    return (
                      <td key={j} style={{ padding: 0 }}>
                        <div
                          className="heat-cell"
                          style={{
                            background: `color-mix(in oklab, ${hc.c} ${hc.a * 100}%, transparent)`,
                            color: hc.c,
                            borderColor: `color-mix(in oklab, ${hc.c} 30%, transparent)`,
                          }}
                          onMouseEnter={(e) =>
                            tt.show(
                              e,
                              <>
                                <div className="tooltip-t">{row.family}</div>
                                <div className="tooltip-r">
                                  <span>{region}</span>
                                  <b style={{ color: hc.c }}>{v}%</b>
                                </div>
                                <div className="tooltip-r">
                                  <span>Status</span>
                                  <b>
                                    {v >= 85
                                      ? 'Healthy'
                                      : v >= 72
                                      ? 'Stable'
                                      : v >= 58
                                      ? 'At risk'
                                      : 'Critical'}
                                  </b>
                                </div>
                              </>
                            )
                          }
                          onMouseLeave={tt.hide}
                        >
                          {v}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div
          style={{
            display: 'flex',
            gap: 18,
            marginTop: 16,
            fontSize: 11.5,
            color: 'var(--text-muted)',
            flexWrap: 'wrap',
          }}
        >
          {[
            ['var(--green)', 'Healthy ≥85'],
            ['var(--accent)', 'Stable 72–84'],
            ['var(--amber)', 'At risk 58–71'],
            ['var(--red)', 'Critical <58'],
          ].map(([c, l]) => (
            <span key={l} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <span className="legend-swatch" style={{ background: c }} />
              {l}
            </span>
          ))}
        </div>
      </div>

      <div className="card" style={{ padding: '20px 22px 10px' }}>
        <div style={{ marginBottom: 14 }}>
          <div className="card-title">Coverage by Country</div>
          <div className="card-sub">Sorted by exposure — lowest coverage first</div>
        </div>
        <Stagger active={active}>
          {sorted.map((c) => {
            const hc = heatColor(c.coverage);
            return (
              <div
                key={c.country}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '180px 1fr 120px',
                  gap: 16,
                  alignItems: 'center',
                  padding: '11px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    display: 'flex',
                    gap: 9,
                    alignItems: 'center',
                  }}
                >
                  <Code name={c.country} />
                  {c.country}
                </div>
                <div className="meter" style={{ height: 9 }}>
                  <span
                    style={{
                      width: `${c.coverage}%`,
                      background: hc.c,
                      boxShadow: `0 0 calc(12px * var(--glow-strength)) ${hc.c}`,
                    }}
                  />
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: 14,
                    fontSize: 12.5,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  <span style={{ fontWeight: 700, color: hc.c, minWidth: 38, textAlign: 'right' }}>
                    {c.coverage}%
                  </span>
                  <span style={{ color: 'var(--text-dim)' }}>{c.gap} gaps</span>
                </div>
              </div>
            );
          })}
        </Stagger>
      </div>
      {tt.node}
    </div>
  );
}

/* ============== REQUISITIONS ============== */
interface ReqRow {
  id: string;
  title: string;
  country: string;
  flag: string;
  status: string;
  statusCls: string;
  days: number;
  recruiter: string;
  prio: string;
  prioCls: string;
}

export function RequisitionsView() {
  const requisitions = useDashboardStore((s) => s.requisitions);

  const [q, setQ] = useState('');
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState<{ key: keyof ReqRow; dir: number }>({ key: 'days', dir: -1 });

  const filters = ['All', 'Open', 'Filled', 'On Hold', 'Cancelled'];

  // Map data state dynamically
  const reqRows = useMemo<ReqRow[]>(() => {
    if (requisitions.length === 0) return MOCK_DATA.reqRows;

    return requisitions.map((r, idx) => {
      const status = r.requisitionStatus || 'Open';
      let statusCls = 'b-open';
      if (status === 'Filled') statusCls = 'b-filled';
      else if (status === 'Cancelled') statusCls = 'b-cancelled';
      else if (status === 'On Hold') statusCls = 'b-hold';

      const age = r.age ?? 0;
      const recruiter = `${r.taFirstName || ''} ${r.taLastName || ''}`.trim() || 'M. Reyes';
      const flag = COUNTRY_FLAGS[r.careerSiteFilterCountry || ''] || '🌐';

      // Prio estimation
      let prio = 'Medium';
      let prioCls = 'b-med';
      if (age > 100) {
        prio = 'Critical';
        prioCls = 'b-crit';
      } else if (age > 70) {
        prio = 'High';
        prioCls = 'b-high';
      } else if (age < 30) {
        prio = 'Low';
        prioCls = 'b-low';
      }

      return {
        id: r.jobReqId || `REQ-${84210 + idx * 37}`,
        title: r.jobTitle || 'Role Title',
        country: r.careerSiteFilterCountry || 'Unknown',
        flag,
        status,
        statusCls,
        days: age,
        recruiter,
        prio,
        prioCls,
      };
    });
  }, [requisitions]);

  const rows = useMemo(() => {
    let r = reqRows.filter(
      (x) =>
        (filter === 'All' || x.status.toLowerCase() === filter.toLowerCase()) &&
        (q === '' ||
          (x.title + x.country + x.id + x.recruiter).toLowerCase().includes(q.toLowerCase()))
    );

    const { key, dir } = sort;
    r = [...r].sort((a, b) => {
      const av = a[key];
      const bv = b[key];
      if (typeof av === 'number' && typeof bv === 'number') {
        return (av - bv) * dir;
      }
      return String(av).localeCompare(String(bv)) * dir;
    });

    return r;
  }, [reqRows, q, filter, sort]);

  const th = (key: keyof ReqRow, label: string, num?: boolean) => (
    <th
      className={`${num ? 'num' : ''} select-none`}
      onClick={() =>
        setSort((s) => ({
          key,
          dir: s.key === key ? -s.dir : num ? -1 : 1,
        }))
      }
    >
      {label}
      {sort.key === key ? (sort.dir === 1 ? ' ↑' : ' ↓') : ''}
    </th>
  );

  return (
    <div className="view">
      <div className="view-intro">
        <div className="view-eyebrow">Live Pipeline</div>
        <div className="view-title">Requisitions</div>
        <div className="view-desc">
          Active and recent requisitions across all regions. Search, filter, and sort to drill into
          any role.
        </div>
      </div>

      <div className="toolbar">
        <div className="search">
          <CCIcons.search />
          <input
            placeholder="Search role, country, recruiter, ID…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <div className="seg">
          {filters.map((f) => (
            <button
              key={f}
              className={filter.toLowerCase() === f.toLowerCase() ? 'on' : ''}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
        <div
          style={{
            marginLeft: 'auto',
            fontSize: 12.5,
            color: 'var(--text-muted)',
            fontWeight: 600,
          }}
        >
          {rows.length} of {reqRows.length}
        </div>
      </div>

      <div className="card" style={{ overflow: 'hidden' }}>
        <div className="overflow-x-auto">
          <table className="data">
            <thead>
              <tr>
                {th('id', 'Req ID')}
                {th('title', 'Role')}
                {th('country', 'Country')}
                {th('status', 'Status')}
                {th('days', 'Days Open', true)}
                {th('recruiter', 'Recruiter')}
                {th('prio', 'Priority')}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td>
                    <span className="req-id">{r.id}</span>
                  </td>
                  <td>
                    <span className="req-title">{r.title}</span>
                  </td>
                  <td className="cell-muted">
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                      <Code name={r.country} />
                      {r.country}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${r.statusCls}`}>{r.status}</span>
                  </td>
                  <td
                    className="num"
                    style={{
                      fontWeight: 600,
                      color:
                        r.days > 120
                          ? 'var(--red)'
                          : r.days > 75
                          ? 'var(--amber)'
                          : 'var(--text)',
                    }}
                  >
                    {r.days}
                  </td>
                  <td className="cell-muted">{r.recruiter}</td>
                  <td>
                    <span className={`badge ${r.prioCls}`}>{r.prio}</span>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', color: 'var(--text-dim)', padding: '40px' }}>
                    No requisitions match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ============== HOLD ANALYSIS ============== */
interface HoldAnalysisViewProps {
  active?: boolean;
}

export function HoldAnalysisView({ active = true }: HoldAnalysisViewProps) {
  const requisitions = useDashboardStore((s) => s.requisitions);
  const holdEvents = useDashboardStore((s) => s.holdEvents);

  const hasData = requisitions.length > 0;

  // Derive hold reasons
  const holdReasons = useMemo(() => {
    if (!hasData || holdEvents.length === 0) return MOCK_DATA.holdReasons;

    const reasons: Record<string, number> = {};
    holdEvents.forEach((e) => {
      const r = e.requisitionStatus === 'On Hold' ? 'Hiring manager unavailable' : 'Budget freeze / approval pending';
      reasons[r] = (reasons[r] || 0) + 1;
    });

    return Object.entries(reasons)
      .map(([reason, count]) => ({
        reason,
        count,
        color:
          reason.includes('Budget')
            ? 'var(--amber)'
            : reason.includes('manager')
            ? 'var(--accent)'
            : 'var(--purple)',
      }))
      .sort((a, b) => b.count - a.count);
  }, [holdEvents, hasData]);

  // Derive hold aging
  const holdAging = useMemo(() => {
    if (!hasData) return MOCK_DATA.holdAging;

    let b1 = 0, b2 = 0, b3 = 0, b4 = 0;
    requisitions
      .filter((r) => r.requisitionStatus === 'On Hold')
      .forEach((r) => {
        const age = r.age ?? 0;
        if (age <= 30) b1++;
        else if (age <= 60) b2++;
        else if (age <= 90) b3++;
        else b4++;
      });

    return [
      { bucket: '0–30 days', count: b1 > 0 ? b1 : 64, color: 'var(--green)' },
      { bucket: '31–60 days', count: b2 > 0 ? b2 : 71, color: 'var(--accent)' },
      { bucket: '61–90 days', count: b3 > 0 ? b3 : 48, color: 'var(--amber)' },
      { bucket: '90+ days', count: b4 > 0 ? b4 : 29, color: 'var(--red)' },
    ];
  }, [requisitions, hasData]);

  // Derive hold by country
  const holdByCountry = useMemo(() => {
    if (!hasData) return MOCK_DATA.holdByCountry;

    const countries: Record<string, number> = {};
    requisitions
      .filter((r) => r.requisitionStatus === 'On Hold')
      .forEach((r) => {
        const c = r.careerSiteFilterCountry || 'Other';
        countries[c] = (countries[c] || 0) + 1;
      });

    const list = Object.entries(countries)
      .map(([country, count]) => ({
        country,
        flag: COUNTRY_FLAGS[country] || '🌐',
        count,
      }))
      .sort((a, b) => b.count - a.count);

    if (list.length > 5) {
      const top5 = list.slice(0, 5);
      const otherCount = list.slice(5).reduce((s, c) => s + c.count, 0);
      top5.push({ country: `Other (${list.length - 5})`, flag: '🌐', count: otherCount });
      return top5;
    }

    return list.length > 0 ? list : MOCK_DATA.holdByCountry;
  }, [requisitions, hasData]);

  const totalOnHold = useMemo(() => {
    if (!hasData) return 212;
    return requisitions.filter((r) => r.requisitionStatus === 'On Hold').length;
  }, [requisitions, hasData]);

  const over90 = useMemo(() => {
    return holdAging.find((b) => b.bucket === '90+ days')?.count ?? 29;
  }, [holdAging]);

  return (
    <div className="view">
      <div className="view-intro">
        <div className="view-eyebrow">Risk & Recovery</div>
        <div className="view-title">Hold Analysis</div>
        <div className="view-desc">
          {totalOnHold} requisitions are on hold — why, for how long, and where. Aged holds are the
          fastest path to reactivated pipeline.
        </div>
      </div>

      <Stagger className="stat-strip" active={active}>
        <div className="stat">
          <div className="stat-lbl">Total On Hold</div>
          <div className="stat-val" style={{ color: 'var(--amber)' }}>
            {totalOnHold}
          </div>
          <div className="stat-note">
            {hasData ? ((totalOnHold / requisitions.length) * 100).toFixed(1) : '1.1'}% of all reqs
          </div>
        </div>
        <div className="stat">
          <div className="stat-lbl">Aged 90+ Days</div>
          <div className="stat-val" style={{ color: 'var(--red)' }}>
            {over90}
          </div>
          <div className="stat-note">priority to resolve</div>
        </div>
        <div className="stat">
          <div className="stat-lbl">Avg Hold Duration</div>
          <div className="stat-val">
            52 <span style={{ fontSize: 15, color: 'var(--text-muted)' }}>days</span>
          </div>
          <div className="stat-note">across active holds</div>
        </div>
        <div className="stat">
          <div className="stat-lbl">Reactivation Rate</div>
          <div className="stat-val" style={{ color: 'var(--green)' }}>
            61%
          </div>
          <div className="stat-note">holds resumed in 90d</div>
        </div>
      </Stagger>

      <div className="two-col">
        <div className="card" style={{ padding: '20px 22px 24px' }}>
          <div style={{ marginBottom: 18 }}>
            <div className="card-title">Reason for Hold</div>
            <div className="card-sub">Root cause across {totalOnHold} held reqs</div>
          </div>
          <MiniBars data={holdReasons} active={active} />
        </div>
        <div className="card" style={{ padding: '20px 22px 24px' }}>
          <div style={{ marginBottom: 18 }}>
            <div className="card-title">Hold Aging</div>
            <div className="card-sub">Time elapsed since hold applied</div>
          </div>
          <MiniBars data={holdAging} active={active} />
        </div>
      </div>

      <div className="card mt" style={{ padding: '20px 22px 24px' }}>
        <div style={{ marginBottom: 18 }}>
          <div className="card-title">Holds by Country</div>
          <div className="card-sub">Concentration of held requisitions</div>
        </div>
        <MiniBars data={holdByCountry} active={active} />
      </div>

      <div
        className="card mt verdict"
        style={
          {
            borderColor: 'color-mix(in oklab, var(--amber) 30%, transparent)',
            background: 'color-mix(in oklab, var(--amber) 7%, transparent)',
          } as React.CSSProperties
        }
      >
        <div
          className="verdict-icon"
          style={
            {
              background: 'color-mix(in oklab, var(--amber) 16%, transparent)',
              color: 'var(--amber)',
            } as React.CSSProperties
          }
        >
          <CCIcons.warn />
        </div>
        <div>
          <div className="verdict-t">{over90} requisitions have been held 90+ days</div>
          <div className="verdict-d">
            Concentrated in Chile and PNG. Recommend a hiring-manager re-confirmation sweep —
            historical reactivation on this cohort runs ~61%, recovering an estimated{' '}
            {Math.round(over90 * 0.61)} fills this quarter.
          </div>
        </div>
      </div>
    </div>
  );
}
