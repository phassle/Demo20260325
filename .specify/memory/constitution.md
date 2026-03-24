<!--
Sync Impact Report
==================
- Version change: 1.0.0 → 2.0.0 (MAJOR — frontend framework redefinition)
- Modified constraints:
  - Frontend: "Preact 10.x + preact-router + Vite 8"
    → "React 19 + react-router-dom + Vite 8"
- Rationale: Feature 001-prism-dark-theme migrates the frontend
  framework as its primary deliverable. This is an incompatible
  redefinition of a non-negotiable constraint, requiring MAJOR bump.
- Templates requiring updates:
  - .specify/templates/plan-template.md — ✅ no update needed
  - .specify/templates/spec-template.md — ✅ no update needed
  - .specify/templates/tasks-template.md — ✅ no update needed
- Follow-up TODOs: none
-->

# Centuri eQMS Constitution

## Core Principles

### I. Service Pattern Adherence

Every domain entity MUST follow the four-layer pattern:
**Model → Interface → Implementation → Controller**.

- Models live in `backend/src/Models/`.
- Service interfaces in `backend/src/Services/I*Service.cs`.
- Implementations in `backend/src/Services/*Service.cs`.
- Controllers in `backend/src/Controllers/` under route `api/v2/[controller]`.
- DI registration in `Program.cs` MUST NOT be modified without
  explicit approval—it affects all endpoints.

Rationale: Consistent layering keeps the codebase navigable for
workshop participants encountering it for the first time.

### II. In-Memory First

All persistence MUST use in-memory fakes. No real databases,
no external services.

- Elasticsearch, Redis, and Quartz are faked via
  `backend/src/Services/Fake*.cs`.
- `dotnet ef database update` is explicitly denied.
- Data resets on every restart—this is intentional for demo use.

Rationale: The project is a workshop demo. External dependencies
would add setup friction and break portability.

### III. Test Discipline

All features MUST have xUnit tests. Tests instantiate SUTs
directly—no mocking frameworks.

- Tests live in `backend/tests/`.
- `dotnet test` MUST pass before any merge (enforced by stop hook).
- Known bugs (e.g., DeviationService filter inconsistency) are
  intentional and MUST NOT be "fixed" without workshop context.

Rationale: Direct instantiation keeps tests readable and fast.
Known bugs serve as workshop discovery exercises.

### IV. Simplicity & YAGNI

Implement only what is requested. No speculative abstractions,
no premature generalization.

- Three similar lines of code are preferable to one abstraction
  used once.
- No feature flags, backward-compatibility shims, or unused
  re-exports.
- Comments only where logic is non-obvious. No docstrings on
  code you did not change.

Rationale: Workshop participants must understand every line.
Unnecessary complexity obscures the learning goals.

### V. Structured Observability

All backend services MUST log via Serilog. Frontend errors
MUST surface in the browser console with actionable context.

- Serilog is configured in `backend/src/Program.cs`.
- Log levels: Information for happy paths, Warning for
  recoverable issues, Error for failures.
- No silent catch blocks—every exception MUST be logged or
  rethrown.

Rationale: When live-demoing, structured logs are the primary
debugging tool. Silent failures waste workshop time.

## Technology Constraints

The following stack constraints are non-negotiable:

| Constraint | Rule |
|------------|------|
| Backend | C# / .NET 10.0 — version locked in `global.json` |
| Frontend | React 19 + react-router-dom + Vite 8 |
| Persistence | In-memory only (Fake* services) |
| External services | None — no DB, no Redis, no Elasticsearch |
| Auth | `AuthMiddleware.cs` MUST NOT be modified without asking |
| Destructive ops | `rm -rf` denied in permissions |

All dependencies MUST be resolvable via `dotnet restore` and
`npm install` with no additional setup steps.

## Development Workflow

### Build & Run

```bash
# Backend
cd backend && dotnet build && dotnet run --project src

# Frontend
cd frontend && npm install && npm run dev
```

### Automated Hooks

| Trigger | Action |
|---------|--------|
| After Write/Edit | `dotnet format --verify-no-changes` |
| Agent stop | `dotnet test && dotnet build` |

### Quality Gates

- `dotnet format` MUST pass (auto-enforced by hook).
- `dotnet test` MUST pass before completion (stop hook).
- `dotnet build` MUST succeed with zero warnings treated as
  guidance (not hard gate).
- Feature specs MUST exist in `specs/GH-*.md` before
  implementation of any GH-N task.

### Branching

- Main branch: `main`.
- Feature work on topic branches.
- PRs target `main` unless otherwise specified.

## Governance

This constitution supersedes conflicting guidance in any other
project document. Amendments require:

1. A description of the change and its rationale.
2. Version bump following semver:
   - MAJOR: principle removal or incompatible redefinition.
   - MINOR: new principle or material expansion.
   - PATCH: clarification, wording, typo fix.
3. Update to `LAST_AMENDED_DATE`.
4. Propagation check across `.specify/templates/` for
   consistency with updated principles.

All PRs and reviews MUST verify compliance with these principles.
Complexity beyond what a principle allows MUST be justified in a
Complexity Tracking table (see plan template).

Runtime development guidance lives in `CLAUDE.md` (root) and
the per-directory `AGENTS.md` files.

**Version**: 2.0.0 | **Ratified**: 2026-03-24 | **Last Amended**: 2026-03-24
