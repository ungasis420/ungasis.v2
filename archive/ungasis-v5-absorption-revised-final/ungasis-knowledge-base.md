# UNGASIS Content Module: Knowledge Base System

**Module status:** New module  
**Owner:** Mel John Dimat  
**Default rigor:** Personal / prototype  
**Budget posture:** $0 upfront  
**Audience:** Beginner, ESL, visual learner  
**Purpose:** Turn messy source files, lessons, research, and repeated notes into a clean project knowledge base.

<!-- ABSORBED: ai_project_os_v5 — Knowledge Base System -->

## 0. Simple Idea

A knowledge base is your project's **small library**.

| Part | Simple meaning |
|---|---|
| Raw source | The original thing you found or received. Do not casually edit it. |
| Source card | A small ID card that says what the source is, where it came from, and why it matters. |
| Wiki summary | A clean explanation in your own words. |
| Schema | A map of data fields, tables, and relationships. |
| Index | The front desk of the library. It tells you where everything is. |

### Easy analogy: library shelf

Think of `knowledge/raw/` as the **locked archive room**.  
Think of `knowledge/wiki/` as the **student notes shelf**.  
Think of `knowledge/index.md` as the **library map**.  
You do not rewrite the original book. You write a clear study note beside it.

---

<!-- ABSORBED: ai_project_os_v5 — When To Use Knowledge Base -->

## 1. When to Use This

Use this module when a quest has enough information that chat memory becomes messy.

| Signal | Use the knowledge base? | Why |
|---|---:|---|
| 1-2 small notes only | Not yet | A simple `PROJECT_STATE.md` may be enough. |
| 5+ reference sources | Yes | You need a place to organize evidence. |
| Same lesson appears twice | Yes | Repeated lessons should become reusable knowledge. |
| Research affects a decision | Yes | The source and confidence must be traceable. |
| App has data models | Yes | Schemas prevent guessing later. |
| Public or commercial work | Yes | Stronger source tracking and review are needed. |

### Fast rule

```text
If I will need this again, save it properly.
If it supports a claim, cite it.
If it is a guess, label it.
```

---

<!-- ABSORBED: ai_project_os_v5 — Knowledge Folder Structure -->

## 2. Folder Structure

Create this folder tree in the repo:

```text
knowledge/
  raw/
    README.md
    sources/
    transcripts/
    screenshots/
  wiki/
    README.md
    concepts/
    workflows/
    decisions/
    lessons/
  schema/
    README.md
    data-dictionary.md
    entity-map.md
    source-map.md
  index.md
```

| Path | What goes here | Rule |
|---|---|---|
| `knowledge/raw/` | Original sources, exports, transcripts, screenshots, docs | Do not rewrite casually. Keep originals stable. |
| `knowledge/wiki/` | Short summaries, lessons, workflows, explanations | Rewrite in simple UNGASIS style. Cite source cards. |
| `knowledge/schema/` | Data models, field lists, relationships, source maps | Use when the project has structured data. |
| `knowledge/index.md` | Master list of sources, wiki pages, schemas, decisions | Update every time a useful page is added. |

### What each folder protects

| Folder | Protects against |
|---|---|
| `raw/` | Losing the original evidence. |
| `wiki/` | Drowning in long transcripts. |
| `schema/` | AI guessing field names or relationships. |
| `index.md` | Forgetting what exists. |

---

<!-- ABSORBED: ai_project_os_v5 — Librarian Loop -->

## 3. Librarian Loop

Use this loop whenever you add a useful source:

```text
raw source → source card → wiki summary → index update → next use
```

| Step | Action | Output | Done when |
|---:|---|---|---|
| 1 | Save the raw source | File in `knowledge/raw/` | Original is preserved. |
| 2 | Create a source card | Small metadata note | Source has title, path, date, owner, and use. |
| 3 | Write wiki summary | Page in `knowledge/wiki/` | Summary is short, useful, and cited. |
| 4 | Update index | Entry in `knowledge/index.md` | Future AI/human can find it. |
| 5 | Use it next time | Link in prompt, task packet, PRD, or decision memo | The knowledge changes future work. |

### Beginner example

| You found | Save as raw | Create wiki note | Update index |
|---|---|---|---|
| A long AI transcript about app safety | `knowledge/raw/transcripts/2026-06-01-app-safety-transcript.md` | `knowledge/wiki/workflows/app-safety-checklist.md` | Add both files under Safety / App Building |
| A spreadsheet field list | `knowledge/raw/sources/customer-fields.xlsx` | `knowledge/schema/data-dictionary.md` | Add under Data Model |
| A repeated Cline mistake | `knowledge/raw/sources/cline-error-log.md` | `knowledge/wiki/lessons/read-before-write.md` | Add under Agent Rules |

