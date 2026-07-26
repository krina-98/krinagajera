import { useCallback, useEffect, useRef } from 'react'
import { cn } from '@/lib/cn'
import { useFrameSequence } from './useFrameSequence'

const MAX_DPR = 2

/** Nearest frame at or before `index` that has actually decoded. */
function resolveFrame(frames, index) {
  for (let i = Math.min(index, frames.length - 1); i >= 0; i -= 1) {
    if (frames[i]) return frames[i]
  }
  return null
}

/**
 * FrameSequence — a pre-rendered image sequence played on a canvas.
 *
 * Frames are decoded once into `Image` objects and blitted, rather than swapped
 * as an `<img src>`: swapping sources re-decodes on the main thread and shows a
 * white flash between frames, which is exactly what an expensive-looking hero
 * cannot do.
 *
 * `getIndex` is called per animation frame rather than the index being passed
 * as a prop, so scrubbing never re-renders React.
 *
 * @param {object} props
 * @param {string[]} props.urls - Frame sources, in playback order.
 * @param {() => number} props.getIndex - Returns the frame to show this tick.
 * @param {string} [props.alt] - Accessible description of the sequence.
 * @param {(state: {ready: boolean, complete: boolean}) => void} [props.onProgress]
 * @param {string} [props.className]
 */
export function FrameSequence({ urls, getIndex, alt, onProgress, className }) {
  const canvas = useRef(null)
  const { frames, ready, complete } = useFrameSequence(urls)


  const progress = useRef(onProgress)
  useEffect(() => {
    progress.current = onProgress
  }, [onProgress])

  useEffect(() => {
    progress.current?.({ ready, complete })
  }, [ready, complete])

  const draw = useCallback(() => {
    const el = canvas.current
    if (!el) return

    const frame = resolveFrame(frames.current, Math.round(getIndex()))
    if (!frame) return

    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)
    const width = Math.round(el.clientWidth * dpr)
    const height = Math.round(el.clientHeight * dpr)

    if (el.width !== width || el.height !== height) {
      el.width = width
      el.height = height
    }

    // Cover: the render is 16:9 but the slot may not be.
    const ctx = el.getContext('2d')
    const scale = Math.max(width / frame.width, height / frame.height)
    const w = frame.width * scale
    const h = frame.height * scale

    ctx.clearRect(0, 0, width, height)
    ctx.drawImage(frame, (width - w) / 2, (height - h) / 2, w, h)
  }, [frames, getIndex])

  useEffect(() => {
    let raf = 0
    const tick = () => {
      draw()
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [draw])

  return (
    <canvas
      ref={canvas}
      role="img"
      aria-label={alt}
      className={cn('size-full', className)}
    />
  )
}
