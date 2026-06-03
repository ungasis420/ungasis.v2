#!/usr/bin/env python3
"""
Graphify Auto-Failover Wrapper.

Runs graphify with automatic provider rotation.
Tries providers in priority order until one succeeds.

Usage:
  python scripts/graphify-run.py                    # full re-index
  python scripts/graphify-run.py --update           # incremental update
  python scripts/graphify-run.py --cluster-only     # re-cluster only
  python scripts/graphify-run.py --label            # re-label communities only

Or via UNGASIS CLI:
  python scripts/ungasis.py graph-rebuild
  python scripts/ungasis.py graph-update
"""
import subprocess
import sys
import os
import time

try:
    sys.stdout.reconfigure(encoding='utf-8')
    sys.stderr.reconfigure(encoding='utf-8')
except AttributeError:
    pass

# Provider priority order (top = tried first)
# Each tuple: (name, env_key, notes)
PROVIDERS = [
    ('groq',       'GROQ_API_KEY',       'Fastest, 14.4K tokens/min free'),
    ('cerebras',   'CEREBRAS_API_KEY',    'Fast, generous free tier'),
    ('openrouter', 'OPENROUTER_API_KEY',  'Most models, variable limits'),
    ('together',   'TOGETHER_API_KEY',    'Good balance, 60 RPM free'),
    ('gemini',     'GOOGLE_AI_API_KEY',   'Default, but 20 req/day limit'),
]

# Error patterns that indicate rate limiting or quota exhaustion
RATE_LIMIT_PATTERNS = [
    'rate limit',
    'rate_limit',
    'quota exceeded',
    'resource_exhausted',
    '429',
    'too many requests',
    'exceeded your current quota',
    'all semantic chunks failed',
]

def load_env_file():
    """Load variables from .env file in project root if it exists."""
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    env_path = os.path.join(root, '.env')
    if os.path.exists(env_path):
        try:
            with open(env_path, 'r', encoding='utf-8', errors='ignore') as f:
                for line in f:
                    line = line.strip()
                    if line and not line.startswith('#') and '=' in line:
                        key, val = line.split('=', 1)
                        key = key.strip()
                        val = val.strip()
                        if (val.startswith('"') and val.endswith('"')) or (val.startswith("'") and val.endswith("'")):
                            val = val[1:-1]
                        if key and key not in os.environ:
                            os.environ[key] = val
        except Exception as e:
            print(f"Warning: Failed to load .env file: {e}")

def get_available_providers():
    """Return providers that have API keys set."""
    available = []
    for name, env_key, notes in PROVIDERS:
        keys = [env_key]
        if name == 'gemini':
            keys.append('GEMINI_API_KEY')
        has_key = False
        for k in keys:
            if os.environ.get(k, ''):
                has_key = True
                break
        if has_key:
            available.append((name, env_key, notes))
    return available

def run_graphify(backend, extra_args, is_label=False):
    """Run graphify with a specific backend. Return (success, output)."""
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    if is_label:
        cmd = ['graphify', 'label', '.']
    else:
        cmd = ['graphify', '.']
    if extra_args:
        cmd.extend(extra_args)
    cmd.extend(['--backend', backend])

    print(f"\n  Trying: graphify . --backend {backend}")
    print(f"  Command: {' '.join(cmd)}")

    env_dict = {**os.environ, 'PYTHONIOENCODING': 'utf-8'}
    if backend == 'gemini':
        g_key = env_dict.get('GEMINI_API_KEY') or env_dict.get('GOOGLE_AI_API_KEY')
        if g_key:
            env_dict['GEMINI_API_KEY'] = g_key
            env_dict['GOOGLE_AI_API_KEY'] = g_key

    try:
        result = subprocess.run(
            cmd,
            capture_output=True,
            text=True,
            timeout=600,  # 10 min timeout per provider
            cwd=root,
            env=env_dict,
        )
        output = (result.stdout or '') + (result.stderr or '')

        # Check for rate limit errors in output
        output_lower = output.lower()
        is_rate_limited = any(p in output_lower for p in RATE_LIMIT_PATTERNS)

        if result.returncode == 0 and not is_rate_limited:
            return True, output
        elif is_rate_limited:
            print(f"  ⚠️  {backend}: Rate limited / quota exceeded")
            print(f"  Output:\n{output}")
            return False, output
        else:
            print(f"  ⚠️  {backend}: Failed (exit code {result.returncode})")
            print(f"  Output:\n{output}")
            return False, output

    except subprocess.TimeoutExpired:
        print(f"  ⚠️  {backend}: Timed out (>10 min)")
        return False, "Timeout"
    except FileNotFoundError:
        print("  ❌ graphify command not found. Install: pip install graphifyy")
        return False, "Not installed"
    except Exception as e:
        print(f"  ❌ {backend}: Error — {e}")
        return False, str(e)

def main():
    load_env_file()
    extra_args = [a for a in sys.argv[1:] if a != '--']

    # Handle special shorthand flags
    is_label = False
    if '--label' in extra_args:
        extra_args.remove('--label')
        is_label = True
        print("Note: --label mode uses 'graphify label .' command")

    print("=" * 55)
    print("  Graphify Auto-Failover Wrapper")
    print("=" * 55)

    available = get_available_providers()
    if not available:
        print("\n  ❌ No API keys found in environment.")
        print("  Set at least one of:")
        for name, env_key, notes in PROVIDERS:
            print(f"    $env:{env_key} = 'your-key'  # {notes}")
        print("\n  Or load from .env:")
        print("    Get-Content .env | ForEach-Object { if ($_ -match '=') { $k,$v = $_.Split('=',2); Set-Item env:$k $v } }")
        return 1

    print(f"\n  Available providers: {len(available)}")
    for i, (name, _, notes) in enumerate(available, 1):
        print(f"    {i}. {name} — {notes}")

    # Try each provider in order
    for i, (name, env_key, notes) in enumerate(available, 1):
        print(f"\n{'─' * 55}")
        print(f"  Attempt {i}/{len(available)}: {name}")
        print(f"{'─' * 55}")

        success, output = run_graphify(name, extra_args, is_label)

        if success:
            print(f"\n{'=' * 55}")
            print(f"  ✅ SUCCESS with {name}!")
            print(f"{'=' * 55}")

            # Print last 10 lines of output as summary
            lines = output.strip().split('\n')
            summary = lines[-10:] if len(lines) > 10 else lines
            for line in summary:
                print(f"  {line}")

            return 0

        # Brief pause before trying next provider
        if i < len(available):
            print(f"  Waiting 3s before trying next provider...")
            time.sleep(3)

    # All providers failed
    print(f"\n{'=' * 55}")
    print(f"  ❌ ALL {len(available)} PROVIDERS FAILED")
    print(f"{'=' * 55}")
    print("  Possible causes:")
    print("  - All API keys exhausted their free tier quotas")
    print("  - Network connectivity issue")
    print("  - Graphify not installed or outdated")
    print("\n  Try:")
    print("  - Wait 1 hour for rate limits to reset")
    print("  - Use a different API key")
    print("  - Run: pip install --upgrade graphifyy")
    return 1

if __name__ == '__main__':
    sys.exit(main())

# Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
