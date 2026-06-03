# M365/Opus Champion File Cross-Check vs RiftCoach v0.7.0
Generated: 2026-05-22T03:10:49.987601+00:00
## Verdict
**Not identical. Mergeable, but not as a direct overwrite.** The uploaded file contains useful candidate values, especially meta/strategy fields and exact mechanics, but the exact numeric/mechanic values must remain unverified source candidates until approved Wild Rift source extraction validates them field-by-field.
## Counts
| Metric | Count |
|---|---:|
| uploaded_raw_champions | 138 |
| uploaded_normalized_ids | 138 |
| v0_7_canonical_records_all | 141 |
| v0_7_public_runtime_records | 138 |
| full_record_hash_equal_count | 0 / 138 |
| candidate_strategy_claim_count | 868 |
| candidate_mechanic_claim_count | 240 |
| champions_with_mechanic_candidates | 94 |
| ability_by_key_name_mismatch_count | 0 |
| legacy_abilities_dict_name_mismatch_count | 49 |

## ID alias findings
- `k_sante` -> `ksante`
- `kai_sa` -> `kaisa`
- `kha_zix` -> `khazix`
- `kog_maw` -> `kogmaw`
- `nunu_willump` -> `nunu`

## Key risk flags
- contains_strategy_or_meta_overlay_candidates: 135
- contains_exact_unverified_mechanics: 94
- legacy_abilities_dict_identity_mismatch: 22
- karma_legacy_abilities_dict_conflicts_with_protected_lock: 1
- karma_abilities_by_key_matches_protected_lock: 1

## Candidate strategy fields from upload
- `meta_tier`: 135
- `difficulty`: 135
- `playstyle`: 135
- `power_spikes`: 135
- `counters`: 135
- `full_data`: 135
- `wiki_url`: 54
- `synergies`: 4

## Merge recommendation
1. Preserve uploaded file under `raw_sources/m365_opus_postmerge/`.
2. Add a new source family descriptor with `source_status = m365_opus_candidate_unverified`.
3. Add strategy/meta fields to a candidate overlay after role/alias normalization.
4. Add exact stats/cooldowns/damage/cost/scaling only to `source_value_traces`, not canonical official facts.
5. Do not use the uploaded top-level `abilities` dict for Karma or ability identity. Prefer `abilities_by_key` and the protected Karma lock.
6. Build a v0.7.1 patch package only after approval.

## Files generated
- `m365_opus_abilities_by_key_mismatches.csv`
- `m365_opus_alias_normalization.csv`
- `m365_opus_candidate_mechanic_claims.jsonl`
- `m365_opus_candidate_strategy_claims.jsonl`
- `m365_opus_champion_delta_summary.csv`
- `m365_opus_crosscheck_report.json`
- `m365_opus_legacy_abilities_dict_mismatches.csv`
- `m365_opus_source_family_descriptor.json`
