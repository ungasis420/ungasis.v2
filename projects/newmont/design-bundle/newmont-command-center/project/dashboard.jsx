/* Dashboard view + KPI card */
const { useState: useStateD } = React;

const SPARKS = {
  reqs:   [12, 14, 13, 16, 15, 18, 17, 19],
  fill:   [68, 69, 71, 70, 72, 71.5, 73, 73.6],
  ttf:    [92, 90, 88, 86, 85, 83, 81, 80.1],
  cancel: [19, 20.5, 20, 21, 20.8, 21.3, 21, 21.1],
  open:   [60, 64, 70, 66, 72, 68, 75, 73],
  hold:   [24, 22, 25, 23, 21, 22, 20, 21],
};

function KpiCard({ k, active }) {
  const I = window.CCIcons[k.icon];
  const Arrow = k.trend.dir === 'up' ? window.CCIcons.arrowUp
              : k.trend.dir === 'down' ? window.CCIcons.arrowDown : window.CCIcons.minus;
  const val = useCountUp(k.value, { decimals: k.decimals || 0, active, duration: 1300 });
  return (
    <div className="card kpi" style={{ '--c': k.color }}>
      <div className="kpi-top">
        <div className="kpi-label">{k.label}</div>
        <div className="kpi-icon"><I/></div>
      </div>
      <div className="kpi-value">{val}{k.suffix}</div>
      <div className="kpi-foot">
        <span className={`kpi-trend ${k.trend.cls}`}><Arrow/>{k.trend.val}</span>
        <span className="kpi-note">{k.note}</span>
      </div>
      <Sparkline points={SPARKS[k.id]} color={k.color}/>
    </div>
  );
}

function DashboardView({ active }) {
  const D = window.CC_DATA;
  return (
    <div className="view">
      <div className="view-intro">
        <div className="view-eyebrow">Executive Overview</div>
        <div className="view-title">Global Recruiting Performance</div>
        <div className="view-desc">Rolling 12-month view across 13 operating countries. Pipeline health, speed-to-fill, and coverage at a glance.</div>
      </div>

      <Stagger className="kpi-grid" active={active}>
        {D.kpis.map((k) => <KpiCard key={k.id} k={k} active={active}/>)}
      </Stagger>

      <div className="charts-row">
        <div className="card">
          <div className="card-head">
            <div>
              <div className="card-title">Time to Fill by Country</div>
              <div className="card-sub">Average days from open to offer accept · dashed line = {D.SLA_TARGET}-day SLA target</div>
            </div>
          </div>
          <BarChart data={D.ttfByCountry} target={D.SLA_TARGET} active={active}/>
        </div>

        <div className="card">
          <div className="card-head">
            <div>
              <div className="card-title">Requisition Status</div>
              <div className="card-sub">Distribution across pipeline</div>
            </div>
          </div>
          <DonutChart data={D.statusDist} total={D.TOTAL} active={active}/>
        </div>
      </div>
    </div>
  );
}

window.DashboardView = DashboardView;
