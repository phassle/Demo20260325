# Tasks: Centuri Prism Dark Theme Redesign

**Input**: Design documents from `/specs/001-prism-dark-theme/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, quickstart.md

**Tests**: TDD — one failing test per acceptance scenario BEFORE implementation. Red → Green cycle strictly enforced.

**Test Framework**: Vitest + @testing-library/react + jsdom (standard Vite + React testing stack)

**Organization**: Tasks grouped by user story. US1 → US2 → US3 sequential. Each ACC scenario gets a test task (RED) followed by implementation task (GREEN).

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: US1 (Framework Migration), US2 (Dark Theme), US3 (Page Fidelity)
- **🔴**: Write failing test
- **🟢**: Implement to make test pass

---

## Phase 1: Setup

**Purpose**: Swap Preact dependencies for React, add test framework, update build toolchain

- [ ] T001 Replace Preact with React dependencies in `frontend/package.json`: remove preact, preact-router, @preact/preset-vite; add react, react-dom, react-router-dom, @vitejs/plugin-react
- [ ] T002 Add test dependencies in `frontend/package.json` devDependencies: vitest, @testing-library/react, @testing-library/jest-dom, jsdom
- [ ] T003 Run `npm install` in `frontend/` to generate updated lock file
- [ ] T004 Switch Vite plugin from preact() to react() in `frontend/vite.config.js`; add test configuration: `test: { environment: 'jsdom', setupFiles: './src/test-setup.js' }`
- [ ] T005 Create `frontend/src/test-setup.js`: import `@testing-library/jest-dom`
- [ ] T006 Add `"test": "vitest run"` script to `frontend/package.json`
- [ ] T007 Add Google Fonts with preconnect and display=swap in `frontend/index.html`: Plus Jakarta Sans (600,700) and Inter (400,500,600)

**Checkpoint**: Build toolchain configured for React + Vitest. `npx vitest run` works (zero tests).

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Migrate entry points and shared infrastructure that ALL pages depend on

**⚠️ CRITICAL**: No page migration or tests can run until this phase is complete

- [ ] T008 Migrate `frontend/src/main.jsx`: replace `import { render } from 'preact'` with `import { createRoot } from 'react-dom/client'`; use `createRoot(document.getElementById('app')).render(<App />)`
- [ ] T009 Migrate `frontend/src/app.jsx`: replace preact-router `<Router>` with react-router-dom `<BrowserRouter>`, `<Routes>`, `<Route>`; add `<Route path="*" element={<Navigate to="/" />} />` catch-all; use `useLocation()` hook for title management instead of `onChange` callback
- [ ] T010 Migrate `frontend/src/hooks/useApiData.js`: change `import { useState, useEffect } from 'preact/hooks'` to `import { useState, useEffect } from 'react'`
- [ ] T011 Migrate `frontend/src/components/layout/Layout.jsx`: change `class=` to `className=` throughout
- [ ] T012 Migrate `frontend/src/components/layout/Sidebar.jsx`: replace manual `window.location.pathname` active-link detection with react-router-dom `<NavLink>` component; convert all `class=` to `className=`; convert `<a href>` links to `<NavLink to>`
- [ ] T013 Migrate `frontend/src/components/layout/Header.jsx`: change `class=` to `className=` throughout

**Checkpoint**: Layout shell renders in React. Sidebar navigation works with NavLink active state. Router handles all routes + 404 redirect.

---

## Phase 3: User Story 1 — Framework Migration (Priority: P1) 🎯 MVP

**Goal**: All 8 pages render identically to Preact version, running on React 19 + react-router-dom

**Independent Test**: `cd frontend && npx vitest run` — all ACC-1.x tests pass

**Acceptance Scenarios**:
- ACC-1.1: All 8 routes render correct page with data from backend API
- ACC-1.2: Sidebar nav clicks update URL and load page without full reload
- ACC-1.3: Data pages display tables with loading and error states preserved

### 🔴 Tests for User Story 1

> **Write these tests FIRST. They MUST FAIL before implementation begins.**

- [ ] T014 [US1] 🔴 Write failing test ACC-1.1 in `frontend/src/__tests__/us1-routes.test.jsx`: render App inside MemoryRouter for each of the 8 routes ("/", "/documents", "/deviations", "/audits", "/cases", "/users", "/settings", "/help"); mock `fetch` to return sample data for each API endpoint; assert each route renders its page component (e.g., DashboardPage renders 5 card elements, DocumentsPage renders a table, etc.); verify `npx vitest run` → RED (fails because pages still use Preact patterns)
- [ ] T015 [US1] 🔴 Write failing test ACC-1.2 in `frontend/src/__tests__/us1-navigation.test.jsx`: render Sidebar inside MemoryRouter; simulate clicking each NavLink; assert the active CSS class is applied to the clicked link and removed from others; verify `npx vitest run` → RED (fails because Sidebar still uses `<a>` tags not NavLink)
- [ ] T016 [US1] 🔴 Write failing test ACC-1.3 in `frontend/src/__tests__/us1-data-states.test.jsx`: render DocumentsPage (representative data page) inside MemoryRouter; test loading state: mock fetch that never resolves, assert "Loading..." text is rendered; test error state: mock fetch that rejects, assert error message is rendered; test data state: mock fetch that resolves with documents, assert table rows are rendered; verify `npx vitest run` → RED

### 🟢 Implementation for User Story 1

- [ ] T017 [P] [US1] 🟢 Migrate `frontend/src/pages/DashboardPage.jsx`: change `class=` to `className=`; update any preact/hooks imports to react
- [ ] T018 [P] [US1] 🟢 Migrate `frontend/src/pages/DocumentsPage.jsx`: change `class=` to `className=`; update any preact/hooks imports to react
- [ ] T019 [P] [US1] 🟢 Migrate `frontend/src/pages/DeviationsPage.jsx`: change `class=` to `className=`; update any preact/hooks imports to react
- [ ] T020 [P] [US1] 🟢 Migrate `frontend/src/pages/AuditsPage.jsx`: change `class=` to `className=`; update any preact/hooks imports to react
- [ ] T021 [P] [US1] 🟢 Migrate `frontend/src/pages/CasesPage.jsx`: change `class=` to `className=`; update any preact/hooks imports to react
- [ ] T022 [P] [US1] 🟢 Migrate `frontend/src/pages/UsersPage.jsx`: change `class=` to `className=`; update any preact/hooks imports to react
- [ ] T023 [P] [US1] 🟢 Migrate `frontend/src/pages/SettingsPage.jsx`: change `class=` to `className=`; change `onInput=` to `onChange=` on form inputs; update any preact/hooks imports to react
- [ ] T024 [P] [US1] 🟢 Migrate `frontend/src/pages/HelpPage.jsx`: change `class=` to `className=`
- [ ] T025 [US1] Run `npx vitest run` → GREEN (all ACC-1.x tests pass)
- [ ] T026 [US1] Run post-migration grep verification: no leftover `class=` (excluding className), no `preact` imports, no `onInput=`; run `npm run build`
- [ ] T027 [US1] Commit: "migrate frontend from Preact to React 19 + react-router-dom"

**Checkpoint**: All 8 pages functional on React. All US1 tests green. Old light theme still applied.

---

## Phase 4: User Story 2 — Dark Theme & Design System (Priority: P2)

**Goal**: Centuri Prism dark design system applied globally — dark background, teal primary, glow chips, glassmorphism, no solid borders

**Independent Test**: `cd frontend && npx vitest run` — all ACC-2.x tests pass

**Acceptance Scenarios**:
- ACC-2.1: Dark navy background (`#060e20`) with lighter surface tiers for nested elements
- ACC-2.2: Primary CTA buttons use teal gradient, never flat color
- ACC-2.3: Status badges use glow chip pattern (10% opacity background)
- ACC-2.4: Header uses glassmorphism (backdrop blur with semi-transparent bg)
- ACC-2.5: Interactive elements have minimum 12px corner radius

