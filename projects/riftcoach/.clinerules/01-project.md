# RiftCoach Project Context (for Cline)

## What Is RiftCoach
RiftCoach is an AI-powered coaching app for Wild Rift MOBILE (NOT LoL PC).
It provides build recommendations, matchup analysis, synergy guidance,
and champion learning paths.

## Tech Stack
| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Frontend | React 19, TypeScript 5.8 (strict) |
| Styling | Tailwind CSS 4, Glassmorphism theme |
| Components | Shadcn/UI, Framer Motion 12 |
| Charts | Recharts |
| State | Zustand 5 |
| AI Providers | Cerebras, Groq, Google AI, OpenRouter, Mistral, Together (6 providers, 114 attempts) |

## Architecture
- **Route A**: Build Engine (JSON) — zero hallucination, pure DB lookup
- **Route B**: RAG Chat (streaming markdown) — for general questions
- **AI Reasoning**: /api/reasoning — 6-wave cascade with Deep WHY Gate
- **Intent Layer**: Detects tank/ap/burst/poke/etc from user message
- **Relationship Engine**: Synergies, matchups, counters from JSON

## 6-Layer AI Safety Stack
1. Build Engine → 100% accurate JSON data
2. DB Enrichment → real stats + abilities + type tags in prompt
3. Relationship Context → synergies + matchups injected
4. Deep WHY Gate → rejects generic/ungrounded AI output
5. DB Cross-Check → verifies ALL items/runes/spells covered
6. Confidence Score → verified / issues / high / medium / low

## Database (public/data/)
- 140 champions (3 parts), 114 items, 53 runes, 10 spells
- 153 builds, 103 matchups, 104 synergies, 51 counter strategies
- 10 archetype builds, 2 meta entries

## Key Files
| File | Purpose |
|------|---------|
| src/lib/build-engine.ts | Pure JSON build lookup (zero hallucination) |
| src/lib/relationship-engine.ts | Synergies, matchups, counters |
| src/lib/reasoning-enricher.ts | DB stats + abilities + type tags in AI prompt |
| src/lib/reasoning-validator.ts | Cross-checks AI output against build data |
| src/lib/intent-extractor.ts | Detects build intent (tank/ap/burst/etc) |
| src/app/api/reasoning/route.ts | 6-wave cascade + Deep WHY Gate + championData |
| src/app/api/chat/route.ts | Two-Route handler (JSON + streaming) |
| src/components/build/BuildView.tsx | Orchestrator (16+ child components) |
| src/components/build/ChampionAbilities.tsx | P/Q/W/E/R display with type tags |
| src/components/build/BuildOrder.tsx | Numbered build order with AI rationale |
| src/hooks/useReasoning.ts | Reasoning hook (returns reasoning + championData) |
| src/types/reasoning.ts | BuildReasoning, EnrichedChampionData, ChampionAbility |

## Current Phase
- Phases 1.0–5.8 COMPLETE
- Next: Phase 5.8.1 (Dynamic Build Swapping) → Phase 6.0 (Multi-Agent Parallel Reasoning)

## Developer Context
- Developer (Mel) is NOT tech savvy — uses copy-paste workflow
- Provide complete files — never leave placeholders
- Simple English — Feynman method
- Break large outputs into chunks