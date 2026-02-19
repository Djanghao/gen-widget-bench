import { describe, expect, it } from 'vitest'
import { compileWidget, WidgetCompileError } from './compileWidget'

const moduleMap = {
  'lucide-react': {
    Activity: () => null,
  },
  react: {
    createElement: () => null,
  },
  recharts: {
    LineChart: () => null,
  },
}

describe('compileWidget', () => {
  it('returns a renderable component from transformed code', async () => {
    const result = await compileWidget('ignored', '{}', {
      transformSource: async () =>
        'module.exports.default = function Widget(){ return React.createElement("div", null, "ok") }',
    })

    expect(typeof result.component).toBe('function')
  })

  it('allows whitelisted imports', async () => {
    const result = await compileWidget('ignored', '{}', {
      moduleMap,
      transformSource: async () =>
        'const recharts = require("recharts"); module.exports.default = function Widget(){ return recharts.LineChart }',
    })

    expect(typeof result.component).toBe('function')
  })

  it('fails when import is outside whitelist', async () => {
    await expect(
      compileWidget('ignored', '{}', {
        moduleMap,
        transformSource: async () =>
          'const antd = require("antd"); module.exports.default = function Widget(){ return antd.Button }',
      }),
    ).rejects.toThrow('Import "antd" is not allowed.')
  })

  it('fails on relative imports to keep single-file model', async () => {
    await expect(
      compileWidget('ignored', '{}', {
        moduleMap,
        transformSource: async () =>
          'const util = require("./util"); module.exports.default = function Widget(){ return util }',
      }),
    ).rejects.toThrow('Relative imports are not supported')
  })

  it('fails when default export is missing', async () => {
    await expect(
      compileWidget('ignored', '{}', {
        moduleMap,
        transformSource: async () => 'module.exports.named = 42',
      }),
    ).rejects.toThrow(WidgetCompileError)
  })

  it('allows importing data from ./data.json', async () => {
    const result = await compileWidget('ignored', '{"message":"ok"}', {
      moduleMap,
      transformSource: async () =>
        'const data = require("./data.json"); module.exports.default = function Widget(){ return data.message }',
    })

    expect((result.component as () => string)()).toBe('ok')
  })

  it('fails when data.json is invalid', async () => {
    await expect(
      compileWidget('ignored', '{', {
        moduleMap,
        transformSource: async () =>
          'module.exports.default = function Widget(){ return null }',
      }),
    ).rejects.toThrow('data.json must contain valid JSON.')
  })

  it('normalizes transform errors', async () => {
    await expect(
      compileWidget('ignored', '{}', {
        moduleMap,
        transformSource: async () => {
          throw new Error('transform failed')
        },
      }),
    ).rejects.toThrow('transform failed')
  })
})
