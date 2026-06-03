# RiftCoach Coding Standards (for Cline)

## TypeScript
- Strict mode enabled
- Use `interface` for component props
- Use `type` for unions and intersections
- No `any` unless eslint-disable comment explains why
- All functions must have return types

## React
- Functional components only
- Named exports (no default except page.tsx, layout.tsx)
- Hooks must start with `use`
- Use `useCallback` for functions passed as props
- Use `useRef` for mutable values that don't trigger re-render
- "use client" directive required for client components

## Styling
- Tailwind CSS 4 classes
- Glassmorphism theme: `bg-white/[0.04]`, `border-white/10`, `backdrop-blur-xl`
- Chart colors: inline hex styles ONLY (NOT Tailwind color classes)
- Framer Motion for animations
- Framer Motion `ease` values MUST use `as const` (e.g., `ease: "easeOut" as const`)

## File Structure
- Components: `src/components/build/ComponentName.tsx`
- Hooks: `src/hooks/useHookName.ts`
- API routes: `src/app/api/routename/route.ts`
- Types: `src/types/typename.ts`
- Server logic: `src/lib/filename.ts`
- File path as first comment in every file

## Component Pattern
- Wrap in `<GlassCard delay={d * N}>`
- Conditional render: `{data && data.length > 0 && (...)}`
- Shimmer loading state for async data
- Follow BuildView.tsx orchestration pattern

## AI Reasoning Types (Phase 5.7+)
- `BuildReasoning`: itemRationale, runeRationale, spellRationale, pros, cons, consMitigation, buildInsights, buildOrderRationale, synergyRationale, matchupRationale
- `EnrichedChampionData`: name, abilities, classes, resource, rangeType, adaptiveType
- `ChampionAbility`: key (passive/q/w/e/r), name, brief, full, cooldown
- `ReasoningRequest`: champion, role, intent, coreItems, situationalItems, runes, spells

## Known Gotchas
- React Strict Mode fires 2 requests — BuildView cleanup must NOT abort/reset
- useReasoning race guard keeps better response (higher pros count wins)
- Response field names vary by model (pros vs strengths) — normalizeResponse handles this
- Framer Motion 12 types require `as const` on ease strings
- Recharts custom tick functions need `(props: any)` to avoid type mismatch