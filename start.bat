@echo off
chcp 65001 >nul
echo.
echo   ╔══════════════════════════════════════╗
echo   ║   DataPioneer 数据先锋大屏          ║
echo   ║   正在启动开发服务器...              ║
echo   ╚══════════════════════════════════════╝
echo.
cd /d "%~dp0"
npm run dev
