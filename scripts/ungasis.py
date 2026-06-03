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
    'version': {'script': None, 'description': 'Show UNGASIS version and stats', 'alias': ['v']}
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
    run_script('quality-score.py')
    print()
    graph_path = os.path.join(ROOT_DIR, 'graphify-out', 'graph.json')
    if os.path.exists(graph_path):
        size_mb = os.path.getsize(graph_path) / (1024 * 1024)
        print(f"  Knowledge graph: {size_mb:.1f} MB")
    else:
        print("  Knowledge graph: not found (run graphify first)")
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
    critical_files = ['CONTEXT.md', 'GEMINI.md', 'AGENTS.md', 'LLM_CONTEXT.md', 'CONVENTIONS.md', '.gitignore']
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

def main():
    """Main.

    Args/Returns if relevant.
    """
    if len(sys.argv) < 2:
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
