#!/usr/bin/env python3
"""UNGASIS CLI — Unified command interface for UNGASIS OS v5.0
Usage: python scripts/ungasis.py [command] [args]
"""
import sys
import os
import subprocess

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT_DIR = os.path.dirname(SCRIPT_DIR)

COMMANDS = {
    'pulse': {'script': 'daily-pulse.py', 'description': 'Generate morning situation report', 'alias': ['p', 'morning']},
    'warn': {'script': 'warn-check.py', 'description': 'Check all warning conditions', 'alias': ['w', 'warnings', 'check']},
    'score': {'script': 'quality-score.py', 'description': 'Score a markdown file (1-10) or batch mode', 'alias': ['q', 'quality']},
    'sweep': {'script': 'tag_sweep.py', 'description': 'Scan for TODOs and stale files', 'alias': ['s', 'tags']},
    'graph': {'script': 'graph-search.py', 'description': 'Search the knowledge graph', 'alias': ['g', 'search', 'find']},
    'graph-rebuild': {
        'script': 'graphify-run.py',
        'description': 'Rebuild knowledge graph with auto-failover',
        'alias': ['rebuild', 'reindex'],
    },
    'graph-update': {
        'script': 'graphify-run.py',
        'description': 'Update knowledge graph (incremental)',
        'alias': ['update'],
    },
    'research': {
        'script': None, 'description': 'Run research scripts (github, hn, feeds, youtube, all)', 'alias': ['r', 'scout'],
        'sub': {
            'github': 'research-github.py', 'hn': 'research-hn.py', 'feeds': 'research-feeds.py', 'youtube': 'research-youtube.py',
            'all': ['research-github.py', 'research-hn.py', 'research-feeds.py', 'research-youtube.py']
        }
    },
    'feedback': {
        'script': None, 'description': 'Run feedback loop scripts (all, quality, routing, retro, energy)', 'alias': ['f', 'loops'],
        'sub': {
            'adoption': 'feedback-close.py', 'quality': 'quality-close.py', 'routing': 'routing-close.py',
            'retro': 'retro-close.py', 'energy': 'energy-close.py',
            'all': ['feedback-close.py', 'quality-close.py', 'routing-close.py', 'retro-close.py', 'energy-close.py']
        }
    },
    'health': {'script': None, 'description': 'Run full health check (pulse + warn + score defaults)', 'alias': ['h']},
    'test': {'script': None, 'description': 'Run smoke tests on all scripts', 'alias': ['t']},
    'backup': {'script': None, 'description': 'Create timestamped backup ZIP of critical files', 'alias': ['b']},
    'version': {'script': None, 'description': 'Show UNGASIS version and stats', 'alias': ['v']},
    'spec': {'script': None, 'description': 'Create a new SDD spec from template', 'alias': []},
    'decide': {'script': None, 'description': 'Create a new ADR (Architecture Decision Record)', 'alias': []},
    'preset': {'script': None, 'description': 'Activate a workflow preset', 'alias': []},
    'foreman': {'script': None, 'description': 'Show Foreman routing status', 'alias': []}
}

def run_script(script_name, extra_args=None):
    """Run script.

    Args/Returns if relevant.
    """
    script_path = os.path.join(SCRIPT_DIR, script_name)
    if not os.path.exists(script_path):
        print(f"Error: Script not found: {script_path}")
        return 1
    cmd = [sys.executable, script_path]
    if extra_args: cmd.extend(extra_args)
    return subprocess.run(cmd, cwd=ROOT_DIR).returncode

def cmd_health(args):
    """Cmd health.

    Args/Returns if relevant.
    """
    print("=" * 50 + "\n  UNGASIS Health Check\n" + "=" * 50 + "\n")
    run_script('daily-pulse.py')
    print()
    run_script('warn-check.py')
    print()
    run_script('quality-score.py', ['--no-log'])
    print()
    # Token budget (nonzero exit at high usage is ignored by run_script)
    run_script('token-budget.py')
    print()
    graph_path = os.path.join(ROOT_DIR, 'graphify-out', 'graph.json')
    if os.path.exists(graph_path):
        size_mb = os.path.getsize(graph_path) / (1024 * 1024)
        print(f"  Knowledge graph: {size_mb:.1f} MB")
    else:
        print("  Knowledge graph: not found (run graphify first)")
    # Branch sync vs last-known origin/main (local refs only, no network)
    try:
        res = subprocess.run(
            ["git", "rev-list", "--left-right", "--count", "origin/main...HEAD"],
            capture_output=True, text=True, check=True, cwd=ROOT_DIR)
        behind, ahead = res.stdout.split()
        print(f"  Branch sync (origin/main...HEAD): {behind} behind / {ahead} ahead")
    except Exception:
        print("  Branch sync: unknown")
    print("\n" + "=" * 50 + "\n  Health check complete.\n" + "=" * 50)
    return 0

