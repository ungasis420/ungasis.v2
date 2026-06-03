@echo off
echo ============================================================
echo   WR Profile Extractor v5.0 (requests + CDN)
echo   Same approach as v2 extractor that worked!
echo ============================================================
echo.
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python not found.
    pause & exit /b 1
)
cd /d "%~dp0\.."
python wr_profile_extractor\extract_profiles.py --skip-existing
echo.
pause
