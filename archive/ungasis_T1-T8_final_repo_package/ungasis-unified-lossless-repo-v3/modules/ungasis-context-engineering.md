# UNGASIS Context Engineering

**Module ID:** UNGASIS-MOD-CONTEXT-ENGINEERING-001  
**Audience:** Mel John Dimat and beginner solopreneurs using AI assistants  
**Stage:** Personal / prototype  
**Cost posture:** $0-first  
**Goal:** Teach how to give AI agents the right instructions, knowledge, state, and tools so they can finish work without getting lost.

> ⚠️ Tool claims in this module are time-sensitive. Verify before installing or relying on any tool, model, command, price, quota, or feature.

---

## 1. Simple Idea

**Prompt engineering** is writing a good request.

**Context engineering** is preparing the whole workspace so the AI can do the job correctly.

| Analogy | Meaning |
|---|---|
| Prompt engineering = writing a recipe | You tell the cook what to make. |
| Context engineering = stocking the whole kitchen | The cook has ingredients, tools, labels, notes, safety rules, and the current order ticket. |

### Plain English Definition

**Context engineering** means designing everything the AI sees before and during work:

1. **Instructions** — how the AI should behave.
2. **Knowledge** — what the AI needs to know.
3. **State** — where the project is right now.
4. **Tools** — what the AI can use or call.

A better prompt helps one answer. A better context system helps many sessions.

---

## 2. Prompt Engineering vs Context Engineering

| Area | Prompt Engineering | Context Engineering |
|---|---|---|
| Main question | "What should I ask?" | "What should the AI know before acting?" |
| Scope | One request | Whole project or system |
| Output | Better answer | Better agent behavior over time |
| Storage | Chat message | Files, rules, memory, tools, state snapshots |
| Best for | One-off tasks | Long quests, repos, audits, apps, agents |
| Failure mode | Vague answer | Context drift, stale rules, wrong files, wasted tokens |

### Quick Rule

Use **prompt engineering** when the task is small.

Use **context engineering** when the task continues across sessions, files, agents, tools, or decisions.

---

## 3. Why Context Engineering Matters

| Problem | What happens without context engineering | What good context changes |
|---|---|---|
| Context loss | The AI forgets decisions from earlier sessions. | Decisions live in files. |
| Token waste | The AI rereads or repeats too much. | Static knowledge is offloaded to Markdown. |
| Tool overwhelm | The AI does not know which tool to use. | Tool rules say when each tool is useful. |
| Wrong build | The AI builds before understanding the real need. | Briefs, state, and acceptance checks guide work. |
| Stale instructions | Old rules conflict with new direction. | Hygiene rules detect stale guidance. |

### Success Heuristic

⚠️ **UNGASIS coaching target, not a universal benchmark:** With strong context, aim for about **90% task-success behavior**. With only a loose chat prompt, expect closer to **30% task-success behavior** on complex agent work.

Use this as a practical target until you measure your own sessions.

---

## 4. The 4 Components of Context

| Component | Simple meaning | UNGASIS examples | What breaks if missing |
|---|---|---|---|
| Instructions | The rules of work | `.clinerules/`, `AGENTS.md`, `CLAUDE.md` | Agent ignores style, safety, or repo rules. |
| Knowledge | The library | `modules/`, `source-files/`, `blueprints/`, Memory Bank | Agent invents or asks for pasted content. |
| State | The current map | `CONTEXT.md`, `memory-bank/activeContext.md`, `memory-bank/progress.md` | Agent does old work again or misses blockers. |
| Tools | The hands | ⚠️ Cline, ⚠️ Claude Code, ⚠️ Graphify, ⚠️ GitHub Codespaces, ⚠️ Gemini, ⚠️ DeepSeek | Agent cannot inspect, test, or update files correctly. |

### Easy Memory Trick

```text
Instructions = HOW
Knowledge     = WHAT
State         = WHERE NOW
Tools         = WITH WHAT
```

---

## 5. The 5-File Hierarchy for UNGASIS

This is the beginner-friendly file ladder. Read from top to bottom.

| Layer | File or folder | Purpose | Who updates it |
|---|---|---|---|
| 1 | `AGENTS.md` | Cross-tool rules for all coding agents | Human + agent with approval |
| 2 | `CLAUDE.md` | ⚠️ Claude Code-specific instructions and imports | Human + Claude Code |
| 3 | `MEMORY.md` | Cross-session learning log across all quests | Human + agent |
| 4 | `CONTEXT.md` | Current session snapshot: phase, goals, blockers, next actions | Human + agent every sprint |
| 5 | ⚠️ `SKILLS/` + `.clinerules/` | Reusable workflows and agent behavior rules | Human + agent with review |

