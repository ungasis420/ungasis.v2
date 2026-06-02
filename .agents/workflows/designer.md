---
name: designer
description: >
  Generate UI components following UNGASIS glassmorphism Design DNA.
---

# /designer — UI Component Generation Workflow

Call @designer to generate React + Tailwind + shadcn/ui components.

## When to Use
- When Mel describes a UI screen or component
- When refining v0.dev or Google Stitch output
- When building Form 2 dashboard views
- When creating RiftCoach UI components

## Steps
1. Read Design DNA from .ungasis/architect/BLUEPRINT_CONTEXT.md
2. Accept input: text description, wireframe, or v0/Stitch output
3. Generate React + TypeScript + Tailwind 4 + shadcn/ui component
4. Apply glassmorphism theme to ALL elements:
   - Background: bg-white/[0.04] on #0a0a1a
   - Backdrop: backdrop-blur-xl
   - Border: border-white/10
   - Radius: rounded-2xl
   - Accent: #00d4ff (cyan)
   - Secondary: #a78bfa (purple)
5. Verify accessibility: text ≥12px, contrast ≥4.5:1
6. Chart colors: inline hex styles only (NOT Tailwind classes)
7. Motion: Framer Motion 12, subtle transitions (0.2s easeInOut)
8. Output: .tsx file with file path as first comment
9. Max 200 lines per component

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
