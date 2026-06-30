# Transcript Reconciliation — Sondra June 24 KPI/SLA Truth Set

**Date:** 2026-07-01 | **Owner:** Mel
**Inputs:** MasterPlan §4 · `kpi_truth_set.csv` · `sondra-june24-sla-audit.md` §6 · `Sondra_June24_KPI_Questions.md` · Newmont Delivery Planning transcript (findings relayed by Mel)

> **Evidence caveat:** The raw transcript text was not pasted into this session. Reconciliation applies (a) the explicit status directives Mel provided and (b) the one affirmative transcript finding Mel stated — first **Hiring Manager Review date captured at req level**. KPIs with no transcript text supplied are marked **NO_EVIDENCE** and keep their truth-set status. No status was upgraded on assumption.

---

## Reconciliation table

| KPI | Current truth-set status | Transcript evidence | Confidence | Updated status | Action |
|---|---|---|---|---|---|
| Time to Shortlist | NEEDS_CONFIRMATION | Transcript confirms a **first Hiring Manager Review date at req level** exists (per Mel) | TRANSCRIPT_CONFIRMED | **PARTIAL / BUILDABLE** | Build req-level: `Approved Date` → first HM Review date. Still confirm whether "HM Review" = Sondra's "1st candidate submitted / shortlist" |
| Time to Interview | MISMATCH | None supplied | NO_EVIDENCE | **MISMATCH** (preserved) | Re-anchor start `Application Date` → `Approved Date` |
| Time to Offer | VIOLATION | None supplied | NO_EVIDENCE | **VIOLATION** (preserved) | Re-anchor v6 `Date Created` → `Approved Date` before any other change |
| Time to Accept | MISMATCH | None supplied | NO_EVIDENCE | **MISMATCH** (preserved) | Re-anchor start `Offer Created Date` → `Approved Date`; pick one canonical accept-date field |
| Time to Start | MISMATCH | None supplied | NO_EVIDENCE | **MISMATCH** (preserved) | Build CR-scoped; re-anchor start `Offer Accept Date` → `Approved Date` (end field OK) |
| Candidate Disposition Reasons | NEEDS_CONFIRMATION | None supplied | NO_EVIDENCE | **NEEDS_CONFIRMATION** (preserved) | Confirm `Final Status` source + v6 equivalence |
| Candidate Time to Screen / BGC | BLOCKED | None supplied | NO_EVIDENCE | **BLOCKED** (preserved) | Confirm "Ready to Onboard" status/date exists |
| Source of Hire | GATED | None supplied | NO_EVIDENCE | **GATED** (preserved) | Confirm Source vs Source Details + taxonomy |
| DEI Gender Funnel | GATED | None supplied | NO_EVIDENCE | **GATED** (preserved) | Confirm join key, funnel stages, unknown-gender handling, privacy/small-cell |
| Time to Intake | BLOCKED | None supplied | NO_EVIDENCE | **BLOCKED** (preserved) | Source data missing (intake only in Notes) |
| Intake to Recruitment Agreement | BLOCKED | None supplied | NO_EVIDENCE | **BLOCKED** (preserved) | No confirmed Recruitment Agreement Date |
| Salary expectation analysis | BLOCKED | None supplied | NO_EVIDENCE | **BLOCKED** (preserved) | Field + policy approval missing |
| Termination timeline | BLOCKED | None supplied | NO_EVIDENCE | **BLOCKED** (preserved) | HRIS fields needed |
| Time to Advertise/Post | BLOCKED | None supplied | NO_EVIDENCE | **BLOCKED** (preserved) | Need Recruitment Agreement Date + Posting Date |

---

## Summary of changes
- **1 status changed:** Time to Shortlist → **PARTIAL / BUILDABLE** (only KPI with transcript-confirmed evidence).
- **13 statuses preserved:** no transcript text was supplied to support any change; VIOLATION and the three MISMATCH items explicitly held until v6 re-anchored to Approved Date.
- **Guardrails honored:** Time to Offer stays VIOLATION; Interview/Accept/Start stay MISMATCH.

## To strengthen this reconciliation
Paste the raw transcript (or the Teams AI summary). Per rule, any datapoint sourced only from the Teams AI summary will be marked **Confidence = AI_SUMMARY_ONLY**, not TRANSCRIPT_CONFIRMED.

---

## Update — 2026-07-01 (v6 MCP probe + transcript, hard evidence)

