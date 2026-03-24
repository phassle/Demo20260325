# Migration: PortCom Restaurant → Centuri eQMS Demo

## Context
Byta techstack och domän för workshop-repot. Nuvarande: .NET 8 + Vue 3/TypeScript restaurangapp. Mål: .NET 10 + Preact/JavaScript eQMS (kvalitetsledning) inspirerat av Centuri (Monterro portföljbolag). Alla tjänster förblir in-memory fakes men struktureras med interfaces redo för riktiga implementationer. Fake services skapas för SQL Server, Elasticsearch, Redis och Quartz.

---

## Phase 0: Förberedelse
1. `git mv frontend-vue frontend`
2. Ta bort `integrations/` helt
3. Skapa `global.json` med .NET 10 SDK-pinning
4. Rensa `bin/`, `obj/`, `node_modules/`, `dist/`

## Phase 1: Backend — .NET 10 eQMS API

### 1.1 Projekt & solution
- Byt namn: `PortCom.Demo` → `Centuri.Demo` (sln, csproj, test-csproj)
- `TargetFramework` → `net10.0`
- Lägg till NuGet: `Quartz`, `Quartz.Extensions.DependencyInjection`
- Behåll: `Serilog.AspNetCore`, `xunit`, `Moq`

### 1.2 Modeller (`backend/src/Models/`)
Ta bort: Customer, CustomerReview, FoodOrder, MenuItem, Payment

Skapa:
| Fil | Nyckelprops |
|---|---|
| `Document.cs` | Id, Title, Content, Category, Version, Status (Draft/InReview/Approved/Archived), CreatedBy, CreatedAt, UpdatedAt |
| `Deviation.cs` | Id, Title, Description, Severity (Low/Med/High/Critical), Status (Open/InProgress/Resolved/Closed), ReportedBy, AssignedTo, CreatedAt, ResolvedAt |
| `Audit.cs` | Id, Title, Type (Internal/External), Status (Planned/InProgress/Completed), AuditorName, Department, ScheduledDate, CompletedDate, Findings |
| `CaseItem.cs` | Id, Title, Description, Type (Complaint/Improvement/CAPA), Priority (Low/Med/High), Status (New/InProgress/Resolved), CreatedBy, CreatedAt |
| `User.cs` | Id, Name, Email, Role (Admin/Auditor/Manager/User), Department, IsActive, CreatedAt |

### 1.3 Service-interfaces (`backend/src/Services/`)
**Domän:** IDocumentService, IDeviationService, IAuditService, ICaseService, IUserService
**Infrastruktur (fake):**
- `ISearchService` — SearchAsync<T>(query) → Elasticsearch-like
- `ICacheService` — Get/Set/Remove → Redis-like
- `ISchedulerService` — ScheduleJob/GetJobs → Quartz-like
- `IDbContext` — Documents/Deviations/Audits/Cases/Users som IQueryable → SQL Server-like

### 1.4 Fake-implementationer
**Domäntjänster** (in-memory listor med seed-data, samma mönster som nuvarande):
- `DocumentService` — 20 dokument (SOP:er, QM-procedurer etc.)
- `DeviationService` — 15 avvikelser, **medveten bugg**: GetAllAsync filtrerar bort Closed, GetByIdAsync gör det inte
- `AuditService` — 10 revisioner
- `CaseService` — 12 ärenden
- `UserService` — 8 användare

**Infrastruktur-fakes:**
- `FakeSearchService` — LINQ .Where(Contains) + Serilog-logg
- `FakeCacheService` — ConcurrentDictionary + logg cache hit/miss
- `FakeSchedulerService` — List<(name,date)> in-memory + logg
- `FakeDbContext` — In-memory listor som IQueryable, SaveChangesAsync = no-op

### 1.5 Controllers (`backend/src/Controllers/`)
- `DocumentsController` — CRUD + `GET export` (CSV, admin-only)
- `DeviationsController` — CRUD + `PATCH {id}/status` (statusövergångar)
- `AuditsController` — CRUD + schemaläggning
- `CasesController` — CRUD + `PATCH {id}/status`
- `UsersController` — GET all + GET by id (read-only)

### 1.6 Program.cs
- Registrera alla domäntjänster (Scoped)
- Registrera FakeSearchService, FakeCacheService (Singleton), FakeSchedulerService (Singleton), FakeDbContext (Scoped)
- `AddQuartz()` + `AddQuartzHostedService()`
- Behåll Serilog, Authentication, Authorization, MapControllers

### 1.7 appsettings.json
Placeholder connection strings:
```json
{
  "ConnectionStrings": {
    "SqlServer": "Server=localhost;Database=CenturiQMS;...",
    "Redis": "localhost:6379",
    "Elasticsearch": "http://localhost:9200"
  },
  "Quartz": { "quartz.scheduler.instanceName": "CenturiScheduler" }
}
```

### 1.8 Middleware
Behåll AuthMiddleware — byt namespace till `Centuri.Demo.Middleware`

### 1.9 Tester
- `DocumentServiceTests.cs` — GetAll, GetById, GetCount, ExportAsync + TODO för CSV BDD
- `DeviationServiceTests.cs` — CRUD + statusövergångar + bugg-hint

## Phase 2: Frontend — Preact + JavaScript

### 2.1 Scaffold
- `package.json` — preact, preact-router, @preact/preset-vite, vite
- `vite.config.js` — Preact-plugin, port 3000, proxy /api → localhost:5000
- `index.html` — "Centuri eQMS Demo"

### 2.2 Källkod
```
frontend/src/
  main.jsx, app.jsx, style.css
  services/api.js          — fetch-baserad (documentApi, deviationApi, auditApi, caseApi, userApi)
  hooks/useApiData.js      — useState + useEffect + AbortController
  components/layout/       — Layout.jsx, Sidebar.jsx, Header.jsx
  pages/                   — Dashboard, Documents, Deviations, Audits, Cases, Users, Settings, Help
```

- Sidebar: QUALITY (Dashboard, Documents, Deviations, Audits) + MANAGEMENT (Cases, Users) + OTHER (Settings, Help)
- Dashboard: kort för öppna avvikelser, väntande revisioner, dokumentantal, aktiva ärenden
- Behåll samma CSS-struktur, uppdatera branding till "Centuri"

## Phase 3: Specs
- `GH-1` — Uppdatera endpoints till eQMS (documents, deviations, audits etc.)
- `GH-2` → `GH-2-document-export-csv.md` — Dokumentexport istället för kundexport
- `GH-3` → `GH-3-deviation-management.md` — Avvikelsehantering istället för matbeställningar

## Phase 4: README + .claude/
- README.md — Fullständig omskrivning med ny techstack, endpoints, projektstruktur
- `.claude/settings.json` — Uppdatera hook-sökvägar

## Workshop-buggar & TODOs (behåll demo-naturen)
1. **Bugg i DeviationService**: GetAllAsync filtrerar Closed, GetByIdAsync gör det inte
2. **TODO i tester**: CSV export-tester saknas
3. **TODO i api.js**: exportCsv utkommenterad

## Verifiering
1. `cd backend && dotnet build` ✓
2. `cd backend && dotnet test` ✓
3. `cd frontend && npm install && npm run build` ✓
4. Starta backend + frontend, verifiera alla endpoints
5. Kontrollera att medvetna buggar och TODOs finns på plats