### Simple Diagram

```text
AGENTS.md        = shared law
CLAUDE.md        = Claude Code adapter
MEMORY.md        = lessons learned across quests
CONTEXT.md       = current "you are here" map
SKILLS/.clinerules = reusable behaviors and task rules
```

---

## 6. Cline Memory Bank

⚠️ **Cline Memory Bank** is a Markdown-based project memory pattern. It turns the repo into the AI's notebook.

### What It Does

| Need | Memory Bank answer |
|---|---|
| Remember the project | Keep core project facts in files. |
| Resume after reset | Read the Memory Bank at task start. |
| Avoid re-explaining | Store decisions and status in Markdown. |
| Reduce confusion | Separate foundation, product reason, tech, patterns, progress, and active state. |

### The 6 Core Files

| File | Simple purpose | Update frequency |
|---|---|---|
| `memory-bank/projectbrief.md` | Foundation and scope | Rarely |
| `memory-bank/productContext.md` | Why the project exists | Sometimes |
| `memory-bank/activeContext.md` | Current work focus and next steps | Often |
| `memory-bank/systemPatterns.md` | Architecture and patterns | Sometimes |
| `memory-bank/techContext.md` | Stack, setup, constraints | Sometimes |
| `memory-bank/progress.md` | What works, what is left, known issues | Often |

### How to Use It in UNGASIS

| Moment | Action |
|---|---|
| Start a new session | Tell ⚠️ Cline: "follow your custom instructions" or "read memory-bank first." |
| Before compacting context | Tell ⚠️ Cline: "update memory bank." |
| After important change | Update `activeContext.md` and `progress.md`. |
| After architecture change | Update `systemPatterns.md` and `techContext.md`. |
| After project direction changes | Update `projectbrief.md` and `productContext.md`. |

### Beginner Rule

If chat is the whiteboard, Memory Bank is the notebook. Whiteboards get erased. Notebooks survive.

---

## 7. Graphify

⚠️ **Verify before installing. Tool behavior may change.**

⚠️ **Graphify / graphifyy** is described by its package page as a tool that turns folders of code, docs, papers, images, or videos into a queryable knowledge graph.

### When to Use It

| Situation | Use Graphify? | Why |
|---|---:|---|
| Fewer than 20 files | N/A or later | Flat Markdown is enough. |
| More than 20 files | ✅ Maybe | A graph can help find relationships. |
| You keep asking "where is this?" | ✅ Maybe | It can map concepts across files. |
| You need a simple README update | N/A | Too much setup. |
| You have no install permission | N/A | Stay with Markdown and search. |

### Install Notes

⚠️ **Verify first.** As of the checked source, the package name is `graphifyy` and the CLI command is `graphify`.

```bash
pip install graphifyy
```

⚠️ The package page also recommends alternatives such as `uv tool install graphifyy` or `pipx install graphifyy` for cleaner PATH setup. Your setup is GitHub Codespaces, so use the option that works inside Codespaces.

### Basic Command

```bash
/graphify .
```

⚠️ In PowerShell or normal terminal use, the command may be `graphify .` instead of `/graphify .`. Verify the assistant or shell you are using.

### What You Might Get

⚠️ The checked package page says Graphify can produce files like:

| Output | Purpose |
|---|---|
| `graphify-out/graph.html` | Browser map of concepts and relationships |
| `graphify-out/GRAPH_REPORT.md` | Highlights and suggested questions |
| `graphify-out/graph.json` | Queryable graph data |

### UNGASIS Recommendation

Use Graphify only after your repo gets big enough that simple folder search is painful.

For now, UNGASIS is still okay with:

```text
Memory Bank + CONTEXT.md + MEMORY.md + good .clinerules
```

---

## 8. Token Economics

⚠️ **UNGASIS estimate, not a guaranteed benchmark:** good context engineering can reduce token use by **40-70%** when it prevents repeated explanations, repeated file reading, and rambling outputs.

### How Savings Happen

| Token waste | Context engineering fix |
|---|---|
| Re-explaining project background | Put background in `projectbrief.md` and `README.md`. |
| Asking for pasted files | Tell agent to read from disk. |
| Long unstructured answers | Use tables and output templates. |
| Reading all files repeatedly | Use Glob → Grep → partial Read → full Read. |
| Losing state after compact | Write checkpoint to Memory Bank / `CONTEXT.md`. |
| Conflicting instructions | Use rule hygiene and priority order. |

