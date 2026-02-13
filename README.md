# gen-widget-bench

Benchmark workspace for UI generation tasks using a React + TypeScript widget playground and automated layout checks.

## What this repo contains

- `playground/`: Vite app for editing, compiling, and previewing a widget.
- `tasks/`: challenge instructions and submission JSON output.
- `tasks/task1.md`: current task spec (`ui-dashboard-hard-2tasks-v1`, Chinese).
- `tasks/task1.en.md`: English version of the same task spec.
- `tasks/submissions/ui-dashboard-hard-2tasks-v1.json`: expected submission file location.

## Prerequisites

- Node.js 20+ (recommended)
- npm

## Quick start

From repo root:

```bash
cd playground
npm ci
npm run dev
```

Open the local URL printed by Vite (default is usually `http://localhost:5173` unless the port is in use).

## Widget workflow

1. Edit `playground/widget.example.tsx` (task constraints may limit edits to this file only).
2. The app compiles the widget source in-browser and renders it in the preview pane.
3. Use **Save** in the UI to persist the current source to `playground/.local/widget.tsx`.
4. Use **Reset to Example** to restore the example source.

The dev server exposes:

- `GET /api/widget/source`
- `PUT /api/widget/source`

These endpoints are used by the editor/viewer flow and Playwright tests.

## Scripts

Run in `playground/`:

```bash
npm run dev         # Start dev server
npm run build       # Type-check + production build
npm run lint        # ESLint
npm run test        # Vitest (run once)
npm run test:watch  # Vitest (watch mode)
```

Run end-to-end layout checks:

```bash
npx playwright test
```

## Challenge + submission

- Read constraints in `tasks/task1.md` or `tasks/task1.en.md`.
- Implement required UI/DOM references in the widget source.
- Write/update submission JSON in `tasks/submissions/ui-dashboard-hard-2tasks-v1.json`.
