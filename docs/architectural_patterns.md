# Architectural Patterns — Centuri eQMS Demo

## Backend: Service Layer Pattern

Every domain entity follows the same structure:

```
Models/{Entity}.cs          — POCO with properties
Services/I{Entity}Service.cs — interface (async methods returning Task<T>)
Services/{Entity}Service.cs  — implementation with in-memory data
Controllers/{Entity}sController.cs — thin REST controller, delegates to service
```

Full checklist for adding a new entity → [backend/AGENTS.md](../backend/AGENTS.md#adding-a-new-entity)

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

Fake implementations stand in for Elasticsearch, Redis, Quartz. All log via `ILogger`, swap by changing DI registration only. Full table with DI lifetimes → [backend/AGENTS.md](../backend/AGENTS.md#infra-fakes)

### Export Pattern

Details → [backend/AGENTS.md](../backend/AGENTS.md#export-pattern-documents)

## Frontend: Preact SPA

### Routing

`preact-router` in `frontend/src/app.jsx:33-41` — one `<Page path="/route" />` per page.

### API Layer

Single file `frontend/src/services/api.js` — all API calls centralized. Each entity exports `getAll(signal)` + `getById(id)`, all through `fetchJson()` which prepends `/api/v2`. See `api.js:9-14` for pattern.

### Data Fetching Hook

`frontend/src/hooks/useApiData.js` — wraps any API call with `{ data, loading, error }` state. Supports AbortController for cleanup. Usage: `const { data, loading, error } = useApiData(entityApi.getAll)`.

### Layout & Dev Proxy

Details → [frontend/AGENTS.md](../frontend/AGENTS.md#layout-shell)
