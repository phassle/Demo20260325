# Feature Specification: Centuri Prism Dark Theme Redesign

**Feature Branch**: `001-prism-dark-theme`
**Created**: 2026-03-24
**Status**: Draft
**Input**: User description: "Redesign frontend from Preact to React and apply Centuri Prism dark design system"
**GitHub Issue**: #1

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Framework Migration (Priority: P1)

The application currently runs on Preact with preact-router. Users MUST be able to use the same application with identical functionality after migration to React with react-router. All eight existing pages (Dashboard, Documents, Deviations, Audits, Cases, Users, Settings, Help) MUST remain accessible and functional.

**Why this priority**: Without framework migration, none of the design system work can proceed. React is the target runtime for all subsequent stories.

**Independent Test**: Navigate to every route, verify all API data loads, confirm all interactive elements (buttons, links, search) work identically to the Preact version.

**Acceptance Scenarios**:

1. **Given** the application is running, **When** a user navigates to any of the 8 routes, **Then** the correct page renders with data from the backend API
2. **Given** the sidebar navigation is visible, **When** a user clicks any navigation link, **Then** the URL updates and the corresponding page loads without full page reload
3. **Given** pages that fetch API data (Documents, Deviations, Audits, Cases, Users), **When** the page loads, **Then** data displays in tables with loading and error states preserved

---

### User Story 2 - Dark Theme & Design System (Priority: P2)

The application MUST adopt the "Centuri Prism" dark design system. The current light theme with system fonts MUST be replaced with a deep navy base (`#060e20`), teal primary accent, violet secondary, and sunset orange tertiary. Typography MUST use Plus Jakarta Sans for headings and Inter for body text. The design follows a "no-line" rule — no solid borders for sectioning, only tonal surface layering.

**Why this priority**: The dark theme is the primary visual deliverable and the reason for the redesign. It transforms the application from a generic light UI into a premium branded experience.

**Independent Test**: Open any page and verify: dark background, correct color tokens applied, Plus Jakarta Sans headings, Inter body text, no `1px solid` borders used for sectioning, glassmorphic header with backdrop blur.

**Acceptance Scenarios**:

1. **Given** any page in the application, **When** the user views it, **Then** the background is deep navy (`#060e20`) with lighter surface tiers for nested elements
2. **Given** any primary action button (CTA), **When** the user sees it, **Then** it displays a teal gradient (`#50f4e3` to `#05d2c2`), never a flat color
3. **Given** any status indicator (badges, chips), **When** displayed, **Then** it uses the "glow chip" pattern (10% opacity background of the status hue)
4. **Given** the page header area, **When** visible, **Then** it uses glassmorphism (backdrop blur with semi-transparent background)
5. **Given** any interactive element, **When** rendered, **Then** corner radius is at minimum 12px

---

### User Story 3 - Page-Specific Design Fidelity (Priority: P3)

Each page MUST match its corresponding Stitch design screen. The Dashboard MUST show KPI cards with glow chips and gradient CTAs. The Document Library MUST display a table with tonal row styling and status glow chips. User Management MUST show role badges and activity indicators. System Settings MUST use form inputs with ghost borders. The Document Library MUST be responsive down to 390px mobile width.

**Why this priority**: Page-specific fidelity ensures the demo looks polished and matches the approved design reference created in Stitch. This is the "last mile" that makes the demo presentable.

**Independent Test**: Open each page side-by-side with its Stitch screenshot and verify visual correspondence. Test Document Library at 390px viewport width.

**Acceptance Scenarios**:

1. **Given** the Dashboard page, **When** rendered, **Then** KPI summary cards display with glow chip styling and gradient CTA buttons matching the Operations Dashboard Stitch screen
2. **Given** the Documents page, **When** rendered, **Then** the table uses tonal row backgrounds (no line separators) and status badges use glow chip pattern
3. **Given** the Documents page on a 390px viewport, **When** rendered, **Then** content reflows to a mobile-friendly layout without horizontal scrolling
4. **Given** the Users page, **When** rendered, **Then** role badges use secondary color (violet) and activity status uses colored indicators
5. **Given** the Settings page, **When** rendered, **Then** form inputs use ghost borders (outline-variant at 15% opacity)
6. **Given** the sidebar navigation, **When** rendered, **Then** it uses deep navy background with teal glow on the active item

