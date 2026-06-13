import React from 'react';
import { GlassCard } from '../GlassCard';

export interface AgentCardProps {
  name: string;
  persona: string;
  status: 'online' | 'offline';
  tools: string[];
  lastRun: string;
}

export function AgentCard({ name, persona, status, tools, lastRun }: AgentCardProps) {
  const statusColor = status === 'online' ? '#22c55e' : '#ffffff4d';

  return (
    <GlassCard className="h-full">
      <div className="p-5 flex flex-col gap-3 h-full" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '14px', minHeight: '140px' }}>
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <h3 className="m-0 flex items-center gap-2" style={{ fontWeight: 'bold', color: '#ffffff', fontSize: '18px' }}>
              {name}
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: statusColor }} />
            </h3>
            <span style={{ color: '#00d4ff', fontStyle: 'italic', fontSize: '13px', marginTop: '2px' }}>{persona}</span>
          </div>
        </div>
        
        <div className="flex flex-col gap-1 mt-auto">
          <div className="flex gap-2">
            <span style={{ color: '#ffffff4d', width: '60px' }}>Tools</span>
            <span style={{ color: '#ffffff' }}>[{tools.join(', ')}]</span>
          </div>
          <div className="flex gap-2">
            <span style={{ color: '#ffffff4d', width: '60px' }}>Last Run</span>
            <span style={{ color: '#ffffff' }}>{lastRun}</span>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
