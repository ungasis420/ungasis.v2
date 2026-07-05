# Stage 8 · Cloud JARVIS Chat SPEC (2026-07-06, paper, part 1/2)

## 1. Purpose
Cloud router chat on ACER. Wiki-first, escalate to cheapest
capable LLM. Target: -80% Claude Pro burn/day.

## 2. Prereq
Stage 1 done (wiki ≥68). No build before.

## 3. 5-tier router
T0 Local RAG (Chroma+Gemini embed free)     $0
T1 Groq/Cerebras/OpenRouter (free llama)    $0
T2 Gemini Flash (1500/day free)             $0
T3 Gemini Pro via Agy CLI                   sub
T4 Claude Pro via CLI                       sub

## 4. Routing rules
recall→T0 cite path | summarize→T1 | long ctx→T2 |
research→T3 | architecture→T4 | Newmont/KF→T3-4 ONLY (privacy)

## 5. Files
scripts/jarvis-chat.py         shell ~200 lines
scripts/jarvis-router.py       5-tier
scripts/jarvis-rag.py          Chroma+embed
scripts/jarvis-tracker.py      quota+cost (R12)
scripts/jarvis-index.py        rebuild index
.ungasis/jarvis/config.yml     tiers, budget caps
.ungasis/jarvis/quota.json     daily counters
.ungasis/jarvis/index/         vector store
outputs/YYYY-MM-DD_topic.md    saved answers

## 6. Subscription-first (R15)
Prefer claude/agy CLI wrappers. Raw API only for free tier.
Hard cap $5/mo API. Detect ANTHROPIC_API_KEY→warn.
Require explicit API_OK to bill.

## 7. Fallback chain (R15)
429→next tier: Groq→Cerebras→OpenRouter→GemFlash→GemPro→Claude
Log every fallback to sessions.jsonl.

## 8. RAG faithfulness
T0 answers MUST cite wiki path. Hit rate ≥90%.
Faithfulness ≥0.85 on 20-Q. No uncited claims.

(§9-15 appended in S8-P10b commit)
