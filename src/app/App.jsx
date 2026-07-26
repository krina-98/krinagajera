import { AppProviders } from '@/app/AppProviders'
import { SiteNav } from '@/features/navigation'
import { ScrollSequence } from '@/features/scroll-sequence'
import { About, Contact, Experience, Footer, Projects, Skills } from '@/features/portfolio'

/**
 * One page, told in order: the workstation, then who built it, then what she
 * built, then how to reach her. Each section is self-contained — this file only
 * decides the sequence.
 *
 * `ScrollSequence` pins for several viewport heights on desktop, so everything
 * after it starts further down the document than it looks. That is handled
 * entirely inside the pin (ScrollTrigger inserts a spacer of real height), so
 * ordinary document flow and anchor links below need no special handling.
 *
 * The previous design's components remain on disk under `features/home/` but
 * are no longer referenced. All of their content lives in `src/content/`, which
 * was always a data layer independent of any UI.
 */
export default function App() {
  return (
    <AppProviders>
      <a
        href="#main"
        className="sr-only rounded-sm bg-card px-4 py-2 text-sm text-text focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-(--z-max)"
      >
        Skip to content
      </a>

      <SiteNav />

      <main id="main">
        {/* Anchor for the wordmark. Sits inside `main` so "skip to content"
            and "back to top" do not fight over the same target. */}
        <span id="top" aria-hidden="true" />

        <ScrollSequence />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </AppProviders>
  )
}
