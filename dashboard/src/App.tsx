import React, { useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { SystemHealth } from './components/SystemHealth';
import { GlassCard } from './components/GlassCard';
import { useDashboardStore } from './stores/dashboardStore';

export default function App() {
  const { health, fetchHealth } = useDashboardStore();

  useEffect(() => {
    fetchHealth();
  }, [fetchHealth]);

  return (
    <div className="flex h-screen p-6 overflow-hidden" style={{ backgroundColor: '#0a0a1a' }}>
      <Sidebar />
      <main className="flex-1 h-full overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="col-span-full">
            <header className="mb-6">
              <h2 className="font-bold mb-1" style={{ color: '#ffffff', fontSize: '24px' }}>JARVIS Dashboard</h2>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px' }}>
                System ready. Awaiting commands.
              </p>
            </header>
          </div>
          <div className="col-span-1 lg:col-span-2 h-64">
            <SystemHealth />
          </div>
          <div className="col-span-1 h-64">
            <GlassCard className="p-6 h-full flex flex-col justify-center gap-2">
              <div style={{ color: '#00d4ff', fontSize: '14px', fontWeight: 600 }}>JARVIS Score</div>
              {health ? (
                <>
                  <div style={{ color: '#ffffff', fontSize: '32px', fontWeight: 700 }}>
                    {health.jarvis_score}%
                  </div>
                  <div style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '12px' }}>
                    Wiki: {health.wiki_health}% · Scripts: {health.script_count} · Graph nodes: {health.graph_nodes}
                  </div>
                </>
              ) : (
                <div style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '14px' }}>Loading…</div>
              )}
            </GlassCard>
          </div>
        </div>
      </main>
    </div>
  );
}
