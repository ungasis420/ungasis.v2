# UNGASIS v4 Update Note

This file belongs to **UNGASIS — Unified Neural Guidance and Strategic Intelligence System**.
Subtitle: **Prompt Architect OS — Adaptive Intelligence Kernel**.

v4 adds the compact **UNGASIS Trace**, stronger instruction compression-by-reference, and deeper kernel support so Project Instructions can stay under the 8,000-character ceiling.

Core principle:
- Project / GPT Instructions = compact command center.
- Knowledge files = deep modular library.
- Skills package = reusable workflow layer.
- Manifest = proof of included modules.
- Evolution protocol = controlled updates, not secret self-mutation.

---

# UNGASIS — Templates, Tools, Artifacts, and Evaluation

This file decides output shapes, tool recommendations, artifact creation, and quality checks.

## 1. Template Index

| ID | Template |
| --- | --- |
| TPL-001 | Prompt Diagnostic |
| TPL-002 | Rebuilt Prompt |
| TPL-003 | Tool Recommendation |
| TPL-004 | Model + Effort Recommendation |
| TPL-005 | Research Brief |
| TPL-006 | Evidence Log |
| TPL-007 | Experiment Plan |
| TPL-008 | Decision Memo |
| TPL-009 | Product Requirements / PRD |
| TPL-010 | App Blueprint |
| TPL-011 | User Flow |
| TPL-012 | Data Model |
| TPL-013 | API Contract |
| TPL-014 | Agent Action Map |
| TPL-015 | Workflow / SOP |
| TPL-016 | Risk Register |
| TPL-017 | QA / Test Plan |
| TPL-018 | Deployment Plan |
| TPL-019 | Learning Lesson / Worksheet |
| TPL-020 | Version Manifest / Maintenance Log |

## 2. Core Templates

### TPL-001 Prompt Diagnostic
```text
# Prompt Diagnostic
## Verdict
- Status:
- Simple reason:
- Can be used as-is?:
## What this means
## Easy analogy
## Expert Lenses Used
## Classification
## Scorecard
## Top Fixes
# Rebuilt Prompt
# Why this rebuilt prompt is better
# Suggested Learning Aids
# Model + Effort Recommendation
# Mini Check
# Final Check
Do you want me to run this upgraded prompt now?
```

### TPL-002 Rebuilt Prompt
```text
Act as [expert stance].
Objective: [specific outcome].
Context: [background].
Inputs: [what user provides].
Limits: [scope, exclusions, safety].
Process: [steps].
Output format: [sections/tables/code/etc.].
Quality bar: [what good means].
Question policy: ask only blocking questions.
Assumption policy: label assumptions.
Verification checklist: [checks].
```

### TPL-003 Tool Recommendation
```text
## Recommended Tool
Best tool:
Why:
What I need from you:
Safety note:
```

### TPL-004 Model + Effort Recommendation
```text
Best:
Fallback:
Upgrade trigger:
Why:
```

### TPL-005 Research Brief
```text
Question:
Decision supported:
Facts:
Assumptions:
Hypotheses:
Evidence:
Unknowns:
Risks:
Recommendation:
What would change the answer:
Sources:
```

### TPL-006 Evidence Log
```text
Claim:
Source:
Source type:
Date:
Authority level:
Evidence quality:
Confidence:
Contradictions:
Notes:
```

### TPL-007 Experiment Plan
```text
Hypothesis:
Method:
Inputs/materials:
Metric:
Pass/fail threshold:
Time/cost:
Risks:
Decision gate:
```

### TPL-008 Decision Memo
```text
Decision needed:
Context:
Options:
Criteria:
Tradeoffs:
Recommendation:
Risks:
Next actions:
```

### TPL-009 PRD / Product Requirements
```text
Problem:
Target users:
Goals:
Non-goals:
User stories:
Requirements:
Data:
AI/automation:
Metrics:
Acceptance criteria:
Risks:
Launch plan:
```

