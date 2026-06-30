# Wave 1 — Sondra SLA DAX Draft (TEXT ONLY)

**Date:** 2026-07-01 | **Owner:** Mel | **Model:** Newmont - TA Dashboard - v6
**Source of truth:** Sondra June 24 notes (`kpi_truth_set.csv`, `sondra-june24-sla-audit.md`, `transcript_reconciliation.md`)
**SLA start = `R1_Clean[Approved Date]`** for Shortlist, Interview, Offer, Accept, Start.

> DRAFT ONLY. No measures created in Power BI, no PBIX edits, no raw files opened. Paste into PBI manually only after Mel/Sondra sign-off. Source of Hire + DEI excluded from Wave 1 (data missing in v6).

---

## 1. Build order
1. Time to Offer fix (existing VIOLATION — highest priority)
2. Time to Accept fix (MISMATCH — Sondra note locked)
3. Time to Start fix (MISMATCH — CR-scope + typed date source)
4. Time to Interview re-anchor (MISMATCH)
5. Time to Shortlist new measure (PARTIAL_BUILDABLE)
6. BGC draft (PARTIAL_BUILDABLE_NEEDS_CONFIRMATION — build last, gated on sign-off)
7. QA checks
> Excluded from Wave 1: Source of Hire (KPI_NOT_SLA, no field in v6), DEI Gender Funnel (no gender/diversity table in v6).

## 2. Required fields (all confirmed present via MCP probe)
- `R1_Clean[Approved Date]` (DateTime), `[Country]`, `[Job Req ID]`, `[Date Created]`
- `CD2_Offers[Offer Created Date]`, `[Offer Accept Date]`, `[Offer Status]`, `[Tentative Start Date]` — **all Text-typed**
- `RD2_StartDate[Tentative Start Date]` (DateTime — preferred for Time to Start)
- `W2A_Applicants_Workflow_CR[Application Status]`, `[Created Date]` (DateTime), `[Job Req ID]`, `[Application ID]`
- CR filter everywhere: `R1_Clean[Country] = "CR (Costa Rica)"`

### Safe date conversion (CD2_Offers text dates)
`CD2_Offers` date columns are **Text**, so wrap each in `DATEVALUE(...)` before arithmetic. `DATEVALUE` is **locale-dependent** → **NEEDS CONFIRMATION** of the source text format (e.g. `M/D/YYYY` vs `D/M/YYYY`). If ambiguous, replace `DATEVALUE([col])` with an explicit parser once format is confirmed. `R1_Clean[Approved Date]` and the workflow `Created Date` are already DateTime — no conversion needed. Use `DATEDIFF(start, end, DAY)` throughout (handles DateTime cleanly).

---

## 3. Time to Offer fix  (VIOLATION → Approved Date start)
```dax
CR Avg Time to Offer (Approved) =
VAR _CR = CALCULATETABLE ( CD2_Offers, R1_Clean[Country] = "CR (Costa Rica)" )
VAR _Valid =
    FILTER (
        _CR,
        NOT ISBLANK ( CD2_Offers[Offer Created Date] )
            && NOT ISBLANK ( RELATED ( R1_Clean[Approved Date] ) )
            && DATEDIFF ( RELATED ( R1_Clean[Approved Date] ), DATEVALUE ( CD2_Offers[Offer Created Date] ), DAY ) >= 0
    )
RETURN
    AVERAGEX ( _Valid, DATEDIFF ( RELATED ( R1_Clean[Approved Date] ), DATEVALUE ( CD2_Offers[Offer Created Date] ), DAY ) )
```
Change vs current: start swapped from `R1_Clean[Date Created]` → `R1_Clean[Approved Date]`. End = `Offer Created Date` (transcript-confirmed). Expect the value to **drop** vs the old 47.08d (Approved Date is later than Created).

## 4. Time to Accept fix  (Sondra note locked: Approved → Candidate Accept Date)
```dax
CR Avg Time to Accept (Approved) =
VAR _CR =
    CALCULATETABLE ( CD2_Offers, R1_Clean[Country] = "CR (Costa Rica)", CD2_Offers[Offer Status] = "Accepted" )
VAR _Valid =
    FILTER (
        _CR,
        NOT ISBLANK ( CD2_Offers[Offer Accept Date] )
            && NOT ISBLANK ( RELATED ( R1_Clean[Approved Date] ) )
            && DATEDIFF ( RELATED ( R1_Clean[Approved Date] ), DATEVALUE ( CD2_Offers[Offer Accept Date] ), DAY ) >= 0
    )
RETURN
    AVERAGEX ( _Valid, DATEDIFF ( RELATED ( R1_Clean[Approved Date] ), DATEVALUE ( CD2_Offers[Offer Accept Date] ), DAY ) )
```
**NEEDS CONFIRMATION:** accept-date field — `CD2_Offers[Offer Accept Date]` (used here) vs `[Candidate Offer Accept Date]`. Pick ONE canonical source; both are Text. Accepted offers only.

## 5. Time to Start fix  (Approved → Tentative Start Date, CR-scoped)
```dax
CR Avg Time to Start (Approved) =
VAR _Reqs = CALCULATETABLE ( VALUES ( R1_Clean[Job Req ID] ), R1_Clean[Country] = "CR (Costa Rica)" )
VAR _WithDates =
    ADDCOLUMNS (
        _Reqs,
        "_Approved", CALCULATE ( MAX ( R1_Clean[Approved Date] ) ),
        "_Start",    CALCULATE ( MIN ( RD2_StartDate[Tentative Start Date] ) )
    )
VAR _Valid =
    FILTER ( _WithDates, NOT ISBLANK ( [_Approved] ) && NOT ISBLANK ( [_Start] ) && [_Start] >= [_Approved] )
RETURN
    AVERAGEX ( _Valid, DATEDIFF ( [_Approved], [_Start], DAY ) )
```
Uses **`RD2_StartDate` (typed DateTime)** — avoids text conversion. Fallback `CD2_Offers[Hired On]` only when Tentative Start Date is blank is **NEEDS CONFIRMATION** (Sondra note) — add later if approved.

