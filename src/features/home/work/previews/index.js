import { AnalyticsPreview } from './AnalyticsPreview'
import { DashboardPreview } from './DashboardPreview'
import { StagePreview } from './StagePreview'
import { SystemPreview } from './SystemPreview'

/**
 * Preview compositions, keyed by the `preview` field on each project.
 *
 * These are interfaces rendered from the design system, not screenshots: they
 * cost nothing to load, they stay in sync with the tokens, and they say more
 * about how the work is built than a flat image would.
 */
export const previews = {
  live: AnalyticsPreview,
  agent: SystemPreview,
  map: StagePreview,
  dashboard: DashboardPreview,
}
