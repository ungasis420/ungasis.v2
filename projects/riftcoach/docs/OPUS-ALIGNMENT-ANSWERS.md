# Answers to Opus Alignment Questions

## ❶ Where is the actual code RIGHT NOW?

The code has been moved into the UNGASIS monorepo:
**C:\Users\63905\Downloads\ungasis\projects\riftcoach\**

It is NO LONGER in a separate folder. This is the only copy.
GitHub: https://github.com/ungasis420/ungasis.v2 (under projects/riftcoach/)

### Complete File Tree:
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
│   │   └── images/
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

### File Count Summary:
| Type | Count |
|------|:-----:|
| `.png` | 555 |
| `.jpg` | 406 |
| `.html` | 203 |
| `.mp4` | 126 |
| `.tsx` (React components) | 63 |
| `.json` (Data/Configs) | 48 |
| `.ts` (TypeScript code) | 32 |
| `.md` (Documentation/Rules) | 13 |
| `.svg` | 10 |
| Other (`.txt`, `.bat`, `.mjs`, `.py`, `.webm`) | 25 |
| **TOTAL** | **1,481** |

---

## ❷ What files actually exist?

### Folder Structure:
`projects/riftcoach/` is structured as a Next.js App Router project:
- **`data/`** & **`public/data/`**: JSON files representing the Wild Rift game database (champions, items, runes, counters, matchups, synergies).
- **`src/app/`**: Visual pages and API endpoints.
- **`src/components/`**: React visual items divided into `app/` (general structure) and `build/` (build details panels).
- **`src/lib/`**: Build logic, API routing engine, relationship lookups, and AI grounding validation rules.
- **`src/types/`**: Strict contracts.
- **`wr_extractor/`** & **`wr_profile_extractor/`**: Data scraper scripts.

### Key Files:
- **Data**:
  - `wr_builds.json` (143 builds / 137 champions) — master list of verified builds.
  - `wr_runes.json` (53 runes) — keystone and slot data.
  - `wr_spells.json` (10 spells) — spell descriptions.
  - Matchups: `wr_matchups_support.json` (26), `wr_matchups_mid.json` (28), `wr_matchups_baron.json` (27), `wr_matchups_adc.json` (22)
  - Synergies: `wr_synergies_support.json` (26), `wr_synergies_mid.json` (28), `wr_synergies_baron.json` (27), `wr_synergies_adc.json` (22)
- **Components**:
  - `BuildView.tsx` — Main orchestrator card layout.
  - `ChampionAbilities.tsx` — Renders P/Q/W/E/R skills with type tags (Heal, CC, Shield).
  - `BuildOrder.tsx` — Renders purchase order list with AI explanations.
  - `GoldEfficiency.tsx` — Renders value bars comparing stats value to cost.
  - `StatsBlock.tsx` — Displays total AP, AD, HP, EHP, and Haste values.
- **API Routes**:
  - `/api/reasoning/route.ts` — 6-wave sequential cascade with Deep WHY Gate.
  - `/api/chat/route.ts` — Standard chat routing layer with Groq + OpenRouter.
- **Hooks/Utils**:
  - `build-engine.ts` — Pure JSON builds resolver (Route A).
  - `build-modifier.ts` — Dynamically swaps items based on intent (ap, tank, poke, etc.).
  - `relationship-engine.ts` — Direct lookup engine for synergies, matchups, counters.
  - `reasoning-enricher.ts` — Scans champion data and injects ability descriptions/tags.
  - `reasoning-validator.ts` — Completeness checker.
- **Pages**:
  - `/` (Home/Dashboard), `/tierlist` (Meta ranking list), `/draft` (Ban helper), `/builds` (Build details visualizer).
- **Config**:
  - `package.json` (Tailwind v4, React 19, Next 15), `tsconfig.json` (strict TS 5.8), `next.config.ts`.

### Data Schema Samples:

