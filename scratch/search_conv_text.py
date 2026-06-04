import os

def search_conv_text():
    keywords = ["pro key", "billing", "pay-as-you-go", "rpm", "rate limit", "AIzaSy"]
    brain_dir = r"C:\Users\63905\.gemini\antigravity-ide\brain"
    if not os.path.exists(brain_dir):
        return
        
    print(f"Scanning brain directory: {brain_dir} for keywords...")
    for root, dirs, files in os.walk(brain_dir):
        for file in files:
            if file == 'transcript.jsonl':
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, 'r', errors='ignore') as f:
                        for i, line in enumerate(f, 1):
                            if any(k.lower() in line.lower() for k in keywords):
                                # Mask any full keys in the line before printing
                                line_to_print = line
                                keys = re.findall(r'AIzaSy[A-Za-z0-9_-]{33}', line)
                                for k in keys:
                                    line_to_print = line_to_print.replace(k, k[:4] + "..." + k[-4:])
                                print(f"File {file_path} Line {i}: {line_to_print[:200].strip()}")
                except Exception as e:
                    pass

import re
if __name__ == '__main__':
    search_conv_text()
