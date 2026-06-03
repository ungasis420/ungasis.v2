# RiftCoach — Agent Instructions (Cross-Tool Standard)

This file is read by GitHub Copilot, Cline, Claude Code, and other AI agents.

## Project
RiftCoach — AI coaching app for Wild Rift (MOBILE, NOT LoL PC).

## Stack
Next.js 15, React 19, TypeScript 5.8 (strict), Tailwind CSS 4,
Shadcn/UI, Framer Motion 12, Recharts, Zustand 5.

## Architecture
- Build Engine: pure JSON lookup from public/data/*.json (zero hallucination)
- AI Reasoning: /api/reasoning with enriched database context
- RAG Chat: /api/chat with streaming markdown
- UI: 14 glassmorphism card components

## Rules for ALL Agents
1. Wild Rift MOBILE only — never LoL PC
2. TypeScript strict mode — no `any` without eslint-disable
3. Named exports only (except page.tsx)
4. Glassmorphism theme for all UI
5. Never modify public/data/*.json without explicit request
6. Never modify .env.local
7. File path as first comment in every new file
8. Complete files only — no placeholders or "rest unchanged"