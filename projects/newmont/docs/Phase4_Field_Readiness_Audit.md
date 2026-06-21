# Phase 4 Field Readiness Audit

Source: live MCP read of open `Newmont - TA Dashboard - 2026-06-18 v1.pbix` (R1_Clean, CD2_Offers, R2_Posted, R3_OnHold, OnHold_Validated, RD1_Details, RD2_StartDate).

| Requirement | Candidate tables/fields | Status | Risk | Next action |
|---|---|---|---|---|
| Costa Rica filtering | `R1_Clean[Country]`, `RD1_Details[Country]`, `RD1_Details[Region]`, `OnHold_Validated[Career Site Filter Country]` | Ready | Low — 4 overlapping country fields, must pick one source of truth | Confirm which Country field Sondra treats as canonical |
| Hiring Manager comparison | `R1_Clean[Hiring Manager First/Last Name]` (hidden), `RD1_Details[Hiring Manager First/Last Name]` (visible) | Partially ready | Medium — duplicate HM fields across 2 tables, R1_Clean copy is hidden | Unhide or standardize on RD1_Details version; verify name match rate |
| Business Unit comparison | `R1_Clean[Business Unit]`, `RD1_Details[Business Unit]` | Ready | Low — duplicate across tables, same risk pattern as HM | Pick one canonical BU column |
| SLA measures (existing) | `R1_Clean` measures: Avg TTF, Fill Rate, Cancel Rate, Aged 60 Plus, On Hold Count, Avg Days Open; `CD2_Offers`: Avg Time to Accept, Avg Time to Start; `_Measures` table: Avg/Median/Max Hold Days | Ready | Low — these already exist and are live | None — usable as-is for Phase 4 SLA base |
| Source of Hire | No matching column in any of the 7 tables (no "Source", "Channel", "Referral", or "Job Board" field beyond `R2_Posted[Board ID]`) | Missing field | High — entire requirement unsupported by current model | Needs stakeholder clarification — ask Sondra/Manuel if a Source-of-Hire report exists in CORE |
| Female candidate funnel % | No gender/sex column found in any of the 7 tables | Missing field | High — no candidate demographic data ingested at all | Needs stakeholder clarification — confirm if Newmont CORE even captures this field, and data-privacy implications |
| Application date | No "Application Date" column; `OnHold_Validated[Application Status]` exists (status only, no date) | Missing field | Medium — status exists but no timestamp to calculate from | Needs stakeholder clarification — ask for Candidate/Application report with dates (previously flagged as Reports 4+5 in past handoffs) |
| Interview date | No interview-stage column in any of the 7 tables | Missing field | High | Needs stakeholder clarification — same missing-report gap as Application date |
| Offer date | `CD2_Offers[Offer Created Date]`, `[Offer Approved Date]` | Ready | Low — both stored as String, not DateTime (needs type cast) | None — usable now, consider DAX-side date conversion |
| Offer accepted date | `CD2_Offers[Offer Accept Date]`, `[Candidate Offer Accept Date]` (2 near-duplicate columns); `OnHold_Validated[Offer Accept Date]` (proper DateTime) | Partially ready | Medium — CD2_Offers versions are String type, OnHold_Validated has typed DateTime | Reconcile which is authoritative; cast CD2_Offers dates if used directly |
| Req closed date | `R1_Clean[Closed Date]`, `R3_OnHold[Closed Date]`, `RD1_Details[Closed Cancelled Date]`, `[Closed Filled Date]` (String type) | Ready | Low — multiple closed-date variants depending on close reason | Confirm which closed-date field is used for SLA "time to close" calcs |

## Verify
`git status --short` (run pre-write): newmont project tree was clean before this file was added; only out-of-project files were already modified (`.ungasis/`, `docs/m365-copilot-instructions.txt`, `knowledge/wiki/log.md`, untracked handoff file) — none touched by this task.
