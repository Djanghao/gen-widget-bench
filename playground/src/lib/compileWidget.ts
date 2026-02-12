import * as esbuild from 'esbuild-wasm'
import React from 'react'

const ESBUILD_WASM_URL = 'https://unpkg.com/esbuild-wasm@0.27.3/esbuild.wasm'

let initialized: Promise<void> | null = null

export class WidgetCompileError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'WidgetCompileError'
  }
}

type TransformSource = (source: string) => Promise<string>

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

function evaluateWidgetModule(code: string): React.ComponentType {
  const module = { exports: {} as Record<string, unknown> }

  const evaluator = new Function(
    'module',
    'exports',
    'React',
    `
      ${code}
      return module.exports;
    `,
  ) as (moduleObj: { exports: Record<string, unknown> }, exportsObj: Record<string, unknown>, react: typeof React) => Record<string, unknown>

  const exportsObject = evaluator(module, module.exports, React)
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
  options?: {
    transformSource?: TransformSource
  },
): Promise<{ component: React.ComponentType }> {
  const transformSource = options?.transformSource ?? defaultTransformSource

  try {
    const code = await transformSource(source)
    const component = evaluateWidgetModule(code)
    return { component }
  } catch (error) {
    if (error instanceof WidgetCompileError) {
      throw error
    }

    throw new WidgetCompileError(toErrorMessage(error))
  }
}
