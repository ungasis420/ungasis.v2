# RiftCoach Wild Rift Merged Intelligence Database v0.7.1

This v0.7.1 package adds the M365/Opus post-merge champion file as a source-aware candidate overlay. Root runtime `public/data/*.json` files remain compatible. Exact M365/Opus mechanics are preserved as trace-only claims until approved-source field-level validation.

## Key v0.7.1 files

- `raw_sources/m365_opus_postmerge/wr_champions_merged_v070_full.json`
- `database/overlays/m365_opus_champion_advisory_overlay.json`
- `database/overlays/m365_opus_candidate_mechanic_claims.jsonl`
- `staging/source_value_traces/m365_opus_candidate_source_value_traces.jsonl`
- `quality/m365_opus_overlay_merge_report.json`
- `quality/final_v0_7_1_validation_report.json`

---

## Prior README

# RiftCoach Wild Rift Merged Intelligence Database v0.7.0

This package is a lossless, source-aware merge of:

1. `data.zip` — current local repo database
2. `wr_opus.zip` — M365 Copilot/Opus database/research output
3. `wr_chatgpt.zip` — ChatGPT v0.6.0 Wild Rift intelligence database chunks
4. `src.zip` — local repo source tree used for runtime compatibility audit

## Critical policy

- Raw source copies are preserved in `raw_sources/`.
- Canonical merged records are separate from raw source records.
- Field-level source-value traces are included.
- Generated strategy stays separate from official/source-verified facts.
- Exact Wild Rift stats, gold costs, cooldowns, damage, and ranges are not promoted unless field-level provenance supports source verification.
- LoL-PC gameplay data is not promoted into Wild Rift records.
- Karma ability lock is protected:
  - passive = Mantra
  - Q = Inner Flame
  - W = Focused Resolve
  - E = Inspire
  - R = Transcendent Embrace

## Runtime compatibility

The current app-compatible files are in `public/data/`. The source-aware canonical exports are in `public/data/v0_7/` and `database/entities/`.

See `architecture/LOCAL_REPO_UPDATE_PLAN_V0_7.md` before replacing your repo's active `public/data`.

## Reports

Start with:

- `quality/lossless_preservation_report.json`
- `quality/runtime_compatibility_report.json`
- `quality/conflict_report.json`
- `quality/source_coverage_report.json`
- `quality/no_lol_pc_contamination_report.json`
- `quality/karma_regression_report.json`
- `lineage/merge_ledger_summary.json`

## Final ZIP size note

To keep the downloadable ZIP stable, decompressed duplicates of ChatGPT chunks are not repeated under `raw_sources/`. The raw outer archive and all nested chunk ZIPs are preserved with checksums, which is the lossless source of truth.
