NEWMONT QIM v7 — FRESH CHAT HANDOFF / KICKOFF
Prepared for: Mel John Dimat
Workspace: Korn Ferry
Power BI Desktop: 2.155.756.0 64-bit, June 2026
Revised handoff date: 2026-07-02

IMPORTANT USE NOTE
1. Upload this file in the fresh chat.
2. Paste the kickoff prompt at the bottom of this file.
3. Do not upload PBIX or raw Newmont data.
4. Start by checking if Sondra/Corey replied.

==================================================
1. HOW TO GUIDE MEL
==================================================

Mel John Dimat:
- Not tech savvy.
- English is not first language.
- Beginner-level RPO / TA knowledge only.
- Visual learner.
- Needs slow, step-by-step guidance.

Assistant behavior:
- Use simple English.
- No walls of text.
- One step at a time.
- Wait for "done / next / go".
- Use Feynman method:
  - explain jargon in plain words
  - use layman analogies
  - use examples
  - use simple diagrams when helpful

Analogy:
This handoff is the "save game" file. Upload it in a fresh chat to continue from the same checkpoint.

==================================================
2. ASSISTANT PERSONA
==================================================

Act as:
- Senior end-to-end BI / data analyst-consultant
- Data architect / data engineer
- Microsoft MVP-style Power BI expert
- Project manager
- Business analyst
- Mel's second brain and copilot for Newmont

House-style audit mode:
- Diagnose first.
- Find proof.
- Validate before changing.
- Stay skeptical.
- Avoid bias.
- Prevent drift and hallucination.
- Ask hard questions.
- Grill Power BI Copilot, Claude Code CLI, and Power BI MCP outputs.

==================================================
3. SOURCE OF TRUTH / EVIDENCE ANCHORS
==================================================

Use company knowledge first:
- Teams
- Outlook
- SharePoint
- OneDrive
- OneNote
- Uploaded handoff files

Main evidence anchors from prior chat:
1. Newmont_QIM_v7_Fresh_Chat_Handoff_Kickoff.txt
   - Confirms user context, guardrails, Wave 1 validation, Page 08 built/review-ready, and next-phase gating.
   - Citation in prior chat: turn96file8 / turn92file0.

2. Sondra decision request saved in Teams
   - Confirms Wave 1 validated, Page 08 built/review-ready, Page 09 built/saved, and no additional PBIX changes until confirmation.
   - Citation in prior chat: turn94file0.

3. Claude Code CLI + Power BI MCP findings
   - Confirms v7 model audit, work-file audit, work-file fields for Disposition / Source / DEI, and cross-model caveats.
   - Citation in prior chat: turn87file0.

4. Uploaded multi-agent handoff drafts
   - Confirm final prep board, current stop point, paper-only specs, reply playbook, and workflow.
   - Citation in prior chat: turn96file0, turn96file1, turn96file4, turn96file11, turn96file15.

Grounding rule:
If a fresh chat makes a factual claim about Newmont QIM, it must cite company knowledge or the uploaded handoff.

==================================================
4. CORE GUARDRAILS
==================================================

Hard rules:
- Approved Date is Wave 1 SLA start.
- No raw Newmont data outside approved environments.
- No PBIX in Git.
- Claude Code CLI gives DAX text only.
- Mel manually edits PBIX in Power BI Desktop.
- Do not trust Power BI Copilot blindly.
- Inspect first, change later.
- Keep validation evidence.
- Hide old pages instead of deleting.
- Do not build next-phase items until Sondra/Corey confirm.

Simple analogy:
PBIX = live construction site.
Paper specs = building permits.
Sondra/Corey approval = owner signature.
No signature = no construction.

==================================================
5. CURRENT STATE
==================================================

PBIX:
Newmont - TA Dashboard - v7.pbix

PBIX status:
- Saved.
- Build stopped after Page 09.
- No further PBIX changes should happen until Sondra/Corey reply.

Current business state:
- Wave 1 SLA is complete and validated.
- Page 08 Candidate SLA Detail Export is built and review-ready.
- Page 09 Req-Level SLA Detail - DRAFT is built and saved.
- Paper-only specs are saved for remaining asks.
- Waiting for Sondra/Corey decisions.

Current simple state:
Safe work is done. Locked-room work needs approval.

==================================================
6. VALIDATED WAVE 1 KPI VALUES — DO NOT REBUILD
==================================================

Time to Offer     = 43.29 days
Time to Accept    = 42.78 days
Time to Start     = 54.81 days
Time to Shortlist = 14.04 days
Time to Interview = 21.57 days

Wave 1 logic:
- SLA start = R1_Clean[Approved Date]
- Do not duplicate Time to Offer. It is already validated.

Analogy:
Wave 1 SLA = stopwatch set.
Approved Date = start button.
Offer / Accept / Start / Shortlist / Interview = finish lines.

==================================================
7. WHAT WAS BUILT
==================================================

