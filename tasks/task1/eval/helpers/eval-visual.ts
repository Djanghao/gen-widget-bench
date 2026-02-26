import fs from 'node:fs/promises'
import path from 'node:path'
import { PNG } from 'pngjs'
import pixelmatch from 'pixelmatch'
import type { ScreenshotRule, RuleResult } from './types.js'

function loadPng(buffer: Buffer): PNG {
  return PNG.sync.read(buffer)
}

function resizePngToMatch(source: PNG, targetWidth: number, targetHeight: number): PNG {
  // Create a new PNG with target dimensions, filled with transparent pixels
  const result = new PNG({ width: targetWidth, height: targetHeight })
  // Copy overlapping pixels
  const copyWidth = Math.min(source.width, targetWidth)
  const copyHeight = Math.min(source.height, targetHeight)
  for (let y = 0; y < copyHeight; y++) {
    for (let x = 0; x < copyWidth; x++) {
      const srcIdx = (y * source.width + x) * 4
      const dstIdx = (y * targetWidth + x) * 4
      result.data[dstIdx] = source.data[srcIdx]
      result.data[dstIdx + 1] = source.data[srcIdx + 1]
      result.data[dstIdx + 2] = source.data[srcIdx + 2]
      result.data[dstIdx + 3] = source.data[srcIdx + 3]
    }
  }
  return result
}

export async function evalScreenshot(
  rule: ScreenshotRule,
  gtScreenshotPath: string,
  submissionScreenshotPath: string,
  diffOutputPath: string,
): Promise<RuleResult> {
  let gtBuffer: Buffer
  let subBuffer: Buffer

  try {
    gtBuffer = await fs.readFile(gtScreenshotPath)
  } catch {
    return {
      rule,
      pass: false,
      message: `Screenshot comparison failed: ground truth screenshot not found at ${gtScreenshotPath}`,
    }
  }

  try {
    subBuffer = await fs.readFile(submissionScreenshotPath)
  } catch {
    return {
      rule,
      pass: false,
      message: `Screenshot comparison failed: submission screenshot not found at ${submissionScreenshotPath}`,
    }
  }

  let gtPng = loadPng(gtBuffer)
  let subPng = loadPng(subBuffer)

  // Normalize dimensions to the larger of the two
  const width = Math.max(gtPng.width, subPng.width)
  const height = Math.max(gtPng.height, subPng.height)

  if (gtPng.width !== width || gtPng.height !== height) {
    gtPng = resizePngToMatch(gtPng, width, height)
  }
  if (subPng.width !== width || subPng.height !== height) {
    subPng = resizePngToMatch(subPng, width, height)
  }

  const diffPng = new PNG({ width, height })

  const numDiffPixels = pixelmatch(
    gtPng.data,
    subPng.data,
    diffPng.data,
    width,
    height,
    { threshold: 0.1 },
  )

  const totalPixels = width * height
  const diffPercent = (numDiffPixels / totalPixels) * 100

  // Save diff image
  await fs.mkdir(path.dirname(diffOutputPath), { recursive: true })
  await fs.writeFile(diffOutputPath, PNG.sync.write(diffPng))

  const pass = diffPercent <= rule.maxPixelDiffPercent
  return {
    rule,
    pass,
    message: pass
      ? `Screenshot diff: ${diffPercent.toFixed(2)}% pixels differ (threshold: ${rule.maxPixelDiffPercent}%)`
      : `Screenshot diff too high: ${diffPercent.toFixed(2)}% pixels differ (threshold: ${rule.maxPixelDiffPercent}%)`,
  }
}