**wr_builds.json** (143 builds):
```json
{
  "champion_id": "aatrox",
  "build_name": "Anti-Burst Sustain",
  "archetype": "anti_burst",
  "rune_page": {
    "keystone": "conqueror",
    "primary_path": "precision",
    "primary_slot_1": "triumph",
    "primary_slot_2": "last_stand",
    "primary_slot_3": "legend_bloodline",
    "secondary_path": "resolve",
    "secondary_rune": "second_wind"
  },
  "spells": [
    "flash",
    "teleport"
  ],
  "items": [
    "mercurys_treads",
    "deaths_dance",
    "maw_of_malmortius",
    "serylda_grudge",
    "guardian_angel",
    "overlords_bloodmail"
  ],
  "item_order": [
    "deaths_dance",
    "mercurys_treads",
    "maw_of_malmortius",
    "serylda_grudge",
    "guardian_angel",
    "overlords_bloodmail"
  ],
  "situational": [
    "black_cleaver",
    "chempunk_chainsword"
  ],
  "math": {
    "total_ad": 220,
    "total_ap": 0,
    "total_hp": 4050,
    "total_armor": 178,
    "total_mr": 192,
    "total_ah": 50,
    "ehp_physical": 11250,
    "ehp_magic": 11826,
    "dps_estimate": 380,
    "gold_cost": 18500,
    "gold_efficiency": 1.35
  },
  "playstyle": "Anti-AP burst. Maw magic shield + DD bleed + Mercury Treads tenacity. Survive burst then out-sustain.",
  "power_curve": {
    "early": 0.4,
    "mid": 0.85,
    "late": 0.75
  }
}
```

**wr_runes.json** (53 runes):
```json
{
  "id": "electrocute",
  "name": "Electrocute",
  "category": "rune",
  "subcategory": "burst_keystone",
  "rune_type": "keystone",
  "path_independent": true,
  "tags": [
    "burst_keystone",
    "keystone",
    "mixed"
  ],
  "brief": "3 hits in 3s = burst damage.",
  "full": "Hitting an enemy champion with 3 separate attacks or abilities within 3 seconds deals 40-194 (+35% bonus AD)(+20% AP) bonus adaptive damage. Cooldown: 20-13s (scales with level). Best for: Burst assassins and mages (Zed, Akali, Fizz, Ahri, Lux). Procs on any combination of AAs and abilities.",
  "embedding_text": "Electrocute is a keystone rune in Wild Rift. 3 hits in 3s = burst damage. Hitting an enemy champion with 3 separate attacks or abilities within 3 seconds deals 40-194 (+35% bonus AD)(+20% AP) bonus adaptive damage. Cooldown: 20-13s (scales with level). Best for: Burst assassins and mages (Zed, Akali, Fizz, Ahri, Lux). Procs on any combination of AAs and abilities. Tags: keystone, burst_keystone.",
  "graph_node": {
    "node_type": "rune",
    "node_id": "rune:electrocute",
    "properties": {
      "rune_type": "keystone",
      "path_independent": true,
      "pick_rate": 0.18,
      "tier": "S"
    }
  },
  "graph_edges": [
    {
      "edge_type": "SYNERGIZES_WITH",
      "target_node_id": "champ:zed",
      "weight": 0.95,
      "context": "Zed W+E+Q procs Electrocute instantly for burst combo",
      "metadata": {
        "patch": "7.1d"
      }
    }
  ]
}
```

---

## ❸ Does npm run dev work right now?

### Health Check Results:
| Check | Result | Details |
|---|:---:|---|
| **npm install** | ✅ PASS | Installed 772 packages cleanly in 24 seconds. |
| **tsc --noEmit** | ✅ PASS | Compiled successfully with zero errors or warnings. |
| **npm run build** | ❌ FAIL | Fails due to Type error on `/settings` page during static export. |
| **npm run dev** | ✅ PASS | Starts successfully on `http://localhost:3001` (since port `3000` was busy). |

### What You See in the Browser:
- Visiting the dashboard (`localhost:3001/`) displays the full cinematically designed dashboard. It features grid cards styled with custom glassmorphism panels, drifting ambient backgrounds, hovering animations, and navigation tabs.
- Clicking **Tier List** displays meta rankings list.
- Clicking **Builds** visualizes builds by loading items and runes directly from the static DB with icons.
- Visiting **Settings** causes a client crash (`TypeError: Cannot read properties of undefined (reading 'map')`) due to accessing `strengths` badge loops.

---

## ❹ The Hallucination Problem — Real Examples

