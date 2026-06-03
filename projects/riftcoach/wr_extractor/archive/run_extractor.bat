@echo off
chcp 65001 >nul 2>&1
title Wild Rift Data Extractor v1.0
color 0A

echo.
echo  ╔══════════════════════════════════════════════════════════╗
echo  ║      Wild Rift Data Extractor - One-Click Launcher      ║
echo  ╚══════════════════════════════════════════════════════════╝
echo.

:: ── Check if Python is installed ──
where python >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    where python3 >nul 2>&1
    if %ERRORLEVEL% NEQ 0 (
        echo  ❌ Python is NOT installed on your computer.
        echo.
        echo  To install Python (takes 2 minutes):
        echo    1. Open Microsoft Store (search "Microsoft Store" in Start menu)
        echo    2. Search for "Python 3.12" (or latest)
        echo    3. Click "Get" / "Install"
        echo    4. Wait for it to finish
        echo    5. Close this window and double-click run_extractor.bat again
        echo.
        echo  OR download from: https://www.python.org/downloads/
        echo     (CHECK the box "Add Python to PATH" during install!)
        echo.
        pause
        exit /b 1
    )
    set PYTHON_CMD=python3
) else (
    set PYTHON_CMD=python
)

echo  ✅ Python found: %PYTHON_CMD%
echo.

:: ── Check if the extractor script exists ──
if not exist "wr_extractor.py" (
    echo  ❌ wr_extractor.py not found in this folder!
    echo     Make sure wr_extractor.py is in the same folder as this .bat file.
    echo.
    pause
    exit /b 1
)

:: ── Check if at least one URL file exists ──
set FOUND_FILES=0
if exist "wr_champs.txt" set /a FOUND_FILES+=1
if exist "wr_items.txt" set /a FOUND_FILES+=1
if exist "wr_runes.txt" set /a FOUND_FILES+=1
if exist "wr_spells.txt" set /a FOUND_FILES+=1
if exist "wr_game_elements_and_mechanics.txt" set /a FOUND_FILES+=1

if %FOUND_FILES% EQU 0 (
    echo  ❌ No URL files found! Place these files in the same folder:
    echo     - wr_champs.txt
    echo     - wr_items.txt
    echo     - wr_runes.txt
    echo     - wr_spells.txt
    echo     - wr_game_elements_and_mechanics.txt
    echo.
    pause
    exit /b 1
)

echo  📂 Found %FOUND_FILES% URL file(s)
echo.
echo  🚀 Starting extraction... (this may take 5-10 minutes)
echo  ═══════════════════════════════════════════════════════════
echo.

:: ── Run the extractor ──
%PYTHON_CMD% wr_extractor.py

:: ── Done ──
echo.
echo  ═══════════════════════════════════════════════════════════
echo  Done! Check the "output" folder for your files.
echo  ═══════════════════════════════════════════════════════════
echo.
pause