---

<!-- ABSORBED: ai_project_os_v5 — Source Card Template -->

## 4. Source Card Template

Create a source card when a raw source will be reused, cited, or summarized.

Save source cards beside the raw file or in `knowledge/raw/source-cards/`.

```markdown
# Source Card: [Short Source Name]

| Field | Value |
|---|---|
| Source ID | SRC-YYYY-MM-DD-001 |
| Title | [source title] |
| Raw file path | knowledge/raw/[path] |
| Original source / author | [person, site, tool, meeting, file] |
| Date captured | YYYY-MM-DD |
| Captured by | Mel / agent name |
| Data level | Level 0 / 1 / 2 / 3 / 4 |
| Permission | public / user-owned / internal-approved / unknown |
| Source fidelity | exact copy / partial extract / summarized / screenshot / transcript |
| Main use | [what this source helps decide or explain] |
| Related wiki page | knowledge/wiki/[path] |
| Confidence | high / medium / low |
| Notes | [limits, caveats, refresh date] |
```

### Source ID rule

```text
SRC-[YYYY-MM-DD]-[three-digit number]
Example: SRC-2026-06-01-001
```

---

<!-- ABSORBED: ai_project_os_v5 — Wiki Summary Template -->

## 5. Wiki Summary Template

A wiki page is not a copy of the source. It is a clean teaching note.

Save wiki pages under `knowledge/wiki/`.

```markdown
# [Wiki Page Title]

**Purpose:** [why this page exists]  
**Best used for:** [planning / building / research / QA / decision]  
**Source cards:** [SRC-YYYY-MM-DD-001, SRC-YYYY-MM-DD-002]  
**Last updated:** YYYY-MM-DD

## Simple explanation
[Explain the idea in beginner English.]

## Key facts
| Fact | Source card | Confidence |
|---|---|---|
| [fact] | SRC-... | high / medium / low |

## Useful rules
- [rule 1]
- [rule 2]
- [rule 3]

## Examples
| Situation | What to do |
|---|---|
| [example] | [action] |

## Open questions
| Question | Why it matters | Next check |
|---|---|---|
| [question] | [reason] | [source or test] |

## Do not forget
- [short warning]
```

### Wiki writing rule

```text
Raw source = evidence.
Wiki summary = reusable understanding.
Index = navigation.
```

---

<!-- ABSORBED: ai_project_os_v5 — Knowledge Index Template -->

## 6. `knowledge/index.md` Template

The index is the first file an AI assistant should read when looking for project knowledge.

```markdown
# Knowledge Index

**Project:** [project name]  
**Owner:** Mel John Dimat  
**Last updated:** YYYY-MM-DD

## Quick Navigation

| Area | Best entry point | Notes |
|---|---|---|
| Product / strategy | knowledge/wiki/concepts/[file].md | [short note] |
| App workflows | knowledge/wiki/workflows/[file].md | [short note] |
| Data model | knowledge/schema/data-dictionary.md | [short note] |
| Decisions | knowledge/wiki/decisions/[file].md | [short note] |
| Lessons learned | knowledge/wiki/lessons/[file].md | [short note] |

## Source Register

| Source ID | Title | Raw path | Wiki path | Confidence | Refresh by |
|---|---|---|---|---|---|
| SRC-YYYY-MM-DD-001 | [title] | knowledge/raw/... | knowledge/wiki/... | high / medium / low | YYYY-MM-DD |

## Rules for AI Assistants

- Read this index first.
- Use wiki pages for normal work.
- Open raw sources only when evidence or exact wording matters.
- Do not rewrite raw files.
- Mark facts without source as unverified.
- Separate facts, assumptions, and guesses.
```

---

<!-- ABSORBED: ai_project_os_v5 — Knowledge Schema Folder -->

## 7. `knowledge/schema/` Use

Use `knowledge/schema/` when the project has tables, datasets, fields, dashboards, APIs, or app data.

| File | Purpose |
|---|---|
| `data-dictionary.md` | Defines fields, meanings, data types, allowed values, and examples. |
| `entity-map.md` | Shows the main things in the system and how they connect. |
| `source-map.md` | Shows where each field comes from and where it goes. |

### `data-dictionary.md` starter table

```markdown
# Data Dictionary

| Field | Simple meaning | Type | Example | Source | Required? | Notes |
|---|---|---|---|---|---|---|
| customer_id | Unique customer number | text | CUST-001 | CRM export | yes | Do not use real IDs in public demos. |
| created_at | Date record was created | date | 2026-06-01 | App database | yes | Use ISO date format. |
```

