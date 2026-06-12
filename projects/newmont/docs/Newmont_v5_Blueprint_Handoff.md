# NEWMONT INTELLIGENCE COMMAND CENTER v5.0
## Master Architectural Blueprint, Build Specs & Handoff Document

> **Version:** v5.0 — Foreman Edition
> **Date:** 2026-06-11
> **Author:** M365 Copilot Opus (Architecture) + Mel John Dimat
> **Status:** READY FOR EXECUTION
> **Project Path:** `D:\.projects\ungasis\projects\newmont\`
> **Repository:** UNGASIS OS monorepo (`D:\.projects\ungasis`)

---

## TABLE OF CONTENTS

1. [Executive Summary](#1-executive-summary)
2. [Current State Assessment](#2-current-state-assessment)
3. [Target State Vision](#3-target-state-vision)
4. [Architecture](#4-architecture)
5. [Tech Stack](#5-tech-stack)
6. [Tool Stack & Workflow (Foreman Model)](#6-tool-stack--workflow-foreman-model)
7. [CLAUDE.md — Foreman Edition](#7-claudemd--foreman-edition)
8. [Data Model](#8-data-model)
9. [Key Metrics (from Actual Data)](#9-key-metrics-from-actual-data)
10. [SLA Rules (from SOW)](#10-sla-rules-from-sow)
11. [Module Specifications](#11-module-specifications)
12. [Sprint Roadmap](#12-sprint-roadmap)
13. [File & Folder Structure](#13-file--folder-structure)
14. [Design System](#14-design-system)
15. [Critical Constraints](#15-critical-constraints)
16. [Stakeholder Directory](#16-stakeholder-directory)
17. [Key Dates & Milestones](#17-key-dates--milestones)
18. [Handoff Prompt (for Fresh M365 Opus Window)](#18-handoff-prompt)
19. [Kickoff Prompt for Claude Code (Foreman)](#19-kickoff-prompt-for-claude-code)
20. [Antigravity Wave Prompts](#20-antigravity-wave-prompts)
21. [Agent Skills, Personas & Instructions](#21-agent-skills-personas--instructions)
22. [UNGASIS OS Integration](#22-ungasis-os-integration)
23. [Decision Log (ADRs)](#23-decision-log-adrs)
24. [Risks & Mitigations](#24-risks--mitigations)

---

## 1. Executive Summary

### Project Identity

| Field | Value |
|---|---|
| **Project** | Newmont Intelligence Command Center v5.0 |
| **Client** | Newmont Mining Corporation × Korn Ferry RPO |
| **Region** | Costa Rica (primary), Global (13 countries) |
| **Contract** | CW162992 — Feb 20, 2026 → Feb 20, 2028 |
| **Builder** | Mel John Dimat — Consultant, Reporting (Manila, EST hours) |
| **Lead** | Sondra Wozniak — Reporting Implementation & CI Lead (Milwaukee) |
| **Type** | Portable offline-first Single Page Application (no backend) |
| **Data Posture** | ALL data stays local (IndexedDB + localStorage). No cloud storage. |
| **IP** | Deliverables = Newmont IP per MSA §8 (work-for-hire) |

### What Is This?

A browser-based intelligence dashboard that transforms raw Newmont ATS data into actionable insights for the KF RPO team — covering requisition analytics, SLA tracking, field coverage gaps, freeze analysis, billing workbench, email intelligence, and posting analytics. It replaces manual spreadsheets and enables Sondra + team to prepare for QIM and client presentations with live, interactive data.

### Why v5.0?

v4.0 was a single-file static HTML dashboard (203KB). It showed the right data but couldn't:
- Import new CSV files dynamically
- Calculate SLAs from live data
- Search/filter across dimensions
- Export to PDF/XLSX
- Grow beyond a single page

v5.0 is a full Next.js application with 8 intelligence modules, a star-schema data engine, and offline-first architecture.

---

## 2. Current State Assessment

### What Exists (v4.0 — Completed May 28, 2026)

| Artifact | Location | Status |
|---|---|---|
| `dashboard_v3.html` / `kf_nm.html` | OneDrive/Desktop | ✅ Working (203KB static HTML) |
| `Newmont_Account_Intelligence_Command_Center_v4_Architectural_Blueprint_Build_Spec.md` | OneDrive | ✅ Complete (v4 blueprint) |
| `Newmont_v4_Source_Traceability_Blueprint.md` | OneDrive | ✅ Complete (anti-hallucination doc) |
| `Newmont_Account_Intelligence_Dossier_v2.1.md` | OneDrive | ✅ Complete (14 email threads, 4 chats) |
| `newmont_conversations_cross_check_pack.md` | OneDrive | ✅ Complete (source register) |
| `newmont_account_intelligence_three_build_artifacts.md` | OneDrive | ✅ Complete (data model + PBI + role specs) |
| 3 CSV data files | Local / to be copied to `data/` | ✅ Available |
| 1 XLSX mapping file | SharePoint (Manuel Kassis) | ✅ Available |
| `risks-actions.js` + other `data/*.js` files | OneDrive (v4 project) | ✅ Can be referenced |

### What's New in v5.0

| Component | v4.0 | v5.0 |
|---|---|---|
| Architecture | Single HTML file | Next.js 15 SPA with 8 modules |
| Data | Hardcoded JS objects | CSV import → IndexedDB (star schema) |
| Interactivity | View-only | Filter, search, drill-down, export |
| SLA Tracking | Static text | Live calculator from data |
| Field Coverage | Listed in text | 116-field interactive heatmap |
| Email Intel | Not present | Email parser, search, action tracker |
| Export | None | PDF, PNG, XLSX |
| Portability | Copy HTML file | `npm run build` → `dist/` folder |

### Data Files Available

| File | Rows | Columns | Contents |
|---|---|---|---|
| `report_All_Global_REQ_New_Report_KF.csv` | 19,292 | 38 | All requisitions (global, all statuses) |
| `report_On_hold_time_Audit_KF.csv` | 23,710 | 7 | Hold events (freeze/unfreeze timestamps) |
| `report_Posted_Requisitions_Global_KF.csv` | 317 | 10 | Posted requisitions (external postings) |
| `TA_Semantic_Model_Fields.xlsx` | 116 fields | 8 cols | Semantic model field mapping (3 sheets) |

### Data Files NOT YET Available (Design Placeholders)

| File | Expected Contents | Impact |
|---|---|---|
| Global Candidates report | Candidate pipeline, sources, dispositions | Blocks Candidate Analytics module |
| Applicants Workflow Dates report | Milestone timestamps per candidate | Blocks Time-to-Milestone SLAs |

---

## 3. Target State Vision

### 8 Intelligence Modules

| # | Module | Priority | Data Source | Key Deliverable |
|---|---|---|---|---|
| 1 | **Executive Dashboard** | 🔴 P1 | fact_requisitions | 6 hero KPIs + status donut + TTF chart |
| 2 | **Field Gap Command** | 🔴 P1 | dim_field_mapping | 116-field coverage heatmap (THE meeting tool) |
| 3 | **SLA/KPI Calculator** | 🔴 P1 | fact_requisitions + dim_sla_rules | Reportable vs "Cannot Calculate" matrix |
| 4 | **Requisition Analytics** | 🟡 P2 | fact_requisitions | Pipeline funnel, aging, workload, country drill-down |
| 5 | **Freeze Analysis** | 🟡 P2 | fact_hold_events | Hold duration, bounce rate, frozen reqs |
| 6 | **Posting Tracker** | 🟢 P3 | fact_postings | Posting status, channels, duration |
| 7 | **Email Intelligence** | 🟢 P3 | Manual paste / .eml import | Email search, action items, timeline |
| 8 | **Billing Workbench** | 🟢 P3 | fact_requisitions + dim_sla_rules | Fee calculator, invoice preview |

---

## 4. Architecture

### System Architecture (5 Layers)

```
┌─────────────────────────────────────────────────────┐
│ LAYER 1: PRESENTATION                               │
│ Next.js 15 App Router + React 19 + Tailwind CSS 4   │
│ Shadcn/ui components + Recharts + Glassmorphism      │
├─────────────────────────────────────────────────────┤
│ LAYER 2: STATE MANAGEMENT                           │
│ Zustand 5 stores (dataStore, uiStore, emailStore)   │
├─────────────────────────────────────────────────────┤
│ LAYER 3: BUSINESS LOGIC                             │
│ SLA Calculator | KPI Engine | Billing Calculator    │
│ Email Parser | Action Extractor | Search Engine      │
├─────────────────────────────────────────────────────┤
│ LAYER 4: DATA ENGINE                                │
│ Papa Parse (CSV) | SheetJS (XLSX) | DanfoJS (frames)│
│ Dexie.js (IndexedDB) | Fuse.js (search)             │
├─────────────────────────────────────────────────────┤
│ LAYER 5: STORAGE                                    │
│ IndexedDB (fact + dim tables) | localStorage (prefs)│
│ NO SERVER. NO CLOUD. ALL LOCAL.                      │
└─────────────────────────────────────────────────────┘
```

### Data Flow

```
CSV/XLSX files (drag-drop or file picker)
  → Papa Parse / SheetJS (parse to typed arrays)
    → Dexie.js (store in IndexedDB tables)
      → Zustand stores (reactive state for UI)
        → React components (render charts, tables, cards)
          → Export engine (PDF, PNG, XLSX)
```

---

## 5. Tech Stack

| Layer | Technology | Version | Purpose |
|---|---|---|---|
| **Framework** | Next.js | 15 | App Router, SSR, static export |
| **UI Library** | React | 19 | Component rendering |
| **Language** | TypeScript | 5.8 | Type safety |
| **Styling** | Tailwind CSS | 4 | Utility-first styling |
| **Components** | Shadcn/ui | latest | Pre-built accessible components |
| **State** | Zustand | 5 | Lightweight state management |
| **Charts** | Recharts | latest | Declarative chart components |
| **CSV Parser** | Papa Parse | latest | High-performance CSV parsing |
| **XLSX Parser** | SheetJS (xlsx) | latest | Excel file parsing |
| **DataFrames** | DanfoJS | latest | Pandas-like data manipulation |
| **Database** | Dexie.js | latest | IndexedDB wrapper |
| **Search** | Fuse.js | latest | Fuzzy search |
| **Dates** | date-fns | latest | Date math, business days |
| **PDF Export** | html2canvas + jsPDF | latest | Screenshot → PDF |
| **XLSX Export** | SheetJS | latest | Data → Excel export |
| **Testing** | Vitest | latest | Unit tests |

---

## 6. Tool Stack & Workflow (Foreman Model)

### Core Philosophy: Token-Efficient Orchestration

Claude Code is the **Foreman** (orchestrator), NOT the builder. It delegates bulk code generation to Antigravity (Gemini Flash agents) to preserve Claude Pro tokens. Claude Code ONLY does: terminal setup, prompt generation, integration, debugging, git commits, and QA.

**Token savings: ~89%** (19K Claude tokens vs 180K+ if Claude builds everything)

### Tool-to-Role Mapping

| Tool | Role | Cost | When Used |
|---|---|---|---|
| **M365 Copilot Opus** | 🧠 Architect — blueprints, enterprise data, sprint specs | Free (company) | Start + meeting prep + domain questions |
| **Claude Code CLI** | 🎖️ Foreman — setup, prompts, integrate, debug, commit | $20/mo (Pro) | Every phase (lean usage) |
| **Antigravity Agent Manager** | 🏭 Primary Builders — parallel component generation | Included (Google AI Pro) | Waves 1-3 (bulk generation) |
| **Google AI Studio** | 🔬 Data Validator — CSV analysis, calculation checks | Included (Google AI Pro) | P0 (data analysis), P2B + P4 (validation) |
| **Claude Design** | 🎨 Visual Designer — UI mockups, meeting materials | Included (Claude Pro) | Before Wave 2 (mockup), meeting prep (one-pager) |
| **Jules** | 🌙 Night Shift — async tests, docs, cleanup | Included (Google AI Pro) | Overnight (2:30-8:00 AM) |
| **ChatGPT Enterprise** | 💬 Second Opinion — tiebreaker, alt approaches | Free (company) | On-demand |

### Workflow Sequence

```
PHASE 0: SETUP
  🎖️ Claude Code → scaffold, install deps, create folders
  🔬 Google AI Studio → analyze CSVs, extract exact column specs

PHASE 1: WAVE 1 BUILD
  🎖️ Claude Code → generate 3 skinny prompts (from AI Studio data)
  🏭 Antigravity → 3 agents build: types, data engine, stores
  🎖️ Claude Code → integrate, fix imports, npm run dev, commit

PHASE 2A: DESIGN CHECKPOINT
  🎨 Claude Design → dashboard mockup (visual target for agents)

PHASE 2B: WAVE 2 BUILD
  🎖️ Claude Code → generate 3 skinny prompts (reference mockup)
  🏭 Antigravity → 3 agents build: field gap, dashboard, SLA calc
  🎖️ Claude Code → integrate, fix, commit
  🔬 Google AI Studio → validate SLA calculations against raw CSV

PHASE 3: WAVE 3 BUILD
  🎖️ Claude Code → generate 2 skinny prompts
  🏭 Antigravity → 2 agents build: req analytics, nav/layout
  🎖️ Claude Code → wire everything, npm run build, commit

SLEEP → 🌙 Jules: tests + README

PHASE 4: QA
  🔬 Google AI Studio → final data validation
  🎖️ Claude Code → bug fixes, final build, git tag

PHASE 5: MEETING PREP
  🎨 Claude Design → one-pager for Sondra
  🧠 M365 Opus → talking points from enterprise data
```

### Token Budget

| Phase | Claude Code Tokens | Antigravity Tokens | Your Effort |
|---|---|---|---|
| P0: Setup | ~2K | 0 | 15 min |
| P1: Wave 1 prompts + integration | ~4K | ~15K | 30 min |
| P2: Design + Wave 2 + integration | ~4K | ~18K | 45 min |
| P3: Wave 3 + integration | ~3K | ~10K | 20 min |
| P4: Full QA + fixes | ~5K | 0 | 30 min |
| P5: Build + commit + meeting prep | ~1K | 0 | 15 min |
| **TOTAL** | **~19K tokens** 🟢 | **~43K tokens** | **~2.5 hrs** |
