import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const FUNNEL_DATA = [
  { stage: 'Applied', count: 2847, prevConv: null, days: null, color: '#00d4ff' },
  { stage: 'Review Complete', count: 2103, prevConv: 74, days: 2, color: '#1ebdf4' },
  { stage: 'Screen Complete', count: 1456, prevConv: 69, days: 4, color: '#3ca6ea' },
  { stage: 'Assessment Complete', count: 1201, prevConv: 82, days: 3, color: '#5b8fe0' },
  { stage: 'Selected', count: 834, prevConv: 69, days: 2, color: '#7977d5' },
  { stage: 'Scheduled', count: 756, prevConv: 91, days: 5, color: '#a78bfa' },
  { stage: 'Interview', count: 689, prevConv: 91, days: 6, color: '#9a93e3' },
  { stage: 'Additional', count: 412, prevConv: 60, days: 8, color: '#8d9bcb' },
  { stage: 'Offer Extended', count: 287, prevConv: 70, days: 4, color: '#80a3b4' },
  { stage: 'Offer Accepted', count: 241, prevConv: 84, days: 3, color: '#51b486' },
  { stage: 'Ready for Hire', count: 228, prevConv: 95, days: 2, color: '#22c55e' },
  { stage: 'Withdraw/Rejected', count: 891, prevConv: null, days: null, color: '#ef4444' }
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div style={{
        background: '#0a0a1a',
        border: '1px solid rgba(255,255,255,0.10)',
        padding: '12px',
        borderRadius: '8px',
        color: '#ffffff',
        fontFamily: 'Inter, system-ui, sans-serif'
      }}>
        <div style={{ fontWeight: 600, marginBottom: '8px', color: data.color }}>{data.stage}</div>
        <div style={{ fontSize: '14px', color: '#a1a1aa' }}>Candidates: <span style={{ color: '#ffffff' }}>{data.count}</span></div>
        {data.prevConv !== null && (
          <div style={{ fontSize: '14px', color: '#a1a1aa' }}>Conversion: <span style={{ color: '#ffffff' }}>{data.prevConv}%</span></div>
        )}
        {data.days !== null && (
          <div style={{ fontSize: '14px', color: '#a1a1aa' }}>Avg Time: <span style={{ color: '#ffffff' }}>{data.days} days</span></div>
        )}
      </div>
    );
  }
  return null;
};

export default function CandidatePipeline() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#00d4ff', margin: 0, letterSpacing: '0.05em' }}>
          CANDIDATE INTELLIGENCE
        </h2>
        <p style={{ color: '#a1a1aa', fontSize: '14px', margin: '4px 0 0 0' }}>
          Candidate Pipeline Funnel (12 Workflow Stages)
        </p>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        {[
          { label: 'Total Candidates', value: '2,847', sub: 'Initial Applications', color: '#00d4ff' },
          { label: 'Overall Conversion', value: '8.0%', sub: 'Applied to Hire', color: '#a78bfa' },
          { label: 'Avg Duration', value: '39 Days', sub: 'End-to-End processing', color: '#22c55e' },
          { label: 'Top Drop-off', value: 'Review', sub: '-744 candidates', color: '#ef4444' }
        ].map((kpi, i) => (
          <div key={i} style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.10)',
            borderRadius: '12px',
            padding: '16px',
            backdropFilter: 'blur(16px)'
          }}>
            <div style={{ color: '#a1a1aa', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
              {kpi.label}
            </div>
            <div style={{ color: kpi.color, fontSize: '28px', fontWeight: 700, margin: '0 0 4px 0' }}>
              {kpi.value}
            </div>
            <div style={{ color: '#71717a', fontSize: '12px' }}>
              {kpi.sub}
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area - Funnel */}
      <div style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.10)',
        borderRadius: '16px',
        padding: '24px',
        backdropFilter: 'blur(16px)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h3 style={{ color: '#ffffff', fontSize: '16px', fontWeight: 600, margin: 0 }}>Pipeline Conversion</h3>
        </div>
        
        <div style={{ height: '450px', width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={FUNNEL_DATA}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
            >
              <XAxis type="number" hide />
              <YAxis 
                dataKey="stage" 
                type="category" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#a1a1aa', fontSize: 13, fontWeight: 500 }} 
                width={140}
              />
              <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} content={<CustomTooltip />} />
              <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={24} background={{ fill: 'rgba(255,255,255,0.02)', radius: [0, 4, 4, 0] }}>
                {FUNNEL_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Footer */}
      <div style={{ color: '#71717a', fontSize: '12px', textAlign: 'right' }}>
        Source: Applicants_Workflow_Dates_KF. Sample data shown.
      </div>
    </div>
  );
}
