# GitHub Copilot Instructions for UNGASIS OS

## Identity & Project
This is UNGASIS OS (or current [QUEST_NAME]), a Markdown-first knowledge repository for AI-powered solopreneur development.

## Rules & Standards
- Follow the token efficiency rules in [.clinerules/01-token-efficiency.md](./.clinerules/01-token-efficiency.md) / [.agents/rules/01-token-efficiency.md](./.agents/rules/01-token-efficiency.md)
- Follow the safety gate in [.clinerules/06-safety-gate.md](./.clinerules/06-safety-gate.md) or standard hygiene rules in [.agents/rules/05-hygiene.md](./.agents/rules/05-hygiene.md) (always read files before editing them).
- Use simple English (ESL-friendly for Mel).
- Use tables for comparisons and markdown checklists for step-by-step procedures.
- Never expose API keys, tokens, passwords, or secrets.
- Never modify or delete reference files in `source-files/` (they are strictly read-only).
- End every new file with the standard staleness footer.

## Stack
- Next.js 15 (App Router) + React 19 + TypeScript 5.8
- Tailwind CSS 4 (utility-first, @theme for tokens)
- shadcn/ui components (Radix-based)
- Framer Motion 12 for animations
- Zustand 5 for state management
- Dexie.js for IndexedDB
- Recharts for dashboard charts
- Vercel AI SDK for streaming

## Code Conventions
- File naming: kebab-case for files, PascalCase for components
- Max 200 lines per component file
- Use TypeScript strict mode — no `any` types
- Use `interface` over `type` for object shapes
- Tailwind classes: use utility classes, not @apply
- Chart colors: inline hex styles, NOT Tailwind color classes
- Import order: react, next, third-party, local, types, styles
- Always use `'use client'` directive for client components

## Design Tokens & Glassmorphism
- Theme: Dark glassmorphism
- Background: #0a0a1a bg, #00d4ff accent, #a78bfa secondary
- Glass: bg-white/[0.04] backdrop-blur-xl border-white/10 rounded-2xl
- All text >= 12px for readability

## Style & Domain Language
- Use UNGASIS domain language:
  - **quest** instead of project
  - **chapter** instead of lifecycle stage
  - **mana** instead of token budget
  - **codex** instead of documentation
  - **forge** instead of develop/code
- Compact output: prefer tables over paragraphs, and bullet lists over long descriptions.
- Include analogies from cooking, sports, or everyday life to explain technical ideas.

## Do NOT
- Do not use CSS modules — use Tailwind only
- Do not create files > 200 lines — split into components
- Do not use default exports — use named exports
- Do not hardcode colors — use CSS variables or design tokens

## Cross-Tool Awareness
- This project is used across multiple AI assistants: Cline (which reads `.clinerules/`) and Antigravity (which reads `.agents/rules/`).
- [CLAUDE.md](./CLAUDE.md) acts as the shared configuration bridge.
- When editing behavior rules, you must update the rule files in both locations: `.clinerules/` and `.agents/rules/` to keep them in sync.

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