### `entity-map.md` starter table

```markdown
# Entity Map

| Entity | Means | Connects to | Why it matters |
|---|---|---|---|
| Customer | Person or company using the product | Orders, feedback | Main user record |
| Order | Purchase or request | Customer, payment | Revenue or service signal |
```

---

<!-- ABSORBED: ai_project_os_v5 — Facts vs Guesses Rule -->

## 8. Facts, Assumptions, and Guesses

Do not mix verified facts with guesses. Use labels.

| Label | Meaning | Example |
|---|---|---|
| FACT | Source-backed statement | `FACT: The source says the loop is raw source -> source card -> wiki summary -> index update -> next use.` |
| ASSUMPTION | Reasonable belief, not proven yet | `ASSUMPTION: This workflow will help if the project has many sources.` |
| GUESS | Weak idea that needs checking | `GUESS: This tool may support export, but we have not verified it.` |
| UNKNOWN | Missing information | `UNKNOWN: We do not know if this file is public-safe.` |

### Source-backed claim rule

```text
No source = no confident claim.
Weak source = mark confidence lower.
Fast-changing source = refresh before relying on it.
```

---

<!-- ABSORBED: ai_project_os_v5 — Raw Source Protection Rules -->

## 9. Rules: What Not To Do

| Do not | Why | Better move |
|---|---|---|
| Do not rewrite raw files casually | You may destroy evidence. | Keep raw stable and write a wiki summary. |
| Do not paste huge transcripts into wiki pages | It makes knowledge hard to use. | Extract the useful lesson and link the source card. |
| Do not claim source-backed facts without a source | It creates fake certainty. | Cite the source card or mark as unverified. |
| Do not mix guesses with verified notes | Future AI may treat guesses as facts. | Label FACT, ASSUMPTION, GUESS, or UNKNOWN. |
| Do not put secrets in knowledge files | Knowledge folders may be shared later. | Use placeholders and secure secret storage. |
| Do not make one giant wiki page | It becomes unreadable. | Split by concept, workflow, decision, or lesson. |

---

<!-- ABSORBED: ai_project_os_v5 — Source Fidelity -->

## 10. Source Fidelity Levels

Source fidelity means: **how close is this note to the original source?**

| Level | Meaning | Use when |
|---|---|---|
| Exact copy | Original file preserved without changes | Raw docs, exports, transcripts |
| Partial extract | Only the relevant part was saved | Long article, long meeting, long report |
| Summary | Human/AI rewritten explanation | Wiki page or lesson |
| Interpretation | You extracted a principle or pattern | Strategy note, playbook rule |
| Unverified | Source missing or unclear | Temporary note only |

### Fidelity rule

```text
Higher fidelity belongs in raw.
Lower fidelity belongs in wiki, with labels and citations.
```

---

<!-- ABSORBED: ai_project_os_v5 — Next Use Rule -->

## 11. How to Use the Knowledge Base in Future Tasks

Before asking AI to work on the quest, give it a small context pack.

```text
Read first:
- knowledge/index.md
- [specific wiki page]
- [specific schema file if data is involved]

Task:
[one focused task]

Rules:
- Use wiki pages for normal context.
- Open raw sources only if evidence matters.
- Cite source cards for factual claims.
- Mark unverified claims with warning.
- Do not rewrite raw files.
```

### Choosing what to read

| Task | Read first |
|---|---|
| Writing a PRD | `knowledge/index.md`, product wiki pages, decision pages |
| Building app data model | `knowledge/schema/data-dictionary.md`, `entity-map.md` |
| Research decision | source cards, wiki summaries, decision notes |
| Debugging repeated AI mistakes | lesson pages and `.clinerules/` |
| Updating public docs | public-safe wiki pages, not private raw files |

---

<!-- ABSORBED: ai_project_os_v5 — Maintenance Checklist -->

## 12. Weekly or End-of-Session Maintenance

Use this small checklist after meaningful work.

| Question | Action if yes |
|---|---|
| Did we add a new useful source? | Save to `knowledge/raw/` and create a source card. |
| Did we learn a reusable lesson? | Add a short page in `knowledge/wiki/lessons/`. |
| Did a data field change? | Update `knowledge/schema/data-dictionary.md`. |
| Did a decision depend on research? | Link sources in the decision note. |
| Did the index miss a page? | Update `knowledge/index.md`. |
| Did something become stale? | Add refresh date or mark it as needs review. |

### Staleness rule

Review knowledge pages when:

- the project changes direction
- a tool/API/platform behavior matters
- pricing, laws, or product features are involved
- a page has not been reviewed in 90 days
- AI repeats a mistake the page was supposed to prevent

