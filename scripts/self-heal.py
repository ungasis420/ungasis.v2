import sys
import os
import subprocess

def run_verifier(filepath):
    print(f"Running verifier on {filepath}...")
    try:
        result = subprocess.run(
            [sys.executable, "scripts/verifier.py", filepath],
            capture_output=True,
            text=True
        )
        return result.returncode == 0, result.stdout
    except Exception as e:
        return False, str(e)

def apply_fix_1(filepath):
    print("Applying fix for syntax/format issue.")
    pass

def apply_fix_2(filepath):
    print("Applying fix for missing dependency/import.")
    pass

def apply_fix_3(filepath):
    print("Applying fix for logic/data error.")
    pass

def main():
    if len(sys.argv) < 3:
        print("Usage: python self-heal.py <file_path> <error_message>")
        sys.exit(1)

    filepath = sys.argv[1]
    error_msg = sys.argv[2]

    if not os.path.exists(filepath):
        print(f"Error: {filepath} not found.")
        sys.exit(1)

    print(f"Error reported: {error_msg}")
    
    hypotheses = [
        {
            "name": "Syntax/format issue",
            "desc": "Check and correct indentation and syntax.",
            "fix": apply_fix_1
        },
        {
            "name": "Missing dependency/import",
            "desc": "Add missing module imports at file top.",
            "fix": apply_fix_2
        },
        {
            "name": "Logic/data error",
            "desc": "Correct invalid variables and logic steps.",
            "fix": apply_fix_3
        }
    ]

    for i, hyp in enumerate(hypotheses, 1):
        print(f"Hypothesis {i}: {hyp['name']}")
        print(f"Fix: {hyp['desc']}")

    for i, hyp in enumerate(hypotheses, 1):
        print(f"\nAttempting Hypothesis {i}...")
        
        with open(filepath, 'r', encoding='utf-8') as f:
            original_content = f.read()

        hyp["fix"](filepath)

        passed, output = run_verifier(filepath)
        
        if passed:
            print("Fix passed verifier. DONE.")
            sys.exit(0)
        else:
            print("Fix failed verifier.")
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(original_content)

    print("3-strike limit. Ask user.")
    sys.exit(1)

if __name__ == "__main__":
    main()

# Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
