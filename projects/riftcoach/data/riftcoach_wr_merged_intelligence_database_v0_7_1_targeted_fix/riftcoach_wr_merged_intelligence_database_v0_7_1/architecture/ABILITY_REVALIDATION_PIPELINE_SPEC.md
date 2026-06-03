# Ability Revalidation Pipeline Spec

## Purpose
Prevent wrong passives, wrong ability names, League PC overwrites, and placeholder values from entering the champion database.

## Flow
source refresh job -> approved source fetch -> WR URL validation -> ability identity extraction -> numeric mechanics extraction -> field-level provenance -> claim ledger -> ability audit -> champion chunk generation.

## Blocking gates
- exactly five ability slots per champion
- no pending ability names in final champion chunks
- Karma regression must pass
- no League PC URLs
- every numeric value has provenance or pending status
- source conflicts are recorded, not hidden

## Output targets
- database/entities/wr_ability_name_lockfile.json
- lineage/source_claims_abilities.jsonl
- quality/ability_extraction_audit.json
- quality/ability_identity_validation_report.json
