import React, { useState, useEffect, ChangeEvent } from 'react';
import AppShell from '@/components/layout/AppShell';
import Dashboard from '@/components/Dashboard';
import SLACalculator from '@/components/SLACalculator';
import { FieldGapsView, RequisitionsView, HoldAnalysisView } from '@/components/Views';

import { useDashboardStore } from '@/stores/dashboard';
import {
  loadCSVFile,
  getRequisitions,
  getHoldEvents,
  getPostings,
} from '@/lib/data-engine';

export default function App() {
  const activeModule = useDashboardStore((state) => state.activeModule);

  const requisitions = useDashboardStore((state) => state.requisitions);
  const holdEvents = useDashboardStore((state) => state.holdEvents);
  const postings = useDashboardStore((state) => state.postings);

  const setRequisitions = useDashboardStore((state) => state.setRequisitions);
  const setHoldEvents = useDashboardStore((state) => state.setHoldEvents);
  const setPostings = useDashboardStore((state) => state.setPostings);

  const [loadingFile, setLoadingFile] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Load initial offline-first data from IndexedDB on mount
  useEffect(() => {
    const initLocalData = async () => {
      try {
        const reqs = await getRequisitions();
        const holds = await getHoldEvents();
        const posts = await getPostings();
        if (reqs.length > 0) setRequisitions(reqs);
        if (holds.length > 0) setHoldEvents(holds);
        if (posts.length > 0) setPostings(posts);
      } catch (err) {
        console.error('Failed to initialize local IndexedDB data:', err);
      }
    };
    initLocalData();
  }, [setRequisitions, setHoldEvents, setPostings]);

  const handleFileUpload = async (
    e: ChangeEvent<HTMLInputElement>,
    tableName: 'requisitions' | 'holdEvents' | 'postings'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoadingFile(tableName);
    setErrorMsg(null);

    try {
      await loadCSVFile(file, tableName);

      if (tableName === 'requisitions') {
        const data = await getRequisitions();
        setRequisitions(data);
      } else if (tableName === 'holdEvents') {
        const data = await getHoldEvents();
        setHoldEvents(data);
      } else if (tableName === 'postings') {
        const data = await getPostings();
        setPostings(data);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(`Error loading ${tableName} CSV: ${err.message || err}`);
    } finally {
      setLoadingFile(null);
    }
  };

  const renderModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <Dashboard />;
      case 'fieldgap':
        return <FieldGapsView />;
      case 'sla':
        return <SLACalculator />;
      case 'requisitions':
        return <RequisitionsView />;
      case 'holds':
        return <HoldAnalysisView />;
      default:
        return <Dashboard />;
    }
  };

  const fileInputs = [
    {
      id: 'requisitions-upload',
      label: 'Requisitions',
      tableName: 'requisitions' as const,
      count: requisitions.length,
      color: '#00d4ff',
    },
    {
      id: 'holds-upload',
      label: 'Hold Events',
      tableName: 'holdEvents' as const,
      count: holdEvents.length,
      color: '#f59e0b',
    },
    {
      id: 'postings-upload',
      label: 'Postings',
      tableName: 'postings' as const,
      count: postings.length,
      color: '#22c55e',
    },
  ];

  return (
    <AppShell>
      <div className="w-full max-w-7xl mx-auto space-y-8">
        {/* CSV Ingestion */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                📥 Ingestion Zone
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                Upload raw CSV datasets to populate the local command center database
              </p>
            </div>
            {errorMsg && (
              <div className="text-xs px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 animate-pulse">
                ⚠️ {errorMsg}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {fileInputs.map((input) => {
              const isLoading = loadingFile === input.tableName;
              const hasData = input.count > 0;

              return (
                <div
                  key={input.tableName}
                  className="relative bg-white/[0.02] border border-white/5 hover:border-white/10 rounded-xl p-5 flex flex-col justify-between transition-all duration-300 min-h-[120px]"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-white">{input.label}</span>
                      <span className="text-xs text-zinc-500 mt-1">
                        {hasData ? `${input.count.toLocaleString()} rows` : 'No file loaded'}
                      </span>
                    </div>
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        hasData ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-600'
                      }`}
                    />
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-4">
                    <label
                      htmlFor={input.id}
                      className={`text-xs font-semibold px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
                        isLoading
                          ? 'bg-zinc-800 text-zinc-500 cursor-wait'
                          : 'bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20'
                      }`}
                    >
                      {isLoading ? 'Processing...' : 'Choose File'}
                    </label>
                    <input
                      type="file"
                      id={input.id}
                      accept=".csv"
                      disabled={isLoading}
                      onChange={(e) => handleFileUpload(e, input.tableName)}
                      className="hidden"
                    />
                    {hasData && (
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide"
                        style={{
                          backgroundColor: `${input.color}15`,
                          color: input.color,
                        }}
                      >
                        Ready
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Module */}
        <div className="w-full">
          {renderModule()}
        </div>
      </div>
    </AppShell>
  );
}
