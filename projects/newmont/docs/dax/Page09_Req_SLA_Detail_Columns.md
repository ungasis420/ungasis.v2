# Page 09 — Req-Level SLA Detail Table — Field Spec (TEXT ONLY)

**Date:** 2026-07-02 | **Owner:** Mel | **Model:** Newmont - TA Dashboard - v7
**Page:** `09 Req-Level SLA Detail - DRAFT` | **Grain:** requisition (one row per Job Req ID)
**Source table:** `R1_Clean` only — no `CD2_Offers`, no other tables.

> SPEC ONLY. No PBIX edits, no semantic-model changes, no measures/columns/visuals created,
> no row-level DAX run. Verified against `R1_Clean.tmdl` metadata (column definitions), not data.

---

## 1. Field existence + safety

| Field | Exists? | Safe for Page 09 req table? | Reason | Recommended label |
|-------|:-------:|:---------------------------:|--------|-------------------|
| Requisition Status | ✅ exact | ✅ Yes | Categorical status, req grain, drives all KPI cards | Status |
| Country | ✅ exact | ✅ Yes | Geo dimension (renamed from `Career Site Filter Country`), non-sensitive | Country |
| Business Unit | ✅ exact | ✅ Yes | Org dimension, req grain | Business Unit |
| Function | ✅ exact | ✅ Yes | Org/job-family dimension, non-sensitive | Function |
| Job Title | ✅ exact | ✅ Yes | Role label, not a person; req grain | Job Title |
| Approved Date | ✅ exact | ✅ Yes | dateTime; SLA clock start; non-sensitive | Approved |
| Date Created | ✅ exact | ✅ Yes | dateTime; req open date | Created |
| Closed Date | ✅ exact | ✅ Yes | dateTime; req close date | Closed |
| Days_Open | ✅ exact | ✅ Yes | int64 (renamed from `Age`); aging metric | Days Open |
| Time to Fill | ✅ exact | ⚠️ Yes, with note | double; only meaningful for Filled reqs, blank/0 otherwise | Time to Fill (days) |
| Reason for Requisition | ✅ exact | ✅ Yes | Categorical (new/replacement); non-sensitive | Req Reason |
| ELT Member | ✅ exact | ⚠️ Yes, with note | Exec-org rollup; may contain an executive's name — OK for exec SLA reporting, not a recruiter/HM/candidate | ELT Member |

**All 12 proposed fields exist exactly and are safe for the req-level table.** None are
candidate-level, recruiter/HM/supervisor names, DEI, source-of-hire, notes, or salary.

## 2. Fields to AVOID on this table (present in `R1_Clean` but out of scope)

- `Job Req ID` — the grain key; keep it OUT of the visible column list (see grain caveat below).
- `Talent Acquisition First/Last Name`, `Hiring Manager First/Last name`,
  `Direct Supervisor First/Last Name` — person names; already `isHidden` in the model. Do not surface.
- `Notes` — free text; already `isHidden`. Do not surface.
- `Maximum / Mid-Point / Minimum Annual Base Salary` — compensation; already `isHidden`. Do not surface.
- `Candidate Progress` — candidate-stage field; belongs to candidate-grain pages (Page 08), not this req table.
- `SAP Position ID`, `Pay Grade`, `Pay Scale Group/Level`, `Job Location`, `Location`, `Location1`,
  `Template Name`, budget/direct-report Y/N flags — not requested and not needed for SLA detail; leave off.

## 3. Grain caveat (important design note)

A Power BI table visual **groups identical attribute rows together**. With `Job Req ID` removed from
the visible columns, two distinct requisitions that share the same Status/BU/Function/Title/dates would
**collapse into one row**, and `Days_Open` / `Time to Fill` would aggregate (default `sum`). To keep true
requisition grain without exposing the ID, do ONE of:

- **(Recommended)** Set the visual's column summarization for `Days_Open` and `Time to Fill` to
  **"Don't summarize"**, and rely on the date columns (`Created`/`Approved`/`Closed`) to keep rows
  distinct. Accept that exact-duplicate attribute rows may still merge (rare at this width).
- OR add `Job Req ID` to the visual but toggle it **hidden** (kept for uniqueness, not displayed) — only
  if a future change to the visible-column rule is approved. Not done here.

State the chosen approach at review before building.

## 4. Recommended column order (left → right)

1. Requisition Status  →  **Status**
2. Business Unit  →  **Business Unit**
3. Function  →  **Function**
4. Job Title  →  **Job Title**
5. Country  →  **Country**
6. ELT Member  →  **ELT Member**
7. Reason for Requisition  →  **Req Reason**
8. Date Created  →  **Created**
9. Approved Date  →  **Approved**
10. Closed Date  →  **Closed**
11. Days_Open  →  **Days Open**
12. Time to Fill  →  **Time to Fill (days)**

Dimensions first (status → org → geo → reason), then the three lifecycle dates, then the two aging metrics.

## 5. Exact Power BI Copilot prompt (creates ONLY this table)

> Paste into Copilot on page **`09 Req-Level SLA Detail - DRAFT`** after sign-off. Review the generated
> visual before keeping it — do not let Copilot add measures, other visuals, or fields beyond this list.

```
On the current page, create a single table visual titled "Req-Level SLA Detail".
Use ONLY columns from the R1_Clean table, in this exact order:
Requisition Status, Business Unit, Function, Job Title, Country, ELT Member,
Reason for Requisition, Date Created, Approved Date, Closed Date, Days_Open, Time to Fill.
Do not add any other fields, do not use any other table, and do not create any measures.
Set Days_Open and Time to Fill to "Don't summarize" so each requisition shows one row.
Rename the visible column headers to: Status, Business Unit, Function, Job Title, Country,
ELT Member, Req Reason, Created, Approved, Closed, Days Open, Time to Fill (days).
```

---

No row-level data returned.
No PBIX changes made.

*Spec draft only. Verified against R1_Clean.tmdl metadata. Last reviewed: 2026-07-02 | Owner: Mel*
