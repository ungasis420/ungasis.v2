"use client";

import React, { useState } from "react";

export default function Dashboard() {
  // Mock data representing what the data layer will load dynamically
  const [pulse] = useState({
    lastSession: "2026-06-03 03:50 AM",
    pendingTasks: 9,
    completedTasks: 8,
    activeWarnings: 0,
    activeProjects: [
      { name: "UNGASIS OS", health: "GOOD", state: "ACTIVE" },
      { name: "RiftCoach", health: "PAUSED", state: "PAUSED" },
      { name: "Newmont", health: "GOOD", state: "ACTIVE" }
    ],
    lastCommit: "F20b automation scripts completed",
    staleFiles: 0
  });

  const [queue] = useState([
    { task: "F20c: Form 2 Dashboard scaffold", priority: "HIGH", status: "In Progress" },
    { task: "F20d: High-Value Gaps (Event System, OKRs)", priority: "HIGH", status: "Pending" },
    { task: "F20e: Framework Gaps (Feedback, Git VC)", priority: "MEDIUM", status: "Pending" },
    { task: "F20f: Dashboard build (full implementation)", priority: "HIGH", status: "Pending" },
    { task: "Add staleness footers to remaining files", priority: "LOW", status: "Pending" }
  ]);

  const [okrs] = useState([
    {
      objective: "Ship RiftCoach MVP by August 2026",
      score: 0.2,
      krs: [
        { kr: "Build Engine with 10 champion builds", current: "0/10", score: 0.0 },
        { kr: "AI coaching rationale accuracy >90%", current: "60%", score: 0.3 },
        { kr: "Deploy to Cloudflare with <3s load time", current: "Not started", score: 0.0 }
      ]
    },
    {
      objective: "UNGASIS OS Production-Ready",
      score: 0.3,
      krs: [
        { kr: "Form 2 dashboard live at localhost", current: "Scaffold only", score: 0.1 },
        { kr: "3 automation scripts running daily", current: "3 running", score: 0.7 },
        { kr: "0 critical warnings for 30 days", current: "Day 1", score: 0.0 }
      ]
    }
  ]);

  const [warnings] = useState([
    { date: "2026-06-03", condition: "Staleness footer check", severity: "CLEAN", file: "All cleared" }
  ]);

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
            <span style={{ color: "#94a3b8" }}>Last Commit:</span> <strong style={{ color: "#00d4ff" }}>{pulse.lastCommit}</strong>
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
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {queue.map((q, idx) => (
              <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem", backgroundColor: "rgba(255, 255, 255, 0.02)", borderRadius: "8px", border: "1px solid rgba(255, 255, 255, 0.05)" }}>
                <div>
                  <div style={{ fontSize: "0.875rem", fontWeight: 600 }}>{q.task}</div>
                  <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>Priority: {q.priority}</div>
                </div>
                <span style={{
                  fontSize: "0.75rem",
                  padding: "0.25rem 0.5rem",
                  borderRadius: "4px",
                  backgroundColor: q.status === "In Progress" ? "rgba(0, 212, 255, 0.15)" : "rgba(255, 255, 255, 0.05)",
                  color: q.status === "In Progress" ? "#00d4ff" : "#94a3b8"
                }}>
                  {q.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Project Portfolio Card */}
        <section className="glass-card">
          <h2 style={{ fontSize: "1.25rem", color: "#00d4ff", marginBottom: "1rem" }}>📂 Portfolio & Lifecycle</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {pulse.activeProjects.map((p, idx) => (
              <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem", backgroundColor: "rgba(255, 255, 255, 0.02)", borderRadius: "8px", border: "1px solid rgba(255, 255, 255, 0.05)" }}>
                <div>
                  <div style={{ fontSize: "0.875rem", fontWeight: 600 }}>{p.name}</div>
                  <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>State: {p.state}</div>
                </div>
                <span style={{
                  fontSize: "0.75rem",
                  padding: "0.25rem 0.5rem",
                  borderRadius: "4px",
                  backgroundColor: p.health === "GOOD" ? "rgba(16, 185, 129, 0.15)" : "rgba(245, 158, 11, 0.15)",
                  color: p.health === "GOOD" ? "#10b981" : "#f59e0b"
                }}>
                  {p.health}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* OKR Framework Card */}
        <section className="glass-card" style={{ gridColumn: "span 1" }}>
          <h2 style={{ fontSize: "1.25rem", color: "#00d4ff", marginBottom: "1rem" }}>🎯 strategic OKRs</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {okrs.map((o, idx) => (
              <div key={idx} style={{ borderBottom: idx < okrs.length - 1 ? "1px solid rgba(255, 255, 255, 0.05)" : "none", paddingBottom: "1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <span style={{ fontWeight: 600, fontSize: "0.875rem" }}>{o.objective}</span>
                  <span style={{ color: "#a78bfa", fontWeight: 700 }}>Score: {o.score}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                  {o.krs.map((kr, kIdx) => (
                    <div key={kIdx} style={{ fontSize: "0.75rem", color: "#94a3b8", display: "flex", justifyContent: "space-between", padding: "0.25rem 0" }}>
                      <span>• {kr.kr}</span>
                      <span style={{ color: "#e2e8f0" }}>{kr.current} ({kr.score})</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* System Warnings Card */}
        <section className="glass-card" style={{ gridColumn: "span 1" }}>
          <h2 style={{ fontSize: "1.25rem", color: "#ef4444", marginBottom: "1rem" }}>⚠️ Health & Warning Monitor</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {warnings.map((w, idx) => (
              <div key={idx} style={{ padding: "0.75rem", backgroundColor: "rgba(16, 185, 129, 0.05)", borderRadius: "8px", border: "1px solid rgba(16, 185, 129, 0.2)", display: "flex", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "#10b981" }}>{w.condition}</div>
                  <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>{w.file}</div>
                </div>
                <span style={{ fontSize: "0.75rem", color: "#10b981", alignSelf: "center", fontWeight: 700 }}>{w.severity}</span>
              </div>
            ))}
          </div>
        </section>

      </div>

      <footer style={{ marginTop: "3rem", borderTop: "1px solid rgba(255, 255, 255, 0.05)", paddingTop: "1.5rem", textAlign: "center", fontSize: "0.75rem", color: "#94a3b8" }}>
        Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
      </footer>
    </div>
  );
}
