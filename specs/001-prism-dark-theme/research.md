# Research: Centuri Prism Dark Theme Redesign

**Date**: 2026-03-24

## R1: Preact → React Migration Strategy

**Decision**: Migrate in-place — same file structure, same file names, update imports and patterns.

**Rationale**: The codebase is 19 files. Preact's API is nearly identical to React's. A 1:1 migration minimizes risk and keeps git history readable.

**Alternatives considered**:
- Scaffold new React app and copy logic → rejected, unnecessary complexity, loses git history
- Use preact/compat to run React code on Preact → rejected, defeats the purpose of migrating to React

**Key changes**:
1. `package.json`: Remove preact, preact-router, @preact/preset-vite. Add react, react-dom, react-router-dom, @vitejs/plugin-react.
2. `vite.config.js`: Replace preact() plugin with react().
3. `main.jsx`: `render()` → `createRoot().render()`.
4. `app.jsx`: `<Router>` (preact-router) → `<BrowserRouter>` + `<Routes>` + `<Route>` (react-router-dom).
5. All `.jsx` files: `class=` → `className=`, `onInput=` → `onChange=`.
6. `useApiData.js`: `import { useState, useEffect } from 'preact/hooks'` → `from 'react'`.
7. `Sidebar.jsx`: Replace manual pathname check with `<NavLink>` from react-router-dom.
8. `api.js`: No changes needed — pure fetch, no framework dependency.

## R2: React Router v7 Patterns

**Decision**: Use react-router-dom v7 with `<BrowserRouter>`, `<Routes>`, `<Route>`.

**Rationale**: v7 is current stable. BrowserRouter matches the existing history-based routing (not hash). The Route element pattern `<Route path="/" element={<Page />} />` is the standard approach.

**Title management**: Replace preact-router `onChange` callback with a custom hook using `useLocation()` to derive title from pathname.

## R3: Stitch HTML Exports vs Issue Design Spec

**Decision**: Use the GitHub issue's "The Luminary Interface" design system as authoritative, NOT the Stitch HTML exports.

**Rationale**: The Stitch exports use a Material Design 3 light theme (`#fcf8ff` background, `#004e8b` primary blue) that does not match the issue's dark theme specification (`#060e20` base, `#50f4e3` teal). The issue was written after the Stitch screens and represents the final design direction. Stitch screenshots are used for layout/composition reference only.

**Alternatives considered**:
- Extract CSS from Stitch HTML → rejected, wrong color palette, would need full rewrite anyway
- Merge both systems → rejected, creates inconsistency

## R4: Google Fonts Loading

**Decision**: Load Plus Jakarta Sans and Inter via `<link>` tags in `index.html` with `preconnect` and `display=swap`.

**Rationale**: Simplest approach with no build toolchain changes. Google Fonts CDN is fast and cacheable. `preconnect` eliminates DNS/TLS latency. `display=swap` prevents render-blocking — text renders immediately with fallback font, then swaps to the web font once loaded.

**Weights needed**:
- Plus Jakarta Sans: 600 (semibold for titles), 700 (bold for headlines)
- Inter: 400 (regular body), 500 (medium labels), 600 (semibold)

**Alternatives considered**:
- Self-host fonts via npm package → rejected, adds build complexity, violates YAGNI
- `@import` in CSS → rejected, blocks rendering longer than `<link>` in `<head>`

## R5: CSS Architecture

**Decision**: Single `style.css` file with CSS custom properties for design tokens.

**Rationale**: Current architecture uses a single global CSS file. Adding CSS modules or CSS-in-JS would violate Simplicity & YAGNI. Custom properties enable easy token management.

**Token categories**:
- Colors (11 tokens)
- Typography (2 font families, 5 scales)
- Spacing (3 scales: 1rem, 2rem, 3.5rem)
- Radius (2 scales: 12px, 16px)

## R6: Pages Without Stitch Reference

**Decision**: Deviations, Audits, Cases, and Help pages extrapolate design from the established patterns.

**Rationale**: These pages are structurally identical to Documents (table + badges) or simple content (Help FAQ). Applying the same surface hierarchy, glow chips, and typography tokens creates visual consistency without dedicated designs.

| Page | Design Source |
|------|--------------|
| DeviationsPage | Same as Documents table pattern, severity uses tertiary/error colors |
| AuditsPage | Same as Documents table pattern, status uses primary/secondary colors |
| CasesPage | Same as Documents table pattern, priority uses tertiary/error colors |
| HelpPage | Card-based FAQ with surface-container-low background |
