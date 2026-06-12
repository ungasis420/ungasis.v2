import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface CardProps {
  title: string;
  desc: string;
  color: string;
}

function SLACard({ title, desc, color }: CardProps) {
  return (
    <div
      style={{
        backgroundColor: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.10)',
        borderLeft: `4px solid ${color}`,
        borderRadius: '16px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}
    >
      <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: '#ffffff' }}>
        {title}
      </h4>
      <p style={{ margin: 0, fontSize: '14px', color: color === '#ef4444' ? '#ef4444' : '#a1a1aa' }}>
        {desc}
      </p>
    </div>
  );
}

export default function SLAReportability() {
  const pieData = [
    { name: 'Calculable', value: 5, color: '#22c55e' },
    { name: 'Pending', value: 2, color: '#f59e0b' },
    { name: 'Blocked', value: 10, color: '#ef4444' },
  ];

  const calculableItems = [
    { title: 'Time to Fill', desc: 'Approved->Offer Accept, target 50d' },
    { title: 'Fill Rate', desc: 'Filled/Total' },
    { title: 'Cancel Rate', desc: 'Cancelled/Total' },
    { title: 'Pipeline Stage Times', desc: 'workflow dates' },
    { title: 'Req Aging', desc: 'Created->Today, 60d trigger' },
  ];

  const pendingItems = [
    { title: 'Time to Offer', desc: 'Offer Created Date workaround' },
    { title: 'Offer Acceptance Rate', desc: 'Offer Created Date workaround' },
  ];

  const blockedItems = [
    { title: 'Time to Assign', desc: 'no Intake Meeting Date' },
    { title: 'Time to Advertise', desc: 'no KF Assigned Date' },
    { title: 'Time to Brief', desc: 'no Intake Meeting Date' },
    { title: 'Assign to Intake', desc: 'both missing' },
    { title: 'Intake to RA', desc: 'both missing' },
    { title: 'Time to Shortlist', desc: 'no Req Shortlist Date' },
    { title: 'Time to Interview', desc: 'no KF Assigned flag' },
    { title: 'Close Req 1BD', desc: 'no Fill Date' },
    { title: 'Time to Screen BGC', desc: 'no BGC dates' },
    { title: 'Hold Duration', desc: 'Report 3 missing freeze/unfreeze dates' },
  ];

  return (
    <div
      style={{
        backgroundColor: '#0a0a1a',
        padding: '24px',
        fontFamily: 'Inter, system-ui, sans-serif',
        fontVariantNumeric: 'tabular-nums',
        minHeight: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ marginBottom: '32px' }}>
        <h2
          style={{
            color: '#00d4ff',
            fontSize: '14px',
            fontWeight: 600,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            margin: '0 0 16px 0',
          }}
        >
          SLA INTELLIGENCE
        </h2>
        
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.10)',
            borderRadius: '16px',
            padding: '24px',
          }}
        >
          <div style={{ width: '160px', height: '160px', marginRight: '32px', flexShrink: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0a0a1a',
                    border: '1px solid rgba(255,255,255,0.10)',
                    borderRadius: '8px',
                    color: '#ffffff',
                  }}
                  itemStyle={{ color: '#ffffff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: 700, margin: '0 0 8px 0', color: '#ffffff' }}>
              5 of 17 SLAs Calculable
            </h1>
            <p style={{ color: '#a1a1aa', margin: 0, fontSize: '16px', lineHeight: '1.5' }}>
              Current visibility into SLA performance based on CORE fields.<br />
              <span style={{ color: '#22c55e', fontWeight: 500 }}>5 Calculable</span> &bull;{' '}
              <span style={{ color: '#f59e0b', fontWeight: 500 }}>2 Pending</span> &bull;{' '}
              <span style={{ color: '#ef4444', fontWeight: 500 }}>10 Blocked</span>
            </p>
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          marginBottom: '32px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#22c55e' }}></div>
            <h3 style={{ fontSize: '18px', fontWeight: 600, margin: 0, color: '#ffffff' }}>
              CALCULABLE (5)
            </h3>
          </div>
          {calculableItems.map((item, idx) => (
            <SLACard key={idx} title={item.title} desc={item.desc} color="#22c55e" />
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#f59e0b' }}></div>
            <h3 style={{ fontSize: '18px', fontWeight: 600, margin: 0, color: '#ffffff' }}>
              PENDING (2)
            </h3>
          </div>
          {pendingItems.map((item, idx) => (
            <SLACard key={idx} title={item.title} desc={item.desc} color="#f59e0b" />
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ef4444' }}></div>
            <h3 style={{ fontSize: '18px', fontWeight: 600, margin: 0, color: '#ffffff' }}>
              BLOCKED (10)
            </h3>
          </div>
          {blockedItems.map((item, idx) => (
            <SLACard key={idx} title={item.title} desc={item.desc} color="#ef4444" />
          ))}
        </div>
      </div>

      <div
        style={{
          backgroundColor: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.10)',
          borderRadius: '16px',
          padding: '16px',
          textAlign: 'center',
        }}
      >
        <p style={{ margin: 0, color: '#a1a1aa', fontSize: '14px' }}>
          Blocked SLAs require fields from Newmont CORE. Contact Manuel Kassis.
        </p>
      </div>
    </div>
  );
}
