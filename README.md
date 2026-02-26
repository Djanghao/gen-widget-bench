# gen-widget-bench

React + TypeScript widget playground for editing, compiling, and previewing `widget.tsx` with `data.json`.

## What this repo contains

- `playground/` — Vite app for editing, compiling, and previewing a widget.
- `tasks/task1/` — **GenWidget-Create** benchmark: automated evaluation of LLM-generated widgets.

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

---

## Task 1: GenWidget-Create Benchmark

Automated evaluation of LLM-generated widgets. The LLM receives a prompt (and optionally an image) and produces `widget.tsx` + `data.json`. Evaluation is fully headless via Playwright — DOM checks + pixelmatch screenshot comparison.

### Subtask types

| Subtask | Model input | Evaluation |
|---------|------------|------------|
| **instruction-only** | Text prompt | DOM checks + screenshot comparison |
| **instruction-image-target** | Prompt + target screenshot | DOM checks + screenshot comparison (visual weight high) |
| **instruction-image-reference** | Prompt + reference style image | DOM checks only (no screenshot comparison) |

### Directory structure

```
tasks/task1/
├── cases/
│   └── <case-id>/
│       ├── meta/
│       │   ├── prompt.md          # Prompt for the LLM
│       │   ├── eval.json          # Evaluation rules
│       │   ├── target.png         # [optional] Target screenshot (image-target subtask)
│       │   └── reference.png      # [optional] Reference image (image-reference subtask)
│       ├── gt/
│       │   ├── widget.tsx         # Ground truth implementation
│       │   ├── data.json          # Ground truth data
│       │   └── target.png         # Auto-generated GT screenshot
│       └── submissions/
│           └── <model-name>/
│               ├── widget.tsx     # Model output
│               ├── data.json      # Model output
│               └── widget.png     # Auto-generated screenshot
└── eval/
    ├── run-eval.ts                # Main Playwright test
    ├── helpers/                   # Eval modules (structure, style, data, visual)
    └── results/                   # Generated reports + diff images
```

### Running the benchmark

```bash
# 1. Install dependencies
cd tasks/task1/eval
npm install
npx playwright install chromium

# 2. Place model outputs
#    Copy widget.tsx + data.json into cases/<case-id>/submissions/<model-name>/

# 3. Run evaluation (fully headless, auto-starts playground dev server)
npm test

# Filter by case or model:
npm test -- --case weather-city-glance --model claude-sonnet-4
```

### Output

Each submission produces:
- `submissions/<model>/widget.png` — auto-captured screenshot
- `eval/results/<case-id>/<model>/report.json` — per-rule pass/fail + overall score
- `eval/results/<case-id>/<model>/diff.png` — pixelmatch visual diff

### eval.json rule types

| Rule type | Description |
|-----------|-------------|
| `exists` | Check a DOM element exists |
| `count` | Count matching elements (eq/gte/lte) |
| `hierarchy` | Check parent-child DOM relationship |
| `text-contains` | Check text content includes expected string |
| `style` | Check computed CSS property value |
| `screenshot` | Pixelmatch visual comparison against GT |

### Model output constraints

Generated `widget.tsx` may only use these imports:
- `react`
- `recharts`
- `lucide-react`
- `./data.json`
