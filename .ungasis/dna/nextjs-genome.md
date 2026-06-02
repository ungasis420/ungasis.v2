# nextjs-genome.md — Next.js 15 DNA

This is the extra blueprint information specifically for building Next.js 15 apps. Use this to construct modern web interfaces with visual animations and local state.

## SCAFFOLD COMMAND
Run this command from your terminal:
`npx create-next-app@latest . --typescript --tailwind --app --src-dir`

## CONFIGS
- `tsconfig.json`: Must use `strict: true` and enforce no `any` types.
- `tailwind.config.js`: Integrate glassmorphism utilities.
  ```javascript
  // Example utility addition
  theme: {
    extend: {
      backdropBlur: {
        xs: '2px',
      }
    }
  }
  ```
- `shadcn/ui`: Initialize using `npx shadcn@latest init` and select the Slate/Zinc dark color scheme.

## FOLDER STRUCTURE
```
src/
├── app/              → App Router pages, layout, and loading states
├── components/       
│   └── ui/           → Automated shadcn component installations
├── lib/              → Shared utility functions (e.g., cn helper)
├── types/            → Shared TypeScript models and interfaces
└── stores/           → Zustand state managers (v5)
```

## DEPENDENCIES TABLE
| Group | Package | Version | Purpose |
|---|---|---|---|
| Core | `react` | 19.x | Framework engine |
| Core | `next` | 15.x | App Router & server features |
| Core | `typescript` | 5.8.x | Type safety |
| UI | `tailwindcss` | 4.x | Utility styles |
| UI | `shadcn/ui` | Latest | Accessible UI components |
| UI | `framer-motion` | 12.x | Glassmorphic visual animations |
| Data | `zustand` | 5.x | Global state management |
| Data | `dexie` | Latest | Client-side IndexedDB database |
| Data | `recharts` | Latest | Premium analytical charts |
| Dev | `eslint` | Latest | Strict code linting |
| Dev | `prettier` | Latest | Unified file formatting |

## COMPONENT RULES
- **Length Limit:** Components must be kept below 200 lines. Split large components into smaller files.
- **Naming Style:** Use kebab-case for file names and PascalCase for React component function names.
- **Import Order:** Enforce this import structure:
  1. React core (`react`)
  2. Next.js components (`next/link`, `next/navigation`)
  3. Third-party packages (`framer-motion`, `lucide-react`)
  4. Local components and custom hooks
  5. TypeScript types and interfaces
  6. External style sheets

## DEPLOYMENT
- Host on Cloudflare Pages.
- Build command: `npm run build`
- Output directory: `.next`

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
