NEWMONT QIM — WAVE 1 CONTINUATION HANDOFF
Owner: Mel John Dimat
Power BI Desktop: 2.155.756.0 64-bit, June 2026
Repo: D:\.projects\ungasis\projects\newmont

USER SUPPORT STYLE
- I am not tech savvy.
- English is not my first language.
- I have no deep RPO / TA background.
- Guide me slowly, one step at a time.
- Use simple English.
- Explain technical words using Feynman method:
  simple meaning + layman analogy.
- Use diagrams, timelines, and visual explainers when helpful.
- Keep answers short. No walls of text.
- Wait for my confirmation before the next step.

PROJECT GOAL
Build Newmont QIM Wave 1 dashboard updates for Sondra.
First draft target: July 3.
Current scope: Costa Rica / QIM dashboard.

LOCKED SOURCE OF TRUTH
1. Sondra June 24 written notes / emails = primary truth.
2. Verified transcript lines = support.
3. PBI MCP read-only probes = model reality.
4. AI summaries = QA support only, not truth.

GOVERNANCE RULES
- No raw Newmont CSV/XLSX/PBIX in ChatGPT, Claude, Agy, or Git.
- No PBIX in Git.
- Claude writes DAX text/docs/Git only.
- PBIX edits happen manually in Power BI Desktop.
- Source/DEI must be aggregate-only unless Sondra/governance approves more.
- No candidate-level DEI table.
- No candidate names, emails, phones, salary, or PII visuals.

CURRENT COMMITS
- e4409c3 = Wave 0 truth lock + Sondra SLA alignment.
- 9447be3 = .gitignore exception for tracking/kpi_truth_set.csv.
- aa8bd69 = Wave 1 DAX draft.
- Safety branch pushed:
  qim/wave1-sla-dax-draft-20260701
- origin/main is diverged. Do not push/rebase/merge main unless explicitly asked.

KEY FILES
- docs/QIM_NextPhase_MasterPlan_v1.md
- tracking/kpi_truth_set.csv
- tracking/sondra-june24-sla-audit.md
- tracking/transcript_reconciliation.md
- docs/dax/Wave1_Sondra_SLA_DAX_Draft.md

LOCKED SLA DEFINITIONS
- Time to Shortlist = Approved Date → first candidate submitted / HM Review.
- Time to Interview = Approved Date → first candidate hitting interview.
- Time to Offer = Approved Date → candidate Offer Date.
- Time to Accept = Approved Date → candidate Accept Date.
- Time to Start = Approved Date → Tentative Start Date.
- Disposition = use Final Status.
- BGC = Ready to Onboard → Hired, but needs Sondra confirmation.
- Source of Hire = KPI, not SLA.
- DEI Gender Funnel = gender by funnel stage, privacy-gated.

WAVE 1 BUILD SCOPE
Build only:
1. Time to Offer
2. Time to Start
3. Time to Accept
4. Time to Shortlist
5. Time to Interview

Hold:
- BGC
- Source of Hire
- DEI Gender Funnel
- Disposition

DAX QA RESULTS
- Time to Offer = GO, expected about 43.29 days.
- Time to Start = GO, expected about 54.81 days.
- Time to Accept = conditional GO, expected about 42.78 days.
- Time to Shortlist = conditional GO, expected about 14.04 days.
- Time to Interview = conditional GO, expected about 21.57 days.
- BGC = NO-GO Wave 1.

IMPORTANT TECHNICAL NOTES
- SLA start field = R1_Clean[Approved Date].
- DAX = Power BI formula language, like Excel formulas for dashboards.
- Measure = calculated number shown in the dashboard.
- Date fields in CD2_Offers may be text, so DAX needs safe date conversion.
- RD2_StartDate[Tentative Start Date] is cleaner for Time to Start.
- Application ID is best join key for later Source/DEI work.

SOURCE / DEI FINDINGS
- Source, Source Details, Gender Consolidated, and Final Status exist in Newmont internal / production semantic model.
- These fields are missing from v6 today.
- Best join key = Application ID.
- Source Category is not present; needs Direct/Indirect mapping.
- DEI has large “Not Provided” group and small-cell risk.
- Source/DEI are feasible later, but not Wave 1.

NEXT TASK
1. Open v6 PBIX.
2. Immediately save as v7 PBIX before edits.
3. Build Time to Offer first.
4. Validate expected value around 43.29 days.
5. Then continue one measure at a time.

VISUAL ROADMAP
Wave 0: Truth Lock ✅
   ↓
Wave 1: Build 5 core time SLA measures 🔨
   ↓
Wave 1 QA: Check values + labels
   ↓
Sondra review
   ↓
Wave 1.5: BGC if confirmed
   ↓
Wave 2+: Source, Disposition, DEI after governance/model path