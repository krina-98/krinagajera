import { duration, easing, transition } from '@/design-system/tokens'

/**
 * The page-wide reveal language, matching the hero's choreography so the whole
 * document reads as one motion system rather than a section-by-section one.
 *
 * Reduced motion drops the travel and keeps a short fade: sequence still
 * communicates hierarchy, but nothing moves.
 *
 * @param {boolean} reduce - Result of `useReducedMotion()`.
 * @param {number} [distance=16] - Travel in px for the moving variant.
 */
export function revealMotion(reduce, distance = 16) {
  const item = reduce
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: duration.base, ease: easing.standard } },
      }
    : {
        hidden: { opacity: 0, y: distance },
        visible: { opacity: 1, y: 0, transition: transition.reveal },
      }

  const group = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduce ? 0.04 : 0.08,
        delayChildren: 0.05,
      },
    },
  }

  return { group, item }
}

/**
 * Wipe used for preview surfaces: the panel uncovers rather than sliding in,
 * which reads as a plate being revealed instead of a card arriving.
 */
export function wipeMotion(reduce) {
  if (reduce) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: duration.base, ease: easing.standard } },
    }
  }

  return {
    hidden: { opacity: 0, clipPath: 'inset(0 0 100% 0)' },
    visible: {
      opacity: 1,
      clipPath: 'inset(0 0 0% 0)',
      transition: { duration: duration.slowest, ease: easing.outExpo },
    },
  }
}
