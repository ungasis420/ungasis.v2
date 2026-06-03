# Intent Parser Examples

## Purpose
Provide training examples and mock keyword matching targets for the Natural Language Intent Parser.

## Training Examples

### 1. Build Intents
1. "make a new dashboard page" → `BUILD` + `DESIGN`
2. "create 5 files for the OKR engine" → `BUILD_MULTI`
3. "add a staleness footer to these files" → `FIX` (simple edit)
4. "scaffold a React app structure" → `BUILD`
5. "add a new API endpoint for warnings" → `BUILD`
6. "wire up the database connection in db.ts" → `BUILD`
7. "create the UI layout for the coach page" → `DESIGN`
8. "add a CSS card component matching glassmorphism" → `DESIGN`
9. "generate a footer component" → `BUILD_SIMPLE`
10. "make a settings page wireframe" → `DESIGN`

### 2. Plan Intents
1. "I have 2 hours, what should I do?" → `PLAN` + `ENERGY`
2. "prioritize my queue" → `PLAN`
3. "what's the highest impact task?" → `PLAN`
4. "help me plan this afternoon's sprint" → `PLAN`
5. "what are my strategic objectives this week?" → `PLAN`
6. "how should I order these pending tasks?" → `PLAN`
7. "do I have any tasks related to RiftCoach?" → `PLAN`
8. "organize my work schedule" → `PLAN`
9. "deconstruct Sprint F21" → `PLAN`
10. "recommend next steps for deployment" → `PLAN`

### 3. Status Intents
1. "morning report" → `STATUS` (`daily-pulse.py`)
2. "how many warnings?" → `CHECK` (`warn-check.py`)
3. "quality scores this week" → `QUALITY` (`quality-score.py`)
4. "how is the codebase health?" → `STATUS`
5. "show unresolved errors" → `CHECK`
6. "are my footers up to date?" → `CHECK`
7. "calculate the repository's average quality score" → `QUALITY`
8. "give me the current OKR progress" → `STATUS`
9. "list the status of all active projects" → `STATUS`
10. "check file staleness index" → `STATUS`

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
