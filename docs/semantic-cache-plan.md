# Semantic Cache — Implementation Plan (Sprint 9)

## Current State (Layer 10)
- Exact-match cache: same question within 1hr = cached
- Savings: ~10%

## Target State
- Semantic cache: questions that MEAN the same thing get cached results
- Savings: ~40-60%

## Architecture
- Storage: Upstash Redis (free 256MB) or IndexedDB
- Embedding: Use small model (Cerebras llama3.1-8b) to generate question embedding
- Match: Cosine similarity > 0.85 = cache hit
- TTL: 1 hour default, configurable per quest

## Example
- Q1: "How do I add a glass card?" → AI answer (2,000 tokens) → CACHED
- Q2: "Show me glassmorphism card code" → similarity 0.91 → CACHE HIT (0 tokens)
- Q3: "Glass card CSS" → similarity 0.87 → CACHE HIT (0 tokens)

## Implementation Steps (Sprint 9)
1. Add Upstash Redis to .env (free tier)
2. Create lib/semantic-cache.ts
3. Hook into AI command bar (Cmd+K)
4. Add cache hit/miss counter to BI dashboard

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
