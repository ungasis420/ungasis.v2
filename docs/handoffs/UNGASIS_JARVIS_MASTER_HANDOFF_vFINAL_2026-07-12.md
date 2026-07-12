# UNGASIS-OS JARVIS — MASTER HANDOFF vFINAL

**Prepared:** 2026-07-12  
**Owner:** Mel John Dimat  
**Repository:** `D:\.projects\ungasis`  
**Purpose:** Continue safely in a fresh chat without repeating completed work.

---

## 0. Read this first

This document contains the verified history, expected current state, next exact gate, architecture, roadmap, memory/classification outcome, deferred ideas, and success criteria.

**Do not treat historical state as live proof.** Reverify Git and tests first.

---

## 1. Executive truth

We are building a **local transcript-to-knowledge system**. It does not download or scrape YouTube.

```text
Transcript files = raw books
Python script    = book-processing machine
Wiki             = library
Retrieval        = card catalogue
Skill            = operating manual
Agent            = controlled librarian/operator
Memory           = notebook of proven lessons
Manifest/logs    = job ledger and evidence
```

### Current stopping point

```text
P2c wiki repair          COMPLETE + PUSHED
P3b specification        COMPLETE + PUSHED
P4a implementation       SHIPPED in commit 3d393f2
Latest builder tests     119/119 REPORTED PASS
Focused R4 audit         NOT YET RUN
P4a commit/push          DONE in commit 3d393f2
Real transcript ingest   NOT RUN
P4b pilot                BLOCKED
```

NOTE (2026-07-13): Runtime tests last reported 119/119 PASS pre-commit; NOT re-verified this session. Functional correctness remains historical claim only.

Correct wording: P4a is **built and provisionally validated**, not complete or shipped.

---

## 2. Expected repository state — reverify live

Last verified pushed baseline:

```text
Branch        main
HEAD          6777eef
origin/main   6777eef
Ahead/behind  0/0
```

Expected tracked changes:

```text
M .ungasis/dashboard/tokens.json
M docs/prompts/p3-v3-spec.md
M docs/prompts/p3-v3-review.md
```

Expected new untracked P4a files:

```text
? scripts/youtube-ingest-v3.py
? tests/test_youtube_ingest_v3.py
```

Expected older untracked groups:

```text
6 handoff files
2 Newmont files
9 transcript files
```

Safety rules:

- Recheck every count and path.
- Never stage `.ungasis/dashboard/tokens.json`.
- Never read `projects/newmont/**` or client content.
- Never read real transcript contents during N0/audit gates.
- Never assume the working tree stayed unchanged.

---

## 3. Verified change history

### 3.1 Drift was caught first

The old handoff did not match the live repository. Work stopped until the real commits and files were identified.

### 3.2 Canonical wiki-count repair

```text
CONTEXT.md                 55
M365 instructions          61
Canonical wiki count       57
```

Root cause: the generator counted infrastructure Markdown files.

Files repaired:

```text
scripts/generate-copilot-instructions.py
CONTEXT.md
docs/m365-copilot-instructions.txt
```

Commit pushed:

```text
5ed650f fix(wiki): align m365 generator with canonical count
```

### 3.3 P3 specification closure

Review identified gaps in Wiki vs Chroma ownership, deterministic slugs, local-file/privacy boundaries, RAGAS structure, and resume behavior.

Files created/updated:

```text
docs/prompts/p3-v3-spec.md
docs/prompts/p3-v3-review.md
docs/prompts/ragas-20q.md
```

Commit pushed:

```text
523c947 docs(p3b): close youtube ingest specification gaps
```

### 3.4 P4a build and repair history

Created:

```text
scripts/youtube-ingest-v3.py
tests/test_youtube_ingest_v3.py
```

Historical test progression:

```text
22 -> 61 -> 78 -> 93 -> 106 -> 119
```

Independent reviews identified and repairs reportedly addressed:

1. duplicate slugs on updated content;
2. unsafe transcript paths;
3. undefined `--resume`;
4. missing SHA-refusal logging;
5. weak manifest parsing/R19 validation;
6. rollback and atomic-write weaknesses;
7. basename path substitution;
8. wrong dry-run success exit code;
9. uncaught filesystem `OSError`;
10. missing malicious-path tests;
11. tests that copied wrong implementation behavior;
12. `null` becoming `[]`;
13. quoted `"null"` and `""` becoming `None`.

