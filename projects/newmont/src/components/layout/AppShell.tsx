'use client';

import React, { useEffect } from 'react';
import { useDashboardStore } from '@/stores/dashboard';
import { realData } from '@/lib/real-data';
import { CCIcons } from '@/components/Icons';
import {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakColor,
  TweakSlider,
  TweakRadio,
  TweakToggle,
  TweakState,
} from '@/components/TweaksPanel';

const TWEAK_DEFAULTS: TweakState = {
  accent: '#00d4ff',
  glass: 55,
  glow: true,
  anim: true,
  density: 'comfortable',
};

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const activeModule = useDashboardStore((state) => state.activeModule);
  const setActiveModule = useDashboardStore((state) => state.setActiveModule);
  const requisitions = useDashboardStore((state) => state.requisitions);

  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // derived tweak styles
  const glassAlpha = (0.02 + (t.glass / 100) * 0.075).toFixed(3);
  const glassBlur = Math.round(6 + (t.glass / 100) * 22);
  const rootStyle = {
    '--accent': t.accent,
    '--glass-alpha': glassAlpha,
    '--glass-blur': glassBlur + 'px',
  } as React.CSSProperties;

  const active = t.anim !== false;

  // Sync active view to CC_DATA or localstorage for consistency if needed
  useEffect(() => {
    try {
      localStorage.setItem('cc_view', activeModule);
    } catch {}
  }, [activeModule]);

  // Derived counts from store or fallback to real-data
  const totalReqs = requisitions.length > 0 ? requisitions.length : realData.totalRequisitions;
  const openCount = requisitions.length > 0
    ? requisitions.filter(r => r.requisitionStatus === 'Open').length
    : realData.statusDistribution.open;
  const holdCount = requisitions.length > 0
    ? requisitions.filter(r => r.requisitionStatus === 'On Hold').length
    : realData.statusDistribution.onHold;
  const NAV = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' as const, count: null },
    { id: 'candidates', label: 'Candidate Pipeline', icon: 'layers' as const, count: null },
    { id: 'sla', label: 'SLA Calculator', icon: 'calc' as const, count: null },
    { id: 'slareport', label: 'SLA Reportability', icon: 'clock' as const, count: null },
    { id: 'requisitions', label: 'Requisitions', icon: 'reqs' as const, count: openCount },
    { id: 'holds', label: 'Hold Analysis', icon: 'hold' as const, count: holdCount },
  ];

  const dateStr = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div
      className="app font-sans"
      style={rootStyle}
      data-density={t.density === 'compact' ? 'compact' : 'comfortable'}
      data-glow={t.glow ? 'on' : 'off'}
      data-anim={active ? 'on' : 'off'}
    >
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">
            <CCIcons.bolt style={{ width: 18, height: 18 }} />
          </div>
          <div className="brand-text">
            <div className="brand-title">Command Center</div>
            <div className="brand-sub">NEWMONT × KORN FERRY</div>
          </div>
          <span className="brand-badge">v6.0</span>
        </div>

        <nav className="nav">
          <div className="nav-label">Intelligence</div>
          {NAV.map((n) => {
            const I = CCIcons[n.icon];
            const isActive = activeModule === n.id;
            return (
              <div
                key={n.id}
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={() => setActiveModule(n.id)}
              >
                <I />
                <span>{n.label}</span>
                {n.count != null && <span className="nav-count tnum">{n.count}</span>}
              </div>
            );
          })}
        </nav>

        <div className="sidebar-foot">
          <div
            className="avatar"
            style={{
              background: 'linear-gradient(135deg, #0f2044, #0a1a38)',
              color: 'var(--accent)',
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: '0.04em',
            }}
          >
            KF
          </div>
          <div className="foot-text">
            <div className="foot-name">Korn Ferry RPO</div>
            <div className="foot-loc">
              <span className="pulse-dot" /> Manila Delivery Hub
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="main">
        <header className="topbar">
          <div>
            <div className="topbar-h1">
              Newmont <span className="topbar-cross">×</span> Korn Ferry RPO Intelligence Center
            </div>
            <div className="topbar-sub">
              <span className="chip">CW162992</span>
              <span className="dot-sep" />
              <span className="chip">13 Countries</span>
              <span className="dot-sep" />
              <span>Costa Rica Operations</span>
            </div>
          </div>
          <div className="topbar-right">
            <div className="live-badge">
              <span className="pulse-dot" /> LIVE DATA
            </div>
            <div className="topbar-meta">
              <div className="lbl">Reporting Period</div>
              <div className="val">Updated {dateStr}</div>
            </div>
          </div>
        </header>

        <div className="w-full">
          {children}
        </div>

        <footer
          style={{
            fontSize: 11,
            color: 'rgba(255,255,255,0.3)',
            textAlign: 'center',
            padding: 16,
          }}
        >
          Newmont Intelligence Command Center v6.8 · Data as of {dateStr}
        </footer>
      </main>

      {/* TWEAKS */}
      <TweaksPanel>
        <TweakSection label="Accent" />
        <TweakColor
          label="Accent color"
          value={t.accent}
          options={['#00d4ff', '#3b82f6', '#a78bfa', '#22d3a7']}
          onChange={(v) => setTweak('accent', v)}
        />
        <TweakSection label="Surface" />
        <TweakSlider
          label="Glass intensity"
          value={t.glass}
          min={0}
          max={100}
          unit="%"
          onChange={(v) => setTweak('glass', v)}
        />
        <TweakRadio
          label="Density"
          value={t.density}
          options={['comfortable', 'compact']}
          onChange={(v) => setTweak('density', v)}
        />
        <TweakSection label="Effects" />
        <TweakToggle label="Neon glow" value={t.glow} onChange={(v) => setTweak('glow', v)} />
        <TweakToggle label="Entrance animation" value={t.anim} onChange={(v) => setTweak('anim', v)} />
      </TweaksPanel>
    </div>
  );
}
