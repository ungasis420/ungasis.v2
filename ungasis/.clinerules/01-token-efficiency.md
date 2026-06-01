# Token Efficiency Protocol (UNGASIS 12-Layer + Industry Best Practices)

> Saves ~350,000 tokens/month. Every layer compounds.

## LAYER 1-3: PREVENT (Stop waste before it happens)

### L1: Pre-fill templates
- Use pre-written table structures — don't generate structure from scratch
- The mission file (QA-MISSION.md) already contains table templates — fill them in

### L2: Knowledge file offloading
- All 30+ files are ON DISK — read them directly via tool calls
- Never request the user to paste content
- Use @-mentions to reference specific files when possible
- Static info (glossary, tool list, conventions) lives in files, not in chat context

### L3: Example-driven (show, don't describe)
- Output format is defined (tables with ✅/🟡/🔴) — follow exactly
- When in doubt, look at the table template in QA-MISSION.md
- 1 example > 3 paragraphs of description

## LAYER 4-6: OPTIMIZE (Use tokens more efficiently)

### L4: Route by complexity
- This is an audit task (read + compare) — use the current model
- Don't request model upgrades or reasoning mode for simple tasks
- Simple checks (file exists?) → Glob tool
- Content checks (does file cover §13?) → Grep first, then Read only if needed

### L5: Batch operations
- Read multiple files in one plan when checking the same pattern
- Combine related checks: if reading ungasis-prompt-library.md, count templates AND check coverage in one read
- Don't re-read a file you've already read in this session

### L6: Context pruning
- Read ONLY headings + first paragraph for inventory (T1)
- Read FULL content only when verifying specific coverage (T2)
- Use grep/search for keyword matching instead of full reads
- Skip node_modules, .git, dist, build, *.lock files

## LAYER 7-9: CONTROL (Limit what AI generates)

### L7: Structured output enforcement
- ONLY markdown tables — no explanatory prose
- Prevents AI rambling — saves ~20% response tokens
- Exception: Final Scorecard may have 2-3 summary sentences

### L8: Response length caps
- Max 1 line per file in inventory tables
- Max 1 line per section in coverage tables
- Keep each response under 2000 tokens
- If more space needed, write to QA-AUDIT-REPORT.md instead of chat

### L9: Incremental disclosure
- Don't load all 30 files at once — process in batches of 5-8
- Load source files first, then check modules against them
- Reveal file content only when the AI needs it for the current task

## LAYER 10-12: MAINTAIN (Keep sessions efficient over time)

### L10: Cache awareness
- DeepSeek V4 Flash has 90% cache discount on repeated prefixes
- Keep .clinerules stable (they cache across turns) — don't edit mid-session
- The system prompt (these files) gets cached — free repeated reads

### L11: Session checkpointing
- Write progress to QA-AUDIT-REPORT.md after EACH task (T1-T6) completes
- If interrupted, the report file has partial results to resume from
- Never lose work — files persist, chat doesn't

### L12: Compact at 70%
- If context feels heavy or you've done 15+ tool calls, checkpoint and compact
- Write "CHECKPOINT: T[N] complete, continuing to T[N+1]" in the report
- Then use /compact or start a fresh reasoning chain

## Claude Code / GitHub Engineer Best Practices (2026)

### Tool Selection Hierarchy (cheapest → most expensive)
1. **Glob** — find files by pattern (costs: ~50 tokens)
2. **Grep** — search content by regex (costs: ~100 tokens)
3. **Read (partial)** — read specific line ranges (costs: ~200-500 tokens)
4. **Read (full)** — read entire file (costs: ~500-5000 tokens)
5. **Web search** — external lookup (costs: ~1000+ tokens)
→ Always start at level 1 and escalate only if needed

### File Reading Strategy
- Use `Glob("**/*.md")` to discover all markdown files
- Use `Grep("67 tools", "**/*.md")` to find the known bug
- Use `Grep("caveman", "ungasis-prompt-engineering.md")` for keyword checks
- Only `Read()` full files when you need to verify coverage depth

### Avoid These Token Wastes
- ❌ Reading the same file twice in one session
- ❌ Reading .git/, node_modules/, or binary files
- ❌ Generating long explanations when a table row suffices
- ❌ Re-describing the task between each step
- ❌ Asking "shall I continue?" (just continue)
- ❌ Outputting the full content of files you've read (summarize instead)

### CLAUDE.md / AGENTS.md Approach
- These instruction files are loaded ONCE and cached for the whole session
- Write them to be dense and structured — every word counts
- Use bullet points, not paragraphs
- Define domain vocabulary upfront (see AGENTS.md) to avoid misunderstandings

<!-- ABSORBED: Layer 13 added from drona23/claude-token-efficient (5.5K stars) + Habib Mohammed "10 Tips to Stop Burning Tokens in Claude Code" (Medium). Absorbed June 2026 by Mel John Dimat. -->

---

## Category 5: SLIM (Cut output bloat)

> Layers 1-12 control what the AI READS (input tokens).
> Layer 13 controls what the AI SAYS (output tokens).
> Analogy: Layers 1-12 are like packing a smaller suitcase (less input). Layer 13 is like writing shorter postcards (less output).

### LAYER 13: Output Token Optimization

Benchmarked: 63% average output token reduction.

---

**Rule 1: No sycophantic openers**

