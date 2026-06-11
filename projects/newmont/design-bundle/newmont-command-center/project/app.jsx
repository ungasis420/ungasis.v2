/* App shell — sidebar, header, routing, tweaks */
const { useState: useStateA, useEffect: useEffectA } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#00d4ff",
  "glass": 55,
  "glow": true,
  "anim": true,
  "density": "comfortable"
}/*EDITMODE-END*/;

const NAV = [
  { id: 'dashboard', label: 'Dashboard',      icon: 'dashboard', count: null },
  { id: 'gaps',      label: 'Field Gaps',     icon: 'gaps',      count: 'gaps' },
  { id: 'sla',       label: 'SLA Calculator', icon: 'calc',      count: null },
  { id: 'reqs',      label: 'Requisitions',   icon: 'reqs',      count: 733 },
  { id: 'hold',      label: 'Hold Analysis',  icon: 'hold',      count: 212 },
];

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [view, setView] = useStateA(() => {
    try { return localStorage.getItem('cc_view') || 'dashboard'; } catch { return 'dashboard'; }
  });
  const [runId, setRunId] = useStateA(0);

  useEffectA(() => { try { localStorage.setItem('cc_view', view); } catch {} }, [view]);

  const go = (id) => {
    if (id === view) { setRunId((r) => r + 1); }
    else { setView(id); setRunId((r) => r + 1); }
    const main = document.querySelector('.main');
    if (main) main.scrollTo({ top: 0 });
  };

  const D = window.CC_DATA;
  const totalGaps = D.countries.reduce((s, c) => s + c.gap, 0);
  const active = t.anim !== false;

  // derived tweak styles
  const glassAlpha = (0.02 + (t.glass / 100) * 0.075).toFixed(3);
  const glassBlur = Math.round(6 + (t.glass / 100) * 22);
  const rootStyle = {
    '--accent': t.accent,
    '--glass-alpha': glassAlpha,
    '--glass-blur': glassBlur + 'px',
  };

  const View = {
    dashboard: window.DashboardView,
    gaps: window.FieldGapsView,
    sla: window.SLACalculatorView,
    reqs: window.RequisitionsView,
    hold: window.HoldAnalysisView,
  }[view];

  const dateStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div className="app" style={rootStyle}
         data-density={t.density === 'compact' ? 'compact' : 'comfortable'}
         data-glow={t.glow ? 'on' : 'off'}
         data-anim={active ? 'on' : 'off'}>

      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark"><window.CCIcons.bolt style={{ width: 18, height: 18 }}/></div>
          <div className="brand-text">
            <div className="brand-title">Command Center</div>
            <div className="brand-sub">NEWMONT × KORN FERRY</div>
          </div>
          <span className="brand-badge">v6.0</span>
        </div>

        <nav className="nav">
          <div className="nav-label">Intelligence</div>
          {NAV.map((n) => {
            const I = window.CCIcons[n.icon];
            const count = n.count === 'gaps' ? totalGaps : n.count;
            return (
              <div key={n.id} className={`nav-item ${view === n.id ? 'active' : ''}`} onClick={() => go(n.id)}>
                <I/>
                <span>{n.label}</span>
                {count != null && <span className="nav-count tnum">{count}</span>}
              </div>
            );
          })}
        </nav>

        <div className="sidebar-foot">
          <div className="avatar" style={{ background: 'linear-gradient(135deg, #0f2044, #0a1a38)', color: 'var(--accent)', fontSize: 10, fontWeight: 800, letterSpacing: '0.04em' }}>KF</div>
          <div className="foot-text">
            <div className="foot-name">Korn Ferry RPO</div>
            <div className="foot-loc"><span className="pulse-dot"/> Manila Delivery Hub</div>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="main">
        <header className="topbar">
          <div>
            <div className="topbar-h1">Newmont <span className="topbar-cross">×</span> Korn Ferry RPO Intelligence Center</div>
            <div className="topbar-sub">
              <span className="chip">CW162992</span><span className="dot-sep"/>
              <span className="chip">13 Countries</span><span className="dot-sep"/>
              <span>Costa Rica Operations</span>
            </div>
          </div>
          <div className="topbar-right">
            <div className="live-badge"><span className="pulse-dot"/> LIVE DATA</div>
            <div className="topbar-meta">
              <div className="lbl">Reporting Period</div>
              <div className="val">Updated {dateStr}</div>
            </div>
          </div>
        </header>

        <div key={view + '-' + runId}>
          <View active={active}/>
        </div>
      </main>

      {/* TWEAKS */}
      <TweaksPanel>
        <TweakSection label="Accent" />
        <TweakColor label="Accent color" value={t.accent}
          options={['#00d4ff', '#3b82f6', '#a78bfa', '#22d3a7']}
          onChange={(v) => setTweak('accent', v)} />
        <TweakSection label="Surface" />
        <TweakSlider label="Glass intensity" value={t.glass} min={0} max={100} unit="%"
          onChange={(v) => setTweak('glass', v)} />
        <TweakRadio label="Density" value={t.density} options={['comfortable', 'compact']}
          onChange={(v) => setTweak('density', v)} />
        <TweakSection label="Effects" />
        <TweakToggle label="Neon glow" value={t.glow} onChange={(v) => setTweak('glow', v)} />
        <TweakToggle label="Entrance animation" value={t.anim} onChange={(v) => setTweak('anim', v)} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
