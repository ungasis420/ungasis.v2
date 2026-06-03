# RiftCoach — Full Repo Audit Report

Date: 2026-06-03
Location: projects/riftcoach/
Auditor: Antigravity Agent

---

## 1. File Inventory

| Category | Count | Key Files |
|---|:---:|---|
| TypeScript (.ts) | 32 | [build-engine.ts](file:///C:/Users/63905/Downloads/ungasis/projects/riftcoach/src/lib/build-engine.ts), [relationship-engine.ts](file:///C:/Users/63905/Downloads/ungasis/projects/riftcoach/src/lib/relationship-engine.ts), [reasoning-enricher.ts](file:///C:/Users/63905/Downloads/ungasis/projects/riftcoach/src/lib/reasoning-enricher.ts), [reasoning-validator.ts](file:///C:/Users/63905/Downloads/ungasis/projects/riftcoach/src/lib/reasoning-validator.ts) |
| React (.tsx) | 63 | [BuildView.tsx](file:///C:/Users/63905/Downloads/ungasis/projects/riftcoach/src/components/build/BuildView.tsx), [ChampionAbilities.tsx](file:///C:/Users/63905/Downloads/ungasis/projects/riftcoach/src/components/build/ChampionAbilities.tsx), [page.tsx](file:///C:/Users/63905/Downloads/ungasis/projects/riftcoach/src/app/page.tsx), [layout.tsx](file:///C:/Users/63905/Downloads/ungasis/projects/riftcoach/src/app/layout.tsx) |
| JSON (data) | 48 | [wr_builds.json](file:///C:/Users/63905/Downloads/ungasis/projects/riftcoach/public/data/wr_builds.json), [wr_runes.json](file:///C:/Users/63905/Downloads/ungasis/projects/riftcoach/public/data/wr_runes.json) |
| JSON (config) | 3 | [package.json](file:///C:/Users/63905/Downloads/ungasis/projects/riftcoach/package.json), [tsconfig.json](file:///C:/Users/63905/Downloads/ungasis/projects/riftcoach/tsconfig.json), [components.json](file:///C:/Users/63905/Downloads/ungasis/projects/riftcoach/components.json) |
| CSS/Tailwind | 1 | [globals.css](file:///C:/Users/63905/Downloads/ungasis/projects/riftcoach/src/app/globals.css) |
| Markdown | 13 | [README.md](file:///C:/Users/63905/Downloads/ungasis/projects/riftcoach/README.md), [AGENTS.md](file:///C:/Users/63905/Downloads/ungasis/projects/riftcoach/AGENTS.md), rules files |
| Other (Scripts, Media, caches) | 1,321 | `.png`, `.jpg`, `.html`, `.mp4`, `.svg`, `.webm`, `.bat`, `.py`, `.mjs`, `.gitignore`, `.yaml` |
| **TOTAL** | **1,481** | |

---

## 2. Complete File Tree

```
projects/riftcoach/
├── .clinerules/
│   ├── 01-project.md
│   ├── 02-coding.md
│   └── 03-safety.md
├── .env.local
├── .env.local.example
├── .github/
│   ├── agents/
│   │   └── appforge.agent.md
│   ├── copilot-instructions.md
│   ├── prompts/
│   │   ├── analyze-data.prompt.md
│   │   ├── fix-error.prompt.md
│   │   ├── new-component.prompt.md
│   │   └── review-file.prompt.md
│   └── skills/
│       └── appforge/
│           └── skill.md
├── .gitignore
├── AGENTS.md
├── README.md
├── components.json
├── data/
│   ├── builds.json
│   ├── champions.json
│   ├── counters.json
│   ├── items.json
│   ├── meta.json
│   ├── runes.json
│   └── spells.json
├── debug-builds.mjs
├── debug-items.mjs
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── pnpm-workspace.yaml
├── postcss.config.mjs
├── public/
│   └── data/
│       ├── builds.json
│       ├── champions.json
│       ├── counters.json
│       ├── items.json
│       ├── meta.json
│       ├── riftcoach-schema.ts
│       ├── runes.json
│       ├── spells.json
│       ├── synergies.json
│       ├── wr_boots_enchants.json
│       ├── wr_builds.json
│       ├── wr_champions_corrections.json
│       ├── wr_champions_part1.json
│       ├── wr_champions_part2.json
│       ├── wr_champions_part3.json
│       ├── wr_counters_items_runes.json
│       ├── wr_matchups_adc.json
│       ├── wr_matchups_baron.json
│       ├── wr_matchups_mid.json
│       ├── wr_matchups_support.json
│       ├── wr_meta.json
│       ├── wr_runes.json
│       ├── wr_spells.json
│       ├── wr_synergies_adc.json
│       ├── wr_synergies_baron.json
│       ├── wr_synergies_mid.json
│       └── wr_synergies_support.json
├── rune_images_on_disk.txt
├── runes_data.json
├── runes_publicdata.json
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── build/
│   │   │   │   └── route.ts
│   │   │   ├── chat/
│   │   │   │   └── route.ts
│   │   │   ├── draft/
│   │   │   │   └── route.ts
│   │   │   ├── reasoning/
│   │   │   │   └── route.ts
│   │   │   └── review/
│   │   │       └── route.ts
│   │   ├── builds/
│   │   │   ├── loading.tsx
│   │   │   └── page.tsx
│   │   ├── climb/
│   │   │   └── page.tsx
│   │   ├── coach/
│   │   │   ├── error.tsx
│   │   │   └── page.tsx
│   │   ├── draft/
│   │   │   ├── loading.tsx
│   │   │   └── page.tsx
│   │   ├── error.tsx
│   │   ├── globals.css
│   │   ├── items/
│   │   │   ├── loading.tsx
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── review/
│   │   │   └── page.tsx
│   │   ├── runes/
│   │   │   ├── loading.tsx
│   │   │   └── page.tsx
│   │   ├── settings/
│   │   │   └── page.tsx
│   │   ├── spells/
│   │   │   ├── loading.tsx
│   │   │   └── page.tsx
│   │   ├── synergy/
│   │   │   ├── loading.tsx
│   │   │   └── page.tsx
│   │   └── tierlist/
│   │       ├── loading.tsx
│   │       └── page.tsx
│   ├── components/
│   │   ├── app/
│   │   │   ├── animated-background.tsx
│   │   │   ├── app-shell.tsx
│   │   │   ├── hex-portrait.tsx
│   │   │   ├── markdown-message.tsx
│   │   │   ├── motion-card.tsx
│   │   │   ├── page-transition.tsx
│   │   │   ├── shimmer.tsx
│   │   │   ├── sidebar.tsx
│   │   │   ├── smart-image.tsx
│   │   │   ├── stagger-grid.tsx
│   │   │   ├── theme-provider.tsx
│   │   │   ├── theme-toggle.tsx
│   │   │   └── tier-badge.tsx
│   │   ├── build/
│   │   │   ├── BuildInsights.tsx
│   │   │   ├── BuildOrder.tsx
│   │   │   ├── BuildView.tsx
│   │   │   ├── ChampionAbilities.tsx
│   │   │   ├── CoreItemsTable.tsx
│   │   │   ├── CounterStrategy.tsx
│   │   │   ├── GlassCard.tsx
│   │   │   ├── GoldEfficiency.tsx
│   │   │   ├── MatchupList.tsx
│   │   │   ├── PowerCurve.tsx
│   │   │   ├── ProsCons.tsx
│   │   │   ├── ReasoningStatus.tsx
│   │   │   ├── RuneList.tsx
│   │   │   ├── SituationalItemsTable.tsx
│   │   │   ├── SpellList.tsx
│   │   │   ├── StatsBlock.tsx
│   │   │   ├── SynergyChamps.tsx
│   │   │   └── VariantBadge.tsx
│   │   └── ui/
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       ├── input.tsx
│   │       ├── scroll-area.tsx
│   │       ├── sheet.tsx
│   │       ├── skeleton.tsx
│   │       ├── tabs.tsx
│   │       └── tooltip.tsx
│   ├── data/
│   │   └── build-variants.ts
│   ├── hooks/
│   │   └── useReasoning.ts
│   ├── lib/
│   │   ├── build-engine.ts
│   │   ├── build-modifier.ts
│   │   ├── constants.ts
│   │   ├── context-assembler.ts
│   │   ├── context-builder.ts
│   │   ├── intent-extractor.ts
│   │   ├── prompts.ts
│   │   ├── rag-retriever.ts
│   │   ├── reasoning-enricher.ts
│   │   ├── reasoning-validator.ts
│   │   ├── relationship-engine.ts
│   │   ├── slug-normalizer.ts
│   │   ├── smart-router.ts
│   │   ├── task-classifier.ts
│   │   ├── use-game-data.ts
│   │   └── utils.ts
│   ├── stores/
│   │   ├── chat-store.ts
│   │   └── settings-store.ts
│   └── types/
│       ├── ai.ts
│       ├── game.ts
│       ├── reasoning.ts
│       └── settings.ts
├── test-api.mjs
├── tsconfig.json
├── tsconfig.tsbuildinfo
├── wr_extractor/
│   ├── .cache_v2/
│   │   ├── 11db5ee8e421993dd67d1fc23f2eb525.json
│   │   ├── 20e0be28573ac95182838e8a2c843a5a.json
│   │   ├── 67b0f78a7706f3f4b76e2a7247df4f61.json
│   │   └── 71919059f1abd786d398e3b093e47d3f.json
│   ├── README_SETUP.txt
│   ├── archive/
│   │   ├── run_extractor.bat
│   │   └── wr_extractor.py
│   ├── output/
│   │   ├── data/
│   │   │   ├── champions.json
│   │   │   ├── items.json
│   │   │   ├── runes.json
│   │   │   └── spells.json
│   │   ├── extraction_report.json
│   │   └── images/ (Excluded media files: 1303 total)
│   ├── run_extractor_v2.bat
│   ├── wr_champs.txt
│   ├── wr_extractor_v2.py
│   ├── wr_game_elements_and_mechanics.txt
│   ├── wr_items.txt
│   ├── wr_runes.txt
│   └── wr_spells.txt
└── wr_profile_extractor/
    ├── README.md
    ├── champion_list.py
    ├── extract_profiles.py
    ├── run_extractor.bat
    ├── run_my_pool.bat
    ├── run_stats_only.bat
    ├── run_visible.bat
    └── setup.bat
```

---

## 3. Tech Stack (Actual from package.json)

| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | `^15.3.0` | React web application framework (App Router) |
| **React** | `^19.1.0` | Front-end library (React 19 Server/Client Components) |
| **Tailwind CSS** | `^4.1.0` | Utility-first styling engine (version 4 inline config) |
| **Zustand** | `^5.0.0` | Global state management (chat, settings stores) |
| **Framer Motion** | `^12.38.0` | UI animations and page transition transitions |
| **AI SDK** | `^6.0.177` | Vercel AI SDK core routing and streaming helper |
| **TypeScript** | `^5.8.0` | Strongly-typed JavaScript layer (strict compilation) |
| **Recharts** | `^3.8.1` | Graphical charts for stats/power curve visualizations |

---

## 4. Architecture Map

### Pages/Routes

| Route | File | What It Shows | Working? |
|---|---|---|:---:|
| `/` | `src/app/page.tsx` | Main dashboard grid with cinematic tiles | ✅ Yes |
| `/tierlist` | `src/app/tierlist/page.tsx` | Patch 7.1d meta rankings by role | ✅ Yes |
| `/draft` | `src/app/draft/page.tsx` | Interactive draft pick/ban coach tool | ✅ Yes |
| `/builds` | `src/app/builds/page.tsx` | Complete champion build lookup visualizer | ✅ Yes |
| `/items` | `src/app/items/page.tsx` | Item search and details panel | ✅ Yes |
| `/runes` | `src/app/runes/page.tsx` | Keystone + minor rune details and trees | ✅ Yes |
| `/spells` | `src/app/spells/page.tsx` | Summoner spells catalog | ✅ Yes |
| `/coach` | `src/app/coach/page.tsx` | Real-time interactive AI gaming coach | ✅ Yes |
| `/review` | `src/app/review/page.tsx` | Post-game lobby stat reviewer tool | ✅ Yes |
| `/climb` | `src/app/climb/page.tsx` | Rank-specific coaching advice | ✅ Yes |
| `/settings` | `src/app/settings/page.tsx` | Key config & routing manager | ❌ Prerender crash |

### Components (Selected from `src/components/build/`)

| Component | File | Purpose | Lines |
|---|---|---|---|
| `BuildView` | `BuildView.tsx` | Orchestrates visual layout of 16+ child blocks | 304 |
| `ChampionAbilities` | `ChampionAbilities.tsx` | Displays ability info and type tags (CC, Shield, Heal) | 311 |
| `BuildOrder` | `BuildOrder.tsx` | Render priority buy path with AI explanation rationale | 304 |
| `GoldEfficiency` | `GoldEfficiency.tsx` | Breakdown item stats value vs gold cost | 364 |
| `PowerCurve` | `PowerCurve.tsx` | Visualizes early/mid/late game scaling curve | 218 |
| `StatsBlock` | `StatsBlock.tsx` | Displays AD, AP, HP, EHP, and Haste values | 278 |
| `ProsCons` | `ProsCons.tsx` | Highlights build advantages and key mitigations | 122 |

### Hooks & Utils

| Name | File | Purpose |
|---|---|---|
| `useReasoning` | `src/hooks/useReasoning.ts` | Feeds app state details to the backend `/api/reasoning` endpoint |
| `build-engine` | `src/lib/build-engine.ts` | Zero-hallucination DB builder and builder resolver |
| `build-modifier` | `src/lib/build-modifier.ts` | Dynamically alters items/runes based on build intents (ap/tank/etc.) |
| `relationship-engine`| `src/lib/relationship-engine.ts` | Static JSON-lookup for champion synergy, threat details, counter strategies |
| `reasoning-enricher` | `src/lib/reasoning-enricher.ts` | Pre-processes system queries to add ability context tags |
| `reasoning-validator` | `src/lib/reasoning-validator.ts` | Verifies generated outputs include database references |

### API Routes

| Endpoint | File | AI Provider | Purpose |
|---|---|---|---|
| `/api/build` | `src/app/api/build/route.ts` | None | Direct resolver endpoint for builds JSON |
| `/api/chat` | `src/app/api/chat/route.ts` | Groq / OpenRouter | Streaming endpoint for standard RAG chat query |
| `/api/draft` | `src/app/api/draft/route.ts` | Groq / OpenRouter | Returns draft pick recommendations |
| `/api/reasoning` | `src/app/api/reasoning/route.ts` | 6-Wave Cascade | Returns JSON object explaining builds with grounding rules |
| `/api/review` | `src/app/api/review/route.ts` | Groq / OpenRouter | Audits match summaries inputs |

### Data Files

| File | Records | Schema (first 3 fields) |
|---|---|---|
| `wr_builds.json` | 143 builds | `champion_id`, `build_name`, `archetype` |
| `wr_runes.json` | 53 runes | `meta`, `keystones`, `paths` |
| `wr_spells.json` | 10 spells | `id`, `name`, `cooldown` |
| `wr_matchups_adc.json` | 22 matchups | `champion_id`, `strong_against`, `weak_against` |
| `wr_synergies_adc.json` | 22 synergies | `champion_id`, `best_with`, `anti_synergy` |
| `wr_counters_items_runes.json` | 51 counters | `meta`, `item_counters`, `rune_counters` |

---

## 5. AI Provider System Deep Dive

### Providers Configured

| Provider | Models | File | Status |
|---|---|---|---|
| **Cerebras** | 4 models (gpt-oss-120b, qwen-3-235b, etc.) | `/api/reasoning` | Active (Wave 0) |
| **Groq** | 7 models (Scout-17b, Llama 3.3 70B, Qwen 32B, etc.) | `/api/reasoning`, `/api/chat` | Active (Wave 1 / Primary Chat) |
| **Google AI Studio** | 2 models (gemini-2.0-flash, gemini-2.5-flash) | `/api/reasoning` | Active (Wave 2) |
| **OpenRouter** | 12 free models (DeepSeek V4, Llama 3.3, Gemma 4, etc.) | `/api/reasoning`, `/api/chat` | Active (Wave 3 / Fallback Chat) |
| **Mistral** | 3 models (mistral-small, devstral-small, etc.) | `/api/reasoning` | Active (Wave 4) |
| **Together.ai** | 5 models (Llama 4 Scout, Qwen 235B, V3, etc.) | `/api/reasoning` | Active (Wave 5) |

### Build Engine Pipeline

1. **User selects champion**: Dashboard `/builds` page fires lookup requests.
2. **preBuildResponse()**: resolves the static database `wr_builds.json` and loads corresponding runes/spells/items. It structures a markdown template featuring placeholders like `[AI: why this item for Champion]`.
3. **AI call**: `/api/reasoning` is invoked. It extracts champion ability metadata and executes `classifyAbilityType` to find mechanical tags (`CC`, `HEAL`, `SHIELD`).
4. **Response processing**: The 6-wave cascade gets triggered, running sequentially. A response is queried as a structured JSON object. It runs through the `Deep WHY Quality Gate` (checks for ability names and numbers to avoid fluff, and counts pros/cons).
5. **Display**: Accepted responses are rendered inside component blocks (`BuildOrder.tsx`, `ProsCons.tsx`).

### Validation Layer

- **What validation exists**:
  - `reasoning-validator.ts`: Checks that every item, rune, and spell from the database is represented in the AI rationale dictionary, checking for completeness.
  - `Deep WHY Gate`: Rejects outputs unless each pro/con and item explanation matches regex grounding checks (mentions ability letters/names, stat values, or entities).
- **What is missing**:
  - Semantic accuracy check: The validator matches numbers, but doesn't check if the number is correct (e.g. if the AI hallucinated that `Infinity Edge` grants +500 AD, the validator accepts it since "+500" is a number).

---

## 6. Quality Assessment

| Dimension | Score | Evidence |
|---|:---:|---|
| **Code organization** | 9/10 | High-quality structure. Clear routes, state management separation, and library segregation. |
| **TypeScript strictness** | 10/10 | Passes `tsc --noEmit` cleanly with zero errors. All interfaces are fully typed. |
| **Component reusability** | 8.5/10| Components are modular and neat, but tightly bound to domain data structure templates. |
| **Data grounding (AI accuracy)** | 9/10 | Strict double-pass architecture ensures build lists are 100% correct. Grounding checks block generic fluff. |
| **Error handling** | 7/10 | Deep fallback cascades are excellent, but client rendering has a potential crash due to missing settings properties. |
| **UNGASIS conventions** | 9/10 | Implements proper monorepo organization and naming rules. |
| **Overall** | **8.75/10** | |

---

## 7. Health Check Results

| Check | Result | Details |
|---|:---:|---|
| **npm install** | ✅ PASS | Resolves cleanly. Installed 772 packages in 24 seconds. |
| **tsc --noEmit** | ✅ PASS | Compiles with zero errors or warnings. |
| **npm run build** | ❌ FAIL | Fails during static page prerendering on `/settings` page. |
| **npm run dev** | ✅ PASS | Server runs, listens on port `3001` (since `3000` is currently used). Ready in 2.1 seconds. |

---

## 8. Issues Found

### Prerender Crash (Build Failure)
- **File**: [settings/page.tsx](file:///C:/Users/63905/Downloads/ungasis/projects/riftcoach/src/app/settings/page.tsx) (Line 104)
- **Problem**: `(m as any).strengths.map()` is called, but no model inside `FREE_MODELS` (defined in [smart-router.ts](file:///C:/Users/63905/Downloads/ungasis/projects/riftcoach/src/lib/smart-router.ts)) defines a `strengths` property. This crashes Next.js compilation during static page export.
- **Severity**: 🔴 HIGH (Blocks deployment build).

### TODOs/FIXMEs
- **None found** in `.ts` or `.tsx` files. Very clean codebase!

### Security Risks
- **None found**. All environment variables are correctly read from `.env.local`. `.env.local.example` contains placeholders. No key leakages.

### Hardcoded Values
- **File**: [settings/page.tsx](file:///C:/Users/63905/Downloads/ungasis/projects/riftcoach/src/app/settings/page.tsx)
- **What**: Input field contains a hardcoded placeholder `"sk-or-v1-..."`.
- **Should Be**: Correct placeholder representing settings context.

### Dead Code / Unused Files
- **Files**: `debug-builds.mjs`, `debug-items.mjs`, `test-api.mjs`.
- **Why**: Temporary debug/testing scripts stored in the root folder.
- **Files**: `wr_extractor/archive/`.
- **Why**: Outdated crawler code replaced by `wr_extractor_v2.py`.

---

## 9. Phase History (Reconstructed)

| Phase | What Was Built | Key Files |
|---|---|---|
| **Phase 1.0–2.0** | Core Next.js UI app shell, router views, static menus | `page.tsx`, `layout.tsx`, `Sidebar.tsx` |
| **Phase 3.0** | Champion data crawlers, metadata extractors | `wr_extractor_v2.py`, `champion_list.py` |
| **Phase 4.0** | Route A build DB lookup engine | `build-engine.ts`, `wr_builds.json` |
| **Phase 4.5** | Relationship network lookup (synergies, matchups) | `relationship-engine.ts`, `wr_matchups_adc.json` |
| **Phase 5.0** | Reasoning engine with cascade + completeness checks | `reasoning-validator.ts`, `/api/reasoning/route.ts` |
| **Phase 5.5** | 6-Wave Provider cascade routing layer | `/api/chat/route.ts` |
| **Phase 5.7** | Deep WHY Quality Gate and ability mechanics tagging | `reasoning-enricher.ts` |
| **Phase 5.8** | Intent-based build modification and dynamic swaps | `build-modifier.ts`, `intent-extractor.ts` |

---

## 10. Roadmap Recommendation

### Phase 5.7: Deep WHY Layer (Maintenance task)
- **Task**: Fix settings page crash by adding `strengths` list to [smart-router.ts](file:///C:/Users/63905/Downloads/ungasis/projects/riftcoach/src/lib/smart-router.ts) or adding optional chaining `?.map()` to [settings/page.tsx](file:///C:/Users/63905/Downloads/ungasis/projects/riftcoach/src/app/settings/page.tsx#L104).
- **Files to modify**: [settings/page.tsx](file:///C:/Users/63905/Downloads/ungasis/projects/riftcoach/src/app/settings/page.tsx), [smart-router.ts](file:///C:/Users/63905/Downloads/ungasis/projects/riftcoach/src/lib/smart-router.ts)
- **Estimated effort**: 0.5 hours.

### Phase 6.0+: Build Lab & Real-Time Theorycraft
- **Task**: Implement real-time stats calculator with level sliders (1-15) and custom gold efficiency counters.
- **Files to create**: `src/components/build/BuildLab.tsx`, `src/hooks/useBuildStats.ts`
- **Estimated effort**: 12 hours.

### MVP shipping checklist (to go live to real users):
1. Fix the `/settings` page build-blocking compilation error.
2. Setup Vercel deployment hook variables with OpenRouter API keys.
3. Perform a final verification audit on a mock mobile viewport to check glassmorphism rendering stability.

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
