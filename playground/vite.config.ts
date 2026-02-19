import type { IncomingMessage, ServerResponse } from 'node:http'
import path from 'node:path'
import type { Plugin, ViteDevServer } from 'vite'
import react from '@vitejs/plugin-react'
import {
  deleteLocalWidgetSource,
  readExampleDataSource,
  readExampleSource,
  readWidgetDataSource,
  readWidgetSource,
  resolveWidgetStorePaths,
  saveNamedWidgetSource,
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

function hasDataSourceField(body: unknown): body is { dataSource: string } {
  if (typeof body !== 'object' || !body) {
    return false
  }

  return typeof (body as { dataSource?: unknown }).dataSource === 'string'
}

function getSnapshotName(body: unknown): string | null {
  if (typeof body !== 'object' || !body) {
    return null
  }

  const name = (body as { name?: unknown }).name
  if (typeof name !== 'string') {
    return null
  }

  const trimmed = name.trim()
  return trimmed ? trimmed : null
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
          const [widget, exampleSource, exampleDataSource] = await Promise.all([
            readWidgetSource(paths),
            readExampleSource(paths),
            readExampleDataSource(paths),
          ])
          const dataSource = await readWidgetDataSource(paths, widget.origin)

          writeJson(response, 200, {
            dataSource,
            exampleDataSource,
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
          const dataSource = hasDataSourceField(body) ? body.dataSource : ''
          const snapshotName = getSnapshotName(body)

          if (!source.trim()) {
            writeJson(response, 400, { error: 'Request body must include a non-empty "source" string.' })
            return
          }
          if (!dataSource.trim()) {
            writeJson(response, 400, { error: 'Request body must include a non-empty "dataSource" string.' })
            return
          }

          try {
            JSON.parse(dataSource)
          } catch {
            writeJson(response, 400, { error: '"dataSource" must be valid JSON.' })
            return
          }

          if (snapshotName) {
            const saved = await saveNamedWidgetSource(paths, source, dataSource, snapshotName)
            writeJson(response, 200, {
              ok: true,
              snapshotPath: path.relative(process.cwd(), saved.snapshotDirPath),
            })
            return
          }

          await writeWidgetSource(paths, source, dataSource)
          writeJson(response, 200, { ok: true })
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Failed to write widget source.'
          writeJson(response, 500, { error: message })
        }
        return
      }

      if (request.method === 'DELETE' && pathname === '/api/widget/source') {
        try {
          await deleteLocalWidgetSource(paths)
          const [exampleSource, exampleDataSource] = await Promise.all([
            readExampleSource(paths),
            readExampleDataSource(paths),
          ])
          writeJson(response, 200, {
            dataSource: exampleDataSource,
            exampleDataSource,
            exampleSource,
            ok: true,
            origin: 'example',
            source: exampleSource,
          })
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Failed to reset widget source.'
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
