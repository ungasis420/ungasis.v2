# Wild Rift Data Pipeline — wr_extractor v3

A robust Python-based scraping pipeline to automatically extract items, runes, summoner spells, champions, and patch notes from multiple sources, validating the data against schemas and deploying it as a drop-in database replacement in the RiftCoach Next.js application.

## 🏗️ Architecture Overview

The pipeline extracts data from verified community sites and Riot public endpoints, validating against predefined dataclass schemas and saving intermediate results to the `output/` directory.

| Component | File Path | Source URL / Target | Purpose |
|---|---|---|---|
| **CLI Entry** | [scraper.py](file:///c:/Users/63905/Downloads/ungasis/projects/riftcoach/wr_extractor_v3/scraper.py) | CLI Interface | Main coordinator wrapper |
| **Items Scraper** | [sources/wr_meta_items.py](file:///c:/Users/63905/Downloads/ungasis/projects/riftcoach/wr_extractor_v3/sources/wr_meta_items.py) | `wr-meta.com/items/` | Parses item stats, costs, and passives |
| **Rune Scraper** | [sources/wrf_runes.py](file:///c:/Users/63905/Downloads/ungasis/projects/riftcoach/wr_extractor_v3/sources/wrf_runes.py) | `wildriftfire.com/rune-list` | Scrapes 53 runes, paths, and tiers |
| **Spells Scraper** | [sources/wr_meta_spells.py](file:///c:/Users/63905/Downloads/ungasis/projects/riftcoach/wr_extractor_v3/sources/wr_meta_spells.py) | `wr-meta.com/items/` (spells) | Scrapes summoner spells and cooldowns |
| **Champion Scraper** | [sources/riot_champions.py](file:///c:/Users/63905/Downloads/ungasis/projects/riftcoach/wr_extractor_v3/sources/riot_champions.py) | Riot Next.js endpoints | Fetches abilities, roles, and difficulty |
| **Meta Scraper** | [sources/wrstats_meta.py](file:///c:/Users/63905/Downloads/ungasis/projects/riftcoach/wr_extractor_v3/sources/wrstats_meta.py) | `wrstats.online` | Live win/pick/ban rates and tier lists |
| **Patch Scraper** | [sources/wrf_patch.py](file:///c:/Users/63905/Downloads/ungasis/projects/riftcoach/wr_extractor_v3/sources/wrf_patch.py) | `wildriftfire.com/patch-notes` | Scrapes latest champion balance updates |
| **Cache Utility** | [utils/cache.py](file:///c:/Users/63905/Downloads/ungasis/projects/riftcoach/wr_extractor_v3/utils/cache.py) | `.cache_v3/` | File-based HTTP cache (24h TTL) |
| **Diff Engine** | [utils/diff.py](file:///c:/Users/63905/Downloads/ungasis/projects/riftcoach/wr_extractor_v3/utils/diff.py) | Output diffing | Generates detailed data changelogs |
| **Deploy Tool** | [deploy.py](file:///c:/Users/63905/Downloads/ungasis/projects/riftcoach/wr_extractor_v3/deploy.py) | `public/data/` | Backs up assets and merges changes |

---

## ⚡ Setup & Execution

### 1. Install Dependencies
Run the command below in this directory to install standard dependencies:
```bash
pip install -r requirements.txt
```

### 2. Run the Scrapers
Execute the main scraper script specifying a target or running the full pipeline:
```bash
# Run all scrapers, validate outputs, and calculate differences
python scraper.py all

# Run specific scrapers individually
python scraper.py items
python scraper.py runes
python scraper.py spells
python scraper.py champions
python scraper.py meta
python scraper.py patch
```

### 3. Deploy Assets
Run the deployment script to back up the active database files and copy/merge fresh data into the `public/data/` folder:
```bash
python deploy.py
```

---

## 🛡️ Validation Quality Gates

All scraped data must pass strict structural validation checks before saving:
- **Items**: Count $\ge 100$, containing valid IDs, names, categories, and costs.
- **Runes**: Count must be exactly 53.
- **Spells**: Count $\ge 9$, containing valid IDs and cooldowns.
- **Champions**: Count $\ge 138$, verifying complete ability sets (Passive, Q, W, E, R).

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
