'use client';

import React from 'react';

interface CalculableSLA {
  name: string;
  formula: string;
  value: string;
  status: string;
}

interface BlockedSLA {
  name: string;
  missingField: string;
  reason: string;
}

const calculableSlas: CalculableSLA[] = [
  {
    name: 'Time to Fill',
    formula: 'Closed Date - Approved Date',
    value: '80.1 days (avg)',
    status: 'Ready',
  },
  {
    name: 'Fill Rate',
    formula: 'Filled / Total Requisitions',
    value: '73.6%',
    status: 'Ready',
  },
  {
    name: 'Cancel Rate',
    formula: 'Cancelled / Total Requisitions',
    value: '21.1%',
    status: 'Ready',
  },
  {
    name: 'Hold Duration',
    formula: 'UnFreeze Date - Freeze Date',
    value: '14.5 days (avg)',
    status: 'Ready',
  },
];

const blockedSlas: BlockedSLA[] = [
  { name: 'Time to Assign', missingField: 'Intake Meeting Date', reason: 'Requires intake date to calculate start of Recruiter assignment.' },
  { name: 'Time to Advertise', missingField: 'KF Assigned Date', reason: 'Korn Ferry assignment date is missing.' },
  { name: 'Time to Brief', missingField: 'Intake Meeting Date', reason: 'Intake meeting date is required to track briefing latency.' },
  { name: 'Time to Shortlist', missingField: 'Req Shortlist Date', reason: 'Shortlist submission date is omitted in data exports.' },
  { name: 'Time to Interview', missingField: 'KF Assigned Date', reason: 'KF assignment date is needed to calculate time to interview.' },
  { name: 'Time to Screen BGC', missingField: 'Bgr Check dates', reason: 'Background check initiate/complete dates are not available.' },
  { name: 'Time to Offer', missingField: 'Verbal Offer Date', reason: 'Verbal offer extended date is missing.' },
  { name: 'Offer Acceptance Rate', missingField: 'Verbal Offer Date', reason: 'Cannot determine acceptance ratio without verbal offer dates.' },
  { name: 'Assign to Intake', missingField: 'Intake Meeting Date', reason: 'Intake meeting scheduling info is missing.' },
  { name: 'Intake to Agreement', missingField: 'Recruitment Agreement Date', reason: 'Recruitment agreement execution date is not tracked.' },
  { name: 'Close Req 1BD', missingField: 'Fill Date', reason: 'Actual req fill/close date in business days (1BD) is missing.' },
];

export default function SLACalculator() {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 text-zinc-100 font-sans antialiased">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
          ⏱️ SLA Performance Calculator
        </h2>
        <p className="text-xs text-zinc-400">
          Service Level Agreement metrics and backend schema gap analysis
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
        {/* SECTION 1: Calculable SLAs */}
        <div className="bg-white/5 backdrop-blur-xl border border-emerald-500/30 rounded-2xl p-6 shadow-2xl flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-emerald-400 mb-4 flex items-center gap-2 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Calculable SLAs
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-left text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                    <th className="pb-3 pr-4">Name</th>
                    <th className="pb-3 px-4">Formula</th>
                    <th className="pb-3 px-4">Current Value</th>
                    <th className="pb-3 pl-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-xs">
                  {calculableSlas.map((sla) => (
                    <tr key={sla.name} className="hover:bg-white/5 transition-colors">
                      <td className="py-4 pr-4 font-semibold text-white">{sla.name}</td>
                      <td className="py-4 px-4 font-mono text-zinc-400 text-[11px]">{sla.formula}</td>
                      <td className="py-4 px-4 font-mono font-medium text-emerald-300">{sla.value}</td>
                      <td className="py-4 pl-4 text-right">
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          {sla.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* SECTION 2: Cannot Calculate */}
        <div className="bg-white/5 backdrop-blur-xl border border-red-500/30 rounded-2xl p-6 shadow-2xl flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-red-400 mb-4 flex items-center gap-2 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              Cannot Calculate
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-left text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                    <th className="pb-3 pr-4">Name</th>
                    <th className="pb-3 px-4">Missing Field</th>
                    <th className="pb-3 pl-4">Blocked Reason</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-xs">
                  {blockedSlas.map((sla) => (
                    <tr key={sla.name} className="hover:bg-white/5 transition-colors">
                      <td className="py-4 pr-4 font-semibold text-white">{sla.name}</td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-red-500/10 border border-red-500/20 text-red-400">
                          <span className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
                          {sla.missingField}
                        </span>
                      </td>
                      <td className="py-4 pl-4 text-zinc-400 leading-normal text-[11px]">{sla.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-xs text-zinc-500 pt-4 border-t border-white/5">
        Missing fields require Candidate + Workflow reports from Newmont CORE system.
      </footer>
    </div>
  );
}
