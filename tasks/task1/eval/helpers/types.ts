export interface CatalogElement {
  eid: string
  tag: string
  description: string
  parent: string | null
}

export interface ElementCatalog {
  version: number
  elements: CatalogElement[]
}

export interface EvalTarget {
  selector?: string
  eid?: string
  description: string
}

export interface ExistsRule {
  type: 'exists'
  target: EvalTarget
}

export interface CountRule {
  type: 'count'
  selector: string
  description: string
  expected: number
  op: 'eq' | 'gte' | 'lte'
}

export interface HierarchyRule {
  type: 'hierarchy'
  parent: EvalTarget
  child: EvalTarget
}

export interface TextContainsRule {
  type: 'text-contains'
  target: EvalTarget
  expected: string
}

export interface TextExistsRule {
  type: 'text-exists'
  target: EvalTarget
  expected: string
}

export interface StyleRule {
  type: 'style'
  target: EvalTarget
  property: string
  expected: string
}

export interface ScreenshotRule {
  type: 'screenshot'
  maxPixelDiffPercent: number
  viewportWidth?: number
  viewportHeight?: number
}

export type EvalRule =
  | ExistsRule
  | CountRule
  | HierarchyRule
  | TextContainsRule
  | TextExistsRule
  | StyleRule
  | ScreenshotRule

export type Subtask = 'instruction-only' | 'instruction-image-target' | 'instruction-image-reference'

export interface EvalConfig {
  caseId: string
  name: string
  subtask: Subtask
  rules: EvalRule[]
}

export interface RuleResult {
  rule: EvalRule
  pass: boolean
  message: string
}

export interface SubmissionReport {
  caseId: string
  model: string
  subtask: Subtask
  results: RuleResult[]
  score: number
  totalRules: number
  passedRules: number
}
