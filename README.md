# gen-widget-bench

React + TypeScript widget playground for editing, compiling, and previewing `widget.tsx` with `data.json`.

## What this repo contains

- `playground/`: Vite app for editing, compiling, and previewing a widget.

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

1. Edit `widget.tsx` and `data.json` from the two editor tabs.
2. The app compiles the widget source in-browser and renders it in the preview pane.
3. Use **Save** in the UI to persist local files (`playground/.local/widget.tsx` and `playground/.local/data.json`) and create a named snapshot.
4. Use **Reset to Example** to restore the default example source.
5. Use **Refresh** to force remount and rerender the current widget.
6. Use **Widget Guide** to view the supported component list.

The dev server exposes:

- `GET /api/widget/source`
- `PUT /api/widget/source`
- `DELETE /api/widget/source`

`PUT /api/widget/source` accepts:

- `{ "source": "...", "dataSource": "{...}" }` to save current local widget/data source.
- `{ "source": "...", "dataSource": "{...}", "name": "my-widget" }` to save and write a timestamped snapshot directory with both files.

## Scripts

Run in `playground/`:

```bash
npm run dev         # Start dev server
npm run build       # Type-check + production build
npm run lint        # ESLint
npm run test        # Vitest (run once)
npm run test:watch  # Vitest (watch mode)
```
