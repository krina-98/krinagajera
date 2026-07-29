import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { BackToTop, ScrollProgress } from '@/components/motion'
import { SiteNav } from '@/features/navigation'
import { Footer } from '@/features/portfolio'
import { usePrefersReducedMotion } from '@/hooks'

/**
 * RootLayout — the chrome that persists across every route.
 *
 * The nav and footer live here rather than in each page, so they are not
 * unmounted and remounted on navigation. That is what lets the nav's active
 * indicator slide between links instead of blinking out and back.
 */
export function RootLayout() {
  const { pathname } = useLocation()
  const reduced = usePrefersReducedMotion()

  /**
   * Reset the scroll position on navigation.
   *
   * The browser only restores scroll for real document loads; in a client-side
   * router it keeps whatever offset the previous page had, so following a link
   * from halfway down Projects drops you halfway down Contact. Always `auto` —
   * smooth-scrolling to the top of a page the reader has not seen yet animates
   * past content they never asked to look at.
   */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname, reduced])

  return (
    <>
      <a
        href="#main"
        className="sr-only rounded-sm bg-card px-4 py-2 text-sm text-text focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-(--z-max)"
      >
        Skip to content
      </a>

      <ScrollProgress />
      <SiteNav />

      {/* Padding equal to the fixed bar's height, so each page's own vertical
          rhythm starts from a clean edge instead of underneath the nav. */}
      <main id="main" className="pt-16 sm:pt-20">
        <Outlet />
      </main>

      <Footer />
      <BackToTop />
    </>
  )
}
