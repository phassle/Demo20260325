# GH-2: Document Export CSV

## User story
As an administrator
I want to export documents as a CSV file
so that I can share document data with external compliance tools.

## Acceptance criteria (BDD)

```gherkin
Scenario: Admin exports documents as CSV
  Given there are 20 documents in the system
  And I am logged in as an admin
  When I send GET /api/v2/documents/export
  Then the response status is 200
  And the Content-Type is "text/csv"
  And the CSV contains 20 rows plus a header

Scenario: Non-admin gets 403
  Given I am logged in as a regular user
  When I send GET /api/v2/documents/export
  Then the response status is 403

Scenario: Export with more than 10,000 documents
  Given there are 15,000 documents in the system
  And I am logged in as an admin
  When I send GET /api/v2/documents/export
  Then the response status is 200
  And the CSV contains 10,000 rows plus a header
  And the response includes header "X-Truncated: true"

Scenario: Empty system returns header only
  Given there are 0 documents in the system
  And I am logged in as an admin
  When I send GET /api/v2/documents/export
  Then the response status is 200
  And the CSV contains 0 rows plus a header
```

## Constraints
- Max 10,000 rows per export (truncate with header)
- Backend: `backend/src/Controllers/`, `backend/src/Services/`
- Frontend: `frontend/src/pages/DocumentsPage.jsx` (add Export button)
- Stop: Don't touch auth middleware (`backend/src/Middleware/`)

## Verification
- `cd backend && dotnet test` — all green
- `cd backend && dotnet build` — no warnings
- `cd frontend && npm run build` — no errors
