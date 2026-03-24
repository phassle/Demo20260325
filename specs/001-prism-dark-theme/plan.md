# Implementation Plan: Centuri Prism Dark Theme Redesign

**Branch**: `001-prism-dark-theme` | **Date**: 2026-03-24 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/001-prism-dark-theme/spec.md`

## Summary

Migrate frontend from Preact 10.x + preact-router to React 19 + react-router-dom, then apply the Centuri Prism dark design system ("The Luminary Interface") across all 8 pages. Backend is unchanged. CSS-only visual redesign plus Google Fonts.

## Technical Context

**Language/Version**: JavaScript (JSX), no TypeScript
**Primary Dependencies**: React 19, react-dom, react-router-dom, Vite 8 (@vitejs/plugin-react)
**Storage**: N/A (frontend only, backend unchanged)
**Testing**: Automated smoke test (build + route check + grep verification) + manual visual QA + backend xUnit (unchanged)
**Target Platform**: Modern browsers (desktop + mobile 390px)
**Project Type**: Web application (frontend-only changes)
**Performance Goals**: Comparable perceived load time to current Preact version
**Constraints**: No new npm runtime dependencies beyond React ecosystem; CSS-only design changes + Google Fonts CDN
**Scale/Scope**: 19 frontend files, 8 pages, 3 layout components, 1 hook, 1 service module

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Service Pattern | N/A | No backend changes |
| II. In-Memory First | N/A | No backend changes |
| III. Test Discipline | PASS | Backend tests unchanged; frontend has no test suite |
| IV. Simplicity & YAGNI | PASS | 1:1 migration of existing pages, no new abstractions |
| V. Structured Observability | PASS | Console error logging preserved in useApiData hook |

**Technology Constraints check:**
- Frontend stack changes from Preact to React — constitution amended to v2.0.0 (MAJOR) prior to implementation to authorize this redefinition.
- No new external services. Google Fonts CDN is acceptable (documented assumption in spec).

## Project Structure

### Documentation (this feature)

```text
specs/001-prism-dark-theme/
├── plan.md              # This file
├── research.md          # Phase 0: migration research
├── data-model.md        # Phase 1: design token model
├── quickstart.md        # Phase 1: verification guide
└── tasks.md             # Phase 2 output (/speckit.tasks)
```

### Source Code (repository root)

```text
frontend/
├── index.html                        # Add Google Fonts links
├── package.json                      # React 19 + react-router-dom deps
├── vite.config.js                    # Switch to @vitejs/plugin-react
├── src/
│   ├── main.jsx                      # React createRoot entry
│   ├── app.jsx                       # React Router setup
│   ├── style.css                     # Full rewrite: Prism dark theme
│   ├── components/
│   │   └── layout/
│   │       ├── Layout.jsx            # Surface hierarchy
│   │       ├── Sidebar.jsx           # Dark nav, teal active glow
│   │       └── Header.jsx            # Glassmorphic header
│   ├── hooks/
│   │   └── useApiData.js             # React hooks (minor import change)
│   ├── services/
│   │   └── api.js                    # Unchanged
│   └── pages/
│       ├── DashboardPage.jsx         # KPI cards, glow chips, gradient CTAs
│       ├── DocumentsPage.jsx         # Tonal table, status glow chips
│       ├── DeviationsPage.jsx        # Severity glow chips
│       ├── AuditsPage.jsx            # Audit status cards
│       ├── CasesPage.jsx             # Case type badges
│       ├── UsersPage.jsx             # Role badges, activity indicators
│       ├── SettingsPage.jsx          # Ghost border form inputs
│       └── HelpPage.jsx             # Dark theme FAQ
```

**Structure Decision**: Web application Option 2 — frontend-only modifications within existing `frontend/` directory. No backend changes.

## Complexity Tracking

> No constitution violations requiring justification.

## Migration Reference: Preact → React

| Pattern | Preact (current) | React (target) |
|---------|-------------------|----------------|
| Package | `preact` | `react` + `react-dom` |
| Router | `preact-router` | `react-router-dom` v7 |
| Vite plugin | `@preact/preset-vite` | `@vitejs/plugin-react` |
| Entry | `render(<App />, document.getElementById('app'))` | `createRoot(document.getElementById('app')).render(<App />)` |
| Hooks import | `import { useState } from 'preact/hooks'` | `import { useState } from 'react'` |
| JSX attribute | `class` | `className` |
| Form events | `onInput` | `onChange` |
| Router routes | `<Component path="/foo" />` | `<Route path="/foo" element={<Component />} />` |
| Active link | Manual `window.location.pathname` check | `<NavLink>` with `className` callback |
| Router change | `<Router onChange={fn}>` | `useLocation()` hook |
| Catch-all route | Silent fallthrough (renders nothing) | `<Route path="*" element={<Navigate to="/" />} />` |

## Implementation Notes

### Commit Strategy

Structure commits to separate concerns for revertability:
1. **Commit 1**: Framework migration (Preact → React) — all files work identically with the old light theme
2. **Commit 2**: Dark theme CSS rewrite + page component updates

This enables selective revert if one concern has issues.

### Critical Migration Tasks

These items are easy to miss during mechanical conversion and MUST be explicit tasks:

1. **Sidebar NavLink migration** — Replace `window.location.pathname` check with react-router-dom `<NavLink>`. If missed, sidebar active state only reflects initial page load.
2. **`class` → `className` conversion** — Every JSX file. Post-migration grep verification required (see below).
3. **`onInput` → `onChange`** — SettingsPage form inputs.
4. **404 catch-all route** — Add `<Route path="*">` to prevent blank page on unknown URLs.

### React Strict Mode

React 19 development mode enables StrictMode by default, which double-invokes `useEffect` callbacks. This means every page will fire its API call twice during development. This is expected React behavior, not a bug. Production builds are unaffected.

### Post-Migration Verification (Automated)

After migration, run these checks before proceeding to theme work:

```bash
# 1. No leftover Preact class= attributes (should be className)
grep -r ' class=' frontend/src/ --include='*.jsx' | grep -v 'className' && echo "FAIL: leftover class= found" || echo "PASS"

