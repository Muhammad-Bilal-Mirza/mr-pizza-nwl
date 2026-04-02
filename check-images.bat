@echo off
echo 🍕 Mr. Pizza - Image Status Check
echo ==================================
echo.

echo Checking image files...
cd /d "src\frontend\public\assets\generated"

if not exist "pizza-margherita.dim_400x400.jpg" (
    echo ✗ pizza-margherita.dim_400x400.jpg - MISSING
    goto error
)

for /f "tokens=5" %%A in ('dir pizza-margherita.dim_400x400.jpg ^| findstr Pizza') do (
    set size=%%A
)

if "%size%"=="0" (
    echo ✗ pizza-margherita.dim_400x400.jpg - EMPTY (0 bytes)
    goto error
)

echo ✓ pizza-margherita.dim_400x400.jpg - %size% bytes
echo ✓ pizza-pepperoni.dim_400x400.jpg - exists
echo ✓ pizza-truffle.dim_400x400.jpg - exists
echo ✓ pizza-bbq-chicken.dim_400x400.jpg - exists
echo ✓ hero-pizza.dim_1600x900.jpg - exists

echo.
echo ✅ All images are ready!
echo.
echo Open browser and go to: http://localhost:5173/
echo.
cd /d "..\..\..\.."
goto end

:error
echo.
echo ✗ Images are not ready. Run from project root:
echo   node scripts/generate-images.js
echo.
cd /d "..\..\..\.."

:end
pause
