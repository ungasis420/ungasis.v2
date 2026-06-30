# Sondra June 24 KPI/SLA List — Status & SLA-Start Audit

**Date:** 2026-06-30 (Manila) | **Owner:** Mel John Dimat
**Scope rule:** SLA start = **Approved Date** (NOT Created Date)
**Method:** Power BI MCP read-only inspection of the two open desktop models. No OneDrive/PBIX/CSV/XLSX files opened. No edits made.

---

## 1. The June 24 list itself — BLOCKED

**Status: BLOCKED — source list not present in any allowed location.**

Searched (read-only): `projects/newmont/docs`, `projects/newmont/tracking`, `docs/handoffs`.
The handoff trail ends **June 23** (Wave 2A Closeout / Wave 2B Kick). No file contains a dated "June 24" KPI/SLA list from Sondra.

The closest in-repo Sondra SLA scope is a quote in `docs/handoffs/# Newmont QIM — Phase 4 Wave 2 Kick.md`:
> "For any new visuals, focus on the SLAs we know we have: Time from app to interview, Time to offer, Time to accept (calendar days, candidate level)."

**Needed from Mel to unblock:** paste the June 24 list, or save it under
`projects/newmont/docs` or `projects/newmont/tracking`. The literal list lives in OneDrive (out of bounds per rules) or has not been shared yet.

Until then, the audit below covers the **known/shipped CR SLA measures** in the live v6 model so the Approved-Date check is already done when the list arrives.

---

## 2. SLA-start audit of live CR measures (v6 model)

Connected read-only to **Newmont - TA Dashboard - v6** (port 64101).
`R1_Clean` confirmed to hold BOTH date columns: **`Date Created`** (DateTime) and **`Approved Date`** (DateTime). `Approved Date` is available and even has an active date-table relationship — so anchoring SLAs on it is technically possible today.

| KPI / SLA measure | SLA start used (verified DAX) | Matches "Approved Date" rule? | Flag |
|---|---|---|---|
| **CR Avg Time to Offer** | `R1_Clean[Date Created]` → `CD2_Offers[Offer Created Date]` | ❌ NO — uses Created Date | **VIOLATION — must re-anchor to `Approved Date`** |
| **CR Avg TTF** | `AVERAGE(R1_Clean[Time to Fill])` — pre-computed source column; start anchor not visible in DAX | ❓ Unknown | **NEEDS CONFIRMATION** — confirm whether source `Time to Fill` starts at Approved or Created |
| **CR Avg Time to Accept** | `CD2_Offers[Offer Created Date]` → `[Offer Accept Date]` (candidate-level) | N/A — no req-start leg | OK (Approved Date not applicable) |
| **CR Avg Accept to Close** | `CD2_Offers[Offer Accept Date]` → `R1_Clean[Closed Date]` (per handoff) | N/A — no req-start leg | NEEDS CONFIRMATION of exact DAX next session |
| **CR Avg Time to Interview** | `[Application Date]` → first interview `Created Date` (candidate-level) | N/A — applicant funnel, not req SLA | OK (Approved Date not applicable) |
| **CR HM:Interview Ratio** | ratio, no duration | N/A | OK |

### Primary finding
**`CR Avg Time to Offer` breaks the rule.** It measures Created Date → Offer, but Sondra's definition requires **Approved Date → Offer**. The fix is a one-line swap of `RELATED(R1_Clean[Date Created])` for `RELATED(R1_Clean[Approved Date])` plus matching blank/negative guards. *(Not applied — read-only session; needs Mel's go-ahead.)*

### Secondary finding
**`CR Avg TTF`** depends on a source-precomputed `Time to Fill` column whose start anchor is invisible in the model. If Sondra's list includes Time to Fill under the Approved-Date rule, this must be confirmed against source logic before it can be trusted.

---

## 3. Open Power BI models seen (read-only)

| Model | Port | Tables | Measures |
|---|---|---|---|
| Newmont - TA Dashboard - v6 | 64101 | 28 | 41 |
| Talent Acquisition Dashboard_ work file | 51645 | 155 | 404 |

The production work file has Approved-Date-anchored measures already (`Time to Approve Reqs`/`TTA *`, `Approval Lag QTD Global`) — useful reference patterns when re-anchoring v6.

---

## 4. Next actions (when unblocked)
1. Mel provides the June 24 list (paste or save under docs/tracking).
2. Map each list item → live measure using the table above.
3. Re-anchor `CR Avg Time to Offer` to `Approved Date` (pending approval).
4. Confirm `CR Avg TTF` source anchor; confirm `CR Avg Accept to Close` DAX.

No candidate PII (names, emails, phones, salaries, IDs) included. PII columns in `R1_Clean` are model-hidden and were not read.

---

## 5. Verification log — 2026-07-01

**Pointer given:** read Section 4 ("Sondra Next-Phase KPI/SLA List") of `docs/QIM_NextPhase_MasterPlan_v1.md` and map its 9 build items + 5 blocked items.

**Result: file does NOT exist — STILL BLOCKED.**
Searched whole repo: no `QIM_NextPhase_MasterPlan_v1.md` under `projects/newmont/docs/` or anywhere; no file matching `*MasterPlan*` / `*NextPhase*`; no in-repo content referencing "Next-Phase KPI" or "Master Plan." Newest files in `docs/` are the June 22–23 wave-2A set.

