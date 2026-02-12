import type { IncomingMessage, ServerResponse } from 'node:http'
import type { Plugin, ViteDevServer } from 'vite'
import react from '@vitejs/plugin-react'
import {
  readExampleSource,
  readWidgetSource,
  resolveWidgetStorePaths,
  writeWidgetSource,
} from './dev/widgetStore'
import { defineConfig } from 'vitest/config'

function writeJson(response: ServerResponse, statusCode: number, payload: unknown): void {
  response.statusCode = statusCode
  response.setHeader('Content-Type', 'application/json; charset=utf-8')
  response.end(JSON.stringify(payload))
}

function readJsonBody(request: IncomingMessage): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []

    request.on('data', (chunk) => {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
    })
    request.on('end', () => {
      if (chunks.length === 0) {
        resolve({})
        return
      }

      try {
        const raw = Buffer.concat(chunks).toString('utf8')
        resolve(JSON.parse(raw))
      } catch (error) {
        reject(error)
      }
    })
    request.on('error', reject)
  })
}

function hasSourceField(body: unknown): body is { source: string } {
  if (typeof body !== 'object' || !body) {
    return false
  }

  return typeof (body as { source?: unknown }).source === 'string'
}

const widgetApiPlugin = (): Plugin => ({
  enforce: 'pre',
  configureServer(server: ViteDevServer) {
    const paths = resolveWidgetStorePaths(process.cwd())

    server.middlewares.use(async (request, response, next) => {
      if (!request.url) {
        next()
        return
      }

      const pathname = new URL(request.url, 'http://localhost').pathname

      if (request.method === 'GET' && pathname === '/api/widget/source') {
        try {
          const [widget, exampleSource] = await Promise.all([
            readWidgetSource(paths),
            readExampleSource(paths),
          ])

          writeJson(response, 200, {
            exampleSource,
            origin: widget.origin,
            source: widget.source,
          })
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Failed to read widget source.'
          writeJson(response, 500, { error: message })
        }
        return
      }

      if (request.method === 'PUT' && pathname === '/api/widget/source') {
        try {
          const body = await readJsonBody(request)
          const source = hasSourceField(body) ? body.source : ''

          if (!source.trim()) {
            writeJson(response, 400, { error: 'Request body must include a non-empty "source" string.' })
            return
          }

          await writeWidgetSource(paths, source)
          writeJson(response, 200, { ok: true })
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Failed to write widget source.'
          writeJson(response, 500, { error: message })
        }
        return
      }

      next()
    })
  },
  name: 'widget-api-plugin',
})

export default defineConfig({
  plugins: [react(), widgetApiPlugin()],
  test: {
    environment: 'node',
  },
})
