# GenWidget-Create: Weather City Glance

## Task

Recreate the widget shown in **`gt/target.png`** as a React component. Your output must match the target image's appearance, layout, data, and structure as closely as possible.

## Input (Read These Files)

| File | What to do |
|------|------------|
| `gt/target.png` | **Look at this image.** It is the target — your widget must visually match it. Extract all visible data values (text, numbers, labels) from the image. |
| `meta/elements.json` | **Read this file.** It defines the element catalog. Every element listed must appear in your `widget.tsx` with the exact `data-eid` attribute value. |

## Output (Write These Files)

Write exactly two files into `submissions/<your-model-name>/` (create the directory):

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

Read `meta/elements.json`. For **every** element in that file, your JSX must include the matching `data-eid` attribute. Rules:

- The `data-eid` value must **exactly match** the `eid` field in `elements.json`
- Do NOT invent your own identifiers — only use values from the catalog
- You must annotate **ALL** elements, not just some
- The `tag` field in the catalog is a suggestion; you may use a different HTML tag, but the `data-eid` must be exact
- The `parent` field shows the intended nesting hierarchy

Example:
```tsx
<section data-eid="root" style={{ ... }}>
  <div data-eid="alert-banner">...</div>
  <header data-eid="header">
    <div data-eid="current-temp">65F</div>
    <div data-eid="city-name">Tiburon</div>
  </header>
</section>
```
