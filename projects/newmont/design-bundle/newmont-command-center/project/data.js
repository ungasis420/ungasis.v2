/* Newmont Command Center — shared data model (window.CC_DATA) */
window.CC_DATA = (function () {
  const TOTAL = 19292;

  // headline KPIs (source of truth from brief)
  const kpis = [
    { id: 'reqs',  label: 'Total Requisitions', value: 19292, suffix: '', color: 'var(--accent)', icon: 'layers',
      trend: { dir: 'up', val: '+8.4%', cls: 'trend-up' }, note: 'vs. prior 12 mo' },
    { id: 'fill',  label: 'Fill Rate', value: 73.6, suffix: '%', decimals: 1, color: 'var(--green)', icon: 'target',
      trend: { dir: 'up', val: '+2.1 pts', cls: 'trend-up' }, note: 'rolling 90-day' },
    { id: 'ttf',   label: 'Avg Time to Fill', value: 80.1, suffix: ' days', decimals: 1, color: 'var(--amber)', icon: 'clock',
      trend: { dir: 'down', val: '−6.3 days', cls: 'trend-good-down' }, note: 'improving' },
    { id: 'cancel',label: 'Cancel Rate', value: 21.1, suffix: '%', decimals: 1, color: 'var(--red)', icon: 'alert',
      trend: { dir: 'flat', val: '+0.4 pts', cls: 'trend-warn' }, note: 'watch — above target' },
    { id: 'open',  label: 'Open Reqs', value: 733, suffix: '', color: 'var(--purple)', icon: 'folder',
      trend: { dir: 'flat', val: '733 active', cls: 'trend-flat' }, note: '3.8% of pipeline' },
    { id: 'hold',  label: 'On Hold', value: 212, suffix: '', color: 'var(--gray)', icon: 'pause',
      trend: { dir: 'flat', val: '1.1% of total', cls: 'trend-flat' }, note: 'see Hold Analysis' },
  ];

  // time to fill by country (days). target SLA = 75 days
  const ttfByCountry = [
    { country: 'Costa Rica',      flag: '🇨🇷', days: 46,  open: 84  },
    { country: 'Ghana',           flag: '🇬🇭', days: 59,  open: 71  },
    { country: 'Papua New Guinea',flag: '🇵🇬', days: 105, open: 96  },
    { country: 'Suriname',        flag: '🇸🇷', days: 148, open: 58  },
    { country: 'Chile',           flag: '🇨🇱', days: 190, open: 113 },
  ];
  const SLA_TARGET = 75;

  // status distribution (donut)
  const statusDist = [
    { name: 'Filled',    pct: 73.6, count: 14199, color: 'var(--green)' },
    { name: 'Cancelled', pct: 21.1, count: 4071,  color: 'var(--red)' },
    { name: 'Open',      pct: 3.8,  count: 733,   color: 'var(--accent)' },
    { name: 'On Hold',   pct: 1.1,  count: 212,   color: 'var(--amber)' },
  ];

  // 13 countries — coverage / field gap data
  // coverage = % of demand currently sourced; gap = critical open roles
  const countries = [
    { country: 'Costa Rica',       flag: '🇨🇷', ttf: 46,  open: 84,  coverage: 96, gap: 3  },
    { country: 'Ghana',            flag: '🇬🇭', ttf: 59,  open: 71,  coverage: 88, gap: 6  },
    { country: 'United States',    flag: '🇺🇸', ttf: 62,  open: 92,  coverage: 91, gap: 5  },
    { country: 'Canada',           flag: '🇨🇦', ttf: 68,  open: 47,  coverage: 89, gap: 4  },
    { country: 'Mexico',           flag: '🇲🇽', ttf: 71,  open: 39,  coverage: 84, gap: 7  },
    { country: 'Dominican Rep.',   flag: '🇩🇴', ttf: 74,  open: 21,  coverage: 82, gap: 3  },
    { country: 'Australia',        flag: '🇦🇺', ttf: 88,  open: 64,  coverage: 79, gap: 9  },
    { country: 'Peru',             flag: '🇵🇪', ttf: 96,  open: 55,  coverage: 74, gap: 11 },
    { country: 'Papua New Guinea', flag: '🇵🇬', ttf: 105, open: 96,  coverage: 68, gap: 18 },
    { country: 'Argentina',        flag: '🇦🇷', ttf: 119, open: 43,  coverage: 71, gap: 8  },
    { country: 'Ecuador',          flag: '🇪🇨', ttf: 134, open: 29,  coverage: 64, gap: 10 },
    { country: 'Suriname',         flag: '🇸🇷', ttf: 148, open: 58,  coverage: 61, gap: 14 },
    { country: 'Chile',            flag: '🇨🇱', ttf: 190, open: 113, coverage: 54, gap: 27 },
  ];

  // job families for field-gap heatmap (coverage % per family per region tier)
  const families = ['Mining Ops', 'Process Plant', 'Maintenance', 'Geology & Exploration', 'HSE', 'Supply Chain', 'Finance & Admin'];
  // heatmap rows = families, cols = 6 representative regions
  const heatRegions = ['Costa Rica', 'Ghana', 'Australia', 'Peru', 'Suriname', 'Chile'];
  function seedCov(base, i, j) {
    const v = base - i * 4 - j * 3 + ((i * 7 + j * 13) % 9) - 4;
    return Math.max(38, Math.min(99, v));
  }
  const heat = families.map((fam, i) => ({
    family: fam,
    cells: heatRegions.map((reg, j) => seedCov(94, i, j)),
  }));

  // SLA calculator base days per country
  const slaCountries = countries.map(c => ({ name: c.country, flag: c.flag, base: c.ttf }));

  // requisitions table (representative sample)
  const recruiters = ['M. Reyes', 'A. Okafor', 'R. Tanaka', 'C. Mendoza', 'S. Patel', 'L. Nguyen', 'D. Brooks', 'F. Asante'];
  const titles = [
    'Senior Mining Engineer', 'Process Plant Operator', 'Heavy Equipment Mechanic', 'Exploration Geologist',
    'HSE Coordinator', 'Metallurgist', 'Electrical Supervisor', 'Mine Planning Engineer',
    'Supply Chain Analyst', 'Drill & Blast Engineer', 'Environmental Specialist', 'Maintenance Planner',
    'Geotechnical Engineer', 'Fixed Plant Technician', 'Procurement Lead', 'Mobile Maintenance Lead',
    'Tailings Engineer', 'Control Room Operator', 'Surveyor', 'Reliability Engineer',
  ];
  const statuses = [
    { s: 'Open', cls: 'b-open' }, { s: 'Open', cls: 'b-open' }, { s: 'Filled', cls: 'b-filled' },
    { s: 'On Hold', cls: 'b-hold' }, { s: 'Cancelled', cls: 'b-cancelled' }, { s: 'Filled', cls: 'b-filled' },
  ];
  const prios = [
    { s: 'Critical', cls: 'b-crit' }, { s: 'High', cls: 'b-high' }, { s: 'Medium', cls: 'b-med' }, { s: 'Low', cls: 'b-low' },
  ];
  const reqRows = [];
  let rngState = 7;
  const rng = () => (rngState = (rngState * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
  for (let i = 0; i < 24; i++) {
    const c = countries[Math.floor(rng() * countries.length)];
    const st = statuses[Math.floor(rng() * statuses.length)];
    const pr = prios[Math.floor(rng() * prios.length)];
    const days = st.s === 'Filled' ? Math.round(c.ttf * (0.7 + rng() * 0.5))
                : Math.round(20 + rng() * (c.ttf + 30));
    reqRows.push({
      id: 'REQ-' + (84210 + i * 37),
      title: titles[i % titles.length],
      country: c.country, flag: c.flag,
      status: st.s, statusCls: st.cls,
      days,
      recruiter: recruiters[Math.floor(rng() * recruiters.length)],
      prio: pr.s, prioCls: pr.cls,
    });
  }

  // hold analysis
  const holdReasons = [
    { reason: 'Budget freeze / approval pending', count: 78, color: 'var(--amber)' },
    { reason: 'Hiring manager unavailable',       count: 49, color: 'var(--accent)' },
    { reason: 'Org restructure',                  count: 37, color: 'var(--purple)' },
    { reason: 'Role scope under review',          count: 28, color: 'var(--green)' },
    { reason: 'Visa / mobilization blocked',      count: 20, color: 'var(--red)' },
  ];
  const holdAging = [
    { bucket: '0–30 days',  count: 64,  color: 'var(--green)' },
    { bucket: '31–60 days', count: 71,  color: 'var(--accent)' },
    { bucket: '61–90 days', count: 48,  color: 'var(--amber)' },
    { bucket: '90+ days',   count: 29,  color: 'var(--red)' },
  ];
  const holdByCountry = [
    { country: 'Chile',            flag: '🇨🇱', count: 58 },
    { country: 'Papua New Guinea', flag: '🇵🇬', count: 41 },
    { country: 'Suriname',         flag: '🇸🇷', count: 33 },
    { country: 'Peru',             flag: '🇵🇪', count: 27 },
    { country: 'Australia',        flag: '🇦🇺', count: 22 },
    { country: 'Other (8)',        flag: '🌐', count: 31 },
  ];

  return {
    TOTAL, SLA_TARGET, kpis, ttfByCountry, statusDist, countries,
    families, heatRegions, heat, slaCountries, reqRows,
    holdReasons, holdAging, holdByCountry,
  };
})();
