import { duration, easing, transition } from '@/design-system/tokens'

/**
 * Hero entrance choreography.
 *
 * One root drives the whole section: the parent holds `group`, every revealed
 * child holds `rise`, and Framer propagates the state down the tree. Curves and
 * durations come from the motion tokens — nothing is dialled in by hand.
 *
 * Reduced motion drops the translate and keeps a short fade: the content still
 * arrives in order (hierarchy is communicated), but nothing travels.
 *
 * @param {boolean} reduce - Result of `useReducedMotion()`.
 */
export function heroMotion(reduce) {
  const rise = reduce
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: duration.base, ease: easing.standard } },
      }
    : {
        hidden: { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0, transition: transition.reveal },
      }

  const group = {
    hidden: {},
    visible: {
      transition: {
        // Slow enough to read as sequence, fast enough that nothing feels withheld.
        staggerChildren: reduce ? 0.04 : 0.09,
        delayChildren: 0.15,
      },
    },
  }

  return { group, rise }
}
