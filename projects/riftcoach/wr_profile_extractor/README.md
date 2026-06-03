# WR Wiki Profile Extractor v3.0

Downloads champion profile videos (.mp4) and images from the official
[Wild Rift Wiki](https://wiki.leagueoflegends.com/en-us/WR:Champion).

Also extracts **base stats** (HP, Mana, AD, Armor, MR, etc.) for all 137 champions
and saves them as `public/data/champion_stats.json` — needed for the Build Lab math engine.

## Quick Start

### Option 1: Download ALL 137 champions
Double-click: `run_extractor.bat`

### Option 2: Download YOUR pool only (fast test)
Double-click: `run_my_pool.bat`
Downloads: Karma, Swain, Nautilus, Senna, Seraphine, Soraka, Milio

### Option 3: Stats only (no media, fastest)
Double-click: `run_stats_only.bat`

## Command Line Options

```bash
# All champions, skip already downloaded
python wr_profile_extractor/extract_profiles.py --skip-existing

# Specific champions
python wr_profile_extractor/extract_profiles.py --champions karma,nautilus,swain

# Faster requests (risky, might get rate-limited)
python wr_profile_extractor/extract_profiles.py --delay 0.8

# Stats only (no media download)
python wr_profile_extractor/extract_profiles.py --stats-only
```

## Output

```
public/
├── images/champions/profiles/
│   ├── karma.mp4          (or .png if no video available)
│   ├── nautilus.mp4
│   ├── swain.png
│   └── ...
└── data/
    └── champion_stats.json   (base stats for Build Lab)
```

## Requirements
- Python 3.8+ (already installed if you set up the project)
- No extra packages needed (uses only Python standard library)

## Notes
- Respects wiki servers with 1.5s delay between requests
- Some older champions may not have profile videos (falls back to images)
- Stats extraction uses regex patterns — may need updates if wiki format changes
- File naming matches your `champions.json` ID field for easy integration