Latest builder report:

```text
119/119 synthetic tests PASS
No real transcript read
No real ingest executed
Nothing staged or committed
```

That report is evidence, not a final independent audit.

### 3.5 Stop-hook lesson

Some read-only audits correctly returned `PATCH_REQUIRED`, but a stale goal hook repeatedly demanded `PASS`.

Correct handling:

```text
After 3 identical rejections:
- stop;
- do not fabricate PASS;
- do not edit during a read-only audit;
- run /goal clear.
```

---

## 4. Knowledge classification outcome

The classification goal completed cleanly.

### Auto-memory items successfully added

```text
1. Builder and independent auditor must be separate roles.
2. Tests must follow the specification, not copy current code behavior.
3. Dry-run zero-writes and dry-run exit status are separate properties.
```

### Memory maintenance

```text
Old jarvis-roadmap.md:
- marked SUPERSEDED;
- preserved for history;
- pointed to the new master handoff.
```

### Correct storage separation

```text
Temporary Git/test state -> handoff/session context
Proven recurring lessons -> auto memory
Stable universal rules   -> CLAUDE.md
File-specific rules      -> path-scoped rule
Reusable procedures      -> Skill
Specialist orchestration -> Agent
Hard restrictions        -> settings/hook/permission
Domain facts/evidence    -> Wiki
```

No transcript bodies, client content, PII, secrets, or speculative business ideas were stored.

---

## 5. Business classification outcome

### Evidence-backed pain points

```text
PP1 Stop-hook enumerated-verdict loop
PP2 Fresh-chat handoffs require live state verification
PP3 Custom manifest parser required repeated hardening
PP4 Long sessions create token/context overhead
PP5 Newmont technical debt exists but remains client-scoped
```

### Idea backlog

```text
I1 Investigate/fix the Stop-hook verdict contradiction
I2 Automate N0-lite after checking for an existing equivalent
I3 Add combinatorial/fuzz-style parser tests if another parser appears
I4 Implement governed memory promotion later
I5 Extract reusable dry-run test pattern if a second dry-run tool appears
```

### Value hypothesis

Rename the prior monetization item:

```text
V1 Internal value/savings hypothesis
```

It is not monetization yet.

Validation:

```text
P4b pilot
    -> P8 baseline comparison
    -> measured token/time/quality change
```

External monetization requires a lawful customer/payer, willingness-to-pay evidence, authorization, and measured delivered value.

### Priority rule

I1 and I2 remain backlog. They must not interrupt:

```text
N0 -> focused R4 audit -> commit/push -> P4b
```

---

## 6. Current P4a build contract

Target:

```text
scripts/youtube-ingest-v3.py
```

Required behavior:

- local `.txt` inputs only;
- no network, scraping, captions, or downloads;
- fail-closed manifest parsing;
- exact source-path identity;
- reject traversal, absolute paths, reserved names, and symlink escapes;
- SHA-256 from raw bytes;
- deterministic slug/collision rules;
- approved chunking and overlap;
- dry-run performs zero writes;
- invalid/refused dry-run returns validation failure;
- resume selects `pending` and `error` only;
- whole-batch resume preflight before writes;
- atomic writes and cleanup;
- JSONL audit logging;
- source-owned rollback only;
- never falsely mark work `done`;
- controlled exit codes;
- exact scalar/list/null/quoted handling.

Quoted-value rules:

```text
null            -> Python None
"null"          -> string "null"
""              -> empty string
chunk_ids: []   -> empty list
chunk_ids: "[]" -> invalid for chunk_ids
```

Tests must use temporary synthetic data and mocks only.

---

## 7. Target architecture

