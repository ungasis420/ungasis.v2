# Connected Asset Explorer Spec

## Purpose
Make every RiftCoach page relationship-aware.

## Asset page pattern
Each entity page should include:
- Overview
- Mechanics
- Builds
- Synergies
- Counters / deny logic
- Graph neighborhood
- Backlinks
- Source claims
- Patch validity

## Example: Karma
```text
Karma
├── Abilities: Mantra, Inner Flame, Focused Resolve, Inspire, Transcendent Embrace
├── Effects: shield, movement_speed, slow, root, tether, true_sight, magic_damage, knock_in
├── Builds: support_enchanter, support_mage, support_tank
├── Runes: Aery, Arcane Comet, Guardian, Bone Plating
├── Items: Ardent Censer, Staff of Flowing Waters, Bandle Fantasy, Stasis Enchant
└── Counters / deny: anti-burst timing, anti-dive peel, cleanse/root mitigation
```

## Relationship panel requirements
- Show top direct links.
- Group by relationship type.
- Display confidence and source status.
- Allow “expand this relationship.”
- Allow “why is this connected?” explanation.
- Allow “hide generated rules” mode.
