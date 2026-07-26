import { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/lib/cn'
import { usePrefersReducedMotion } from '@/hooks'
import { STATIC_FRAME } from './frames'
import { DECIMATE_BELOW, SCROLL_VH } from './config'
import { useFrameLoader } from './useFrameLoader'
import { useSequenceCanvas } from './useSequenceCanvas'
import { buildSequenceTimeline } from './timeline'
import { HeroOverlay } from './HeroOverlay'

gsap.registerPlugin(ScrollTrigger)

/**
 * Decided once, at mount, from the viewport the reader actually arrived on.
 *
 * Re-deciding on resize would mean discarding a partly-downloaded sequence to
 * start a different one, which is worse than serving a phone-sized sequence to
 * a window that was later widened. `saveData` is honoured for the same reason
 * a phone is: the full sequence is ~14MB.
 */
function resolveStep() {
  if (typeof window === 'undefined') return 1
  const narrow = window.innerWidth < DECIMATE_BELOW
  const frugal = navigator.connection?.saveData === true
  return narrow || frugal ? 2 : 1
}

/**
 * ScrollSequence — the pinned opening: 192 pre-rendered frames scrubbed by
 * scroll position, with the hero copy narrated over them.
 *
 * The image is a pure function of scroll offset. There is no playback clock, so
 * the orbit cannot drift out of sync with the scrollbar or keep running after
 * the reader stops — scrolling back up runs the sequence backwards for free.
 *
 * Responsibilities are split deliberately:
 *   - `useFrameLoader`  what is downloaded, and in what order
 *   - `useSequenceCanvas`  backing store, DPI, and painting one frame
 *   - `timeline`  what happens at which point in the pin
 *   - `HeroOverlay`  the words
 *
 * This file only wires them to a ScrollTrigger and decides whether to pin.
 */
export function ScrollSequence() {
  const root = useRef(null)
  const canvas = useRef(null)

  // Lazy initialiser, never a setter: this is "measure the device once, at
  // mount, and keep that answer" rather than state that changes.
  const [step] = useState(resolveStep)

  const reduced = usePrefersReducedMotion()

  // The loader is created before the canvas, but needs to poke it on every
  // arrival. An indirection through a ref breaks the cycle without making the
  // download restart whenever the painter identity changes.
  const repaintRef = useRef(() => {})
  const onFrame = useCallback(() => repaintRef.current(), [])

  const { images, ready } = useFrameLoader({ step, onFrame })

  // Each newly decoded frame may be a better match for where the playhead
  // already sits, so every arrival asks for a repaint. The canvas layer
  // coalesces them, so a burst of eight arrivals costs one draw.
  const { drawFrame, repaint } = useSequenceCanvas(canvas, images)

  useEffect(() => {
    repaintRef.current = repaint
  }, [repaint])

  useEffect(() => {
    // Nothing can be drawn before the first image decodes, but that is now one
    // image rather than 192 — the pin is live almost immediately.
    if (!ready) return

    if (reduced) {
      // No pin, no scrub, no timeline. One composed still, and the page scrolls
      // normally into the sections that carry the same content in full.
      drawFrame(STATIC_FRAME)
      return
    }

    const mm = gsap.matchMedia()

    // Every query carries the motion preference too, so a mid-session change to
    // the OS setting tears the pin down rather than waiting for a remount.
    mm.add(
      {
        desktop: '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
        tablet:
          '(min-width: 768px) and (max-width: 1023.98px) and (prefers-reduced-motion: no-preference)',
        mobile: '(max-width: 767.98px) and (prefers-reduced-motion: no-preference)',
      },
      (context) => {
        const { desktop, tablet } = context.conditions
        const vh = desktop ? SCROLL_VH.desktop : tablet ? SCROLL_VH.tablet : SCROLL_VH.mobile

        buildSequenceTimeline({
          drawFrame,
          root: root.current,
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            // A function so `invalidateOnRefresh` re-reads it: on mobile the
            // URL bar collapsing changes innerHeight mid-scroll.
            end: () => `+=${window.innerHeight * vh}`,
            scrub: 0.5,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
      },
    )

    // The pin spacer is measured when the trigger is created, and the sections
    // below have been laid out since. Cheap, and prevents a stale pin length.
    ScrollTrigger.refresh()

    // Reverts every tween, trigger and inline style created inside the
    // matchMedia scope — including on StrictMode's double mount.
    return () => mm.revert()
  }, [ready, reduced, drawFrame])

  return (
    <section
      ref={root}
      aria-labelledby="hero-name"
      className={cn(
        'relative w-full overflow-hidden bg-bg',
        // Pinned: exactly one viewport. Unpinned (reduced motion): at least one,
        // but free to grow with the copy at large text sizes.
        reduced ? 'flex min-h-svh flex-col justify-center' : 'h-svh',
      )}
    >
      <canvas
        ref={canvas}
        aria-hidden="true"
        className={cn('h-full w-full', reduced && 'absolute inset-0')}
      />

      <HeroOverlay staticLayout={reduced} />
    </section>
  )
}