def cmd_test(args):
    """Cmd test.

    Args/Returns if relevant.
    """
    print("UNGASIS Smoke Tests\n" + "=" * 40)
    scripts_to_test = ['daily-pulse.py', 'warn-check.py', 'quality-score.py']
    passed = failed = 0
    for s in scripts_to_test:
        script_path = os.path.join(SCRIPT_DIR, s)
        if os.path.exists(script_path):
            try:
                res = subprocess.run([sys.executable, script_path], capture_output=True, text=True, encoding='utf-8', errors='ignore', timeout=30, cwd=ROOT_DIR)
                if res.returncode == 0:
                    print(f"  PASS: {s}")
                    passed += 1
                else:
                    print(f"  FAIL: {s} (exit code {res.returncode})")
                    if res.stderr: print(f"        {res.stderr[:200]}")
                    failed += 1
            except Exception as e:
                print(f"  ERROR: {s} ({e})"); failed += 1
        else:
            print(f"  MISSING: {s}"); failed += 1
    # Run unit tests
    test_path = os.path.join(SCRIPT_DIR, 'tests', 'test_parsers.py')
    if os.path.exists(test_path):
        print("\n--- Unit Tests ---")
        result = subprocess.run(
            [sys.executable, '-m', 'unittest', test_path, '-v'],
            capture_output=True, text=True, timeout=30,
            cwd=ROOT_DIR, env={**os.environ, 'PYTHONIOENCODING': 'utf-8'}
        )
        if result.stdout:
            print(result.stdout)
        if result.stderr:
            print(result.stderr)
        if result.returncode != 0:
            failed += 1

    print("=" * 40 + f"\nResults: {passed} passed, {failed} failed, {passed + failed} total")
    return 0 if failed == 0 else 1

def cmd_backup(args):
    """Cmd backup.

    Args/Returns if relevant.
    """
    import zipfile
    from datetime import datetime
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    zip_name = f"ungasis-backup-{timestamp}.zip"
    zip_path = os.path.join(ROOT_DIR, zip_name)
    critical_folders = ['.ungasis', '.agents', '.gemini', '.clinerules', '.mcp', 'config', 'scripts', 'docs', 'knowledge', 'context', 'projects']
    critical_files = ['CONTEXT.md', 'GEMINI.md', 'CLAUDE.md', 'LLM_CONTEXT.md', 'CONVENTIONS.md', '.gitignore']
    count = 0
    with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zf:
        for f in critical_files:
            fpath = os.path.join(ROOT_DIR, f)
            if os.path.exists(fpath):
                zf.write(fpath, f)
                count += 1
        for folder in critical_folders:
            folder_path = os.path.join(ROOT_DIR, folder)
            if os.path.isdir(folder_path):
                for dirpath, _, filenames in os.walk(folder_path):
                    for fn in filenames:
                        full = os.path.join(dirpath, fn)
                        rel = os.path.relpath(full, ROOT_DIR)
                        zf.write(full, rel)
                        count += 1
    print(f"Backup created: {zip_name}\nFiles: {count}\nSize: {os.path.getsize(zip_path) / 1024:.0f} KB")
    return 0

def cmd_version(args):
    """Cmd version.

    Args/Returns if relevant.
    """
    context_path = os.path.join(ROOT_DIR, 'CONTEXT.md')
    sprint_count = 0
    if os.path.exists(context_path):
        with open(context_path, 'r', encoding='utf-8') as f:
            for line in f:
                if line.startswith('## Sprint') or line.startswith('## Session Handoff'):
                    sprint_count += 1
    file_count = sum(len(files) for _, _, files in os.walk(ROOT_DIR))
    print(f"UNGASIS OS v5.0 — JARVIS-Fabricator\n  Sprints completed: {sprint_count}\n  Active files: {file_count}\n  Automation scripts: 13\n  Location: {ROOT_DIR}")
    return 0

def cmd_spec(args):
    """Cmd spec."""
    if not args:
        print("Usage: ungasis spec <feature-name>")
        return 1
    feature_name = args[0]
    print(f"ungasis spec {feature_name}")
    print(f"Creates specs/{feature_name}.md from template")
    
    template_path = os.path.join(ROOT_DIR, 'specs', 'TEMPLATE.md')
    out_dir = os.path.join(ROOT_DIR, 'specs')
    out_path = os.path.join(out_dir, f"{feature_name}.md")
    
    os.makedirs(out_dir, exist_ok=True)
    if os.path.exists(template_path):
        with open(template_path, 'r', encoding='utf-8') as f:
            content = f.read()
        content = content.replace('[Feature Name]', feature_name)
        with open(out_path, 'w', encoding='utf-8') as f:
            f.write(content)
    else:
        with open(out_path, 'w', encoding='utf-8') as f:
            f.write(f"# Spec: {feature_name}\n\nGenerated from ungasis spec stub.")
            
    print(f"Spec created: specs/{feature_name}.md")
    return 0

