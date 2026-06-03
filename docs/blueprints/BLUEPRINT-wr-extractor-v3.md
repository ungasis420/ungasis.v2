# BLUEPRINT-wr-extractor-v3.md — Wild Rift Data Pipeline v3.0

## 1. EXECUTIVE SUMMARY

| Metric | Value |
|---|---|
| **Goal** | Automatically scrape fresh game data (items, runes, spells, champions, tiers, patches) to anchor RiftCoach reasoning to real-time stats |
| **Type** | Python-based Web Scraper & Data Pipeline |
| **Project** | RiftCoach (`projects/riftcoach/wr_extractor_v3/`) |
| **Total Files** | ~18 (scrapers, schemas, utils, main CLI, tests, docs) |
| **Model Priority**| Gemini 3.5 Flash |
| **Risk Level** | Medium (external web changes might break parsers) |

---

## 2. RESEARCH FINDINGS

### Target Sources & Scraping Strategy

| Source | Target URL | Extraction Method | Purpose |
|---|---|---|---|
| **wr-meta.com** | `https://wr-meta.com/items/` | BeautifulSoup4 HTML Parser | Items, spells, stats, costs |
| **wildriftfire.com** | `https://www.wildriftfire.com/rune-list` | BeautifulSoup4 HTML Parser | 53 runes, paths, tiers |
| **Riot Official** | `https://wildrift.leagueoflegends.com/en-us/champions/` | Public JSON endpoints / HTML parsing | 138 champions, abilities |
| **wrstats.online** | `https://wrstats.online/` | API / HTML parsing | Live win/pick/ban rates |
| **wildriftfire.com** | `https://www.wildriftfire.com/patch-notes` | BeautifulSoup4 HTML Parser | Current patch changes |

### Precedents
- `wr_extractor/wr_extractor_v2.py`: Scrapes wiki pages based on text URL list. Slow and hardcoded to Wiki structures.
- Cache mechanism: File-based local cache saves fetched HTML and JSON locally to prevent duplicate requests and speed up execution.

### Patterns
- **User-Agent Policy**: Always use `RiftCoach-DataPipeline/3.0 (educational project)` to ensure compliance and avoid blocking.
- **Delay Loop**: Implement a strict 1-2 second delay between HTTP requests to respect target web servers.
- **Type Safety**: Use Python 3.10+ type hints on all function definitions.
- **Max File Length**: Keep python modules under 200 lines to preserve readability and modularity.

### Gotchas
- **Dynamic Content**: Some targets might load data via client-side JavaScript. Fallback to scraping clean API endpoints or parsing embedded JSON strings when possible.
- **Name/ID Normalization**: Champion and item names must normalize to exact `snake_case` IDs (e.g. `Death's Dance` -> `deaths_dance`) to map correctly inside RiftCoach's schemas.

---

## 3. ARCHITECTURE

### Folder Structure
```
projects/riftcoach/wr_extractor_v3/
├── scraper.py              # Main CLI entry point
├── requirements.txt        # PIP dependencies (requests, beautifulsoup4, lxml)
├── README.md               # Pipeline documentation & setup guide
├── CHANGELOG.md            # Auto-generated: changelog tracking data diffs
├── .cache_v3/              # Local HTTP response cache directory (24h TTL)
├── output/                 # Destination folder for scraped JSON files
├── schemas/
│   ├── item_schema.py      # Dataclasses/Validators matching RiftCoach typescript interfaces
│   ├── rune_schema.py      
│   ├── champion_schema.py  
│   └── spell_schema.py     
├── sources/
│   ├── wr_meta_items.py    # Scraper for wr-meta.com/items/
│   ├── wr_meta_runes.py    # Scraper for wr-meta.com runes
│   ├── wrf_runes.py        # Scraper for wildriftfire.com/rune-list
│   ├── wrf_patch.py        # Scraper for wildriftfire.com/patch-notes
│   ├── riot_champions.py   # Scraper for Riot public champion endpoints
│   └── wrstats_meta.py     # Scraper for wrstats.online stats
└── utils/
    ├── cache.py            # Local cache manager with 24h TTL
    ├── diff.py             # Diff engine between public/data and new output
    └── validator.py        # Pydantic or dataclass validator wrapper
```

### Component Data Flow
1. **CLI Trigger**: User runs `python scraper.py all` or target sub-scrapers.
2. **Cache Check**: Scrapers request URLs through `utils.cache`. If cached and under 24h old, retrieve local HTML/JSON; else request from web and cache.
3. **Data Parse**: BeautifulSoup parses requested page templates, extracting names, statistics, passives, and structures.
4. **Validation**: Parsed objects pass through schemas in `schemas/` and are validated by `utils.validator` to verify required keys (IDs, cost, stats, types).
5. **Output**: Validated arrays are saved to `output/` folder.
6. **Diff & Log**: `utils.diff` compares existing files in `public/data/` with the new data in `output/` and generates a list of balance changes inside `CHANGELOG.md`.

