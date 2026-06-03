# Data Architecture

## Layers
- Bronze: raw snapshots from approved sources only.
- Silver: normalized entities with field-level provenance.
- Gold: decision-ready fact/dimension tables for analytics and BI.

## Source-of-truth split
- Riot Wild Rift: official roster and patch notes.
- LoL Wiki WR pages: exact mechanics, item golds, cooldowns, stats.
- WildRiftFire: advisory meta/build context.
- WR-META: roster/meta cross-check only.
- RiftCoach generated: strategic recommendations and relationship logic.

## Numeric value rule
A numeric value can be `source_verified` only when it has:
- source URL
- source family
- retrieved_at or extraction run ID
- patch version
- claim ID
- confidence

