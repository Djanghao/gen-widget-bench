# Failure Analysis — BAD Submissions

This directory categorizes all BAD submissions (widgets that fail to render correctly) by their root-cause failure mode.

Each subfolder contains:
- A `README.md` explaining the failure mode, its visual impact, and the code pattern
- Symlinks to the original submission directories for easy navigation

## Categories

| Category | Count | Description |
|---|---|---|
| [nonexistent-lucide-icon](./nonexistent-lucide-icon/) | 5 | Importing icons that don't exist in lucide-react |
| [data-structure-mismatch](./data-structure-mismatch/) | 10 | Widget accesses data.json keys/paths that don't exist |
| [recharts-api-misuse](./recharts-api-misuse/) | 2 | Incorrect recharts component usage |
| [syntax-error](./syntax-error/) | 1 | JSX/TypeScript syntax errors preventing compilation |
| [improper-data-import](./improper-data-import/) | 1 | Side-effect import of data.json without using it |
| [unknown-runtime-error](./unknown-runtime-error/) | 23 | Structurally valid but still fail at runtime |

**Total: 42 BAD submissions**
