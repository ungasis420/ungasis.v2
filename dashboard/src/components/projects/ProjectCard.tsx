import React from 'react';
import { GlassCard } from '../GlassCard';

export interface ProjectCardProps {
  name: string;
  version: string;
  status: 'active' | 'complete' | 'planned';
  stack: string;
  nextMilestone: string;
}

export function ProjectCard({ name, version, status, stack, nextMilestone }: ProjectCardProps) {
  const statusColors = {
    active: '#22c55e',
    complete: '#00d4ff',
    planned: '#f59e0b'
  };

  return (
    <GlassCard className="h-full">
      <div className="p-5 flex flex-col gap-3 h-full" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '14px', minHeight: '140px' }}>
        <div className="flex justify-between items-start">
          <div className="flex items-baseline gap-2">
            <h3 className="m-0" style={{ fontWeight: 'bold', color: '#ffffff', fontSize: '18px' }}>{name}</h3>
            <span style={{ color: '#ffffff99', fontSize: '14px' }}>{version}</span>
          </div>
          <div style={{
            backgroundColor: `${statusColors[status]}20`,
            color: statusColors[status],
            padding: '4px 10px',
            borderRadius: '9999px',
            fontSize: '12px',
            fontWeight: 600,
            textTransform: 'capitalize'
          }}>
            {status}
          </div>
        </div>
        
        <div className="flex flex-col gap-1 mt-auto">
          <div className="flex gap-2">
            <span style={{ color: '#ffffff80', width: '70px' }}>Stack</span>
            <span style={{ color: '#ffffff' }}>{stack}</span>
          </div>
          <div className="flex gap-2">
            <span style={{ color: '#ffffff80', width: '70px' }}>Milestone</span>
            <span style={{ color: '#ffffff' }}>{nextMilestone}</span>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
