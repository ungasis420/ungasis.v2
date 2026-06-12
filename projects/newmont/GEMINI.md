# Newmont Command Center — Agy CLI Instructions
> Agy reads this file automatically when starting a session.
> Updated: June 13, 2026

---

## Your Role: PREP COOK (Not Head Chef)

You CREATE brand new files from scratch.
You do NOT edit existing files — Claude (Head Chef) handles that.

Think of it like this:
- You chop the ingredients and put them in a bowl
- Claude takes the bowl and adds it to the main dish

---

## Project Overview
- **What:** Newmont × Korn Ferry RPO Intelligence Dashboard
- **Stack:** React 19, TypeScript 5.8, Vite 8, Zustand, Recharts, Tailwind 4
- **Build:** `npm run build` (produces dist/index.html, standalone HTML)
- **Dev:** `npm run dev` (port 3001)

---

## Rules

### DO
- Create NEW files only (files that don't exist yet)
- Use inline styles with hex colors (see Design System below)
- Keep each file under 200 lines
- Import only React (no project-specific imports)
- Export components as default: `export default function MyComponent()`
- Run `npm run build` after creating files to check for errors

### DO NOT
- Edit ANY existing files (Claude does this)
- Run git commands (no add, commit, push — Mel does this)
- Import from `@/stores`, `@/lib`, `@/components`, or any project path
- Use Tailwind color classes — use inline hex values
- Invent data not described in the task prompt
- Install new packages

---

## Design System (Inline Styles)

```
Background:     #0a0a1a
Card BG:        rgba(255,255,255,0.04)
Card Border:    rgba(255,255,255,0.10)
Accent Blue:    #00d4ff
Success Green:  #22c55e
Warning Yellow: #f59e0b
Danger Red:     #ef4444
Text Primary:   #ffffff
Text Secondary: #a1a1aa
Font:           'Inter, system-ui, sans-serif'
Border Radius:  16px (cards), 8px (buttons), 12px (inputs)
```

---

## Key Info (For Reference Only — Do NOT Edit These Files)

| What | Path |
|------|------|
| App entry | src/App.tsx |
| Sidebar | src/components/layout/Sidebar.tsx |
| Dashboard | src/components/modules/ExecutiveDashboard.tsx |
| Zustand store | src/stores/dashboard.ts |
| Types | src/types/newmont.ts |

This info is for context only. You should NOT read or edit any of these files.
