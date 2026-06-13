import React from 'react';
import { GlassCard } from './GlassCard';

export function Sidebar() {
  const navItems = ['Dashboard', 'Projects', 'Agents', 'Wiki', 'Automation', 'Settings'];

  return (
    <GlassCard className="w-64 h-full flex flex-col p-4 mr-6">
      <div className="mb-8 px-4 mt-2">
        <h1 style={{ color: '#00d4ff', fontSize: '20px', fontWeight: 'bold', letterSpacing: '0.05em' }}>UNGASIS OS</h1>
        <p style={{ color: '#a78bfa', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.8, marginTop: '4px' }}>v6.0 JARVIS</p>
      </div>
      
      <nav className="flex-1 flex flex-col gap-2">
        {navItems.map((item) => (
          <button
            key={item}
            className="text-left px-4 py-3 rounded-xl transition-all duration-200 hover:bg-white/5"
            style={{ 
              color: item === 'Dashboard' ? '#00d4ff' : 'rgba(255, 255, 255, 0.8)',
              fontSize: '14px',
              fontWeight: item === 'Dashboard' ? 600 : 400
            }}
          >
            {item}
          </button>
        ))}
      </nav>
    </GlassCard>
  );
}
