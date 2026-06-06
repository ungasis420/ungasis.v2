# sprint-current.md — Phase 6.5: Agent Memory & Context

> **Phase:** 6.5 | **Date:** June 6, 2026 | **Author:** M365 Copilot Opus
> **Status:** PLANNING → Ready for execution
> **Depends on:** Phase 6.0 COMPLETE (6 agents, orchestrator, /api/multi-coach, 18/18 pages)
> **Build baseline:** `npm run build` — 18/18 pages, 0 errors

---

## GOAL

Give RiftCoach agents **memory** (Upstash Redis) and **eyes** (Langfuse) so they can:
1. Cache repeated coaching queries (instant response on cache hit)
2. Remember session context across multi-turn conversations
3. Track per-agent performance (latency, success rate, model quality)
4. Emit OpenTelemetry traces to Langfuse for observability

---

## PREREQUISITES (Manual — Mel does these first)

### 1. Upstash Redis Database
```
1. Go to console.upstash.com → Create Database
2. Region: US-East-1 (closest to Vercel)
3. Copy REST URL + REST Token
4. Add to .env.local:
   UPSTASH_REDIS_REST_URL=https://...upstash.io
   UPSTASH_REDIS_REST_TOKEN=AURb...
```

### 2. Langfuse Account
```
1. Go to cloud.langfuse.com → Sign Up (free)
2. Create Project: "RiftCoach"
3. Go to Settings → API Keys → Create
4. Add to .env.local:
   LANGFUSE_SECRET_KEY=sk-lf-...
   LANGFUSE_PUBLIC_KEY=pk-lf-...
   LANGFUSE_BASEURL=https://us.cloud.langfuse.com
```

### 3. Install Dependencies
```bash
cd D:\.projects\ungasis\projects\riftcoach
npm install @langfuse/otel @langfuse/tracing @opentelemetry/sdk-trace-node
npm run build
```
> ⚠️ Build MUST still pass 18/18 after install. If not, STOP.

---

## NEW FILES MAP

```
src/
├── lib/
│   ├── redis.ts              ★ NEW — Redis client singleton
│   ├── cache.ts              ★ NEW — Response cache (get/set/TTL)
│   ├── memory.ts             ★ NEW — Session state + agent perf counters
│   ├── observability.ts      ★ NEW — Langfuse trace wrappers
│   └── agents/
│       ├── orchestrator.ts   ★ UPDATE — add cache + memory + tracing
│       └── agent-runner.ts   ★ UPDATE — add telemetry to AI SDK calls
├── app/
│   └── api/
│       └── multi-coach/
│           └── route.ts      ★ UPDATE — session management
└── instrumentation.ts        ★ NEW — OpenTelemetry + Langfuse bootstrap
next.config.js                ★ UPDATE — enable instrumentationHook
```

---

## REDIS KEY SCHEMAS

```
# Response Cache
Key:    cache:coach:{champion}:{queryHash}
Value:  JSON string of OrchestratorResult
TTL:    3600s (1 hour)

# Session State (Hash)
Key:    session:{sessionId}
Fields: userId, createdAt, lastActive, turnCount, lastChampion, lastQuery, mode
TTL:    7200s (2 hours)

# Agent Performance Counters (Hash)
Key:    perf:agent:{agentRole}
Fields: totalCalls, successes, failures, avgLatencyMs, lastCall
TTL:    86400s (24 hours — rolling daily window)

# Free Tier Budget: 10K commands/day
# Per query: ~5 cmds (1 GET cache + 1 SET cache + 2 HSET session + 1 HINCRBY perf)
# Budget: ~2000 queries/day ✅
```

---

## WAVE 1 — Parallel (4 independent files)
> Mode: Antigravity Agent Manager (4 agents, Gemini 3.5 Flash High)

### Agent 6.5-W1A: Redis Client

```
Create src/lib/redis.ts
In: env vars UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN
Out: export const redis: Redis (singleton)
Data: process.env
Import: { Redis } from "@upstash/redis"
Gemini 3.5 Flash (High) | Max 30 lines | npm run build must pass

Details:
- Use Redis.fromEnv() pattern
- Export singleton instance
- Add isRedisConfigured() helper → returns boolean
- Graceful: if env vars missing, log warning, don't crash
```

### Agent 6.5-W1B: Response Cache

