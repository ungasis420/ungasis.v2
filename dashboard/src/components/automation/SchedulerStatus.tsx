import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../GlassCard';
import { ScheduledTask } from '../../lib/types';

interface SchedulerStatusProps {
  tasks: ScheduledTask[];
}

export function SchedulerStatus({ tasks }: SchedulerStatusProps) {
  const getStatusColor = (status: ScheduledTask['status']) => {
    switch (status) {
      case 'active': return '#22c55e';
      case 'paused': return '#f59e0b';
      case 'error': return '#ef4444';
      default: return '#9ca3af';
    }
  };

  return (
    <GlassCard className="p-6">
      <h2 className="text-xl font-semibold mb-4 text-white">Scheduled Tasks</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left" style={{ minWidth: '400px', fontSize: '14px' }}>
          <thead>
            <tr className="border-b border-white/10 text-white/60">
              <th className="pb-2 font-medium">Task Name</th>
              <th className="pb-2 font-medium">Schedule</th>
              <th className="pb-2 font-medium">Last Run</th>
              <th className="pb-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, i) => (
              <motion.tr 
                key={task.name + i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="border-b border-white/5 last:border-0"
              >
                <td className="py-3 text-white">{task.name}</td>
                <td className="py-3 text-white/80">{task.schedule}</td>
                <td className="py-3 text-white/80">{task.lastRun}</td>
                <td className="py-3">
                  <span
                    className="px-2 py-1 rounded-full text-xs font-medium"
                    style={{ 
                      backgroundColor: `${getStatusColor(task.status)}33`,
                      color: getStatusColor(task.status)
                    }}
                  >
                    {task.status.toUpperCase()}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
}
