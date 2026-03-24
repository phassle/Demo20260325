# GH-3: Deviation Management

## User story
As a quality manager
I want to create, update, and manage deviations
so that I can track quality issues through their lifecycle.

## BDD Scenarios

```gherkin
Feature: Deviation Management

  # --- Create deviation ---

  Scenario: Quality manager creates a deviation with valid data
    Given I am logged in as a quality manager
    When I send POST /api/v2/deviations with body:
      | title       | Incorrect labeling on batch 2024-Q3 |
      | description | Labels on 120 units show wrong expiry date |
      | severity    | Major                                |
    Then the response status is 201
    And the response body contains a new deviation ID
    And the deviation status is "Open"
    And the severity is "Major"

  Scenario: Create deviation without title returns 422
    Given I am logged in as a quality manager
    When I send POST /api/v2/deviations with body:
      | title       |                                      |
      | description | Missing title should fail validation |
      | severity    | Minor                                |
    Then the response status is 422
    And the response body contains a validation error for title

  Scenario: Create deviation without description returns 422
    Given I am logged in as a quality manager
    When I send POST /api/v2/deviations with body:
      | title       | No description deviation              |
      | description |                                       |
      | severity    | Minor                                 |
    Then the response status is 422
    And the response body contains a validation error for description

  # --- Advance status ---

  Scenario: Advance deviation from Open to InProgress
    Given there is a deviation with ID "dev-1" in status "Open"
    And I am logged in as a quality manager
    When I send PATCH /api/v2/deviations/dev-1/status with body {"status": "InProgress"}
    Then the response status is 200
    And the deviation status is "InProgress"

  Scenario: Advance deviation from InProgress to Resolved
    Given there is a deviation with ID "dev-2" in status "InProgress"
    And I am logged in as a quality manager
    When I send PATCH /api/v2/deviations/dev-2/status with body {"status": "Resolved"}
    Then the response status is 200
    And the deviation status is "Resolved"

  Scenario: Advance deviation from Resolved to Closed
    Given there is a deviation with ID "dev-3" in status "Resolved"
    And I am logged in as a quality manager
    When I send PATCH /api/v2/deviations/dev-3/status with body {"status": "Closed"}
    Then the response status is 200
    And the deviation status is "Closed"

  Scenario: Illegal status transition from Open directly to Closed
    Given there is a deviation with ID "dev-4" in status "Open"
    And I am logged in as a quality manager
    When I send PATCH /api/v2/deviations/dev-4/status with body {"status": "Closed"}
    Then the response status is 422
    And the response body describes the invalid transition from "Open" to "Closed"

  Scenario: PATCH on a non-existent deviation returns 404
    Given no deviation with ID "dev-999" exists
    And I am logged in as a quality manager
    When I send PATCH /api/v2/deviations/dev-999/status with body {"status": "InProgress"}
    Then the response status is 404

  # --- Frontend: deviation list with status buttons ---

  Scenario: Status transition button advances deviation on click
    Given the deviations list page is open
    And a deviation row shows status "Open"
    When the quality manager clicks the "Mark InProgress" button on that row
    Then the row status updates to "InProgress"
    And the available action button changes to "Mark Resolved"

  Scenario: Closed deviations show no transition buttons
    Given the deviations list page is open
    And a deviation row shows status "Closed"
    Then no status transition button is visible for that row

  # --- Frontend: new deviation form ---

  Scenario: Quality manager submits new deviation form with severity selection
    Given the new-deviation form is open
    When the quality manager enters title "Temperature excursion in storage area B"
    And enters description "Recorded temperature exceeded threshold for 4 hours"
    And selects severity "Critical"
    And clicks Submit
    Then a POST request is sent to /api/v2/deviations
    And the new deviation appears in the deviation list with status "Open"
    And the displayed severity is "Critical"

  Scenario: New deviation form blocks submission when title is empty
    Given the new-deviation form is open
    When the quality manager leaves the title field empty
    And enters a description and selects a severity
    Then the Submit button is disabled or shows a validation message

  # --- Severity handling ---

  Scenario: Severity is always set by the reporter
    Given I am logged in as a quality manager
    When I send POST /api/v2/deviations with body:
      | title       | Packaging defect on line 3           |
      | description | Seal integrity failure on 50 units   |
      | severity    | Critical                             |
    Then the response status is 201
    And the severity in the response is "Critical"
    And the severity matches the reporter-provided value
```

## Constraints
- Allowed status transitions: Open → InProgress → Resolved → Closed
- Severity is always set by the reporter at creation time
- Affected files: `frontend/src/pages/DeviationsPage.jsx`, `backend/src/Controllers/DeviationsController.cs`, `backend/src/Services/DeviationService.cs`
- Stop: do not touch `backend/src/Middleware/AuthMiddleware.cs`

## Verification
- `cd backend && dotnet test` — all green
- `cd backend && dotnet build` — no warnings
- `cd frontend && npm run build` — no errors
