# Newmont QIM — Wave 2A SHIPPED

## Scope
Costa Rica (CR) hiring funnel diagnostics, two new measures:
1. **Time to Interview** — avg days from application to first interview event
2. **HM:Interview Ratio** — funnel-honest conversion rate from Hiring Manager Review to Interview

## Source Files
- `W2A_CR_ReqIDs` (352 rows) — CR requisition IDs, isolated via `R1_Clean[Country] = "CR (Costa Rica)"`
- `W2A_Applicants_Workflow_CR` (8,726 rows, 340 distinct Job Req IDs) — workflow Excel (Applicants_Workflow_Dates_KF), filtered to CR reqs
- Underlying source: `Applicants_Workflow_Dates_KF_2026_06_15_18_16_56.xlsx` (repo `projects/newmont/data/`)
- Note: `R1_Clean` itself sources from a separate local Excel file (`report_All_Global_REQ_New_Report_KF.xlsx`), not the source PBIX — see anti-drift log.

## Measures Shipped

| Measure | Final Value | Format |
|---|---|---|
| CR Avg Time to Interview | **10.8 days** | `0.0` |
| CR HM:Interview Ratio | **39.9%** | `0.0` |

## Anti-Drift Lessons (5 caught)
1. Table name `Data - Applicants_status` has spaces around the dash — not `Data-Applicants_status`.
2. `Country` lives on `Lists - Locations`, not directly on the applicants/workflow table — requires relationship join.
3. `Data - All Reqs[Country]` does NOT contain "Costa Rica" — wrong table for CR isolation; true source is `R1_Clean[Country] = "CR (Costa Rica)"`.
4. `R1_Clean` is sourced from a local Excel file (`report_All_Global_REQ_New_Report_KF.xlsx`), not the source PBIX — different machine/path than expected.
5. `HM:Interview Ratio` v1 (68.4%) mixed independent populations (HM Review and Interview apps aren't the same cohort); v2 (39.9%) measures only applicants who passed through BOTH stages — funnel-honest.

## File Version
**v5.pbix** (local, not committed — Option A discipline: docs only, no .pbix in repo)

## Pending
- Step 2: Visuals for both measures
- Step 3: Wave 2B planning

## Page 07 Shipped
**Date:** 2026-06-22
**File:** v5.pbix saved locally (not committed)

### Layout
- 2 KPI cards: CR Avg Time to Interview (10.8d) + CR HM:Interview Ratio (39.9%)
- 3-stage funnel: 759 (HM Review) → 519 (Interview) → 1 (Live Interview)
- Top 15 HM bar chart: Zeng (13.0d, slowest) → Dobson (0.0d, fastest)
- Slicers: HM + BU (matches Page 06)

### New Measure
- `CR Distinct Apps Reaching Stage` = DISTINCTCOUNT(W2A_Applicants_Workflow_CR[Application ID]) = **5,359** (CR universe distinct apps, format `0`)

### Funnel Insight
- `Live Interview` status = 1 in CR scope — essentially F2F Interview only; the two-status `IN {"Face-to-Face Interview", "Live Interview"}` set is functionally a single-status filter for this country.

### Anti-Drift Logged
- Dobson = 0.0d average time to interview — flagged as a **data quality issue** for review, not a genuine fast-conversion outlier (likely single-application-date = interview-date pairing, needs source data check before trusting in reporting).

### Relationship Path Confirmed
- `W2A_Applicants_Workflow_CR[Job Req ID]` (Many, OneDirection) → `R1_Clean[Job Req ID]` (One) → `RD1_Details[Job Req ID]` (One, BothDirections)
- HM Last Name can flow RD1_Details → R1_Clean → W2A_Applicants_Workflow_CR via this path, though the first hop is OneDirection only.

### Format Fix
- `CR HM:Interview Ratio` format string corrected to `"0.0\%"` (displays as 39.9%, value unchanged at 39.92...)

## Measure Dictionary Updated
**Date:** 2026-06-22
**Action:** Appended rows 24-26 to Measure Dictionary calculated DATATABLE via Power BI MCP (partition_operations.Update with sourceType: "Calculated" + RefreshWithXMLA).

Row count: 23 → 26 (verified).

New rows:
- Row 24: Page 7 | CR Avg Time to Interview (10.8d)
- Row 25: Page 7 | CR HM:Interview Ratio (39.9%)
- Row 26: Page 7 | CR Distinct Apps Reaching Stage (5,359)

MCP technique logged: calculated DATATABLE rewrites require partition_operations.Update + RefreshWithXMLA, not table_operations.Update.
