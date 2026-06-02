# CONVENTIONS.md — UNGASIS OS Development Conventions (v4.0)

## Core Principles
- Follow [AGENTS.md](file:///c:/Users/63905/Downloads/ungasis/AGENTS.md). Follow existing project style.
- Descriptive names. Component files under 200 lines. Functions under 50 lines.
- Surgical edits only. No adjacent refactors unless explicitly asked.
- Check for tests before making changes. Do not output unchanged code.

## Coding Standards
- **File Naming:** kebab-case for files, PascalCase for components.
- **Component Limits:** Max 200 lines per component file.
- **TypeScript:** Strict mode, no `any` type usage. Use interface over type for object shapes.
- **Styling:** Tailwind CSS utility classes only (no CSS modules, no `@apply` rules).
- **Glass Pattern:** `bg-white/[0.04] backdrop-blur-xl border-white/10 rounded-2xl`
- **Chart Colors:** Inline hex styles only (e.g., `#00d4ff` or `#a78bfa`), NOT Tailwind color classes.
- **Import Order:** react, next, third-party, local, types, styles.

## Git & Commit Format
- **Commit Format:** `type: what — why`
  - *Example:* `feat: add IndexedDB backend — support offline tasks`

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
