// App-wide constants

export const APP_NAME = "RiftCoach";
export const PATCH_VERSION = "7.1d";
export const SEASON = 21;
export const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1/chat/completions";
export const APP_URL = "https://riftcoach.vercel.app";

// Navigation items
export const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: "LayoutDashboard", href: "/" },
  { id: "draft", label: "Draft Helper", icon: "Target", href: "/draft" },
  { id: "tierlist", label: "Tier List", icon: "Trophy", href: "/tierlist" },
  { id: "builds", label: "Builds", icon: "Hammer", href: "/builds" },
  { id: "items", label: "Items", icon: "Shield", href: "/items" },
  { id: "runes", label: "Runes", icon: "Gem", href: "/runes" },
  { id: "spells", label: "Spells", icon: "Zap", href: "/spells" },
  { id: "coach", label: "AI Coach", icon: "MessageSquare", href: "/coach" },
  { id: "review", label: "Match Review", icon: "BarChart3", href: "/review" },
  { id: "climb", label: "Climb Guide", icon: "TrendingUp", href: "/climb" },
  { id: "settings", label: "Settings", icon: "Settings", href: "/settings" },
] as const;

export const ROLES = [
  { id: "baron", label: "Baron Lane", icon: "⚔️" },
  { id: "jungle", label: "Jungle", icon: "🌿" },
  { id: "mid", label: "Mid Lane", icon: "🔮" },
  { id: "dragon", label: "Dragon Lane", icon: "🐉" },
  { id: "support", label: "Support", icon: "🛡️" },
] as const;
