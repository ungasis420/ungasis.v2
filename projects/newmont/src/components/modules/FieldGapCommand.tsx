'use client';

import React, { useState, useMemo } from 'react';
import { fieldGapData, FieldGapData } from '@/lib/field-gap-data';

export default function FieldGapCommand() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedField, setSelectedField] = useState<FieldGapData | null>(null);

  // Calculate stats dynamically
  const stats = useMemo(() => {
    let ok = 0, no = 0, blank = 0;
    fieldGapData.forEach((f) => {
      if (f.status === 'ok') ok++;
      else if (f.status === 'no') no++;
      else blank++;
    });
    return { ok, no, blank, total: fieldGapData.length };
  }, []);

  // Filter and group fields
  const groupedCategories = useMemo(() => {
    const term = searchTerm.toLowerCase();
    const filtered = fieldGapData.filter((f) =>
      f.fieldName.toLowerCase().includes(term) ||
      f.backendRef.toLowerCase().includes(term) ||
      f.newmontFieldName.toLowerCase().includes(term)
    );
    const groups: Record<FieldGapData['category'], FieldGapData[]> = {
      'Requisition Report': [],
      'Candidate Report': [],
      'Workflow Dates': [],
    };
    filtered.forEach((f) => groups[f.category].push(f));
    return groups;
  }, [searchTerm]);

  const pct = (val: number) => ((val / stats.total) * 100).toFixed(1);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 text-zinc-100 font-sans antialiased">
      {/* Summary Stats Glass Card */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              📊 Field Gap Analyzer
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              ATS Field Mapping & Coverage Status across Korn Ferry RPO Reports
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-xs font-semibold">
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {stats.ok} Available ({pct(stats.ok)}%)
            </span>
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              {stats.no} Missing ({pct(stats.no)}%)
            </span>
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-500/10 border border-zinc-500/20 text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-zinc-500" />
              {stats.blank} Unknown ({pct(stats.blank)}%)
            </span>
          </div>
        </div>

        {/* Stacked Progress Bar */}
        <div className="w-full h-3 bg-zinc-900 rounded-full flex overflow-hidden border border-white/5 p-[1px]">
          <div className="h-full bg-emerald-500 rounded-l-sm transition-all duration-500" style={{ width: `${pct(stats.ok)}%` }} title={`Available: ${pct(stats.ok)}%`} />
          <div className="h-full bg-red-500 transition-all duration-500" style={{ width: `${pct(stats.no)}%` }} title={`Missing: ${pct(stats.no)}%`} />
          <div className="h-full bg-zinc-500 rounded-r-sm transition-all duration-500" style={{ width: `${pct(stats.blank)}%` }} title={`Unknown: ${pct(stats.blank)}%`} />
        </div>
      </div>

      {/* Main Grid: Left List, Right Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Badges and Search (Col-span 2) */}
        <div className="lg:col-span-2 space-y-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-white/10 pb-4">
            <h3 className="font-bold text-white tracking-wide text-sm uppercase">Report Fields Schema</h3>
            <div className="relative max-w-xs w-full">
              <input
                type="text"
                placeholder="Search fields, sources, backends..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-lg py-1.5 pl-3 pr-8 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-[#00d4ff] transition"
              />
              <span className="absolute right-2.5 top-2.5 text-zinc-500 text-xs pointer-events-none">🔍</span>
            </div>
          </div>

          {Object.entries(groupedCategories).map(([category, fields]) => (
            <div key={category} className="space-y-3">
              <h4 className="text-xs font-semibold text-zinc-400 flex justify-between items-center bg-white/2">
                <span>{category}</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-white/5 text-zinc-300">
                  {fields.length} {fields.length === 1 ? 'field' : 'fields'}
                </span>
              </h4>
              {fields.length === 0 ? (
                <p className="text-xs text-zinc-600 italic">No matching fields found.</p>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {fields.map((field) => {
                    const isSelected = selectedField?.fieldName === field.fieldName && selectedField?.category === field.category;
                    const statusClass =
                      field.status === 'ok'
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/30'
                        : field.status === 'no'
                        ? 'bg-red-500/20 text-red-400 border-red-500/20 hover:bg-red-500/30'
                        : 'bg-zinc-500/20 text-zinc-400 border-zinc-500/20 hover:bg-zinc-500/30';
                    return (
                      <button
                        key={field.fieldName + field.category}
                        onClick={() => setSelectedField(field)}
                        className={`text-xs px-2.5 py-1.5 rounded-lg border font-medium transition cursor-pointer ${statusClass} ${
                          isSelected ? 'ring-2 ring-[#00d4ff] scale-[1.02] border-transparent' : ''
                        }`}
                      >
                        {field.fieldName}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Details Inspector (Col-span 1) */}
        <div className="lg:col-span-1 lg:sticky lg:top-6">
          {selectedField ? (
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl space-y-4">
              <div className="flex justify-between items-start border-b border-white/10 pb-3">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">
                    {selectedField.category}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-0.5">{selectedField.fieldName}</h3>
                </div>
                <button
                  onClick={() => setSelectedField(null)}
                  className="text-zinc-500 hover:text-white transition text-xs font-semibold cursor-pointer"
                >
                  ✕ Close
                </button>
              </div>

              <div className="space-y-3.5 text-xs">
                {/* Status Indicator */}
                <div className="flex items-center gap-2">
                  <span className="text-zinc-400">Coverage Status:</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    selectedField.status === 'ok' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                    selectedField.status === 'no' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                    'bg-zinc-500/20 text-zinc-400 border border-zinc-500/30'
                  }`}>
                    {selectedField.status === 'ok' ? 'Available' : selectedField.status === 'no' ? 'Missing' : 'Unknown'}
                  </span>
                </div>

                {/* Technical Specifications */}
                <div className="bg-black/20 rounded-xl p-3 border border-white/5 space-y-2">
                  {selectedField.backendRef && (
                    <div>
                      <div className="text-zinc-500 font-semibold text-[10px] uppercase">Back-End Field Reference</div>
                      <code className="text-[11px] text-[#00d4ff] break-all">{selectedField.backendRef}</code>
                    </div>
                  )}
                  {selectedField.newmontFieldName && (
                    <div>
                      <div className="text-zinc-500 font-semibold text-[10px] uppercase">Mapped Newmont Header</div>
                      <code className="text-[11px] text-zinc-300 break-all">{selectedField.newmontFieldName}</code>
                    </div>
                  )}
                  {selectedField.manipulationNeeded && (
                    <div>
                      <div className="text-zinc-500 font-semibold text-[10px] uppercase">Required Manipulation</div>
                      <p className="text-[11px] text-amber-300/90">{selectedField.manipulationNeeded}</p>
                    </div>
                  )}
                </div>

                {/* Qualitative Details */}
                <div className="space-y-3">
                  <div>
                    <h5 className="font-semibold text-zinc-400 text-[10px] uppercase tracking-wide">Korn Ferry Notes</h5>
                    <p className="mt-1 text-zinc-300 bg-white/2 p-2.5 rounded-lg border border-white/5 min-h-[40px] leading-relaxed">
                      {selectedField.kfNotes || <span className="text-zinc-600 italic">No notes provided.</span>}
                    </p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-zinc-400 text-[10px] uppercase tracking-wide">Newmont Comments</h5>
                    <p className="mt-1 text-zinc-300 bg-white/2 p-2.5 rounded-lg border border-white/5 min-h-[40px] leading-relaxed">
                      {selectedField.newmontComments || <span className="text-zinc-600 italic">No comments provided.</span>}
                    </p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-zinc-400 text-[10px] uppercase tracking-wide">KF Impact to Reporting</h5>
                    <p className="mt-1 text-zinc-300 bg-white/2 p-2.5 rounded-lg border border-white/5 min-h-[40px] leading-relaxed">
                      {selectedField.kfImpactToReporting || <span className="text-zinc-600 italic">No direct impact noted.</span>}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center text-zinc-400 h-64 flex flex-col justify-center items-center gap-3">
              <span className="text-3xl text-zinc-600">🔍</span>
              <div>
                <p className="text-sm font-semibold text-zinc-300">Field Inspector</p>
                <p className="text-xs text-zinc-500 mt-1 max-w-[200px] mx-auto">
                  Click any field badge on the left to inspect detailed mapping rules and reporting impacts.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
