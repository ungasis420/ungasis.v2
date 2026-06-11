'use client';

import React from 'react';
import { useDashboardStore } from '@/stores/dashboard';

interface NavItem {
  key: string;
  label: string;
  icon: string;
  disabled?: boolean;
  badge?: string;
}

export default function Sidebar() {
  const activeModule = useDashboardStore((state) => state.activeModule);
  const setActiveModule = useDashboardStore((state) => state.setActiveModule);

  const navItems: NavItem[] = [
    { key: 'dashboard', label: 'Dashboard', icon: '📊' },
    { key: 'fieldgap', label: 'Field Gaps', icon: '🔍' },
    { key: 'sla', label: 'SLA Calculator', icon: '⏱️' },
    { key: 'requisitions', label: 'Requisitions', icon: '💼' },
    { key: 'holds', label: 'Hold Analysis', icon: '⏸️', disabled: true, badge: 'Soon' },
  ];

  return (
    <aside className="w-[260px] h-screen bg-[#0a0a1a] border-r border-white/10 flex flex-col justify-between shrink-0 font-sans antialiased">
      {/* Top Header */}
      <div className="p-6">
        <div className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
          Newmont × Korn Ferry RPO
        </div>
        <div className="text-xl font-bold text-white mt-1 tracking-tight flex items-center gap-2">
          <span>Command Center</span>
          <span className="w-2 h-2 rounded-full bg-[#00d4ff] animate-pulse" />
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-4 py-2 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = activeModule === item.key;
          if (item.disabled) {
            return (
              <div
                key={item.key}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-zinc-600 cursor-not-allowed select-none bg-white/[0.02]"
              >
                <div className="flex items-center gap-3 text-sm font-medium">
                  <span className="text-base grayscale opacity-50">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-zinc-800/80 text-zinc-500 tracking-wider uppercase">
                    {item.badge}
                  </span>
                )}
              </div>
            );
          }

          return (
            <button
              key={item.key}
              onClick={() => setActiveModule(item.key)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 border-l-2 cursor-pointer ${
                isActive
                  ? 'bg-white/10 text-white border-[#00d4ff]'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5 border-transparent'
              }`}
            >
              <div className="flex items-center gap-3 text-sm font-medium">
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
              </div>
            </button>
          );
        })}
      </nav>

      {/* Bottom Version */}
      <div className="p-6 border-t border-white/5 flex items-center justify-between">
        <div className="text-xs text-zinc-500 font-medium">System Status</div>
        <span className="text-[10px] font-semibold px-2 py-1 rounded-full bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/20">
          v6.0-mvp
        </span>
      </div>
    </aside>
  );
}
