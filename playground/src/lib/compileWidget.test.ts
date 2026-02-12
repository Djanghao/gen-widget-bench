import { describe, expect, it } from 'vitest'
import { compileWidget, WidgetCompileError } from './compileWidget'

describe('compileWidget', () => {
  it('returns a renderable component from transformed code', async () => {
    const result = await compileWidget('ignored', {
      transformSource: async () =>
        'module.exports.default = function Widget(){ return React.createElement("div", null, "ok") }',
    })

    expect(typeof result.component).toBe('function')
  })

  it('fails when default export is missing', async () => {
    await expect(
      compileWidget('ignored', {
        transformSource: async () => 'module.exports.named = 42',
      }),
    ).rejects.toThrow(WidgetCompileError)
  })

  it('normalizes transform errors', async () => {
    await expect(
      compileWidget('ignored', {
        transformSource: async () => {
          throw new Error('transform failed')
        },
      }),
    ).rejects.toThrow('transform failed')
  })
})
