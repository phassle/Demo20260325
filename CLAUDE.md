# AGENTS.md — Centuri eQMS Demo

Be extremely concise. Sacrifice grammar for concision.
At the end of each plan, list unresolved questions.

## WHAT — Tech Stack

| Layer | Tech | Version |
|-------|------|---------|
| Backend | C# / .NET | 10.0 (`global.json:2`) |
| Frontend | Preact + preact-router | 10.x (`frontend/package.json:12`) |
| Build | Vite 8 | `frontend/vite.config.js:1` |
| Logging | Serilog | `backend/src/Program.cs:7` |
| Scheduling | Quartz.NET | `backend/src/Program.cs:20` |
| Tests | xUnit | `backend/tests/` |
| Infra fakes | Elasticsearch, Redis, Quartz — all in-memory | `backend/src/Services/Fake*.cs` |

## WHY — Purpose

Electronic Quality Management System (eQMS) demo for Monterro Agentic Development Workshop.
Domain: document control, deviation handling, audit management, CAPA.
All data is in-memory — no database, no external services required.

## HOW — Commands

```bash
# Backend
cd backend && dotnet build && dotnet run --project src    # http://localhost:5000
cd backend && dotnet test                    # xUnit
cd backend && dotnet format                  # code style

# Frontend
cd frontend && npm install && npm run dev    # http://localhost:3000 (proxies /api → :5000)
cd frontend && npm run build                 # production build
```

## Architecture

- **Routing**: All controllers under `api/v2/[controller]` — see `backend/src/Controllers/`
- **DI registration**: `backend/src/Program.cs:11-18` — scoped services, singleton fakes
- **Service pattern**: Model → Interface → Implementation → Controller (details in [backend/AGENTS.md](backend/AGENTS.md#adding-a-new-entity))
- **Frontend API layer**: Single fetch client at `frontend/src/services/api.js`
- **Custom hook**: `frontend/src/hooks/useApiData.js` — loading/error state wrapper

Deep dive → [docs/architectural_patterns.md](docs/architectural_patterns.md)

## Stop Rules

1. **NEVER modify** `backend/src/Middleware/AuthMiddleware.cs` without asking — shared auth component
2. **NEVER run** `dotnet ef database update` — no real DB; denied in `.claude/settings.json:13`
3. **NEVER delete** `rm -rf` — denied in permissions
4. **Ask before** changing DI registrations in `Program.cs` — affects all endpoints

## Hooks (auto-enforced)

| Trigger | What runs | Ref |
|---------|-----------|-----|
| After any Write/Edit | `dotnet format --verify-no-changes` | `.claude/settings.json:19` |
| Stop (agent done) | `dotnet test && dotnet build` | `.claude/settings.json:31` |

Linters handle code style — do not add formatting rules here.

## API Endpoints

All GET-only under `api/v2/[controller]`. Each entity has `GetAll` + `GetById`. Documents also has `Export` (admin-only). Full table → [backend/AGENTS.md](backend/AGENTS.md#controllers)

## Testing

xUnit, no mocking, direct SUT instantiation. Details → [backend/AGENTS.md](backend/AGENTS.md#testing)

## Known Issues

- **DeviationService bug**: `GetAllAsync()` filters out `Closed` status (`DeviationService.cs:31`), but `GetByIdAsync()` returns all — intentional workshop demo bug

## Specs & Tasks

Feature specs live in `specs/GH-*.md` — read before implementing any GH-N task.

## Docs Index

| File | Content |
|------|---------|
| [backend/AGENTS.md](backend/AGENTS.md) | Domain models, services, controllers, testing, known bugs |
| [frontend/AGENTS.md](frontend/AGENTS.md) | Routing, pages, API layer, hooks, CSS classes |
| [docs/architectural_patterns.md](docs/architectural_patterns.md) | Service pattern, DI, controller conventions, frontend patterns |
| [specs/](specs/) | BDD feature specs (GH-1, GH-2, GH-3) |

## Active Technologies
- JavaScript (JSX), no TypeScrip + React 19, react-dom, react-router-dom, Vite 8 (@vitejs/plugin-react) (001-prism-dark-theme)
- N/A (frontend only, backend unchanged) (001-prism-dark-theme)

## Recent Changes
- 001-prism-dark-theme: Added JavaScript (JSX), no TypeScrip + React 19, react-dom, react-router-dom, Vite 8 (@vitejs/plugin-react)