# 2. No leftover preact imports
grep -r 'from .preact' frontend/src/ --include='*.jsx' --include='*.js' && echo "FAIL: preact imports found" || echo "PASS"

# 3. No leftover onInput (should be onChange)
grep -r 'onInput=' frontend/src/ --include='*.jsx' && echo "FAIL: leftover onInput found" || echo "PASS"

# 4. Build succeeds
cd frontend && npm run build && echo "PASS" || echo "FAIL"
```

### Google Fonts Performance

Use `preconnect` and `display=swap` to avoid render-blocking and FOUT:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@600;700&display=swap" rel="stylesheet">
```

## Design Token Reference: Centuri Prism

### Colors (CSS custom properties)

```css
--color-base: #060e20;
--color-surface: #0a1628;
--color-surface-container-low: #101d32;
--color-surface-container-high: #1a2940;
--color-primary: #50f4e3;
--color-primary-container: #05d2c2;
--color-secondary: #ac8aff;
--color-tertiary: #ff9c7e;
--color-error: #ff716c;
--color-on-surface: #dee5ff;
--color-outline-variant: #40485d;
```

### Typography

```css
--font-display: 'Plus Jakarta Sans', sans-serif;
--font-body: 'Inter', sans-serif;
```

### Design Rules (from spec)

1. No `1px solid` borders — tonal surface shifts only
2. Surface hierarchy: base → container-low → container-high
3. Glassmorphism: `backdrop-filter: blur(20px)` on floating elements
4. CTA gradients: `linear-gradient(135deg, #50f4e3, #05d2c2)`
5. Ghost borders only: outline-variant at 15% opacity
6. Glow chips: 10% opacity background of status hue
7. No divider lines — whitespace or background shifts
8. Minimum corner radius: 12px on interactive elements
9. Shadows: navy-tinted, 24-40px blur, 4-8% opacity
10. No `#000000` in shadows
