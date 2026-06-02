# LLM_CONTEXT.md - UNGASIS Read-First Context

<!-- ABSORBED: ai_project_os_v5 — LLM_CONTEXT.md compact project context -->

Use this file first when an AI assistant starts work in this repo.
Think of it like a **project passport**: it tells the assistant who this repo is, where to look, what to avoid, and how to check work.

## 1. Project identity

<!-- ABSORBED: ai_project_os_v5 — Project identity and high-signal context -->

| Item | Current value |
|---|---|
| Project name | UNGASIS OS |
| Full name | Unified Neural Guidance and Strategic Intelligence System |
| Owner | Mel John Dimat |
| Main user | Mel first; beginner, ESL speaker, visual learner, $0 budget |
| Purpose | A personal AI operating system for prompts, research, app planning, workflows, knowledge, safety, and decision support |
| Current phase | v7.0.1 compact router with AI Project OS v5 concepts being absorbed into simple UNGASIS-style modules |
| Repo type | Markdown-first knowledge repo, not a running app |
| Default rigor | Personal / prototype unless the task is public, commercial, sensitive, or regulated |
| Budget posture | Free-first / $0 upfront |

## 2. Stack and tools

<!-- ABSORBED: ai_project_os_v5 — Minimal instructions maximum signal -->

| Area | Default stack / tool |
|---|---|
| Core format | Markdown files |
| Main AI workspace | ChatGPT Project / project files |
| Coding-agent rules | `.clinerules/` |
| Cross-tool agent guide | `AGENTS.md` |
| Version control target | Git / GitHub when used |
| Office / reporting work | Excel, Power Query, Power BI, Power Automate, Power Apps, M365 when faster than custom code |
| App prototype preference | Portable, local-first, provider-agnostic, no required paid tool |
| Secrets handling | Never store secrets in prompts, public files, frontend code, screenshots, or `llms.txt` |

## 3. Read order for AI assistants

<!-- ABSORBED: ai_project_os_v5 — Read order and context bottleneck control -->

Read only what is needed. Do not load the whole repo unless the task truly needs it.

| Order | File or folder | Why it matters |
|---:|---|---|
| 1 | `LLM_CONTEXT.md` | Fast project orientation |
| 2 | `AGENTS.md` | Cross-tool behavior, domain words, safety rules |
| 3 | `VERSION_MANIFEST.md` | Current version, priority order, active modules |
| 4 | Current user task / active brief | The latest instruction wins if safe |
| 5 | `.clinerules/` | Agent rules for safe editing, reflection, hygiene, safety gates |
| 6 | Most specific module file | Use only the relevant kernel/module for the task |
| 7 | `RESET_CHECKLIST.md` | Smoke tests after big migrations |

## 4. Key files

<!-- ABSORBED: ai_project_os_v5 — Project layers and source of truth map -->

| File | Role | Safe use |
|---|---|---|
| `README.md` | Repo intro and install order | Read first for setup |
| `AGENTS.md` | Agent behavior and domain language | Follow during AI-assisted work |
| `VERSION_MANIFEST.md` | Version priority and active modules | Use to resolve conflicts |
| `00A_PROJECT_INSTRUCTIONS_BASELINE_LOCK.md` | Preserved baseline behavior | Use only when compact instructions need recovery |
| `00_ROUTER_BEHAVIOR_RIGOR_SYSTEMS.md` | Mode routing, Rigor Dial, systems logic | Use for routing and depth decisions |
| `01_ENGINE_KERNEL_ALL_ENGINES.md` | Doing capabilities | Use to choose the right work engine |
| `02_FRAMEWORK_KERNEL_ALL_FRAMEWORKS.md` | Thinking methods | Use to structure reasoning |
| `03_INTELLIGENCE_KERNEL_ALL_INTELLIGENCES.md` | Judgment styles | Use to calibrate output |
| `04_MEMORY_KNOWLEDGE_GUARDRAILS.md` | Memory, knowledge, safety rules | Use for privacy, source, and risk boundaries |
| `05_TEMPLATES_TOOLS_ARTIFACTS_EVALUATION.md` | Output templates and QA checks | Use for deliverable format |
| `06_MAINTENANCE_MANIFEST_TESTS_EVOLUTION.md` | Updates, tests, drift control | Use for OS evolution and regression tests |
| `ungasis-context-loops.md` | Karpathy Loop + Context Engineering Loop | Use for context pack and refresh work |
| `ungasis-knowledge-base.md` | Knowledge base structure and librarian loop | Use when sources and lessons should become reusable |
| `ungasis-sop-library.md` | SOP library if present and populated | Verify file is not empty before relying on it |
| `SOURCE_REFERENCES.md` | Source list for current platform/tool claims | Use only as a reference list; re-check current facts when needed |
| `SKILL_CANDIDATES.md` | Future skill ideas | Do not create skills unless Mel asks |

## 5. Current goals

<!-- ABSORBED: ai_project_os_v5 — Current goals and handoff state -->

