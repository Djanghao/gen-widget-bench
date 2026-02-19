const ALLOWED_IMPORTS = ['react', 'recharts', 'lucide-react'] as const
const ALLOWED_LOCAL_IMPORTS = new Set(['./data.json'])

type AllowedImport = (typeof ALLOWED_IMPORTS)[number]

const ALLOWED_SET = new Set<string>(ALLOWED_IMPORTS)

function isRelativeSpecifier(specifier: string): boolean {
  return specifier.startsWith('.') || specifier.startsWith('/')
}

export function isAllowedImport(specifier: string): specifier is AllowedImport {
  return ALLOWED_SET.has(specifier)
}

export function getAllowedImportsText(): string {
  return ALLOWED_IMPORTS.join(', ')
}

export function validateImportSpecifier(specifier: string): string | null {
  if (ALLOWED_LOCAL_IMPORTS.has(specifier)) {
    return null
  }

  if (isRelativeSpecifier(specifier)) {
    return `Relative imports are not supported in widget.tsx: "${specifier}". Only "./data.json" is allowed.`
  }

  if (isAllowedImport(specifier)) {
    return null
  }

  return `Import "${specifier}" is not allowed. Allowed imports: ${getAllowedImportsText()}.`
}
