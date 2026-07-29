import { useCallback } from 'react'
import { usePrefersReducedMotion } from '@/hooks'

/**
 * Click handler for in-page section links.
 *
 * The markup stays a real `<a href="#id">` — middle-click, copy-link and
 * keyboard activation all have to keep working, and they do so for free. This
 * only upgrades the plain jump to an animated one.
 *
 * Why not `scroll-behavior: smooth` in CSS: it applies to *every* scroll on the
 * document, including programmatic ones that want to land instantly. Animating
 * here scopes the easing to deliberate navigation.
 *
 * `scroll-padding-top` on `:root` supplies the offset under the fixed bar, so
 * no arithmetic is needed here.
 *
 * @returns {(event: React.MouseEvent<HTMLAnchorElement>) => void}
 */
export function useSectionScroll() {
  const reduced = usePrefersReducedMotion()

  return useCallback(
    (event) => {
      // Let the browser handle modified clicks — new tab, new window, download.
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      if (event.button !== 0) return

      const href = event.currentTarget.getAttribute('href')
      if (!href?.startsWith('#')) return

      const target = document.getElementById(href.slice(1))
      if (!target) return

      event.preventDefault()
      target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })

      // The hash is normally set by the default action we just cancelled.
      // Without it, the address bar and the back button lose the section.
      if (window.location.hash !== href) {
        window.history.pushState(null, '', href)
      }
    },
    [reduced],
  )
}