```
Create src/lib/cache.ts
In: { champion: string, queryHash: string, data: OrchestratorResult }
Out: { get → OrchestratorResult | null, set → void, invalidate → void }
Data: redis.ts client
Import: { redis } from "./redis", { OrchestratorResult } from "./agents/types"
Gemini 3.5 Flash (High) | Max 80 lines | npm run build must pass

Details:
- Key format: cache:coach:{champion}:{queryHash}
- TTL: 3600 seconds (1 hour)
- getCache(champion, queryHash) → OrchestratorResult | null
- setCache(champion, queryHash, result) → void
- invalidateCache(champion) → void (wildcard delete)
- createQueryHash(query: string) → string (simple hash, no crypto needed)
- All operations wrapped in try-catch → return null/void on failure
- If redis not configured → skip silently (dev mode works without Redis)
```

### Agent 6.5-W1C: Session Memory

```
Create src/lib/memory.ts
In: { sessionId: string, agentRole: AgentRole, latencyMs: number, success: boolean }
Out: { getSession, updateSession, trackAgentPerf, getAgentPerf }
Data: redis.ts client
Import: { redis } from "./redis", { AgentRole } from "./agents/types"
Gemini 3.5 Flash (High) | Max 120 lines | npm run build must pass

Details:
- Session state (Redis Hash):
  Key: session:{sessionId}
  Fields: userId, createdAt, lastActive, turnCount, lastChampion, lastQuery, mode
  TTL: 7200s (2 hours)
  getSession(id) → SessionState | null
  updateSession(id, updates) → void
  createSession() → { sessionId: string } (uuid via crypto.randomUUID)

- Agent performance counters (Redis Hash):
  Key: perf:agent:{agentRole}
  Fields: totalCalls, successes, failures, totalLatencyMs, lastCall
  TTL: 86400s (24 hours)
  trackAgentPerf(role, latencyMs, success) → void (HINCRBY atomic)
  getAgentPerf(role) → AgentPerfStats | null

- Interface SessionState:
  { sessionId, userId?, createdAt, lastActive, turnCount, lastChampion?, lastQuery?, mode }

- Interface AgentPerfStats:
  { totalCalls, successes, failures, avgLatencyMs, lastCall }

- All operations try-catch → graceful fallback if Redis unavailable
```

### Agent 6.5-W1D: Observability Wrappers

```
Create src/lib/observability.ts
In: { agentRole, champion, provider, model, latencyMs, status, zodValid }
Out: { traceAgentCall, traceOrchestration, getTraceConfig }
Data: none (utility functions)
Import: none (pure functions + types)
Gemini 3.5 Flash (High) | Max 80 lines | npm run build must pass

Details:
- Interface AgentTrace:
  { agentId, champion, role, provider, model, latencyMs,
    tokensIn?, tokensOut?, status, zodValid, cacheHit }

- traceAgentCall(trace: AgentTrace) → void
  Console.log structured trace in dev (JSON one-liner)
  In production: Langfuse captures via OpenTelemetry spans automatically

- traceOrchestration(result: OrchestratorResult, cacheHit: boolean) → void
  Log summary: agents called, total latency, success/fail counts, cache status

- getTraceConfig() → { isEnabled: true, functionId: string }
  Returns config object for experimental_telemetry in AI SDK calls
  functionId format: "riftcoach-{agentRole}"

- All logging behind NODE_ENV check (verbose in dev, quiet in prod)
```

---

## WAVE 2 — Sequential (instrumentation wiring)
> Mode: Antigravity Right Panel (Gemini 3.1 Pro High)
> ⚠️ Wait for Wave 1 to pass build before starting

### Task 6.5-W2A: OpenTelemetry Instrumentation

```
Create src/instrumentation.ts
In: env vars LANGFUSE_SECRET_KEY, LANGFUSE_PUBLIC_KEY, LANGFUSE_BASEURL
Out: registered NodeTracerProvider with LangfuseSpanProcessor
Data: process.env
Import: { LangfuseSpanProcessor } from "@langfuse/otel",
        { NodeTracerProvider } from "@opentelemetry/sdk-trace-node"
Gemini 3.1 Pro (High) | Max 40 lines | npm run build must pass

Details:
- Export function register() — Next.js App Router instrumentation hook
- Inside register():
  1. Check if LANGFUSE_SECRET_KEY exists → if not, console.warn + return
  2. Create LangfuseSpanProcessor with shouldExportSpan filter
  3. Filter: exclude spans where instrumentationScope.name === 'next.js'
  4. Create NodeTracerProvider with [langfuseSpanProcessor]
  5. Register provider
- This file auto-runs on Next.js server startup when instrumentationHook enabled
```

### Task 6.5-W2B: Enable Instrumentation Hook

```
Update next.config.js
Add experimental.instrumentationHook = true

ONLY add this one property. Do NOT change anything else.
Keep all existing config intact.

Gemini 3.1 Pro (High) | Max 5 lines changed | npm run build must pass
```

