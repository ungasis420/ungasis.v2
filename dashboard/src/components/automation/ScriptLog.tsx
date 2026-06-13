import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../GlassCard';
import { ScriptLog as ScriptLogType } from '../../lib/types';

interface ScriptLogProps {
  logs: ScriptLogType[];
}

export function ScriptLog({ logs }: ScriptLogProps) {
  const displayLogs = [...logs].slice(0, 10);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <GlassCard className="p-6">
      <h2 className="text-xl font-semibold mb-4 text-white">Recent Script Logs</h2>
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="max-h-[400px] overflow-y-auto pr-2 space-y-3"
      >
        {displayLogs.map((log, i) => (
          <motion.div 
            key={log.script + log.timestamp + i} 
            variants={item}
            className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5"
            style={{ fontSize: '14px' }}
          >
            <div>
              <div className="font-medium text-white">{log.script}</div>
              <div className="text-white/60 text-xs">{log.timestamp} • {log.duration}</div>
            </div>
            <span
              className="px-3 py-1 rounded-full text-xs font-bold"
              style={{ 
                backgroundColor: log.result === 'pass' ? '#22c55e33' : '#ef444433',
                color: log.result === 'pass' ? '#22c55e' : '#ef4444' 
              }}
            >
              {log.result.toUpperCase()}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </GlassCard>
  );
}
