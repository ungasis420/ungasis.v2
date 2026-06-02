# Context Engineering Audit Prompt

Act as a context engineer for this AI-assisted project.

Objective: build the smallest useful context pack for the next task.

Inputs:
- task goal
- current files/docs/specs
- known errors or questions

Process:
1. Identify what the assistant needs to know.
2. Exclude noisy or irrelevant context.
3. List exact files to read.
4. Produce a compact context pack.
5. Define verification.

Output:
```text
Context pack:
Relevant files:
Excluded context:
Assumptions:
Verification:
Risks:
```