---

## WAVE 3 — Sequential (integration — depends on Waves 1+2)
> Mode: Antigravity Right Panel (Gemini 3.1 Pro High)
> ⚠️ Wait for Waves 1+2 to pass build before starting

### Task 6.5-W3A: Update Orchestrator

```
Update src/lib/agents/orchestrator.ts
Add cache check + cache set + memory tracking + tracing

Import: { getCache, setCache, createQueryHash } from "../cache"
Import: { updateSession, trackAgentPerf, createSession } from "../memory"
Import: { traceOrchestration, traceAgentCall } from "../observability"

Changes (ADD to existing orchestrate function, don't replace):

1. At START of orchestrate():
   - Create queryHash from request.query
   - Check cache: const cached = await getCache(request.champion, queryHash)
   - If cached → traceOrchestration(cached, true) → return cached

2. AFTER each agent completes (inside Promise.allSettled handler):
   - Call trackAgentPerf(agent.role, agent.latencyMs, !agent.error)
   - Call traceAgentCall({ ...agent trace data })

3. AFTER mergedContent assembled:
   - Call setCache(request.champion, queryHash, result)
   - Call traceOrchestration(result, false)

4. Accept optional sessionId param:
   - If provided, call updateSession(sessionId, { lastChampion, lastQuery, turnCount++ })

Max 30 lines added | npm run build must pass
ANTI-MARATHON: Stop after 3 failed attempts, ask user.
```

### Task 6.5-W3B: Update Agent Runner

```
Update src/lib/agents/agent-runner.ts
Add OpenTelemetry telemetry to AI SDK calls

Import: { getTraceConfig } from "../observability"

Changes:
1. In the AI SDK generateText/streamText call, add:
   experimental_telemetry: getTraceConfig()

2. Set functionId to "riftcoach-{agentRole}" for each call

3. This is the ONLY change — Langfuse + OpenTelemetry handle the rest
   automatically via the instrumentation.ts span processor

Max 10 lines added | npm run build must pass
```

### Task 6.5-W3C: Update Multi-Coach Route

```
Update src/app/api/multi-coach/route.ts
Add session management

Import: { createSession, getSession, updateSession } from "@/lib/memory"

Changes:
1. Extract sessionId from request body (optional field)
2. If no sessionId → createSession() → get new sessionId
3. Pass sessionId to orchestrate() call
4. Include sessionId in JSON response:
   { ...result, sessionId }
5. Update AgentRequest type in types.ts to include optional sessionId

Max 15 lines added | npm run build must pass
ANTI-MARATHON: Stop after 3 failed attempts, ask user.
```

---

## JULES TASKS (Fire after Wave 3 passes — push to GitHub first)

Assign at jules.google.com after `git push`:

```
Task 1: Write unit tests for src/lib/redis.ts, src/lib/cache.ts,
        src/lib/memory.ts, src/lib/observability.ts
        Use vitest. Mock @upstash/redis. Test graceful fallback
        when Redis is unavailable.

Task 2: Add JSDoc comments to all exported functions in:
        src/lib/redis.ts, src/lib/cache.ts, src/lib/memory.ts,
        src/lib/observability.ts

Task 3: Create .env.example in project root with ALL required
        env vars (existing + new Redis + Langfuse). Include
        comments explaining each var. Do NOT include real values.

Task 4: Refactor src/lib/agents/build-optimizer.ts to under
        200 lines (currently 307). Extract prompt templates
        to a separate build-optimizer-prompts.ts file.

Task 5: Refactor src/lib/agents/draft-advisor.ts to under
        200 lines (currently 371). Extract prompt templates
        to a separate draft-advisor-prompts.ts file.

Task 6: Refactor src/lib/agents/synergy-engine.ts to under
        200 lines (currently 341). Extract prompt templates
        to a separate synergy-engine-prompts.ts file.
```

---

## VERIFY COMMANDS

Run after each wave:

```bash
# After each wave
npm run build
# Expected: 18/18 pages, 0 errors

# After Wave 3 — smoke test (requires .env.local with keys)
npm run dev
# Open browser → Coach page → Multi-Agent mode → ask "Best Karma support build"
# Check:
#   1. Response returns (cache MISS first time)
#   2. Same query again → faster (cache HIT)
#   3. Console shows structured trace logs
#   4. Langfuse dashboard shows traces (if keys configured)

# Redis verification (optional — via Upstash console)
# Check keys: cache:coach:karma:*, session:*, perf:agent:*

# Full build + type check
npx tsc --noEmit
npm run build
```

---

