import os
import json
from typing import Dict, Any, List, Tuple

PUBLIC_DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "..", "public", "data")
OUTPUT_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "output")

def load_json_safe(path: str) -> Any:
    """Load JSON from path, returning empty dict/list if not exists or invalid."""
    if not os.path.exists(path):
        return None
    try:
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return None

def get_base_data(filename: str) -> Any:
    """Resolve active database file path (tries specific output name first, then fallback base names)."""
    p1 = os.path.join(PUBLIC_DATA_DIR, filename)
    if os.path.exists(p1):
        return load_json_safe(p1)
        
    # Fallback mappings for base data comparison
    fallbacks = {
        "wr_items.json": "items.json",
        "wr_runes.json": "runes.json",
        "wr_spells.json": "spells.json",
        "wr_champions.json": "champions.json"
    }
    fb = fallbacks.get(filename)
    if fb:
        p2 = os.path.join(PUBLIC_DATA_DIR, fb)
        return load_json_safe(p2)
    return None

def normalize_to_dict(data: Any, key: str = "id") -> Dict[str, Any]:
    """Helper to convert list or dict structures into a keyed dictionary."""
    if not data:
        return {}
    if isinstance(data, dict):
        # If it has a top-level array key e.g. "items": [...]
        for k in ["items", "runes", "spells", "champions", "changes"]:
            if k in data and isinstance(data[k], list):
                return {item.get(key, ""): item for item in data[k] if item.get(key)}
        return data
    if isinstance(data, list):
        return {item.get(key, ""): item for item in data if item.get(key)}
    return {}

def diff_items() -> List[str]:
    """Find differences in items."""
    old_raw = get_base_data("wr_items.json")
    new_raw = load_json_safe(os.path.join(OUTPUT_DIR, "wr_items.json"))
    
    old_dict = normalize_to_dict(old_raw)
    new_dict = normalize_to_dict(new_raw)
    
    changes = []
    for item_id, new_item in new_dict.items():
        if item_id not in old_dict:
            changes.append(f"Added item: {new_item['name']} ({new_item['cost']}g)")
            continue
            
        old_item = old_dict[item_id]
        name = new_item["name"]
        
        # Check cost
        old_cost = old_item.get("cost") or old_item.get("wr_cost") or old_item.get("total_cost") or 0
        if new_item["cost"] != old_cost:
            changes.append(f"Item '{name}' cost changed: {old_cost}g → {new_item['cost']}g")
            
        # Check category
        if new_item["category"] != old_item.get("category"):
            changes.append(f"Item '{name}' category changed: {old_item.get('category')} → {new_item['category']}")
            
    return changes

def diff_runes() -> List[str]:
    """Find differences in runes."""
    old_raw = get_base_data("wr_runes.json")
    new_raw = load_json_safe(os.path.join(OUTPUT_DIR, "wr_runes.json"))
    
    old_dict = normalize_to_dict(old_raw)
    new_dict = normalize_to_dict(new_raw)
    
    changes = []
    for rune_id, new_rune in new_dict.items():
        if rune_id not in old_dict:
            changes.append(f"Added rune: {new_rune['name']} ({new_rune['rune_type']})")
            continue
            
        old_rune = old_dict[rune_id]
        name = new_rune["name"]
        
        if new_rune.get("tier") != old_rune.get("tier"):
            changes.append(f"Rune '{name}' tier changed: {old_rune.get('tier')} → {new_rune.get('tier')}")
            
    return changes

def diff_spells() -> List[str]:
    """Find differences in summoner spells."""
    old_raw = get_base_data("wr_spells.json")
    new_raw = load_json_safe(os.path.join(OUTPUT_DIR, "wr_spells.json"))
    
    old_dict = normalize_to_dict(old_raw)
    new_dict = normalize_to_dict(new_raw)
    
    changes = []
    for spell_id, new_spell in new_dict.items():
        if spell_id not in old_dict:
            changes.append(f"Added spell: {new_spell['name']}")
            continue
            
        old_spell = old_dict[spell_id]
        name = new_spell["name"]
        
        old_cd = old_spell.get("cooldown") or 0
        if new_spell["cooldown"] != old_cd:
            changes.append(f"Spell '{name}' cooldown changed: {old_cd}s → {new_spell['cooldown']}s")
            
    return changes

def diff_champions() -> List[str]:
    """Find differences in champion stats."""
    old_raw = get_base_data("wr_champions.json")
    # If not found, try parts
    if not old_raw:
        old_raw = []
        for part in ["wr_champions_part1.json", "wr_champions_part2.json", "wr_champions_part3.json"]:
            part_data = load_json_safe(os.path.join(PUBLIC_DATA_DIR, part))
            if part_data:
                old_raw.extend(toArray(part_data))
                
    new_raw = load_json_safe(os.path.join(OUTPUT_DIR, "wr_champions.json"))
    
    old_dict = normalize_to_dict(old_raw)
    new_dict = normalize_to_dict(new_raw)
    
    changes = []
    for cid, new_champ in new_dict.items():
        if cid not in old_dict:
            changes.append(f"Added champion: {new_champ['name']}")
            continue
            
        old_champ = old_dict[cid]
        name = new_champ["name"]
        
        # Check stats (win/pick/ban rates)
        # Old stats might be in 'realtime' or 'stats' or 'graph_node'
        old_stats = old_champ.get("stats") or old_champ.get("realtime") or {}
        new_stats = new_champ.get("stats", {})
        
        def format_pct(val):
            return f"{val * 100:.2f}%" if val is not None else "N/A"
            
        o_wr = old_stats.get("win_rate")
        n_wr = new_stats.get("win_rate")
        if o_wr and n_wr and abs(o_wr - n_wr) > 0.0001:
            changes.append(f"Champion '{name}' win rate: {format_pct(o_wr)} → {format_pct(n_wr)}")
            
    return changes

def toArray(json_data: Any) -> list:
    if not json_data:
        return []
    if isinstance(json_data, list):
        return json_data
    if isinstance(json_data, dict):
        for k in ["champions", "data"]:
            if k in json_data and isinstance(json_data[k], list):
                return json_data[k]
    return [json_data]

def generate_changelog() -> str:
    """Generate and return a markdown changelog string of detected changes."""
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    report = []
    
    item_changes = diff_items()
    rune_changes = diff_runes()
    spell_changes = diff_spells()
    champ_changes = diff_champions()
    
    if item_changes:
        report.append("### 🗡️ Item Changes")
        report.extend([f"- {c}" for c in item_changes])
        report.append("")
    if rune_changes:
        report.append("### 🔮 Rune Changes")
        report.extend([f"- {c}" for c in rune_changes])
        report.append("")
    if spell_changes:
        report.append("### ⚡ Summoner Spell Changes")
        report.extend([f"- {c}" for c in spell_changes])
        report.append("")
    if champ_changes:
        report.append("### 📈 Champion Stats Changes")
        report.extend([f"- {c}" for c in champ_changes])
        report.append("")
        
    if not report:
        return "No changes detected. Database is fully up-to-date."
        
    return "\n".join(report)

# Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