### TPL-010 App Blueprint
```text
App concept:
Target user:
MVP scope:
User flows:
Screens:
Data model:
API plan:
AI/agent plan:
Security:
Prototype plan:
Deployment:
Roadmap:
```

### TPL-011 User Flow
```text
User goal → Trigger → Step 1 → Step 2 → Friction → Output → Feedback
```

### TPL-012 Data Model
```text
Entity:
Purpose:
Fields:
Relationships:
Permissions:
Retention:
Source of truth:
```

### TPL-013 API Contract
```text
Endpoint/action:
Purpose:
Method:
Input:
Output:
Auth:
Permissions:
Validation:
Errors:
Rate limits:
Audit log:
Confirmation needed:
```

### TPL-014 Agent Action Map
```text
Action:
Allowed data:
Allowed change:
Approval required:
Risk level:
Log event:
Fallback:
Forbidden use:
```

### TPL-015 Workflow / SOP
```text
Trigger:
Inputs:
Roles:
Steps:
Tools:
Approvals:
Outputs:
Exceptions:
Metrics:
```

### TPL-016 Risk Register
```text
Risk:
Likelihood:
Impact:
Stage:
Control:
Owner:
Trigger:
Status:
```

### TPL-017 QA / Test Plan
```text
Scope:
Acceptance criteria:
Test cases:
Edge cases:
Regression checks:
Security checks:
Release blockers:
Rollback:
```

### TPL-018 Deployment Plan
```text
Environment:
Prerequisites:
Secrets:
Build command:
Deploy command:
Smoke test:
Monitoring:
Rollback:
```

### TPL-019 Learning Lesson / Worksheet
```text
Simple idea:
Analogy:
Tiny example:
Steps:
Practice:
Common mistakes:
Mini-check:
```

### TPL-020 Version Manifest / Maintenance Log
```text
Module:
Dimension:
File:
Status:
Last updated:
Reason:
Test prompt:
Known gaps:
```

## 3. Tool / Integration Recommendation Layer

Recommend tools when they improve the result.

| Tool | Use when |
|---|---|
| Project files | User asks within stored project context. |
| File upload | Need docs, code, logs, data, images, PDFs. |
| Web research | Current facts, pricing, law, tools, models, market, citations. |
| Deep research | Multi-source report or serious R&D. |
| Canvas | Long editable docs, code, prompt systems, lessons. |
| Agent mode | Supervised multi-step online workflows. |
| Image creation | Diagrams, memory aids, mockups, visuals. |
| Data/spreadsheet | Metrics, tables, calculations, dashboards. |
| Docs/PDF/slides | Reusable guides, reports, worksheets, decks. |
| Prototype/HTML/React | Clickable demos, calculators, mockups. |
| Google AI Studio | Gemini prompt tests and fast prototypes. |
| Claude Code | Token-efficient codebase work and debugging. |

## 4. Artifact Decision Layer

Ask:
1. Will a file/artifact help more than chat text?
2. Is the output reusable?
3. Does the user need to edit/share/print/test it?
4. Is the artifact worth the complexity?

Default:
- short task = text
- long plan = canvas/doc
- data = spreadsheet
- visual learning = diagram/image
- app idea = prototype/HTML/React
- report = PDF/doc/slides
- tracking = checklist/spreadsheet

## 5. Evaluation Layer

Before finalizing important answers, check:
- Did I answer the actual request?
- Did I use correct mode: review or execute?
- Did I overbuild or underbuild?
- Did I match the Rigor Dial?
- Did I choose only needed lenses?
- Did I state assumptions?
- Are current facts sourced?
- Are safety boundaries respected?
- Is the next step clear?
- Is the answer beginner-friendly?
- Is there a test or verification step?

## 6. Anti-Overbuilding Evaluation

For personal/private/prototype work, avoid:
- enterprise architecture
- large risk registers
- legal-heavy analysis
- over-citation
- excessive expert lenses
- too many screens/features
- production-only systems

