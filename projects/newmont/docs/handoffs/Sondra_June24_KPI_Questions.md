# Sondra June 24 KPI/SLA — Open Questions

**Date:** 2026-07-01 | **From:** Mel | **To:** Sondra Wozniak
**Basis:** Sondra June 24 list (MasterPlan Section 4) vs v6 read-only audit (`sondra-june24-sla-audit.md` §6, `kpi_truth_set.csv`)
**SLA-start rule applied:** Approved Date (not Created Date)

---

## 1. Email-ready draft (<200 words)

> **Subject: Newmont QIM — 9 quick confirmations to lock the SLA build**
>
> Hi Sondra,
>
> I've mapped your June 24 KPI/SLA list against the v6 model. Most are buildable once we anchor every SLA to **Approved Date** (one measure currently starts from Created Date — I'll fix it). Nine definitions need your one-line confirmation before I build, so the numbers match your intent exactly:
>
> 1. **Time to Shortlist** — which Application Status / Funnel Category means "1st candidate submitted"?
> 2. **Time to Interview** — which status values count as "hitting interview"?
> 3. **Time to Offer** — is "candidate Offer Date" the Offer *Created* Date or Offer *Approved* Date?
> 4. **Time to Accept** — use `Filled Positions[Candidate Offer Accept Date]` as source of truth?
> 5. **Time to Start** — use `Hired On` only as fallback when Tentative Start Date is blank?
> 6. **Disposition** — use `Final Status`? Is there a v6 equivalent?
> 7. **BGC / Time to Screen** — what status/date marks "Ready to Onboard"?
> 8. **Source of Hire** — Source, Source Details, or a grouped taxonomy?
> 9. **DEI Gender Funnel** — confirm join key, funnel stages, unknown-gender handling, and small-cell suppression.
>
> Once confirmed I'll build read-only and validate. Thanks!
>
> — Mel

---

## 2. Question table

| Question | KPI unblocked | Why needed | Current status |
|---|---|---|---|
| Exact Application Status / Funnel Category for "1st candidate submitted on req"? | Time to Shortlist | No v6 measure exists; can't define the end event without the status value | NEEDS_CONFIRMATION |
| Which Application Status values count as "hitting interview"? | Time to Interview | v6 starts from Application Date (MISMATCH); also need the interview-stage definition to re-anchor to Approved Date | MISMATCH |
| Does "candidate Offer Date" mean Offer Created Date or Offer Approved Date? | Time to Offer | v6 uses Date Created (VIOLATION); end-field choice changes the result | VIOLATION |
| Should `Filled Positions[Candidate Offer Accept Date]` be the source of truth? | Time to Accept | v6 starts from Offer Created Date (MISMATCH); need one canonical accept-date field (avoid free-text fields) | MISMATCH |
| Should `Hired On` be fallback only when Tentative Start Date is blank? | Time to Start | v6 measure not CR-scoped and starts from Offer Accept Date (MISMATCH); fallback rule affects coverage | MISMATCH |
| Use `Applicants_status[Final Status]`, and is there a v6 equivalent? | Candidate Disposition Reasons | Final Status not confirmed present in v6; needs source alignment before build | NEEDS_CONFIRMATION |
| What exact status/date marks "Ready to Onboard"? | Time to Screen / BGC | Hired date exists but the start (Ready to Onboard) is missing — cannot compute | BLOCKED |
| Source, Source Details, or a grouped taxonomy (hired only)? | Source of Hire | No field/taxonomy confirmed; gated until Source vs Source Details resolved | GATED |
| Confirm join key, funnel stages, unknown-gender handling, privacy/small-cell suppression? | DEI Gender Funnel | Gated on data join + governance/privacy rules before any aggregate is shown | GATED |

---

### Scope note
The five Section 4.2 items (Time to Intake, Intake→Recruitment Agreement, Salary expectation, Termination timeline, Time to Advertise/Post) are **BLOCKED** pending source data (Recruitment Agreement Date, Posting Date, HRIS/intake fields) and are intentionally **not** in this ask list — Sondra already flagged them as needing more information.

---
*Draft from read-only audit. No PBIX edits, no raw CSV/XLSX access, no git commit. Last reviewed: 2026-07-01 | Owner: Mel*
