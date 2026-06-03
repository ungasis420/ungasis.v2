import React from "react";
import { getDashboardData } from "@/lib/ungasis-data";

export default async function Dashboard() {
  let data;
  try {
    data = await getDashboardData();
  } catch (error) {
    console.error("Failed to load dashboard data:", error);
    // Render fallback data structure in case of error
    data = {
      pulse: {
        lastSession: "Data unavailable",
        pendingTasks: 0,
        completedTasks: 0,
        activeWarnings: 0,
        activeProjects: [],
        lastCommit: "Data unavailable",
        staleFiles: 0
      },
      queue: { pending: [], completed: [] },
      quality: { scores: [], average: 0 },
      okrs: { objectives: [] },
      warnings: { active: [] },
      portfolio: { projects: [] }
    };
  }

  const {
    pulse = {
      lastSession: "Data unavailable",
      pendingTasks: 0,
      completedTasks: 0,
      activeWarnings: 0,
      activeProjects: [],
      lastCommit: "Data unavailable",
      staleFiles: 0
    },
    queue = { pending: [], completed: [] },
    quality = { scores: [], average: 0 },
    okrs = { objectives: [] },
    warnings = { active: [] },
    portfolio = { projects: [] }
  } = data;

  return (
    <div style={{ backgroundColor: "#0a0a1a", color: "#e2e8f0", minHeight: "100vh", padding: "2rem" }}>
      {/* Header */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", borderBottom: "1px solid rgba(255, 255, 255, 0.1)", paddingBottom: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "2rem", fontWeight: 700, margin: 0, background: "linear-gradient(to right, #00d4ff, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            UNGASIS Command Center
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "0.875rem", marginTop: "0.25rem" }}>
            Form 2 visual dashboard read-out • JARVIS-Complete Unified OS v5.0
          </p>
        </div>
        <div style={{ display: "flex", gap: "1rem", fontSize: "0.875rem" }}>
          <div className="glass-card" style={{ padding: "0.5rem 1rem", border: "1px solid rgba(0, 212, 255, 0.3)", borderRadius: "0.5rem" }}>
            <span style={{ color: "#94a3b8" }}>Last Commit:</span> <strong style={{ color: "#00d4ff" }}>{pulse.lastCommit || "Updated"}</strong>
          </div>
          <div className="glass-card" style={{ padding: "0.5rem 1rem", border: "1px solid rgba(167, 139, 250, 0.3)", borderRadius: "0.5rem" }}>
            <span style={{ color: "#94a3b8" }}>Pulse Check:</span> <strong style={{ color: "#a78bfa" }}>{pulse.lastSession}</strong>
          </div>
        </div>
      </header>

      {/* Grid Layout */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "1.5rem" }}>
        
        {/* Daily Pulse Card */}
        <section className="glass-card">
          <h2 style={{ fontSize: "1.25rem", color: "#00d4ff", marginBottom: "1rem", display: "flex", justifyContent: "space-between" }}>
            <span>⚡ Daily Pulse</span>
            <span style={{ fontSize: "0.75rem", padding: "0.25rem 0.5rem", borderRadius: "4px", backgroundColor: "rgba(0, 212, 255, 0.1)", color: "#00d4ff" }}>ACTIVE</span>
          </h2>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}>
                <td style={{ padding: "0.75rem 0", color: "#94a3b8" }}>Pending Tasks</td>
                <td style={{ padding: "0.75rem 0", textAlign: "right", fontWeight: 700, color: "#a78bfa" }}>{pulse.pendingTasks}</td>
              </tr>
              <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}>
                <td style={{ padding: "0.75rem 0", color: "#94a3b8" }}>Completed Tasks</td>
                <td style={{ padding: "0.75rem 0", textAlign: "right", fontWeight: 700, color: "#10b981" }}>{pulse.completedTasks}</td>
              </tr>
              <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}>
                <td style={{ padding: "0.75rem 0", color: "#94a3b8" }}>Active Warnings</td>
                <td style={{ padding: "0.75rem 0", textAlign: "right", fontWeight: 700, color: pulse.activeWarnings > 0 ? "#ef4444" : "#10b981" }}>{pulse.activeWarnings}</td>
              </tr>
              <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}>
                <td style={{ padding: "0.75rem 0", color: "#94a3b8" }}>Quality Avg</td>
                <td style={{ padding: "0.75rem 0", textAlign: "right", fontWeight: 700, color: "#00d4ff" }}>{quality.average}</td>
              </tr>
              <tr>
                <td style={{ padding: "0.75rem 0", color: "#94a3b8" }}>Stale Files</td>
                <td style={{ padding: "0.75rem 0", textAlign: "right", fontWeight: 700, color: "#f59e0b" }}>{pulse.staleFiles}</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Task Queue Card */}
        <section className="glass-card">
          <h2 style={{ fontSize: "1.25rem", color: "#00d4ff", marginBottom: "1rem" }}>📋 Queue Routing</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxHeight: "400px", overflowY: "auto" }}>
            {queue.pending.length === 0 ? (
              <div style={{ padding: "0.75rem", color: "#94a3b8", fontSize: "0.875rem" }}>No pending tasks in queue</div>
            ) : (
              queue.pending.map((q, idx) => (
                <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem", backgroundColor: "rgba(255, 255, 255, 0.02)", borderRadius: "8px", border: "1px solid rgba(255, 255, 255, 0.05)" }}>
                  <div>
                    <div style={{ fontSize: "0.875rem", fontWeight: 600 }}>{q.task}</div>
                    <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>Priority: {q.priority}</div>
                  </div>
                  <span style={{
                    fontSize: "0.75rem",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "4px",
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    color: "#94a3b8"
                  }}>
                    Pending
                  </span>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Project Portfolio Card */}
        <section className="glass-card">
          <h2 style={{ fontSize: "1.25rem", color: "#00d4ff", marginBottom: "1rem" }}>📂 Portfolio & Lifecycle</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {portfolio.projects.length === 0 ? (
              <div style={{ padding: "0.75rem", color: "#94a3b8", fontSize: "0.875rem" }}>No projects registered</div>
            ) : (
              portfolio.projects.map((p, idx) => (
                <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem", backgroundColor: "rgba(255, 255, 255, 0.02)", borderRadius: "8px", border: "1px solid rgba(255, 255, 255, 0.05)" }}>
                  <div>
                    <div style={{ fontSize: "0.875rem", fontWeight: 600 }}>{p.name}</div>
                    <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>State: {p.state} | Status: {p.status}</div>
                  </div>
                  <span style={{
                    fontSize: "0.75rem",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "4px",
                    backgroundColor: p.health?.toUpperCase() === "GOOD" ? "rgba(16, 185, 129, 0.15)" : "rgba(245, 158, 11, 0.15)",
                    color: p.health?.toUpperCase() === "GOOD" ? "#10b981" : "#f59e0b"
                  }}>
                    {p.health}
                  </span>
                </div>
              ))
            )}
          </div>
        </section>

        {/* OKR Framework Card */}
        <section className="glass-card" style={{ gridColumn: "span 1" }}>
          <h2 style={{ fontSize: "1.25rem", color: "#00d4ff", marginBottom: "1rem" }}>🎯 strategic OKRs</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {okrs.objectives.length === 0 ? (
              <div style={{ padding: "0.75rem", color: "#94a3b8", fontSize: "0.875rem" }}>No OKRs configured</div>
            ) : (
              okrs.objectives.map((o, idx) => (
                <div key={idx} style={{ borderBottom: idx < okrs.objectives.length - 1 ? "1px solid rgba(255, 255, 255, 0.05)" : "none", paddingBottom: "1rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                    <span style={{ fontWeight: 600, fontSize: "0.875rem" }}>{o.name}</span>
                    <span style={{ color: "#a78bfa", fontWeight: 700 }}>Score: {o.score}</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                    {o.keyResults.map((kr, kIdx) => (
                      <div key={kIdx} style={{ fontSize: "0.75rem", color: "#94a3b8", display: "flex", justifyContent: "space-between", padding: "0.25rem 0" }}>
                        <span>• {kr.name}</span>
                        <span style={{ color: "#e2e8f0" }}>{kr.current} ({kr.score})</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* System Warnings Card */}
        <section className="glass-card" style={{ gridColumn: "span 1" }}>
          <h2 style={{ fontSize: "1.25rem", color: "#ef4444", marginBottom: "1rem" }}>⚠️ Health & Warning Monitor</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {warnings.active.length === 0 ? (
              <div style={{ padding: "0.75rem", backgroundColor: "rgba(16, 185, 129, 0.05)", borderRadius: "8px", border: "1px solid rgba(16, 185, 129, 0.2)", color: "#10b981", fontSize: "0.875rem" }}>
                All systems clean. No warnings active.
              </div>
            ) : (
              warnings.active.map((w, idx) => (
                <div key={idx} style={{ padding: "0.75rem", backgroundColor: "rgba(239, 68, 68, 0.05)", borderRadius: "8px", border: "1px solid rgba(239, 68, 68, 0.2)", display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "#ef4444" }}>{w.condition}</div>
                    <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>{w.file}</div>
                  </div>
                  <span style={{ fontSize: "0.75rem", color: "#ef4444", alignSelf: "center", fontWeight: 700 }}>{w.severity}</span>
                </div>
              ))
            )}
          </div>
        </section>

      </div>

      <footer style={{ marginTop: "3rem", borderTop: "1px solid rgba(255, 255, 255, 0.05)", paddingTop: "1.5rem", textAlign: "center", fontSize: "0.75rem", color: "#94a3b8" }}>
        Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
      </footer>
    </div>
  );
}
