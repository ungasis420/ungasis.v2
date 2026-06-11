/* Field Gaps, Requisitions, Hold Analysis views */
const { useState: useStateV, useMemo } = React;

function heatColor(v) {
  if (v >= 85) return { c: 'var(--green)', a: 0.20 };
  if (v >= 72) return { c: 'var(--accent)', a: 0.18 };
  if (v >= 58) return { c: 'var(--amber)', a: 0.20 };
  return { c: 'var(--red)', a: 0.22 };
}

/* ============== FIELD GAPS ============== */
function FieldGapsView({ active }) {
  const D = window.CC_DATA;
  const tt = useTooltip();
  const avgCov = Math.round(D.countries.reduce((s, c) => s + c.coverage, 0) / D.countries.length);
  const totalGap = D.countries.reduce((s, c) => s + c.gap, 0);
  const worst = [...D.countries].sort((a, b) => a.coverage - b.coverage)[0];
  const sorted = [...D.countries].sort((a, b) => a.coverage - b.coverage);
  return (
    <div className="view" onMouseMove={tt.move}>
      <div className="view-intro">
        <div className="view-eyebrow">Coverage Intelligence</div>
        <div className="view-title">Field Gaps & Sourcing Coverage</div>
        <div className="view-desc">Where demand is outrunning supply. Coverage is the share of active demand currently sourced; critical gaps are unfilled priority roles.</div>
      </div>

      <Stagger className="stat-strip" active={active}>
        <div className="stat"><div className="stat-lbl">Countries Covered</div><div className="stat-val">13</div><div className="stat-note">All operating regions live</div></div>
        <div className="stat"><div className="stat-lbl">Avg Coverage</div><div className="stat-val" style={{ color: 'var(--accent)' }}>{avgCov}%</div><div className="stat-note">demand sourced</div></div>
        <div className="stat"><div className="stat-lbl">Critical Gaps</div><div className="stat-val" style={{ color: 'var(--red)' }}>{totalGap}</div><div className="stat-note">priority roles unfilled</div></div>
        <div className="stat"><div className="stat-lbl">Lowest Coverage</div><div className="stat-val" style={{ color: 'var(--amber)' }}>{worst.coverage}%</div><div className="stat-note">{worst.country}</div></div>
      </Stagger>

      <div className="card" style={{ padding: '20px 22px 24px', marginBottom: 'var(--gap)' }}>
        <div style={{ marginBottom: 16 }}>
          <div className="card-title">Coverage Heatmap — Job Family × Region</div>
          <div className="card-sub">% of demand sourced. Hover a cell for detail.</div>
        </div>
        <table className="heat">
          <thead>
            <tr>
              <th className="rowhead"></th>
              {D.heatRegions.map((r) => <th key={r}>{r}</th>)}
            </tr>
          </thead>
          <tbody>
            {D.heat.map((row) => (
              <tr key={row.family}>
                <td className="rowhead">{row.family}</td>
                {row.cells.map((v, j) => {
                  const hc = heatColor(v);
                  return (
                    <td key={j} style={{ padding: 0 }}>
                      <div className="heat-cell"
                           style={{ background: `color-mix(in oklab, ${hc.c} ${hc.a * 100}%, transparent)`, color: hc.c, borderColor: `color-mix(in oklab, ${hc.c} 30%, transparent)` }}
                           onMouseEnter={(e) => tt.show(e, (
                             <>
                               <div className="tooltip-t">{row.family}</div>
                               <div className="tooltip-r"><span>{D.heatRegions[j]}</span><b style={{ color: hc.c }}>{v}%</b></div>
                               <div className="tooltip-r"><span>Status</span><b>{v >= 85 ? 'Healthy' : v >= 72 ? 'Stable' : v >= 58 ? 'At risk' : 'Critical'}</b></div>
                             </>
                           ))}
                           onMouseLeave={tt.hide}>
                        {v}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ display: 'flex', gap: 18, marginTop: 16, fontSize: 11.5, color: 'var(--text-muted)', flexWrap: 'wrap' }}>
          {[['var(--green)','Healthy ≥85'],['var(--accent)','Stable 72–84'],['var(--amber)','At risk 58–71'],['var(--red)','Critical <58']].map(([c, l]) => (
            <span key={l} style={{ display: 'flex', alignItems: 'center', gap: 7 }}><span className="legend-swatch" style={{ background: c }}/>{l}</span>
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
              <div key={c.country} style={{ display: 'grid', gridTemplateColumns: '180px 1fr 120px', gap: 16, alignItems: 'center', padding: '11px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <div style={{ fontSize: 13, fontWeight: 600, display: 'flex', gap: 9, alignItems: 'center' }}><Code name={c.country}/>{c.country}</div>
                <div className="meter" style={{ height: 9 }}>
                  <span style={{ width: `${c.coverage}%`, background: hc.c, boxShadow: `0 0 calc(12px * var(--glow-strength)) ${hc.c}` }}/>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 14, fontSize: 12.5, fontVariantNumeric: 'tabular-nums' }}>
                  <span style={{ fontWeight: 700, color: hc.c, minWidth: 38, textAlign: 'right' }}>{c.coverage}%</span>
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
function RequisitionsView() {
  const D = window.CC_DATA;
  const [q, setQ] = useStateV('');
  const [filter, setFilter] = useStateV('All');
  const [sort, setSort] = useStateV({ key: 'days', dir: -1 });
  const filters = ['All', 'Open', 'Filled', 'On Hold', 'Cancelled'];
  const rows = useMemo(() => {
    let r = D.reqRows.filter((x) =>
      (filter === 'All' || x.status === filter) &&
      (q === '' || (x.title + x.country + x.id + x.recruiter).toLowerCase().includes(q.toLowerCase()))
    );
    const { key, dir } = sort;
    r = [...r].sort((a, b) => {
      const av = a[key], bv = b[key];
      if (typeof av === 'number') return (av - bv) * dir;
      return String(av).localeCompare(String(bv)) * dir;
    });
    return r;
  }, [q, filter, sort]);
  const th = (key, label, num) => (
    <th className={num ? 'num' : ''} onClick={() => setSort((s) => ({ key, dir: s.key === key ? -s.dir : (num ? -1 : 1) }))}>
      {label}{sort.key === key ? (sort.dir === 1 ? ' ↑' : ' ↓') : ''}
    </th>
  );
  return (
    <div className="view">
      <div className="view-intro">
        <div className="view-eyebrow">Live Pipeline</div>
        <div className="view-title">Requisitions</div>
        <div className="view-desc">Active and recent requisitions across all regions. Search, filter, and sort to drill into any role.</div>
      </div>

      <div className="toolbar">
        <div className="search">
          <window.CCIcons.search/>
          <input placeholder="Search role, country, recruiter, ID…" value={q} onChange={(e) => setQ(e.target.value)}/>
        </div>
        <div className="seg">
          {filters.map((f) => <button key={f} className={filter === f ? 'on' : ''} onClick={() => setFilter(f)}>{f}</button>)}
        </div>
        <div style={{ marginLeft: 'auto', fontSize: 12.5, color: 'var(--text-muted)', fontWeight: 600 }}>{rows.length} of {D.reqRows.length}</div>
      </div>

      <div className="card" style={{ overflow: 'hidden' }}>
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
                <td><span className="req-id">{r.id}</span></td>
                <td><span className="req-title">{r.title}</span></td>
                <td className="cell-muted"><span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><Code name={r.country}/>{r.country}</span></td>
                <td><span className={`badge ${r.statusCls}`}>{r.status}</span></td>
                <td className="num" style={{ fontWeight: 600, color: r.days > 120 ? 'var(--red)' : r.days > 75 ? 'var(--amber)' : 'var(--text)' }}>{r.days}</td>
                <td className="cell-muted">{r.recruiter}</td>
                <td><span className={`badge ${r.prioCls}`}>{r.prio}</span></td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr><td colSpan="7" style={{ textAlign: 'center', color: 'var(--text-dim)', padding: '40px' }}>No requisitions match your filters.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ============== HOLD ANALYSIS ============== */
function HoldAnalysisView({ active }) {
  const D = window.CC_DATA;
  const over90 = D.holdAging.find((b) => b.bucket === '90+ days').count;
  return (
    <div className="view">
      <div className="view-intro">
        <div className="view-eyebrow">Risk & Recovery</div>
        <div className="view-title">Hold Analysis</div>
        <div className="view-desc">212 requisitions are on hold — why, for how long, and where. Aged holds are the fastest path to reactivated pipeline.</div>
      </div>

      <Stagger className="stat-strip" active={active}>
        <div className="stat"><div className="stat-lbl">Total On Hold</div><div className="stat-val" style={{ color: 'var(--amber)' }}>212</div><div className="stat-note">1.1% of all reqs</div></div>
        <div className="stat"><div className="stat-lbl">Aged 90+ Days</div><div className="stat-val" style={{ color: 'var(--red)' }}>{over90}</div><div className="stat-note">priority to resolve</div></div>
        <div className="stat"><div className="stat-lbl">Avg Hold Duration</div><div className="stat-val">52 <span style={{ fontSize: 15, color: 'var(--text-muted)' }}>days</span></div><div className="stat-note">across active holds</div></div>
        <div className="stat"><div className="stat-lbl">Reactivation Rate</div><div className="stat-val" style={{ color: 'var(--green)' }}>61%</div><div className="stat-note">holds resumed in 90d</div></div>
      </Stagger>

      <div className="two-col">
        <div className="card" style={{ padding: '20px 22px 24px' }}>
          <div style={{ marginBottom: 18 }}><div className="card-title">Reason for Hold</div><div className="card-sub">Root cause across 212 held reqs</div></div>
          <MiniBars data={D.holdReasons} active={active}/>
        </div>
        <div className="card" style={{ padding: '20px 22px 24px' }}>
          <div style={{ marginBottom: 18 }}><div className="card-title">Hold Aging</div><div className="card-sub">Time elapsed since hold applied</div></div>
          <MiniBars data={D.holdAging} active={active}/>
        </div>
      </div>

      <div className="card mt" style={{ padding: '20px 22px 24px' }}>
        <div style={{ marginBottom: 18 }}><div className="card-title">Holds by Country</div><div className="card-sub">Concentration of held requisitions</div></div>
        <MiniBars data={D.holdByCountry} active={active}/>
      </div>

      <div className="card mt verdict" style={{ borderColor: 'color-mix(in oklab, var(--amber) 30%, transparent)', background: 'color-mix(in oklab, var(--amber) 7%, transparent)' }}>
        <div className="verdict-icon" style={{ background: 'color-mix(in oklab, var(--amber) 16%, transparent)', color: 'var(--amber)' }}><window.CCIcons.warn/></div>
        <div>
          <div className="verdict-t">{over90} requisitions have been held 90+ days</div>
          <div className="verdict-d">Concentrated in Chile and PNG. Recommend a hiring-manager re-confirmation sweep — historical reactivation on this cohort runs ~61%, recovering an estimated 18 fills this quarter.</div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { FieldGapsView, RequisitionsView, HoldAnalysisView });