## 6. Time to Interview re-anchor  (Application Date → Approved Date, req-level)
```dax
CR Avg Time to Interview (Approved) =
VAR _Reqs = CALCULATETABLE ( VALUES ( R1_Clean[Job Req ID] ), R1_Clean[Country] = "CR (Costa Rica)" )
VAR _WithDates =
    ADDCOLUMNS (
        _Reqs,
        "_Approved", CALCULATE ( MAX ( R1_Clean[Approved Date] ) ),
        "_FirstInterview",
            CALCULATE (
                MIN ( W2A_Applicants_Workflow_CR[Created Date] ),
                W2A_Applicants_Workflow_CR[Application Status] IN { "Face-to-Face Interview", "Live Interview" }
            )
    )
VAR _Valid =
    FILTER ( _WithDates, NOT ISBLANK ( [_Approved] ) && NOT ISBLANK ( [_FirstInterview] ) && [_FirstInterview] >= [_Approved] )
RETURN
    AVERAGEX ( _Valid, DATEDIFF ( [_Approved], [_FirstInterview], DAY ) )
```
**NEEDS CONFIRMATION:** end-status set. Current = `{Face-to-Face Interview, Live Interview}` (as built). Confirm whether `Interview to be Scheduled` (327 rows) should count as "hitting interview".

## 7. Time to Shortlist new measure  (Approved → first HM Review, req-level)
```dax
CR Avg Time to Shortlist =
VAR _Reqs = CALCULATETABLE ( VALUES ( R1_Clean[Job Req ID] ), R1_Clean[Country] = "CR (Costa Rica)" )
VAR _WithDates =
    ADDCOLUMNS (
        _Reqs,
        "_Approved", CALCULATE ( MAX ( R1_Clean[Approved Date] ) ),
        "_FirstHMR",
            CALCULATE (
                MIN ( W2A_Applicants_Workflow_CR[Created Date] ),
                W2A_Applicants_Workflow_CR[Application Status] = "Hiring Manager Review"
            )
    )
VAR _Valid =
    FILTER ( _WithDates, NOT ISBLANK ( [_Approved] ) && NOT ISBLANK ( [_FirstHMR] ) && [_FirstHMR] >= [_Approved] )
RETURN
    AVERAGEX ( _Valid, DATEDIFF ( [_Approved], [_FirstHMR], DAY ) )
```
Transcript-confirmed: first candidate hitting **Hiring Manager Review** at req level (782 rows in v6). **NEEDS CONFIRMATION** that HM Review = Sondra's "1st candidate submitted / shortlist".

## 8. BGC draft  (NEEDS CONFIRMATION — build last)
```dax
CR Avg Time to Screen BGC =
VAR _Apps = CALCULATETABLE ( VALUES ( W2A_Applicants_Workflow_CR[Application ID] ), R1_Clean[Country] = "CR (Costa Rica)" )
VAR _WithDates =
    ADDCOLUMNS (
        _Apps,
        "_RTO",   CALCULATE ( MIN ( W2A_Applicants_Workflow_CR[Created Date] ), W2A_Applicants_Workflow_CR[Application Status] = "Ready to Onboard" ),
        "_Hired", CALCULATE ( MIN ( W2A_Applicants_Workflow_CR[Created Date] ), W2A_Applicants_Workflow_CR[Application Status] = "Hired" )
    )
VAR _Valid =
    FILTER ( _WithDates, NOT ISBLANK ( [_RTO] ) && NOT ISBLANK ( [_Hired] ) && [_Hired] >= [_RTO] )
RETURN
    AVERAGEX ( _Valid, DATEDIFF ( [_RTO], [_Hired], DAY ) )
```
Transcript wording cautious ("I think it's Ready to Onboard to Hired"). Applicant-level. `Offer Pre-Employment` status absent in v6 (closest `Pre-Offer Verification`). **Do not ship without Sondra confirmation.**

---

## 9. QA checks after building
1. **Row coverage:** count reqs/apps surviving each `_Valid` filter vs total CR (352 reqs); flag if a measure drops a large share.
2. **No negatives:** every measure already guards `end >= start`; confirm zero negative durations.
3. **Blank handling:** confirm blank Approved Date / end date rows are excluded, not counted as 0.
4. **Regression vs current measures:** compare `CR Avg Time to Offer (Approved)` to old `CR Avg Time to Offer` (47.08d, Date Created start) — Approved-start value MUST be ≤ old. Document the delta.
5. **Text-date sanity:** spot-check 3 `DATEVALUE` conversions on `CD2_Offers` against the visible text to confirm the locale format is parsed correctly (the §2 NEEDS CONFIRMATION item).
6. **CR scope:** verify each measure respects `Country = "CR (Costa Rica)"` and returns blank (not global) when no CR rows.
7. **Accept-field decision:** once Sondra picks Offer Accept Date vs Candidate Offer Accept Date, re-run Time to Accept and lock.
8. **Interview end-status decision:** re-run Time to Interview if `Interview to be Scheduled` is added to the set.

---
*DAX draft only. No PBIX edits, no measures created, no raw CSV/XLSX, no git commit. Last reviewed: 2026-07-01 | Owner: Mel*
