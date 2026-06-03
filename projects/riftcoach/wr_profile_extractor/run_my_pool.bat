@echo off
echo ============================================================
echo   YOUR POOL: Karma, Swain, Nautilus, Senna,
echo   Seraphine, Soraka, Milio
echo ============================================================
echo.
cd /d "%~dp0\.."
python wr_profile_extractor\extract_profiles.py --champions karma,swain,nautilus,senna,seraphine,soraka,milio
echo.
pause
