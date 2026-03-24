# AGENTS.md — Centuri eQMS Backend

Be extremely concise. Sacrifice grammar for concision.
At the end of each plan, list unresolved questions.

Parent context → [../AGENTS.md](../AGENTS.md)

## Stack

- .NET 10, C#, minimal hosting (`Program.cs`)
- Serilog (logging), Quartz.NET (scheduling) — `Centuri.Demo.csproj:8-11`
- xUnit (tests) — `tests/Centuri.Demo.Tests.csproj`
- No database — all data in-memory static lists

## Commands

```bash
dotnet build                    # compile
dotnet run --project src        # http://localhost:5000
dotnet test                     # xUnit
dotnet format                   # auto-enforced by hook on every Write/Edit
```

## Stop Rules

1. **NEVER modify** `src/Middleware/AuthMiddleware.cs` without asking — shared auth, see comment at line 4
2. **Ask before** changing DI in `src/Program.cs:11-18` — affects all endpoints
3. **NEVER run** `dotnet ef database update` — no real DB

## Domain Model

| Model | File | Enums |
|-------|------|-------|
| Document | `src/Models/Document.cs` | `DocumentStatus`: Draft, InReview, Approved, Archived |
| Deviation | `src/Models/Deviation.cs` | `DeviationSeverity`: Low→Critical; `DeviationStatus`: Open→Closed |
| Audit | `src/Models/Audit.cs` | `AuditType`: Internal/External; `AuditStatus`: Planned→Completed |
| CaseItem | `src/Models/CaseItem.cs` | `CaseType`: Complaint/Improvement/CAPA; `CasePriority`; `CaseStatus` |
| User | `src/Models/User.cs` | `UserRole`: Admin, Auditor, Manager, User |

All models are POCOs with `{ get; set; }` properties. No validation attributes, no EF annotations.

## Service Layer

Every entity follows: `Interface → Implementation → Controller`

| Interface | Implementation | Registration |
|-----------|---------------|-------------|
| `IDocumentService` | `DocumentService` | Scoped (`Program.cs:11`) |
| `IDeviationService` | `DeviationService` | Scoped (`Program.cs:12`) |
| `IAuditService` | `AuditService` | Scoped (`Program.cs:13`) |
| `ICaseService` | `CaseService` | Scoped (`Program.cs:14`) |
| `IUserService` | `UserService` | Scoped (`Program.cs:15`) |

### Adding a new entity

1. `src/Models/{Entity}.cs` — POCO
2. `src/Services/I{Entity}Service.cs` — interface with `Task<T>` methods
3. `src/Services/{Entity}Service.cs` — implementation with `static readonly` data list
4. `src/Controllers/{Entity}sController.cs` — thin controller, inject interface
5. Register in `Program.cs` — `AddScoped<IService, Impl>()`
6. `tests/{Entity}ServiceTests.cs` — direct instantiation, no mocks

### Infra Fakes

| Interface | Fake | Real service | DI lifetime |
|-----------|------|-------------|-------------|
| `ISearchService` | `FakeSearchService` — `string.Contains()` filter | Elasticsearch | Scoped (`Program.cs:16`) |
| `ICacheService` | `FakeCacheService` — `ConcurrentDictionary` | Redis | Singleton (`Program.cs:17`) |
| `ISchedulerService` | `FakeSchedulerService` — in-memory list | Quartz | Singleton (`Program.cs:18`) |

All fakes log operations via `ILogger`. Swap to real impl by changing DI registration only.

## Controllers

All controllers: `[ApiController]`, `[Route("api/v2/[controller]")]`, inherit `ControllerBase`.

| Controller | Actions | Special |
|-----------|---------|---------|
| `DocumentsController` | GetAll, GetById, Export | Export checks `HttpContext.Items["UserRole"]` for admin (`DocumentsController.cs:40`) |
| `DeviationsController` | GetAll, GetById | — |
| `AuditsController` | GetAll, GetById | — |
| `CasesController` | GetAll, GetById | — |
| `UsersController` | GetAll, GetById | — |

Standard controller pattern: inject `IService`, return `Ok()` / `NotFound()` / `Forbid()`.

### Export Pattern (Documents)

Controller auth check → service returns `(data, truncated)` tuple → controller builds CSV → `Content("text/csv")` + `X-Truncated` header. Ref: `DocumentsController.cs:37-53`, `DocumentService.cs:39-44`.

## Auth

`AuthMiddleware` (`src/Middleware/AuthMiddleware.cs:17-23`) — demo mode, always sets `UserRole=admin`, `UserId=demo-user`. Real impl would validate JWT from Azure AD. **Not registered in pipeline** — `UseAuthentication()`/`UseAuthorization()` are called but middleware is not in `app.Use()`.

## Config

- `src/appsettings.json` — connection strings (unused in demo), Quartz RAM store, Serilog console
- `global.json` — pins .NET SDK 10.0.201 with `rollForward: latestFeature`

## Testing

- Test project: `tests/`
- Pattern: `{Service}Tests.cs`, `[Fact]`, naming `Method_Scenario_Expected`
- SUT instantiated directly — no DI, no mocking
- Existing: `DocumentServiceTests.cs` (4 tests), `DeviationServiceTests.cs` (3 tests)

## Known Bug

`DeviationService.cs:31` — `GetAllAsync()` filters `Status != Closed`, but `GetByIdAsync()` returns all. Intentional workshop demo bug.

## Deep Dive

- Patterns → [../docs/architectural_patterns.md](../docs/architectural_patterns.md)
- Specs → [../specs/](../specs/)
