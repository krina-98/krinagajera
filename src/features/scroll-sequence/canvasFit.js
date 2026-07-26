/**
 * Canvas geometry — pure functions, no DOM, no React.
 *
 * Separated out because this is the part with actual maths in it and the part
 * most likely to need retuning per design review.
 */

/**
 * Retina is worth paying for; 3x on a phone is not. A 3x backing store triples
 * the per-frame fill cost for pixels almost nobody can resolve, and at scrub
 * speed that is the difference between smooth and not.
 */
export const MAX_DPR = 2

/**
 * Viewport aspect ratios between which the fit blends from contain to cover.
 *
 * Below `CONTAIN_BELOW` the viewport is portrait enough that cover would be
 * destructive; above `COVER_ABOVE` it is close enough to the render's own 16:9
 * that cover crops almost nothing.
 */
const CONTAIN_BELOW = 0.85
const COVER_ABOVE = 1.5

/**
 * How far below centre the render sits when fully letterboxed.
 *
 * The desk is composed centre-right with the upper-left third near empty, so on
 * a portrait phone pushing it down the frame turns the dead space into a
 * deliberate place for the hero copy instead of an accidental gap.
 */
const PORTRAIT_ALIGN_Y = 0.68

const clamp01 = (value) => Math.min(1, Math.max(0, value))

/**
 * Where to draw the frame inside the canvas.
 *
 * A single blend rather than a branch between `cover` and `contain`:
 *
 *   - Wide viewports get cover. The render is 16:9, so the crop is a sliver and
 *     a full-bleed image is the whole point of the hero.
 *   - Portrait viewports get contain. Cover on a 9:19.5 phone would scale the
 *     1280×720 render until roughly three quarters of its width was off-screen,
 *     taking the monitor and the chair with it.
 *   - Everything between interpolates, so there is no width at which the
 *     composition jumps.
 *
 * The aspect ratio is preserved in every case — only how much is cropped and
 * where the frame sits changes.
 *
 * @param {number} cw - Canvas width, in backing-store pixels.
 * @param {number} ch - Canvas height, in backing-store pixels.
 * @param {number} iw - Intrinsic image width.
 * @param {number} ih - Intrinsic image height.
 * @returns {{x: number, y: number, w: number, h: number}} Args for `drawImage`.
 */
export function computeFit(cw, ch, iw, ih) {
  const contain = Math.min(cw / iw, ch / ih)
  const cover = Math.max(cw / iw, ch / ih)

  const blend = clamp01((cw / ch - CONTAIN_BELOW) / (COVER_ABOVE - CONTAIN_BELOW))
  const scale = contain + (cover - contain) * blend

  const w = iw * scale
  const h = ih * scale

  // At cover, (ch - h) is negative and any alignment reads as a crop offset;
  // centring is correct there. At contain it positions the letterboxed frame.
  const alignY = 0.5 + (1 - blend) * (PORTRAIT_ALIGN_Y - 0.5)

  return { x: (cw - w) / 2, y: (ch - h) * alignY, w, h }
}

/** Device pixel ratio, capped. Read at resize time, so a window moved between
 *  monitors of different densities re-resolves. */
export function resolveDpr() {
  return Math.min(window.devicePixelRatio || 1, MAX_DPR)
}