## SUCCESS CRITERIA

| # | Criterion | Verify |
|---|-----------|--------|
| 1 | `npm run build` passes — 18/18 pages, 0 errors | `npm run build` |
| 2 | Redis client connects (or gracefully skips if no env vars) | Console output |
| 3 | Repeated query returns cached result (faster response) | Manual test |
| 4 | Session state persists across requests (same sessionId) | Check Redis keys |
| 5 | Agent perf counters increment on each call | Check `perf:agent:*` keys |
| 6 | Langfuse receives traces when keys configured | Langfuse dashboard |
| 7 | App works normally WITHOUT Redis/Langfuse keys (dev mode) | Remove env vars, test |
| 8 | No regression — Standard mode unaffected | Test Standard toggle |
| 9 | Karma regression gate passes | Build Karma, verify quality |

---

## ENV VARS REFERENCE (Complete — Phase 6.5)

```bash
# === AI Providers (existing) ===
CEREBRAS_API_KEY=...
GROQ_API_KEY=...
GOOGLE_GENERATIVE_AI_API_KEY=...
OPENROUTER_API_KEY=...
MISTRAL_API_KEY=...
TOGETHER_AI_API_KEY=...

# === Upstash Redis (NEW — Phase 6.5) ===
UPSTASH_REDIS_REST_URL=https://...upstash.io
UPSTASH_REDIS_REST_TOKEN=AURb...

# === Langfuse (NEW — Phase 6.5) ===
LANGFUSE_SECRET_KEY=sk-lf-...
LANGFUSE_PUBLIC_KEY=pk-lf-...
LANGFUSE_BASEURL=https://us.cloud.langfuse.com
```

---

## EXECUTION CHECKLIST

```
[ ] Prerequisites: Upstash Redis database created
[ ] Prerequisites: Langfuse account + project created
[ ] Prerequisites: .env.local updated with new keys
[ ] Prerequisites: npm install @langfuse/otel @langfuse/tracing @opentelemetry/sdk-trace-node
[ ] Prerequisites: npm run build passes (18/18) after install
[ ] Wave 1: Agent Manager — 4 agents (redis, cache, memory, observability)
[ ] Wave 1: npm run build passes (18/18)
[ ] Wave 2: Right Panel — instrumentation.ts + next.config.js
[ ] Wave 2: npm run build passes (18/18)
[ ] Wave 3: Right Panel — orchestrator + agent-runner + multi-coach route
[ ] Wave 3: npm run build passes (18/18)
[ ] Wave 3: Smoke test with npm run dev
[ ] Wave 3: Verify Langfuse dashboard shows traces
[ ] Wave 3: Verify Redis has cache/session/perf keys
[ ] Git: git add -A && git commit -m "Phase 6.5: Agent Memory & Context" && git push
[ ] Jules: Fire Tasks 1-6 at jules.google.com
[ ] Handoff: Generate RiftCoach_Handoff_v21_Phase65_Complete.md
```

---

## TIMING ESTIMATE

| Wave | Mode | Est. Time |
|------|------|-----------|
| Prerequisites | Manual (Mel) | ~15 min |
| Wave 1 | Agent Manager (parallel) | ~20 min |
| Wave 2 | Right Panel (sequential) | ~10 min |
| Wave 3 | Right Panel (sequential) | ~25 min |
| Verify + Smoke Test | Manual (Mel) | ~15 min |
| Jules Tasks | Async (overnight) | — |
| **Total** | | **~85 min** |

---

## CRITICAL RULES (Repeated — Never Violate)

1. Wild Rift MOBILE only — never PC LoL
2. Karma regression gate — never degrade build quality
3. Anti-marathon: agents stop after 3 failed attempts, ask user
4. Max 200 lines per file
5. npm run build must pass after every change (18/18 pages)
6. snake_case IDs everywhere
7. All paths use D:\.projects\ungasis — C:\ is obsolete
8. Skinny prompts only — no echo, no history in agent prompts
9. Wave execution — independent first, dependent last
10. Graceful degradation — app MUST work without Redis/Langfuse keys

---

## NEXT PHASE PREVIEW

After 6.5 is complete and Jules PRs are merged:
- **Phase 7.0: Champion Build Lab / Theorycraft**
  - Real-time stat calculator with level slider 1-15
  - Compounding stat math engine (base + items + runes)
  - Gold efficiency visualization
  - Power curves and DPS estimation
  - Requires DATA-1 task: populate base_stats for all 138 champions

---

*Generated by M365 Copilot Opus — June 6, 2026*
*Handoff source: RiftCoach_Handoff_v20_Phase6_Complete.md*
