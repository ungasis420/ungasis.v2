#!/usr/bin/env python3
"""Register alternative AI providers for Graphify.

This script runs the graphify CLI provider add commands for Groq, OpenRouter,
Together, and Cerebras APIs.
"""
import subprocess
import sys
import os

try:
    sys.stdout.reconfigure(encoding='utf-8')
    sys.stderr.reconfigure(encoding='utf-8')
except AttributeError:
    pass

PROVIDERS = [
    {
        'name': 'groq',
        'base_url': 'https://api.groq.com/openai/v1',
        'model': 'llama-3.3-70b-versatile',
        'env_key': 'GROQ_API_KEY',
    },
    {
        'name': 'openrouter',
        'base_url': 'https://openrouter.ai/api/v1',
        'model': 'google/gemini-2.5-flash-preview',
        'env_key': 'OPENROUTER_API_KEY',
    },
    {
        'name': 'together',
        'base_url': 'https://api.together.xyz/v1',
        'model': 'meta-llama/Llama-3.3-70B-Instruct-Turbo',
        'env_key': 'TOGETHER_API_KEY',
    },
    {
        'name': 'cerebras',
        'base_url': 'https://api.cerebras.ai/v1',
        'model': 'llama-3.3-70b',
        'env_key': 'CEREBRAS_API_KEY',
    },
]

def main():
    """Execute registering alternative providers on graphify CLI."""
    print("Graphify Provider Setup")
    print("=" * 40)
    for p in PROVIDERS:
        key = os.environ.get(p['env_key'], '')
        status = "KEY SET" if key else "NO KEY"
        print(f"\n  Registering: {p['name']} ({status})")
        cmd = [
            'graphify', 'provider', 'add', p['name'],
            '--base-url', p['base_url'],
            '--default-model', p['model'],
            '--env-key', p['env_key'],
        ]
        try:
            result = subprocess.run(cmd, capture_output=True, text=True, timeout=10)
            if result.returncode == 0:
                print(f"    ✅ {p['name']} registered")
            else:
                print(f"    ⚠️ {p['name']}: {result.stderr.strip()[:100]}")
        except Exception as e:
            print(f"    ❌ {p['name']}: {e}")

    print("\n" + "=" * 40)
    print("Usage:")
    print("  graphify . --backend groq")
    print("  graphify . --backend openrouter")
    print("  graphify . --backend together")
    print("  graphify . --backend cerebras")
    print("  graphify provider list")

if __name__ == '__main__':
    main()
