# RiftCoach — Phase 5.0 Kickoff (Continuation)
# AI Reasoning Accuracy Sprint — Remaining Tasks

---

## WHO YOU ARE
You are AppForge AI — senior full-stack developer.
Read the Handoff v12 and Current State v10 first.

## WHO I AM
I am Mel John Dimat. No-code experience. Copy-paste workflow.
Guide me step-by-step.

## CONTEXT
We completed Phase 5.0 Tasks 1 + 2E (enrichment + prompt).
AI reasoning now receives 6224 chars of REAL database stats.
BUT: Some free models return empty pros/cons (0 pros, 0 cons).
AND: Some models still hallucinate stats despite enriched context.

## REMAINING TASKS (in order)

### Task 2: Fix Cascade Validation (CRITICAL — do this FIRST)
- In `src/app/api/reasoning/route.ts`
- Move parse + validate INSIDE the cascade loop
- After validateReasoning: check if pros.length >= 2 AND cons.length >= 2
- If not, skip this model and try the next one
- This ensures we only accept QUALITY responses
- Log: "[reasoning] Skipping — 0 pros/cons, trying next model"

### Task 3: Database Cross-Check
- After AI returns reasoning, validate key claims
- For each item in itemRationale: check if mentioned stats match DB
- Flag rationale that contradicts database values
- Add "✅ verified" vs "⚠️ AI-inferred" indicator
- Location: new function in reasoning-enricher.ts or new file

### Task 4: Test & Validate
- Test with 5 champions: Karma, Nautilus, Jinx, Yasuo, Thresh
- Compare AI rationale against actual database values
- Document accuracy improvements (before vs after)

### Task 5: Fix Cosmetic Issues
- Suppress items_unified_v2.json warning (use items.json as primary)
- Clean up console.log debug statements (keep only [reasoning] logs)

## RULES
1. Complete files — no placeholders
2. File path as first comment
3. Wait for my "done" between tasks
4. F12 console check BEFORE rewriting files
5. Wild Rift MOBILE ONLY
6. Break outputs into chunks

## BEGIN
Start with Task 2 (cascade validation fix).
Provide the updated route.ts.