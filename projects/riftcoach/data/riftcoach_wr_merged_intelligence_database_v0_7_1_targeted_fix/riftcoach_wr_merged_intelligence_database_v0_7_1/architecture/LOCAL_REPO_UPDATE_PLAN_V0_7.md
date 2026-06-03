# RiftCoach v0.7.0 Local Repo Update Plan

Generated: 2026-05-21T19:32:10.976908+00:00

## Safe install path

Place this package at:

```text
data-platform/riftcoach_wr_merged_intelligence_database_v0_7_0/
```

Do not replace your active `public/data` until smoke tests pass.

## Files to replace after smoke tests

Copy the contents of this package's `public/data/` into your repo's `public/data/`. Key compatibility fixes included:

- `items.json` is a root array.
- `runes.json` uses UI slot strings and populated `effect`.
- `builds.json` has stable ids and normalized item/rune/spell refs.
- `wr_items.json` exists for the server build engine.
- `wr_matchups_duo.json` and `wr_synergies_duo.json` exist as Duo aliases.
- `wr_champions_corrections.json` includes both `champions` and `champions_to_add`.

## Recommended code patches

1. Add shared role normalizer: Duo/Dragon/Bot -> adc, Baron/Top -> baron.
2. Fix `/api/draft` contract or route Draft page to `/api/chat`.
3. Decide whether `/api/chat` should stream markdown only or return structured BuildView JSON for Route A.
4. Keep production API keys server-side only.
5. Replace `100% accurate` / `VERIFIED DATABASE STATS` copy with source-aware wording.
6. Patch `reasoning-enricher` to read both `corrections.champions` and `corrections.champions_to_add`.
7. Add a Karma ability regression test.

## Rollback

Restore prior `public/data` from `data.zip` or git. Remove/ignore `data-platform/riftcoach_wr_merged_intelligence_database_v0_7_0/`. Revert any app code patches.