This is the 3rd attempt to locate the source list (handoffs → June 24 grep → master plan). Per the 3-strike / "stop after 3 failed attempts" rule, pausing for Mel. The Section-2 Approved-Date audit stands and is unaffected.

**Unblock = one of:** create `docs/QIM_NextPhase_MasterPlan_v1.md` with Section 4, OR paste the 9 build + 5 blocked items here, OR name an existing file that actually holds the list.

### Update — 2026-07-01 (later)
`docs/QIM_NextPhase_MasterPlan_v1.md` now exists but contains **only the 2-line locked header** (Source + Status) and a blank line — **no Section 4 body yet**. Audit of v6 against Section 4 cannot run until the Wave 0 handoff pack body is appended. **STILL BLOCKED on the list body.** (The Section 2 Approved-Date audit, incl. the `CR Avg Time to Offer` = Date Created VIOLATION, remains valid and unchanged.)

### Update — 2026-07-01 (Section 4 saved — UNBLOCKED)
Section 4 ("Sondra June 24 KPI/SLA List") is now saved in `docs/QIM_NextPhase_MasterPlan_v1.md`: **9 build items (4.1)** + **5 unable-to-calculate items (4.2)** confirmed present. Full v6 audit follows in Section 6 below.

---

## 6. v6 audit vs Section 4 (9 build items) — 2026-07-01

Read-only MCP inspection of **Newmont - TA Dashboard - v6** (port 64101). DAX verified for each measure. SLA start rule = **`R1_Clean[Approved Date]`** (exists in model, ready to use). No PBIX edits, no measures created.

| KPI | Existing v6 measure | Current start field | Required start field | Current end field | Required end field | Status | Fix needed |
|---|---|---|---|---|---|---|---|
| 1. Time to Shortlist | *(none)* | — | `R1_Clean[Approved Date]` | — | 1st candidate submitted date | **BLOCKED** — no measure exists | Build measure; confirm "candidate submitted" event/date exists in CR workflow |
| 2. Time to Interview | `CR Avg Time to Interview` | `W2A_Applicants_Workflow_CR[Application Date]` | `R1_Clean[Approved Date]` | first interview `Created Date` | 1st interview date | **MISMATCH** — Application Date start | Re-anchor start to Approved Date (req-level join) |
| 3. Time to Offer | `CR Avg Time to Offer` | `R1_Clean[Date Created]` | `R1_Clean[Approved Date]` | `CD2_Offers[Offer Created Date]` | candidate Offer Date | **VIOLATION** — Date Created start | Swap start to `Approved Date`; confirm Offer Created Date = candidate Offer Date |
| 4. Time to Accept | `CR Avg Time to Accept` | `CD2_Offers[Offer Created Date]` | `R1_Clean[Approved Date]` | `CD2_Offers[Offer Accept Date]` | candidate Accept Date | **MISMATCH** — not Approved Date | Re-anchor start to Approved Date (end field OK) |
| 5. Time to Start | `CD2_Offers[Avg Time to Start]` *(not CR-scoped)* | `CD2_Offers[Offer Accept Date]` | `R1_Clean[Approved Date]` | `CD2_Offers[Tentative Start Date]` | tentative start date | **MISMATCH** — not Approved Date | Build CR-scoped version; re-anchor start to Approved Date (end field OK) |
| 6. Candidate Disposition Reasons | *(none)* | n/a (not a duration) | n/a | n/a | n/a — uses Final Status | **NEEDS CONFIRMATION** — "Final Status" field not confirmed in v6 (workflow has `Application Status`) | Confirm Final Status field/source, then build breakdown |
| 7. Time to Screen / BGC | *(none)* | — | `Ready to Onboard` status date | — | `Hired` status date | **BLOCKED** — no measure; status-date events not confirmed in CR workflow | Confirm Ready-to-Onboard + Hired status dates exist, then build |
| 8. Source of Hire | *(none)* | n/a | n/a | n/a | n/a | **GATED** — until Source vs Source Details confirmed | Probe Source / Source Details columns (CR coverage, distinct values) before build |
| 9. DEI Gender Funnel | *(none)* | n/a | n/a | n/a | n/a | **GATED** — until join key, funnel steps, missing-response handling confirmed | Confirm gender join key, funnel stages, blank-handling + Sondra privacy rules |

### Notes
- **Approved Date is available** in `R1_Clean` (DateTime, active date relationship) — every re-anchor fix is technically feasible today.
- **Items 3 & 4** both currently measure from non-Approved starts; #3 is the named existing finding (Date Created) and is preserved here.
- **Item 5** has no CR-scoped measure — only the global `CD2_Offers[Avg Time to Start]`.
- **4.2 items** (Time to Intake, Intake→Recruitment Agreement, Salary expectation, Termination timeline, Time to Advertise/Post) remain **BLOCKED / NEEDS MORE INFO** per Sondra's own list — not audited as buildable.
- No candidate PII read or written. No measures created. Read-only only.

---
*Read-only audit. SLA-start rule = Approved Date. Last reviewed: 2026-07-01 | Owner: Mel*

---
*Read-only audit. SLA-start rule = Approved Date. Last reviewed: 2026-07-01 | Owner: Mel*