### 🔴 Tests for User Story 2

> **Write these tests FIRST. They MUST FAIL before implementation begins.**

- [ ] T028 [US2] 🔴 Write failing test ACC-2.1 in `frontend/src/__tests__/us2-dark-theme.test.jsx`: render Layout inside MemoryRouter; assert `document.body` or root element has computed background-color matching `#060e20` (rgb(6, 14, 32)); assert the content area uses a lighter surface tier background; verify `npx vitest run` → RED
- [ ] T029 [US2] 🔴 Write failing test ACC-2.2 in `frontend/src/__tests__/us2-cta-gradient.test.jsx`: render DocumentsPage (has "Export CSV" button with btn-primary class); assert the `.btn-primary` element has computed `background-image` containing `linear-gradient`; verify → RED
- [ ] T030 [US2] 🔴 Write failing test ACC-2.3 in `frontend/src/__tests__/us2-glow-chips.test.jsx`: render DocumentsPage with mocked data containing documents with various statuses; assert each status badge has a semi-transparent background (rgba with 0.1 alpha) and matching text color; verify → RED
- [ ] T031 [US2] 🔴 Write failing test ACC-2.4 in `frontend/src/__tests__/us2-glassmorphism.test.jsx`: render Header component; assert header element has computed `backdrop-filter` containing `blur`; verify → RED
- [ ] T032 [US2] 🔴 Write failing test ACC-2.5 in `frontend/src/__tests__/us2-radius.test.jsx`: render SettingsPage (has form inputs and buttons); assert `.btn` elements have computed `border-radius` >= 12px; assert `.form-input` elements have computed `border-radius` >= 12px; verify → RED

