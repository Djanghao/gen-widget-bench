import { test } from '@playwright/test'
import fs from 'node:fs/promises'
import path from 'node:path'
import type { EvalConfig, EvalRule, RuleResult, SubmissionReport } from './helpers/types.js'
import { readWidgetFiles, loadWidgetInPlayground, screenshotWidgetStage } from './helpers/load-widget.js'
import { evalExists, evalCount, evalHierarchy } from './helpers/eval-structure.js'
import { evalStyle } from './helpers/eval-style.js'
import { evalTextContains, evalTextExists } from './helpers/eval-data.js'
import { evalScreenshot } from './helpers/eval-visual.js'

const CASES_DIR = path.resolve(import.meta.dirname, '../cases')
const RESULTS_DIR = path.resolve(import.meta.dirname, 'results')

async function discoverCases(): Promise<string[]> {
  const entries = await fs.readdir(CASES_DIR, { withFileTypes: true })
  return entries.filter((e) => e.isDirectory()).map((e) => e.name)
}

async function discoverSubmissions(caseDir: string): Promise<string[]> {
  const submissionsDir = path.join(caseDir, 'submissions')
  try {
    const entries = await fs.readdir(submissionsDir, { withFileTypes: true })
    return entries.filter((e) => e.isDirectory()).map((e) => e.name)
  } catch {
    return []
  }
}

async function evaluateRule(page: import('@playwright/test').Page, rule: EvalRule, context: {
  gtScreenshotPath: string
  submissionScreenshotPath: string
  diffOutputPath: string
  subtask: string
}): Promise<RuleResult> {
  switch (rule.type) {
    case 'exists':
      return evalExists(page, rule)
    case 'count':
      return evalCount(page, rule)
    case 'hierarchy':
      return evalHierarchy(page, rule)
    case 'text-contains':
      return evalTextContains(page, rule)
    case 'text-exists':
      return evalTextExists(page, rule)
    case 'style':
      return evalStyle(page, rule)
    case 'screenshot':
      // Skip screenshot comparison for instruction-image-reference subtask
      if (context.subtask === 'instruction-image-reference') {
        return {
          rule,
          pass: true,
          message: 'Screenshot comparison skipped for instruction-image-reference subtask',
        }
      }
      return evalScreenshot(
        rule,
        context.gtScreenshotPath,
        context.submissionScreenshotPath,
        context.diffOutputPath,
      )
    default:
      return {
        rule,
        pass: false,
        message: `Unknown rule type: ${(rule as EvalRule).type}`,
      }
  }
}

// Parse CLI args: --case <caseId> and --model <modelName>
function parseArgs(): { filterCase?: string; filterModel?: string } {
  const args = process.argv
  let filterCase: string | undefined
  let filterModel: string | undefined
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--case' && args[i + 1]) filterCase = args[i + 1]
    if (args[i] === '--model' && args[i + 1]) filterModel = args[i + 1]
  }
  return { filterCase, filterModel }
}

test('GenWidget-Create Benchmark (Task 1)', async ({ page, baseURL }) => {
  const url = baseURL ?? 'http://127.0.0.1:43073'
  const { filterCase, filterModel } = parseArgs()

  let caseIds = await discoverCases()
  if (filterCase) {
    caseIds = caseIds.filter((id) => id === filterCase)
  }

  if (caseIds.length === 0) {
    console.log('No cases found.')
    return
  }

  const allReports: SubmissionReport[] = []

  for (const caseId of caseIds) {
    const caseDir = path.join(CASES_DIR, caseId)
    const evalConfigPath = path.join(caseDir, 'meta', 'eval.json')
    const evalConfig: EvalConfig = JSON.parse(await fs.readFile(evalConfigPath, 'utf-8'))

    console.log(`\n${'='.repeat(60)}`)
    console.log(`Case: ${evalConfig.name} (${caseId})`)
    console.log(`Subtask: ${evalConfig.subtask}`)
    console.log('='.repeat(60))

    // Step 1: Render ground truth and take screenshot
    const gtDir = path.join(caseDir, 'gt')
    const gtScreenshotPath = path.join(gtDir, 'target.png')
    const gtFiles = await readWidgetFiles(gtDir)

    console.log('Rendering ground truth...')
    await loadWidgetInPlayground(page, url, gtFiles)
    await screenshotWidgetStage(page, gtScreenshotPath)
    console.log(`  GT screenshot saved: ${path.relative(CASES_DIR, gtScreenshotPath)}`)

    // Copy target.png to meta/ if this is an image-target subtask
    if (evalConfig.subtask === 'instruction-image-target') {
      const metaTargetPath = path.join(caseDir, 'meta', 'target.png')
      await fs.copyFile(gtScreenshotPath, metaTargetPath)
      console.log(`  Copied target to meta/target.png`)
    }

    // Step 2: Evaluate each submission
    let modelNames = await discoverSubmissions(caseDir)
    if (filterModel) {
      modelNames = modelNames.filter((m) => m === filterModel)
    }

    if (modelNames.length === 0) {
      console.log('  No submissions found.')
      continue
    }

    for (const model of modelNames) {
      const submissionDir = path.join(caseDir, 'submissions', model)
      const submissionScreenshotPath = path.join(submissionDir, 'widget.png')
      const reportDir = path.join(RESULTS_DIR, caseId, model)
      const diffOutputPath = path.join(reportDir, 'diff.png')

      console.log(`\n  Model: ${model}`)

      // Render submission and take screenshot
      const subFiles = await readWidgetFiles(submissionDir)
      await loadWidgetInPlayground(page, url, subFiles)
      await screenshotWidgetStage(page, submissionScreenshotPath)
      console.log(`    Screenshot saved: ${path.relative(CASES_DIR, submissionScreenshotPath)}`)

      // Evaluate all rules
      const results: RuleResult[] = []
      for (const rule of evalConfig.rules) {
        const result = await evaluateRule(page, rule, {
          gtScreenshotPath,
          submissionScreenshotPath,
          diffOutputPath,
          subtask: evalConfig.subtask,
        })
        results.push(result)

        const icon = result.pass ? 'PASS' : 'FAIL'
        console.log(`    [${icon}] ${result.message}`)
      }

      const passedRules = results.filter((r) => r.pass).length
      const totalRules = results.length
      const score = totalRules > 0 ? passedRules / totalRules : 0

      const report: SubmissionReport = {
        caseId,
        model,
        subtask: evalConfig.subtask,
        results,
        score,
        totalRules,
        passedRules,
      }

      // Save report
      await fs.mkdir(reportDir, { recursive: true })
      await fs.writeFile(
        path.join(reportDir, 'report.json'),
        JSON.stringify(report, null, 2),
      )

      console.log(`    Score: ${passedRules}/${totalRules} (${(score * 100).toFixed(1)}%)`)
      console.log(`    Report saved: ${path.relative(CASES_DIR, path.join(reportDir, 'report.json'))}`)

      allReports.push(report)
    }
  }

  // Summary
  console.log(`\n${'='.repeat(60)}`)
  console.log('SUMMARY')
  console.log('='.repeat(60))
  for (const report of allReports) {
    console.log(`  ${report.caseId} / ${report.model}: ${report.passedRules}/${report.totalRules} (${(report.score * 100).toFixed(1)}%)`)
  }
})
