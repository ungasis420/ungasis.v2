import os

brain_dir = r"C:\Users\63905\.gemini\antigravity-ide\brain"
for root, dirs, files in os.walk(brain_dir):
    for file in files:
        path = os.path.join(root, file)
        try:
            with open(path, "r", encoding="utf-8", errors="ignore") as f:
                content = f.read()
                if "Universal Launcher" in content:
                    print(f"Found in: {path} (size: {len(content)})")
        except Exception as e:
            pass
