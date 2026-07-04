# Decision: adopt skinny prompt template v2.3

**Decision:** adopt skinny template v2.3 for all new `/goal` prompts,
superseding the v2.2 rule set embedded in CLAUDE.md.

**Rationale:** v2.2 had a contradiction between its escape hatch and its
end-state success condition — the escape hatch could fire (e.g. on a
blocked mutation) while the success condition still expected a clean
end-state, which caused a STALE_HOOK loop on 2026-07-06.

**Changes:** 4 rules added —
1. Success condition is WAIVED if the escape hatch fires; BLOCKED is a
   valid terminal state, not a failure.
2. Own-probe side-effect mutations are documented as evidence in the
   report, not self-reverted from within the session.
3. 3-strike rule elevation: an identical rejection 3 times in a row ->
   save a memory entry and STOP, rather than retrying a 4th time.
4. W1d self-revert warning: never expect Claude to self-revert its own
   probe mutations via git checkout/restore, since a correctly
   fail-closed hook blocks that regardless of scope.

**Supersedes:** the v2.2 rule set embedded in CLAUDE.md's
"Hook Discipline" section.

**Cross-ref:** docs/prompts/skinny-template-v2.3.md,
[[w1d-blocks-safe-reverts]]

Staleness footer: review 2026-10-06.
