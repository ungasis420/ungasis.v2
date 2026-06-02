# AI Rationale Hallucinations

## What
A bug where AI models hallucinate or invent component statistics and build details that do not exist in the source code files.

## Code (if applicable)
```typescript
// Implement confidence tags and ground checks in your components:
interface GroundedData {
  value: number;
  confidence: 'HIGH' | 'LOW';
  sourceFile: string; // Enforce explicit mapping back to database record
}
```

## When to Use
Enforce when building analytics reports or AI-driven summary dashboards where data accuracy is critical.

## Gotchas
- AI models will confidently describe item stats that look realistic but are entirely fabricated. Always validate outputs against raw DB collections.

## Source
Learned in: RiftCoach Phase 4.3 (May 2026)
Verified in: None

## Tags
performance, agent

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
