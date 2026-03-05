# GenWidget-Create: Project Timeline Gantt

## Task
Recreate the widget shown in **`gt/target.png`** as a React component. Your output must match the target image's appearance, layout, data, and structure as closely as possible.

## Input (Read These Files)
| File | What to do |
|------|------------|
| `gt/target.png` | **Look at this image.** It is the target — your widget must visually match it. Extract all visible data values (text, numbers, labels) from the image. |
| `meta/elements.json` | **Read this file.** It defines the element catalog. Every element listed must appear in your `widget.tsx` with the exact `data-eid` attribute value. |

## Output (Write These Files)
Write exactly two files into `submissions/<your-model-name>/`:
| File | Content |
|------|---------|
| `submissions/<your-model-name>/widget.tsx` | React component reproducing the target widget |
| `submissions/<your-model-name>/data.json` | JSON data extracted from the target image, imported by widget.tsx |

## Constraints
### Allowed Operations
- **Read**: `gt/target.png`, `meta/elements.json`, `meta/prompt.md` (this file)
- **Write**: only `submissions/<your-model-name>/widget.tsx` and `data.json`
- Do NOT read, write, or reference any other files

### Code Rules
- `widget.tsx` must **default export** a React component
- Allowed imports: `react`, `recharts`, `lucide-react`, `./data.json` — no others
- Use **inline styles only** — no CSS files, no className-based styling
- Data import: `import data from './data.json'`

## Element Annotation
Read `meta/elements.json`. For **every** element in that file, your JSX must include the matching `data-eid` attribute.