---

### Edge Cases

- What happens when API requests fail? Error states MUST be styled consistently with the dark theme (not default browser error styling)
- What happens on viewport widths between mobile (390px) and desktop? Content MUST not break or overflow
- What happens with long text content in table cells? Text MUST truncate gracefully, not break the layout
- What happens with empty data states (no documents, no users)? Empty states MUST be styled with the dark theme

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Application MUST migrate from Preact + preact-router to React + react-router while preserving all existing routes and functionality
- **FR-002**: Application MUST apply the Centuri Prism dark design system globally — no page may retain the old light theme
- **FR-003**: All color tokens MUST match the design system specification (base `#060e20`, primary `#50f4e3`, secondary `#ac8aff`, tertiary `#ff9c7e`, error `#ff716c`)
- **FR-004**: Typography MUST use Plus Jakarta Sans for display/headline/title scales and Inter for body/label scales, loaded via Google Fonts
- **FR-005**: Surface hierarchy MUST use tonal layering (surface to surface-container-low to surface-container-high), not line borders
- **FR-006**: All existing API integrations MUST continue to work — backend is unchanged
- **FR-007**: Document Library page MUST be responsive and usable at 390px mobile viewport width
- **FR-008**: No new pages, routes, or backend changes are in scope
- **FR-009**: No new npm runtime dependencies beyond React and react-router (CSS-only redesign plus Google Fonts)

### Key Entities

- **Page**: One of the 8 application views (Dashboard, Documents, Deviations, Audits, Cases, Users, Settings, Help)
- **Design Token**: A named color, spacing, typography, or radius value from the Centuri Prism system
- **Surface Tier**: A background color level in the tonal hierarchy (base, container-low, container-high)
- **Glow Chip**: A status badge using 10% opacity of its hue as background

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All 8 pages render correctly after framework migration with zero functional regressions
- **SC-002**: 100% of color tokens match the Centuri Prism specification when inspected
- **SC-003**: Zero instances of `1px solid` borders used for content sectioning across all pages
- **SC-004**: Document Library is fully usable at 390px viewport width — all content accessible without horizontal scrolling
- **SC-005**: Page load perceived performance remains comparable — no visible degradation from the migration
- **SC-006**: Each page visually corresponds to its Stitch design reference when viewed side-by-side

## Assumptions

- The backend API remains unchanged — all endpoints under `api/v2/` continue to work as-is
- Google Fonts (Plus Jakarta Sans, Inter) are available via CDN and acceptable as external dependency
- The existing 8-page structure and routing paths are preserved exactly
- Deviations, Audits, and Cases pages follow the same dark theme principles even though they lack dedicated Stitch screens — design is extrapolated from the established patterns
- HelpPage follows the dark theme but has no specific Stitch reference — it adopts the general surface/typography tokens
- The Stitch design screens serve as visual targets, not pixel-perfect specifications — reasonable interpretation is acceptable

## Design Reference

**Stitch Project**: `projects/1969566258001474701`

| Page | Stitch Screen | Screen ID |
| ---- | ------------- | --------- |
| Dashboard | Operations Dashboard | `a4c2277a2e4d4a6ca3c7e9e69fa16e4f` |
| Documents | Document Library | `2b48e2769e8b4048b9bfa5bb4c7273bf` |
| Documents (mobile) | Document Library Mobile | `d460383c50ec4ee28943ae127add8abe` |
| Users | User Management | `a217a4dd81274a94a507b3600c7e4cbd` |
| Settings | System Settings | `d45f62f6fd904f7a9e71b63b66066e34` |