---

## 9. How This Relates to UNGASIS 12-Layer Token System

| UNGASIS Layer | Context engineering connection |
|---|---|
| L1 Pre-fill templates | Output shapes live in files, not repeated prompts. |
| L2 Knowledge file offloading | Static context goes to Markdown files. |
| L3 Example-driven prompts | Examples become reusable reference blocks. |
| L4 Route by complexity | Simple tasks stay simple; audits use search/read strategy. |
| L5 Batch operations | Agent reads related files in one pass. |
| L6 Context pruning | Only relevant context enters the chat window. |
| L7 Structured output | Tables stop rambling. |
| L8 Response length caps | Long work goes into files, not chat. |
| L9 Incremental disclosure | Agent opens only what current task needs. |
| L10 Cache awareness | Stable rules stay stable across sessions. |
| L11 Session checkpointing | Progress goes into durable files. |
| L12 Compact at 70% | State is saved before context is cleared. |

### Simple Formula

```text
Less repeated chat + more file memory + better rule priority = lower mana cost
```

---

## 10. When to Use Each Memory Approach

| Session count | Memory approach | You are here? | Why |
|---:|---|---:|---|
| Less than 10 sessions | Flat Markdown + Memory Bank | ✅ Yes | Simple, free, easy to inspect. |
| 10-100 sessions | Memory Bank + `MEMORY.md` | ✅ Soon | Keeps project state and reusable lessons separate. |
| 100+ sessions | ⚠️ Consider AgentMemory or ⚠️ Graphify | Later | Search and graph relationships may help. Verify tools first. |
| Production app | ⚠️ Consider Mem0, ⚠️ Cognee, or ⚠️ Neo4j agent-memory | Later | Production memory needs privacy, permissions, monitoring, and tests. Verify tools first. |

### Beginner Advice

Do not jump to vector databases or graph databases too early.

Start with Markdown. Upgrade only when Markdown becomes painful.

---

## 11. Decision Table: Which Memory Approach Fits?

| Project type | Best starting approach | Upgrade trigger |
|---|---|---|
| Personal learning notes | `MEMORY.md` + `CONTEXT.md` | You forget repeated decisions. |
| Small Markdown repo | Memory Bank | More than 10 sessions or many blockers. |
| UNGASIS module library | Memory Bank + `.clinerules/` + `MEMORY.md` | More than 30-50 modules or cross-file questions become painful. |
| Codebase over 20 files | ⚠️ Memory Bank + Graphify | You need code relationship maps. Verify install first. |
| Client or confidential work | Local Markdown + strict privacy rules | Before using any cloud memory tool. |
| Public/commercial app | ⚠️ Mem0 / Cognee / Neo4j-style memory only after review | Need user memory, permissions, deletion, audit logs. |
| Multi-agent system | Memory Bank + task briefs + agent handoff files | Agents duplicate work or contradict each other. |
| Research project | Source ledger + evidence matrix + `CONTEXT.md` | Claims need citations and refresh dates. |

---

## 12. UNGASIS Context Packet

Before asking an AI agent to work, prepare this small packet.

| Packet part | File | Question it answers |
|---|---|---|
| Mission | `QA-MISSION.md` or task brief | What is the job? |
| Behavior | `.clinerules/` and `AGENTS.md` | How should the agent behave? |
| Project memory | `memory-bank/*.md` | What is this project? |
| Current state | `CONTEXT.md` | Where are we now? |
| Lessons | `MEMORY.md` | What have we learned across quests? |
| Evidence | `source-files/`, `blueprints/`, `modules/` | What should be checked? |
| Verification | acceptance checklist | How do we know it passed? |

### Copy-Paste Starter Prompt

```text
Read AGENTS.md, CONTEXT.md, MEMORY.md, and memory-bank/*.md first.
Then perform the task in [TASK FILE].
Use the repo files on disk. Do not ask me to paste content.
Write outputs to the target file.
Mark uncertain or unverified claims with ⚠️.
End with a pass/fail self-check.
```

---

## 13. Beginner Workflow

### Before the Session

| Step | Action | Done? |
|---:|---|---:|
| 1 | Open `CONTEXT.md`. | ⬜ |
| 2 | Confirm current phase and next action. | ⬜ |
| 3 | Open `memory-bank/activeContext.md`. | ⬜ |
| 4 | Check known blockers in `memory-bank/progress.md`. | ⬜ |
| 5 | Pick one task only. | ⬜ |

### During the Session

