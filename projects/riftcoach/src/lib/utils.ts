import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function tierColor(tier: string): string {
  switch (tier) {
    case "S+": return "text-red-400 bg-red-400/10 border-red-400/30";
    case "S": return "text-orange-400 bg-orange-400/10 border-orange-400/30";
    case "A": return "text-emerald-400 bg-emerald-400/10 border-emerald-400/30";
    case "B": return "text-blue-400 bg-blue-400/10 border-blue-400/30";
    default: return "text-slate-400 bg-slate-400/10 border-slate-400/30";
  }
}

export function formatNumber(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(1) + "K";
  return n.toString();
}
