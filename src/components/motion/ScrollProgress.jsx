import { motion, useScroll, useSpring } from 'framer-motion'

/** Enough damping that the rail trails the scroll slightly instead of snapping. */
const SPRING = { stiffness: 180, damping: 30, restDelta: 0.001 }

/**
 * ScrollProgress — a bronze hairline across the top of the viewport.
 *
 * Tells a reader how much of the current page is left. Two pixels of accent is
 * the whole treatment — a thicker bar would read as a loading state.
 *
 * Worth less now than it was: when the site was one long document this was the
 * only sense of depth available. Across short routed pages it often sits near
 * full. Kept because it costs one shared scroll subscription and still reads
 * correctly on the long pages (Projects, Resume).
 *
 * Sits above the nav rather than inside it so it spans the full viewport width
 * regardless of the nav's own container measure.
 *
 * `aria-hidden`: it reports nothing a screen reader cannot get better from the
 * document structure itself.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, SPRING)

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-(--z-overlay) h-0.5 origin-left bg-accent-hover"
    />
  )
}