---

<!-- ABSORBED: ai_project_os_v5 — Beginner Workflow -->

## 13. Beginner Workflow: 15 Minutes

| Minute | Do this | Output |
|---:|---|---|
| 0-3 | Save the raw source | File in `knowledge/raw/` |
| 3-6 | Fill the source card | Source ID and metadata |
| 6-11 | Write short wiki summary | 5-10 bullet points or a table |
| 11-13 | Add facts vs assumptions | Labels are visible |
| 13-15 | Update index | Future you can find it |

### Minimum viable version

If you are tired, do only this:

```text
1. Save raw file.
2. Write 3-line source card.
3. Add one index entry.
```

Then summarize later.

---

<!-- ABSORBED: ai_project_os_v5 — Copy Paste Prompts -->

## 14. Copy-Paste Prompts

### Prompt 1: Turn raw source into source card

```text
Act as my UNGASIS knowledge librarian.

Raw source path:
[PASTE PATH]

Create a source card using this format:
- Source ID
- Title
- Raw file path
- Original source / author
- Date captured
- Data level
- Permission
- Source fidelity
- Main use
- Related wiki page
- Confidence
- Notes / limitations

Rules:
- Use simple English.
- Do not invent facts.
- Mark unknown fields as UNKNOWN.
- Do not rewrite the raw source.
```

### Prompt 2: Turn source into wiki summary

```text
Act as my UNGASIS wiki writer.

Source card:
[PASTE SOURCE CARD]

Goal:
Create a short wiki summary for future AI sessions.

Output:
1. Simple explanation
2. Key facts table with source ID
3. Useful rules
4. Examples
5. Open questions
6. Do not forget

Rules:
- Keep it beginner-friendly.
- Do not paste the whole raw source.
- Separate FACT, ASSUMPTION, GUESS, and UNKNOWN.
- Cite source IDs for facts.
```

### Prompt 3: Update the knowledge index

```text
Act as my UNGASIS index keeper.

New files:
[PASTE FILE PATHS]

Update `knowledge/index.md` with:
- Area
- Best entry point
- Source ID
- Raw path
- Wiki path
- Confidence
- Refresh by date

Rules:
- Keep it short.
- Use tables.
- Do not remove existing entries unless I approve.
```

---

<!-- ABSORBED: ai_project_os_v5 — Done Criteria -->

## 15. Done Checklist

A knowledge base update is done when:

- [ ] Raw source is saved in `knowledge/raw/`.
- [ ] Source card exists when the source is reusable.
- [ ] Wiki summary exists when the idea will be reused.
- [ ] Facts are cited to a source card.
- [ ] Assumptions, guesses, and unknowns are labeled.
- [ ] `knowledge/index.md` is updated.
- [ ] Data model changes are recorded in `knowledge/schema/` if relevant.
- [ ] No secrets or private data were added unsafely.
- [ ] Stale or fast-changing items have a refresh date.

---

## 16. QA Checklist for This Module

| Requirement | Status |
|---|---:|
| Includes `knowledge/raw/` | PASS |
| Includes `knowledge/wiki/` | PASS |
| Includes `knowledge/schema/` | PASS |
| Includes `knowledge/index.md` | PASS |
| Includes Librarian Loop | PASS |
| Explains when to use: 5+ sources or repeated lessons | PASS |
| Includes raw source protection rules | PASS |
| Includes no huge transcript rule | PASS |
| Includes citation/source-backed facts rule | PASS |
| Includes facts vs guesses separation | PASS |
| Uses simple English, tables, checklist, analogy | PASS |

---

## 17. UNGASIS Trace

| Field | Value |
|---|---|
| Mode | Execution / Artifact Build |
| Rigor | Personal / prototype |
| Domain | Knowledge management, source organization, project memory |
| Dimensions | Knowledge, Memory, Guardrails, Templates, Evaluation, Maintenance |
| Lenses | Beginner teacher, knowledge librarian, safety reviewer |
| Intelligences | Context, memory, research, risk, instruction-following |
| Frameworks | Librarian Loop, Source Quality, Facts vs Assumptions, Minimum Viable Rigor |
| Engines | Workflow Designer, Source Quality / Evidence, Artifact Builder |
| Tools/Files | `knowledge-base-librarian-loop.md`, `AGENTS.md` |
| Guardrails | Do not rewrite raw files, no fake citations, no secrets, mark uncertainty |
| Template | Standalone Markdown module |

---

Version: 1.0 | Date: 2026-06-01 | Module: Knowledge Base System | Owner: Mel John Dimat | Status: Ready to add to UNGASIS repo  
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
