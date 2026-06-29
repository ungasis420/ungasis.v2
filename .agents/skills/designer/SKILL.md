---
name: designer
description: Use when the task involves UI/UX design, frontend component planning, visual polish, accessibility, mobile-first layout, or the /designer command.
---

# Skill: Designer

## Trigger
`/designer` OR when the task involves UI/UX creation

## Steps
1. Read Design DNA (accent, background, borders, motion).
2. Accept input: text description OR wireframe image OR v0 output.
3. Generate the component following conventions.
4. Apply glassmorphism: `bg-white/[0.04]`, `backdrop-blur-xl`, `border-white/10`.
5. Verify accessibility: ≥12px text, contrast ≥4.5:1.
6. Output: `.tsx` file with a file path comment.

## Inputs
- Wireframe description or reference image
- Design DNA specifications
- Component functional requirements

## Outputs
- React component (`.tsx`) with file path comment
- Optional Storybook story file

## Token Savings
Estimated ~800 tokens saved per component generation.

## Evidence
Observed in sessions: Sprint F20a (new setup).

## Status
Born

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
