# blueprint-cache.md — Reusable Blueprint Templates

## Standard Acceptance Criteria (10 Items)
- [ ] All new markdown files must contain the standard staleness footer.
- [ ] All files must be written in Simple English under an 8th-grade reading level.
- [ ] Files must use tables instead of paragraphs for structured data.
- [ ] Files must be placed under their correct directories as specified in the blueprint.
- [ ] All file names must use strict kebab-case conventions.
- [ ] No file may exceed the maximum limit of 200 lines.
- [ ] Code symbols must use PascalCase (classes, types, interfaces).
- [ ] Source files and archive directories must remain completely unmodified.
- [ ] The Quality Auditor must audit the sprint and return a PASS verdict.
- [ ] The Graphify database must be updated with all changes before final commit.

## Standard Risk Assessment (5 Risks)
| Risk Name | Severity | Trigger Condition | Mitigation Strategy |
|---|---|---|---|
| Naming Conflicts | Low | Duplicate file or directory names | Verify path structure before writing |
| Token Overflow | High | Parsing huge source files directly | Evict stale logs, use pruned inputs |
| Stale Content | Medium | Footer date is out of range | Always check and apply standard footer |
| Archive Modification | High | Agent attempts writing to read-only paths| Enable write guards on build tool paths |
| Triple Audit Failure | High | Quality Auditor rejects files 3 times | Stop build immediately, escalate to human |

## Agent Routing Table
| Agent Name | Active Role | Primary Model | Trigger Condition |
|---|---|---|---|
| Commander 🎖️ | Goal orchestrator | Inherit | Multi-sprint goal planning |
| Architect 📐 | Blueprint spec generation | Gemini Pro / Opus | Task requires 3+ new files |
| Builder 🏗️ | Code implementation | Gemini Flash | Execution of approved blueprint |
| Surgeon 🔪 | Fast bug fixes | Cerebras Llama 8b | Fix requests under 2 files |
| Auditor 🔍 | Quality validation | Inherit | End of sprint validation |
| Watchdog 📊 | Graph indexing | Inherit | Changes committed to workspace |

## Standard Git / Audit Verification Checklist
1. **Auditing**: Run the Quality Auditor checks on newly created/modified files.
2. **Fixing**: Address any failed audit checks. Re-audit until PASS (max 3 times).
3. **Graphing**: Run the Graphify updater command to refresh node database:
   `graphify update .`
4. **Committing**: Check stage status, add files, and commit:
   `git add . && git commit -m "feat: [sprint summary]" && git push`

## CONTEXT.md Update Template
```markdown
## Session Handoff — [Current Date] 🖥️ PC (Sprint [Sprint ID])

**Sprint:** [Sprint ID] — [Sprint Title]
**Model:** [Model Used]

**What was accomplished:**
- [Bullet points of key implementations]
- Created [X] new files and updated [Y] existing files.

**Key Metrics:**
- **Total files:** ~[Total Files] files across [Total Folders] folders.
- **Graphify status:** [Nodes] nodes, [Edges] edges, [Communities] communities.
- **JARVIS score:** [JARVIS]% complete.

**What's next:**
1. [Next Sprint Target ID]

**Known issues:** [None / Detail]

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
```

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