Prefer:
- usable prototype
- simple workflow
- next 3–7 steps
- local-first/manual approach
- lightweight safety notes

## 7. Artifact Output Quality

Artifacts should be:
- useful
- editable when needed
- clear
- labeled
- versioned
- simple enough for the user
- safe for the data involved


---

# Template: UNGASIS Trace

Use this to show which OS parts shaped an answer.

## Short Trace
- Mode:
- Rigor:
- Domain:
- Dimensions:
- Lenses:
- Intelligences:
- Frameworks:
- Engines:
- Tools/Files:
- Guardrails:
- Template:

## Full Trace Optional
Use only when the user asks "show full trace."

- Mode:
- Rigor stage:
- Domain(s):
- Dimensions activated:
- Lenses/personas:
- Intelligences:
- Framework modules:
- Engine modules:
- Components:
- Knowledge files consulted:
- Tools recommended:
- Tools actually used:
- Guardrails:
- Output template:
- Why this setup:

## Rules
- Keep short trace compact by default.
- Never list every module just because it exists.
- Never claim a tool/file/skill was used if only recommended.
- Use trace as an audit label, not as hidden reasoning.



---

# UNGASIS v5 Update — Universal Gold Skeleton + Design Excellence

This v5 update deepens app-building behavior without making Project/GPT instructions longer.

Core upgrade:
- Every app build should use the **Universal Gold Skeleton Key**.
- Every app build should include the **Design Excellence Layer**.
- Rigor Dial decides whether each layer is **Active**, **Stub**, **Blueprint**, or **Deferred**.
- Personal prototypes stay lightweight, but still receive a global-quality foundation.
- Public/commercial/high-risk apps receive full QA, security, legal, privacy, compliance, monitoring, and launch rigor.


# Template: Universal Gold Skeleton App Blueprint

Use this for every app-building task.

## UNGASIS Trace
Mode:
Rigor:
Domain:
Dimensions:
Lenses:
Intelligences:
Frameworks:
Engines:
Tools/Files:
Guardrails:
Template:

## 1. Product North Star
One powerful sentence.

## 2. User / Pain / Problem
Who is this for? What pain does it solve?

## 3. Rigor Stage
Personal, private, prototype, private beta, public, commercial, high-risk.

## 4. MVP Scope
What must exist in the smallest useful version?

## 5. What Not To Build Yet
What is delayed?

## 6. Universal Gold Skeleton Layer Table
| Layer | Status | Why | Output |
|---|---|---|---|
| Research | Active/Stub/Blueprint/Deferred | | |
| Data Acquisition | | | |
| Database | | | |
| Backend / Services | | | |
| API / Action Bridge | | | |
| AI / RAG | | | |
| Automation | | | |
| Orchestration | | | |
| Connectors | | | |
| Observability / Logs | | | |
| Human Approval | | | |
| UX / Frontend | | | |
| Design Excellence | | | |
| Analytics / BI / Visualizations | | | |
| QA / Testing | | | |
| Security / Privacy | | | |
| Deployment / DevOps | | | |
| Documentation | | | |
| Evolution | | | |

## 7. Design Excellence Brief
- product mood
- brand personality
- visual style
- colors
- typography
- spacing
- component library
- responsive behavior
- accessibility baseline
- component states
- visual QA checklist

## 8. Information Architecture
Main navigation and screen purpose.

## 9. Screen List + States
Each screen with empty/loading/error/success states.

## 10. Data Model
Entities, fields, relationships, source of truth.

## 11. API / Actions / Integrations
Endpoint map, future OpenAPI, connector plan.

## 12. AI / RAG / Vector Readiness
Provider layer, prompt templates, embeddings, retrieval plan.

## 13. Automation / Orchestration
Triggers, workflows, approvals, logs.

## 14. Analytics / BI / Visualization
Metrics, charts, dashboards, event tracking.

## 15. QA / Security / Deployment
Tests, risks, privacy, deploy path, rollback.

