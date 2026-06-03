@echo off
echo ============================================================
echo   VISIBLE MODE — watch Chrome browse the wiki!
echo   (Useful for debugging if headless mode has issues)
echo ============================================================
echo.
cd /d "%~dp0\.."
python wr_profile_extractor\extract_profiles.py --champions karma,nautilus,swain --visible
echo.
pause
