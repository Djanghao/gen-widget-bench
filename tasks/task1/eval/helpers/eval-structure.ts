import type { Page } from '@playwright/test'
import type { ExistsRule, CountRule, HierarchyRule, RuleResult } from './types.js'

const STAGE = '.viewer-widget-stage'

export async function evalExists(page: Page, rule: ExistsRule): Promise<RuleResult> {
  const selector = `${STAGE} ${rule.target.selector}`
  const count = await page.locator(selector).count()
  const pass = count > 0
  return {
    rule,
    pass,
    message: pass
      ? `Found "${rule.target.description}" (${rule.target.selector})`
      : `Missing "${rule.target.description}" (${rule.target.selector})`,
  }
}

export async function evalCount(page: Page, rule: CountRule): Promise<RuleResult> {
  const selector = `${STAGE} ${rule.selector}`
  const count = await page.locator(selector).count()

  let pass = false
  switch (rule.op) {
    case 'eq':
      pass = count === rule.expected
      break
    case 'gte':
      pass = count >= rule.expected
      break
    case 'lte':
      pass = count <= rule.expected
      break
  }

  return {
    rule,
    pass,
    message: pass
      ? `Count check passed: "${rule.description}" found ${count} (expected ${rule.op} ${rule.expected})`
      : `Count check failed: "${rule.description}" found ${count} (expected ${rule.op} ${rule.expected})`,
  }
}

export async function evalHierarchy(page: Page, rule: HierarchyRule): Promise<RuleResult> {
  const selector = `${STAGE} ${rule.parent.selector} ${rule.child.selector}`
  const count = await page.locator(selector).count()
  const pass = count > 0
  return {
    rule,
    pass,
    message: pass
      ? `Hierarchy check passed: "${rule.child.description}" found inside "${rule.parent.description}"`
      : `Hierarchy check failed: "${rule.child.description}" not found inside "${rule.parent.description}"`,
  }
}
