from dataclasses import dataclass
from typing import List, Dict, Any, Optional

@dataclass
class AbilityData:
    name: str
    description: str

@dataclass
class AbilitiesData:
    passive: AbilityData
    q: AbilityData
    w: AbilityData
    e: AbilityData
    r: AbilityData

@dataclass
class ChampionStats:
    win_rate: float
    pick_rate: float
    ban_rate: float

@dataclass
class ChampionData:
    id: str
    name: str
    roles: List[str]
    difficulty: int
    abilities: Dict[str, Dict[str, str]]  # P/Q/W/E/R -> name, description
    stats: Dict[str, float]
    patch: Optional[str] = None
