# Source Refresh Pipeline Spec

## Steps
1. Build allowed-source queue.
2. Fetch source page ethically without bypassing access controls.
3. Store Bronze snapshot.
4. Extract fields.
5. Normalize into Silver.
6. Generate source claims.
7. Validate blockers.
8. Publish Gold/runtime files only if blockers pass.

## Important
If a source cannot be fetched, create a pending_allowed_source_refresh record. Do not fabricate exact values.