```text
                 HUMAN APPROVAL + HARD GOVERNANCE
                 privacy | paths | Git | kill switch
                              |
                              v
+-----------------------------------------------------------+
| RESTRICTED KNOWLEDGE OPERATOR                  CONDITIONAL |
| Start read-only; add write power only after proof         |
+-----------------------+-----------------------------------+
                        |
              +---------+---------+
              |                   |
              v                   v
+-----------------------+  +-------------------------------+
| QUERY SKILL           |  | INGEST SKILL                  |
| read-only             |  | manual invocation             |
| retrieve + cite       |  | dry-run -> approve -> execute |
+-----------+-----------+  +---------------+---------------+
            |                              |
            v                              v
+-----------------------------------------------------------+
| RETRIEVAL + EVALUATION                       BLUEPRINT    |
| deterministic search first                                |
| top evidence -> citations -> quick tests -> 20-Q gate     |
| SQLite FTS5 only after measured need                      |
+------------------------------+----------------------------+
                               |
                               v
+-----------------------------------------------------------+
| CANONICAL MARKDOWN WIKI                         ACTIVE    |
| concepts | passage IDs | provenance | hashes              |
+------------------------------+----------------------------+
                               ^
                               |
+-----------------------------------------------------------+
| YOUTUBE INGESTION ENGINE                        ACTIVE    |
| script | manifest | logs | rollback | tests               |
+------------------------------+----------------------------+
                               ^
                               |
+-----------------------------------------------------------+
| APPROVED LOCAL TRANSCRIPTS                      ACTIVE    |
| no network acquisition | no client files                  |
+-----------------------------------------------------------+
```

Storage model:

```text
Knowledge        -> Wiki
Procedure        -> Skills
Permanent rules  -> concise CLAUDE.md / scoped rules
Learned lessons  -> governed Agent memory
Execution state  -> manifest and logs
Quality evidence -> RAGAS/evaluation dataset
Client data/PII  -> outside pilot; never memory
```

---

## 8. Security model

Transcript/wiki text is untrusted data.

Use multiple defenses:

1. label retrieved content as data, not instructions;
2. least-privilege Agent tools;
3. deny Newmont/client directories;
4. require human approval for privileged writes;
5. validate outputs deterministically;
6. run synthetic prompt-injection tests;
7. use settings/hooks/permissions for hard blocks.

Tags alone are not hard enforcement.

Add before Agent write permission:

- injection-resistance tests;
- kill switch;
- least-privilege tool allowlist;
- memory-poisoning/privacy tests;
- recovery drill;
- cross-platform concurrency lock if parallel execution becomes real.

---

## 9. Token-conservation model

```text
Python       performs repetitive local file work
Wiki         keeps large knowledge outside conversation
Retrieval    opens only relevant evidence
Skills       load full instructions only when invoked
Subagent     isolates noisy work when justified
Memory       stores short proven lessons, not transcripts/logs
Fresh chats  reduce long-history accumulation
```

Rule:

> Keep durable information on disk. Give Claude only what it needs for the current decision.

Preferred result format:

```text
ACTION: DRY-RUN
FILES: 3
PAGES PLANNED: 14
VALIDATION: PASS
REFUSALS: 0
REAL WRITES: NO
NEXT: HUMAN APPROVAL
```

---

## 10. Revised roadmap

### P4 — prove engine and knowledge quality

```text
P4a  Reverify -> focused R4 audit -> atomic commit/push
P4b  Controlled 3-transcript pilot
      dry-run -> approval -> ingest -> rerun -> rollback proof
P4c  Populate grounded 20-question evidence set
P4d  Prove retrieval, citation, and answer quality
      deterministic search first
      5-8 quick regression questions
      full 20-question milestone gate
P4e  Ingest remaining approved transcripts
P4f  Integrity audit: hashes, provenance, orphans, rollback
```

### P5 — package the proven workflow

```text
P5a  Manual /youtube-ingest Skill
P5b  Three Skill acceptance runs
P5c  Read-only /youtube-query Skill
P5d  Injection-resistance and citation tests
```

### P6 — Agent only if justified

```text
P6a  Necessity and ROI gate
P6b  Read-only YouTube Knowledge Operator
P6c  Query Skill invocation
P6d  Dry-run proposals
P6e  Approval-gated real ingest
P6f  Kill-switch, permissions, concurrency, recovery tests
```

### P7 — governed memory

```text
P7a  Memory schema
P7b  Propose -> evidence -> approve -> promote
P7c  Privacy and poisoning tests
P7d  Supersede/delete bad lessons
```

### P8 — prove value

```text
P8a  Capture token/time/quality baseline
P8b  Compare post-system measurements
P8c  Keep Agent, simplify to Skills, or remove Agent
```

Backlog after the main track:

```text
I1 Stop-hook root-cause investigation
I2 N0-lite automation
```

Do not interleave I1/I2 with P4a shipping.

Deferred until evidence exists:

