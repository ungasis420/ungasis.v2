#!/usr/bin/env python3
"""
Graphify Multi-Pass Auto-Failover Wrapper v2.

Runs graphify MULTIPLE TIMES with DIFFERENT backends.
Each pass only processes chunks that failed in previous passes
(graphify caches successful chunks automatically).

Usage:
  python scripts/graphify-run.py                    # full re-index
  python scripts/graphify-run.py --update           # incremental update
  python scripts/graphify-run.py --label            # re-label communities only

Strategy:
  Pass 1: groq       (14.4K tokens/min, handles ~30-40 chunks)
  Pass 2: cerebras   (generous free tier, handles next batch)
  Pass 3: openrouter (variable limits, handles next batch)
  Pass 4: together   (60 RPM, mops up stragglers)
  Pass 5: mistral    (1 RPM, slow but works)
  Pass 6: gemini     (20 req/day, last resort — skip if <20 chunks remain)

Each pass: graphify caches successes → next pass only retries failures.
"""
import subprocess
import sys
import os
import time
import re

try:
    sys.stdout.reconfigure(encoding='utf-8')
    sys.stderr.reconfigure(encoding='utf-8')
except AttributeError:
    pass


# Provider priority order (highest rate limit first)
PROVIDERS = [
    ('groq',       'GROQ_API_KEY',       '14.4K tokens/min — best for bulk'),
    ('cerebras',   'CEREBRAS_API_KEY',    'Generous free tier — fast backup'),
    ('openrouter', 'OPENROUTER_API_KEY',  'Variable limits — flexible'),
    ('together',   'TOGETHER_API_KEY',    '60 RPM — reliable'),
    ('mistral',    'MISTRAL_API_KEY',     '1 RPM — slow but works'),
    ('gemini',     'GOOGLE_AI_API_KEY',   '20 req/day — skip unless few chunks left'),
]

# Patterns indicating chunks failed
FAILURE_PATTERNS = [
    r'(\d+)/(\d+) semantic chunk\(s\) failed',
    r'chunk \d+/\d+ failed',
    r'rate.?limit',
    r'429',
    r'quota.?exceeded',
    r'resource.?exhausted',
    r'timed? ?out',
]

def load_env():
    """Load .env file if it exists."""
    env_path = os.path.join(os.path.dirname(os.path.dirname(
        os.path.abspath(__file__))), '.env')
    if os.path.exists(env_path):
        with open(env_path, 'r') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    key, val = line.split('=', 1)
                    os.environ.setdefault(key.strip(), val.strip())

def get_available_providers():
    """Return providers that have API keys set."""
    available = []
    for name, env_key, notes in PROVIDERS:
        if os.environ.get(env_key, '').strip():
            available.append((name, env_key, notes))
    return available

def parse_chunk_failures(output):
    """Extract failed/total chunk counts from graphify output."""
    match = re.search(r'(\d+)/(\d+) semantic chunk\(s\) failed', output)
    if match:
        return int(match.group(1)), int(match.group(2))
    # Check for "chunk X/Y failed" pattern and count occurrences
    chunk_fails = re.findall(r'chunk \d+/(\d+) failed', output)
    if chunk_fails:
        total = int(chunk_fails[0])
        failed = len(chunk_fails)
        return failed, total
    return 0, 0

