# Fix Bugs Workflow

## Purpose
A structured multi-step process for resolving bugs or content gaps safely and systematically.

## Workflow Steps

### Step 1: Discover & Map
- Find the bug or missing section.
- Identify all affected files and check if they belong in read-only folders (like `source-files/`).

### Step 2: Apply Safety Gate
- Review security guidelines from [05-hygiene.md](./.agents/rules/05-hygiene.md) and [00-identity.md](./.agents/rules/00-identity.md).
- Ensure no credentials, API keys, or user data will be exposed during the fix.

### Step 3: Implement Fix
- Edit the target files. Use single-contiguous edit tool calls or batched edits to minimize token usage.
- Preserve all existing, unrelated comments.

### Step 4: Reflection Protocol
- Execute the reflection loop from [04-reflection.md](./.agents/rules/04-reflection.md).
- Log self-checks using the required format.

### Step 5: Report Changes
- Summarize the bug and fix in a markdown table showing changed files and status.

---

Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
