export interface ScheduledTask {
  name: string;
  schedule: string;
  lastRun: string;
  status: 'active' | 'paused' | 'error';
}

export interface ScriptLog {
  script: string;
  timestamp: string;
  duration: string;
  result: 'pass' | 'fail';
}

// Wave 3 alias — ScriptLogEntry is the canonical name used by AutomationPage
export type ScriptLogEntry = ScriptLog;
