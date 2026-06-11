'use client';

import React from 'react';
import Sidebar from './Sidebar';

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0a0a1a] text-zinc-100 font-sans antialiased">
      {/* Sidebar on left */}
      <Sidebar />

      {/* Main content area */}
      <main className="flex-1 overflow-y-auto p-8 bg-[#0a0a1a]">
        {children}
      </main>
    </div>
  );
}
