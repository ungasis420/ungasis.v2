import os
import shutil
import json
import time
from typing import Dict, Any, List

PUBLIC_DATA_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "data")
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "output")
BACKUP_DIR = os.path.join(PUBLIC_DATA_DIR, ".backup")

def backup_file(filepath: str) -> None:
    """Create a timestamped backup of the specified file."""
    if not os.path.exists(filepath):
        return
    os.makedirs(BACKUP_DIR, exist_ok=True)
    filename = os.path.basename(filepath)
    ts = int(time.time())
    dest = os.path.join(BACKUP_DIR, f"{filename}.{ts}.bak")
    shutil.copy2(filepath, dest)
    print(f"Backed up: {filename} -> {os.path.basename(dest)}")

def merge_champion_parts(scraped_champs_path: str) -> None:
    """Surgically merge scraped champion data into wr_champions_part1/2/3.json files."""
    if not os.path.exists(scraped_champs_path):
        print("No scraped champions file found to merge.")
        return
        
    with open(scraped_champs_path, "r", encoding="utf-8") as f:
        scraped_list = json.load(f)
    scraped_map = {c["id"]: c for c in scraped_list}
    
    parts = ["wr_champions_part1.json", "wr_champions_part2.json", "wr_champions_part3.json"]
    for part in parts:
        part_path = os.path.join(PUBLIC_DATA_DIR, part)
        if not os.path.exists(part_path):
            continue
            
        backup_file(part_path)
        with open(part_path, "r", encoding="utf-8") as f:
            data = json.load(f)
            
        champs = data.get("champions", [])
        updated_count = 0
        for champ in champs:
            cid = champ.get("id")
            if cid in scraped_map:
                new_data = scraped_map[cid]
                # Update difficulty
                champ["difficulty"] = {1: "easy", 2: "medium", 3: "hard"}.get(new_data["difficulty"], "medium")
                
                # Update abilities
                abilities = champ.get("abilities", {})
                new_abilities = new_data.get("abilities", {})
                for slot in ["passive", "q", "w", "e", "r"]:
                    if slot in abilities and slot in new_abilities:
                        abilities[slot]["name"] = new_abilities[slot]["name"]
                        abilities[slot]["full"] = new_abilities[slot]["description"]
                        
                # Update stats inside 'realtime'
                realtime = champ.get("realtime", {})
                new_stats = new_data.get("stats", {})
                realtime["win_rate"] = new_stats.get("win_rate", realtime.get("win_rate", 0.50))
                realtime["pick_rate"] = new_stats.get("pick_rate", realtime.get("pick_rate", 0.05))
                realtime["ban_rate"] = new_stats.get("ban_rate", realtime.get("ban_rate", 0.01))
                realtime["patch"] = "7.1f"
                
                # Append to patch history if different
                history = realtime.get("patch_history", [])
                if not history or history[-1].get("patch") != "7.1f":
                    history.append({
                        "patch": "7.1f",
                        "win_rate": realtime["win_rate"],
                        "pick_rate": realtime["pick_rate"],
                        "change": "unchanged"
                    })
                realtime["patch_history"] = history
                
                # Update graph_node properties
                gn = champ.get("graph_node", {})
                props = gn.get("properties", {})
                props["win_rate"] = realtime["win_rate"]
                props["pick_rate"] = realtime["pick_rate"]
                props["ban_rate"] = realtime["ban_rate"]
                props["patch"] = "7.1f"
                
                updated_count += 1
                
        # Update patch version in meta header
        if "meta" in data:
            data["meta"]["patch"] = "7.1f"
            
        with open(part_path, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print(f"Surgically merged {updated_count} champions into {part}.")

def deploy() -> None:
    """Deploy all scraped files to public/data/ folder after backing up old ones."""
    files_to_deploy = ["wr_items.json", "wr_runes.json", "wr_spells.json", "wr_meta.json", "wr_patch.json"]
    
    # 1. Standard file copies
    for filename in files_to_deploy:
        src = os.path.join(OUTPUT_DIR, filename)
        if not os.path.exists(src):
            print(f"File not found in output: {filename}. Skipping standard deploy.")
            continue
            
        dest = os.path.join(PUBLIC_DATA_DIR, filename)
        backup_file(dest)
        shutil.copy2(src, dest)
        print(f"Deployed: {filename} -> public/data/")
        
    # 2. Merge champions part files
    scraped_champs = os.path.join(OUTPUT_DIR, "wr_champions.json")
    merge_champion_parts(scraped_champs)
    print("Deployment completed successfully!")

if __name__ == "__main__":
    deploy()

# Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
