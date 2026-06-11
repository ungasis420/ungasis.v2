/* Charts & animated primitives. Exports: useCountUp, Sparkline, BarChart, DonutChart, MiniBars */
const { useState, useEffect, useRef } = React;

/* ---- count-up hook (timer-based so it survives throttled rAF / captures) ---- */
function useCountUp(target, { decimals = 0, duration = 1200, active = true, start = 0 } = {}) {
  const [val, setVal] = useState(active ? start : target);
  useEffect(() => {
    if (!active) { setVal(target); return; }
    const t0 = Date.now();
    const ease = (x) => 1 - Math.pow(1 - x, 3);
    setVal(start);
    const id = setInterval(() => {
      const p = Math.min(1, (Date.now() - t0) / duration);
      setVal(start + (target - start) * ease(p));
      if (p >= 1) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [target, active]);
  const f = Number(val).toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  return f;
}

/* ---- staggered entrance wrapper: hides children then reveals via transition.
   End-state is the resting (visible) style, so frozen timelines degrade to visible. ---- */
function Stagger({ className = '', children, active = true, tag = 'div', style }) {
  const [pre, setPre] = useState(active);
  useEffect(() => {
    if (!active) { setPre(false); return; }
    setPre(true);
    const t = setTimeout(() => setPre(false), 40);
    return () => clearTimeout(t);
  }, [active]);
  return React.createElement(tag, { className: `stagger ${pre ? 'pre' : ''} ${className}`.trim(), style }, children);
}

/* ---- tooltip controller (shared) ---- */
function useTooltip() {
  const [tip, setTip] = useState(null);
  const show = (e, content) => {
    setTip({ x: e.clientX, y: e.clientY, content });
  };
  const move = (e) => setTip((t) => t ? { ...t, x: e.clientX, y: e.clientY } : t);
  const hide = () => setTip(null);
  const node = tip ? (
    <div className="tooltip show" style={{ left: tip.x, top: tip.y }}>{tip.content}</div>
  ) : null;
  return { show, move, hide, node };
}

/* ---- sparkline ---- */
function Sparkline({ points, color, w = 64, h = 24 }) {
  const max = Math.max(...points), min = Math.min(...points);
  const rng = max - min || 1;
  const d = points.map((p, i) => {
    const x = (i / (points.length - 1)) * w;
    const y = h - ((p - min) / rng) * (h - 4) - 2;
    return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(' ');
  const last = points[points.length - 1], lx = w, ly = h - ((last - min) / rng) * (h - 4) - 2;
  return (
    <svg className="kpi-spark" width={w} height={h} fill="none">
      <path d={d} stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.85"/>
      <circle cx={lx} cy={ly} r="2.2" fill={color}/>
    </svg>
  );
}

/* ---- horizontal bar chart ---- */
function BarChart({ data, target, active }) {
  const [mounted, setMounted] = useState(false);
  const tt = useTooltip();
  const max = Math.max(...data.map(d => d.days)) * 1.05;
  useEffect(() => {
    if (!active) { setMounted(true); return; }
    const t = setTimeout(() => setMounted(true), 120);
    return () => clearTimeout(t);
  }, [active]);
  const cls = (d) => d.days > target * 1.6 ? 'over' : d.days > target ? 'warn' : '';
  return (
    <div className="bars" onMouseMove={tt.move} onMouseLeave={tt.hide}>
      {data.map((d) => (
        <div className="bar-row" key={d.country}
             onMouseEnter={(e) => tt.show(e, (
               <>
                 <div className="tooltip-t"><Code name={d.country}/>{d.country}</div>
                 <div className="tooltip-r"><span>Time to fill</span><b>{d.days} days</b></div>
                 <div className="tooltip-r"><span>vs. SLA ({target}d)</span><b style={{ color: d.days > target ? 'var(--red)' : 'var(--green)' }}>{d.days > target ? '+' : ''}{d.days - target}d</b></div>
                 <div className="tooltip-r"><span>Open reqs</span><b>{d.open}</b></div>
               </>
             ))}>
          <div className="bar-country"><Code name={d.country}/>{d.country}</div>
          <div className="bar-track">
            <div className="bar-target" style={{ left: `${(target / max) * 100}%` }} title="SLA target"/>
            <div className={`bar-fill ${cls(d)}`} style={{ width: mounted ? `${(d.days / max) * 100}%` : 0 }}/>
          </div>
          <div className="bar-val">{d.days}<small> d</small></div>
        </div>
      ))}
      {tt.node}
    </div>
  );
}

/* ---- donut chart ---- */
function DonutChart({ data, total, active }) {
  const [mounted, setMounted] = useState(false);
  const [hover, setHover] = useState(null);
  const tt = useTooltip();
  const R = 80, C = 2 * Math.PI * R, GAP = 2.2;
  useEffect(() => {
    if (!active) { setMounted(true); return; }
    const t = setTimeout(() => setMounted(true), 150);
    return () => clearTimeout(t);
  }, [active]);
  let offset = 0;
  const segs = data.map((d, i) => {
    const len = (d.pct / 100) * C;
    const seg = { ...d, dash: Math.max(0, len - GAP), gap: C - Math.max(0, len - GAP), rot: (offset / C) * 360 };
    offset += len;
    return seg;
  });
  const centerTotal = useCountUp(total, { active, duration: 1400 });
  return (
    <div className="donut-wrap" onMouseMove={tt.move} onMouseLeave={() => { tt.hide(); setHover(null); }}>
      <div className="donut">
        <svg width="210" height="210" viewBox="0 0 210 210">
          <circle cx="105" cy="105" r={R} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="22"/>
          {segs.map((s, i) => (
            <circle key={s.name} className="donut-seg"
              cx="105" cy="105" r={R} fill="none"
              stroke={s.color} strokeWidth={hover === i ? 26 : 22} strokeLinecap="butt"
              strokeDasharray={`${mounted ? s.dash : 0} ${mounted ? s.gap : C}`}
              strokeDashoffset={-(s.rot / 360) * C}
              style={{ opacity: hover === null || hover === i ? 1 : 0.35 }}
              onMouseEnter={(e) => { setHover(i); tt.show(e, (
                <>
                  <div className="tooltip-t"><span className="legend-swatch" style={{ background: s.color }}/>{s.name}</div>
                  <div className="tooltip-r"><span>Share</span><b>{s.pct}%</b></div>
                  <div className="tooltip-r"><span>Count</span><b>{s.count.toLocaleString()}</b></div>
                </>
              )); }}
            />
          ))}
        </svg>
        <div className="donut-center">
          <div>
            <div className="donut-total tnum">{centerTotal}</div>
            <div className="donut-total-lbl">Total Reqs</div>
          </div>
        </div>
      </div>
      <div className="legend">
        {data.map((d, i) => (
          <div key={d.name} className={`legend-item ${hover !== null && hover !== i ? 'dim' : ''}`}
               onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
            <span className="legend-swatch" style={{ background: d.color }}/>
            <span className="legend-name">{d.name}</span>
            <span className="legend-val" style={{ color: d.color }}>{d.pct}%</span>
          </div>
        ))}
      </div>
      {tt.node}
    </div>
  );
}

/* ---- country code chip (renders consistently everywhere, unlike flag emoji) ---- */
const CCODE = {
  'Costa Rica': 'CRI', 'Ghana': 'GHA', 'Papua New Guinea': 'PNG', 'Suriname': 'SUR',
  'Chile': 'CHL', 'United States': 'USA', 'Canada': 'CAN', 'Mexico': 'MEX',
  'Dominican Rep.': 'DOM', 'Australia': 'AUS', 'Peru': 'PER', 'Argentina': 'ARG',
  'Ecuador': 'ECU', 'Other (8)': 'INT',
};
function Code({ name }) {
  return <span className="ccode">{CCODE[name] || name.slice(0, 3).toUpperCase()}</span>;
}

/* ---- mini horizontal bars (reusable for hold analysis etc) ---- */
function MiniBars({ data, active, fmt }) {
  const [mounted, setMounted] = useState(false);
  const max = Math.max(...data.map(d => d.count));
  useEffect(() => {
    if (!active) { setMounted(true); return; }
    const t = setTimeout(() => setMounted(true), 120);
    return () => clearTimeout(t);
  }, [active]);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
      {data.map((d) => (
        <div key={d.reason || d.bucket || d.country} style={{ display: 'grid', gridTemplateColumns: '1fr 44px', gap: 12, alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, marginBottom: 6, alignItems: 'center', gap: 8 }}>
              <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 8 }}>{d.country ? <Code name={d.country}/> : null}{d.reason || d.bucket || d.country}</span>
            </div>
            <div className="meter">
              <span style={{ width: mounted ? `${(d.count / max) * 100}%` : 0, background: d.color || 'var(--accent)',
                             boxShadow: `0 0 calc(12px * var(--glow-strength)) ${d.color || 'var(--accent)'}` }}/>
            </div>
          </div>
          <div style={{ fontWeight: 700, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{fmt ? fmt(d.count) : d.count}</div>
        </div>
      ))}
    </div>
  );
}

Object.assign(window, { useCountUp, useTooltip, Stagger, Code, Sparkline, BarChart, DonutChart, MiniBars });
