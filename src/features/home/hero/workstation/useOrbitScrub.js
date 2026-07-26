import { useCallback, useEffect, useRef } from 'react'
import { FRAME_COUNT } from './frames'

// How much of the orbit the cursor can drive, as a fraction of the sequence.
// Well under half: the desk should acknowledge you, not spin.
const REACH = 0.22

// Frames per second of idle drift, once the pointer has gone quiet.
const IDLE_SPEED = 5
const IDLE_AFTER = 1.6

// Higher is snappier. Low enough that the orbit feels weighted.
const DAMPING = 2.6

const wrap = (value) => ((value % FRAME_COUNT) + FRAME_COUNT) % FRAME_COUNT

/**
 * Drives the orbit from the cursor, and lets it drift when the cursor stops.
 *
 * The pointer maps to a position on the sequence rather than a velocity, so the
 * desk returns to the same angle for the same cursor position — it reads as
 * turning an object rather than nudging a carousel.
 *
 * Returns a getter rather than state: the sequence reads it once per animation
 * frame, so scrubbing never re-renders React.
 *
 * @param {boolean} enabled - False under reduced motion; the scene holds still.
 * @returns {() => number} Current frame index.
 */
export function useOrbitScrub(enabled) {
  const target = useRef(0)
  const current = useRef(0)
  const idle = useRef(0)
  const last = useRef(0)

  useEffect(() => {
    if (!enabled || !window.matchMedia('(hover: hover)').matches) return

    const onMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1
      target.current = wrap(x * REACH * FRAME_COUNT)
      idle.current = 0
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [enabled])

  return useCallback(() => {
    if (!enabled) return 0

    const now = performance.now()
    const delta = last.current ? Math.min((now - last.current) / 1000, 0.1) : 0
    last.current = now

    idle.current += delta
    if (idle.current > IDLE_AFTER) {
      target.current = wrap(target.current + IDLE_SPEED * delta)
    }

    // Take the short way round the loop, so wrapping never rewinds the orbit.
    let difference = target.current - current.current
    if (difference > FRAME_COUNT / 2) difference -= FRAME_COUNT
    if (difference < -FRAME_COUNT / 2) difference += FRAME_COUNT

    current.current = wrap(current.current + difference * Math.min(1, DAMPING * delta))
    return current.current
  }, [enabled])
}
