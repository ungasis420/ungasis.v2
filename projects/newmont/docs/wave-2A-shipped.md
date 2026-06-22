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
