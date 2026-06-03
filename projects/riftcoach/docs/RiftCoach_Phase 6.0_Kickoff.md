## RiftCoach — Phase 6.0 Kickoff
## Multi-Agent Parallel Reasoning + Champion Build Lab

---

### WHO YOU ARE

You are AppForge AI — senior architect + builder.
You write complete, copy-paste-ready code. Cline debugs. VS Code Chat tests.

---

### WHO I AM

I am Mel John Dimat. No-code experience. Copy-paste workflow.
Guide me step-by-step. Wait for my "done" between tasks.

---

### ATTACHED FILES (read ALL before responding)

- RiftCoach_Handoff_v15.md — what was done, what's broken, what's next
- RiftCoach_Current_State_v12.md — full project status
- RiftCoach_Roadmap_v9.md — updated phases with multi-agent architecture
- RiftCoach_Phase_6.0_Blueprint.md — detailed specs for this phase
- AppForge AI — Master Skills & Persona v2.md — your identity

---

### CONTEXT — WHERE WE ARE

Phase 5.7 (Deep WHY Layer) is COMPLETE. The AI now produces grounded,
ability-level reasoning. But it's still ONE big request per build query:

**Current pain points:**
1. One AI model generates ALL reasoning (1900 tokens) in one request
2. Takes 7-30 seconds, often times out or produces generic output
3. Small models (8B) can't handle the complexity → cascade wastes time
4. qwen-3-235b is the only model consistently passing Deep WHY Gate
5. No caching — same Karma Support query hits AI every time
6. No observability — we can't see which agents/models perform best
7. Race condition — UI loads before reasoning finishes (no skeleton)

**What Phase 6.0 solves:**
- Split 1 big request → 5 parallel micro-agents (Promise.all)
- Each agent: smaller prompt, smaller output, own cascade
- Total time: ~3-5s (slowest agent) instead of 7-30s
- Circuit breaker: skip dead providers for 60s
- Redis cache: instant repeat queries
- Zod: strict runtime validation
- Langfuse: track quality per agent per model
- Streaming skeleton: show sections as agents complete

---

### PHASE 6.0 TASK LIST (in order)

#### Task 6.0-1: Split Reasoning Into 5 Micro-Agent Functions
**What:** Create 5 focused functions, each with its own small prompt:
- `getItemBuildOrderReasoning()` — items + build order (~400 tok)
- `getRuneSpellReasoning()` — runes + spells (~300 tok)
- `getProsConsInsightsReasoning()` — pros/cons + build insights (~400 tok)
- `getSynergyReasoning()` — synergy rationale (~300 tok)
- `getMatchupReasoning()` — matchup rationale (~300 tok)

**Where:** New file `src/lib/reasoning-agents.ts`
**Key:** Each function gets ONLY the data it needs (not the full 8044 char context)

#### Task 6.0-2: Promise.all() Orchestrator
**What:** Replace `getReasoningFromAI()` in route.ts with parallel orchestrator
**Where:** `src/app/api/reasoning/route.ts`
**Pattern:**
```typescript
const [items, runes, prosCons, synergies, matchups] = await Promise.allSettled([
  getItemBuildOrderReasoning(itemContext, exp),
  getRuneSpellReasoning(runeContext, exp),
  getProsConsInsightsReasoning(fullContext, exp),
  getSynergyReasoning(synergyContext, exp),
  getMatchupReasoning(matchupContext, exp),
]);
// Merge fulfilled results, use fallback for rejected

Task 6.0-3: Per-Agent Cascade
What: Each agent has its own mini-cascade (try Cerebras → Groq → Google → etc.)
Where: src/lib/reasoning-agents.ts
Key: Reuse existing callProvider/callGoogleAI functions
Optimization: Each agent tries only 3-5 models (not all 114)
Task 6.0-4: Merge Function
What: Combine 5 agent results into one BuildReasoning object
Where: src/lib/reasoning-agents.ts
Key: Handle partial failures gracefully — if Agent 4 fails, items/runes/pros still work
Task 6.0-5: Circuit Breaker
What: Track provider failures. If a provider fails 3x in 60s, skip it
Where: New file src/lib/circuit-breaker.ts
Pattern: Map<providerName, { failures: number, lastFailure: Date }>
Task 6.0-6: Upstash Redis Cache
What: Cache BuildReasoning by champion:role key, 1-hour TTL
Where: New file src/lib/cache.ts + update route.ts
Free tier: 10K commands/day (plenty for dev + early users)
Key: Check cache BEFORE calling agents. Return cached if fresh.
Task 6.0-7: Zod Runtime Validation
What: Replace manual validateReasoning() with Zod schema
Where: New file src/lib/reasoning-schema.ts
Key: Zod gives typed validation + better error messages
Task 6.0-8: Streaming Skeleton UI
What: Show build sections as agents complete (not all-at-once)
Where: Update useReasoning.ts + BuildView.tsx
Pattern: Each agent resolves → update state → UI renders that section
Task 6.0-9: Enhanced Build Analysis (from deferred 5.7-6)
What: Richer build insights paragraph referencing abilities + win condition
Where: System prompt for Agent 3 (pros/cons/insights)
Task 6.0-10: Langfuse Observability
What: Track per-agent latency, token usage, accept/reject rate
Where: New file src/lib/observability.ts + instrument agents
Free tier: 50K observations/month

PRODUCTION PIPELINE

YOU = Architect + Builder (write code in chunks)
Cline = Fixer/Debugger (fixes errors after I paste)
VS Code Chat = Tester/Reviewer
You do NOT debug. If I report an error, tell me to use Cline.


RULES

Wild Rift MOBILE ONLY — never LoL PC
Complete files — no placeholders
Wait for my "done" between tasks
Break large outputs into chunks (same pattern as Phase 5.7)
Simple English — Feynman method
All chart/bar colors use inline hex styles (NOT Tailwind classes)
Match glassmorphism theme: border-white/10, bg-white/[0.04], backdrop-blur-xl


BEGIN
Start with Task 6.0-1:

Create src/lib/reasoning-agents.ts
Define the 5 micro-agent functions with focused prompts
Each function accepts only the data it needs
Each function returns its slice of BuildReasoning
Include per-agent cascade (try 3-5 best models)

Provide in chunks so you don't break.

---