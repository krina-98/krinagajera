import gsap from 'gsap'
import { FRAME_COUNT } from './frames'
import { BEAT_SHIFT, BEATS, CUE_EXIT } from './config'

/**
 * Builds the pinned timeline: the frame scrub and the text beats, together.
 *
 * One timeline on one ScrollTrigger, rather than a trigger per element. The
 * beats are choreographed against the orbit, and two triggers reading the same
 * scroll range can disagree by a frame or two during a fast scrub — which reads
 * as text arriving slightly late, every time.
 *
 * The frame tween is given `duration: 1` at position 0, so every other position
 * in this function is literally a fraction of the pinned scroll. `BEATS` can be
 * retuned by reading it as percentages.
 *
 * @param {object} options
 * @param {(index: number) => void} options.drawFrame - Paints a frame index.
 * @param {HTMLElement} options.root - Scope for beat lookups.
 * @param {object} options.scrollTrigger - ScrollTrigger config from the caller.
 * @returns {gsap.core.Timeline}
 */
export function buildSequenceTimeline({ drawFrame, root, scrollTrigger }) {
  // The playhead is a plain object, never React state: a scrub tick costs one
  // `drawImage` and no render.
  const playhead = { frame: 0 }

  const timeline = gsap.timeline({ scrollTrigger })

  timeline.to(
    playhead,
    {
      frame: FRAME_COUNT - 1,
      ease: 'none',
      duration: 1,
      onUpdate: () => drawFrame(playhead.frame),
    },
    0,
  )

  const find = (id) => root.querySelector(`[data-beat="${id}"]`)

  for (const beat of BEATS) {
    const el = find(beat.id)
    if (!el) continue

    const [enterFrom, enterTo] = beat.enter
    const [exitFrom, exitTo] = beat.exit
    const entering = enterTo - enterFrom

    // `autoAlpha` drives visibility alongside opacity, so a faded-out beat
    // leaves the accessibility tree and stops being focusable rather than
    // sitting invisibly on top of the scene.
    if (entering > 0) {
      timeline.fromTo(
        el,
        { autoAlpha: 0, y: BEAT_SHIFT },
        { autoAlpha: 1, y: 0, ease: 'power2.out', duration: entering },
        enterFrom,
      )
    } else {
      timeline.set(el, { autoAlpha: 1, y: 0 }, enterFrom)
    }

    timeline.to(
      el,
      { autoAlpha: 0, y: -BEAT_SHIFT, ease: 'power2.in', duration: exitTo - exitFrom },
      exitFrom,
    )
  }

  const cue = root.querySelector('[data-scroll-cue]')
  if (cue) {
    timeline.to(
      cue,
      { autoAlpha: 0, ease: 'power2.in', duration: CUE_EXIT[1] - CUE_EXIT[0] },
      CUE_EXIT[0],
    )
  }

  return timeline
}
