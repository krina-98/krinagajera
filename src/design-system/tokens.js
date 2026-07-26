/**
 * JS token layer — mirrors ONLY what JS can't read from CSS.
 * `theme.css` is the source of truth; keep these values in sync with it.
 * Split this file only if it grows past ~250 lines.
 */

// Raw hex for Three.js / canvas (Tailwind classes aren't readable from JS).
export const colors = {
  bg: '#0D0C0A',
  surface: '#171411',
  card: '#211B16',
  cardHover: '#2B231C',
  accent: '#C78B4A',
  accentHover: '#D8A95A',
  accentDark: '#8A5F31',
  text: '#F8F7F4',
  textSecondary: '#CFC9C0',
  textMuted: '#A6A19A',
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
