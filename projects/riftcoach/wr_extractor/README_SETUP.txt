
╔══════════════════════════════════════════════════════════════════════╗
║              WILD RIFT DATA EXTRACTOR — SETUP GUIDE                 ║
║              From URLs → Structured Data → Copilot Notebook         ║
╚══════════════════════════════════════════════════════════════════════╝

WHAT THIS DOES:
  Reads your Wild Rift wiki URLs, visits each page, extracts all
  game data (champions, items, runes, spells, mechanics), and saves
  it as structured files you can upload to Copilot Notebook.

═══════════════════════════════════════════════════════════════════════
 SETUP (One-Time, ~5 minutes)
═══════════════════════════════════════════════════════════════════════

  STEP 1: Install Python (if you don't have it)
  ──────────────────────────────────────────────
  a) Open Microsoft Store on your Windows PC
  b) Search for "Python 3.12" (or latest version)
  c) Click "Get" → Wait for install → Done!
  
  OR download from: https://www.python.org/downloads/
  ⚠️  IMPORTANT: Check ✅ "Add Python to PATH" during install!

  STEP 2: Create a project folder
  ────────────────────────────────
  a) Create a folder anywhere, e.g.: C:\WildRift_Extractor\
  b) Put ALL these files inside that folder:
     
     📁 WildRift_Extractor\
     ├── wr_extractor.py              ← The main script
     ├── run_extractor.bat            ← One-click launcher
     ├── wr_champs.txt                ← Your champion URLs
     ├── wr_items.txt                 ← Your item URLs
     ├── wr_runes.txt                 ← Your rune URLs
     ├── wr_spells.txt                ← Your spell URLs
     └── wr_game_elements_and_mechanics.txt  ← Your mechanics URLs

═══════════════════════════════════════════════════════════════════════
 RUNNING THE EXTRACTOR
═══════════════════════════════════════════════════════════════════════

  STEP 3: Double-click run_extractor.bat
  ───────────────────────────────────────
  That's it! A black terminal window opens and shows progress:
  
    [  1/380]   0.3% 🌐 champions    → Aatrox          ✅ (12 sections)
    [  2/380]   0.5% 🌐 champions    → Ahri            ✅ (10 sections)
    ...
  
  Wait for it to finish (~5-10 minutes first run, instant on re-runs).

  STEP 4: Check the "output" folder
  ──────────────────────────────────
  When done, you'll find:
  
     📁 output\
     ├── wr_complete_database.txt   ← UPLOAD THIS TO COPILOT NOTEBOOK
     ├── wr_complete_database.json  ← For future app development
     ├── wr_champions.txt           ← Champions only
     ├── wr_items.txt               ← Items only
     ├── wr_runes.txt               ← Runes only
     ├── wr_spells.txt              ← Spells only
     ├── wr_mechanics.txt           ← Mechanics only
     └── extraction_log.txt         ← Log of what was extracted

═══════════════════════════════════════════════════════════════════════
 UPLOADING TO COPILOT NOTEBOOK
═══════════════════════════════════════════════════════════════════════

  STEP 5: Add to your Notebook
  ────────────────────────────
  a) Go to microsoft365.com/chat → Notebooks → Your WR Coach Notebook
  b) Click References → + Add → Upload
  c) Upload: output\wr_complete_database.txt
     (or upload individual category files if you want separate references)
  d) Add description: "Wild Rift game database — all champions, items,
     runes, spells, and mechanics with stats, abilities, and effects"
  e) Done! Your Notebook AI coach now has the full game database.

═══════════════════════════════════════════════════════════════════════
 RE-RUNNING & UPDATING
═══════════════════════════════════════════════════════════════════════

  • SAFE TO RE-RUN: Pages are cached locally in .wr_cache\ folder.
    Re-runs only fetch pages that failed previously.
  
  • NEW PATCH? Delete the .wr_cache\ folder and run again to get
    fresh data. Update PATCH_TAG in wr_extractor.py if you want.
  
  • FAILED PAGES? Just run again — it retries failed ones while
    using cached versions of successful pages.

═══════════════════════════════════════════════════════════════════════
 TROUBLESHOOTING
═══════════════════════════════════════════════════════════════════════

  "Python is not recognized..."
  → Install Python from Microsoft Store, then restart your PC.
  
  "No URL files found!"
  → Make sure the .txt files are in the SAME folder as the script.
  
  "Connection error" or "Timeout"
  → Check your internet connection. Re-run the script (cached pages
    won't be re-downloaded).
  
  "Permission denied"
  → Right-click run_extractor.bat → "Run as administrator"

═══════════════════════════════════════════════════════════════════════
