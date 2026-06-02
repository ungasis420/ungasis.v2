# multi-agent-sprint.md — Multi-Agent Sprint Orchestration

## Trigger
A large, multi-file feature requires coordination across multiple agents (e.g., Antigravity, Cline, and Copilot) in a single sprint.

## Steps
1. **Break Down Tasks:** Decompose the feature into isolated, independent files or functions.
2. **Assign Agents by Capability:**
   - Antigravity: Scaffold folders, create genomes, compile configs.
   - Cline: Bug fixing and refactoring.
   - Copilot: Planning and drafting specs.
3. **Define Handoff Points:** Write clear markdown checkpoints to ensure agents read updated files before starting their subtasks.
4. **Merge Code Blocks:** Commit and push intermediate code changes.
5. **Verify Project Integration:** Run build scripts and review the overall health of the integrated code.

## Time to Complete
~30 minutes.

## Expected Output
An integrated feature with all components passing compilation checks.

## Gotchas
- Do not run two agents on the exact same file at the same time to prevent merge conflicts.

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
