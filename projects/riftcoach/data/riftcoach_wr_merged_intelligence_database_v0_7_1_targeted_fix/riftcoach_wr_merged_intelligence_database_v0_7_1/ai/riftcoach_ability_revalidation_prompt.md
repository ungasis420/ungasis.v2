# RiftCoach Ability Revalidation Prompt — Chunk 2

Objective: Revalidate Wild Rift champion ability identity and mechanics for Patch 7.1e using approved sources only.

Rules:
- Use only Riot Wild Rift champion pages, LoL Wiki pages with `/WR:` prefix, and WildRiftFire guide pages for strategy/build context.
- Do not use League PC pages or generic champion pages.
- For every champion, extract Passive, Q, W, E, and R ability names first.
- Then extract cost, cooldown, cast time, range, radius, width, speed, duration, damage values, scaling, active/passive effects, damage types, defense types, crowd-control types, enhanced forms, and special mechanics.
- Keep field-level provenance for every numeric or named value.
- If a value cannot be extracted from approved sources, mark `pending_allowed_source_refresh`.
- Karma regression is mandatory: passive Mantra; Q Inner Flame; W Focused Resolve; E Inspire; R Transcendent Embrace.

Output: Update `wr_ability_name_lockfile.json`, `ability_extraction_audit.json`, and `source_claims_abilities.jsonl`.
