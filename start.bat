@echo off
chcp 65001 >nul
title DataPioneer 数据先锋大屏

echo.
echo   ╔══════════════════════════════════════════╗
echo   ║     DataPioneer 数据先锋大屏            ║
echo   ║     正在启动...                          ║
echo   ╚══════════════════════════════════════════╝
echo.

cd /d "%~dp0"

:: 清理占用 3000 端口的旧进程
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":3000.*LISTENING" 2^>nul') do (
    echo   [清理] 关闭旧进程 PID: %%a
    taskkill /F /PID %%a >nul 2>&1
)

:: 检查依赖
if not exist "node_modules\" (
    echo   [安装] 首次运行，安装依赖中...
    call npm install
)

echo   [启动] 浏览器将自动打开 http://localhost:3000
echo   [提示] 关闭此窗口即可停止服务器
echo.

npm run dev
pause
