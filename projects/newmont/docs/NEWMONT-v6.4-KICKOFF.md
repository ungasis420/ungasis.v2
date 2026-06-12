@'
# NEWMONT v6.4 — AUTONOMOUS KICKOFF
## For Claude Code Foreman | Walk Away Build
---

## MISSION
Wire real CSV data to Executive Dashboard. Clean all invented/mock metrics.
Add "Sample Data" banners. Build, QA, commit. One session. No human input.

## CONTEXT FILES (read these FIRST)
1. docs/NEWMONT-CONTEXT-PACK.md — field mappings, SLA data, build rules
2. CLAUDE.md — token efficiency rules, architecture map
3. docs/Newmont_v6.3_MASTER_HANDOFF.md — full project state (section 11 = pending tasks)

## TASK LIST (do ALL, in order)

### Phase 1: Read Real CSV Headers (understand the data)
1. Read first 3 lines of data/report_All_Global_REQ_New_Report_KF.csv
2. Read first 3 lines of data/report_On_hold_time_Audit_KF.csv
3. Read first 3 lines of data/report_Posted_Requisitions_Global_KF.csv
4. Note the actual column names — these are the REAL field names

### Phase 2: Wire Real Data to Executive Dashboard
5. Update src/lib/data-engine.ts:
   - Parse report_All_Global_REQ_New_Report_KF.csv using PapaParse
   - Map CSV columns to dashboard fields per context pack section 5
   - Compute: Total Reqs, Fill Rate, Cancel Rate, Avg TTF, Open Reqs, On Hold
   - Compute: Country breakdown (group by Country column)
   - Compute: Req Status distribution (group by Requisition Status)
   - Export processed data to Zustand store

6. Update src/lib/data-engine.ts to also parse:
   - report_On_hold_time_Audit_KF.csv for hold analysis
   - Compute: Hold count, Avg hold duration, Hold aging buckets (0-30, 31-60, 61-90, 90+)
   - Compute: Holds by country

7. Update src/stores/dashboard.ts if needed to accept real data shape

8. Update src/lib/mock-data.ts:
   - Keep mock data as FALLBACK only (if CSV parsing fails)
   - Real data should take priority when available

### Phase 3: Clean Invented Metrics
9. In ExecutiveDashboard.tsx or Views.tsx (Hold Analysis section):
   - REMOVE "Reason for Hold" chart (Budget freeze, HM unavailable, etc.)
     OR replace with text: "Hold reason data not available — manual input required"
   - REMOVE "Reactivation Rate" metric (61%)
     OR replace with text: "Reactivation tracking not available"

10. In Views.tsx or wherever job family names appear:
    - Replace hardcoded names (Mining Ops, Process Plant, etc.)
    - Use actual "Function" values from the CSV data
    - If Function column not found, show "Job Function" as generic label

### Phase 4: Add Sample Data Banners
11. In CandidatePipeline.tsx:
    - Add banner at top: "⚠ Sample data shown — Candidate and Workflow reports not yet loaded"
    - Style: bg rgba(245,158,11,0.15) border rgba(245,158,11,0.3) rounded-xl p-3

12. For any section still using mock data after CSV wiring:
    - Add similar banner noting which data source is pending

### Phase 5: Cleanup
13. Delete src/components/modules/FieldGapCommand.tsx (orphaned, replaced by CandidatePipeline)
14. Remove any remaining imports/references to FieldGapCommand

### Phase 6: Build + QA
15. Run: cd D:\.projects\ungasis\projects\newmont && npm run build
    - Fix any TypeScript errors (max 3 retries)
    - Verify dist/index.html exists and is > 500KB

16. QA Checklist (verify in code, not browser):
    - [ ] data-engine.ts reads real CSV files
    - [ ] Executive Dashboard KPIs use real data (not hardcoded numbers)
    - [ ] Country breakdown uses real country values from CSV
    - [ ] Hold Analysis uses real freeze/unfreeze dates
    - [ ] No "Mining Ops" or invented job family names
    - [ ] No "Reactivation Rate" metric
    - [ ] No "Reason for Hold" chart (or labeled as manual input)
    - [ ] CandidatePipeline has sample data banner
    - [ ] SLAReportability still works (should be unaffected)
    - [ ] Build passes with 0 errors

### Phase 7: Commit
17. git add -A && git commit -m "feat(v6.4): wire real CSV data, clean invented metrics, add sample banners"

## RULES
- Surgical edits only — do NOT rewrite entire files
- Read files with Read tool, not cat/type commands
- Stop after 3 failed attempts on any single task — report and move on
- Do NOT modify SLAReportability.tsx or CandidatePipeline.tsx (except adding banner)
- Do NOT modify vite.config.ts
- Build from REAL path: D:\.projects\ungasis\projects\newmont (NOT junction)
- ALL colors as inline hex (never Tailwind color classes)
- One commit at the end, not multiple commits

## SUCCESS CRITERIA
- dist/index.html builds successfully
- Executive Dashboard shows REAL numbers from CSV
- No invented metrics remain
- Sample data banners on sections without real data
- Git committed with descriptive message
'@ | Set-Content "D:\.projects\ungasis\projects\newmont\docs\NEWMONT-v6.4-KICKOFF.md" -Encoding UTF8

Write-Host "Kickoff file created" -ForegroundColor Green