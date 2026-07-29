/**
 * Public barrel for app hooks.
 * Import from here: `import { usePointerGlow } from '@/hooks'`.
 *
 * `useActiveSection` is no longer exported. It ran an IntersectionObserver over
 * five section elements to work out which one the reader was looking at, so the
 * nav could highlight it. On a multi-page site the router simply knows. The
 * file is dead and can be deleted.
 */
export { usePointerGlow } from './usePointerGlow'
export { usePrefersReducedMotion } from './usePrefersReducedMotion'
