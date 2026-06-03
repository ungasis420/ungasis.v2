# How To Use This Pack

## Goal

This pack helps you improve a project from "good idea" to "safer test setup".

It does not magically make your app production-ready.
It gives you the checklist and files to get there.

## Option A: Easiest way, no code

Use this if you do not know GitHub or coding yet.

### Step 1: Unzip this file

Right-click the ZIP file.
Choose "Extract" or "Unzip".

### Step 2: Open the folder

Open:

`ungasis-production-readiness-pack-v1`

### Step 3: Read the learner files

Read:

1. `README_START_HERE.md`
2. `SIMPLE_WORDS_GLOSSARY.md`
3. `BEGINNER_STEP_BY_STEP_GUIDE.md`

### Step 4: Upload the important files to ChatGPT Project knowledge

Upload the files inside:

`02_COPY_TO_YOUR_PROJECT_ROOT/`

Best first files to upload:

1. `07_PRODUCTION_READINESS_SECURITY_QA.md`
2. `08_AGENT_EVALS_AND_RUNTIME_GOVERNANCE.md`
3. `09_CONNECTOR_PERMISSION_REGISTRY.md`
4. `10_OBSERVABILITY_AND_INCIDENT_RESPONSE.md`
5. `docs/READINESS_LEVELS.md`
6. `docs/PERMISSION_MATRIX.md`
7. `docs/QA_TEST_PLAN.md`
8. `docs/RUNBOOK.md`
9. `docs/INCIDENT_RESPONSE.md`
10. `docs/LEARNER_HOW_TO.md`

### Step 5: Copy the prompt

Open:

`COPY_THIS_PROMPT_TO_CHATGPT.md`

Copy the prompt.
Paste it into ChatGPT.

### Step 6: Ask for a plain-English audit

Say:

"Use the files I uploaded. Tell me if my setup is ready for testing or production. Use simple English."

## Option B: Copy into your project folder

Use this if you have a project folder on your computer.

### Step 1

Open:

`02_COPY_TO_YOUR_PROJECT_ROOT/`

### Step 2

Copy everything inside that folder.

### Step 3

Paste it into your project folder.

### Step 4

Read:

`docs/LEARNER_HOW_TO.md`

## Option C: Optional technical check

Use this only if you or a helper can run Python.

From your project folder, run:

```bash
python scripts/check_readiness.py
```

If that feels scary, skip it for now.
The checklists still help.

## What good looks like

You should end with:

- clear permissions
- clear tests
- clear release rules
- clear rollback plan
- no real secrets in files
- simple logs
- human approval before risky agent actions

## Tiny check

Can you say what this pack does in one sentence?

Good answer:

"It helps me check if my AI app setup is safe enough to test or launch."
