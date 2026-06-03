# Skill: Code Review

## When to Use
When the user asks to review a file, PR, or set of changes.

## Steps
1. Read the changed files (use line ranges for large files)
2. Check for: bugs, security issues, performance, style, test coverage
3. Report findings using format: [severity] file:line - issue - suggestion
4. Severity levels: [critical] [warning] [info] [nit]
5. Summarise: X issues found (Y critical, Z warnings)
6. Suggest which tests to run