def run_graphify(backend, extra_args, pass_num, total_passes):
    """Run graphify with a specific backend. Return (success, failed, total, output)."""
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    
    # Build command
    is_label = '--label' in extra_args
    if is_label:
        cmd = ['graphify', 'label', '.', '--backend', backend]
        extra = [a for a in extra_args if a != '--label']
        cmd.extend(extra)
    else:
        cmd = ['graphify', '.']
        cmd.extend([a for a in extra_args])
        cmd.extend(['--backend', backend])

    print(f"\n{'─' * 55}")
    print(f"  Pass {pass_num}/{total_passes}: {backend}")
    print(f"  Command: {' '.join(cmd)}")
    print(f"{'─' * 55}")

    try:
        result = subprocess.run(
            cmd,
            capture_output=True,
            text=True,
            timeout=900,  # 15 min timeout per pass
            cwd=root,
            env={**os.environ, 'PYTHONIOENCODING': 'utf-8'},
        )
        output = (result.stdout or '') + (result.stderr or '')
        
        # Print output in real-time style
        for line in output.strip().split('\n')[-20:]:
            if line.strip():
                print(f"  {line}")

        failed, total = parse_chunk_failures(output)
        
        if failed == 0 and result.returncode == 0:
            return True, 0, total, output
        elif failed > 0:
            print(f"\n  ⚠️  {backend}: {failed}/{total} chunks still failed")
            return False, failed, total, output
        elif result.returncode != 0:
            print(f"\n  ⚠️  {backend}: Exited with code {result.returncode}")
            return False, -1, 0, output
        else:
            return True, 0, total, output

    except subprocess.TimeoutExpired:
        print(f"\n  ⚠️  {backend}: Timed out (>15 min)")
        return False, -1, 0, "Timeout"
    except FileNotFoundError:
        print("\n  ❌ graphify not found. Install: pip install graphifyy")
        return False, -1, 0, "Not installed"
    except Exception as e:
        print(f"\n  ❌ {backend}: Error — {e}")
        return False, -1, 0, str(e)

def main():
    extra_args = [a for a in sys.argv[1:] if a != '--']
    
    print("=" * 55)
    print("  Graphify Multi-Pass Auto-Failover v2")
    print("=" * 55)

    # Load .env
    load_env()

    available = get_available_providers()
    if not available:
        print("\n  ❌ No API keys found.")
        print("  Load your .env first:")
        print("  Get-Content .env | ForEach-Object {")
        print("    if ($_ -match '^([^#][^=]+)=(.+)$') {")
        print("      Set-Item \"env:$($Matches[1].Trim())\" $Matches[2].Trim()")
        print("    }")
        print("  }")
        return 1

    print(f"\n  Available providers: {len(available)}")
    for i, (name, _, notes) in enumerate(available, 1):
        print(f"    {i}. {name} — {notes}")

    # Multi-pass: try each provider, each pass handles remaining failed chunks
    remaining_failed = None
    last_total = 0
    
    for i, (name, env_key, notes) in enumerate(available, 1):
        # Skip gemini if many chunks remain (20 req/day too low)
        if name == 'gemini' and remaining_failed and remaining_failed > 25:
            print(f"\n  ⏭️  Skipping gemini ({remaining_failed} chunks remaining > 25 limit)")
            continue

        success, failed, total, output = run_graphify(
            name, extra_args, i, len(available)
        )
        
        if total > 0:
            last_total = total

        if success and failed == 0:
            print(f"\n{'=' * 55}")
            print(f"  ✅ ALL CHUNKS COMPLETE after {i} pass(es)!")
            print(f"  Last provider used: {name}")
            print(f"{'=' * 55}")
            return 0

        if failed > 0:
            remaining_failed = failed
            succeeded_this_pass = (last_total - failed) if last_total > 0 else "unknown"
            print(f"  📊 Progress: {failed} chunks remaining ({succeeded_this_pass} succeeded across passes)")
        
        if failed == 0 and not success:
            # Command failed but no chunk info — might be a different error
            remaining_failed = remaining_failed  # keep previous count
        
        # Wait between passes for rate limits to partially reset
        if i < len(available):
            wait_time = 10
            print(f"\n  ⏳ Waiting {wait_time}s for rate limits to cool down...")
            time.sleep(wait_time)

    # After all passes
    if remaining_failed and remaining_failed > 0:
        print(f"\n{'=' * 55}")
        print(f"  ⚠️  {remaining_failed} chunks still failed after all {len(available)} providers")
        print(f"{'=' * 55}")
        print("  Options:")
        print("  1. Wait 1 hour, run again (rate limits reset)")
        print("  2. Run: python scripts/graphify-run.py --update")
        print("     (will only process the remaining failed chunks)")
        print("  3. Each run makes progress — repeat until 0 failures")
        return 1
    else:
        print(f"\n  ✅ Done!")
        return 0

if __name__ == '__main__':
    sys.exit(main())

# Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
