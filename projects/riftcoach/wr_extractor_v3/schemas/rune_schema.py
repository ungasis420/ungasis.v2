from dataclasses import dataclass
from typing import Optional

@dataclass
class RuneData:
    id: str
    name: str
    rune_type: str  # keystone | minor
    path: str       # domination | precision | resolve | sorcery | inspiration
    slot: int       # 0-3
    description: str
    tier: str       # S | A | B | C | D
    source: Optional[str] = None
    patch: Optional[str] = None
