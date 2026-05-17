@echo off
title NOROSHI DISCORD BOT
color 0C

echo ========================================
echo         NOROSHI DISCORD BOT
echo ========================================
echo.

if not exist node_modules (
    echo [SYSTEM] node_modules not found...
    echo [SYSTEM] Installing dependencies...
    echo.

    npm install

    if %errorlevel% neq 0 (
        echo.
        echo [ERROR] Failed to install dependencies.
        pause
        exit
    )

    echo.
    echo [SUCCESS] Dependencies installed.
    node noroshi.js
)

:restart
cls
echo ========================================
echo          NOROSHI BOT ONLINE
echo ========================================
echo.
echo [INFO] Starting noroshi.js...
echo.

node noroshi.js

echo.
echo [WARNING] Bot stopped or crashed...
echo [SYSTEM] Restarting in 5 seconds...
timeout /t 5 /nobreak >nul
goto restart