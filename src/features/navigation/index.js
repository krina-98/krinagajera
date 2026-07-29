/**
 * Public barrel for site navigation.
 * Import from here: `import { SiteNav } from '@/features/navigation'`.
 */
export { SiteNav } from './SiteNav'

// `useSectionScroll` is no longer exported. It animated the jump to an in-page
// anchor, which the site no longer has — every nav target is a route now, and
// the router handles it. The file is dead and can be deleted.
