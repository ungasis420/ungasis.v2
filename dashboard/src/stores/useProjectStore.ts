import { create } from 'zustand';

export interface ProjectInfo {
  name: string;
  version: string;
  status: 'active' | 'complete' | 'planned';
  stack: string;
  nextMilestone: string;
}

interface ProjectStore {
  projects: ProjectInfo[];
}

export const useProjectStore = create<ProjectStore>(() => ({
  projects: [
    {
      name: 'UNGASIS OS',
      version: 'v6.0',
      status: 'active',
      stack: 'Python + Markdown + Git',
      nextMilestone: 'v6.0 Wave 3'
    },
    {
      name: 'Newmont',
      version: 'v6.8',
      status: 'active',
      stack: 'Vite + React + Tailwind + Zustand',
      nextMilestone: 'QIM demo June 18'
    },
    {
      name: 'RiftCoach',
      version: 'Phase 5.5-A',
      status: 'active',
      stack: 'Next.js',
      nextMilestone: 'Phase 6 Multi-Agent'
    }
  ]
}));