| Goal | Meaning |
|---|---|
| Keep UNGASIS simple | Use simple English, tables, checklists, and analogies |
| Absorb v5 without copying | Reuse the useful ideas; rewrite in UNGASIS voice |
| Strengthen context flow | Keep `LLM_CONTEXT.md` short, current, and useful |
| Strengthen public navigation | Keep `llms.txt` safe for shared repos |
| Improve safety gates | Read before write, fail loud, verify after changes |
| Improve knowledge reuse | Turn repeated lessons into modules, SOPs, rules, or skills |
| Avoid overbuilding | Personal/prototype first unless public/commercial/high-risk is stated |

## 6. Hard constraints

<!-- ABSORBED: ai_project_os_v5 — Safety and scope constraints -->

| Constraint | Rule |
|---|---|
| Secrets | Never expose API keys, tokens, passwords, connection strings, tenant secrets, service principal secrets, or private certificates |
| Source files | Do not modify original source/reference files unless explicitly asked |
| Paid tools | Do not recommend paid tools unless marked clearly as paid or optional |
| Scope | One focused task at a time |
| Output | Write requested artifacts to files, not chat only |
| Evidence | Mark unverified claims with `WARNING: unverified` or `⚠️` when the file format allows it |
| Current facts | Check official/current sources for tools, APIs, prices, platform behavior, laws, or fast-changing claims |
| Automation | Human approval is required before messages, deletes, updates, payments, permission changes, submissions, or public posts |
| User style | Beginner-friendly, ESL-safe, visual, practical, not enterprise-heavy by default |

## 7. Verification commands

<!-- ABSORBED: ai_project_os_v5 — Verification closes the loop -->

Use the cheapest useful check. Do not say "verified" without evidence.

```bash
# Confirm root context files exist
test -f LLM_CONTEXT.md && test -f llms.txt

# Confirm v5 absorption markers exist
grep -n "ABSORBED: ai_project_os_v5" LLM_CONTEXT.md llms.txt

# Check staleness footer
tail -n 1 LLM_CONTEXT.md
tail -n 1 llms.txt

# Check for obvious secret words in public/root navigation files
grep -RniE "(api[_-]?key|secret|token|password|service_role|connection[ -]?string|tenant secret)" LLM_CONTEXT.md llms.txt AGENTS.md .clinerules 2>/dev/null || true

# Check known smoke tests after major migration
sed -n '1,220p' RESET_CHECKLIST.md
```


## 8. Domain language quick reference

<!-- ABSORBED: ai_project_os_v5 — Shared project vocabulary -->

Use these repo terms when they appear in instructions. Do not replace them with random synonyms.

| Term | Simple meaning |
|---|---|
| quest | A project from idea to completion |
| chapter | A lifecycle stage |
| shield | Data classification level |
| forge | Build or development work |
| gate | Human approval checkpoint |
| module | Standalone Markdown knowledge file |
| mana | Token/context budget |
| codex | Knowledge base or reference wiki |

## 9. Risks to watch

<!-- ABSORBED: ai_project_os_v5 — Context bottleneck and failure visibility -->

| Risk | Watch for | Safe response |
|---|---|---|
| Context bloat | Assistant forgets early rules | Shed old context and rebuild a small context pack |
| Stale claims | Tool/API/pricing/platform claims may have changed | Check official/current source first |
| Overbuilding | Personal tool gets enterprise architecture | Return to personal/prototype rigor |
| Source copying | v5 reference text appears copied wholesale | Rewrite in UNGASIS style |
| Hidden failure | File write, test, or source check failed but was not reported | Fail loud and show evidence |
| Broken path | File path exists in instructions but not repo | Mark path as missing or planned |
| Unsafe automation | AI wants to send/delete/update/charge automatically | Stop and require Mel approval |

## 10. Out of scope unless Mel asks

<!-- ABSORBED: ai_project_os_v5 — Scope lock -->

- Building a full app from this repo.
- Adding paid services as required dependencies.
- Using real client, company, financial, health, legal, HR, or regulated data.
- Copying v5 files wholesale.
- Rewriting all kernels at once.
- Creating packaged Skills unless Mel explicitly asks.
- Treating AI output as done without a check.

## 11. Context refresh rule

<!-- ABSORBED: ai_project_os_v5 — Karpathy Loop context refresh -->

Update this file when one of these happens:

| Trigger | Action |
|---|---|
| Major repo structure changes | Update key files and read order |
| Repeated AI mistake | Add the missing short rule here or in `AGENTS.md` |
| New module becomes active | Add it to key files and goals |
| Public sharing changes | Re-check `llms.txt` for secrets and private details |
| Current phase changes | Update the phase row above |

Do not turn this file into a giant manual. Link to deeper files instead.

## 12. Mini handoff prompt

<!-- ABSORBED: ai_project_os_v5 — Handoff and context pack -->

```text
Read LLM_CONTEXT.md first. Then read AGENTS.md and VERSION_MANIFEST.md only if needed.
Task: [PASTE ONE SMALL TASK]
Rules: use simple English, read before write, do not touch secrets, verify the output, and report evidence.
Output: write the requested file(s), then summarize changed files and checks run.
```

---

Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