### 🟢 Implementation for User Story 2

- [ ] T033 [US2] 🟢 Full rewrite of `frontend/src/style.css`: add CSS custom properties for all design tokens (colors, typography, spacing, radius from data-model.md); rewrite global reset for dark theme (body background `--color-base`, text `--color-on-surface`); rewrite all component classes using tonal surface hierarchy instead of borders; implement glow chip badge classes with 10% opacity backgrounds; implement gradient CTA button styles; implement glassmorphic header styles (backdrop-filter blur 20px); implement ghost border utility (outline-variant at 15% opacity); set minimum border-radius 12px on interactive elements; use navy-tinted shadows (no #000000); add responsive breakpoint for 390px mobile
- [ ] T034 [US2] 🟢 Update `frontend/src/components/layout/Sidebar.jsx`: apply dark surface background (`--color-surface`), teal glow on active NavLink, section titles with `--color-on-surface` muted opacity
- [ ] T035 [US2] 🟢 Update `frontend/src/components/layout/Header.jsx`: apply glassmorphic styling (semi-transparent background + backdrop-blur), restyle search input with ghost border, update avatar and user info colors for dark theme
- [ ] T036 [US2] 🟢 Update `frontend/src/components/layout/Layout.jsx`: apply surface hierarchy to content area (`--color-base` on outer, `--color-surface-container-low` on content wrapper)
- [ ] T037 [US2] 🟢 Update badge markup across all page files to use new glow chip CSS classes — verify each page's status/severity/role badge maps to correct glow chip color per data-model.md badge color map
- [ ] T038 [US2] 🟢 Update loading and error state styling in all pages to use dark theme colors (not default browser styling)
- [ ] T039 [US2] Run `npx vitest run` → GREEN (all ACC-2.x tests pass, US1 tests still green)
- [ ] T040 [US2] Commit: "apply Centuri Prism dark design system globally"

**Checkpoint**: Every page shows dark theme. All US1 + US2 tests green.

---

## Phase 5: User Story 3 — Page-Specific Design Fidelity (Priority: P3)

**Goal**: Each page matches its Stitch design reference. Dashboard has KPI glow cards. Documents has tonal table. Users has violet role badges. Settings has ghost-border forms. Documents responsive at 390px.

**Independent Test**: `cd frontend && npx vitest run` — all ACC-3.x tests pass

**Acceptance Scenarios**:
- ACC-3.1: Dashboard KPI cards with glow chip styling and gradient CTAs
- ACC-3.2: Documents table with tonal row backgrounds and glow chip status badges
- ACC-3.3: Documents at 390px viewport reflows without horizontal scrolling
- ACC-3.4: Users page with violet role badges and colored activity indicators
- ACC-3.5: Settings form inputs with ghost borders (outline-variant 15% opacity)
- ACC-3.6: Sidebar with dark navy background and teal glow on active item

### 🔴 Tests for User Story 3

> **Write these tests FIRST. They MUST FAIL before implementation begins.**

- [ ] T041 [US3] 🔴 Write failing test ACC-3.1 in `frontend/src/__tests__/us3-dashboard.test.jsx`: render DashboardPage with mocked API data; assert KPI cards exist with glow chip styling (card elements have semi-transparent accent background); assert at least one gradient CTA button exists; verify → RED
- [ ] T042 [US3] 🔴 Write failing test ACC-3.2 in `frontend/src/__tests__/us3-documents.test.jsx`: render DocumentsPage with mocked documents including various statuses; assert table rows use alternating tonal backgrounds (no hard borders between rows); assert status badges use glow chip classes; verify → RED
- [ ] T043 [US3] 🔴 Write failing test ACC-3.3 in `frontend/src/__tests__/us3-documents-mobile.test.jsx`: render DocumentsPage with mocked data; set container width to 390px; assert no element has `overflow-x: scroll` or extends beyond viewport; assert content reflows to card-based layout (e.g., table is hidden and cards are shown, or table adapts); verify → RED
- [ ] T044 [US3] 🔴 Write failing test ACC-3.4 in `frontend/src/__tests__/us3-users.test.jsx`: render UsersPage with mocked users including roles (Admin, QualityManager, Auditor, Viewer); assert role badges use secondary color (`--color-secondary` / violet `#ac8aff`); assert active/inactive status indicators are rendered with appropriate colors; verify → RED
- [ ] T045 [US3] 🔴 Write failing test ACC-3.5 in `frontend/src/__tests__/us3-settings.test.jsx`: render SettingsPage; assert form inputs have ghost border styling (border-color using outline-variant token at reduced opacity, not solid opaque border); verify → RED
- [ ] T046 [US3] 🔴 Write failing test ACC-3.6 in `frontend/src/__tests__/us3-sidebar.test.jsx`: render Sidebar inside MemoryRouter at route "/documents"; assert sidebar background uses dark surface color; assert active NavLink ("/documents") has teal glow indicator styling; assert inactive links do not have teal glow; verify → RED

### 🟢 Implementation for User Story 3

- [ ] T047 [US3] 🟢 Redesign `frontend/src/pages/DashboardPage.jsx`: KPI summary cards with glow chip styling per Operations Dashboard Stitch screen (ID: a4c2277a2e4d4a6ca3c7e9e69fa16e4f); gradient CTA buttons; card layout matching Stitch composition
- [ ] T048 [US3] 🟢 Redesign `frontend/src/pages/DocumentsPage.jsx`: tonal row table (alternating surface tiers, no border separators); status glow chips; match Document Library Stitch screen (ID: 2b48e2769e8b4048b9bfa5bb4c7273bf); add responsive 390px layout per Document Library Mobile screen (ID: d460383c50ec4ee28943ae127add8abe) — card-based reflow, no horizontal scroll
- [ ] T049 [P] [US3] 🟢 Redesign `frontend/src/pages/DeviationsPage.jsx`: severity badges using tertiary (`--color-tertiary`) for High and error (`--color-error`) for Critical; tonal row table matching Documents pattern
- [ ] T050 [P] [US3] 🟢 Redesign `frontend/src/pages/AuditsPage.jsx`: audit status with surface-tier cards; tonal row table matching Documents pattern
- [ ] T051 [P] [US3] 🟢 Redesign `frontend/src/pages/CasesPage.jsx`: case type categorization with secondary color (`--color-secondary`); tonal row table matching Documents pattern
- [ ] T052 [US3] 🟢 Redesign `frontend/src/pages/UsersPage.jsx`: role badges using secondary violet (`--color-secondary`); activity indicators with colored status dots; match User Management Stitch screen (ID: a217a4dd81274a94a507b3600c7e4cbd)
- [ ] T053 [US3] 🟢 Redesign `frontend/src/pages/SettingsPage.jsx`: form inputs with ghost borders (outline-variant at 15% opacity); match System Settings Stitch screen (ID: d45f62f6fd904f7a9e71b63b66066e34)
- [ ] T054 [P] [US3] 🟢 Redesign `frontend/src/pages/HelpPage.jsx`: FAQ cards with `--color-surface-container-low` background, dark theme typography
- [ ] T055 [US3] Run `npx vitest run` → GREEN (all ACC-3.x tests pass, US1 + US2 tests still green)
- [ ] T056 [US3] Commit: "match page-specific Stitch design references"

**Checkpoint**: All pages match their design references. Documents responsive at 390px. All tests green.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final verification, edge cases, full test suite confirmation

- [ ] T057 Verify edge case: API error states styled with dark theme across all data-fetching pages
- [ ] T058 Verify edge case: viewport widths between 390px and desktop — no overflow or layout breaks
- [ ] T059 Verify edge case: long text in table cells truncates gracefully
- [ ] T060 Run full test suite: `cd frontend && npx vitest run` — all 14 ACC tests green
- [ ] T061 Run `cd frontend && npm run build` — confirm production build succeeds with zero errors
- [ ] T062 Run `cd backend && dotnet test` — confirm backend tests still pass (regression check)
- [ ] T063 Run quickstart.md verification checklist (all US1/US2/US3 manual checks)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 — BLOCKS all user stories
- **US1 (Phase 3)**: Depends on Phase 2 — tests first, then migrate pages
- **US2 (Phase 4)**: Depends on US1 completion — tests first, then theme
- **US3 (Phase 5)**: Depends on US2 completion — tests first, then page-specific design
- **Polish (Phase 6)**: Depends on US3 completion

### TDD Cycle Per User Story

```
1. Write ALL test files for the story (🔴 RED — tests fail)
2. Run vitest → confirm failures
3. Implement code changes (🟢 GREEN — tests pass)
4. Run vitest → confirm all tests pass
5. Commit
```

### User Story Dependencies

- **US1 (P1)**: BLOCKS US2 and US3. Framework must be migrated first.
- **US2 (P2)**: Depends on US1. BLOCKS US3. Global theme must exist before per-page refinement.
- **US3 (P3)**: Depends on US2. Independent page tasks (T049-T051, T054) can run in parallel.

### Within Each Phase

- Phase 1: T001 + T002 → T003 → T004 + T005 + T006 + T007 (parallel)
- Phase 2: T008 → T009 → T010 + T011 + T012 + T013 (parallel after T009)
- Phase 3: T014 + T015 + T016 (tests, parallel) → T017-T024 (pages, parallel) → T025 (verify) → T026 → T027
- Phase 4: T028-T032 (tests, parallel) → T033 (CSS) → T034 + T035 + T036 (layout, parallel) → T037 → T038 → T039 → T040
- Phase 5: T041-T046 (tests, parallel) → T047 → T048 → T049 + T050 + T051 + T054 (parallel) → T052 → T053 → T055 → T056
- Phase 6: T057-T059 (parallel) → T060 → T061 → T062 → T063

### Parallel Opportunities

- Phase 1: T004 + T005 + T006 + T007 in parallel
- Phase 2: T010 + T011 + T012 + T013 in parallel (after router setup)
- Phase 3: ALL 3 test files (T014-T016) in parallel; ALL 8 page migrations (T017-T024) in parallel
- Phase 4: ALL 5 test files (T028-T032) in parallel; layout updates T034-T036 in parallel
- Phase 5: ALL 6 test files (T041-T046) in parallel; T049 + T050 + T051 + T054 in parallel

---

## Test File Inventory

| Test File | ACC | Story | What It Tests |
|-----------|-----|-------|---------------|
| `us1-routes.test.jsx` | ACC-1.1 | US1 | All 8 routes render correct pages with data |
| `us1-navigation.test.jsx` | ACC-1.2 | US1 | Sidebar NavLink active state on click |
| `us1-data-states.test.jsx` | ACC-1.3 | US1 | Loading, error, and data states in data pages |
| `us2-dark-theme.test.jsx` | ACC-2.1 | US2 | Dark navy background + surface tiers |
| `us2-cta-gradient.test.jsx` | ACC-2.2 | US2 | Primary buttons use teal gradient |
| `us2-glow-chips.test.jsx` | ACC-2.3 | US2 | Status badges use 10% opacity glow |
| `us2-glassmorphism.test.jsx` | ACC-2.4 | US2 | Header has backdrop blur |
| `us2-radius.test.jsx` | ACC-2.5 | US2 | Interactive elements >= 12px radius |
| `us3-dashboard.test.jsx` | ACC-3.1 | US3 | KPI cards with glow + gradient CTAs |
| `us3-documents.test.jsx` | ACC-3.2 | US3 | Tonal row table + glow chip badges |
| `us3-documents-mobile.test.jsx` | ACC-3.3 | US3 | 390px responsive reflow |
| `us3-users.test.jsx` | ACC-3.4 | US3 | Violet role badges + activity indicators |
| `us3-settings.test.jsx` | ACC-3.5 | US3 | Ghost border form inputs |
| `us3-sidebar.test.jsx` | ACC-3.6 | US3 | Dark sidebar + teal active glow |

---

## Implementation Strategy

### MVP First (US1 Only)

1. Complete Phase 1: Setup (swap deps + test framework)
2. Complete Phase 2: Foundational (entry points + layout)
3. Write US1 tests (T014-T016) → RED
4. Migrate all pages (T017-T024) → GREEN
5. **STOP and VALIDATE**: All US1 tests pass, all routes work
6. Commit migration separately for revertability

### Incremental Delivery

1. Setup + Foundational → React + Vitest toolchain ready
2. US1 tests → RED → Implement → GREEN → Commit (migration)
3. US2 tests → RED → Implement → GREEN → Commit (theme)
4. US3 tests → RED → Implement → GREEN → Commit (fidelity)
5. Polish → Final verification → Done

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story
- 🔴 = write failing test, 🟢 = implement to pass
- 14 total acceptance tests across 3 user stories
- US1 → US2 → US3 are sequential (not parallelizable across stories)
- Within each story: write ALL tests first → then implement ALL
- Commit after each completed user story (3 commits total)
- `api.js` requires NO changes — pure fetch, no framework dependency
- React strict mode will double-fire useEffect in dev — expected behavior, not a bug
- jsdom has limited CSS computed style support — some visual tests may need to assert class names or inline styles rather than computed values
