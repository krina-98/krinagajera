import { useCallback, useSyncExternalStore } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

/**
 * Whether the reader has asked the OS to reduce motion.
 *
 * `useSyncExternalStore` rather than `useEffect` + `useState`: the value is
 * needed during the very first render to decide whether the hero pins at all,
 * and an effect-based hook would render the animated version first and then
 * tear it down — briefly pinning the page for exactly the person who asked it
 * not to.
 *
 * @returns {boolean}
 */
export function usePrefersReducedMotion() {
  const subscribe = useCallback((notify) => {
    const query = window.matchMedia(QUERY)
    query.addEventListener('change', notify)
    return () => query.removeEventListener('change', notify)
  }, [])

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    // Server/prerender default: assume motion is fine, matching the CSS default.
    () => false,
  )
}