### Where Validation Lives:
1. Complete items check logic lives in: **[reasoning-validator.ts:L30-124](file:///C:/Users/63905/Downloads/ungasis/projects/riftcoach/src/lib/reasoning-validator.ts#L30-124)**.
2. The Deep WHY validation filter lives in: **[route.ts:L376-441](file:///C:/Users/63905/Downloads/ungasis/projects/riftcoach/src/app/api/reasoning/route.ts#L376-441)**.

### Current Validation Logic:
- `preBuildResponse()` creates a query template with placeholders like `[AI: why this item for Champion]`, embedding DB stats and champion ability descriptors directly.
- The route cascade queries the AI. The received output runs through:
  - **Completeness Validation**: Checks if all items, runes, and spells from the DB have an entry in the AI response.
  - **Deep WHY Quality Gate**: Rejects the response if it has generic fluff. Checks that each pro, con, and item description contains at least one named ability, ability letter, or numeric value.
- **Where it falls short**:
  - Checks are strictly regex and token matching. The validator verifies that a number is present, but doesn't check if the number is correct. For example, if the AI says that `Death's Dance` grants 400 Armor, the validator accepts it since "+400" is a number.

### Example of AI Output vs Ground Truth:
- **What the AI might say**:
  > "Build Death's Dance because the 45% Grievous Wounds passive helps mitigate Mundo's health regeneration, and the +100 Armor helps survive AD burst."
- **What wr_builds.json actually contains**:
  > Items: `Deaths Dance`. True stats are `+35 AD` and `+40 Armor` (not 100 Armor). Grievous Wounds is NOT on `Death's Dance` (it belongs to `Mortal Reminder` or `Thornmail`).
- **Why it hallucinates**:
  - LLMs often confuse similar items or mix LoL PC passive rules with Wild Rift mobile stats. While database injection solves most of this by placing raw stats in the system prompt, smaller models (8B) still bleed knowledge or fail to associate passives correctly unless strictly bound.

### Current Validator Findings:
- The validator successfully blocks AI responses that miss items or provide generic filler (like "build this item because it gives good stats").
- However, the validator does NOT perform semantic calculations to verify that the stat values or passive descriptions match the raw DB stats. It only checks for keyword presence.

---

## ❺ Scope — Phase 5.7 Boundaries

Based on the code audit, here's my recommended scope:

### Phase 5.7 (Deep WHY Layer) — DO THIS NOW:
1. **Settings Page Fix**: Fix settings rendering by replacing line 104 with optional chaining `(m as any).strengths?.map(...)` or adding `strengths: []` to all elements of `FREE_MODELS` in `smart-router.ts`.
2. **Deep WHY Gate Enhancement**: Update `isGroundedLine` to reject values that contradict raw DB stats, ensuring numbers match the DB values.
3. **Synergy / Matchup Grounding**: Update `synergyRationale` and `matchupRationale` to strictly cross-reference raw ability tags from the relationship engine.
*Estimated effort:* **3 hours**

### Phase 6.0+ (Build Lab / Theorycraft) — DO LATER:
- Real-time stat calculator with level slider 1-15.
- Gold efficiency calculations based on dynamic level stats.
- Power curve comparisons for alternative builds.

### Phase 7.0+ (JARVIS Coach) — DO MUCH LATER:
- Proactive voice/chat coaching based on screen screenshots.
- In-game overlay integration for live counters.

### Recommendation: HYBRID (MOVE + RETAIN)
Based on the audit, the current code is **extremely clean, robust, and compiles with zero errors** (except for the settings mapping bug). A total rewrite or "scaffold fresh" would discard a working, highly advanced 6-wave provider cascade and build-modification engine. 

**Specific evidence**:
- [build-engine.ts](file:///C:/Users/63905/Downloads/ungasis/projects/riftcoach/src/lib/build-engine.ts) is properly modularized.
- [reasoning-enricher.ts](file:///C:/Users/63905/Downloads/ungasis/projects/riftcoach/src/lib/reasoning-enricher.ts) already correctly implements Wild Rift ability classification.
- We should retain the current codebase, apply a surgical fix to [settings/page.tsx](file:///C:/Users/63905/Downloads/ungasis/projects/riftcoach/src/app/settings/page.tsx), and proceed with Phase 5.7 directly on top of it.

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
