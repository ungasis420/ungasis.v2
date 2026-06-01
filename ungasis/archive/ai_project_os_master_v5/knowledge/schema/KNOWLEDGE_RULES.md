# Knowledge Rules

## Naming

Use lowercase kebab-case file names.

Examples:

- `ai-project-os-lessons.md`
- `customer-research-patterns.md`
- `auth-gotchas.md`

## Wiki page format

```md
# Topic

## Source fidelity
Raw source / official docs / user notes / synthesis / assumption.

## Short summary

## Key principles

## Reusable workflow

## Examples

## Related files

## Open questions
```

## Source handling

- Preserve raw sources under `knowledge/raw/`.
- Write concise summaries under `knowledge/wiki/`.
- Link wiki pages from `knowledge/index.md`.
- Separate facts, assumptions, synthesis, and opinions.
- Mark transcript-derived lessons as transcript-derived only when the transcript is actually available.

## Librarian behavior

When updating knowledge:

1. Read the raw source.
2. Extract durable lessons.
3. Create or update focused wiki pages.
4. Link related files.
5. Record uncertainties.
6. Avoid dumping raw source into wiki pages.
