@echo off
title DataPioneer
cd /d "%~dp0"

echo.
echo   ========================================
echo     DataPioneer 数据先锋大屏
echo   ========================================
echo.

:: 检查 Node.js
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo   [X] 未找到 Node.js
    echo   请先安装: https://nodejs.org
    echo.
    pause
    exit /b
)

:: 清理旧进程
for /f "tokens=5" %%a in ('netstat -ano 2^>nul ^| findstr ":3000.*LISTENING"') do (
    taskkill /F /PID %%a >nul 2>&1
    echo   [OK] 已清理端口 3000 的旧进程
)

:: 安装依赖
if not exist "node_modules\" (
    echo   [..] 正在安装依赖...
    call npm install
)

echo   [>>] 启动中: http://localhost:3000
echo   [!!] 不要关闭此窗口
echo   ========================================
echo.

call npm run dev

:: 如果 npm 意外退出
echo.
echo   服务器已停止，按任意键关闭窗口...
pause >nul
