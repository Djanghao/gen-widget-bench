import type { Page } from '@playwright/test'
import type { StyleRule, RuleResult } from './types.js'

const STAGE = '.viewer-widget-stage'

export async function evalStyle(page: Page, rule: StyleRule): Promise<RuleResult> {
  const selector = `${STAGE} ${rule.target.selector}`
  const element = page.locator(selector).first()
  const count = await page.locator(selector).count()

  if (count === 0) {
    return {
      rule,
      pass: false,
      message: `Style check failed: element "${rule.target.description}" (${rule.target.selector}) not found`,
    }
  }

  const actual = await element.evaluate(
    (el, prop) => window.getComputedStyle(el).getPropertyValue(prop),
    rule.property.replace(/([A-Z])/g, '-$1').toLowerCase(),
  )

  const pass = actual === rule.expected
  return {
    rule,
    pass,
    message: pass
      ? `Style "${rule.property}" on "${rule.target.description}" = "${actual}" (expected "${rule.expected}")`
      : `Style "${rule.property}" on "${rule.target.description}" = "${actual}" (expected "${rule.expected}")`,
  }
}
