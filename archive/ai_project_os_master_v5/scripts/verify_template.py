#!/usr/bin/env python3
import hashlib
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

REQUIRED_FILES = [
    'README.md',
    'LLM_CONTEXT.md',
    'llms.txt',
    'PROJECT_START_HERE.md',
    'AGENTS.md',
    'CLAUDE.md',
    '.gitignore',
    '.env.example',
    '.claude/settings.example.json',
    '.claude/settings.local.example.json',
    'docs/MERGE_AUDIT.md',
    'docs/GAP_COVERAGE_MATRIX.md',
    'docs/SOURCE_FIDELITY.md',
    'docs/CLAUDE_CODE_CURRENT_NOTES.md',
    'docs/NEW_VIDEO_COVERAGE_AUDIT.md',
    'docs/KARPATHY_CONTEXT_FILE.md',
    'docs/SPEC_FIRST_AGENTIC_DEVELOPMENT.md',
    'docs/GROWTH_EXPERIMENT_OS.md',
    'docs/KARPATHY_PRINCIPLES_AND_COMMUNITY_RULES.md',
    'docs/CONTEXT_ENGINEERING_DISCIPLINE.md',
    'docs/LLM_KNOWLEDGE_BASE.md',
    'docs/SPEC_DRIVEN_DEVELOPMENT_OS.md',
    'docs/AUTO_ACCEPT_SELF_VERIFICATION.md',
    'docs/AUTO_RESEARCH_LOOP.md',
    'docs/AUTO_RESEARCH_LOG.md',
    'docs/CROSS_FUNCTIONAL_ENABLEMENT.md',
    'docs/RESEARCHER_NOTES_COVERAGE_AUDIT.md',
    'docs/V5_MERGE_AUDIT.md',
    'docs/V5_GAP_COVERAGE_MATRIX.md',
    'docs/PROJECT_BRIEF.md',
    'docs/QUALITY_BAR.md',
    'docs/HANDOFF.md',
    'knowledge/index.md',
    'knowledge/raw/README.md',
    'knowledge/wiki/README.md',
    'knowledge/schema/KNOWLEDGE_RULES.md',
    'specs/README.md',
    'specs/_template/requirements.md',
    'specs/_template/design.md',
    'specs/_template/tasks.md',
    'specs/_template/acceptance.md',
    'context/README.md',
    'context/domain.md',
    'context/stack.md',
    'context/user-profile.md',
    'workflows/project-kickoff.md',
    'workflows/build-iterate-verify.md',
    'workflows/context-engineering-loop.md',
    'workflows/knowledge-base-librarian-loop.md',
    'workflows/spec-driven-feature-loop.md',
    'workflows/auto-verify-loop.md',
    'workflows/auto-research-loop.md',
    'workflows/cross-functional-tool-loop.md',
    'workflows/community-safety-gate.md',
    'checklists/community_safety_rules.md',
    'checklists/context_engineering.md',
    'checklists/knowledge_base_ingestion.md',
    'checklists/auto_accept_safety.md',
    'checklists/spec_driven_development.md',
    'checklists/cross_functional_enablement.md',
    'scripts/context_budget_check.py',
    'scripts/generate_knowledge_index.py',
    'scripts/verify_template.py',
    'ungasis/layer_status.md',
]

REQUIRED_DIRS = [
    '.claude/agents', '.claude/commands', '.claude/hooks', '.claude/rules', '.claude/skills',
    'checklists', 'context', 'docs', 'prompts', 'scripts', 'templates', 'workflows', 'ungasis',
    'knowledge/raw', 'knowledge/wiki', 'knowledge/schema', 'specs/_template', 'outputs/logs'
]

REQUIRED_SKILLS = {
    'project-kickoff', 'plan-and-scope', 'implementation-loop', 'debug-one-bug', 'code-review',
    'verify-and-test', 'research-to-code', 'session-closer', 'video-lesson-extractor',
    'karpathy-context-file', 'spec-first-builder', 'growth-experiment-loop',
    'context-engineering', 'knowledge-librarian', 'improve-system', 'auto-research-loop',
    'auto-verify-loop', 'cross-functional-tool-builder', 'community-safety-gate', 'spec-driven-development'
}

SECRET_PATTERNS = [
    re.compile(r'(?i)(api[_-]?key|secret|token|password)\s*=\s*[A-Za-z0-9_\-]{20,}'),
    re.compile(r'-----BEGIN (RSA |EC |OPENSSH |PRIVATE )?PRIVATE KEY-----'),
    re.compile(r'(?i)sk-[A-Za-z0-9]{20,}'),
]

IGNORE_HASH = {'outputs/.keep', 'outputs/logs/.keep'}

TEXT_EXTENSIONS = {'.md', '.txt', '.json', '.py', '.sh', '.yml', '.yaml', '.example', ''}

def rel(path: Path) -> str:
    return str(path.relative_to(ROOT)).replace('\\', '/')

