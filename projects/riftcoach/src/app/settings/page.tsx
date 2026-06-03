"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FREE_MODELS } from "@/lib/smart-router";

export default function SettingsPage() {
  const [keys, setKeys] = useState<string[]>(["", "", "", ""]);
  const [routerMode, setRouterMode] = useState<"auto" | "manual">("auto");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("riftcoach-settings");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.state?.keys) setKeys(parsed.state.keys);
        if (parsed.state?.routerMode) setRouterMode(parsed.state.routerMode);
      }
    } catch { }
  }, []);

  const handleSave = () => {
    try {
      const data = { state: { keys, routerMode }, version: 0 };
      localStorage.setItem("riftcoach-settings", JSON.stringify(data));
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch { }
  };

  const activeCount = keys.filter(k => k.trim()).length;

  return (
    <div className="min-h-screen p-6 max-w-4xl mx-auto">
      <Link href="/" className="text-sm text-indigo-400 hover:underline mb-4 inline-block">&larr; Back to Dashboard</Link>
      <h1 className="text-2xl font-bold text-white mb-6">⚙️ Settings</h1>

      {/* API Keys */}
      <div className="bg-slate-900 rounded-xl border border-slate-700/50 p-5 mb-6">
        <h2 className="text-white font-bold mb-1">OpenRouter API Keys</h2>
        <p className="text-xs text-slate-400 mb-4">
          Get your free key at <a href="https://openrouter.ai/keys" target="_blank" className="text-indigo-400 underline">openrouter.ai/keys</a>.
          You can use 1-4 keys. More keys = more daily requests (each key gets its own rate limit).
        </p>
        <div className="space-y-3">
          {keys.map((key, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-xs text-slate-500 w-16">Key {i + 1}</span>
              <input
                type="password"
                value={key}
                onChange={(e) => {
                  const newKeys = [...keys];
                  newKeys[i] = e.target.value;
                  setKeys(newKeys);
                }}
                placeholder="sk-or-v1-..."
                className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-300 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <span className={`text-xs ${key.trim() ? "text-emerald-400" : "text-slate-600"}`}>
                {key.trim() ? "Active" : "Empty"}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-3 text-xs text-slate-500">
          {activeCount} of 4 keys active &middot; Max capacity: ~{activeCount * 18 * 50} requests/day across all free models
        </div>
      </div>

      {/* Router Mode */}
      <div className="bg-slate-900 rounded-xl border border-slate-700/50 p-5 mb-6">
        <h2 className="text-white font-bold mb-3">Smart Router Mode</h2>
        <div className="space-y-2">
          <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer ${routerMode === "auto" ? "bg-indigo-500/10 border-indigo-500/50" : "border-slate-700 hover:border-slate-600"}`}>
            <input type="radio" checked={routerMode === "auto"} onChange={() => setRouterMode("auto")} className="accent-indigo-500" />
            <div>
              <div className="text-white font-medium text-sm">Auto (Recommended)</div>
              <div className="text-xs text-slate-400">Smart Router picks the best free model per task. Hot-swaps on rate limits. Prefers faster models during peak hours.</div>
            </div>
          </label>
          <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer ${routerMode === "manual" ? "bg-indigo-500/10 border-indigo-500/50" : "border-slate-700 hover:border-slate-600"}`}>
            <input type="radio" checked={routerMode === "manual"} onChange={() => setRouterMode("manual")} className="accent-indigo-500" />
            <div>
              <div className="text-white font-medium text-sm">Manual</div>
              <div className="text-xs text-slate-400">You choose which model to use for each task.</div>
            </div>
          </label>
        </div>
      </div>

      {/* Available Models */}
      <div className="bg-slate-900 rounded-xl border border-slate-700/50 p-5 mb-6">
        <h2 className="text-white font-bold mb-3">Available Free Models ({FREE_MODELS.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-64 overflow-y-auto">
          {FREE_MODELS.map((m) => (
            <div key={m.id} className="text-xs bg-slate-800/50 rounded p-2 flex items-center justify-between">
              <div>
                <span className="text-white font-medium">{m.name}</span>
                <span className="text-slate-500 ml-1">({m.provider})</span>
              </div>
              <div className="flex gap-1">
                {(m as any).strengths?.map((s: string) => (
                  <span key={s} className="px-1.5 py-0.5 rounded bg-slate-700 text-slate-300">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <button onClick={handleSave}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition">
        {saved ? "Saved!" : "Save Settings"}
      </button>
    </div>
  );
}
