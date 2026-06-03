# UNGASIS Projects Directory

All projects built with UNGASIS live here.
Each subfolder is a self-contained app with its own stack.

## Active Projects

| # | Project | Folder | Stack | Status | Description |
|---|---------|--------|-------|:------:|-------------|
| 1 | RiftCoach | projects/riftcoach/ | Next.js 15, React 19, TS 5.8, Tailwind 4 | 🟡 Phase 5.5 | AI Wild Rift coaching app |
| 2 | Newmont | projects/newmont/ | HTML/CSS/JS (static) | ⏸️ Paused | Newmont Intelligence Dashboard v4.0 |

## How to Add a New Project

### Option 1: Manual scaffold
1. Create folder: projects/[project-name]/
2. Copy DNA genome: cp -r .ungasis/dna/genomes/[stack]/* projects/[project-name]/
3. Initialize: cd projects/[project-name] && npm init

### Option 2: Use /scaffold workflow
1. In Antigravity: /scaffold
2. Specify project name and stack
3. Agent creates folder with DNA genome applied

## Project Conventions
- Each project has its own package.json, .gitignore, src/
- Projects inherit UNGASIS context (agents can read ../.ungasis/, ../knowledge/)
- Each project can have its own .env (gitignored)
- Projects are committed to the UNGASIS repo (monorepo pattern)
- Deploy independently — each project has its own build/deploy pipeline

## Folder Structure

```
projects/
├── README.md          ← This file
├── riftcoach/         ← AI Wild Rift Coach Copilot
│   ├── package.json
│   ├── src/
│   └── ...
└── [new-project]/     ← Future projects
```

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