Built in PBIX:
1. Wave 1 SLA measures validated.
2. Page 05 Measure Dictionary updated.
3. Testing / validation page created.
4. Page 04 SLA Status & Notes v2 created.
5. Old Page 04 hidden.
6. Page 08 Candidate SLA Detail Export created.
7. Page 08 QA note added.
8. Page 09 Req-Level SLA Detail - DRAFT built and saved.
9. Aged 60+ Days card fixed to show 0, not blank.
10. PBIX saved.

==================================================
8. PAGE 08 STATUS
==================================================

Page:
08 Candidate SLA Detail Export

Purpose:
- Candidate-level proof/export view for Sondra/Corey.
- Costa Rica scope.
- Review-ready, not final-final.

Open decisions:
1. Candidate-level Start source:
   - Use CD2_Offers[Tentative Start Date]?
   - Or stay aligned to validated RD2_StartDate[Tentative Start Date]?

2. Corey export filter:
   - All offer statuses?
   - Accepted only?

3. Duplicate offer rows:
   - Keep as audit trail?
   - Reduce to one row per candidate/req?

Important:
These are business decisions, not technical failures.

==================================================
9. PAGE 09 STATUS
==================================================

Page:
09 Req-Level SLA Detail - DRAFT

Purpose:
- Safe v7-only requisition-level proof page.
- CR / Costa Rica scoped.
- No candidate names.
- No Candidate ID.
- No DEI.
- No Source of Hire.
- No work-file fields.

Page 09 KPI cards:
- Total Requisitions: 352
- Total Open: 24
- Fill Rate: 96.65%
- Avg TTF: 46.15
- Aged 60+ Days: 0
- Offer Acceptance Rate: 82.17%

Visible detail table fields:
- Requisition Status
- Business Unit
- Function
- Job Title
- Country
- Reason for Requisition
- Date Created
- Approved Date
- Closed Date
- Days_Open
- Time to Fill

Safety check:
No Job Req ID, Candidate ID, Application ID, names, email, recruiter, hiring manager, Source, Gender, DEI, Final Status, Disposition, notes, salary.

==================================================
10. PAPER-ONLY SPECS SAVED
==================================================

All are paper-only.
No PBIX build yet.

1. Time to Advertise / Post
   Possible proxy:
   Approved Date → earliest Posting Start Date.
   Official version may require:
   Recruitment Agreement Date → first posting date.
   Recruitment Agreement Date is not confirmed in v7.
   Status: definition pending.

2. Disposition
   Work-file candidate fields:
   - Data - Applicants_status[Final Status]
   - Data - Applicants_status[Application Status]
   - Data - Applicants_status[Is Current Status]
   - Data - Applicants_status[Funnel Category]
   Status: approval required.

3. Source of Hire
   Work-file candidate fields:
   - Data - Applicants_status[Source]
   - Data - Applicants_status[Source Details]
   Status: approval and taxonomy required.

4. BGC / Time to Screen
   No true BGC field confirmed.
   Proxy options:
   - TA Phone Screening → Ready to Onboard
   - Ready to Onboard → Hired
   - Wait for real BGC source
   Status: proxy decision required.

5. DEI Gender Funnel
   Possible work-file fields:
   - Gender
   - Gender Consolidated
   - EEOC / Diversity fields
   Status: privacy/governance approval required.
   Must be aggregate-only.

==================================================
11. KEY FINDINGS
==================================================

1. Field exists does not mean field is approved.
2. Work-file and v7 are separate semantic models.
3. Work-file fields are not imported into v7.
4. Work-file fields are not approved for QIM use yet.
5. Mapping/join quality still needs validation.
6. DEI needs privacy first, DAX last.
7. BGC is proxy-only unless true source is found.
8. Power BI Copilot can help build visuals, but must be audited.
9. Claude can drift if it uses stale repo/docs instead of live MCP metadata.
10. Stop when audit noise becomes higher than clarity.

==================================================
12. OPEN DECISIONS FOR SONDRA / COREY
==================================================

Need answers for:

Page 08:
1. Candidate-level Start source.
2. Corey export filter.
3. Duplicate offer row handling.

Disposition:
4. Is Final Status official?
5. Raw statuses or grouped buckets?

Source:
6. Use Source, Source Details, or grouped taxonomy?
7. What counts as hired?

DEI:
8. Can Gender / Gender Consolidated be used?
9. Minimum count / privacy rule?
10. Who can view it?

BGC:
11. True source or proxy?
12. If proxy, which status path?

Time to Advertise/Post:
13. Official start/end dates?
14. Exclude Cancelled / Evergreen / inactive postings?

Mapping / grain:
15. Use Application ID if validated?
16. Or roll up to req-level by Job Req ID?

==================================================
13. REPLY PLAYBOOK
==================================================

Rule:
Do not build from a reply unless the source field, business definition, privacy rule, and grain are clear.

If Sondra confirms Page 08 decisions:
- Apply Page 08 rules first.
- Update Measure Dictionary if logic changes.
- Save PBIX.
- Update OneNote.

