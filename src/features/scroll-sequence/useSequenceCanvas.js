import { useCallback, useEffect, useRef } from 'react'
import { colors } from '@/design-system/tokens'
import { FRAME_HEIGHT, FRAME_WIDTH } from './frames'
import { nearestLoaded } from './useFrameLoader'
import { computeFit, resolveDpr } from './canvasFit'

/**
 * Owns the canvas element: backing-store sizing, DPI, and painting one frame.
 *
 * Deliberately knows nothing about scroll or GSAP. It exposes two imperative
 * calls and holds the current frame index itself, so a resize can repaint
 * without the animation layer being asked where the playhead is.
 *
 * CSS size and backing-store size are separate throughout. The element is
 * sized in CSS (100% of the pinned section); `canvas.width/height` are set in
 * device pixels. Conflating them is what produces a blurry canvas on Retina.
 *
 * @param {React.RefObject<HTMLCanvasElement>} canvasRef
 * @param {React.RefObject<HTMLImageElement[]>} images - Frame store from `useFrameLoader`.
 * @returns {{drawFrame: (index: number) => void, repaint: () => void}}
 */
export function useSequenceCanvas(canvasRef, images) {
  // The playhead lives here, not in the animation layer, so resize is self
  // sufficient. A ref rather than state: it changes on every scrub tick.
  const index = useRef(0)

  // Populated by the effect. Callers hold a stable identity that forwards to
  // whatever the current effect installed, so the GSAP effect below never has
  // to list the painter as a dependency and re-create the timeline.
  const paint = useRef(() => {})
  const schedule = useRef(() => {})

  useEffect(() => {
    const el = canvasRef.current
    if (!el) return

    // `alpha: false` lets the compositor skip per-pixel blending; the scene is
    // fully opaque and every draw covers the canvas.
    const ctx = el.getContext('2d', { alpha: false })
    if (!ctx) return

    let frameRequest = 0
    let cssWidth = 0
    let cssHeight = 0

    const render = () => {
      const frame = nearestLoaded(images.current, Math.round(index.current))
      if (!frame) return

      const { width, height } = el

      // Letterbox in the scene's own background rather than leaving whatever
      // the previous frame left behind. On portrait viewports this is visible
      // area, so it has to look chosen.
      ctx.fillStyle = colors.bg
      ctx.fillRect(0, 0, width, height)

      const { x, y, w, h } = computeFit(width, height, FRAME_WIDTH, FRAME_HEIGHT)
      ctx.drawImage(frame, x, y, w, h)
    }

    /** Match the backing store to the element's CSS box. Returns true if it changed. */
    const measure = () => {
      const rect = el.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) return false

      const dpr = resolveDpr()
      const width = Math.round(rect.width * dpr)
      const height = Math.round(rect.height * dpr)

      if (el.width === width && el.height === height) return false

      // Assigning either dimension resets the context state and clears the
      // canvas, so this must always be followed by a render.
      el.width = width
      el.height = height
      cssWidth = rect.width
      cssHeight = rect.height
      return true
    }

    // Coalesced to one paint per animation frame. ResizeObserver can fire
    // several times per gesture on mobile as the URL bar collapses, and each
    // one would otherwise resize the backing store and repaint synchronously.
    const requestPaint = () => {
      if (frameRequest) return
      frameRequest = requestAnimationFrame(() => {
        frameRequest = 0
        measure()
        render()
      })
    }

    paint.current = (next) => {
      index.current = next
      render()
    }
    schedule.current = requestPaint

    measure()
    render()

    const observer = new ResizeObserver((entries) => {
      const box = entries[0]?.contentRect
      // Ignore pure repaints: the observer also fires when nothing about the
      // box changed, and re-measuring is the expensive half of this path.
      if (box && box.width === cssWidth && box.height === cssHeight) return
      requestPaint()
    })
    observer.observe(el)

    // DPR is not covered by ResizeObserver — the CSS box is unchanged when a
    // window is dragged to a monitor of a different density.
    const dprQuery = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`)
    dprQuery.addEventListener('change', requestPaint)

    return () => {
      observer.disconnect()
      dprQuery.removeEventListener('change', requestPaint)
      cancelAnimationFrame(frameRequest)
      paint.current = () => {}
      schedule.current = () => {}
    }
  }, [canvasRef, images])

  const drawFrame = useCallback((next) => paint.current(next), [])
  const repaint = useCallback(() => schedule.current(), [])

  return { drawFrame, repaint }
}