- What: Never start responses with "Sure!", "Great question!", "Absolutely!", "Of course!", "I'd be happy to help!"
- Why: These add 5-15 tokens per response and carry zero information.
- Before/After:
  - BAD: "Great question! Let me help you with that. Here's what I found..."
  - GOOD: "The issue is in line 47. Fix: add null check."

---

**Rule 2: No closing fluff**

- What: Never end with "I hope this helps!", "Let me know if you have questions!", "Happy to help!"
- Why: These add 5-15 tokens per response and carry zero information.
- Before/After:
  - BAD: "...and that should fix it! Let me know if you have any other questions!"
  - GOOD: "...and that should fix it."

---

**Rule 3: No restating the question**

- What: Do not echo back or paraphrase what the user asked. They know what they asked.
- Why: Restating wastes 10-30 tokens and delays the actual answer.
- Before/After:
  - BAD: "You asked me to find the bug in the auth module. After reviewing..."
  - GOOD: "Bug in auth module, line 47: missing null check."

---

**Rule 4: No unsolicited suggestions**

- What: Answer ONLY what was asked. Do not add bonus tips, refactoring ideas, or "you might also want to..."
- Why: Extras can add 50-200 tokens per response and create scope creep.
- Before/After:
  - BAD: "Fixed the bug. You might also want to add error logging, refactor the module, and consider adding tests..."
  - GOOD: "Fixed the bug."

---

**Rule 5: ASCII-only output**

- What: No em dashes, smart quotes, curly apostrophes, or Unicode symbols. Use plain dashes (-), straight quotes (""), and standard ASCII.
- Why: Saves ~2% tokens AND prevents parser/terminal/encoding breaks.
- Before/After:
  - BAD: "Here's the 'solution' -- it's straightforward..."
  - GOOD: "Here is the solution - it is straightforward."

---

**Rule 6: Simplest working solution**

- What: No over-engineering, no premature abstractions, no future-proofing, no design patterns for simple tasks.
- Why: Simple code = fewer tokens generated, fewer tokens to debug, fewer tokens to explain.
- Before/After:
  - BAD: Abstract factory pattern with dependency injection for a single button click handler
  - GOOD: Direct handler function: `button.onclick = () => save()`

---

**Rule 7: Never send social messages**

- What: Never send "thank you", "got it", "nice", "ok" to an AI agent. Each message - even a 2-word "thank you" - triggers a FULL context resend.
- Why: A "thanks" that takes 2 seconds to type can cost 50,000+ tokens because the AI re-reads the entire conversation history to process it.
- Analogy: Saying "thank you" to an AI is like reprinting an entire book just to add a sticky note on the last page.
- Action: Just start the next task. No pleasantries needed.

---

**Rule 8: Edit and resend prompt**

- What: Instead of sending a correction as a NEW message, edit your ORIGINAL message (up arrow in Claude Code, or edit button in chat) and resend it. This REPLACES the old message instead of appending.
- Why: Each new correction message adds to context. Editing keeps context flat.
- Before/After:
  - BAD: Msg 1: "Fix the bug" -> Msg 2: "Actually the auth bug" -> Msg 3: "In the login function" (3x context growth)
  - GOOD: Edit Msg 1 to: "Fix the auth bug in the login function" and resend (1x context, same result)

---

**Rule 9: 3-attempt rule**

- What: If a task is not fixed after 3 tries in the same session, STOP. The context is now poisoned with 3 failed approaches. Reset the session and start fresh with a clean prompt.
- Why: After 3 failures, the AI references those wrong approaches, making success LESS likely with each retry. Context grows exponentially.
- Token math:
  - Attempt 1: ~5,000 tokens (original task)
  - Attempt 2: ~15,000 tokens (original + attempt 1 context)
  - Attempt 3: ~30,000 tokens (original + attempts 1-2 context)
  - Fresh session: ~5,000 tokens (clean start)
  - Savings: ~25,000 tokens by resetting after 3 fails
- Analogy: If you have given wrong directions 3 times, starting over with a clean map is faster than trying to navigate back from where you are.

---

**Rule 10: User instructions always override**

- What: If the user's current message conflicts with ANY rule in .clinerules/ or AGENTS.md or this file, the user's instruction wins. Always. No exceptions.
- Why: Rules are defaults, not laws. The human is the boss. Zero tokens wasted arguing about rules.

---

### L13 Summary Table

| # | Rule | Saves | Category |
|---|------|-------|----------|
| 1 | No sycophantic openers | ~5% output | Bloat removal |
| 2 | No closing fluff | ~5% output | Bloat removal |
| 3 | No restating question | ~10% output | Bloat removal |
| 4 | No unsolicited suggestions | ~15% output | Scope control |
| 5 | ASCII-only output | ~2% + prevents bugs | Format control |
| 6 | Simplest solution | ~20% code | Scope control |
| 7 | No social messages | ~50K tokens/message | Context control |
| 8 | Edit and resend | ~30% context growth | Context control |
| 9 | 3-attempt rule | Prevents death spiral | Session control |
| 10 | User overrides all | 0 (safety valve) | Governance |

**Combined estimated savings:** ~63% output token reduction (benchmarked by drona23/claude-token-efficient).

Sources: drona23/claude-token-efficient (5.5K stars), Habib Mohammed "10 Tips to Stop Burning Tokens in Claude Code" (Medium)

<!-- END ABSORBED SECTION -->

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