- Chroma/embeddings;
- Graphify integration;
- generic multi-source Agent;
- automatic memory promotion;
- parallel ingestion;
- enterprise dashboard expansion.

---

## 11. Promotion gates

### Script -> Skills

Require:

- focused audit PASS;
- 3-transcript pilot PASS;
- zero duplicate rerun writes;
- rollback PASS;
- retrieval/citation thresholds PASS.

### Skills -> Agent

Require:

- Skills succeed at least 3 times;
- repeated orchestration burden is proven;
- zero safety violations;
- injection tests PASS;
- kill switch and permissions PASS.

### Agent -> persistent memory

Require:

- approved memory schema;
- manual promotion works;
- client-data exclusion works;
- bad-memory deletion works;
- memory stays concise.

### Agent kill condition

Do not build or keep the Agent if Skills already provide one safe, simple workflow and the Agent adds more cost than value.

---

## 12. Success criteria

### P4a shipment

```text
N0 state verified
Focused R4 audit PASS
119/119 tests confirmed
Exactly 4 approved files staged
tokens.json unstaged
Commit successful
Push successful
HEAD=origin/main
Ahead/behind=0/0
No real ingest executed
```

### Pilot/knowledge quality

```text
Real pilot fabrication          0
Dry-run writes                  0
Unauthorized/client reads       0
Duplicate rerun pages           0
Rollback success                100%
Faithfulness                    >= 0.85
Citation/retrieval hit rate     >= 0.90
Missing evidence                explicit refusal, never guessing
```

### Operational/value

```text
Human approval before writes
Concise reports
Fast recovery
No hidden memory promotion
Measured token/time improvement
Agent retained only with positive evidence
```

Do not invent an overall completion percentage. Measure each gate.

---

## 13. Exact next-session order

```text
1. Read this handoff.
2. Run N0-lite read-only verification.
3. If CLEAN, run focused R4 audit.
4. If PASS, stage exactly the 4 approved files.
5. Commit and push.
6. Verify HEAD=origin/main and 0/0.
7. STOP.
8. Start P4b only in the next goal/session.
```

Approved atomic bundle:

```text
scripts/youtube-ingest-v3.py
tests/test_youtube_ingest_v3.py
docs/prompts/p3-v3-spec.md
docs/prompts/p3-v3-review.md
```

Never stage:

```text
.ungasis/dashboard/tokens.json
```

---

## 14. Hard rules

DO:

- prompts under the 4,000-character `/goal` limit;
- surgical staging;
- independent audit before commit;
- three-strike stop on stale loops;
- `/goal clear` after a loop;
- evidence with file/line references;
- concise result formats.

DO NOT:

- force push;
- stage `tokens.json`;
- read Newmont/client content;
- run deprecated ingestion scripts;
- use real transcripts during synthetic gates;
- run P4b before P4a push verification;
- automate memory writes;
- build an Agent before retrieval/Skill proof;
- invent percentages, timings, token usage, PASS, or completion;
- split the P4a bundle solely because files are long.

Maintainability should be judged by cohesion, functions, tests, and risk—not an invented universal 200-line file limit.

---

## 15. Source register

Internal evidence:

- original UNGASIS JARVIS handoff;
- P4a builder/audit logs;
- knowledge and business classification output;
- live repository files and Git state, to be reverified.

Official references:

- Claude Code Skills: `https://code.claude.com/docs/en/skills`
- Claude Code Memory: `https://code.claude.com/docs/en/memory`
- Claude Code Subagents: `https://code.claude.com/docs/en/sub-agents`
- Claude Code Hooks: `https://code.claude.com/docs/en/hooks`
- OWASP Prompt Injection: `https://genai.owasp.org/llmrisk/llm01-prompt-injection/`
- Git Status: `https://git-scm.com/docs/git-status`
- Python pathlib: `https://docs.python.org/3/library/pathlib.html`
- SQLite FTS5: `https://sqlite.org/fts5.html`

---

## 16. UNGASIS trace

```text
local evidence
    -> deterministic ingestion
    -> canonical wiki
    -> measured retrieval/citations
    -> manual Skills
    -> restricted Agent if justified
    -> governed memory
    -> measured value
```

**Rigor:** 4/5  
Safety and provenance matter, but enterprise expansion remains deferred until the real pilot proves the need.