def cmd_decide(args):
    """Cmd decide."""
    if not args:
        print("Usage: ungasis decide <slug>")
        return 1
    slug = args[0]
    print(f"ungasis decide {slug}")
    
    import re
    import datetime
    decisions_dir = os.path.join(ROOT_DIR, '.ungasis', 'decisions')
    os.makedirs(decisions_dir, exist_ok=True)
    
    highest = 0
    if os.path.exists(decisions_dir):
        for fn in os.listdir(decisions_dir):
            m = re.match(r'ADR-(\d+)-', fn)
            if m:
                highest = max(highest, int(m.group(1)))
            
    next_num = f"{highest + 1:03d}"
    out_name = f"ADR-{next_num}-{slug}.md"
    out_path = os.path.join(decisions_dir, out_name)
    
    template_path = os.path.join(decisions_dir, 'TEMPLATE.md')
    today = datetime.datetime.now().strftime('%Y-%m-%d')
    
    if os.path.exists(template_path):
        with open(template_path, 'r', encoding='utf-8') as f:
            content = f.read()
        content = content.replace('[YYYY-MM-DD]', today)
        with open(out_path, 'w', encoding='utf-8') as f:
            f.write(content)
    else:
        with open(out_path, 'w', encoding='utf-8') as f:
            f.write(f"# ADR {next_num}: {slug}\nDate: {today}\n")
            
    print(f"Decision record created: .ungasis/decisions/{out_name}")
    return 0

def cmd_preset(args):
    """Cmd preset."""
    presets_dir = os.path.join(ROOT_DIR, '.ungasis', 'presets')
    os.makedirs(presets_dir, exist_ok=True)
    
    if not args:
        for fn in os.listdir(presets_dir):
            if fn.endswith('.md') and fn != '.gitkeep':
                print(fn)
        return 0
        
    name = args[0]
    preset_path = os.path.join(presets_dir, f"{name}.md")
    
    if os.path.exists(preset_path):
        with open(preset_path, 'r', encoding='utf-8') as f:
            print(f.read())
    else:
        print("Preset not found. Available: ")
        for fn in os.listdir(presets_dir):
            if fn.endswith('.md') and fn != '.gitkeep':
                print(fn)
    return 0

def cmd_foreman(args):
    """Cmd foreman."""
    print("| Tier | Provider | Status |")
    print("|---|---|---|")
    print("| T1-Free | Google AI Pro | Active |")
    print("| T1-Free | Cerebras | Active |")
    print("| T1-Free | Groq | Active (key #2) |")
    print("| T2-Paid | Claude Pro | Active |")
    print("| T3-Async | Jules | Active |")
    print("| T3-Async | GitHub Actions | Active |")
    print("\nForeman routing: Tier 1 → Tier 2 → Tier 3")
    print("Claude Pro status: Active")
    return 0

def main():
    """Main.

    Args/Returns if relevant.
    """
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

    if len(sys.argv) < 2 or sys.argv[1] in ('--help', '-h'):
        print("UNGASIS CLI v1.0\nUsage: python scripts/ungasis.py [command] [args]\n\nCommands:")
        for name, info in COMMANDS.items():
            aliases = ', '.join(info.get('alias', []))
            print(f"  {name:12s} {info['description']}")
            if aliases: print(f"  {'':12s} aliases: {aliases}")
        print("\nExamples:\n  python scripts/ungasis.py pulse\n  python scripts/ungasis.py score .ungasis/memory/memory-rules.md\n  python scripts/ungasis.py research all\n  python scripts/ungasis.py health\n  python scripts/ungasis.py test\n  python scripts/ungasis.py backup")
        return 0

    cmd_name = sys.argv[1].lower()
    extra_args = sys.argv[2:]
    resolved = None
    for name, info in COMMANDS.items():
        if cmd_name == name or cmd_name in info.get('alias', []):
            resolved = name
            break

    if not resolved:
        print(f"Unknown command: {cmd_name}\nRun without arguments to see available commands.")
        return 1

    info = COMMANDS[resolved]
    if resolved == 'health': return cmd_health(extra_args)
    if resolved == 'test': return cmd_test(extra_args)
    if resolved == 'backup': return cmd_backup(extra_args)
    if resolved == 'version': return cmd_version(extra_args)
    if resolved == 'spec': return cmd_spec(extra_args)
    if resolved == 'decide': return cmd_decide(extra_args)
    if resolved == 'preset': return cmd_preset(extra_args)
    if resolved == 'foreman': return cmd_foreman(extra_args)

    if resolved == 'graph-update':
        extra_args = ['--update'] + extra_args

    if info.get('sub'):
        sub = extra_args[0] if extra_args else 'all'
        sub_scripts = info['sub'].get(sub)
        if not sub_scripts:
            print(f"Unknown sub-command: {sub}\nAvailable: {', '.join(info['sub'].keys())}")
            return 1
        if isinstance(sub_scripts, list):
            for s in sub_scripts: run_script(s, extra_args[1:])
            return 0
        return run_script(sub_scripts, extra_args[1:])

    return run_script(info['script'], extra_args)

if __name__ == '__main__':
    sys.exit(main())
