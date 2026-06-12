import React, { useEffect } from 'react';
import AppShell from '@/components/layout/AppShell';
import Dashboard from '@/components/Dashboard';
import SLACalculator from '@/components/SLACalculator';
import DataDictionary from '@/components/modules/DataDictionary';
import DataUpload from '@/components/modules/DataUpload';
import { CandidatePipelineView, SLAReportabilityView, RequisitionsView, HoldAnalysisView } from '@/components/Views';

import { useDashboardStore } from '@/stores/dashboard';
import { getRequisitions, getHoldEvents, getPostings } from '@/lib/data-engine';

export default function App() {
  const activeModule = useDashboardStore((state) => state.activeModule);

  const setRequisitions = useDashboardStore((state) => state.setRequisitions);
  const setHoldEvents = useDashboardStore((state) => state.setHoldEvents);
  const setPostings = useDashboardStore((state) => state.setPostings);

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

  const renderModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <Dashboard />;
      case 'candidates':
        return <CandidatePipelineView />;
      case 'sla':
        return <SLACalculator />;
      case 'slareport':
        return <SLAReportabilityView />;
      case 'requisitions':
        return <RequisitionsView />;
      case 'holds':
        return <HoldAnalysisView />;
      case 'upload':
        return <DataUpload />;
      case 'dictionary':
        return <DataDictionary />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AppShell>
      <div className="w-full max-w-7xl mx-auto space-y-8">
        <div
          key={activeModule}
          className="w-full fade-in-view"
          style={{ animation: 'fadeInView 0.25s ease-out' }}
        >
          {renderModule()}
        </div>
      </div>
    </AppShell>
  );
}
