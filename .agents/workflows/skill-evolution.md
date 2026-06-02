# Workflow: Skill Evolution

## Purpose
Manage the lifecycle of self-generated skills from birth to retirement based on effectiveness metrics.

## Weekly Review
During the weekly review session:
1. Open and check `_metrics/effectiveness.md`.
2. Promote skills that cross maturity thresholds:
   - **Tested:** Used 3 times without failure.
   - **Proven:** Used 10 times without failure.
   - **Optimized:** Used 50 times (compress instructions to save context tokens).
3. Identify candidates for retirement: skills that have not been used in 30 days.
4. Scan the `_proposals/` folder for pending skill proposals, reviewing them with Mel.

## Retirement Process
When a skill is candidate for retirement:
1. Move the retired skill file from `.agents/skills/_auto/` to the `.agents/skills/_auto/_retired/` folder.
2. Update its status in the file to `Retired`.
3. Log the retirement reason in `_metrics/effectiveness.md` under the Status column.
4. Keep the file for reference — never delete, as knowledge compounds.

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
