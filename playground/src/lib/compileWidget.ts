import * as esbuild from 'esbuild-wasm'
import React from 'react'
import { validateImportSpecifier } from './libraryCatalog'

const ESBUILD_WASM_URL = 'https://unpkg.com/esbuild-wasm@0.27.3/esbuild.wasm'

let initialized: Promise<void> | null = null

export class WidgetCompileError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'WidgetCompileError'
  }
}

type TransformSource = (source: string) => Promise<string>
type ModuleMap = Record<string, unknown>
type ModuleEvaluator = (
  moduleObj: { exports: Record<string, unknown> },
  exportsObj: Record<string, unknown>,
  requireFn: (specifier: string) => unknown,
  react: typeof React,
) => Record<string, unknown>

let defaultModuleMapPromise: Promise<ModuleMap> | null = null

async function ensureEsbuildReady(): Promise<void> {
  if (!initialized) {
    initialized = esbuild.initialize({
      wasmURL: ESBUILD_WASM_URL,
      worker: true,
    })
  }

  await initialized
}

async function defaultTransformSource(source: string): Promise<string> {
  await ensureEsbuildReady()

  const result = await esbuild.transform(source, {
    format: 'cjs',
    jsx: 'transform',
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment',
    loader: 'tsx',
    sourcemap: 'inline',
    target: 'es2020',
  })

  return result.code
}

async function loadDefaultModuleMap(): Promise<ModuleMap> {
  if (!defaultModuleMapPromise) {
    defaultModuleMapPromise = Promise.all([
      import('lucide-react'),
      import('recharts'),
    ]).then(([lucideReact, recharts]) => {
      return {
        'lucide-react': lucideReact,
        react: React,
        recharts,
      }
    })
  }

  return defaultModuleMapPromise
}

function parseDataSource(dataSource: string): unknown {
  try {
    return JSON.parse(dataSource)
  } catch {
    throw new WidgetCompileError('data.json must contain valid JSON.')
  }
}

function createWidgetRequire(
  moduleMap: ModuleMap,
  dataModule: unknown,
): (specifier: string) => unknown {
  return (specifier: string): unknown => {
    const validationError = validateImportSpecifier(specifier)
    if (validationError) {
      throw new WidgetCompileError(validationError)
    }

    if (specifier === './data.json') {
      return dataModule
    }

    if (!(specifier in moduleMap)) {
      throw new WidgetCompileError(`Import "${specifier}" is allowed but not configured in runtime.`)
    }

    return moduleMap[specifier]
  }
}

function evaluateWidgetModule(
  code: string,
  moduleMap: ModuleMap,
  dataModule: unknown,
): React.ComponentType {
  const module = { exports: {} as Record<string, unknown> }
  const widgetRequire = createWidgetRequire(moduleMap, dataModule)

  const evaluator = new Function(
    'module',
    'exports',
    'require',
    'React',
    `
      ${code}
      return module.exports;
    `,
  ) as ModuleEvaluator

  const exportsObject = evaluator(module, module.exports, widgetRequire, React)
  const widget = exportsObject.default

  if (!widget) {
    throw new WidgetCompileError('widget.tsx must export a default React component.')
  }

  if (typeof widget !== 'function' && typeof widget !== 'object') {
    throw new WidgetCompileError('Default export from widget.tsx must be a renderable React component.')
  }

  return widget as React.ComponentType
}

function toErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }

  return 'Unknown widget compile error.'
}

export async function compileWidget(
  source: string,
  dataSource: string,
  options?: {
    moduleMap?: ModuleMap
    transformSource?: TransformSource
  },
): Promise<{ component: React.ComponentType }> {
  const transformSource = options?.transformSource ?? defaultTransformSource

  try {
    const moduleMap = options?.moduleMap ?? await loadDefaultModuleMap()
    const dataModule = parseDataSource(dataSource)
    const code = await transformSource(source)
    const component = evaluateWidgetModule(code, moduleMap, dataModule)
    return { component }
  } catch (error) {
    if (error instanceof WidgetCompileError) {
      throw error
    }

    throw new WidgetCompileError(toErrorMessage(error))
  }
}
