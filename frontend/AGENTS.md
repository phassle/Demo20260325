# AGENTS.md — Centuri eQMS Frontend

Be extremely concise. Sacrifice grammar for concision.
At the end of each plan, list unresolved questions.

Parent context → [../AGENTS.md](../AGENTS.md)

## Stack

- Preact 10.x + preact-router (`package.json:12-13`)
- Vite 8 with `@preact/preset-vite` (`vite.config.js:1-2`)
- Plain CSS — no preprocessor, no CSS modules (`src/style.css`)
- No TypeScript — all `.jsx` / `.js`

## Commands

```bash
npm install          # install deps
npm run dev          # http://localhost:3000 (proxies /api → localhost:5000)
npm run build        # production build → dist/
npm run preview      # preview production build
```

## Dev Proxy

Vite proxies `/api` → `http://localhost:5000` (`vite.config.js:8-12`). Backend must be running. No CORS config needed.

## Architecture

### Entry Point

`index.html:10` → `src/main.jsx:5` → `<App />` (`src/app.jsx`)

### Routing

`preact-router` in `src/app.jsx:33-41`. Title map at `app.jsx:13-22`.

| Route | Page Component | File |
|-------|---------------|------|
| `/` | `DashboardPage` | `src/pages/DashboardPage.jsx` |
| `/documents` | `DocumentsPage` | `src/pages/DocumentsPage.jsx` |
| `/deviations` | `DeviationsPage` | `src/pages/DeviationsPage.jsx` |
| `/audits` | `AuditsPage` | `src/pages/AuditsPage.jsx` |
| `/cases` | `CasesPage` | `src/pages/CasesPage.jsx` |
| `/users` | `UsersPage` | `src/pages/UsersPage.jsx` |
| `/settings` | `SettingsPage` | `src/pages/SettingsPage.jsx` |
| `/help` | `HelpPage` | `src/pages/HelpPage.jsx` |

### Adding a new page

1. Create `src/pages/{Name}Page.jsx` — export named function component
2. Add route in `src/app.jsx` — `<NamePage path="/name" />`
3. Add title entry in `app.jsx:13-22`
4. Add sidebar link in `src/components/layout/Sidebar.jsx:21-39`

### Layout Shell

Three components in `src/components/layout/`:

| Component | File | Purpose |
|-----------|------|---------|
| `Layout` | `Layout.jsx` | App shell: sidebar + header + content slot |
| `Sidebar` | `Sidebar.jsx` | Nav links, active state via `window.location.pathname` |
| `Header` | `Header.jsx` | Title, search input (cosmetic), notifications bell, user avatar |

Props: `Layout` takes `{ title, children }`, `Header` takes `{ title }`, `Sidebar` takes nothing.

### API Layer

Single file: `src/services/api.js`

- `fetchJson(url, signal)` — base helper, prepends `/api/v2`, throws on non-ok (`api.js:3-7`)
- Per-entity export: `documentApi`, `deviationApi`, `auditApi`, `caseApi`, `userApi`
- Each has `getAll(signal)` and `getById(id)`

Adding a new API client: add export object following existing pattern at `api.js:9-14`.

### Data Fetching Hook

`src/hooks/useApiData.js` — returns `{ data, loading, error }`.

- Wraps any `(signal) => Promise` function
- AbortController cleanup on unmount (`useApiData.js:9,21`)
- Usage: `const { data, loading, error } = useApiData(entityApi.getAll)`

### Page Pattern

Every list page follows:

1. `useApiData(entityApi.getAll)` for data
2. Loading/error guards (`if (loading) return ...`, `if (error) return ...`)
3. `<table class="data-table">` with `<thead>` + `<tbody>` mapping data
4. Status rendered with `<span class="badge badge-{color}">` — color maps defined per page

Ref: `DocumentsPage.jsx` as canonical example.

Dashboard is special — calls multiple APIs, computes derived counts (`DashboardPage.jsx:10-26`).

## CSS

Single file `src/style.css` — utility classes, no component scoping.

| Section | Classes | Lines |
|---------|---------|-------|
| App shell | `.app-shell`, `.main-area` | `style.css:7-8` |
| Sidebar | `.sidebar`, `.sidebar-link`, `.sidebar-link.active` | `style.css:11-18` |
| Header | `.header`, `.header-*` | `style.css:21-27` |
| Cards | `.card`, `.card-title`, `.card-value` | `style.css:36-38` |
| Tables | `.data-table` | `style.css:41-44` |
| Badges | `.badge-{color}` (green/red/yellow/blue/orange/gray) | `style.css:47-53` |
| Buttons | `.btn`, `.btn-primary` | `style.css:65-68` |
| Forms | `.form-group`, `.form-input`, `.form-select` | `style.css:75-78` |

Brand color: `#0D9488` (teal). Text: `#0f172a`. Muted: `#64748b`.

## Stubbed Features

- CSV export button disabled in `DocumentsPage.jsx:22-24` — TODO GH-2
- `api.js:13` — `exportCsv` commented out, uncomment when backend ready

## Deep Dive

- Patterns → [../docs/architectural_patterns.md](../docs/architectural_patterns.md)
- Backend API → [../backend/AGENTS.md](../backend/AGENTS.md)
