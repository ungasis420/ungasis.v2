// Settings types

export interface AppSettings {
  keys: { key: string; label: string }[];
  modelAssignments: Record<string, string>;
  routerMode: "auto" | "manual";
  theme: "dark" | "light";
  patchVersion: string;
}