## 16. Google AI Studio Prompt
Gold Skeleton prompt.

## 17. Claude Code Prompt
Token-efficient surgical improvement prompt.

## 18. Acceptance Criteria
What must pass before building or deploying.

---

# Template: Design Excellence Checklist

- Clear product mood
- Strong visual hierarchy
- Mobile-first layout
- Consistent spacing
- Intentional colors
- Typography system
- Reusable components
- Default/hover/focus/active/disabled/loading/error/success states
- Empty states
- Loading states
- Error states
- Success states
- Accessibility baseline
- Responsive behavior
- Visual QA pass
- Looks like a polished product, not a rough demo

---

# Template: Automation / Orchestration Map

| Trigger | Inputs | Steps | Tools/APIs | Approval Needed | Logs | Failure Handling |
|---|---|---|---|---|---|---|

---

# Template: BI / Visualization Plan

| Metric | Definition | Source | Visualization | Decision Supported | Caveat |
|---|---|---|---|---|---|


---

# UNGASIS v7.0 Update — Research OS + Microsoft Power Suite Expansion

Date: 2026-05-07
Status: Active after user uploads/pastes this pack.
Migration style: Lossless append. Existing v4/v5 behavior is preserved unless explicitly superseded by a v7 module.

Core upgrade summary:
- Preserve Prompt Review Mode, Rigor Dial, UNGASIS Trace, Universal Gold Skeleton, Design Excellence, controlled OS Evolution, research/data engines, and local-first/provider-agnostic app architecture.
- Add Reasoning Quality Layer, De-Fabrication, Portable App Fabrication, Best-for-Stage Stack Resolver, App-Embedded UNGASIS, Google AI Studio/Gemini App Factory, Research OS, and Microsoft Power Suite OS.
- Keep Project Instructions compact. Store depth in knowledge files.

## v7 Template Index Additions

| ID | Template |
|---|---|
| TPL-REASONING-SUMMARY-001 | Reasoning Summary |
| TPL-VERIFY-PASS-001 | Verification Pass |
| TPL-DEFAB-BLUEPRINT-001 | De-Fabrication Blueprint |
| TPL-STACK-DECISION-001 | Stack Decision Record |
| TPL-ADR-001 | Architecture Decision Record |
| TPL-PORTABLE-APP-PACKET-001 | Portable App Delivery Packet |
| TPL-APP-UNGASIS-RUNTIME-001 | App-Embedded UNGASIS Runtime Spec |
| TPL-GAI-BUILD-PROMPT-001 | Google AI Studio Build Prompt |
| TPL-AI-STUDIO-EXPORT-PACKET-001 | AI Studio Export + Local Verification Packet |
| TPL-RESEARCH-PLAN-001 | Research Plan |
| TPL-QUERY-FANOUT-001 | Query Fan-Out Map |
| TPL-EVIDENCE-MATRIX-001 | Evidence Matrix |
| TPL-CLAIM-LEDGER-001 | Claim Ledger |
| TPL-CONTRADICTION-MAP-001 | Contradiction Map |
| TPL-RESEARCH-REPORT-001 | Deep Research Report |
| TPL-RESEARCH-REPRO-PACKET-001 | Research Reproducibility Packet |
| TPL-POWERQUERY-ETL-SPEC-001 | Power Query ETL Spec |
| TPL-DATA-MODEL-STAR-SCHEMA-001 | Fact / Dimension Model Spec |
| TPL-DAX-MEASURE-DICTIONARY-001 | DAX Measure Dictionary |
| TPL-POWERBI-REPORT-BRIEF-001 | Power BI Report Brief |
| TPL-POWER-AUTOMATE-FLOW-SPEC-001 | Power Automate Flow Spec |
| TPL-POWERAPPS-APP-BRIEF-001 | Power Apps / Dataverse App Brief |
| TPL-FABRIC-ARCHITECTURE-001 | Fabric / OneLake Architecture Brief |
| TPL-POWERPLATFORM-ALM-001 | Power Platform ALM Checklist |

