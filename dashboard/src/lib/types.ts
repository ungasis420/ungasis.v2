export interface ParsedMarkdown {
  title: string;
  sections: { heading: string; content: string }[];
  tables: { headers: string[]; rows: string[][] }[];
  lists: string[];
  metadata: { lastReviewed?: string; owner?: string };
  rawContent: string;
  lineCount: number;
}

export interface DashboardData {
  pulse: {
    lastSession: string;
    pendingTasks: number;
    completedTasks: number;
    activeWarnings: number;
    activeProjects: { name: string; health: string }[];
    lastCommit: string;
    staleFiles: number;
  };
  queue: {
    pending: { task: string; priority: string }[];
    completed: { task: string }[];
  };
  quality: {
    scores: { date: string; file: string; score: number }[];
    average: number;
  };
  okrs: {
    objectives: {
      name: string;
      score: number;
      keyResults: { name: string; target: string; current: string; score: number }[];
    }[];
  };
  warnings: {
    active: { date: string; condition: string; severity: string; file: string }[];
  };
  portfolio: {
    projects: { name: string; status: string; health: string; state: string }[];
  };
}
