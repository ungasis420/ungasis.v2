# RAGAS 20-Q Eval Set — youtube-ingest-v3 pilot

Referenced by docs/prompts/p3-v3-spec.md §10 (Sebastian gate: RAGAS 20-Q →
faithfulness ≥0.85 AND citation_hit_rate ≥0.90, top-5 retrieval).

## Population rule (two-phase)

**During P3b (this file, now):**
- Slot count (20) and source allocation are fixed and complete.
- All content fields (see schema) are `TODO`.
- No invented final questions or answers at this stage.

**After P4b (pilot ingest run) and before P4c (gate evaluation):**
- Populate every `TODO` from actual pilot passages only.
- No invented answers — each `reference_answer` must be traceable to
  ingested wiki page content.
- Every `reference_answer` must cite passage IDs in `expected_citations`
  (chunk_id / page slug from the real ingest run).
- `generated_response`, `retrieved_context_ids`, `retrieved_contexts` are
  filled in by the eval run itself (not authored by hand), after P4b.
- Missing evidence for any slot = automatic failure for that slot (does
  not get a passing `result` regardless of the wording quality of the
  produced answer).

## Slot schema

Every slot has these 14 fields:

| Field | Meaning | Populated |
|---|---|---|
| `id` | 1-20 | now |
| `query_type` | single-hop-specific \| single-hop-abstract \| multi-hop-specific \| multi-hop-abstract | now |
| `required_source_ids` | KARPATHY / MARS / NICK, or a two-source pair for multi-hop | now |
| `question` | eval question | after P4b |
| `reference_answer` | ground-truth answer from real ingested passages | after P4b |
| `reference_context` | passage text backing the answer | after P4b |
| `expected_citations` | passage IDs (chunk_id / slug) the answer must cite | after P4b |
| `generated_response` | RAG system's actual output for `question` | eval run |
| `retrieved_context_ids` | passage IDs the retriever returned (top-5) | eval run |
| `retrieved_contexts` | passage text the retriever returned (top-5) | eval run |
| `faithfulness_score` | RAGAS faithfulness metric on `generated_response` vs `retrieved_contexts` | eval run |
| `citation_hit_rate` | see formula below | eval run |
| `result` | PASS / FAIL against §10 thresholds | eval run |
| `reviewer_notes` | human QA notes | after eval run |

### citation_hit_rate definition

```
citation_hit_rate = (expected_citations retrieved in retrieved_context_ids[:5])
                     / len(expected_citations)
```

i.e. the fraction of `expected_citations` IDs that appear among the top-5
`retrieved_context_ids`. Gate threshold (p3-v3-spec.md §10): ≥0.90.

## Allocation summary

- Single-hop specific: 8 (KARPATHY×3, MARS×3, NICK×2)
- Single-hop abstract: 4 (NICK×2, KARPATHY×1, MARS×1)
- Multi-hop specific: 4 (K+M×2, M+N×1, N+K×1)
- Multi-hop abstract: 4 (M+N×2, N+K×1, K+M×1)
- Single-hop source totals (12 slots): KARPATHY 4, MARS 4, NICK 4
- Multi-hop pair totals (8 slots): K+M 3, M+N 3, N+K 2

## Slots

All content fields below are `TODO` (P3b stage — see Population rule).

| id | query_type | required_source_ids | question | reference_answer | reference_context | expected_citations | generated_response | retrieved_context_ids | retrieved_contexts | faithfulness_score | citation_hit_rate | result | reviewer_notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | single-hop-specific | KARPATHY | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO |
| 2 | single-hop-specific | MARS | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO |
| 3 | single-hop-specific | NICK | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO |
| 4 | single-hop-specific | KARPATHY | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO |
| 5 | single-hop-specific | MARS | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO |
| 6 | single-hop-specific | NICK | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO |
| 7 | single-hop-specific | KARPATHY | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO |
| 8 | single-hop-specific | MARS | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO |
| 9 | single-hop-abstract | NICK | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO |
| 10 | single-hop-abstract | KARPATHY | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO |
| 11 | single-hop-abstract | MARS | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO |
| 12 | single-hop-abstract | NICK | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO |
| 13 | multi-hop-specific | KARPATHY, MARS | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO |
| 14 | multi-hop-specific | MARS, NICK | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO |
| 15 | multi-hop-specific | NICK, KARPATHY | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO |
| 16 | multi-hop-specific | KARPATHY, MARS | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO |
| 17 | multi-hop-abstract | MARS, NICK | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO |
| 18 | multi-hop-abstract | NICK, KARPATHY | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO |
| 19 | multi-hop-abstract | KARPATHY, MARS | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO |
| 20 | multi-hop-abstract | MARS, NICK | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO |

---
Staleness Footer: Generated at 2026-07-11T00:00:00+00:00 (P3b scaffold, patched to 14-field schema + compact table; questions/answers pending P4b pilot ingest)
