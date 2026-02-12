import { expect, test, type Locator, type Page } from '@playwright/test'

const X_ALIGN_TOLERANCE = 1
const ROW_GROUP_TOLERANCE = 2

interface BoxRecord {
  id: string
  x: number
  y: number
  width: number
  height: number
}

async function getVisibleBox(locator: Locator, id: string): Promise<BoxRecord> {
  await expect(locator, `${id} should exist and be visible`).toBeVisible()
  const box = await locator.boundingBox()

  expect(box, `${id} should return a non-null bounding box`).not.toBeNull()

  const resolved = box as { x: number; y: number; width: number; height: number }
  expect(resolved.width, `${id} width should be > 0`).toBeGreaterThan(0)
  expect(resolved.height, `${id} height should be > 0`).toBeGreaterThan(0)

  return {
    id,
    x: resolved.x,
    y: resolved.y,
    width: resolved.width,
    height: resolved.height,
  }
}

function groupByRow(items: BoxRecord[], rowTolerance: number): BoxRecord[][] {
  const sorted = [...items].sort((a, b) => {
    if (a.y !== b.y) {
      return a.y - b.y
    }
    return a.x - b.x
  })

  const rows: BoxRecord[][] = []

  for (const item of sorted) {
    const matchedRow = rows.find((row) => Math.abs(row[0].y - item.y) <= rowTolerance)
    if (matchedRow) {
      matchedRow.push(item)
    } else {
      rows.push([item])
    }
  }

  for (const row of rows) {
    row.sort((a, b) => a.x - b.x)
  }

  return rows.sort((a, b) => a[0].y - b[0].y)
}

async function getMiniCardDistribution(page: Page) {
  const miniCardIds = [
    'revenue-mini-card-1',
    'revenue-mini-card-2',
    'revenue-mini-card-3',
    'revenue-mini-card-4',
  ]

  const miniCards = await Promise.all(
    miniCardIds.map((id) => getVisibleBox(page.getByTestId(id), id)),
  )

  const rows = groupByRow(miniCards, ROW_GROUP_TOLERANCE)
  return rows.map((row) => row.length)
}

test.describe('Dashboard geometry validation', () => {
  test.beforeEach(async ({ page }) => {
    const sourceResponse = await page.request.get('/api/widget/source')
    expect(sourceResponse.ok(), 'GET /api/widget/source should succeed').toBe(true)
    const sourcePayload = (await sourceResponse.json()) as { exampleSource: string }

    const syncResponse = await page.request.put('/api/widget/source', {
      data: {
        source: sourcePayload.exampleSource,
      },
    })
    expect(syncResponse.ok(), 'PUT /api/widget/source should succeed').toBe(true)

    await page.goto('/')
  })

  test('Task A: main card 2x2 grid alignment validation', async ({ page }) => {
    const grid = page.getByTestId('dashboard-alignment-grid')
    await expect(grid, 'dashboard grid container should exist').toBeVisible()

    const cardIds = [
      'card-revenue-vs-orders-7d',
      'card-device-split',
      'card-traffic-channels',
      'card-alerts-tasks',
    ]

    const cards = await Promise.all(
      cardIds.map((id) => getVisibleBox(page.getByTestId(id), id)),
    )

    const rows = groupByRow(cards, ROW_GROUP_TOLERANCE)
    expect(rows, `expected 2 rows, got ${rows.length}`).toHaveLength(2)
    expect(rows[0], `first row should have 2 cards, got ${rows[0]?.length ?? 0}`).toHaveLength(2)
    expect(rows[1], `second row should have 2 cards, got ${rows[1]?.length ?? 0}`).toHaveLength(2)

    const [topLeft, topRight] = rows[0]
    const [bottomLeft, bottomRight] = rows[1]

    expect(
      Math.abs(topLeft.x - bottomLeft.x),
      `left column x mismatch: top=${topLeft.x}, bottom=${bottomLeft.x}`,
    ).toBeLessThanOrEqual(X_ALIGN_TOLERANCE)
    expect(
      Math.abs(topLeft.width - bottomLeft.width),
      `left column width mismatch: top=${topLeft.width}, bottom=${bottomLeft.width}`,
    ).toBeLessThanOrEqual(X_ALIGN_TOLERANCE)

    expect(
      Math.abs(topRight.x - bottomRight.x),
      `right column x mismatch: top=${topRight.x}, bottom=${bottomRight.x}`,
    ).toBeLessThanOrEqual(X_ALIGN_TOLERANCE)
    expect(
      Math.abs(topRight.width - bottomRight.width),
      `right column width mismatch: top=${topRight.width}, bottom=${bottomRight.width}`,
    ).toBeLessThanOrEqual(X_ALIGN_TOLERANCE)
  })

  test('Task B: revenue mini cards row distribution validation', async ({ page }) => {
    // Wide viewport: mini cards should stay in one row (4 x 1)
    await page.setViewportSize({ width: 1800, height: 900 })
    await page.goto('/')

    const miniCardsRoot = page.getByTestId('revenue-mini-cards')
    await expect(miniCardsRoot, 'revenue mini cards root should exist').toBeVisible()
    const wideDistribution = await getMiniCardDistribution(page)
    expect(
      wideDistribution,
      `wide viewport should be [4], got [${wideDistribution.join(', ')}]`,
    ).toEqual([4])

    // Narrow viewport: mini cards should reflow to 2 x 2
    await page.setViewportSize({ width: 900, height: 900 })
    await page.goto('/')
    await expect(miniCardsRoot, 'revenue mini cards root should exist after resize').toBeVisible()
    const narrowDistribution = await getMiniCardDistribution(page)
    expect(
      narrowDistribution,
      `narrow viewport should be [2, 2], got [${narrowDistribution.join(', ')}]`,
    ).toEqual([2, 2])
  })
})