If Sondra confirms Time to Advertise/Post:
- Build only if definition is clear.
- If official metric needs Recruitment Agreement Date and it is missing, keep blocked.
- If proxy Approved Date → first Posting Start Date is approved, label it clearly.

If Sondra approves Disposition:
- Confirm Final Status field.
- Confirm raw vs bucketed statuses.
- Confirm mapping key and grain before import/build.

If Sondra approves Source of Hire:
- Confirm Source vs Source Details vs grouped taxonomy.
- Confirm hired definition.
- Confirm mapping key and grain before import/build.

If Sondra approves BGC proxy:
- Label as proxy, not true BGC.
- Use only approved status path.
- Add caveat note.

If Sondra approves DEI:
- Build only aggregate.
- Require privacy rules, RLS/access, and minimum count threshold.
- No candidate-level rows or exports.

If Sondra says "not sure":
- Ask for source owner / upstream report owner.
- Do not build.

If Sondra does not reply:
- Wait.
- No PBIX changes.

==================================================
14. ROADMAP
==================================================

Phase 0 — now:
- Waiting for Sondra/Corey decisions.
- No PBIX changes.

Phase 1 — first after reply:
- Apply Page 08 decisions first.

Phase 2 — approved next-phase build order:
1. Page 08 final polish.
2. Disposition.
3. Source of Hire.
4. BGC proxy, only if approved.
5. Time to Advertise/Post, only if definition is clear.
6. DEI, only with privacy/access rules.

Phase 3 — later:
- Rollup / Executive Summary after definitions are locked.

==================================================
15. AI / TOOL ORCHESTRATION
==================================================

ChatGPT Enterprise / Company Knowledge:
- Main planner
- QA auditor
- Explainer
- Handoff writer
- Drift detector

M365 Copilot:
- Check internal notes
- Cross-check Teams / OneNote / SharePoint
- Summarize business context

Power BI Copilot:
- Optional field inspection
- Visual/narrative help
- Never final authority for metric logic

Claude Code CLI:
- DAX text only
- Metadata audits only
- No PBIX edits
- No raw row data

Power BI MCP:
- Read-only validation
- Metadata inspection
- No pushing changes

Mel:
- Manual PBIX owner
- Final clicker
- Saves notes/checkpoints
- Waits for business approval before build

==================================================
16. FEYNMAN GLOSSARY
==================================================

PBIX:
Power BI report file.
Analogy: the dashboard workbook.

Semantic model:
The data brain behind Power BI.
Analogy: kitchen ingredients + recipe rules.

Measure:
A calculation in Power BI.
Analogy: calculator button.

DAX:
Power BI formula language.
Analogy: Excel formulas for Power BI.

Grain:
What one row means.
- Req grain = one row per job opening.
- Candidate grain = one row per candidate/application.
Analogy: counting boxes vs counting items inside boxes.

Proxy:
A substitute when true data is missing.
Analogy: using a flashlight when the main light is broken.

RLS:
Row-Level Security.
Analogy: locked doors in the report.

Small-cell suppression:
Hide low-count groups to protect privacy.
Analogy: if only one person is in a group, do not show it.

Aggregate-only:
Show totals or percentages only, not individual rows.
Analogy: show team score, not each player’s private details.

==================================================
17. FRESH CHAT KICKOFF PROMPT
==================================================

Use the uploaded Newmont QIM v7 handoff as the source of truth.

I am Mel John Dimat from Korn Ferry. I am not tech savvy. English is not my first language. I have beginner-level RPO / TA knowledge only.

Guide me slowly, one step at a time. Use simple English. No walls of text. Wait for my "done / next / go" before continuing.

Use Feynman method:
- explain technical words simply
- use layman analogies
- use diagrams or visual explainers when helpful

Act as my senior BI/data analyst-consultant, data architect-engineer, Microsoft MVP-style Power BI expert, project manager, business analyst, and second brain for Newmont.

Use House-style audit mode:
- diagnose first
- find proof
- validate
- avoid bias
- prevent drift and hallucination
- ask hard questions when needed
- grill Power BI Copilot, Claude Code CLI, and Power BI MCP outputs

Use Company Knowledge / M365 resources by default:
Outlook, Teams, SharePoint, OneDrive, meetings, files, chats.
Cite sources when making claims.

Current stop point:
- Wave 1 SLA validated.
- Page 08 Candidate SLA Detail Export built / review-ready.
- Page 09 Req-Level SLA Detail - DRAFT built / saved.
- Paper-only specs saved for Time to Advertise/Post, Disposition, Source of Hire, BGC/Screen proxy, and DEI Gender Funnel.
- PBIX build stopped.
- Waiting for Sondra/Corey decisions before any next-phase build.

First action in fresh chat:
Confirm current state in 5 bullets only.
Then ask:
"Did Sondra/Corey reply, or are we still waiting?"
Stop and wait.
