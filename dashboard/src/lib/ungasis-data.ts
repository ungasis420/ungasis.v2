import path from "path";
import fs from "fs";
import { parseMarkdownFile } from "./parse-markdown";
import { DashboardData } from "./types";

let WORKSPACE_ROOT = process.cwd();
if (!fs.existsSync(path.join(WORKSPACE_ROOT, ".ungasis"))) {
  const parent = path.resolve(WORKSPACE_ROOT, "..");
  if (fs.existsSync(path.join(parent, ".ungasis"))) {
    WORKSPACE_ROOT = parent;
  }
}

function getFilePath(relativeToWorkspace: string): string {
  return path.join(WORKSPACE_ROOT, relativeToWorkspace);
}

export async function getDashboardData(): Promise<DashboardData> {
  const data: DashboardData = {
    pulse: {
      lastSession: "Unknown",
      pendingTasks: 0,
      completedTasks: 0,
      activeWarnings: 0,
      activeProjects: [],
      lastCommit: "Unknown",
      staleFiles: 0
    },
    queue: {
      pending: [],
      completed: []
    },
    quality: {
      scores: [],
      average: 0
    },
    okrs: {
      objectives: []
    },
    warnings: {
      active: []
    },
    portfolio: {
      projects: []
    }
  };

  // Helper to read/parse safely
  const safeParse = (relPath: string) => {
    const fullPath = getFilePath(relPath);
    if (fs.existsSync(fullPath)) {
      return parseMarkdownFile(fullPath);
    }
    return null;
  };

  // 1. Parse Queue
  const queueParsed = safeParse(".ungasis/orchestrator/queue.md");
  if (queueParsed) {
    queueParsed.lists.forEach(item => {
      // e.g., "[ ] [NEXT] F20c: ..." or "[x] Batch 1: ..."
      if (item.startsWith("[ ]") || item.startsWith("-[ ]")) {
        const cleanTask = item.replace(/^-\s*\[\s*\]\s*/, "").replace(/^\[\s*\]\s*/, "").trim();
        const priority = cleanTask.includes("[HIGH]") ? "HIGH" : cleanTask.includes("[MEDIUM]") ? "MEDIUM" : "LOW";
        data.queue.pending.push({ task: cleanTask, priority });
      } else if (item.startsWith("[x]") || item.startsWith("-[x]")) {
        const cleanTask = item.replace(/^-\s*\[x\s*\]\s*/, "").replace(/^\[x\s*\]\s*/, "").trim();
        data.queue.completed.push({ task: cleanTask });
      }
    });
    data.pulse.pendingTasks = data.queue.pending.length;
    data.pulse.completedTasks = data.queue.completed.length;
  }

  // 2. Parse OKRs
  const okrsParsed = safeParse(".ungasis/okr/okr-current.md");
  if (okrsParsed) {
    // Process markdown tables to extract OKRs
    okrsParsed.tables.forEach((table, index) => {
      const objectiveHeading = okrsParsed.sections[index]?.heading || `Objective ${index + 1}`;
      const krs = table.rows.map(row => ({
        name: row[0] || "Unknown KR",
        target: row[1] || "",
        current: row[2] || "",
        score: parseFloat(row[3]) || 0
      }));
      const averageScore = krs.length > 0 ? krs.reduce((acc, k) => acc + k.score, 0) / krs.length : 0;

      data.okrs.objectives.push({
        name: objectiveHeading,
        score: parseFloat(averageScore.toFixed(2)),
        keyResults: krs
      });
    });
  }

  // 3. Parse Warnings
  const warningsParsed = safeParse(".ungasis/warnings/warning-log.md");
  if (warningsParsed) {
    warningsParsed.tables.forEach(table => {
      table.rows.forEach(row => {
        // e.g. | Date | Condition | Severity | File | Resolved? |
        if (row[4]?.toLowerCase() !== "yes" && row[0]) {
          data.warnings.active.push({
            date: row[0],
            condition: row[1] || "",
            severity: row[2] || "",
            file: row[3] || ""
          });
        }
      });
    });
    data.pulse.activeWarnings = data.warnings.active.length;
  }

  // 4. Parse Portfolio
  const portfolioParsed = safeParse(".ungasis/project-director/portfolio/portfolio-overview.md");
  if (portfolioParsed) {
    portfolioParsed.tables.forEach(table => {
      table.rows.forEach(row => {
        if (row[0]) {
          const name = row[0].replace(/\*\*/g, "").trim();
          const status = row[1] || "Unknown";
          const health = row[2] || "Unknown";
          const state = row[3] || "Unknown";
          data.portfolio.projects.push({ name, status, health, state });
          if (status.toLowerCase().includes("active")) {
            data.pulse.activeProjects.push({ name, health });
          }
        }
      });
    });
  }

  // 5. Parse Quality Log
  const qualityParsed = safeParse(".ungasis/quality/quality-log.md");
  if (qualityParsed) {
    let totalScore = 0;
    let count = 0;
    qualityParsed.tables.forEach(table => {
      table.rows.forEach(row => {
        if (row[0] && row[2]) {
          const score = parseFloat(row[2]) || 0;
          data.quality.scores.push({
            date: row[0],
            file: row[1] || "",
            score
          });
          totalScore += score;
          count++;
        }
      });
    });
    data.quality.average = count > 0 ? parseFloat((totalScore / count).toFixed(2)) : 0;
  }

  // 6. Parse Daily Pulse (Latest)
  const pulseParsed = safeParse(".ungasis/jarvis-core/daily-pulse-latest.md");
  if (pulseParsed) {
    // Extract metadata
    const dateLine = pulseParsed.rawContent.split("\n").find(line => line.includes("Date:"));
    if (dateLine) {
      data.pulse.lastSession = dateLine.replace("Date:", "").trim();
    }
  }

  return data;
}
