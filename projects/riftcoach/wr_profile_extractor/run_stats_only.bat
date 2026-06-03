@echo off
echo ============================================================
echo   Stats-only extraction (wiki scraping, may be partial)
echo ============================================================
echo.
cd /d "%~dp0\.."
python wr_profile_extractor\extract_profiles.py --stats-only
echo.
pause
