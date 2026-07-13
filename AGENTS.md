# Centuri eQMS Demo — Agent Guide

Be extremely concise. Sacrifice grammar for concision.
At the end of each plan, list unresolved questions.

## Purpose

Workshop demo app for Centuri eQMS (electronic Quality Management System).
Domain: controlled documents, deviations, audits, cases, users.
Contains **intentional bugs** for live-coding exercises — see `specs/` for workshop tasks.

## Tech Stack

| Layer    | Stack                                                          |
|----------|----------------------------------------------------------------|
| Backend  | .NET 10, ASP.NET Core Minimal Hosting, Serilog, Quartz        |
| Frontend | React 19, react-router-dom 7, Vite 8                          |
| Tests BE | xUnit, Moq                                                    |
| Tests FE | Vitest, Testing Library, jsdom                                 |
| Design   | Centuri Prism Dark (CSS custom properties, no component lib)   |

## Commands

```bash
# Backend
cd backend && dotnet build
cd backend && dotnet run --project src
cd backend && dotnet test

# Frontend
cd frontend && npm install
cd frontend && npm run dev        # localhost:3000, proxies /api → :5000
cd frontend && npm test           # vitest run
cd frontend && npm run build
```

## Project Structure

```
backend/
  src/
    Controllers/      # Thin REST controllers — api/v2/[controller]
    Models/            # POCOs
    Services/          # Interface + implementation per entity
    Middleware/         # !! STOP: AuthMiddleware.cs — never touch without asking
    Program.cs         # DI registration, pipeline config
  tests/               # xUnit service-level tests
frontend/
  src/
    components/layout/ # Layout, Header, Sidebar
    hooks/useApiData.js# Generic fetch hook {data, loading, error}
    pages/             # One page per route
    services/api.js    # All API calls, fetchJson() base
    style.css          # Centuri Prism Dark design tokens + components
specs/                 # Workshop task specifications (GH-1, GH-2, GH-3)
docs/                  # Architecture deep dives
```

## Key Patterns (summary)

Full details → [docs/architectural_patterns.md](docs/architectural_patterns.md)

**Backend — Service Layer**: Model → IService → Service → Controller. All async.
DI: domain services `AddScoped`, infra fakes `AddSingleton` (`Program.cs:11-18`).

**Frontend — API Layer**: `api.js:1-7` `fetchJson()` prepends `/api/v2`.
Each entity exports `getAll(signal)` + `getById(id)`.
`useApiData.js` wraps any fetch fn with loading/error/abort.

**Routing**: `app.jsx:29-38` — `<Routes>` with one `<Route>` per page.
Vite dev proxy: `vite.config.js:8-13`.

**Design System**: CSS-only tokens in `style.css:4-30`. Dark theme.
Glassmorphism cards, gradient CTAs, glow chips. No component library.

## Stop Rules

- `backend/src/Middleware/AuthMiddleware.cs` — **never modify without explicit approval**
- Linters handle code style — do not enforce formatting manually

## Adding a New Entity (checklist)

1. `Models/{Entity}.cs` — POCO
2. `Services/I{Entity}Service.cs` — interface with async methods
3. `Services/{Entity}Service.cs` — implementation (in-memory data)
4. `Services` DI registration in `Program.cs`
5. `Controllers/{Entity}sController.cs` — `[Route("api/v2/[controller]")]`, inherit `ControllerBase`
6. `tests/{Entity}ServiceTests.cs`
7. `frontend/src/services/api.js` — add `{entity}Api` export
8. `frontend/src/pages/{Entity}sPage.jsx`
9. `frontend/src/app.jsx` — add route + title entry

## Infra Fakes

| Interface          | Fake Implementation      | Stands in for   | DI Lifetime |
|--------------------|--------------------------|-----------------|-------------|
| `ICacheService`    | `FakeCacheService`       | Redis           | Singleton   |
| `ISchedulerService`| `FakeSchedulerService`   | Quartz jobs     | Singleton   |
| `ISearchService`   | `FakeSearchService`      | Elasticsearch   | Scoped      |

Swap to real impl by changing DI registration only.

## Workshop Tasks

| Spec                                  | Area     | Summary                           |
|---------------------------------------|----------|-----------------------------------|
| `specs/GH-1-upgrade-backend-to-dotnet-10.md` | Backend  | .NET 9 → 10 migration       |
| `specs/GH-2-document-export-csv.md`   | Full     | CSV export endpoint + UI button   |
| `specs/GH-3-deviation-management.md`  | Full     | Deviation CRUD enhancements       |

## Deep Dives

- [docs/architectural_patterns.md](docs/architectural_patterns.md) — Backend service layer, DI rules, controller conventions, frontend routing, API layer
