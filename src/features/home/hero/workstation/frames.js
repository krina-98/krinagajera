/**
 * The workstation render: 192 frames of a slow orbit, 1280×720, ~14MB total.
 *
 * The sequence loops — the last frame matches the first — so playback can run
 * continuously without a seam.
 */
export const FRAME_COUNT = 192

export const WORKSTATION_FRAMES = Array.from(
  { length: FRAME_COUNT },
  (_, i) => `/workstation/frame${String(i + 1).padStart(4, '0')}.jpg`,
)

/** The shot the scene rests at when nothing is driving it. */
export const HOME_FRAME = 0
