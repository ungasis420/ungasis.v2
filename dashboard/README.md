# UNGASIS Form 2 Dashboard

Visual dashboard that reads UNGASIS markdown files and displays them visually. This is a minimal, premium glassmorphism user interface designed for personal operations tracking.

## Purpose
Provides a central command center representing the current state of UNGASIS OS, displaying:
- Task queue and sprint completions
- Project portfolio state and health metrics
- Quality score averages and logs
- Daily pulse stats and active warnings
- Momentum tracking and velocity trends

## Technology Stack
- **Framework**: Next.js 15 (App Router)
- **UI & Logic**: React 19, TypeScript 5.8
- **Styling**: Tailwind CSS 4 (using CSS variables and inline styles)
- **Components**: Recharts 2.15 (for visual analytics)

## Design Identity
- **Design DNA**: Glassmorphism
- **Base Background**: `#0a0a1a` (deep space violet)
- **Accent Color**: `#00d4ff` (cyan glow)
- **Secondary Color**: `#a78bfa` (soft purple)
- **Glass Background**: `rgba(255, 255, 255, 0.04)`
- **Glass Border**: `rgba(255, 255, 255, 0.1)`
- **Text Primary**: `#e2e8f0`
- **Text Secondary**: `#94a3b8`

## Data Source
This dashboard does **NOT** use a database. It reads and parses raw markdown files directly from the parent workspace directories (e.g., `../.ungasis/`, `../context/`, `../modules/`).

## How to Run
From the root workspace directory, run:
```bash
cd dashboard
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
