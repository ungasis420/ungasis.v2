/**
 * mock-jarvis-data.ts
 * Static mock data for Wave 3 dashboard pages (Wiki + Automation).
 * Used when live data sources are unavailable or for development.
 *
 * Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
 */
import type { ScheduledTask, ScriptLog } from '../lib/types';

// ── Wiki mock data ─────────────────────────────────────────────────────────

export interface WikiPageItem {
  title: string;
  path: string;
  category: string;
  lastEdited: string;
  wordCount: number;
  health: 'good' | 'stale' | 'needs-review';
}

export const mockWikiPages: WikiPageItem[] = [
  { title: 'JARVIS Blueprint',       path: 'knowledge/jarvis/blueprint.md',                         category: 'Core',     lastEdited: '2026-06-10', wordCount: 3200, health: 'good'         },
  { title: 'Token Efficiency Rules', path: '.clinerules/01-token-efficiency.md',                    category: 'Rules',    lastEdited: '2026-06-08', wordCount: 850,  health: 'good'         },
  { title: 'OKR Framework Q2',       path: '.ungasis/okr/okr-current.md',                           category: 'Strategy', lastEdited: '2026-05-30', wordCount: 1400, health: 'needs-review' },
  { title: 'Agent Workflows',        path: 'knowledge/sops/agent-workflows.md',                     category: 'SOPs',     lastEdited: '2026-06-01', wordCount: 2100, health: 'good'         },
  { title: 'Portfolio Overview',     path: '.ungasis/project-director/portfolio/portfolio-overview.md', category: 'Projects', lastEdited: '2026-06-12', wordCount: 600,  health: 'good'     },
  { title: 'Quality Scoring',        path: 'knowledge/quality/scoring.md',                          category: 'Quality',  lastEdited: '2026-04-15', wordCount: 900,  health: 'stale'        },
  { title: 'Research Feeds Config',  path: 'config/research-feeds.yaml',                            category: 'Config',   lastEdited: '2026-06-05', wordCount: 320,  health: 'good'         },
  { title: 'Copilot Instructions',   path: '.github/copilot-instructions.md',                       category: 'Core',     lastEdited: '2026-06-13', wordCount: 480,  health: 'good'         },
];

export const mockWikiHealth = {
  totalPages: 56,
  goodCount: 48,
  staleCount: 5,
  needsReviewCount: 3,
  healthScore: 86, // percent
};

// ── Automation mock data ───────────────────────────────────────────────────

export const mockScheduledTasks: ScheduledTask[] = [
  { name: 'daily-pulse',         schedule: 'Daily 07:00',  lastRun: '2026-06-13 07:00', status: 'active' },
  { name: 'warn-check',          schedule: 'Daily 09:00',  lastRun: '2026-06-13 09:00', status: 'active' },
  { name: 'research-feeds',      schedule: 'Mon/Wed/Fri',  lastRun: '2026-06-13 06:30', status: 'active' },
  { name: 'quality-score-batch', schedule: 'Weekly Sun',   lastRun: '2026-06-08 10:00', status: 'paused' },
  { name: 'graphify-rebuild',    schedule: 'Post-commit',  lastRun: '2026-06-13 11:02', status: 'error'  },
];

export const mockScriptLogs: ScriptLog[] = [
  { script: 'daily-pulse.py',              timestamp: '2026-06-13 07:00:12', duration: '1.2s',    result: 'pass' },
  { script: 'warn-check.py',               timestamp: '2026-06-13 09:00:08', duration: '0.8s',    result: 'pass' },
  { script: 'research-hn.py',              timestamp: '2026-06-13 06:30:45', duration: '4.5s',    result: 'pass' },
  { script: 'graphify-run.py',             timestamp: '2026-06-13 11:02:33', duration: 'timeout', result: 'fail' },
  { script: 'generate-copilot.py',         timestamp: '2026-06-13 11:02:35', duration: '0.3s',    result: 'pass' },
  { script: 'research-github.py',          timestamp: '2026-06-12 06:30:12', duration: '6.1s',    result: 'pass' },
  { script: 'quality-score.py',            timestamp: '2026-06-12 10:15:04', duration: '2.4s',    result: 'pass' },
  { script: 'session-recovery.py',         timestamp: '2026-06-11 19:45:22', duration: '0.9s',    result: 'pass' },
];

export const mockAutomationMetrics = {
  activeScripts: 3,
  scheduledTasks: mockScheduledTasks.length,
  selfHealRuns: 2,
};
