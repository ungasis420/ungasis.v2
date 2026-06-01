# LLM Knowledge Base

## Purpose

The knowledge base prevents the assistant from rediscovering the same information every session.

## Three-layer model

```text
knowledge/
  raw/       original source material, preserved
  wiki/      clean summaries, playbooks, patterns, reusable lessons
  schema/    librarian rules for naming, linking, fidelity, and summaries
```

## Layer 1: raw

Use `knowledge/raw/` for transcripts, copied docs, meeting notes, issue exports, and raw research notes.

Rule: raw sources are preserved. Do not rewrite them unless the user explicitly asks.

## Layer 2: wiki

Use `knowledge/wiki/` for short, clean, reusable summaries. These pages are AI-maintained and should be updated whenever durable learning appears.

Good wiki pages include:

- source fidelity
- summary
- key principles
- reusable workflow
- examples
- related files
- open questions

## Layer 3: schema

Use `knowledge/schema/` for the rules that govern the knowledge base.

Examples:

- page format
- tags
- naming
- source fidelity
- link rules
- update triggers

## Operating rule

Humans often abandon wikis because maintenance is tedious. LLMs can maintain concise wiki pages as part of normal session closeout.

## Update triggers

- a source contains reusable guidance
- the same question appears twice
- an assistant makes a repeated mistake
- a workflow becomes repeatable
- a decision should influence future work
- a bug reveals a project-specific gotcha

## Commands and skills

- `.claude/skills/knowledge-librarian/SKILL.md`
- `.claude/commands/knowledge-ingest.md`
- `scripts/generate_knowledge_index.py`
