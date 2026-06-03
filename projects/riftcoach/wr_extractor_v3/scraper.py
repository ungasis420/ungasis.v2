import os
import sys
import json
from datetime import datetime
from typing import List, Dict, Any, Tuple

# Set up module search path
sys.path.insert(0, os.path.dirname(__file__))

from sources.wr_meta_items import scrape_items
from sources.wrf_runes import scrape_runes
from sources.wr_meta_spells import scrape_spells
from sources.riot_champions import scrape_champions
from sources.wrstats_meta import scrape_meta
from sources.wrf_patch import scrape_patch
from utils.diff import generate_changelog
from utils.id_reconciler import reconcile_items

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "output")
CHANGELOG_PATH = os.path.join(os.path.dirname(__file__), "CHANGELOG.md")

def save_output(data: Any, filename: str) -> None:
    """Save parsed structure as a formatted JSON file in output directory."""
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    path = os.path.join(OUTPUT_DIR, filename)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"Saved: {filename} ({len(data) if isinstance(data, list) else 1} records)")

def run_items() -> bool:
    print("\n--- Scraping Items (wr-meta.com) ---")
    items = scrape_items()
    print("Reconciling item IDs...")
    base_dir = os.path.dirname(__file__)
    items = reconcile_items(items, base_dir)
    save_output(items, "wr_items.json")
    valid = len(items) >= 100
    print(f"Validation: {'PASS' if valid else 'FAIL'} (Found {len(items)} items, target: >=100)")
    return valid

def run_runes() -> bool:
    print("\n--- Scraping Runes (wildriftfire.com) ---")
    runes = scrape_runes()
    save_output(runes, "wr_runes.json")
    valid = len(runes) == 53
    print(f"Validation: {'PASS' if valid else 'FAIL'} (Found {len(runes)} runes, target: 53)")
    return valid

def run_spells() -> bool:
    print("\n--- Scraping Spells (wr-meta.com) ---")
    spells = scrape_spells()
    save_output(spells, "wr_spells.json")
    valid = len(spells) >= 9
    print(f"Validation: {'PASS' if valid else 'FAIL'} (Found {len(spells)} spells, target: >=9)")
    return valid

def run_champions() -> bool:
    print("\n--- Scraping Champions (Riot public endpoints + wrstats.online) ---")
    champions = scrape_champions()
    save_output(champions, "wr_champions.json")
    valid = len(champions) >= 138
    print(f"Validation: {'PASS' if valid else 'FAIL'} (Found {len(champions)} champions, target: >=138)")
    return valid

def run_meta() -> bool:
    print("\n--- Scraping Meta Stats (wrstats.online) ---")
    meta_info = scrape_meta()
    if meta_info:
        # Save meta snapshot file
        save_output({
            "meta": meta_info["meta"],
            "tier_list": meta_info["tier_list"]
        }, "wr_meta.json")
    valid = bool(meta_info)
    print(f"Validation: {'PASS' if valid else 'FAIL'} (Tier list generated)")
    return valid

def run_patch() -> bool:
    print("\n--- Scraping Patch Notes (wildriftfire.com) ---")
    patch_info = scrape_patch()
    if patch_info:
        save_output(patch_info, "wr_patch.json")
    valid = bool(patch_info)
    print(f"Validation: {'PASS' if valid else 'FAIL'} (Patch notes generated)")
    return valid

def update_changelog(diff_report: str) -> None:
    """Append a timestamped run update to CHANGELOG.md."""
    ts = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S UTC")
    changelog_entry = (
        f"## Scrape Run — {ts}\n\n"
        f"{diff_report}\n\n"
        f"---\n"
    )
    
    # Read existing content if it exists
    existing = ""
    if os.path.exists(CHANGELOG_PATH):
        try:
            with open(CHANGELOG_PATH, "r", encoding="utf-8") as f:
                existing = f.read()
        except Exception:
            pass
            
    with open(CHANGELOG_PATH, "w", encoding="utf-8") as f:
        f.write(changelog_entry + existing)
    print("CHANGELOG.md updated successfully.")

def main() -> None:
    args = sys.argv[1:]
    target = args[0] if args else "all"
    
    targets = {
        "items": run_items,
        "runes": run_runes,
        "spells": run_spells,
        "champions": run_champions,
        "meta": run_meta,
        "patch": run_patch
    }
    
    if target == "all":
        success = True
        for t_name, run_func in targets.items():
            try:
                if not run_func():
                    success = False
            except Exception as e:
                print(f"Error running {t_name}: {e}")
                success = False
                
        # Generate diff report and update changelog
        print("\n--- Running Diff Engine ---")
        diff_report = generate_changelog()
        try:
            print(diff_report)
        except UnicodeEncodeError:
            encoding = sys.stdout.encoding or 'ascii'
            print(diff_report.encode(encoding, errors='replace').decode(encoding))
        update_changelog(diff_report)
        
        print("\n--- Scraper Run Completed ---")
        sys.exit(0 if success else 1)
        
    elif target in targets:
        try:
            ok = targets[target]()
            sys.exit(0 if ok else 1)
        except Exception as e:
            print(f"Error running target {target}: {e}")
            sys.exit(1)
    else:
        print(f"Unknown target: '{target}'. Supported: {', '.join(targets.keys())} or 'all'")
        sys.exit(1)

if __name__ == "__main__":
    main()

# Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
