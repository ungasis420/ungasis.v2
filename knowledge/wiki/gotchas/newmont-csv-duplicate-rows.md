---
source: Newmont project
created: 2026-06-13T04:44:19+00:00
tags: newmont, csv, duplicates, dedupe, job-req-id
---
# Newmont CSV Has Duplicate Rows

> Source: Newmont project

## Lesson
- **What happened:** Row counts and metrics were inflated because the source CSV contains duplicate records.
- **Root cause:** The export repeats rows for the same requisition. Raw count overstates the true number of jobs.
- **Fix applied:** Always deduplicate by **Job Req ID** before counting or aggregating. The correct unique total is **18,935** requisitions.
- **Prevention rule:** Never trust raw CSV row counts. Dedupe on the primary key (Job Req ID) as the first step of any data pipeline, then assert the expected unique count.

## Tags
#newmont #csv #duplicates #dedupe #job-req-id
