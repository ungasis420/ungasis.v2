# Wave 2A Anti-Drift Log

5 drifts caught and corrected during Wave 2A validation:

1. **Table name has spaces** — `Data - Applicants_status` (with spaces around the dash), not `Data-Applicants_status` as initially assumed. Caused a "table not found" error on first DAX query attempt.

2. **Country lives on `Lists - Locations`, not the applicants table** — `Data - Applicants_status` has no `Country` column. Country must be resolved via the relationship to `Lists - Locations[Country]` (joined on `Loc_Cons`).

3. **`Data - All Reqs[Country]` does NOT have Costa Rica** — this table has its own native `Country` column but its distinct values do not include Costa Rica. Filtering it (or `Lists - Locations[Country]`) for "Costa Rica" returns 1,044–1,090 rows — not the ~352 target. The correct source is `R1_Clean[Country] = "CR (Costa Rica)"` in v4.pbix, sourced from a different Excel extract entirely.

4. **R1_Clean sourced from local Excel, not source PBIX** — `R1_Clean`'s M partition points to `File.Contents("C:\Users\DIMATM\OneDrive - Korn Ferry\Desktop\newmont\report_All_Global_REQ_New_Report_KF.xlsx")`, a path on a different machine/user, not the source PBIX's data model and not the repo's `Applicants_Workflow_Dates_KF_*.xlsx`.

5. **HM:Interview Ratio v1 (68.4%) mixed populations** — original formula divided distinct Interview applicants by distinct HM Review applicants, but only 303 of 519 Interview applicants had ever passed through HM Review (216 reached Interview without an HM Review status row). v2 (39.9%) fixes this by using `INTERSECT` to count only applicants who reached BOTH stages, divided by the HM Review denominator — a funnel-honest conversion rate.
