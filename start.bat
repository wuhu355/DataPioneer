@echo off
title DataPioneer
cd /d "%~dp0"

echo.
echo   ========================================
echo     DataPioneer - Data Viz Dashboard
echo   ========================================
echo.

where node >nul 2>&1
if %errorlevel% neq 0 (
    echo   [ERROR] Node.js not found
    echo   Please install: https://nodejs.org
    echo.
    pause
    exit /b
)

for /f "tokens=5" %%a in ('netstat -ano 2^>nul ^| findstr ":3000.*LISTENING"') do (
    taskkill /F /PID %%a >nul 2>&1
    echo   [OK] Port 3000 cleaned
)

if not exist "node_modules\" (
    echo   [..] Installing dependencies...
    call npm install
)

echo   [>>] Starting: http://localhost:3000
echo   [!!] Keep this window open
echo   ========================================
echo.

call npm run dev

echo.
echo   Server stopped. Press any key to exit...
pause >nul
