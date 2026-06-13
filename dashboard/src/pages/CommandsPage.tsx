import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../components/GlassCard';

interface CommandItem {
  name: string;
  description: string;
  category: 'skill' | 'script';
}

const COMMANDS: CommandItem[] = [
  { name: '/pulse', description: 'Run UNGASIS system health check', category: 'skill' },
  { name: '/build', description: 'Run the full UNGASIS build pipeline', category: 'skill' },
  { name: '/inject', description: 'Inject relevant knowledge graph context for a task', category: 'skill' },
  { name: '/pace', description: 'Check token burn rate vs ideal pace', category: 'skill' },
  { name: '/preflight', description: 'Run pre-flight quality checks before building', category: 'skill' },
  { name: '/wiki', description: 'Run wiki health check', category: 'skill' },
  { name: '/budget', description: "Check today's token budget status", category: 'skill' },
  { name: 'ungasis.py pulse', description: 'Full system health report', category: 'script' },
  { name: 'startup-sequence.py', description: 'Morning startup summary with JARVIS score', category: 'script' },
  { name: 'battle-test.ps1 -Json', description: 'Run integration tests, write battle-test.json', category: 'script' },
  { name: 'jarvis-score.py', description: 'Weighted JARVIS capability score', category: 'script' },
  { name: 'wiki-lint.py', description: 'Lint wiki pages for staleness', category: 'script' },
  { name: 'context-inject.py', description: 'Inject knowledge graph context for a task', category: 'script' },
  { name: 'task-router.py', description: 'Route a task to the right agent/model tier', category: 'script' },
  { name: 'token-report.py', description: 'Report token usage for the day', category: 'script' },
  { name: 'session-pacer.py', description: 'Check token burn rate vs ideal pace', category: 'script' },
  { name: 'pre-flight.py', description: 'Pre-flight checks before a build', category: 'script' },
  { name: 'generate-context-pack.py', description: 'Generate all context files in one command', category: 'script' },
];

const CAT_COLOR: Record<CommandItem['category'], string> = {
  skill: '#00d4ff',
  script: '#a78bfa',
};

function CommandRow({ item, index }: { item: CommandItem; index: number }) {
  const c = CAT_COLOR[item.category];
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.05)',
        borderRadius: '8px',
        padding: '10px 14px',
      }}
    >
      <span
        style={{
          fontSize: '10px',
          padding: '2px 7px',
          borderRadius: '4px',
          background: `${c}22`,
          color: c,
          fontWeight: 700,
          minWidth: 48,
          textAlign: 'center',
        }}
      >
        {item.category.toUpperCase()}
      </span>
      <code style={{ fontSize: '13px', color: '#e2e8f0', fontWeight: 600, minWidth: 220 }}>{item.name}</code>
      <span style={{ fontSize: '12px', color: '#94a3b8' }}>{item.description}</span>
    </motion.div>
  );
}

export function CommandsPage() {
  const [q, setQ] = useState('');
  const rows = COMMANDS.filter(
    (c) =>
      c.name.toLowerCase().includes(q.toLowerCase()) ||
      c.description.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div style={{ padding: '8px' }}>
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          fontSize: '22px',
          fontWeight: 700,
          marginBottom: '20px',
          background: 'linear-gradient(to right, #00d4ff, #a78bfa)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        ⌘ Commands
      </motion.h1>

      <GlassCard className="p-6 flex flex-col gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search commands…"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            padding: '8px 12px',
            color: '#e2e8f0',
            fontSize: '14px',
            outline: 'none',
            width: '100%',
            boxSizing: 'border-box',
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '480px', overflowY: 'auto' }}>
          {rows.map((item, i) => (
            <CommandRow key={item.name} item={item} index={i} />
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
