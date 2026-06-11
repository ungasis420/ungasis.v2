import { create } from 'zustand';
import { Requisition, HoldEvent, Posting } from '@/types/newmont';

export interface DashboardState {
  requisitions: Requisition[];
  holdEvents: HoldEvent[];
  postings: Posting[];
  isLoaded: boolean;
  activeModule: string;
}

export interface DashboardActions {
  setRequisitions: (requisitions: Requisition[]) => void;
  setHoldEvents: (holdEvents: HoldEvent[]) => void;
  setPostings: (postings: Posting[]) => void;
  setActiveModule: (activeModule: string) => void;
  reset: () => void;
}

export type DashboardStore = DashboardState & DashboardActions;

const initialState: DashboardState = {
  requisitions: [],
  holdEvents: [],
  postings: [],
  isLoaded: false,
  activeModule: 'dashboard',
};

export const useDashboardStore = create<DashboardStore>((set) => ({
  ...initialState,
  setRequisitions: (requisitions) => set({ requisitions, isLoaded: true }),
  setHoldEvents: (holdEvents) => set({ holdEvents }),
  setPostings: (postings) => set({ postings }),
  setActiveModule: (activeModule) => set({ activeModule }),
  reset: () => set(initialState),
}));

// Computed Selectors (Exported Functions)
export const selectTotalReqs = (state: DashboardStore) => state.requisitions.length;

export const selectFillRate = (state: DashboardStore) => {
  const total = state.requisitions.length;
  if (total === 0) return 0;
  const filledOrClosed = state.requisitions.filter(
    (r) => r.requisitionStatus === 'Filled' || r.requisitionStatus === 'Closed'
  ).length;
  return filledOrClosed / total;
};

export const selectCancelRate = (state: DashboardStore) => {
  const total = state.requisitions.length;
  if (total === 0) return 0;
  const cancelled = state.requisitions.filter(
    (r) => r.requisitionStatus === 'Cancelled'
  ).length;
  return cancelled / total;
};

export const selectAvgTTF = (state: DashboardStore) => {
  const validReqs = state.requisitions.filter(
    (r) => r.timeToFill !== null && r.timeToFill !== undefined
  );
  if (validReqs.length === 0) return 0;
  const totalTTF = validReqs.reduce((sum, r) => sum + (r.timeToFill as number), 0);
  return totalTTF / validReqs.length;
};

export const selectOpenReqs = (state: DashboardStore) => {
  return state.requisitions.filter((r) => r.requisitionStatus === 'Open').length;
};

export const selectOnHold = (state: DashboardStore) => {
  return state.requisitions.filter((r) => r.requisitionStatus === 'On Hold').length;
};

export const selectTTFByCountry = (state: DashboardStore) => {
  const countryGroups: Record<string, { totalTTF: number; count: number }> = {};
  
  state.requisitions.forEach((r) => {
    const country = r.careerSiteFilterCountry || 'Unknown';
    if (r.timeToFill !== null && r.timeToFill !== undefined) {
      if (!countryGroups[country]) {
        countryGroups[country] = { totalTTF: 0, count: 0 };
      }
      countryGroups[country].totalTTF += r.timeToFill;
      countryGroups[country].count += 1;
    }
  });

  return Object.entries(countryGroups)
    .map(([country, data]) => ({
      country,
      avgTTF: data.count > 0 ? parseFloat((data.totalTTF / data.count).toFixed(1)) : 0,
    }))
    .sort((a, b) => b.avgTTF - a.avgTTF);
};

export const selectStatusDistribution = (state: DashboardStore) => {
  const counts: Record<string, number> = {};
  
  state.requisitions.forEach((r) => {
    const status = r.requisitionStatus || 'Unknown';
    counts[status] = (counts[status] || 0) + 1;
  });

  return Object.entries(counts).map(([status, count]) => ({
    status,
    count,
    name: status,
    value: count,
  }));
};