def sha(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()

def check_required(errors):
    for d in REQUIRED_DIRS:
        if not (ROOT / d).is_dir():
            errors.append(f'Missing required directory: {d}')
    for f in REQUIRED_FILES:
        if not (ROOT / f).is_file():
            errors.append(f'Missing required file: {f}')

def check_json(errors):
    for f in ['.claude/settings.example.json', '.claude/settings.local.example.json', 'repo-template.json']:
        p = ROOT / f
        if p.exists():
            try:
                json.loads(p.read_text(encoding='utf-8'))
            except Exception as e:
                errors.append(f'Invalid JSON in {f}: {e}')

def check_skills(errors):
    skills_dir = ROOT / '.claude' / 'skills'
    skills = sorted(p for p in skills_dir.iterdir() if p.is_dir())
    found = {p.name for p in skills}
    missing = sorted(REQUIRED_SKILLS - found)
    if missing:
        errors.append('Missing required skills: ' + ', '.join(missing))
    if len(skills) < 20:
        errors.append('Expected at least 20 Claude skills after v5 merge')
    for d in skills:
        skill = d / 'SKILL.md'
        if not skill.is_file():
            errors.append(f'Missing SKILL.md in {rel(d)}')
            continue
        text = skill.read_text(encoding='utf-8')
        if not text.startswith('---'):
            errors.append(f'SKILL.md missing YAML frontmatter: {rel(skill)}')
            continue
        front = text.split('---', 2)[1]
        if 'description:' not in front:
            errors.append(f'SKILL.md missing YAML description: {rel(skill)}')

def check_agents(errors):
    names = {}
    agents_dir = ROOT / '.claude' / 'agents'
    for p in agents_dir.glob('*.md'):
        text = p.read_text(encoding='utf-8')
        m = re.search(r'^name:\s*([a-z0-9-]+)\s*$', text, flags=re.M)
        if not m:
            errors.append(f'Agent missing name frontmatter: {rel(p)}')
            continue
        name = m.group(1)
        if name in names:
            errors.append(f'Duplicate agent name {name}: {rel(p)} and {names[name]}')
        names[name] = rel(p)
    if len(names) < 18:
        errors.append('Expected at least 18 Claude agents after v5 merge')

def check_command_skill_collisions(errors):
    commands_dir = ROOT / '.claude' / 'commands'
    skills_dir = ROOT / '.claude' / 'skills'
    command_names = {p.stem for p in commands_dir.glob('*.md')}
    skill_names = {p.name for p in skills_dir.iterdir() if p.is_dir()}
    collisions = sorted(command_names & skill_names)
    if collisions:
        errors.append('Command/skill name collision found: ' + ', '.join(collisions))

def check_no_legacy_roots(errors):
    if (ROOT / 'commands').exists():
        errors.append('Legacy root commands/ directory exists; use .claude/commands instead')
    if (ROOT / 'skills').exists():
        errors.append('Legacy root skills/ directory exists; use .claude/skills instead')

def check_duplicates(errors):
    hashes = {}
    for p in ROOT.rglob('*'):
        if not p.is_file():
            continue
        r = rel(p)
        if r in IGNORE_HASH:
            continue
        if any(part in {'.git', '__pycache__', '.venv', 'node_modules'} for part in p.parts):
            continue
        h = sha(p)
        hashes.setdefault(h, []).append(r)
    dupes = [v for v in hashes.values() if len(v) > 1]
    if dupes:
        errors.append('Exact duplicate file content found: ' + '; '.join(', '.join(v) for v in dupes[:10]))

def check_secret_patterns(errors):
    for p in ROOT.rglob('*'):
        if not p.is_file():
            continue
        if p.suffix not in TEXT_EXTENSIONS:
            continue
        r = rel(p)
        if any(part in {'.git', '__pycache__', '.venv', 'node_modules'} for part in p.parts):
            continue
        try:
            text = p.read_text(encoding='utf-8')
        except UnicodeDecodeError:
            continue
        for pat in SECRET_PATTERNS:
            if pat.search(text):
                errors.append(f'Potential real secret pattern in {r}')
                break

def check_v5_keywords(errors):
    targets = {
        'AGENTS.md': ['Think Before Coding', 'Simplicity First', 'Surgical Changes', 'Goal-Driven Execution', 'Fail-Loud Rule'],
        'docs/CONTEXT_ENGINEERING_DISCIPLINE.md': ['Acquire', 'Curate', 'Compress', 'Persist', 'Shed'],
        'docs/LLM_KNOWLEDGE_BASE.md': ['raw/', 'wiki/', 'schema/'],
        'docs/SPEC_DRIVEN_DEVELOPMENT_OS.md': ['interview', 'requirements', 'design', 'tasks', 'human review'],
    }
    for relpath, words in targets.items():
        text = (ROOT / relpath).read_text(encoding='utf-8')
        for word in words:
            if word not in text:
                errors.append(f'Missing v5 keyword {word!r} in {relpath}')

def main():
    errors = []
    check_required(errors)
    check_json(errors)
    check_skills(errors)
    check_agents(errors)
    check_command_skill_collisions(errors)
    check_no_legacy_roots(errors)
    check_duplicates(errors)
    check_secret_patterns(errors)
    check_v5_keywords(errors)

    total_files = sum(1 for p in ROOT.rglob('*') if p.is_file())
    total_skills = sum(1 for p in (ROOT / '.claude' / 'skills').iterdir() if p.is_dir())
    total_agents = sum(1 for p in (ROOT / '.claude' / 'agents').glob('*.md'))

    print('AI Project OS Master v5 verification')
    print(f'Root: {ROOT}')
    print(f'Files: {total_files}')
    print(f'Skills: {total_skills}')
    print(f'Agents: {total_agents}')

    if errors:
        print('\nFAILED:')
        for e in errors:
            print(f'- {e}')
        sys.exit(1)

    print('\nPASS: required files present, JSON valid, skills/agents valid, no command/skill collisions, no legacy duplicate roots, no exact duplicate content, no obvious real secrets, and v5 gap coverage keywords present.')

if __name__ == '__main__':
    main()
