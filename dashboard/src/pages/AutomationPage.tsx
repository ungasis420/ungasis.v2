import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../components/GlassCard';
import { SchedulerStatus } from '../components/automation/SchedulerStatus';
import { ScriptLog } from '../components/automation/ScriptLog';
import { useAutomationStore } from '../stores/use-automation-store';
import { mockAutomationMetrics } from '../data/mock-jarvis-data';

const QUEUE = [
  { id: 1, task: 'generate-copilot-instructions --quiet', status: 'done',    agent: 'auto-trigger' },
  { id: 2, task: 'daily-pulse report',                    status: 'done',    agent: 'scheduler'    },
  { id: 3, task: 'warn-check sweep',                      status: 'running', agent: 'scheduler'    },
  { id: 4, task: 'research-feeds fetch',                  status: 'pending', agent: 'scheduler'    },
  { id: 5, task: 'graphify-rebuild (retry)',               status: 'pending', agent: 'auto-trigger' },
];
const SC: Record<string, string> = { done: '#22c55e', running: '#00d4ff', pending: '#94a3b8' };

function MetricCard({ icon, label, value, color }: { icon: string; label: string; value: number; color: string }) {
  return (
    <GlassCard className="p-5 flex flex-col items-center gap-2">
      <div style={{ fontSize: '26px' }}>{icon}</div>
      <div style={{ fontSize: '30px', fontWeight: 700, color, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: '12px', color: '#94a3b8', textAlign: 'center' }}>{label}</div>
    </GlassCard>
  );
}

function TaskQueue() {
  return (
    <GlassCard className="p-6">
      <h2 style={{ color: '#00d4ff', fontSize: '18px', fontWeight: 600, marginBottom: '12px' }}>⚙️ Task Queue</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {QUEUE.map((t, i) => { const c = SC[t.status]; return (
          <motion.div key={t.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', background: `${c}11`, border: `1px solid ${c}33`, borderRadius: '8px', padding: '8px 14px' }}>
            <span style={{ fontSize: '10px', padding: '2px 7px', borderRadius: '4px', background: `${c}22`, color: c, fontWeight: 700, minWidth: 52, textAlign: 'center' }}>{t.status.toUpperCase()}</span>
            <span style={{ fontSize: '13px', color: '#e2e8f0', flex: 1 }}>{t.task}</span>
            <span style={{ fontSize: '11px', color: '#94a3b8' }}>{t.agent}</span>
          </motion.div>
        ); })}
      </div>
    </GlassCard>
  );
}

export function AutomationPage() {
  const { scheduledTasks, scriptLogs, loadFromJson } = useAutomationStore();
  useEffect(() => { loadFromJson(); }, [loadFromJson]);
  const { activeScripts, scheduledTasks: taskCount, selfHealRuns } = mockAutomationMetrics;

  return (
    <div style={{ padding: '8px' }}>
      <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        style={{ fontSize: '22px', fontWeight: 700, marginBottom: '20px', background: 'linear-gradient(to right, #a78bfa, #00d4ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        🤖 Automation Forge
      </motion.h1>

      {/* Top row — 3 metric cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '20px' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.0 }}><MetricCard icon="⚡" label="Active Scripts"  value={activeScripts} color="#00d4ff" /></motion.div>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}><MetricCard icon="🗓" label="Scheduled Tasks" value={taskCount}     color="#a78bfa" /></motion.div>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}><MetricCard icon="🔧" label="Self-Heal Runs"  value={selfHealRuns}  color="#22c55e" /></motion.div>
      </div>

      {/* Mid row — TaskQueue */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ marginBottom: '20px' }}>
        <TaskQueue />
      </motion.div>

      {/* Bottom row — SchedulerStatus (6) + ScriptLog (6) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '20px' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={{ gridColumn: 'span 6' }}>
          <SchedulerStatus tasks={scheduledTasks} />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} style={{ gridColumn: 'span 6' }}>
          <ScriptLog logs={scriptLogs} />
        </motion.div>
      </div>
    </div>
  );
}
