# RESET_CHECKLIST — UNGASIS v7.0

Date: 2026-05-07
Purpose: smooth, lossless migration into the Project.

## Before Upload

1. Export/backup current Project Instructions.
2. Download all existing Project knowledge files.
3. Keep a local folder named `UNGASIS_v5_baseline_backup`.
4. Confirm this v7 pack includes:
   - UNGASIS_PROJECT_INSTRUCTIONS_v7.txt
   - 00_ROUTER_BEHAVIOR_RIGOR_SYSTEMS.md
   - 01_ENGINE_KERNEL_ALL_ENGINES.md
   - 02_FRAMEWORK_KERNEL_ALL_FRAMEWORKS.md
   - 03_INTELLIGENCE_KERNEL_ALL_INTELLIGENCES.md
   - 04_MEMORY_KNOWLEDGE_GUARDRAILS.md
   - 05_TEMPLATES_TOOLS_ARTIFACTS_EVALUATION.md
   - 06_MAINTENANCE_MANIFEST_TESTS_EVOLUTION.md
   - VERSION_MANIFEST.md
   - RESET_CHECKLIST.md

## Upload Steps

1. Paste `UNGASIS_PROJECT_INSTRUCTIONS_v7.txt` into Project Instructions.
2. Remove old duplicate versions of the seven kernel files from Project knowledge.
3. Upload the seven updated kernel files.
4. Upload `VERSION_MANIFEST.md`.
5. Upload `RESET_CHECKLIST.md` if useful.
6. Start a new Project chat.

## Smoke Tests

Run these immediately:

### Prompt Review Test
```text
Build me an app for students who want to study better.
```
Expected: Prompt Diagnostic first; no app execution yet; rebuilt prompt; final exact check.

### Anti-Overbuild Test
```text
Build me a private cooking second-brain app for me and my partner. I want to use it ASAP.
```
Expected: personal/prototype rigor; lightweight safety; no enterprise overbuild.

### Research OS Test
```text
Compare current Perplexity Research, Gemini Deep Research, Claude Research, Grok DeepSearch, and ChatGPT Deep Research.
```
Expected: web/current sources, citations, source table, query fan-out, caveats.

### Microsoft Power Suite Test
```text
I have messy monthly CSV exports and need a dashboard. Should this be Excel, Power Query, Power BI, Power Apps, or a custom web app?
```
Expected: Excel/Office-first check; Power Query/BI route; decision matrix; no custom-code bias.

### Portable App Test
```text
Build me a portable local-first personal dashboard app, me as the MVP.
```
Expected: portable app plan, local-first data, premium design, no required proprietary IDE, App-Embedded UNGASIS when useful.

## Pass Criteria

- Prompt Review default works.
- Rigor Dial prevents overbuilding.
- Research claims are cited.
- Microsoft route activates accurately.
- App route preserves portability.
- Guardrails prevent secrets/frontend key exposure.
- No claim is made that files were updated before upload.

## Rollback

If behavior gets worse:
1. Restore old Project Instructions.
2. Remove v7 files.
3. Re-upload v5 baseline files.
4. Run TST-001 and TST-002.
5. Identify failing v7 module before retrying.
