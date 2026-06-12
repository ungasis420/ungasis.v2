# Task: Create scripts/aggregate-csv.js

Create a Node.js script at scripts/aggregate-csv.js that reads 3 CSVs from ../data/ and outputs ../src/lib/real-data.ts

## Input Files (all in ../data/ relative to scripts/)
1. report_All_Global_REQ_New_Report_KF.csv - main req data, 19292 rows, 38 columns
2. report_Posted_Requisitions_Global_KF.csv - posting data, 316 rows, 10 columns
3. report_On_hold_time_Audit_KF.csv - hold audit, 23709 rows, 7 columns

## CSV Parsing Rules
- Use ONLY built-in fs module, zero npm dependencies
- Handle quoted fields containing commas
- Handle multi-line values inside quotes (Notes column has line breaks)
- Trim all header names (some have trailing spaces)

## Output: write to ../src/lib/real-data.ts
Export a single const called realData with these sections:

totalRequisitions: total row count from Report 1
uniqueReqIds: count of distinct Job Req ID values

statusDistribution object with keys: filled, cancelled, open, onHold, pendingApproval (count of rows matching each Requisition Status)

fillRate: (filled / total) * 100, round 1 decimal
cancelRate: (cancelled / total) * 100, round 1 decimal

timeToFill object (from Filled reqs only): average, median, min, max (all round 1 decimal), count (how many had TTF data)

byFunction array: group by Function column, sorted desc by count, blanks become Unspecified, each item { name, count }
byCountry array: group by Career Site Filter Country, sorted desc, blanks become Unspecified, each item { name, count }
byEltMember array: group by ELT Member, sorted desc, blanks become Unspecified, each item { name, count }
byBusinessUnit array: group by Business Unit, sorted desc, blanks become Unspecified, each item { name, count }

postings object (Report 2): total row count, byStatus array grouped by Posting Status
holds object (Report 3): totalRecords row count, uniqueReqIds distinct count

openReqsAging object: filter to status Open only, group Age into: under30 (Age<30), between30and60 (30-59), between60and90 (60-89), over90 (90+)

## File Format
- Header comments with auto-generated timestamp and DO NOT EDIT warning
- Use: export const realData = { ... } as const;
- Print summary to console showing: total rows, filled count, fill rate, avg TTF
- Expected: 19292 total, 14205 filled, 73.6% fill rate, ~78 days avg TTF
- Zero npm dependencies. Exit 0 on success, 1 on error.
