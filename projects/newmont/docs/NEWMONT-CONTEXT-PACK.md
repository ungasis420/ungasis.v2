# NEWMONT COMMAND CENTER — CONTEXT PACK
## AI Agent Grounding Document | All Data Verified Against Source Documents
---
Last updated: 2026-06-12 | Review after QIM (June 18, 2026)

---

## 1. PROJECT OVERVIEW

| Field | Value |
|-------|-------|
| Project | Newmont Intelligence Command Center v6.x |
| Client | Newmont Mining Corp x Korn Ferry RPO |
| Countries | 13 (CRI, GHA, PNG, SUR, CHL, PER, AUS, DOM, MEX, CAN, USA, ECU, ARG) |
| Stack | React 19, TS 5.8, Vite 8, Zustand, Recharts, Tailwind 4 |
| Output | Standalone HTML via vite-plugin-singlefile (file:// protocol) |
| Build Path | D:\.projects\ungasis\projects\newmont (REAL - use for npm run build) |
| Junction | D:\nmwork (for agy CLI only - agy rejects dot-prefix paths) |
| QIM Deadline | June 18, 2026 |

Newmont mandated (April 2026): NO KF reporting in KF PowerBI or Foresight.
All data must stay in Newmont environments. Standalone HTML is the approved workaround.

---

## 2. STAKEHOLDERS

### Newmont (Client)
- Corey Leuders: TA Lead, KEY STAKEHOLDER, QIM audience. Dissatisfied with reporting gaps.
- Manuel Kassis: People Analytics, created 5 CORE reports + PBI semantic model.
- Doug Rolwood: People Analytics, PBI workspace admin. KF cannot access semantic model.
- Megan Heffernan: Advisor TA Global (Melbourne), access coordination.
- Darren Hewitt: Prior contractor. "Darren reports" benchmark. DO NOT share KF info with him.

### Korn Ferry
- Sondra Wozniak: Reporting Implementation Lead, SLA analysis author, v4 xlsx owner.
- Marco Garza: Director of Operations, QIM prep initiator.
- Patricia Helbig ("Patti"): Operations, QIM presenter.
- Mel John Dimat: Consultant Reporting (Manila), dashboard developer.
- Marvin Alfaro: Implementation PM, RAID log owner.

---

## 3. DATA ACCESS CONSTRAINTS

### KF CAN access:
- Raw ATS data via 5 CORE reports (CSV from SuccessFactors)
- TA Dashboard (view only)
- Newmont PBI workspace (view only)

### KF CANNOT:
- Store/process ATS data outside Newmont environment
- Access/modify PBI semantic model
- Connect from PBI Desktop or build KF-owned PBI reports
- Use Foresight data pipeline

---

## 4. FIVE CORE REPORTS (Manuel Kassis, April 2026)

| # | Report | Content | Local File |
|---|--------|---------|------------|
| 1 | All_Global REQ_New Report_KF | Req status | data/report_All_Global_REQ_New_Report_KF.csv (10.4 MB) |
| 2 | Posted_Requisitions_Global_KF | Posting info | data/report_Posted_Requisitions_Global_KF.csv (41 KB) |
| 3 | On hold time_Audit_KF | Freeze/unfreeze | data/report_On_hold_time_Audit_KF.csv (2.3 MB) |
| 4 | Global Candidates_KF | Candidate info | NOT YET IN PROJECT |
| 5 | Applicants_Workflow_Dates_KF | Workflow dates | NOT YET IN PROJECT |

---

## 5. FIELD MAPPING (Sondra v4 xlsx, June 12 2026)

### Requisition Fields (Available)
- Req ID -> Data - All Reqs.Job Req ID
- Position ID -> Data - All Reqs.SAP Position ID
- Job Title -> Data - All Reqs.Job Title
- Openings Total -> Data - All Reqs.Number of Openings
- Openings Filled -> Data - All Reqs.Openings Filled (DEPRECATED)
- Req Status -> Data - All Reqs.Requisition Status
- Created Date -> Data - All Reqs.Date Created
- Approved Date -> Data - All Reqs.Approved Date (recruiting start proxy)
- Closed Date -> Data - All Reqs.Closed Date
- Target Hire Date -> Data - Filled Positions.Tentative Start Date
- Country -> Data - All Reqs.Country
- Location -> Data - All Reqs.Location_Complete
- Hiring Manager -> Data - All Reqs.Hiring Manager First/Last Name
- Primary Recruiter -> Data - All Reqs.Talent Acquisition First/Last Name
- Business Unit -> Data - All Reqs.Business Unit
- Job Function -> Data - All Reqs.Function (USE THIS for job categories)
- Freeze/UnFreeze dates -> available for hold analysis

### Requisition Fields (MISSING - N/A per Newmont)
- Intake Meeting Date -> blocks Time to Assign, Time to Brief
- KF Assigned Date -> blocks Time to Advertise
- Recruitment Agreement Sent Date -> blocks Time to RA
- Req Shortlist Date -> blocks Time to Shortlist
- Job Req Fill Date -> blocks Close Req within 1 BD
- Job Req Close Reason -> cannot identify cancellation reason

### Candidate Fields (Available)
- Job Req ID, Candidate ID, Application ID
- Candidate Name, Current Status, Status Date
- Employee Type (Internal/External)
- Source Category, Source Detail

### Workflow Dates (Available - 12 stages)
1. Applied (Application Date)
2. Review Complete (Pipeline Status Change)
3. Screen Complete (Pipeline Status Change)
4. Assessment Complete (if applicable)
5. Selected for Interview (Pipeline Status Change)
6. Interview Scheduled (Pipeline Status Change)
7. Interview Complete (Pipeline Status Change)
8. Additional Interviews (if applicable)
9. Offer Created (reportable - "Can we use as Written Offer Extended?")
10. Offer Accepted (Data - Filled Positions.Offer Accept Date)
11. Ready for Hire (Pipeline Status Change)
12. Withdraw/Rejected (combined DQ/withdraw/rescind)

### Workflow Dates (MISSING)
- BGC Initiated/Complete -> blocks Time to Screen
- Actual Start Date -> cannot flag 6-day terminations

---

## 6. SLA REPORTABILITY

### CALCULABLE (Green)
| SLA | Formula | SOW Target |
|-----|---------|------------|
| Time to Fill | Approved Date -> Offer Accept Date (minus hold days) | 50 cal days |
| Fill Rate | Openings Filled / Total Openings | - |
| Cancel Rate | Cancelled / Total Reqs | - |
| Hold Duration | UnFreeze Date - Freeze Date | - |
| Pipeline Stage Times | Workflow status dates | - |
| Req Aging | Today - Created Date (open reqs) | 60-day trigger |

### PENDING (Yellow - awaiting confirmation)
| SLA | Workaround |
|-----|-----------|
| Time to Offer | Use Offer Created Date instead of Written Offer Extended |
| Offer Acceptance Rate | Same workaround |

### BLOCKED (Red - data not available)
| SLA | Missing Field |
|-----|---------------|
| Time to Assign | Intake Meeting Date |
| Time to Advertise | KF Assigned Date |
| Time to Brief | Intake Meeting Date |
| Assign to Intake | Both dates |
| Intake to RA | Both dates |
| Time to Shortlist | Req Shortlist Date |
| Time to Interview | KF Assigned flag |
| Close Req 1 BD | Job Req Fill Date |
| Time to Screen BGC | BGC Init/Complete Dates |

---

## 7. QIM TASKS (June 12, 2026 meeting with Sondra)

1. Mel: Explore raw exports in ATS (SuccessFactors CORE)
2. Sondra: Explore in PBI, reach out to ops team for owned reqs
3. Sondra: Reach out to client re candidate export issues
4. Both: Create SLA scorecards (start with req-level detail table)
5. Long-term: Executive Summary in PBI (may not hit June 18)

---

## 8. BUILD RULES

### Data Rules
- NEVER store raw Newmont data in KF systems
- Label mock data: "Sample data - pending CORE export integration"
- Use Function field for job categories (NOT invented names like Mining Ops)
- 13 countries: CRI, GHA, PNG, SUR, CHL, PER, AUS, DOM, MEX, CAN, USA, ECU, ARG

### Visual Rules
- Background: #0a0a1a
- Glass: rgba(255,255,255,0.04) backdrop-blur-xl border rgba(255,255,255,0.10)
- Accent: #00d4ff | Success: #22c55e | Warning: #f59e0b | Danger: #ef4444
- ALL colors as inline hex (never Tailwind color classes)
- Font: Inter (system-ui fallback). Tabular numbers.

### Build Rules
- Build from REAL path: D:\.projects\ungasis\projects\newmont
- agy uses junction D:\nmwork only
- Never let agy run git commands
- Components are framework-agnostic React

### What NOT to Build
- NO Coverage Intelligence / Sourcing Coverage (no field supports this)
- NO Hold Reasons (no Hold_Reason field exists)
- NO Reactivation Rate (no field tracks transitions)
- NO invented job family names (use Function field)

---

## 9. EXISTING COMPONENTS (as of v6.2)

| Component | Path | Status |
|-----------|------|--------|
| AppShell | src/components/layout/AppShell.tsx | Layout wrapper with sidebar |
| Sidebar | src/components/layout/Sidebar.tsx | Navigation sidebar |
| Dashboard | src/components/Dashboard.tsx | Main dashboard orchestrator |
| ExecutiveDashboard | src/components/modules/ExecutiveDashboard.tsx | KPI cards + charts |
| FieldGapCommand | src/components/modules/FieldGapCommand.tsx | REPLACE with CandidatePipeline |
| ReqAnalytics | src/components/modules/ReqAnalytics.tsx | Requisition analytics |
| SLACalculator | src/components/modules/SLACalculator.tsx | Existing SLA view |
| Charts | src/components/Charts.tsx | Chart components |
| Views | src/components/Views.tsx | View routing |
| Icons | src/components/Icons.tsx | Icon components |
| TweaksPanel | src/components/TweaksPanel.tsx | Settings panel |

### Key Stores and Libraries
| File | Purpose |
|------|---------|
| src/stores/dashboard.ts | Zustand store for dashboard state |
| src/lib/data-engine.ts | CSV parsing + data processing |
| src/lib/field-gap-data.ts | Field gap definitions (UPDATE with v4 mapping) |
| src/lib/mock-data.ts | Mock data fallbacks |
| src/types/newmont.ts | TypeScript type definitions |

### Data Files (REAL Newmont data)
| File | Size | Content |
|------|------|---------|
| data/report_All_Global_REQ_New_Report_KF.csv | 10.4 MB | All requisitions |
| data/report_On_hold_time_Audit_KF.csv | 2.3 MB | Hold/freeze data |
| data/report_Posted_Requisitions_Global_KF.csv | 41 KB | Posted reqs |
| data/TA Semantic Model_Fields.xlsx | 34 KB | Field reference |

---

## 10. SOW KEY NUMBERS

| Item | Value |
|------|-------|
| Contract | CW162992, Feb 2026 - Feb 2028 |
| Monthly Fee | US $22,000/mo |
| Close Fee | US $830 per written offer acceptance |
| Time to Fill Target | 50 calendar days |
| SLA Adherence | 90% monthly |
| Offer Acceptance | 85% |
| Guarantee | 6 business days, full no-cost replacement |

---
End of Context Pack