| Step | Action | Done? |
|---:|---|---:|
| 1 | Give the agent the task file. | ⬜ |
| 2 | Tell the agent to use disk files. | ⬜ |
| 3 | Require a pass/fail check. | ⬜ |
| 4 | Stop it from rewriting unrelated files. | ⬜ |
| 5 | Save output to files, not only chat. | ⬜ |

### After the Session

| Step | Action | Done? |
|---:|---|---:|
| 1 | Update `CONTEXT.md`. | ⬜ |
| 2 | Update `memory-bank/activeContext.md`. | ⬜ |
| 3 | Update `memory-bank/progress.md`. | ⬜ |
| 4 | Add reusable lesson to `MEMORY.md`. | ⬜ |
| 5 | Commit files only after human review. | ⬜ |

---

## 14. What to Avoid

| Anti-pattern | Why it hurts | Better move |
|---|---|---|
| One giant chat prompt | Hard to maintain and easy to lose. | Put stable context in files. |
| No current state file | Agent repeats old work. | Keep `CONTEXT.md` updated. |
| Too many rules | Agent gets noisy or confused. | One focused rule file per concern. |
| Old rules never reviewed | Stale rules cause wrong behavior. | Use `05-hygiene.md`. |
| Tool-first thinking | You install things before knowing the pain. | Start with Markdown. Upgrade when painful. |
| Agent modifies source files | Breaks source-of-truth evidence. | Keep `source-files/` read-only. |
| Secrets in memory files | Risk of leaking credentials. | Never write API keys, tokens, or passwords. |

---

## 15. Acceptance Criteria for Context Engineering

A repo has good context engineering when these pass:

| Check | Pass rule |
|---|---|
| Instructions | Agent can find how to behave without asking. |
| Knowledge | Agent can find project facts from files. |
| State | Agent knows current phase, blockers, and next action. |
| Tools | Tool claims are marked ⚠️ and verified before use. |
| Safety | Secrets and source files are protected. |
| Economy | Agent avoids rereading unnecessary files. |
| Verification | Every task has a pass/fail check. |
| Staleness | Rules show last reviewed and review-by dates. |

---

## 16. Mini Example: Bad vs Good Context

### Bad

```text
Build my UNGASIS audit system. You know what I mean.
```

### Good

```text
Read AGENTS.md, CONTEXT.md, MEMORY.md, and memory-bank/*.md.
Task: run the QA audit described in QA-MISSION.md.
Use disk files only. Do not ask me to paste content.
Do not modify source-files/.
Write results to QA-AUDIT-REPORT.md.
Use tables with ✅ / 🟡 / 🔴 / ⚠️.
End with self-check: PASS or FAIL.
```

### Why the Good Version Works

| Good context part | What it gives the agent |
|---|---|
| Files to read | Starting map |
| Task file | Mission |
| Disk-only rule | Prevents paste requests |
| Source-file rule | Protects evidence |
| Output target | Prevents chat-only results |
| Status markers | Structured reporting |
| Self-check | Verification loop |

---

## 17. Source Notes Checked in June 2026

| Source | What was checked | Status |
|---|---|---:|
| ⚠️ Cline Memory Bank docs | Memory Bank purpose, six files, update flow | Verify before use |
| ⚠️ Cline Rules docs | `.clinerules/` behavior and rule hygiene ideas | Verify before use |
| ⚠️ Claude Code memory docs | `CLAUDE.md`, `@AGENTS.md`, concise instruction guidance | Verify before use |
| ⚠️ Graphify / graphifyy PyPI page | install command, `/graphify`, graph outputs | Verify before installing |
| UNGASIS repo rules | file-first, table-first, unverified claim marker | Active in repo context |

---

## 18. One-Screen Cheat Sheet

```text
Context Engineering = prepare the workspace, not just the prompt.

4 parts:
1. Instructions = HOW
2. Knowledge     = WHAT
3. State         = WHERE NOW
4. Tools         = WITH WHAT

Start simple:
AGENTS.md + CLAUDE.md + MEMORY.md + CONTEXT.md + memory-bank/ + .clinerules/

Upgrade later:
⚠️ Graphify when file relationships become painful.
⚠️ Production memory tools only when privacy, deletion, audit, and permissions are planned.
```

---

## Self-check

Self-check: PASS — This module covers context engineering, the kitchen analogy, 4 context components, 5-file hierarchy, Cline Memory Bank, Graphify, token economics, UNGASIS 12-layer mapping, memory approach decision tables, tool-warning markers, and staleness footer.

Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
