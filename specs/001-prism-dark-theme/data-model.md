# Data Model: Centuri Prism Dark Theme Redesign

**Date**: 2026-03-24

## Overview

This feature has no backend data model changes. The "data model" is the design token system that drives all visual rendering.

## Design Token Model

### Color Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--color-base` | `#060e20` | Page background, deepest surface |
| `--color-surface` | `#0a1628` | Sidebar, card backgrounds |
| `--color-surface-container-low` | `#101d32` | Nested containers, table rows (even) |
| `--color-surface-container-high` | `#1a2940` | Elevated containers, hover states |
| `--color-primary` | `#50f4e3` | Active indicators, links, primary text accent |
| `--color-primary-container` | `#05d2c2` | Gradient end for CTA buttons |
| `--color-secondary` | `#ac8aff` | Role badges, secondary interactions |
| `--color-tertiary` | `#ff9c7e` | Warnings, severity highlights |
| `--color-error` | `#ff716c` | Error states, critical severity |
| `--color-on-surface` | `#dee5ff` | Primary text on dark surfaces |
| `--color-outline-variant` | `#40485d` | Ghost borders (used at 15% opacity) |

### Typography Tokens

| Token | Value | Scale |
|-------|-------|-------|
| `--font-display` | `'Plus Jakarta Sans', sans-serif` | Headlines, titles |
| `--font-body` | `'Inter', sans-serif` | Body, labels, data |
| `--text-display-lg` | 3.5rem / 700 | Hero headlines (unused in current pages) |
| `--text-headline-lg` | 2rem / 700 | Page titles |
| `--text-title-md` | 1.125rem / 600 | Card headers, section titles |
| `--text-body-md` | 0.875rem / 400 | Data entries, body text |
| `--text-label-sm` | 0.6875rem / 500 | Uppercase metadata, micro-copy |

### Spacing Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--space-3` | 1rem | Internal padding |
| `--space-6` | 2rem | Section gaps |
| `--space-10` | 3.5rem | Page margins |

### Radius Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-md` | 0.75rem (12px) | Inputs, cards |
| `--radius-lg` | 1rem (16px) | Buttons, containers |

### Badge Color Map (Glow Chips)

Status/severity badges use 10% opacity of their color as background:

| Badge | Text Color | Background |
|-------|-----------|------------|
| Green (Approved, Active, Resolved, Completed) | `#50f4e3` | `rgba(80, 244, 227, 0.1)` |
| Red (Critical, Error, Open) | `#ff716c` | `rgba(255, 113, 108, 0.1)` |
| Yellow (InProgress, InReview, Medium, Planned) | `#fbbf24` | `rgba(251, 191, 36, 0.1)` |
| Blue (Auditor, Planned) | `#ac8aff` | `rgba(172, 138, 255, 0.1)` |
| Orange (High) | `#ff9c7e` | `rgba(255, 156, 126, 0.1)` |
| Gray (Draft, Low, Closed, Viewer) | `#8896b3` | `rgba(136, 150, 179, 0.1)` |

## Entity Mapping (Unchanged)

Frontend consumes these backend entities via API — no changes:

| Entity | API Endpoint | Pages |
|--------|-------------|-------|
| Document | `/api/v2/documents` | DashboardPage, DocumentsPage |
| Deviation | `/api/v2/deviations` | DashboardPage, DeviationsPage |
| Audit | `/api/v2/audits` | DashboardPage, AuditsPage |
| Case | `/api/v2/cases` | DashboardPage, CasesPage |
| User | `/api/v2/users` | UsersPage |
