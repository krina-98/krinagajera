/**
 * The motion language, expressed as Framer Motion variants.
 *
 * `tokens.js` owns the raw numbers (durations, cubic-beziers) so this file and
 * `theme.css` cannot drift apart. Everything here is a composition of those —
 * no literal durations, no literal easings.
 *
 * Reduced motion is NOT handled per-variant. `AppProviders` wraps the app in
 * `<MotionConfig reducedMotion="user">`, which makes Framer Motion drop every
 * transform and layout animation while keeping opacity — so a variant can be
 * written once, honestly, and still be correct for someone who asked the OS for
 * less movement.
 */
import { duration, easing } from './tokens'

/**
 * When a scroll-triggered element is considered "arrived".
 *
 * `once` because this is entrance, not decoration — content that re-animates
 * every time it crosses the fold is the thing that makes a site feel cheap.
 * The negative bottom margin holds the trigger back until the block is
 * comfortably in view rather than grazing the edge.
 */
export const viewport = { once: true, margin: '0px 0px -12% 0px' }

/** The house transition for entrances: long, expo, no overshoot. */
export const revealTransition = { duration: duration.slower, ease: easing.outExpo }

/** Interface feedback — hover, tap, color. Short enough to feel like a response. */
export const feedbackTransition = { duration: duration.base, ease: easing.outExpo }

/**
 * The base entrance: rise and fade.
 *
 * @param {number} [distance=20] - Travel in px. Larger blocks earn more travel;
 *   inline items should stay under ~12 or the motion reads as a jump.
 */
export const fadeUp = (distance = 20) => ({
  hidden: { opacity: 0, y: distance },
  visible: { opacity: 1, y: 0, transition: revealTransition },
})

/** Entrance for anything entering from the side — rails, ledgers, timelines. */
export const fadeIn = (distance = 24) => ({
  hidden: { opacity: 0, x: distance },
  visible: { opacity: 1, x: 0, transition: revealTransition },
})

/** Opacity only. For elements whose position is doing work already. */
export const fade = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: revealTransition },
}

/**
 * A parent that releases its children in sequence.
 *
 * The parent itself animates nothing — it exists purely to own the timing, so
 * children stay independently composable.
 *
 * @param {number} [stagger=0.08] - Gap between children, seconds.
 * @param {number} [delayChildren=0] - Pause before the first child, seconds.
 */
export const stagger = (staggerChildren = 0.08, delayChildren = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
})

/**
 * A line of display type rising out of a mask.
 *
 * The travel is `110%` of the line's own height rather than a px value, so the
 * glyphs start fully below the mask at every step of the fluid display scale.
 * Requires the parent to clip — pair it with `overflow-hidden` on the wrapper.
 * Slower than the standard reveal: this is the page's opening gesture.
 */
export const maskedLine = {
  hidden: { y: '110%' },
  visible: {
    y: '0%',
    transition: { duration: duration.slowest, ease: easing.outExpo },
  },
}

/**
 * A hairline that draws itself along its own length.
 *
 * `transform-origin` belongs to the consumer (a timeline rail draws downward, an
 * underline draws from the left), so it is not baked in here.
 */
export const drawLine = {
  hidden: { scaleX: 0, scaleY: 0 },
  visible: {
    scaleX: 1,
    scaleY: 1,
    transition: { duration: duration.slowest, ease: easing.inOutQuart },
  },
}

/** Scale/opacity entrance for surfaces that should feel like they settled in. */
export const settle = {
  hidden: { opacity: 0, scale: 0.98, y: 12 },
  visible: { opacity: 1, scale: 1, y: 0, transition: revealTransition },
}
