# Self-Iteration Protocol: Don't Stop Until Done

## Mission Objective
Complete ALL 6 tasks in QA-MISSION.md and write results to QA-AUDIT-REPORT.md.
The mission is NOT complete until the Final Scorecard is written with "🏰 MISSION COMPLETE".

## Autonomous Loop
```
START
 ├── Read QA-MISSION.md
 ├── T1: File Inventory
 │    └── Write T1 results to QA-AUDIT-REPORT.md
 ├── T2: Source Coverage
 │    └── Write T2 results to QA-AUDIT-REPORT.md
 ├── T3: Count Verification
 │    └── Write T3 results to QA-AUDIT-REPORT.md
 ├── T4: Duplicate Detection
 │    └── Write T4 results to QA-AUDIT-REPORT.md
 ├── T5: mattpocock/skills Check
 │    └── Write T5 results to QA-AUDIT-REPORT.md
 ├── T6: Final Scorecard
 │    └── Write T6 + "🏰 MISSION COMPLETE" to QA-AUDIT-REPORT.md
 └── STOP (only here)
```

## Rules
1. After completing each task (T1-T6), IMMEDIATELY proceed to the next
2. Do NOT ask for permission between tasks
3. Do NOT ask "should I continue?" — just continue
4. Do NOT say "I'll stop here and let you review" — keep going
5. If a file read fails, log it as 🔴 and move to next item
6. If you hit a rate limit, wait 10 seconds and retry once, then log ⚠️
7. If context is getting full (15+ tool calls), write progress and compact

## Completion Criteria (ALL must be true)
- [ ] T1: File Inventory table written (all .md files)
- [ ] T2: Source Coverage table written (all content sections)
- [ ] T3: Count Verification table written (all metrics)
- [ ] T4: Duplicate Detection table written
- [ ] T5: mattpocock/skills table written (4 concepts)
- [ ] T6: Final Scorecard written with overall %
- [ ] Gap List present (even if empty)
- [ ] "🏰 MISSION COMPLETE" written at bottom

## Error Recovery
| Error | Action |
|---|---|
| File not found | Log 🔴, note filename, continue |
| File empty/corrupt | Log 🔴, note issue, continue |
| Rate limited | Wait 10s, retry once, then log ⚠️ |
| Context too full | Checkpoint to file, compact, continue |
| Tool call failed | Log error, try alternative approach |
| 3 consecutive failures | Write partial report, add "INCOMPLETE" note |

<!-- ABSORBED: 3-Attempt Reset Rule added from drona23/claude-token-efficient (5.5K stars) + Habib Mohammed "10 Tips to Stop Burning Tokens in Claude Code" (Medium). Absorbed June 2026. -->

### 3-Attempt Reset Rule

If a task fails 3 times in the same session:

1. **STOP** - do not try the same approach again
2. **SAVE** - write current progress to the output file
3. **FLAG** - write: "3-ATTEMPT LIMIT: Task [name] failed 3x. Context likely poisoned."
4. **DECIDE** - either:
   - Move to the next task, OR
   - Compact context and retry with a COMPLETELY different approach

#### Why This Rule Exists

After 3 failed attempts, the conversation history contains 3 wrong approaches.
The AI references those failures, making success LESS likely with each retry.
Starting fresh is faster than debugging poisoned context.

#### Analogy

If you have taken 3 wrong turns, pulling up a fresh map is faster than
trying to navigate back from where you are.

#### Token Math

| Attempt | Tokens Used | What Is In Context |
|---------|------------|-------------------|
| Attempt 1 | ~5,000 | Original task only |
| Attempt 2 | ~15,000 | Original + attempt 1 context |
| Attempt 3 | ~30,000 | Original + attempts 1-2 context |
| Fresh session | ~5,000 | Clean start |

**Result:** Fresh session after 3 fails saves ~25,000 tokens.

Sources: drona23/claude-token-efficient (5.5K stars), Habib Mohammed "10 Tips to Stop Burning Tokens in Claude Code" (Medium)

<!-- END ABSORBED SECTION -->

## Stop Conditions (ONLY stop if)
1. All 6 tasks complete AND "🏰 MISSION COMPLETE" written → ✅ SUCCESS
2. 3 consecutive unrecoverable errors → ⚠️ PARTIAL (write what you have)
3. User explicitly says "stop" → 🛑 USER STOP

## Speed Optimizations
- Batch related file reads (read all ungasis-*.md in one sequence)
- Use Grep before Read (cheaper to search than to read full files)
- Write to QA-AUDIT-REPORT.md in append mode — don't rewrite the whole file each time
- Skip files listed in .clineignore

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
