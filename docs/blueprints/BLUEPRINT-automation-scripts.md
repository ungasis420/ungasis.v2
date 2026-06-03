# BLUEPRINT-automation-scripts.md — Sprint F20b Blueprint

## 1. EXECUTIVE SUMMARY

| Metric | Value |
|---|---|
| **Goal** | Make UNGASIS JARVIS active through Python automation scripts |
| **Type** | Script Development & Automation |
| **Project** | UNGASIS OS |
| **Total Files** | 5 (3 scripts, 1 README, 1 update) |
| **Model** | Gemini 3.5 Flash |
| **Risk Level** | Low |

---

## 2. RESEARCH FINDINGS

### Precedents
- `scripts/tag_sweep.py`: Uses `os.walk`, regex matching, standard file manipulation, and appends entries to `queue.md` and `tag-log.md`. This is our reference implementation.

### Patterns
- **No external dependencies**: Use only Python stdlib (`os`, `sys`, `re`, `datetime`, `subprocess`).
- **Path handling**: Use `os.path.join` and relative paths to ensure Windows and cross-platform compatibility.
- **Encoding**: Always open files using `encoding="utf-8"` and `errors="ignore"` to prevent crashes on non-Unicode characters.

### Gotchas
- **Missing Files**: Files like `scout-log.md`, `warning-log.md` might be empty or missing. Use `try-except` blocks for all file reads and handle missing paths gracefully.
- **Git subprocess**: Personal PC might not have git configured in all folders or git command might return errors. Catch `subprocess.CalledProcessError` or `FileNotFoundError` and return a fallback placeholder (e.g. "Unknown time").

---

## 3. ARCHITECTURE

### Folder Structure
```
scripts/
  ├── daily-pulse.py      # Generate morning status report
  ├── warn-check.py       # Check for warning conditions and log them
  ├── quality-score.py    # Evaluate file quality on a 1-10 scale
  └── README.md           # Documentation for automation scripts
```

### Component Data Flow
1. **Daily Pulse**: Read files (`CONTEXT.md`, `queue.md`, `warning-log.md`, `portfolio-overview.md`, `scout-log.md`, `git status`) -> stdout + `.ungasis/jarvis-core/daily-pulse-latest.md`.
2. **Warning Check**: Scan files -> detect warning/critical issues -> stdout + append to `.ungasis/warnings/warning-log.md`.
3. **Quality Score**: Evaluate file -> score 5 dimensions -> stdout + append to `.ungasis/quality/quality-log.md`.

---

## 4. TASK BREAKDOWN

| ID | Task Description | File(s) | Agent | Dependencies | Sprint |
|---|---|---|---|---|---|
| F20b-01 | Delete leftover git commit message temp file | `.git_commit_msg` | Builder | None | F20b |
| F20b-02 | Build the `daily-pulse` script | `scripts/daily-pulse.py` | Builder | None | F20b |
| F20b-03 | Build the `warn-check` script | `scripts/warn-check.py` | Builder | None | F20b |
| F20b-04 | Build the `quality-score` script | `scripts/quality-score.py` | Builder | None | F20b |
| F20b-05 | Build the scripts documentation README | `scripts/README.md` | Builder | F20b-02, -03, -04 | F20b |
| F20b-06 | Update Context file with sprint accomplishments | `CONTEXT.md` | Builder | All above | F20b |

---

## 5. SPRINT PLAN

### Sprint F20b: Automation Scripts
- **Tasks**: F20b-01 to F20b-06
- **Agent**: Builder
- **Gate**: Run all 3 scripts -> verify outputs -> @quality-auditor check -> @graphify-watchdog re-index -> Git commit.

---

## 6. ACCEPTANCE CRITERIA

- [ ] All python scripts run under standard Python 3.8+ command interpreter.
- [ ] No `pip install` required.
- [ ] Handles missing files without crashing.
- [ ] Text styling uses clear separators and emojis.
- [ ] Code is under 200 lines per script.
- [ ] README.md contains staleness footer and scheduling recommendations.
- [ ] CONTEXT.md updated with F20b session handoff details.

---

## 7. RISK ASSESSMENT

| Risk | Impact | Likelihood | Mitigation |
|---|---|---|---|
| Script crashes on missing files | High | Medium | Use generic `try/except` for file ops and fallback values |
| Date parsing errors for Scout log | Medium | Low | Use permissive regex `\b20\d{2}[-/]\d{2}[-/]\d{2}\b` and parse dates safely |
| Git commands not working in workspace | Medium | Low | Catch `FileNotFoundError` and subprocess errors |

---

## 8. KICKOFF PROMPT FOR BUILDER

Activate the Builder to execute Sprint F20b following the plan in `docs/blueprints/BLUEPRINT-automation-scripts.md`.

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
