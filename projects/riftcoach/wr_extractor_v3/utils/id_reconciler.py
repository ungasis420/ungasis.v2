import json
import os
import re

def normalize_name(name):
    if not name:
        return ""
    name = name.lower()
    name = name.replace("'", "")
    name = name.replace(" ", "")
    return name

def load_json(filepath):
    if not os.path.exists(filepath):
        return {}
    with open(filepath, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_build_item_ids(builds_data):
    item_ids = set()
    if 'builds' in builds_data:
        for build in builds_data['builds']:
            for item in build.get('items', []):
                item_ids.add(item)
            for item in build.get('item_order', []):
                item_ids.add(item)
            for item in build.get('situational', []):
                item_ids.add(item)
    return item_ids

def reconcile_items(scraped_items, base_dir):
    # Paths
    builds_path = os.path.join(base_dir, '..', 'public', 'data', 'wr_builds.json')
    canonical_items_path = os.path.join(base_dir, '..', 'public', 'data', 'items.json')
    aliases_path = os.path.join(base_dir, 'utils', 'item_aliases.json')
    
    # Load data
    builds_data = load_json(builds_path)
    canonical_items = load_json(canonical_items_path)
    aliases = load_json(aliases_path)
    
    build_item_ids = extract_build_item_ids(builds_data)
    
    canonical_id_set = set()
    name_to_canonical_id = {}
    
    canonical_items_list = canonical_items.get('items', []) if isinstance(canonical_items, dict) else canonical_items
    for item_data in canonical_items_list:
        item_id = item_data.get('id', '')
        if not item_id:
            continue
        canonical_id_set.add(item_id)
        name = item_data.get('name', '')
        if name:
            name_to_canonical_id[normalize_name(name)] = item_id

    reconciled_items = []
    
    for scraped_data in scraped_items:
        scraped_id = scraped_data.get('id', '')
        name = scraped_data.get('name', '')
        norm_name = normalize_name(name)
        
        # 1. Check alias map first
        if scraped_id in aliases:
            final_id = aliases[scraped_id]
        elif norm_name in aliases:
            final_id = aliases[norm_name]
        # 2. Try exact ID match
        elif scraped_id in canonical_id_set:
            final_id = scraped_id
        # 3. Try name-based match
        elif norm_name in name_to_canonical_id:
            final_id = name_to_canonical_id[norm_name]
        # 4. No match
        else:
            final_id = scraped_id
            
        scraped_data['id'] = final_id
        reconciled_items.append(scraped_data)
        
    # Verification
    reconciled_id_set = {item['id'] for item in reconciled_items}
    missing_ids = build_item_ids - reconciled_id_set
    
    if missing_ids:
        print(f"Checking fallbacks for missing build items: {missing_ids}")
        for missing_id in missing_ids:
            canonical_item = next((item for item in canonical_items_list if item.get("id") == missing_id), None)
            if canonical_item:
                stats_val = canonical_item.get("stats", [])
                if isinstance(stats_val, list):
                    stats_dict = {}
                    for stat in stats_val:
                        stat = stat.replace("+", "").replace("%", "").strip()
                        match = re.match(r"^([\d\-\.]+)\s+(.*)$", stat)
                        if match:
                            val_str, name = match.groups()
                            val = float(val_str) if "." in val_str else int(val_str)
                            name = name.lower().strip()
                            if "attack damage" in name or name == "ad":
                                stats_dict["attack_damage"] = val
                            elif "ability power" in name or name == "ap":
                                stats_dict["ability_power"] = val
                            elif "health" in name or name == "hp":
                                stats_dict["max_health"] = val
                            elif "armor" in name:
                                stats_dict["armor"] = val
                            elif "magic resistance" in name or "magic resist" in name or name == "mres":
                                stats_dict["magic_resistance"] = val
                            elif "ability haste" in name or name == "cdr":
                                stats_dict["ability_haste"] = val
                            elif "attack speed" in name or name == "as":
                                stats_dict["attack_speed"] = val
                            elif "critical rate" in name or "crit" in name:
                                stats_dict["critical_rate"] = val
                            elif "armor penetration" in name or "armor pen" in name or name == "armp":
                                stats_dict["armor_penetration"] = val
                            elif "magic penetration" in name or "magic pen" in name or name == "mpen":
                                stats_dict["magic_penetration"] = val
                            elif "mana" in name:
                                stats_dict["max_mana"] = val
                            elif "move speed" in name or "movement speed" in name or name == "ms":
                                stats_dict["move_speed"] = val
                            else:
                                clean_key = re.sub(r"[^a-z0-9_]", "", name.replace(" ", "_"))
                                stats_dict[clean_key] = val
                else:
                    stats_dict = stats_val
                
                fallback_item = {
                    "id": canonical_item.get("id"),
                    "name": canonical_item.get("name"),
                    "category": canonical_item.get("category", "physical").lower(),
                    "stats": stats_dict,
                    "passive": canonical_item.get("passive", ""),
                    "cost": canonical_item.get("cost", 0),
                    "tips": canonical_item.get("tips", ""),
                    "source": "canonical_fallback",
                    "patch": "7.1f",
                    "scraped_at": "2026-06-03T17:00:00Z"
                }
                reconciled_items.append(fallback_item)
                print(f"Fallback added for: {missing_id}")
            else:
                print(f"WARNING: Missing item '{missing_id}' not found in canonical items database.")

    # Re-calculate reconciled sets after fallback
    reconciled_id_set = {item['id'] for item in reconciled_items}
    missing_ids = build_item_ids - reconciled_id_set
    
    matched_count = len(build_item_ids) - len(missing_ids)
    print(f"{matched_count}/{len(build_item_ids)} build item IDs matched.")
    if missing_ids:
        print(f"CRITICAL: {len(missing_ids)} unmatched IDs: {list(missing_ids)}")
    else:
        print("0 unmatched item IDs. 100% match!")
        
    return reconciled_items
