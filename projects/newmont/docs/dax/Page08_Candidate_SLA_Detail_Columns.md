# Page 08 — Candidate SLA Detail Export — Calculated Columns (TEXT ONLY)

**Date:** 2026-07-01 | **Owner:** Mel | **Model:** Newmont - TA Dashboard - v7
**Table:** `CD2_Offers` (row-level calculated columns)
**SLA start = `RELATED ( R1_Clean[Approved Date] )`** (DateTime — no conversion needed)

> DRAFT ONLY. No measures/columns created in Power BI, no PBIX edits, no raw files opened.
> Paste into Power BI Desktop manually only after sign-off.

---

## Design notes
- These are **calculated columns**, one value per `CD2_Offers` row (export detail), not aggregated measures.
- `RELATED ( R1_Clean[Approved Date] )` requires the active many-to-one relationship
  `CD2_Offers → R1_Clean`. Confirm that path exists before pasting.
- `CD2_Offers` date fields (`Offer Created Date`, `Offer Accept Date`, `Tentative Start Date`)
  are **Text-typed**, so each is wrapped in `DATEVALUE`.
- `DATEVALUE` **throws** on empty/invalid text and is **locale-dependent**. `IFERROR(..., BLANK())`
  catches both the empty-string case and any unparseable value → returns blank instead of erroring.
  **NEEDS CONFIRMATION:** source text format (`M/D/YYYY` vs `D/M/YYYY`); if ambiguous, swap
  `DATEVALUE` for an explicit parser once the format is locked.
- `DATEDIFF(start, end, DAY)` handles DateTime cleanly. No `Accepted`-only filter on the table —
  the Accept column gates per-row instead.

---

## 1. SLA Days - Offer  (Approved Date → Offer Created Date)
```dax
SLA Days - Offer =
-- Days from req Approved Date to the date the offer was created.
VAR StartDate = RELATED ( R1_Clean[Approved Date] )                       -- parent req approval (DateTime)
VAR EndDate   = IFERROR ( DATEVALUE ( CD2_Offers[Offer Created Date] ), BLANK () )  -- safe text→date
RETURN
    IF (
        ISBLANK ( StartDate ) || ISBLANK ( EndDate ),   -- blank if either end is missing or unparseable
        BLANK (),
        DATEDIFF ( StartDate, EndDate, DAY )
    )
```

## 2. SLA Days - Accept  (Approved Date → Offer Accept Date, Accepted only)
```dax
SLA Days - Accept =
-- Days from req Approved Date to offer acceptance.
-- Only returns a value for accepted offers with a real accept date.
VAR StartDate = RELATED ( R1_Clean[Approved Date] )
VAR EndDate   = IFERROR ( DATEVALUE ( CD2_Offers[Offer Accept Date] ), BLANK () )
RETURN
    IF (
        CD2_Offers[Offer Status] <> "Accepted"   -- gate: accepted offers only
            || ISBLANK ( StartDate )
            || ISBLANK ( EndDate ),
        BLANK (),
        DATEDIFF ( StartDate, EndDate, DAY )
    )
```
**NEEDS CONFIRMATION:** accept-date field — `CD2_Offers[Offer Accept Date]` (used here) vs
`[Candidate Offer Accept Date]`. Lock one canonical Text source.

## 3. SLA Days - Start  (Approved Date → Tentative Start Date)
```dax
SLA Days - Start =
-- Days from req Approved Date to the candidate's tentative start date.
VAR StartDate = RELATED ( R1_Clean[Approved Date] )
VAR EndDate   = IFERROR ( DATEVALUE ( CD2_Offers[Tentative Start Date] ), BLANK () )
RETURN
    IF (
        ISBLANK ( StartDate ) || ISBLANK ( EndDate ),
        BLANK (),
        DATEDIFF ( StartDate, EndDate, DAY )
    )
```
> Note: the Wave-1 *measure* set prefers the typed `RD2_StartDate[Tentative Start Date]` for
> Time-to-Start. Here we stay on `CD2_Offers[Tentative Start Date]` because this is a row-level
> column on the offer record itself (per Page 08 source rules). Negative results are left as-is
> (not floored) for the detail export so data-quality outliers stay visible.

---

## QA after pasting
1. **Conversion sanity:** spot-check 3 rows per column — compare the visible text date to the
   computed day count to confirm `DATEVALUE` parsed the locale format correctly.
2. **Blank handling:** rows with blank/invalid end dates must show blank, not 0 or an error.
3. **Accept gate:** `SLA Days - Accept` is blank for every non-`Accepted` row.
4. **Relationship:** confirm `RELATED` resolves (no blanks caused by a missing `CD2_Offers → R1_Clean` link).

---
*DAX draft only. No PBIX edits, no measures/columns created, no raw CSV/XLSX, no git commit. Last reviewed: 2026-07-01 | Owner: Mel*
