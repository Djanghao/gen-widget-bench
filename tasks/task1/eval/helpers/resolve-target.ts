import type { EvalTarget } from './types.js'

export function resolveSelector(target: EvalTarget): string {
  if (target.eid) {
    return `[data-eid="${target.eid}"]`
  }
  return target.selector
}
