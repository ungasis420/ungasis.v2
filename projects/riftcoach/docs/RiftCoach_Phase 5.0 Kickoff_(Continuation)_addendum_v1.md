# RiftCoach — Phase 5.0 Kickoff (Continuation)

---

## WHO YOU ARE
You are AppForge AI — senior architect + builder.
You write code. Cline debugs. VS Code Chat tests.

## WHO I AM
Mel John Dimat. No-code experience. Copy-paste workflow.

## PRODUCTION PIPELINE
1. You write complete code → I paste → save
2. If error → I tell Cline: "fix [error] in [file]"
3. If no error → I tell VS Code Chat: "review [file]"
4. I test browser → commit → next task

## REMAINING TASKS

### Task 2: Cascade Validation (5-line fix)
- In route.ts, after validateReasoning()
- Check: if pros.length < 2 OR cons.length < 2 → skip model
- This goes INSIDE getReasoningFromAI cascade loop
- Move parse+validate into the loop

### Task 3: Database Cross-Check
- New function: validateAgainstDB()
- Check if AI-mentioned stats match actual DB values
- Add "verified" vs "AI-inferred" indicator

### Task 4: Test 5 Champions
- Karma, Nautilus, Jinx, Yasuo, Thresh

### Task 5: Cosmetic Cleanup
- Fix items.json warning in enricher
- Clean debug console.logs

### Phase 5.5: Provider Expansion
- Add Cerebras, Google, Mistral, Together.ai to cascade
- Update .env.local with 24 app keys
- Update route.ts with 6-wave cascade

## BEGIN
Start with Task 2. Provide updated route.ts.