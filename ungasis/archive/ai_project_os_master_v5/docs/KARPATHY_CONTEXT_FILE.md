# Karpathy-Style Context File Guide

Purpose: keep a compact, high-signal project map that lets AI assistants produce better output without re-discovering the repo every session.

This template uses two related files:

| File | Use |
|---|---|
| `LLM_CONTEXT.md` | Internal project context pack for coding agents. Keep it private if the repo contains sensitive context. |
| `llms.txt` | Public-safe project navigation file. Include only non-sensitive links and summaries. |

## Core idea

A coding agent performs better when it receives the right project context up front: goal, constraints, architecture, commands, current milestone, key files, risks, and verification checks.

This is not a dumping ground. It is a curated map.

## What belongs in `LLM_CONTEXT.md`

- One-paragraph project summary
- Current milestone
- Non-goals
- Key files and why they matter
- Install/test/lint/build commands
- Architecture boundaries
- Data and AI-provider boundaries
- Current risks
- Stop rules
- Verification checklist

## What does not belong

- API keys, credentials, tokens, passwords, private certificates
- Customer data or confidential client material
- Long tutorials
- Raw logs
- Full file-by-file explanations
- Outdated plans
- Anything the assistant can infer cheaply from nearby source files

## Refresh triggers

Refresh `LLM_CONTEXT.md` when:

- the product goal changes
- the stack changes
- test/build commands change
- architecture boundaries change
- a new data source, model provider, or external integration is added
- current milestone changes
- an AI assistant repeatedly makes the same wrong assumption

## Workflow

```text
Inspect repo -> summarize stable context -> write LLM_CONTEXT.md -> verify no secrets -> use it at session start -> refresh after major changes
```

## First prompt

```text
Read AGENTS.md, CLAUDE.md, LLM_CONTEXT.md, docs/PROJECT_BRIEF.md, and docs/QUALITY_BAR.md.
Summarize the project, identify stale or missing context, and propose updates to LLM_CONTEXT.md.
Do not edit source code yet.
```

## Quality bar

A good context file is:

- short enough to actually read
- specific enough to prevent obvious mistakes
- current enough to trust
- safe enough to commit
- structured enough for another AI or human to scan quickly
