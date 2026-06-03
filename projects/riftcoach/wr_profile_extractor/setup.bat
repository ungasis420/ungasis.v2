@echo off
echo ============================================================
echo   SETUP: Installing dependencies (one time)
echo ============================================================
echo.
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python not found. Install from https://python.org
    pause
    exit /b 1
)
pip install requests beautifulsoup4 lxml --quiet
echo.
echo Done! You can now run the extractor.
pause
