import sys
import os
import re

def check_staleness_footer(filepath, lines):
    if not filepath.lower().endswith('.md'):
        return True, "N/A (not .md)"
    
    footer_pattern = re.compile(r'Last reviewed:.*\|.*Review by:.*\|.*Owner:', re.IGNORECASE)
    for line in reversed(lines[-15:]):
        if footer_pattern.search(line):
            return True, "Found correctly formatted footer"
    
    return False, "Missing or malformed staleness footer"

def check_file_length(lines):
    if len(lines) <= 200:
        return True, f"{len(lines)} lines"
    return False, f"Exceeds 200 lines ({len(lines)})"

def check_simple_english(content):
    # Strip markdown code blocks
    text = re.sub(r'```.*?```', '', content, flags=re.DOTALL)
    # Basic sentence tokenization
    sentences = re.split(r'[.!?\n]\s+', text)
    
    for s in sentences:
        words = re.findall(r'\b\w+\b', s)
        if len(words) > 25:
            preview = " ".join(words[:5]) + "..."
            return False, f"Sentence > 25 words: '{preview}'"
            
    return True, "No sentences over 25 words"

def check_api_keys(content):
    patterns = [
        (r'AIzaSy[0-9a-zA-Z_-]{33}', 'Google/GCP API Key'),
        (r'sk-[a-zA-Z0-9]{48}', 'OpenAI API Key'),
        (r'ghp_[a-zA-Z0-9]{36}', 'GitHub PAT'),
        (r'gho_[a-zA-Z0-9]{36}', 'GitHub OAuth')
    ]
    
    for pat, name in patterns:
        if re.search(pat, content):
            return False, f"Exposed {name} detected"
            
    return True, "No API key patterns found"

def check_heading_structure(filepath, lines):
    if not filepath.lower().endswith('.md'):
        return True, "N/A (not .md)"
        
    h1_count = 0
    last_level = 0
    
    for line in lines:
        m = re.match(r'^(#+)\s', line)
        if m:
            level = len(m.group(1))
            if level == 1:
                h1_count += 1
            if last_level > 0 and level > last_level + 1:
                return False, f"Heading skipped level: H{last_level} -> H{level}"
            last_level = level
            
    if h1_count != 1:
        return False, f"Found {h1_count} H1 headings (must be exactly 1)"
        
    return True, "Proper heading hierarchy"

def main():
    if len(sys.argv) < 2:
        print("Usage: python verifier.py <file_path>")
        sys.exit(1)
        
    filepath = sys.argv[1]
    if not os.path.isfile(filepath):
        print(f"Error: File not found: {filepath}")
        sys.exit(1)
        
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    lines = content.split('\n')
    if lines and lines[-1] == '':
        lines.pop()
        
    checks = [
        ("Staleness Footer", check_staleness_footer(filepath, lines)),
        ("File Length", check_file_length(lines)),
        ("Simple English", check_simple_english(content)),
        ("API Key Patterns", check_api_keys(content)),
        ("Heading Structure", check_heading_structure(filepath, lines))
    ]
    
    print(f"--- Verifier Layer Report: {filepath} ---")
    print(f"{'Check':<25} | {'Status':<6} | {'Detail'}")
    print("-" * 80)
    
    all_pass = True
    for name, (passed, detail) in checks:
        status = "PASS" if passed else "FAIL"
        if not passed:
            all_pass = False
        print(f"{name:<25} | {status:<6} | {detail}")
        
    if not all_pass:
        sys.exit(1)
    else:
        sys.exit(0)

if __name__ == "__main__":
    main()

# Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
