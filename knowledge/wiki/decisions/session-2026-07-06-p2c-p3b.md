# Session 2026-07-06 — P2c + P3b

## Ships (2 commits, pushed to origin/main)
- 4c24677 fix(wiki): canonical count 55 (rglob + INFRA skip)
- d49106a docs(p3): harden v3 ingest spec — 8 patches

## Gaps closed
C1 wiki 3-way count | C4 log schema | C5 footer+log.md
C8 hit-rate gate | C9 usage_scope | C10 Chroma clarity
C11 manifest example | C13 rollback §11 | C15 gate wiring
9-vs-7 corpus reconciled (7 usable + 2 deferred)

## Lessons learned (durable)
1. Two counter bugs can cancel: find=59 overcounts (infra),
   lint=54 undercounts (whitelist). Truth=55 needs both fixes.
2. Recursive scan + explicit INFRA skip beats whitelist
   (location-independent, self-corrects future misfiles).
3. Skinny prompt cadence: 6/6 CLEAN verdicts, 0 rework —
   diagnose-first + escape hatches + 3-strike stop works.
4. Post-hook idempotency (commit 952ebf4) pays compound
   value — 0 noise commits this session.

## Progress
JARVIS: 38% → 42% (Foundation ✅, Capture spec HARDENED)
Ingest: still 0/9 = 0% (P4a is next chat's job)

## Next
N0-lite (expect d49106a) → P4a build youtube-ingest-v3.py
