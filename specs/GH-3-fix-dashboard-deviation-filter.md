# GH-3: Fix Dashboard — Deviation Filter Bug

## Problem

`DeviationService.GetAllAsync()` filters out `Closed` deviations, causing dashboard KPI cards to display incorrect counts.

## Root Cause

`backend/src/Services/DeviationService.cs:29-31` — `.Where(d => d.Status != DeviationStatus.Closed)` excludes closed deviations from the result set.

## BDD Specification

### Feature: Deviation listing returns all deviations regardless of status

```gherkin
Feature: DeviationService returns complete deviation data

  Scenario: GetAllAsync returns deviations in all statuses
    Given the system has deviations with statuses Open, InProgress, Resolved, and Closed
    When GetAllAsync is called
    Then all deviations are returned including Closed ones

  Scenario: Dashboard KPI "Open Deviations" shows correct count
    Given the deviation API returns all deviations
    When the dashboard loads
    Then the "Open Deviations" card shows the count of deviations with status Open or InProgress

  Scenario: Dashboard KPI "Critical / High Deviations" shows correct count
    Given the deviation API returns all deviations
    When the dashboard loads
    Then the "Critical / High Deviations" card includes Critical and High severity deviations across all statuses
```

## Fix

| File | Change |
|------|--------|
| `backend/src/Services/DeviationService.cs:30-31` | Remove `.Where(d => d.Status != DeviationStatus.Closed)`, return all deviations |

## Scope

Minimal fix only. No test changes, no error UX changes.
