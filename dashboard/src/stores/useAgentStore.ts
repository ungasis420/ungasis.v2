import { create } from 'zustand';

export interface AgentInfo {
  name: string;
  persona: string;
  status: 'online' | 'offline';
  tools: string[];
  lastRun: string;
}

interface AgentStore {
  agents: AgentInfo[];
}

export const useAgentStore = create<AgentStore>(() => ({
  agents: [
    { name: 'Blueprint Architect', persona: 'Kitchen Planner', status: 'online', tools: ['read', 'search', 'web'], lastRun: 'today' },
    { name: 'Commander', persona: 'Head Chef', status: 'online', tools: ['read', 'search', 'run_command'], lastRun: 'today' },
    { name: 'Designer', persona: 'Plating Specialist', status: 'online', tools: ['read', 'write', 'search'], lastRun: 'today' },
    { name: 'Graphify Watchdog', persona: 'Graph Maintenance', status: 'offline', tools: ['shell', 'glob'], lastRun: 'yesterday' },
    { name: 'Quality Auditor', persona: 'Strict Reviewer', status: 'online', tools: ['read', 'search', 'glob'], lastRun: 'today' }
  ]
}));
