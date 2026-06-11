'use client';

import React, { useState, useMemo } from 'react';
import { useDashboardStore } from '@/stores/dashboard';
import { CCIcons } from '@/components/Icons';
import { Code } from '@/components/Charts';
import { MOCK_DATA } from '@/lib/mock-data';

const SENIORITY = [
  { k: 'Entry', m: 0.82 },
  { k: 'Professional', m: 1.0 },
  { k: 'Senior', m: 1.28 },
  { k: 'Executive', m: 1.65 },
];

const PRIORITY = [
  { k: 'Standard', m: 1.0 },
  { k: 'High', m: 0.86 },
  { k: 'Critical', m: 0.72 },
];

export default function SLACalculator() {
  const requisitions = useDashboardStore((s) => s.requisitions);
  const TARGET = MOCK_DATA.SLA_TARGET;

  const [ci, setCi] = useState(0);
  const [sen, setSen] = useState(1);
  const [pri, setPri] = useState(0);
  const [rec, setRec] = useState(2);

  // Compute live baselines if data exists, otherwise fallback to mock baseline
  const slaCountries = useMemo(() => {
    if (requisitions.length === 0) return MOCK_DATA.slaCountries;

    // Group requisitions by country and find mean TTF
    const countryGroups: Record<string, { total: number; count: number }> = {};
    requisitions.forEach((r) => {
      const country = r.careerSiteFilterCountry || 'Unknown';
      if (r.timeToFill !== null && r.timeToFill !== undefined) {
        if (!countryGroups[country]) {
          countryGroups[country] = { total: 0, count: 0 };
        }
        countryGroups[country].total += r.timeToFill;
        countryGroups[country].count += 1;
      }
    });

    return MOCK_DATA.slaCountries.map((c) => {
      const live = countryGroups[c.name];
      const liveBase = live && live.count > 0 ? Math.round(live.total / live.count) : c.base;
      return {
        name: c.name,
        flag: c.flag,
        base: liveBase > 0 ? liveBase : c.base,
      };
    });
  }, [requisitions]);

  const country = slaCountries[ci] || slaCountries[0] || MOCK_DATA.slaCountries[0];
  const base = country.base;
  const senMult = SENIORITY[sen]?.m ?? 1.0;
  const priMult = PRIORITY[pri]?.m ?? 1.0;
  const recFactor = 1 - (rec - 1) * 0.058;

  const senDelta = base * (senMult - 1);
  const priDelta = base * senMult * (priMult - 1);
  const recDelta = base * senMult * priMult * (recFactor - 1);
  const projected = Math.max(8, Math.round(base * senMult * priMult * recFactor));

  const ratio = projected / TARGET;
  const verdict =
    ratio <= 1
      ? {
          t: 'Within SLA',
          d: `Projected ${projected} days lands inside the ${TARGET}-day target with ${
            TARGET - projected
          } days of headroom.`,
          c: 'var(--green)',
          icon: 'check' as const,
        }
      : ratio <= 1.25
      ? {
          t: 'At Risk',
          d: `Projected ${projected} days exceeds the ${TARGET}-day SLA by ${
            projected - TARGET
          } days. Add sourcing capacity or raise priority.`,
          c: 'var(--amber)',
          icon: 'warn' as const,
        }
      : {
          t: 'SLA Breach',
          d: `Projected ${projected} days is ${
            projected - TARGET
          } days over target. This requisition needs an escalation plan before kickoff.`,
          c: 'var(--red)',
          icon: 'alert' as const,
        };

  const gaugePct = Math.min(100, (projected / 220) * 100);
  const VIcon = CCIcons[verdict.icon];

  const selectStyle = {
    width: '100%',
    padding: '11px 13px',
    borderRadius: 10,
    background: 'var(--glass-bg)',
    border: '1px solid var(--glass-border)',
    color: 'var(--text)',
    fontSize: 13.5,
    fontWeight: 600,
    outline: 'none',
    cursor: 'pointer',
    appearance: 'none',
    WebkitAppearance: 'none',
    backgroundImage:
      'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'14\' height=\'14\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23888\' stroke-width=\'2\'%3E%3Cpath d=\'M6 9l6 6 6-6\'/%3E%3C/svg%3E")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 13px center',
  } as React.CSSProperties;

  return (
    <div className="view">
      <div className="view-intro">
        <div className="view-eyebrow">Planning Tool</div>
        <div className="view-title">SLA Calculator</div>
        <div className="view-desc">
          Model expected time-to-fill before a requisition opens. Adjust the inputs to see how
          country, seniority, priority, and sourcing capacity move the projection against the{' '}
          {TARGET}-day SLA.
        </div>
      </div>

      <div className="calc-grid">
        {/* inputs */}
        <div className="card" style={{ padding: '22px 22px 8px' }}>
          <div style={{ marginBottom: 20 }}>
            <div className="card-title">Requisition Parameters</div>
            <div className="card-sub">Configure the role to model</div>
          </div>

          <div className="field">
            <div className="field-lbl">
              <span>Operating Country</span>
              <b>{base}d base</b>
            </div>
            <select style={selectStyle} value={ci} onChange={(e) => setCi(+e.target.value)}>
              {slaCountries.map((c, i) => (
                <option key={c.name} value={i} style={{ background: '#0c0c20' }}>
                  {c.name} — {c.base}d baseline
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <div className="field-lbl">
              <span>Role Seniority</span>
              <b>×{senMult.toFixed(2)}</b>
            </div>
            <div className="opt-row">
              {SENIORITY.map((s, i) => (
                <div
                  key={s.k}
                  className={`opt select-none ${sen === i ? 'on' : ''}`}
                  onClick={() => setSen(i)}
                >
                  {s.k}
                </div>
              ))}
            </div>
          </div>

          <div className="field">
            <div className="field-lbl">
              <span>Priority Tier</span>
              <b>×{priMult.toFixed(2)}</b>
            </div>
            <div className="opt-row">
              {PRIORITY.map((p, i) => (
                <div
                  key={p.k}
                  className={`opt select-none ${pri === i ? 'on' : ''}`}
                  onClick={() => setPri(i)}
                >
                  {p.k}
                </div>
              ))}
            </div>
          </div>

          <div className="field">
            <div className="field-lbl">
              <span>Sourcing Capacity</span>
              <b>
                {rec} recruiter{rec > 1 ? 's' : ''}
              </b>
            </div>
            <input
              type="range"
              className="slider w-full cursor-pointer"
              min="1"
              max="5"
              step="1"
              value={rec}
              style={{ '--pct': `${((rec - 1) / 4) * 100}%` } as React.CSSProperties}
              onChange={(e) => setRec(+e.target.value)}
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: 10.5,
                color: 'var(--text-dim)',
                marginTop: 6,
              }}
            >
              <span>Lean</span>
              <span>Dedicated pod</span>
            </div>
          </div>
        </div>

        {/* output */}
        <div className="card" style={{ padding: '22px', '--c': verdict.c } as React.CSSProperties}>
          <div style={{ marginBottom: 6 }}>
            <div className="card-title">Projected Time to Fill</div>
            <div className="card-sub" style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <Code name={country.name} />
              {country.name} · {SENIORITY[sen]?.k} · {PRIORITY[pri]?.k}
            </div>
          </div>

          <div className="gauge-wrap">
            <svg width="260" height="148" viewBox="0 0 260 148">
              <path
                d="M20 138 A110 110 0 0 1 240 138"
                fill="none"
                stroke="rgba(255,255,255,0.07)"
                strokeWidth="16"
                strokeLinecap="round"
                pathLength="100"
              />
              <path
                d="M20 138 A110 110 0 0 1 240 138"
                fill="none"
                stroke={verdict.c}
                strokeWidth="16"
                strokeLinecap="round"
                pathLength="100"
                strokeDasharray="100"
                strokeDashoffset={100 - gaugePct}
                style={
                  {
                    transition: 'stroke-dashoffset .8s cubic-bezier(.2,.8,.25,1), stroke .3s',
                    filter: `drop-shadow(0 0 calc(10px * var(--glow-strength)) ${verdict.c})`,
                  } as React.CSSProperties
                }
              />
              {/* SLA target tick */}
              {(() => {
                const a = Math.PI * (1 - TARGET / 220);
                const x = 130 + 110 * Math.cos(a);
                const y = 138 - 110 * Math.sin(a);
                const x2 = 130 + 92 * Math.cos(a);
                const y2 = 138 - 92 * Math.sin(a);
                return (
                  <line
                    x1={x}
                    y1={y}
                    x2={x2}
                    y2={y2}
                    stroke="var(--text-muted)"
                    strokeWidth="2"
                    strokeDasharray="2 2"
                  />
                );
              })()}
            </svg>
            <div style={{ marginTop: -56, textAlign: 'center' }}>
              <div className="gauge-val" style={{ color: verdict.c }}>
                {projected}
                <span className="gauge-unit"> days</span>
              </div>
              <div style={{ fontSize: 11.5, color: 'var(--text-muted)', marginTop: 4 }}>
                SLA target {TARGET}d · scale 0–220
              </div>
            </div>
          </div>

          <div
            className="verdict"
            style={
              {
                borderColor: `color-mix(in oklab, ${verdict.c} 32%, transparent)`,
                background: `color-mix(in oklab, ${verdict.c} 8%, transparent)`,
              } as React.CSSProperties
            }
          >
            <div
              className="verdict-icon"
              style={
                {
                  background: `color-mix(in oklab, ${verdict.c} 16%, transparent)`,
                  color: verdict.c,
                } as React.CSSProperties
              }
            >
              <VIcon />
            </div>
            <div>
              <div className="verdict-t" style={{ color: verdict.c }}>
                {verdict.t}
              </div>
              <div className="verdict-d">{verdict.d}</div>
            </div>
          </div>

          <div className="breakdown">
            <div className="bk-row">
              <span className="lbl">{country.name} baseline</span>
              <span className="val">{base} d</span>
            </div>
            <div className="bk-row">
              <span className="lbl">Seniority — {SENIORITY[sen]?.k}</span>
              <span
                className="val"
                style={{ color: senDelta >= 0 ? 'var(--amber)' : 'var(--green)' }}
              >
                {senDelta >= 0 ? '+' : ''}
                {Math.round(senDelta)} d
              </span>
            </div>
            <div className="bk-row">
              <span className="lbl">Priority — {PRIORITY[pri]?.k}</span>
              <span
                className="val"
                style={{
                  color:
                    priDelta > 0
                      ? 'var(--amber)'
                      : priDelta < 0
                      ? 'var(--green)'
                      : 'var(--text-muted)',
                }}
              >
                {priDelta >= 0 ? '+' : ''}
                {Math.round(priDelta)} d
              </span>
            </div>
            <div className="bk-row">
              <span className="lbl">
                Sourcing — {rec} recruiter{rec > 1 ? 's' : ''}
              </span>
              <span className="val" style={{ color: recDelta < 0 ? 'var(--green)' : 'var(--text-muted)' }}>
                {Math.round(recDelta)} d
              </span>
            </div>
            <div className="bk-row total">
              <span className="lbl">Projected time to fill</span>
              <span className="val" style={{ color: verdict.c }}>
                {projected} d
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
