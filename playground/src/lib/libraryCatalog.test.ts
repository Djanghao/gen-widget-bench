import { describe, expect, it } from 'vitest'
import { getAllowedImportsText, validateImportSpecifier } from './libraryCatalog'

describe('libraryCatalog', () => {
  it('allows known libraries', () => {
    expect(validateImportSpecifier('recharts')).toBeNull()
    expect(validateImportSpecifier('lucide-react')).toBeNull()
    expect(validateImportSpecifier('react')).toBeNull()
  })

  it('rejects non-whitelisted libraries', () => {
    const error = validateImportSpecifier('antd')
    expect(error).toContain('Import "antd" is not allowed')
    expect(error).toContain(getAllowedImportsText())
  })

  it('rejects relative imports', () => {
    expect(validateImportSpecifier('./foo')).toContain('Relative imports are not supported')
  })
})
