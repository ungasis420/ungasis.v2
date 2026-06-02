# New Video Coverage Audit

Date: 2026-06-01

New user-requested source videos to check against this master template:

1. Austin Marchese - How to 10x Your Claude Code Projects (Karpathy's Method)  
   https://www.youtube.com/watch?v=yfeHoOkn2TI

2. Austin Marchese - How Anthropic Employees ACTUALLY Use Claude Code to Grow  
   https://www.youtube.com/watch?v=BX5dLXe6CTI

3. Austin Marchese - STOP Using Claude to Code. Do THIS Instead.  
   https://www.youtube.com/watch?v=6ad-LyammTI

4. Dream Labs AI - This "Karpathy file" will 10x your claude output (132,000 Github Stars!)  
   https://www.youtube.com/watch?v=hzQie4EucY0

## Fidelity status

Direct transcripts were not available during this audit. Coverage below is therefore based on the titles, the existing master template, current Claude Code documentation, and general public AI-assisted development practices. Treat these as structured coverage hypotheses until transcripts are pasted and processed through `.claude/skills/video-lesson-extractor`.

## Coverage verdict

| Video theme | Already covered in v3? | Gap found | v4 patch |
|---|---:|---|---|
| Karpathy-style 10x Claude Code projects | Partial | v3 had context hygiene but no explicit reusable context-pack file | Added `LLM_CONTEXT.md`, `llms.txt`, `docs/KARPATHY_CONTEXT_FILE.md`, `workflows/karpathy-context-loop.md`, `scripts/generate_llm_context.py`, and `.claude/skills/karpathy-context-file` |
| Anthropic employees using Claude Code to grow | Partial | v3 was stronger for coding than growth/business experimentation | Added `docs/GROWTH_EXPERIMENT_OS.md`, `workflows/growth-experiment-loop.md`, `.claude/skills/growth-experiment-loop`, `templates/growth_experiment.md`, and `.claude/agents/growth-operator.md` |
| Stop using Claude to code; use this instead | Partial | v3 had plan-before-code but needed a sharper spec-first/product-first rule | Added `docs/SPEC_FIRST_AGENTIC_DEVELOPMENT.md`, `workflows/spec-first-agentic-development.md`, `.claude/skills/spec-first-builder`, `prompts/13_stop_coding_spec_first.md`, and `.claude/agents/spec-architect.md` |
| Karpathy file for better Claude output | Partial | v3 had scattered context files but not a single context package refresh loop | Added dedicated context-pack workflow, template, script, prompt, and skill |

## Coverage rule added

If a video teaches a pattern already present, do not create another duplicate file. Instead:

1. Add one sentence to the closest existing workflow or guide.
2. Add one prompt/template only if it changes the user's actual behavior.
3. Add one skill only if the workflow is repeatable and worth invoking.
4. Keep commands thin and avoid command/skill name collisions.
5. Run `python scripts/verify_template.py` after changes.

## Transcript upgrade path

When transcripts are available:

1. Paste one transcript at a time.
2. Run `.claude/skills/video-lesson-extractor`.
3. Patch this file with source-level `transcript verified` entries.
4. Update `docs/VIDEO_LESSON_CAPTURE.md` with exact lessons.
5. Run `python scripts/verify_template.py`.