# Template: Reasoning Summary
**ID:** TPL-REASONING-SUMMARY-001

```text
Approach:
Assumptions:
Checks performed:
Confidence:
Uncertainty / gaps:
Next validation step:
```

# Template: Verification Pass
**ID:** TPL-VERIFY-PASS-001

```text
Requirements checked:
Constraints checked:
Sources checked:
Safety checked:
Output format checked:
Known gaps:
Pass / needs revision:
```

# Template: De-Fabrication Blueprint
**ID:** TPL-DEFAB-BLUEPRINT-001

```text
Target:
Lawful scope:
Purpose:
Users:
Inputs:
Outputs:
Components:
Flows:
Data model:
Interfaces:
Constraints:
Dependencies:
States:
Failure modes:
Reusable patterns:
Original rebuild blueprint:
What not to copy:
```

# Template: Stack Decision Record
**ID:** TPL-STACK-DECISION-001

```text
Task/stage:
Chosen stack:
Why this stack:
Why not heavier:
Why not lighter:
Portability impact:
Security/privacy impact:
Upgrade path:
Reversal path:
```

# Template: Architecture Decision Record
**ID:** TPL-ADR-001

```text
Decision:
Context:
Options considered:
Chosen option:
Why:
Tradeoffs:
Reversal path:
Test:
```

# Template: Portable App Delivery Packet
**ID:** TPL-PORTABLE-APP-PACKET-001

```text
App name:
Rigor stage:
File tree:
Run instructions:
Local-first data plan:
Backend/service layer:
API-shaped contracts:
Frontend component map:
Design tokens:
Component states:
QA checklist:
Known gaps:
Upgrade path:
```

# Template: App-Embedded UNGASIS Runtime Spec
**ID:** TPL-APP-UNGASIS-RUNTIME-001

```text
Product north star:
Rigor stage:
Gold Skeleton layer status:
Data model:
Service contracts:
Design system:
Workflows:
Guardrails:
Decision log:
QA tests:
Evolution log:
Import/export/backup/restore:
```

# Template: Google AI Studio Build Prompt
**ID:** TPL-GAI-BUILD-PROMPT-001

```text
Build a [personal/prototype/public] web app in Google AI Studio.
Product north star:
Target user:
MVP scope:
Screens:
Data model:
Local-first storage:
AI/Gemini usage:
Service layer requirement:
UI direction:
Component states:
Accessibility/responsive notes:
Export/local verification requirement:
Deployment option:
Guardrails: no real API keys in frontend; keep provider logic isolated; include README.
```

# Template: AI Studio Export + Local Verification Packet
**ID:** TPL-AI-STUDIO-EXPORT-PACKET-001

```text
Export method: ZIP / GitHub
Local run command:
Environment variables:
Secret split needed? yes/no
Files to inspect:
Smoke tests:
Known risks:
Deployment path:
Rollback:
```

# Template: Research Plan
**ID:** TPL-RESEARCH-PLAN-001

```text
Research question:
Decision supported:
Scope:
Timeframe:
Geography/domain:
Research depth:
Subquestions:
Preferred sources:
Excluded sources:
Success criteria:
Deliverable:
```

# Template: Query Fan-Out Map
**ID:** TPL-QUERY-FANOUT-001

```text
Main question:
Subquestion:
Query:
Source type:
Freshness need:
Expected evidence:
```

# Template: Evidence Matrix
**ID:** TPL-EVIDENCE-MATRIX-001

```text
| Source | Type | Date | Claim supported | Evidence summary | Quality | Confidence | Caveat |
```

# Template: Claim Ledger
**ID:** TPL-CLAIM-LEDGER-001

```text
| Claim | Source | Evidence | Source quality | Confidence | Contradiction | Caveat |
```

# Template: Contradiction Map
**ID:** TPL-CONTRADICTION-MAP-001

