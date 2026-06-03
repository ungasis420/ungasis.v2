# Source Fidelity Notes

## What was available

Merged inputs:

- `ai_augmented_project_repo_template.zip`
- `AI-Project-Operating-System-v1.0.zip`
- `ai-project-os-v2 (1).zip`
- `ai-project-os-v2.zip`

Official docs checked during master update:

- Claude Code memory / `CLAUDE.md`: https://code.claude.com/docs/en/memory
- Claude Code settings and permissions: https://code.claude.com/docs/en/settings
- Claude Code skills: https://code.claude.com/docs/en/slash-commands
- Claude Code subagents: https://code.claude.com/docs/en/sub-agents
- Claude Code hooks: https://code.claude.com/docs/en/hooks
- Claude Code best practices: https://code.claude.com/docs/en/best-practices

## Important limitation

Full YouTube transcripts were not available in the working files. The video-derived lessons in this template are therefore treated as a structured synthesis from the provided links, attached ZIP content, and official docs - not as verified verbatim transcript extraction.

## How to upgrade fidelity later

1. Paste each transcript into a session.
2. Run `.claude/skills/video-lesson-extractor`.
3. Save extracted lessons to `docs/VIDEO_LESSON_CAPTURE.md`.
4. Update `docs/SOURCE_FIDELITY.md` with source level: transcript / notes / metadata / secondary synthesis.
5. Run `python scripts/verify_template.py`.

## Additional requested video links checked in v4

- Austin Marchese - How to 10x Your Claude Code Projects (Karpathy's Method): https://www.youtube.com/watch?v=yfeHoOkn2TI
- Austin Marchese - How Anthropic Employees ACTUALLY Use Claude Code to Grow: https://www.youtube.com/watch?v=BX5dLXe6CTI
- Austin Marchese - STOP Using Claude to Code. Do THIS Instead.: https://www.youtube.com/watch?v=6ad-LyammTI
- Dream Labs AI - This "Karpathy file" will 10x your claude output (132,000 Github Stars!): https://www.youtube.com/watch?v=hzQie4EucY0

Transcripts were still not available during the v4 patch. These sources are represented as title/theme-based coverage plus official Claude Code documentation alignment. See `docs/NEW_VIDEO_COVERAGE_AUDIT.md`.
