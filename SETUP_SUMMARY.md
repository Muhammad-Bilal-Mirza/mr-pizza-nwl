# 🍕 Mr. Pizza - Local Setup Summary

Your project is now configured for local development with proper image loading!

## What Was Set Up

### 1. **Vite Configuration** (`src/frontend/vite.config.js`)
   - ✅ Added explicit `base: "/"` for static asset serving
   - ✅ Configured proxy for `/api` endpoints
   - ✅ React plugin enabled
   - **Result:** All images load from `/assets/generated/` path

### 2. **Development Environment** (`src/frontend/.env.development`)
   - ✅ Created `.env.development` file
   - ✅ Enabled `VITE_USE_MOCK=true` by default (no backend needed)
   - **Result:** App works immediately without setup

### 3. **Mock Backend** (`src/frontend/src/mocks/backend.ts`)
   - ✅ Created mock backend module
   - ✅ Includes all 4 pizza menu items with local image paths
   - ✅ Returns proper mock data when backend is unavailable
   - **Result:** Menu displays with images on first load

### 4. **Package Scripts** (`src/frontend/package.json`)
   - ✅ Added `dev` script - runs `vite` for development
   - ✅ Existing `build` script for production builds
   - **Result:** Start dev server with `pnpm dev`

### 5. **Startup Scripts** (Project Root)
   - ✅ `dev.ps1` - PowerShell script for Windows PowerShell
   - ✅ `dev.bat` - Batch script for Windows Command Prompt
   - **Result:** One-click development server startup

### 6. **Documentation** (`LOCAL_SETUP.md`)
   - ✅ Comprehensive setup guide
   - ✅ Troubleshooting section
   - ✅ Options for local IC replica testing
   - **Result:** Easy reference for any setup issues

## Quick Start Guide

### Option 1: Using Batch Script (Windows Command Prompt)
```batch
dev.bat
```

### Option 2: Using PowerShell
```powershell
.\dev.ps1
```

### Option 3: Manual (Any OS)
```bash
cd src/frontend
pnpm install      # First time only
pnpm dev
```

## What Happens Next

1. Dependencies install (first time takes a minute)
2. Vite compiles React components
3. Dev server starts at `http://localhost:5173/`
4. Your browser automatically opens the app (or manually navigate)
5. All pizza images load from the local `public/assets/generated/` folder

## Image Files Available

Located in `src/frontend/public/assets/generated/`:

| Image | Path |
|-------|------|
| La Margherita | `pizza-margherita.dim_400x400.jpg` |
| Pepperoni Royale | `pizza-pepperoni.dim_400x400.jpg` |
| Black Truffle & Mushroom | `pizza-truffle.dim_400x400.jpg` |
| Smoky BBQ Chicken | `pizza-bbq-chicken.dim_400x400.jpg` |
| Hero Pizza | `hero-pizza.dim_1600x900.jpg` |

## How Images Load

```
User Browser
    ↓
http://localhost:5173/assets/generated/pizza-margherita.dim_400x400.jpg
    ↓
Vite Dev Server (serves from public/)
    ↓
src/frontend/public/assets/generated/pizza-margherita.dim_400x400.jpg ✅
```

## Key Configuration Points

### Static Asset Serving
- **Base URL:** `/` (root level)
- **Public Folder:** `src/frontend/public/`
- **Asset Path:** `/assets/generated/pizza-*.jpg`

### Component Image Usage
- App.tsx maps pizza names to local image paths
- STATIC_MENU contains fallback with local URLs
- Mock backend returns local image URLs

### No Breaking Changes
- All existing code unchanged
- Backward compatible with IC deployment
- Works with or without backend

## For Production

Build the app:
```bash
cd src/frontend
pnpm build
```

Output will be in `src/frontend/dist/` with:
- ✅ All images included
- ✅ env.json copied to dist
- ✅ Ready for deployment

## Troubleshooting

If images don't load:
1. Check browser DevTools (F12) → Network tab
2. Look for 404 errors on image requests
3. Verify files exist: `ls src/frontend/public/assets/generated/`
4. Clear browser cache: Ctrl+Shift+Del (full refresh)

If pnpm is missing:
```bash
npm install -g pnpm
```

## File Summary

| File | Purpose |
|------|---------|
| `src/frontend/vite.config.js` | Vite config with base path |
| `src/frontend/.env.development` | Dev environment variables |
| `src/frontend/src/mocks/backend.ts` | **NEW** Mock backend for dev |
| `src/frontend/package.json` | Added `dev` script |
| `dev.bat` | **NEW** Windows batch starter |
| `dev.ps1` | **NEW** PowerShell starter |
| `LOCAL_SETUP.md` | **NEW** Full setup documentation |

## Next Steps

1. Run `dev.bat` or `.\dev.ps1` (Windows)
2. Or run `cd src/frontend && pnpm dev`
3. Open http://localhost:5173/
4. See pizza menu with all images loading! 🎉

For detailed information, see [LOCAL_SETUP.md](LOCAL_SETUP.md)