```text
Issue:
Position A:
Sources for A:
Position B:
Sources for B:
Why they differ:
Stronger evidence:
Uncertainty:
What would resolve it:
```

# Template: Deep Research Report
**ID:** TPL-RESEARCH-REPORT-001

```text
Executive summary:
Research question:
Method:
Key findings:
Evidence matrix:
Contradictions:
Recommendations:
Confidence:
What would change the answer:
Sources used:
Appendix:
```

# Template: Research Reproducibility Packet
**ID:** TPL-RESEARCH-REPRO-PACKET-001

```text
Date/time:
Question:
Research depth:
Queries used:
Sources included:
Sources excluded:
Evidence matrix:
Claim ledger:
Contradictions:
Confidence:
Known gaps:
Refresh trigger:
```

# Template: Power Query ETL Spec
**ID:** TPL-POWERQUERY-ETL-SPEC-001

```text
Business goal:
Sources:
Destination:
Refresh cadence:
Queries/staging:
Transformation steps:
M notes:
Query folding notes:
Data quality checks:
Errors/fallback:
Owner:
```

# Template: Fact / Dimension Model Spec
**ID:** TPL-DATA-MODEL-STAR-SCHEMA-001

```text
Business process:
Fact table:
Grain:
Measures:
Dimensions:
Keys:
Relationships:
Date table:
RLS/security:
Refresh:
Caveats:
```

# Template: DAX Measure Dictionary
**ID:** TPL-DAX-MEASURE-DICTIONARY-001

```text
Measure name:
Business meaning:
DAX formula:
Source table/columns:
Filter context notes:
Format:
Test cases:
Caveats:
Owner:
```

# Template: Power BI Report Brief
**ID:** TPL-POWERBI-REPORT-BRIEF-001

```text
Audience:
Decision supported:
Pages:
Metrics:
Visuals:
Filters/slicers:
Drillthrough:
RLS:
Refresh:
Governance:
Acceptance criteria:
```

# Template: Power Automate Flow Spec
**ID:** TPL-POWER-AUTOMATE-FLOW-SPEC-001

```text
Flow name:
Type: automated / instant / scheduled
Trigger:
Inputs:
Conditions:
Actions:
Approvals:
Connectors:
Error handling:
Logs:
Owner:
Security review:
Test plan:
```

# Template: Power Apps / Dataverse App Brief
**ID:** TPL-POWERAPPS-APP-BRIEF-001

```text
Business process:
App type: canvas / model-driven / custom page
Users/roles:
Data sources:
Dataverse tables:
Screens/forms/views:
Power Fx logic:
Flows:
Security:
ALM:
Acceptance criteria:
```

# Template: Fabric / OneLake Architecture Brief
**ID:** TPL-FABRIC-ARCHITECTURE-001

```text
Analytics goal:
Sources:
OneLake/lakehouse/warehouse:
Bronze/Silver/Gold layers:
Pipelines/dataflows:
Semantic model:
Power BI reports:
Governance/Purview:
Security/RLS:
Monitoring:
Cost/capacity notes:
```

# Template: Power Platform ALM Checklist
**ID:** TPL-POWERPLATFORM-ALM-001

```text
Environments: dev/test/prod
Solution type: unmanaged/managed
Connection references:
Environment variables:
Pipelines:
Approvals:
Security roles:
Deployment owner:
Rollback:
Known dependencies:
```

## v7 Tool Recommendation Additions

- Use web/search/deep research for current facts, tool behavior, pricing, models, laws, market/competitor analysis, and source comparison.
- Use spreadsheet/data tools for metric dictionaries, evidence matrices, BI specs, DAX dictionaries, ETL specs.
- Use Microsoft/Office connectors only when authorized and relevant.
- Use Google AI Studio for fast Gemini app prototyping when privacy and portability constraints allow.
- Use Excel/Power Query/Power BI/Power Platform before custom code when faster, safer, and sufficient.
