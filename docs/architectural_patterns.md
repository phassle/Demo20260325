# Architectural Patterns — Centuri eQMS Demo

## Backend: Service Layer Pattern

Every domain entity follows:

```
Models/{Entity}.cs              — POCO with properties
Services/I{Entity}Service.cs    — interface (async methods returning Task<T>)
Services/{Entity}Service.cs     — implementation with in-memory data
Controllers/{Entity}sController.cs — thin REST controller, delegates to service
```

### DI Registration Rules

- **Domain services** → `AddScoped` — one instance per request
- **Infra fakes** → `AddSingleton` — shared in-memory state
- All registration at `backend/src/Program.cs:11-18`

### Controller Conventions

- Route template: `api/v2/[controller]` (`DocumentsController.cs:11`)
- All controllers inherit `ControllerBase` (API-only, no views)
- Actions return `IActionResult` — `Ok()`, `NotFound()`, `Forbid()`
- Auth check via `HttpContext.Items["UserRole"]` (`DocumentsController.cs:40`)

### Infra Fakes

Fake implementations stand in for real infrastructure. All log via `ILogger`.

| Interface          | Fake                   | Real equivalent  | DI Lifetime | Key impl detail                    |
|--------------------|------------------------|------------------|-------------|------------------------------------|
| `ICacheService`    | `FakeCacheService`     | Redis            | Singleton   | `ConcurrentDictionary` storage     |
| `ISchedulerService`| `FakeSchedulerService` | Quartz scheduler | Singleton   | No-op job scheduling               |
| `ISearchService`   | `FakeSearchService`    | Elasticsearch    | Scoped      | LINQ-based filtering               |

Swap to real impl: change DI registration in `Program.cs` only. No other code changes needed.

### Export Pattern (Documents)

`DocumentsController.cs:37-53`:
1. Auth-gated (`role != "admin"` → `Forbid()`)
2. Service returns `(IEnumerable<T>, bool truncated)`
3. Controller builds CSV with `StringBuilder`, sets `X-Truncated` header
4. Returns `Content(..., "text/csv")`

CSV escaping helper: `DocumentsController.cs:55-58`

## Frontend: React 19 SPA

### Routing

`react-router-dom` in `app.jsx:29-38` — `<Routes>` with `<Route path="..." element={...} />` per page.
Catch-all redirects to `/` (`app.jsx:38`).
Title lookup map: `app.jsx:12-21`.

### API Layer

Single file `frontend/src/services/api.js`:
- `fetchJson(url, signal)` (`api.js:3-7`) — prepends `/api/v2`, throws on non-ok
- Each entity exports `{ getAll(signal), getById(id) }` (`api.js:9-34`)

### Data Fetching Hook

`frontend/src/hooks/useApiData.js`:
- Wraps any API fn with `{ data, loading, error }` state
- AbortController cleanup on unmount (`useApiData.js:9,21`)
- Empty dependency array — fetches once on mount (`useApiData.js:22`)

### Layout Shell

`Layout.jsx` — sidebar + header + content area.
`Sidebar.jsx` — nav links using `react-router-dom` `NavLink`.
`Header.jsx` — title prop from route-based lookup.

### Design System: Centuri Prism Dark

CSS custom properties in `style.css:4-30`:
- Color tokens: `--color-base`, `--color-surface`, `--color-primary` (#50f4e3 teal)
- Typography: Plus Jakarta Sans (display), Inter (body)
- Spacing scale: `--space-3/6/10`
- Radius: `--radius-md` (0.75rem), `--radius-lg` (1rem)

Visual patterns:
- Glassmorphism cards (`backdrop-filter: blur`)
- Gradient CTA buttons (`.btn-gradient`)
- Glow effect on status chips

### Dev Proxy

`vite.config.js:8-13` — `/api` requests proxy to `http://localhost:5000` during dev.

### Testing

Vitest with jsdom environment (`vite.config.js:15-19`).
Tests in `frontend/src/__tests__/` follow `us{N}-{feature}.test.jsx` naming.
User-story prefixed: `us1` = routing, `us2` = design system, `us3` = page features.
