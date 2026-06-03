---
name: AppForge Development
description: Full-stack development skills for RiftCoach AI coaching app
---

# AppForge Development Skill

## When to Use
Use this skill when working on any RiftCoach development task including:
- Creating new React components
- Modifying API routes
- Updating the build engine, relationship engine, or reasoning enricher
- Working with the 6-provider AI cascade
- Adding new features to BuildView
- Expanding the provider cascade (Cerebras, Google, Mistral, Together)

## Resources
- ../../src/lib/build-engine.ts
- ../../src/lib/relationship-engine.ts
- ../../src/lib/reasoning-enricher.ts
- ../../src/components/build/BuildView.tsx
- ../../src/hooks/useReasoning.ts
- ../../src/types/reasoning.ts
- ../../src/app/api/reasoning/route.ts
- ../../src/app/api/chat/route.ts
- ../../public/data/

## Production Pipeline Awareness

This project uses a multi-agent workflow:
- M365 Copilot (Claude Opus) = Architect + Builder (writes code)
- Cline (OpenRouter deepseek-v4-flash) = Fixer/Debugger
- VS Code Chat (OpenRouter) = Tester/Reviewer
- VS Code Copilot (GPT-4.1) = Autocomplete

When writing code, assume it will be:
1. Copy-pasted by a non-tech developer
2. Debugged by Cline if errors occur
3. Reviewed by VS Code Chat for edge cases

## Component Creation Pattern

Every new RiftCoach component must follow this pattern:

1. Add "use client" directive at top
2. Add file path as first comment
3. Define TypeScript `interface` for ALL props (not `type`)
4. Import motion and AnimatePresence from framer-motion
5. Add shimmer loading state if component receives async data
6. Use glassmorphism styling: border-white/10, bg-white/[0.04], backdrop-blur-xl
7. All colors as inline hex styles, NOT Tailwind color classes
8. Export as named export (never default)
9. Use useCallback for functions passed as props
10. Wrap in GlassCard with stagger delay pattern from BuildView

## Error Fixing Pattern

When fixing errors:

1. Read the full error message
2. Identify the exact file and line number
3. Check if it is a TypeScript type error, runtime error, or build error
4. Explain the cause in simple English with an analogy
5. Provide the complete fixed code block (entire file, no placeholders)
6. Explain what changed and why
7. Check: does this fix break any file that imports from this one?
8. If unsure, tell the user to run Cline: "Read [file] and fix [error]"

## Data Rules

- All game data comes from public/data/ JSON files
- Never fabricate item stats, rune effects, or champion abilities
- AI reasoning explains "why" — it does not provide data
- Build Engine (Route A) returns verified JSON — zero hallucination
- Relationship Engine returns synergies, matchups, counters from JSON
- Reasoning Enricher loads full DB stats (6224 chars) into AI prompt
- AI response is wrapped: { success: true, reasoning: { ...data } }
- useReasoning hook normalizes via normalizeResponse()

## AI Cascade Architecture

The app uses a 6-provider cascade with 104 fallback attempts:

| Wave | Provider | Keys | Models | Speed |
|------|----------|------|--------|-------|
| 0 | Cerebras | 4 | 2 | 2,700 t/s |
| 1 | Groq | 4 | 7 | 800 t/s |
| 2 | Google AI Studio | 4 | 2 | Fast |
| 3 | OpenRouter | 3 | 12 | Varies |
| 4 | Mistral | 3 | 3 | Fast |
| 5 | Together.ai | 3 | 5 | Fast |

All providers use OpenAI-compatible API format.
Never change the cascade order without explicit request.

## Known Gotchas

- React Strict Mode fires 2 requests — BuildView cleanup must NOT abort/reset
- useReasoning race guard keeps better response (higher pros count wins)
- Some free models return 0 pros/cons — cascade should skip these
- items_unified_v2.json doesn't exist — enricher falls back to items.json
- Response field names vary by model (pros vs strengths) — normalizeResponse handles this
- Wild Rift MOBILE only — 15 levels, 15-20 min games, unique items/runes