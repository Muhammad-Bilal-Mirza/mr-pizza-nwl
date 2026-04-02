@echo off
REM Start Mr. Pizza locally with mock backend
REM Usage: dev.bat

echo.
echo 🍕 Mr. Pizza - Local Development Server
echo =======================================
echo.

REM Check if pnpm is installed
pnpm --version >nul 2>&1
if errorlevel 1 (
    echo ✗ pnpm not found. Install it with: npm install -g pnpm
    pause
    exit /b 1
)

for /f "tokens=*" %%a in ('pnpm --version') do set pnpmVersion=%%a
echo ✓ pnpm found (v%pnpmVersion%)

REM Navigate to frontend directory
cd src\frontend

REM Check if node_modules exists
if not exist "node_modules" (
    echo.
    echo 📦 Installing dependencies...
    pnpm install
    if errorlevel 1 (
        echo ✗ Failed to install dependencies
        pause
        exit /b 1
    )
)

REM Check if .env.development exists
if exist ".env.development" (
    echo ✓ .env.development configured
) else (
    echo ⚠ .env.development not found, it should have been created
)

REM List available images
echo.
echo 🖼️  Available images:
for %%f in (public\assets\generated\*.jpg) do (
    echo    • %%~nxf
)

REM Start the dev server
echo.
echo 🚀 Starting development server...
echo 📍 The app will be available at http://localhost:5173/
echo.
echo Press Ctrl+C to stop the server
echo.

pnpm dev

cd ..\..
pause
