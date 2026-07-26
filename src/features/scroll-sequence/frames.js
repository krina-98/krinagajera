/**
 * The workstation render: 192 pre-rendered JPGs of a slow orbit.
 *
 * Lives in `public/workstation/`, so the paths are absolute and Vite serves
 * them verbatim — no bundler import, no 192 entries in the module graph.
 */
export const FRAME_COUNT = 192

/** Intrinsic size of every frame. Known up front so fit maths never waits on a decode. */
export const FRAME_WIDTH = 1280
export const FRAME_HEIGHT = 720

export const FRAME_URLS = Array.from(
  { length: FRAME_COUNT },
  (_, i) => `/workstation/frame${String(i + 1).padStart(4, '0')}.jpg`,
)

/**
 * The frame shown when the sequence is not being scrubbed — reduced motion, or
 * the instant before the loader returns. Frame 1 is the composed opening shot
 * and the one preloaded from the document head, so it is always the cheapest.
 */
export const STATIC_FRAME = 0

/**
 * Which frames to actually download.
 *
 * A decoded 1280×720 bitmap costs ~3.7MB of memory, so the full sequence is
 * ~700MB resident — fine on a desktop, a crash risk on a phone. Halving the
 * sequence there halves both the transfer and the memory, and costs nothing
 * visually: the renderer already falls back to the nearest loaded frame, so a
 * skipped index simply holds its neighbour for one extra scroll pixel.
 *
 * The timeline still runs 0 → 191 in both cases. This only changes what is
 * fetched, never how the animation is addressed.
 *
 * @param {number} step - 1 loads every frame, 2 loads every other.
 * @returns {number[]} Indices to load, in playback order.
 */
export function frameIndices(step) {
  const indices = []
  for (let i = 0; i < FRAME_COUNT; i += step) indices.push(i)

  // The closing frame is where the pin releases; never let it be the one that
  // got skipped.
  if (indices[indices.length - 1] !== FRAME_COUNT - 1) indices.push(FRAME_COUNT - 1)

  return indices
}