Status values now align to `kpi_truth_set.csv`. Evidence sources separated: raw transcript vs Teams AI summary vs v6 read-only probe. No status marked transcript-confirmed without raw transcript text.

| KPI | Updated status | Evidence basis | Confidence |
|---|---|---|---|
| Time to Shortlist | **PARTIAL_BUILDABLE** | Raw transcript: first candidate hitting **Hiring Manager Review** at req level. v6 probe: HM Review = 782 rows | TRANSCRIPT_CONFIRMED + MCP_CONFIRMED |
| Time to Interview | **MISMATCH_BUILDABLE** | v6 probe: `Interview to be Scheduled` = 327 rows; existing measure starts from Application Date | MCP_CONFIRMED (end-status choice NEEDS_CONFIRMATION) |
| Time to Offer | **VIOLATION** | v6 probe: measure uses Date Created; CD2_Offers has both Offer Created Date + Offer Approved Date | MCP_CONFIRMED. End = Offer Created Date is **AI_SUMMARY_ONLY** until raw transcript line exists |
| Time to Accept | **MISMATCH_CONFLICT_CHECK** | Wave 0 = Approved→Accept; Teams AI summary = Offer Created→Offer Accepted | **CONFLICT** — AI_SUMMARY_ONLY vs Wave 0; resolve before DAX |
| Time to Start | **MISMATCH_BUILDABLE** | Wave 0 logic Approved→Tentative Start Date; v6 measure starts from Offer Accept Date, not CR-scoped | MCP_CONFIRMED (re-anchor + text-date conversion needed) |
| Candidate Disposition | **NEEDS_FIELD_ALIGNMENT_IN_V6** | v6 probe: no exact Final Status field; proxy = Is Current Status + Application Status | MCP_CONFIRMED (proxy needs sign-off) |
| Time to Screen / BGC | **PARTIAL_BUILDABLE** | v6 probe: Ready to Onboard (343) + Hired (375) with Created Date | MCP_CONFIRMED (Offer Pre-Employment status absent) |
| Source of Hire | **GATED_DATA_MISSING_IN_V6** | v6 probe: no Source / Source Details fields | MCP_CONFIRMED |
| DEI Gender Funnel | **GATED_DATA_MISSING_IN_V6** | v6 probe: no Gender field / diversity table | MCP_CONFIRMED |
| 4.2 items (×5) | **BLOCKED** | Source data not present | unchanged |

**Guardrails honored:** Offer/Accept/Start/Source/DEI NOT marked transcript-confirmed (no raw transcript text for them). Approved Date preserved as SLA start from Wave 0. Time to Accept flagged as an explicit Wave 0 vs AI-summary conflict.

---

## Update — 2026-07-01 (Mel correction patch — Sondra notes are source of truth)

Mel confirmed Sondra's written notes + raw transcript override the Teams AI summary on the main definitions. Four corrections applied:

| KPI | Prior status | Corrected status | Reason |
|---|---|---|---|
| Time to Offer | VIOLATION (end = AI_SUMMARY_ONLY) | **VIOLATION** | Raw transcript confirms **Approved Date → Offer Created Date**. AI_SUMMARY_ONLY label removed. Status stays VIOLATION until v6 re-anchored from Date Created → Approved Date |
| Time to Accept | MISMATCH_CONFLICT_CHECK | **MISMATCH_BUILDABLE** | Sondra written note is the locked definition: **Approved Date → Candidate Accept Date**. Conflict resolved (written note wins over messy transcript wording). Re-anchor from Offer Created Date |
| Time to Screen / BGC | PARTIAL_BUILDABLE | **PARTIAL_BUILDABLE_NEEDS_CONFIRMATION** | Transcript wording cautious: "I think it's Ready to Onboard to Hired." Confirm before build |
| Source of Hire | GATED_DATA_MISSING_IN_V6 | **KPI_NOT_SLA_GATED_DATA_MISSING_IN_V6** | Transcript: Source of Hire is a **KPI, not an SLA**. v6 data still missing |

Unchanged: Shortlist PARTIAL_BUILDABLE · Interview MISMATCH_BUILDABLE · Start MISMATCH_BUILDABLE · Disposition NEEDS_FIELD_ALIGNMENT_IN_V6 · DEI GATED_DATA_MISSING_IN_V6 · five 4.2 items BLOCKED.

---
*Read-only reconciliation. No PBIX edits, no DAX created, no git commit. Last reviewed: 2026-07-01 | Owner: Mel*
