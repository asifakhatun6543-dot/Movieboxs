@echo off
REM MovieBox - Quick Start Script for Windows

echo.
echo ╔════════════════════════════════════════╗
echo ║   🎬 MOVIEBOX QUICK START SETUP 🎬     ║
echo ╚════════════════════════════════════════╝
echo.

REM Check Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed.
    echo Please install from: https://nodejs.org/
    pause
    exit /b 1
)

node --version

REM Check npm
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ npm is not installed.
    pause
    exit /b 1
)

npm --version

echo.
echo 📦 Installing dependencies...
call npm install

REM Create .env file if doesn't exist
if not exist .env (
    echo.
    echo 📝 Creating .env file...
    copy .env.example .env
    echo ✓ .env file created. Please edit it with your MongoDB URI.
) else (
    echo ✓ .env file already exists.
)

echo.
echo ╔════════════════════════════════════════╗
echo ║        ✅ SETUP COMPLETE! ✅           ║
echo ╠════════════════════════════════════════╣
echo ║  Next steps:                           ║
echo ║  1. Edit .env with your MongoDB URI    ║
echo ║  2. Run: npm start                     ║
echo ║  3. Open: http://localhost:5000        ║
echo ╚════════════════════════════════════════╝
echo.
pause
