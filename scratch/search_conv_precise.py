import os
import re

def search_precise():
    brain_dir = r"C:\Users\63905\.gemini\antigravity-ide\brain"
    if not os.path.exists(brain_dir):
        return
        
    print(f"Scanning brain directory for precise matches...")
    for root, dirs, files in os.walk(brain_dir):
        # Skip the current conversation folder
        if "c01b24af-56f2-475f-8c0c-968c05d88638" in root:
            continue
        for file in files:
            if file == 'transcript.jsonl':
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, 'r', errors='ignore') as f:
                        for i, line in enumerate(f, 1):
                            if "GOOGLE_AI" in line or "GEMINI_API" in line or "AIza" in line:
                                if any(w in line.lower() for w in ["pro", "paid", "billing", "rate", "limit"]):
                                    # Mask key
                                    line_to_print = line
                                    keys = re.findall(r'AIzaSy[A-Za-z0-9_-]{33}', line)
                                    for k in keys:
                                        line_to_print = line_to_print.replace(k, k[:4] + "..." + k[-4:])
                                    print(f"Match: {os.path.basename(os.path.dirname(os.path.dirname(file_path)))} L{i}: {line_to_print[:250].strip()}")
                except Exception as e:
                    pass

if __name__ == '__main__':
    search_precise()
