import React from 'react';
import { Sidebar } from './components/Sidebar';
import { SystemHealth } from './components/SystemHealth';

export default function App() {
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
        </div>
      </main>
    </div>
  );
}
