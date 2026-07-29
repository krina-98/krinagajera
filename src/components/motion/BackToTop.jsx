import { useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { cn } from '@/lib/cn'
import { ArrowUpIcon } from '@/components/ui'
import { duration, easing } from '@/design-system/tokens'
import { usePrefersReducedMotion } from '@/hooks'

/** How far down the page the button earns its place. */
const SHOW_AT = 400

/**
 * BackToTop — a floating icon button, bottom right.
 *
 * Hidden until there is something to go back up to. A control that is present
 * at the top of the page is a control that does nothing, and it spends the same
 * screen space either way.
 *
 * It is a real `<button>`, not a link to `#top`: this scrolls the window rather
 * than navigating, and on a multi-page site an `href="#top"` would push a
 * pointless entry into the history stack on every click.
 *
 * `bottom-6 right-6` keeps it clear of the thumb zone on mobile without
 * floating so far in that it covers content.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false)
  const reduced = usePrefersReducedMotion()
  const { scrollY } = useScroll()

  // Shares Framer's existing scroll subscription rather than adding a listener,
  // and only sets state on the crossing, so scrolling does not re-render.
  useMotionValueEvent(scrollY, 'change', (value) => {
    const next = value > SHOW_AT
    setVisible((current) => (current === next ? current : next))
  })

  const toTop = () => {
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={toTop}
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.8, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 8 }}
          transition={{ duration: duration.base, ease: easing.outExpo }}
          className={cn(
            'fixed right-6 bottom-6 z-(--z-sticky) grid size-12 place-items-center',
            'rounded-full border border-accent-dark bg-bg/80 text-accent-hover backdrop-blur-md',
            'transition-[background-color,border-color,box-shadow,transform]',
            'duration-[var(--duration-base)] ease-standard',
            'hover:border-accent-hover hover:shadow-glow',
            'motion-safe:hover:-translate-y-0.5',
            'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-hover',
          )}
        >
          <ArrowUpIcon className="size-5" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
