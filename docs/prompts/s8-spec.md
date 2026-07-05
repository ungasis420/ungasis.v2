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

## 9. Phone (S8-P15 opt)
Termux+SSH OR Tailscale+webhook. Same "ungasis chat" cmd.
Latency ≤5s T0-1.

## 10. Voice (S8-P16 opt)
Browser Web Speech (Whisper STT + Piper TTS). Text first.

## 11. Success (measurable)
S8-1 Claude usage ≤20% chats
S8-2 T0-2 handles ≥80% Q
S8-3 RAG faithfulness ≥0.85
S8-4 3+ outages survived via fallback
S8-5 ≥90% cite wiki source
S8-6 monthly API ≤$5
S8-7 phone-usable
S8-8 latency <3s T0-1

## 12. Compound loop (Stage 4 tie)
Useful answers→outputs/. Weekly re-ingest→wiki via v3.
Smarter per usage (Karpathy).

## 13. Warnings
- Subs ≠ API budget (R15 gate)
- Free tier limits change quarterly (auto-fallback required)
- Client data (Newmont/KF) NEVER free tier (R19)
- Internet down = JARVIS down
  Emergency: grep -r knowledge/wiki/ (T-1)

## 14. Out of scope
Local LLM (rejected). Fine-tune. Multi-user auth. Web UI.

## 15. Build sequence
S8-P10 spec DONE (this)
S8-P11 router.py       2h
S8-P12 rag.py          1.5h
S8-P12b index.py       1h
S8-P13 chat.py         1.5h
S8-P14 tracker.py      1h
S8-P14b RAGAS 20-Q     30m
S8-P15 phone           1h
S8-P16 voice (OPT)     2h
Total text-JARVIS ~8.5h | +voice+phone ~11.5h
Marginal cost $0-5/mo
