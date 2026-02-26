import type { Page } from '@playwright/test'
import fs from 'node:fs/promises'
import path from 'node:path'

export interface WidgetFiles {
  widgetTsx: string
  dataJson: string
}

export async function readWidgetFiles(dir: string): Promise<WidgetFiles> {
  const [widgetTsx, dataJson] = await Promise.all([
    fs.readFile(path.join(dir, 'widget.tsx'), 'utf-8'),
    fs.readFile(path.join(dir, 'data.json'), 'utf-8'),
  ])
  return { widgetTsx, dataJson }
}

export async function loadWidgetInPlayground(
  page: Page,
  baseURL: string,
  files: WidgetFiles,
): Promise<void> {
  // PUT the widget source + data to the playground API
  const response = await page.request.put(`${baseURL}/api/widget/source`, {
    data: {
      source: files.widgetTsx,
      dataSource: files.dataJson,
    },
  })

  if (!response.ok()) {
    const body = await response.text()
    throw new Error(`PUT /api/widget/source failed (${response.status()}): ${body}`)
  }

  // Navigate to the playground and wait for widget to render
  await page.goto(baseURL)

  // Wait for the widget stage to appear and contain rendered content
  const stage = page.locator('.viewer-widget-stage')
  await stage.waitFor({ state: 'visible', timeout: 15_000 })

  // Wait for actual widget content (not error/empty state)
  // The widget should render a child element inside the stage
  await page.waitForFunction(
    () => {
      const el = document.querySelector('.viewer-widget-stage')
      if (!el) return false
      // Check it has real content (not just an error or empty state message)
      const hasError = el.querySelector('.error-panel')
      const hasEmpty = el.querySelector('.empty-state')
      return !hasError && !hasEmpty && el.children.length > 0
    },
    { timeout: 15_000 },
  )

  // Small extra wait for any CSS transitions / final paint
  await page.waitForTimeout(500)
}

export async function screenshotWidgetStage(
  page: Page,
  outputPath: string,
): Promise<Buffer> {
  const stage = page.locator('.viewer-widget-stage')
  const screenshot = await stage.screenshot({ type: 'png' })
  await fs.mkdir(path.dirname(outputPath), { recursive: true })
  await fs.writeFile(outputPath, screenshot)
  return screenshot
}
