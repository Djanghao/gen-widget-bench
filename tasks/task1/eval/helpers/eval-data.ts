import type { Page } from '@playwright/test'
import type { TextContainsRule, TextExistsRule, RuleResult } from './types.js'

const STAGE = '.viewer-widget-stage'

export async function evalTextContains(page: Page, rule: TextContainsRule): Promise<RuleResult> {
  const selector = `${STAGE} ${rule.target.selector}`
  const element = page.locator(selector).first()
  const count = await page.locator(selector).count()

  if (count === 0) {
    return {
      rule,
      pass: false,
      message: `Text check failed: element "${rule.target.description}" (${rule.target.selector}) not found`,
    }
  }

  const text = await element.textContent() ?? ''
  const pass = text.includes(rule.expected)
  return {
    rule,
    pass,
    message: pass
      ? `Text contains "${rule.expected}" in "${rule.target.description}"`
      : `Text does not contain "${rule.expected}" in "${rule.target.description}" (got: "${text.slice(0, 200)}")`,
  }
}

export async function evalTextExists(page: Page, rule: TextExistsRule): Promise<RuleResult> {
  return evalTextContains(page, { ...rule, type: 'text-contains' })
}
