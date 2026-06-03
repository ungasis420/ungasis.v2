import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingsState {
  keys: string[];
  routerMode: "auto" | "manual";
  manualModels: Record<string, string>;
  setKey: (index: number, key: string) => void;
  setRouterMode: (mode: "auto" | "manual") => void;
  setManualModel: (task: string, model: string) => void;
  getActiveKeys: () => string[];
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      keys: ["", "", "", ""],
      routerMode: "auto",
      manualModels: {
        draft: "google/gemma-4-31b-it:free",
        build: "meta-llama/llama-3.3-70b-instruct:free",
        review: "nvidia/nemotron-3-super-120b-a12b:free",
        chat: "qwen/qwen3-next-80b-a3b-instruct:free",
      },
      setKey: (index, key) =>
        set((state) => {
          const keys = [...state.keys];
          keys[index] = key;
          return { keys };
        }),
      setRouterMode: (mode) => set({ routerMode: mode }),
      setManualModel: (task, model) =>
        set((state) => ({
          manualModels: { ...state.manualModels, [task]: model },
        })),
      getActiveKeys: () => get().keys.filter((k) => k.trim().length > 0),
    }),
    {
      name: "riftcoach-settings",
      partialize: (state) => ({
        keys: state.keys,
        routerMode: state.routerMode,
        manualModels: state.manualModels,
      }),
    }
  )
);
