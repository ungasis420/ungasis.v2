# New Module Workflow

## Purpose
A multi-step workflow to create, document, register, and audit a new UNGASIS knowledge module.

## Workflow Steps

### Step 1: Pre-Creation Verification
- Check the `modules/` folder to verify that the topic does not already exist.
- Use file search or glob patterns to prevent duplicate files.

### Step 2: Create the Module
- Follow the instructions in the `module-writer` skill:
  - Location: `modules/[category]/ungasis-[topic].md` (determine category based on existing folder structure: `m365_copilot_opus`, `m365_copilot_chatgpt`, or `chatgpt_ent`).
  - Use simple English.
  - Structure the module with a Title, Analogy, Core content tables, Checklist, and Related modules.
  - End with the standard staleness footer.

### Step 3: Register Module in README.md
- Open [README.md](file:///c:/Users/63905/Downloads/ungasis/README.md).
- Find the "Repository Structure" tree.
- Add the entry for the new module at the correct location.

### Step 4: Quality Assurance Audit
- Run the `qa-audit` skill on the new file.
- Verify all checks pass. If any check fails, fix the issue immediately.

---

Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
