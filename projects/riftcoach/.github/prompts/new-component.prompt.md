### description: Create a new RiftCoach React component

Create a new React component for RiftCoach with:
- "use client" directive at top
- File path as first comment
- TypeScript interface for all props (use interface, not type)
- Named export (not default)
- Framer Motion animations (AnimatePresence, motion.div)
- Framer Motion ease values must use `as const` (e.g., `ease: "easeOut" as const`)
- Glassmorphism styling: border-white/10, bg-white/[0.04], backdrop-blur-xl
- All colors as inline hex styles, NOT Tailwind classes
- Shimmer loading state if the component receives async data
- All functions with explicit return types
- useCallback for functions passed as props

Follow the existing patterns from:
- src/components/build/ChampionAbilities.tsx (type tags + color badges + stagger)
- src/components/build/BuildOrder.tsx (numbered steps + AI rationale)
- src/components/build/SynergyChamps.tsx (layout + animation + AI rationale priority)
- src/components/build/GlassCard.tsx (glassmorphism wrapper)
- src/components/build/ProsCons.tsx (conditional rendering + mitigation)

Component must be compatible with BuildView.tsx orchestration pattern:
- Wrapped in <GlassCard delay={d * N}>
- Conditional render: {data && data.length > 0 && (...)}
- Props interface matches the data shape from build-engine.ts
- If receiving AI rationale, show AI rationale (priority) with DB fallback