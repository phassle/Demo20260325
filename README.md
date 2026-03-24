# Centuri eQMS Demo — Agentic Development Workshop

Demo project for the Monterro **Agentic Development Workshop**.
An eQMS (electronic Quality Management System) demo inspired by Centuri (Monterro portfolio company). Quality management platform with document control, deviation handling, and audit management — built with C#/.NET 10 + Preact.

---

## Demos & Hands-on — copy-paste prompts

### DEMO: Generate AGENTS.md

```
Analyze this codebase and create an AGENTS.md file:
1. Keep it under 150 lines
2. Cover: WHAT (tech stack), WHY (purpose), HOW (commands)
3. Progressive Disclosure: index pointing to docs/ files
4. file:line references instead of code snippets
5. Assume linters handle code style
6. Always include these two lines:
   - Be extremely concise. Sacrifice grammar for concision.
   - At the end of each plan, list unresolved questions (if any).

Extract patterns into docs/architectural_patterns.md
Finally: ln -s AGENTS.md CLAUDE.md
```

### Hands-on 1: Write AGENTS.md (15 min)

Same prompt as above — then review & sharpen:
- Remove generic filler → keep only what matters for YOUR project
- Add stop rules (auth, DB, shared libs)
- Test: give a task → does she follow the rules?

---

### DEMO: First conversation

```
Add a health check endpoint at GET /api/health
that returns { status: ok, timestamp: DateTime.UtcNow }
```

### DEMO: Bug fix

```
Bug: GET /api/v2/deviations doesn't show deviation 5,
but GET /api/v2/deviations/5 returns it.
That shouldn't be possible.
```

### DEMO: Plan Mode

```
Implement GH-2. Plan mode.
```

### DEMO: Two prompts that level up plan mode

**"Ask me questions":**
```
Add a Preact dashboard that shows document approval status.
Poll GET /api/v2/documents every 10 seconds.
Ask me questions to clarify requirements.
```

**"Give me N options":**
```
We need role-based access control on our .NET API.
Read Controllers/ and give me 3 options.
```

### DEMO: Hooks in action

```
Add a GetDeviationById method to DeviationService
```

### DEMO: The full flow — Plan → Build → Simplify → Verify

```
Implement GH-2. Plan mode.
Ask me questions to clarify requirements.
```

---

### Hands-on 2: Plan Mode with questions & options (15 min)

**Prompt A — "Ask me questions":**
```
Add an endpoint GET /api/v2/documents/export that returns CSV.
Read the existing controllers and services.
Ask me questions to clarify requirements.
Plan mode.
```

**Prompt B — "Give me N options":**
```
We need to add caching to our API responses.
Read backend/src/Services/ and give me 3 options.
Plan mode.
```

1. Pick one (or try both if time allows)
2. Answer her questions — push back if she's wrong
3. Iterate the plan with `Ctrl+G` (edit in IDE)
4. Approve with `Shift+Tab` → let her build
5. Run `/simplify`

---

### Hands-on 3: Install plugins (5 min)

```bash
# 1. code-simplifier — better than /simplify for targeted cleanup
claude plugin install code-simplifier

# 2. feature-dev — 3 agents: plan, implement, verify
claude plugin install feature-dev

# 3. pr-review-toolkit — 6 agents: code review, test analysis, silent failures
claude plugin install pr-review-toolkit
```

Verify:
```bash
claude /help          # should show new commands
claude /simplify      # try it on your latest changes
```

---
---

## Quick start

```bash
# Backend (terminal 1)
cd backend && dotnet build && dotnet run
# → http://localhost:5000

# Frontend (terminal 2)
cd frontend && npm install && npm run dev
# → http://localhost:3000 (proxies /api → backend)
```

## Test & format

```bash
cd backend && dotnet test          # xUnit tests
cd backend && dotnet format        # code style check
```

---

## Project structure

```
Centuri/
├── backend/
│   ├── Centuri.Demo.sln
│   ├── src/
│   │   ├── Controllers/         ← REST endpoints (/api/v2/...)
│   │   ├── Services/            ← Business logic + interfaces + fakes
│   │   ├── Models/              ← Domain models
│   │   ├── Middleware/          ← AuthMiddleware
│   │   └── Program.cs           ← DI, Serilog, Quartz, routing
│   └── tests/                   ← xUnit test project
├── frontend/
│   ├── src/
│   │   ├── pages/               ← Dashboard, Documents, Deviations, ...
│   │   ├── components/          ← Layout, cards, tables
│   │   ├── services/api.js      ← Fetch client (all API calls here)
│   │   └── hooks/               ← useApiData
│   └── vite.config.js           ← Dev proxy → localhost:5000
├── specs/                       ← BDD spec files (GH-*.md)
└── .claude/
    ├── settings.json            ← Hooks + permissions
    ├── agents/                  ← Subagents
    └── commands/                ← Slash commands
```

---

## API endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/v2/documents` | All documents |
| GET | `/api/v2/documents/{id}` | Document by ID |
| GET | `/api/v2/documents/export` | CSV export (admin-only) |
| GET | `/api/v2/deviations` | All deviations |
| GET | `/api/v2/audits` | All audits |
| GET | `/api/v2/cases` | All cases |
| GET | `/api/v2/users` | All users |

---

## Infrastructure

The backend registers **Elasticsearch** (document search), **Redis** (caching), and **Quartz** (scheduled jobs) in the DI container — but all use **fake/in-memory implementations** so no external services are needed to run the demo.

---

## Agent setup

This project is pre-configured for agentic development with Claude Code.

**Hooks** (`.claude/settings.json`):

| Hook | Trigger | Command |
|------|---------|---------|
| PostToolUse | After Write/Edit | `dotnet format --verify-no-changes` |
| Stop | Agent says "done" | `dotnet test && dotnet build` |

**Permissions:**

| Allow | Deny |
|-------|------|
| `dotnet *`, `npm *`, `git *`, `cd *`, `ls *`, `cat *`, `mkdir *` | `rm -rf *`, `dotnet ef database update *` |

---

## Workshop tasks

There's a **known bug** in `backend/src/Services/DeviationService.cs`:

`GetAllAsync()` filters out certain deviations, but `GetByIdAsync()` doesn't apply the same filter — so deviation 5 is invisible in the list but still accessible by ID. This is used in the live demo.

The main feature task is **document CSV export** (GH-2):
- Backend endpoint exists: `GET /api/v2/documents/export`
- Frontend call is stubbed in `frontend/src/services/api.js` (commented out)
