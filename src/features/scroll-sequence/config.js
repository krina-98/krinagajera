/**
 * Every tunable number for the pinned sequence, in one file.
 *
 * Kept out of the components so timing can be retuned without reading GSAP or
 * canvas code, and so the same values are visible to anyone reasoning about the
 * scroll budget.
 */

/**
 * Pin length, as a multiple of viewport height.
 *
 * Expressed in viewport heights rather than pixels so the cinematic pacing
 * holds on a 4K monitor and a phone alike. On a 1080px desktop viewport, 3.6
 * lands at ~3900px — the scroll distance the sequence was tuned against.
 *
 * Mobile is deliberately much shorter: the same distance would be roughly a
 * dozen full swipes before the page moves on.
 */
export const SCROLL_VH = {
  desktop: 3.6,
  tablet: 3,
  mobile: 2.2,
}

/**
 * The narrated beats, positioned on the pinned timeline in progress units
 * (0 = pin start, 1 = pin release).
 *
 * `enter` and `exit` are [from, to] ranges rather than points, so each beat has
 * a real duration to cross-fade over instead of snapping. A beat whose `enter`
 * range is zero-length at 0 starts on screen.
 *
 * Gaps between beats are intentional: the workstation is the subject, and it
 * needs stretches where nothing is written over it.
 */
export const BEATS = [
  { id: 'hero', enter: [0, 0], exit: [0.18, 0.28] },
  { id: 'about', enter: [0.36, 0.46], exit: [0.58, 0.66] },
  { id: 'skills', enter: [0.68, 0.78], exit: [0.86, 0.94] },
]

/** The scroll hint fades on the first real scroll, well before the hero copy does. */
export const CUE_EXIT = [0.04, 0.1]

/** Travel for beat text. Small on purpose — this is a fade with a hint of drift. */
export const BEAT_SHIFT = 28

/** Loader tiers. See `useFrameLoader`. */
export const LOADER = {
  /** Frames fetched at normal priority immediately after the first one lands. */
  primerCount: 24,
  primerConcurrency: 6,
  tailConcurrency: 8,
}

/** Below this width the sequence is decimated — see `frameIndices`. */
export const DECIMATE_BELOW = 768
