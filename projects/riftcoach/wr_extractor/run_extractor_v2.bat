@echo off
chcp 65001 >nul 2>&1
title Wild Rift Data Extractor v2.0 (Enhanced)
color 0A
echo.
echo  ╔══════════════════════════════════════════════════════════╗
echo  ║   Wild Rift Data Extractor v2.0 — Data + Images         ║
echo  ╚══════════════════════════════════════════════════════════╝
echo.
where python >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo  Python not found. Install from Microsoft Store or python.org
    pause
    exit /b 1
)
if not exist "wr_champs.txt" (
    echo  URL files not found! Place wr_champs.txt etc. in this folder.
    pause
    exit /b 1
)
python wr_extractor_v2.py
pause
