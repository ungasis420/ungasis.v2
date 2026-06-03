from typing import List, Dict, Any, Tuple

def validate_item(item: Dict[str, Any]) -> Tuple[bool, str]:
    """Validate item data against the required schema constraints."""
    required_keys = {"id", "name", "category", "stats", "cost", "passive"}
    for key in required_keys:
        if key not in item:
            return False, f"Missing key: {key}"
    
    if not isinstance(item["cost"], int) or item["cost"] < 0:
        return False, f"Invalid cost: {item.get('cost')}"
        
    if not isinstance(item["stats"], dict):
        return False, f"Stats must be a dictionary, got: {type(item['stats'])}"
        
    if not item["id"] or not item["name"]:
        return False, "ID and Name cannot be empty"
        
    return True, ""

def validate_rune(rune: Dict[str, Any]) -> Tuple[bool, str]:
    """Validate rune data against the required schema constraints."""
    required_keys = {"id", "name", "rune_type", "path", "description"}
    for key in required_keys:
        if key not in rune:
            return False, f"Missing key: {key}"
            
    if rune["rune_type"] not in {"keystone", "minor"}:
        return False, f"Invalid rune_type: {rune['rune_type']}"
        
    if not rune["id"] or not rune["name"]:
        return False, "ID and Name cannot be empty"
        
    return True, ""

def validate_champion(champ: Dict[str, Any]) -> Tuple[bool, str]:
    """Validate champion data against required constraints."""
    required_keys = {"id", "name", "roles", "difficulty", "abilities"}
    for key in required_keys:
        if key not in champ:
            return False, f"Missing key: {key}"
            
    if not isinstance(champ["roles"], list) or not champ["roles"]:
        return False, f"Invalid roles list: {champ.get('roles')}"
        
    if not isinstance(champ["abilities"], dict):
        return False, "Abilities must be a dictionary"
        
    for slot in ["passive", "q", "w", "e", "r"]:
        if slot not in champ["abilities"]:
            return False, f"Missing ability slot: {slot}"
        slot_data = champ["abilities"][slot]
        if not isinstance(slot_data, dict) or "name" not in slot_data or "description" not in slot_data:
            return False, f"Invalid ability data in slot: {slot}"
            
    return True, ""

def validate_spell(spell: Dict[str, Any]) -> Tuple[bool, str]:
    """Validate spell data against constraints."""
    required_keys = {"id", "name", "cooldown", "description"}
    for key in required_keys:
        if key not in spell:
            return False, f"Missing key: {key}"
    return True, ""
