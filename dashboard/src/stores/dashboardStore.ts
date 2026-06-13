import { create } from 'zustand';

export interface HealthData {
  wiki_health: number;
  script_count: number;
  graph_nodes: number;
  jarvis_score: number;
  timestamp: string;
}

interface DashboardState {
  health: HealthData | null;
  loading: boolean;
  error: string | null;
  fetchHealth: () => Promise<void>;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  health: null,
  loading: false,
  error: null,
  fetchHealth: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch('./data/health.json');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: HealthData = await res.json();
      set({ health: data, loading: false });
    } catch (err) {
      set({ error: String(err), loading: false });
    }
  },
}));
