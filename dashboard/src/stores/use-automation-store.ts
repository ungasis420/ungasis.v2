import { create } from 'zustand';
import { ScheduledTask, ScriptLog } from '../lib/types';

interface AutomationState {
  scheduledTasks: ScheduledTask[];
  scriptLogs: ScriptLog[];
  loadFromJson: () => void;
}

const mockTasks: ScheduledTask[] = [
  { name: 'Daily Backup', schedule: '0 0 * * *', lastRun: '2 hours ago', status: 'active' },
  { name: 'Data Sync', schedule: '*/30 * * * *', lastRun: '15 mins ago', status: 'error' },
];

const mockLogs: ScriptLog[] = [
  { script: 'sync_db.py', timestamp: '2026-06-13 10:00:00', duration: '45s', result: 'pass' },
  { script: 'clean_tmp.py', timestamp: '2026-06-13 09:30:00', duration: '12s', result: 'fail' },
];

export const useAutomationStore = create<AutomationState>((set) => ({
  scheduledTasks: [],
  scriptLogs: [],
  loadFromJson: () => {
    // Wave 4 will wire real JSON. For now, use mock data.
    set({
      scheduledTasks: mockTasks,
      scriptLogs: mockLogs
    });
  }
}));
