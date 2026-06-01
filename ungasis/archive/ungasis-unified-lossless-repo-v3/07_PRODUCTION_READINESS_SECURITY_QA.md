# 07 Production Readiness, Security, and QA

## Purpose

This file helps decide if a project is ready for testing or production.

## Simple verdict rule

| Result | Meaning |
|---|---|
| Ready for learning | Safe to study and edit |
| Ready for private testing | Safe for a small trusted test |
| Not ready for production | Do not launch to real users yet |
| Ready for production | Tests, security, logs, support, and rollback are in place |

## Production readiness checklist

### 1. Basic project files

Required:

- `README.md`
- `LICENSE` or `LICENSE_TEMPLATE.txt`
- `SECURITY.md`
- `SUPPORT.md`
- `CHANGELOG.md`
- `CONTRIBUTING.md`
- `CODEOWNERS`
- `.env.example`

Pass when:

- A beginner can understand what the project does.
- A helper can install or review it.
- No real secrets are inside files.

### 2. Security basics

Required:

- no API keys in public files
- no passwords in public files
- human approval before risky actions
- clear permission list
- test with fake data first
- logs for important actions

### 3. Testing basics

Required:

- golden tests
- red-team tests
- smoke tests
- manual beginner tests
- rollback test

### 4. Release basics

Required:

- release checklist
- version number
- known gaps list
- rollback plan
- support contact

## Stop signs

Do not call it production-ready if:

- secrets are in files
- nobody reviewed risky automation
- no rollback plan exists
- no test data exists
- no logs exist
- no clear owner exists
- AI can delete, send, pay, or change records without approval

## Feynman explanation

Production readiness means: "Can real people use this without us guessing, panicking, or losing control when something goes wrong?"

## Layman analogy

A food stall can serve family first. A public restaurant needs permits, clean process, staff rules, payment safety, and a plan when a customer complains.

## Hard words in this file

See `SIMPLE_WORDS_GLOSSARY.md` for:

- production
- QA
- security
- rollback
- release
- secret
- permission
- golden test
- red-team test
- smoke test
