import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../components/GlassCard';
import { mockWikiHealth, mockWikiPages, type WikiPageItem } from '../data/mock-jarvis-data';

const hColor = (h: WikiPageItem['health']) =>
  h === 'good' ? '#22c55e' : h === 'stale' ? '#f59e0b' : '#a78bfa';

function WikiHealth() {
  const { totalPages, goodCount, staleCount, needsReviewCount, healthScore } = mockWikiHealth;
  const arc = `conic-gradient(#00d4ff ${healthScore}%, rgba(255,255,255,0.06) 0%)`;
  return (
    <GlassCard className="p-6 flex flex-col gap-4">
      <h2 style={{ color: '#00d4ff', fontSize: '18px', fontWeight: 600, margin: 0 }}>📖 Wiki Health</h2>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: 96, height: 96, borderRadius: '50%', background: arc, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 68, height: 68, borderRadius: '50%', background: '#0a0a1a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '20px', fontWeight: 700, color: '#00d4ff', lineHeight: 1 }}>{healthScore}%</span>
            <span style={{ fontSize: '10px', color: '#94a3b8' }}>health</span>
          </div>
        </div>
      </div>
      {[['Total', totalPages, '#e2e8f0'], ['Good', goodCount, '#22c55e'], ['Stale', staleCount, '#f59e0b'], ['Review', needsReviewCount, '#a78bfa']].map(([l, v, c]) => (
        <div key={String(l)} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
          <span style={{ color: '#94a3b8' }}>{l}</span><span style={{ fontWeight: 700, color: String(c) }}>{v}</span>
        </div>
      ))}
    </GlassCard>
  );
}

function WikiBrowser() {
  const [q, setQ] = useState('');
  const [sel, setSel] = useState<WikiPageItem | null>(null);
  const rows = mockWikiPages.filter(p => p.title.toLowerCase().includes(q.toLowerCase()) || p.category.toLowerCase().includes(q.toLowerCase()));
  return (
    <GlassCard className="p-6 flex flex-col gap-3">
      <h2 style={{ color: '#00d4ff', fontSize: '18px', fontWeight: 600, margin: 0 }}>🔍 Wiki Browser</h2>
      <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search pages…"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px 12px', color: '#e2e8f0', fontSize: '14px', outline: 'none', width: '100%', boxSizing: 'border-box' }} />
      <div style={{ display: 'grid', gridTemplateColumns: sel ? '1fr 1fr' : '1fr', gap: '12px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '280px', overflowY: 'auto' }}>
          {rows.map((p, i) => (
            <motion.button key={p.path} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
              onClick={() => setSel(p)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: sel?.path === p.path ? 'rgba(0,212,255,0.08)' : 'rgba(255,255,255,0.02)', border: `1px solid ${sel?.path === p.path ? 'rgba(0,212,255,0.3)' : 'rgba(255,255,255,0.05)'}`, borderRadius: '8px', padding: '8px 12px', cursor: 'pointer', textAlign: 'left', width: '100%' }}>
              <div><div style={{ fontSize: '13px', fontWeight: 600, color: '#e2e8f0' }}>{p.title}</div><div style={{ fontSize: '11px', color: '#94a3b8' }}>{p.category}</div></div>
              <span style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '4px', background: `${hColor(p.health)}22`, color: hColor(p.health), fontWeight: 700 }}>{p.health}</span>
            </motion.button>
          ))}
        </div>
        {sel && (
          <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '16px', fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ fontWeight: 700, color: '#00d4ff' }}>{sel.title}</div>
            <div style={{ color: '#94a3b8' }}>📂 {sel.path}</div>
            <div style={{ color: '#94a3b8' }}>📅 {sel.lastEdited} · 📝 {sel.wordCount.toLocaleString()} words</div>
            <span style={{ padding: '3px 8px', borderRadius: '4px', background: `${hColor(sel.health)}22`, color: hColor(sel.health), fontWeight: 700, fontSize: '11px', alignSelf: 'flex-start' }}>{sel.health}</span>
          </motion.div>
        )}
      </div>
    </GlassCard>
  );
}

export function WikiPage() {
  return (
    <div style={{ padding: '8px' }}>
      <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        style={{ fontSize: '22px', fontWeight: 700, marginBottom: '20px', background: 'linear-gradient(to right, #00d4ff, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        📚 Wiki Codex
      </motion.h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '20px' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.0 }} style={{ gridColumn: 'span 4' }}><WikiHealth /></motion.div>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ gridColumn: 'span 8' }}><WikiBrowser /></motion.div>
      </div>
    </div>
  );
}
