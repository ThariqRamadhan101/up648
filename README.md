# up648 — Infrastructure Project Monitoring Dashboard

Modern dashboard to track provincial infrastructure projects, task progress, and budgets with construction monitoring and S-curve review.

## Overview

This app provides:
- Interactive **Kanban board** for project stages (Backlog → Done).
- Province-based **project map** with indicator overlays and CSV export.
- Overview analytics with indicator summary cards and province charts.
- Rich Task Modal for budget and construction monitoring updates.
- Recent budget change logs aggregated across tasks.

## Key Features

- Task Board (Board page)
  - Drag-and-drop Kanban columns for stages:
    - Backlog → Backlog Verification → Procurement → Procurement Verification → Construction → Construction Verification → Handover → Done.
  - Board-level filters (province, sprint, creator, etc.) powered by Zustand selectors.
  - Clicking a card opens the Task Modal.

- Task Modal
  - Budget absorption display and quick log input (auto-logged to `budgetLogs`).
  - Construction Monitoring section (S-curve related):
    - Planned vs actual progress (%), variance badge.
    - Status (On track / At risk / Delayed).
    - Key activities and Issues/risks.
    - Next milestone and expected date.
    - Evidence file upload placeholders.
  - S-curve image areas:
    - Financial Plan and Physical Plan uploads with live preview.
    - Mock SVG preview shown when no image is uploaded.
  - Budget logs list at the bottom of the modal.
  - Scrollable content (max 85vh).
  - "View on map" button deep-links to the Map page and focuses that task.

- Map Page
  - Indonesia basemap using **react-leaflet** and OpenStreetMap tiles.
  - Two marker modes:
    - **Province markers** sized by number of tasks, colored by indicator or task progress.
    - **Project markers** at task or province coordinates, colored by task stage.
  - Filters panel:
    - Province selector.
    - Indicator overlays (GDP, Unemployment, Poverty, Infrastructure, Urbanization, Internet, Literacy, Enrollment, Teacher Ratio, ICOR 2024/2025).
    - Stage filter to show only tasks at specific Kanban stages in Project mode.
  - CSV export of the currently visible province indicators and task counts.
  - Deep-link support from the board (`/map?taskId=...`) to zoom and highlight a specific task.

- Overview Page
  - Indicator Summary card with average values across provinces and quick-scroll shortcuts to charts.
  - Task statistics by stage (Backlog → Done).
  - Recent Budget Changes card (auto-logged when budgets are updated, with show more/less pagination).
  - Province Performance Charts stacked vertically (ICOR, GDP, Unemployment, Poverty, Infrastructure, Urbanization, Internet, Literacy, Enrollment, Teacher Ratio).

## Tech Stack

- React + TypeScript + Vite
- State: Zustand (`src/store/store.ts`)
- Styling: Tailwind CSS (`cn` utility in `src/utils/cn.ts`)

## Getting Started

1. Install
   - `npm install`
2. Develop
   - `npm run dev`
   - Open the local URL shown in the terminal.
3. Build
   - `npm run build`
4. Preview
   - `npm run preview`

## Project Structure (highlights)

- `src/pages/Overview.tsx`
  - Indicator Summary, budget change aggregation, and province performance charts.
- `src/components/board/TaskCard.tsx`
  - Compact task display used in boards/lists.
- `src/components/board/TaskModal.tsx`
  - Detailed task view. Includes budget absorption update, construction monitoring form, S-curve image areas, budget logs, and a deep-link button to the Map page.
- `src/store/store.ts`
  - Zustand store; `updateTask` automatically appends to `budgetLogs` when `budgetTotal` or `budgetAbsorbed` changes (note supported via `budgetNote`).
- `src/store/mockData.ts`
  - Seeds example tasks, including example `budgetLogs` for demos.
- `src/types/index.ts`
  - Core types, including `Task` and optional `budgetLogs`.
 - `src/pages/Board.tsx`
   - Kanban board with drag-and-drop, using `getFilteredTasks` from the store.
 - `src/pages/Map.tsx`
   - Project/Province map with filters, stage-aware project markers, CSV export and deep-link focus.
 - `src/components/map/MapFilters.tsx`
   - Controls overlays, province filter, and stage filter for the map.

## Data & Logging

- Budget changes are auto-logged as entries in `task.budgetLogs` with fields:
  - `at` (Date), `field` (`budgetTotal` | `budgetAbsorbed`), `from`, `to`, optional `note`.
- The Overview page aggregates and paginates these logs in “Recent Budget Changes.”

## Notes

- Task Modal content is scrollable. Close button is in the top-right; logs are at the bottom.
- S-curve uploads are kept in component state for preview. Persisting them to a backend or store can be added.
- Construction Monitoring form currently resets on save; hook it to a store or API to persist.

## Roadmap

- Persist S-curve images and monitoring updates per task.
- Add filters (province/project) to Budget Changes panel.
- Collapsible sections and sticky modal header for long content.
- Backend + AI assistant endpoint (e.g. Google AI Studio / Gemini) to summarize and answer questions about the dashboard data.
