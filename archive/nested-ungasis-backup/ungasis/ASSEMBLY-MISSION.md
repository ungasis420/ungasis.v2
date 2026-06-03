# 🔧 ASSEMBLY MISSION: Build Live Repo from Archive

> **Objective:** The archive/ folder contains all generated outputs from multiple AI sessions.
> The live repo folders (modules/, blueprints/, source-files/, multi-agents/, memory-bank/)
> are empty. Populate them from archive sources, then run QA audit.

---

## Phase 1: Discover Archive Contents

### A0: Map the Archive
1. Run: find archive/ -name "*.md" -type f
2. List ALL .md files found in archive/
3. Group them by their likely destination folder
4. Write the map to ASSEMBLY-REPORT.md

---

## Phase 2: Populate Live Folders

### A1: Populate modules/
Find ALL files matching ungasis-*.md in archive/ (recursive search).
Copy each to modules/ folder. Expected ~24-29 files including:
- ungasis-chatgpt-feature-router.md
- ungasis-m365-feature-router.md
- ungasis-instruction-hierarchy.md
- ungasis-decision-matrix.md
- ungasis-stack-lanes.md
- ungasis-tool-stack-strategy.md
- ungasis-output-control-rules.md
- ungasis-html-manual-spec.md
- ungasis-source-ledger.md
- ungasis-30day-roadmap.md
- ungasis-hallucination-guide.md
- ungasis-recovery-mode.md
- ungasis-portfolio-strategy.md
- ungasis-monetization-strategy.md
- ungasis-backup-strategy.md
- ungasis-gold-skeleton.md
- ungasis-me-as-mvp-workflow.md
- ungasis-ai-operating-model.md
- ungasis-prompt-engineering.md
- ungasis-glossary.md
- ungasis-prompt-library.md
- ungasis-sop-library.md
- ungasis-version-control.md
- ungasis-cost-monitoring.md
- ungasis-context-engineering.md
- ungasis-context-loops.md
- ungasis-knowledge-base.md
- ungasis-design-checklist.md
- ungasis-build-workflow.md
- ungasis-lifecycle-ladder.md
- ungasis-project-factory.md
- ungasis-api-secret-safety.md

If MULTIPLE versions of the same file exist, pick the NEWEST (latest modified date).
Log which version was picked and why.

### A2: Populate blueprints/
Find files matching *BLUEPRINT*.md or *blueprint*.md in archive/.
Copy to blueprints/. Expected:
- UNGASIS-OS-v3.0-MASTER-BLUEPRINT_m365-opus.md (the winner)
- UNGASIS-OS-v3.0-MASTER-BLUEPRINT_m365-chatgpt.md
- UNGASIS-OS-v3.0-MASTER-BLUEPRINT_chatgpt-ent.md

### A3: Populate source-files/
Find these specific files in archive/:
- AI_Builders_Master_Workflow_Prompt_v4.0.md (or v3.1)
- unified_beginner_solopreneur_app_building_workflow_playbook_v3.md
Copy to source-files/.

### A4: Populate multi-agents/
Find multi-agent-orchestration-master-guide-v4.md in archive/.
Copy to multi-agents/.
Also check for the multi_agent_orchestration-kit/ folder — if it exists, copy it too.

### A5: Populate memory-bank/
Find these files in archive/ (from T1-T8 package):
- projectbrief.md
- productContext.md
- activeContext.md
- systemPatterns.md
- techContext.md
- progress.md
Copy to memory-bank/.

### A6: Populate Root Files
Check if these exist at ungasis/ root. If missing, find in archive/ and copy:
- CLAUDE.md
- CONTEXT.md
- MEMORY.md
- LLM_CONTEXT.md
- llms.txt

### A7: Replace .clinerules/ with Newest Versions
Check archive/ for newer versions of:
- 01-token-efficiency.md (must contain "Layer 13" or "Output Token")
- 03-self-iteration.md (must contain "3-Attempt" or "3 attempts")
- 04-reflection.md (must contain "auto-verify")
- 05-hygiene.md (must contain "anti-pattern")
If newer versions found, replace the ones in .clinerules/.
Also check for 06-safety-gate.md — if found, copy to .clinerules/.

---

## Phase 3: Verify Assembly

### A8: Final File Count
After all copies, count:
- modules/*.md files
- blueprints/*.md files
- source-files/*.md files
- multi-agents/*.md files
- memory-bank/*.md files
- .clinerules/*.md files
- Root *.md files

Write counts to ASSEMBLY-REPORT.md.

### A9: Duplicate Check
Verify no file exists in BOTH modules/ AND root.
Verify no file exists in BOTH .clinerules/ AND root.

---

## Phase 4: QA Audit

Now execute QA-MISSION.md tasks T1-T6.
Write results to QA-AUDIT-REPORT.md.

---

## Completion
When ALL phases done, write "🏰 MISSION COMPLETE" at bottom of QA-AUDIT-REPORT.md.

