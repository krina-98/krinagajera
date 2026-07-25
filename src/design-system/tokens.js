/**
 * JS token layer — mirrors ONLY what JS can't read from CSS.
 * `theme.css` is the source of truth; keep these values in sync with it.
 * Split this file only if it grows past ~250 lines.
 */

// Raw hex for Three.js / canvas (Tailwind classes aren't readable from JS).
export const colors = {
  bg: '#0F0B09',
  surface: '#171210',
  card: '#211A17',
  cardHover: '#2A221E',
  bronze: '#A56A3A',
  bronzeHover: '#C58A58',
  bronzeDark: '#7A4C27',
  text: '#F7F4EF',
  textSecondary: '#C8C0B8',
  textMuted: '#9C938C',
}

// Motion language for Framer Motion — seconds + cubic-bezier arrays.
// Confident & elegant: expo/quart curves, no overshoot.
export const duration = {
  instant: 0,
  fast: 0.15,
  base: 0.25,
  slow: 0.4,
  slower: 0.6,
  slowest: 0.9,
}

export const easing = {
  standard: [0.4, 0, 0.2, 1],
  outExpo: [0.16, 1, 0.3, 1],
  inOutQuart: [0.76, 0, 0.24, 1],
  outQuart: [0.25, 1, 0.5, 1],
}

// Ready-made transition presets — import instead of re-declaring inline.
export const transition = {
  base: { duration: duration.base, ease: easing.outExpo },
  reveal: { duration: duration.slower, ease: easing.outExpo },
  snappy: { duration: duration.fast, ease: easing.standard },
}
