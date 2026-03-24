# Quickstart: Centuri Prism Dark Theme Verification

## Prerequisites

- Node.js installed
- .NET 10 SDK installed
- Backend running on port 5000

## Start

```bash
# Terminal 1: Backend
cd backend && dotnet run --project src

# Terminal 2: Frontend
cd frontend && npm install && npm run dev
```

Open http://localhost:3000

## Verification Checklist

### US1: Framework Migration

1. Navigate to each route — all 8 pages load:
   - `/` (Dashboard) — 5 KPI cards with data
   - `/documents` — table with documents
   - `/deviations` — table with deviations
   - `/audits` — table with audits
   - `/cases` — table with cases
   - `/users` — table with users
   - `/settings` — form with org name and email
   - `/help` — FAQ list
2. Click sidebar links — pages switch without full reload
3. Check browser console — no React errors or warnings

### US2: Dark Theme & Design System

1. Background is deep navy (`#060e20`), not white
2. Text is light (`#dee5ff`) on dark surfaces
3. Headlines use Plus Jakarta Sans font
4. Body text uses Inter font
5. No solid borders visible for section separating
6. Header has blur/glass effect
7. Primary buttons show teal gradient
8. Status badges have subtle glow background (not solid colored)
9. All interactive elements have rounded corners (min 12px)

### US3: Page-Specific Fidelity

1. **Dashboard**: KPI cards with glow styling, gradient action buttons
2. **Documents**: Tonal row table, status glow chips, "Export CSV" button
3. **Users**: Violet role badges, green/red activity dots
4. **Settings**: Form inputs with subtle ghost borders
5. **Documents at 390px**: Resize browser to 390px width — content reflows, no horizontal scroll

### Automated Migration Verification

Run these after the framework migration commit (before theme work):

```bash
# 1. No leftover Preact class= attributes (should be className)
grep -r ' class=' frontend/src/ --include='*.jsx' | grep -v 'className'
# Expected: no output (all converted)

# 2. No leftover preact imports
grep -r 'from .preact' frontend/src/ --include='*.jsx' --include='*.js'
# Expected: no output (all converted to react)

# 3. No leftover onInput (should be onChange)
grep -r 'onInput=' frontend/src/ --include='*.jsx'
# Expected: no output (all converted)

# 4. Frontend build succeeds
cd frontend && npm run build

# 5. Backend tests still pass
cd backend && dotnet test
```

### Quick Smoke Test

```bash
# Verify build succeeds
cd frontend && npm run build

# Verify backend tests still pass
cd backend && dotnet test
```

### Known Dev Mode Behavior

React 19 StrictMode double-invokes `useEffect` in development. You will see duplicate API calls in the Network tab — this is expected and does not affect production builds.
