#!/usr/bin/env pwsh
# Start Mr. Pizza locally with mock backend
# Usage: .\dev.ps1

Write-Host "🍕 Mr. Pizza - Local Development Server" -ForegroundColor Cyan
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host ""

# Check if pnpm is installed
try {
    $pnpmVersion = pnpm --version 2>$null
    Write-Host "✓ pnpm found (v$pnpmVersion)" -ForegroundColor Green
}
catch {
    Write-Host "✗ pnpm not found. Install it with: npm install -g pnpm" -ForegroundColor Red
    exit 1
}

# Navigate to frontend directory
Push-Location "src/frontend"

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host ""
    Write-Host "📦 Installing dependencies..." -ForegroundColor Cyan
    pnpm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "✗ Failed to install dependencies" -ForegroundColor Red
        Pop-Location
        exit 1
    }
}

# Check if .env.development exists
if (-not (Test-Path ".env.development")) {
    Write-Host "⚠ .env.development not found, it should have been created" -ForegroundColor Yellow
}
else {
    Write-Host "✓ .env.development configured" -ForegroundColor Green
}

# List available images
Write-Host ""
Write-Host "🖼️  Available images:" -ForegroundColor Cyan
Get-ChildItem -Path "public/assets/generated" -Include "*.jpg" | ForEach-Object {
    Write-Host "   • $($_.Name)" -ForegroundColor Gray
}

# Start the dev server
Write-Host ""
Write-Host "🚀 Starting development server..." -ForegroundColor Green
Write-Host "📍 The app will be available at http://localhost:5173/" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

pnpm dev

Pop-Location
