# UNGASIS OS — Token Efficiency Protocol
> Applied automatically to every session. Agents read this from .ungasis/config/.

## Core Principle
Every token has a cost. Minimize waste without sacrificing quality.
5 short sessions < 1 long session. Fresh context > accumulated bloat.

## Session Rules
1. Max 15 exchanges before triggering handoff summary + fresh session
2. Start fresh sessions per task — never reuse mega-conversations
3. Handoff prompts must be < 6,000 tokens (current v18 = 5,500 — good)
4. Always include verification command (npm run build, test script)
   so agent self-validates instead of asking "does this look right?"

## Context Rules
5. Embedded persona files (auto-loaded) — never upload what's in .github/agents/
6. Each agent/subagent gets ONLY the context it needs — not the full project
7. Define file boundaries per agent to prevent overlap and re-reads
8. Use .claudeignore / .gitignore patterns to exclude from indexing:
   - node_modules/, dist/, build/, .next/, .cache_v3/, __pycache__/
   - *.lock, *.db, *.sqlite, package-lock.json
   - .git/ (except .gitignore)

## Model Selection Protocol
9. Match model to task complexity:
   | Task Type | Model | Why |
   |---|---|---|
   | File sync, search, small edit | Flash (High) | Cheapest for simple tasks |
   | Multi-task sprint (3+ tasks) | Pro (High) | Strong reasoning for chains |
   | Architecture / planning | Pro (High) | Needs deep context |
   | Quick investigation | Flash (Medium) | Fastest |
   | Avoid always | GPT-OSS 120B | JSON parse failures |

10. Never use the slowest-smartest model for execution tasks.
    Reserve it for architecture and planning only.

## Prompt Engineering Rules
11. Literal restatement of user phrasing in queries (lexical matching)
12. Batch independent queries in parallel (don't wait for sequential)
13. Include exact file paths — never make agent search for known files
14. Provide expected output format upfront (table, list, code block)

## Anti-Bloat Rules
15. Max 200 lines per new file
16. No duplicate information across .md files
17. Staleness footers on all documentation
18. If same task fails 3x — rewrite prompt, don't retry same approach
    (Karpathy: "Skill issue, not model issue")

## Measurement
- Track approximate tokens per session (note in CONTEXT.md)
- Flag sessions that exceed 20 exchanges
- Log model used per task for optimization review

## Investigation Limit Protocol (Anti-Marathon Rule)
When searching for information, configuration, or troubleshooting:

1. **3-Strike Rule:** After 3 failed attempts to find/resolve something, STOP and ASK the user
   - Don't search PowerShell history, browser profiles, git logs, or conversation archives
   - Don't create more than 3 scratch/test scripts for the same question
   - Don't scan filesystem recursively for the same pattern more than twice

2. **Ask-First Threshold:** If the answer requires USER-SPECIFIC knowledge
   (API keys, passwords, account details, personal preferences), ASK IMMEDIATELY
   - Never search for secrets — ask the user to provide them
   - Never scan logs/history for credentials
   - Examples: "Which key is your Pro key?", "What's your preferred port?"

3. **Cost Check:** Before starting an investigation chain, estimate:
   - "Will this take more than 5 commands to resolve?"
   - If YES → ask the user first, then investigate with their guidance
   - If NO → proceed, but stop at 3 failures

4. **Marathon Detection:** If you notice yourself:
   - Creating 3+ scratch scripts for the same problem → STOP, ask user
   - Running 5+ search/scan commands without finding the answer → STOP, ask user
   - Scheduling timers to wait for your own background tasks → STOP, simplify approach
   - Searching conversation history or browser data → STOP, ask user directly

5. **Response Template When Stopping:**
   "I've checked [X] and [Y] but couldn't find [Z]. 
   Can you tell me [specific question]? This will save us ~[N] minutes."

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