---

## 4. TASK BREAKDOWN

| ID | Task Description | File(s) | Dependencies | Sprint |
|---|---|---|---|---|
| T1-01 | Setup project directory, `requirements.txt`, and `README.md` | `wr_extractor_v3/requirements.txt`, `wr_extractor_v3/README.md` | None | Sprint 1 |
| T1-02 | Build cache manager and main CLI scraper interface | `wr_extractor_v3/utils/cache.py`, `wr_extractor_v3/scraper.py` | T1-01 | Sprint 1 |
| T1-03 | Write schema structures matching typescript interfaces | `wr_extractor_v3/schemas/*`, `wr_extractor_v3/utils/validator.py` | T1-01 | Sprint 1 |
| T1-04 | Implement item extractor for `wr-meta.com/items/` | `wr_extractor_v3/sources/wr_meta_items.py` | T1-02, T1-03 | Sprint 2 |
| T1-05 | Implement rune extractor for `wildriftfire.com/rune-list` | `wr_extractor_v3/sources/wrf_runes.py` | T1-02, T1-03 | Sprint 2 |
| T1-06 | Implement spell extractor for summoner spells | `wr_extractor_v3/sources/wr_meta_spells.py` | T1-02, T1-03 | Sprint 2 |
| T1-07 | Implement champion scraper merging Riot and wrstats | `wr_extractor_v3/sources/riot_champions.py`, `sources/wrstats_meta.py` | T1-02, T1-03 | Sprint 3 |
| T1-08 | Implement patch note scraper for balance logs | `wr_extractor_v3/sources/wrf_patch.py` | T1-02, T1-03 | Sprint 3 |
| T1-09 | Create data diff engine and deploy utility script | `wr_extractor_v3/utils/diff.py`, script files | T1-02 | Sprint 4 |
| T1-10 | Integration testing, validation, and full execution run | None | All tasks | Sprint 4 |

---

## 5. SPRINT PLAN

### Sprint 1: Pipeline Skeleton & Cache Setup
- Establish directory paths, configure cache with 24h TTL, setup schema validator classes.
- Target files: `requirements.txt`, `scraper.py`, `utils/cache.py`, `utils/validator.py`, `schemas/*.py`, `README.md`.

### Sprint 2: Core Items, Runes, and Spells Extractor
- Build HTML parsers for items, runes, and summoner spells.
- Target files: `sources/wr_meta_items.py`, `sources/wrf_runes.py`, `sources/wr_meta_spells.py`.

### Sprint 3: Champions, Meta Stats, and Patches
- Scraping Riot public JSON endpoints, gathering stats from wrstats, parsing patch notes.
- Target files: `sources/riot_champions.py`, `sources/wrstats_meta.py`, `sources/wrf_patch.py`.

### Sprint 4: Diff Engine, Deploy Script, and Validation
- Build validation tests to check output counts, run the diff engine to review updates, and deploy changes to `public/data/`.
- Target files: `utils/diff.py`, `deploy.py`, test validations.

---

## 6. ACCEPTANCE CRITERIA

- [ ] All output JSON files are validated and syntactically correct.
- [ ] Item count is $\ge 100$.
- [ ] Rune count is exactly 53.
- [ ] Champion count is $\ge 138$.
- [ ] Spell count is $\ge 9$.
- [ ] All IDs are standardized to `snake_case` (e.g. `deaths_dance`).
- [ ] Cache operates properly to prevent repeated network requests on the same files.
- [ ] README.md contains detailed execution instructions and setup guides.
- [ ] Standardized footers added to all documentation files.

---

## 7. RISK ASSESSMENT

| Risk | Impact | Likelihood | Mitigation |
|---|---|---|---|
| Scraper blocked by target website | High | Medium | Custom User-Agent header, 1-2 second delays, local caching |
| Layout changes on community websites | High | Low | Graceful fallback parsing, debug messages, element assertions |
| Type mismatch during data injection | Medium | Low | Schema validation stage checks all items before saving |

---

## 8. KICKOFF PROMPT FOR BUILDER

Activate the Builder agent to construct `wr_extractor_v3` inside `projects/riftcoach/`. Proceed sprint by sprint, utilizing the self-healing build loop, verifying each phase with Quality Auditor, and re-indexing the knowledge graph on sprint completions.

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
