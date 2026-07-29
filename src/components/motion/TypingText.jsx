import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/cn'

/** Typing is deliberately slower than deleting — that asymmetry is what makes
 *  it read as writing rather than as a marquee. */
const TYPE_MS = 85
const DELETE_MS = 40
/** How long a completed phrase sits before it starts erasing. */
const HOLD_MS = 1700
/** The beat on an empty line before the next phrase starts. Also what keeps the
 *  phrase advance inside a callback rather than in the effect body, where it
 *  would be a synchronous setState and an extra render. */
const GAP_MS = 420

/**
 * TypingText — cycles phrases with a typewriter effect and a blinking caret.
 *
 * Plain React state and `setTimeout`, not Framer: this animates the *content*
 * of a text node, one character at a time. Framer animates style values, so it
 * has nothing to offer here — reaching for it would mean driving a character
 * count through a motion value and reading it back out on every frame.
 *
 * Accessibility is the part that is easy to get wrong. A live region would
 * announce every single keystroke, and the naive alternative — leaving the
 * animated node readable — announces meaningless fragments like "MERN Stack De".
 * So the full phrase list is rendered once, statically, for screen readers, and
 * the animated node is hidden from them entirely. The two are always in sync
 * because both read the same `phrases` array.
 *
 * Under reduced motion nothing animates and nothing cycles: the first phrase is
 * shown outright, caret included but still. The component is not disabled, it
 * just arrives at its resting state immediately.
 *
 * @param {object} props
 * @param {string[]} props.phrases - Cycled in order, then repeated.
 * @param {string} [props.className] - Applied to the wrapper.
 * @param {string} [props.caretClassName] - Applied to the caret, for colour.
 */
export function TypingText({ phrases, className, caretClassName }) {
  const reduced = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [length, setLength] = useState(0)
  const [deleting, setDeleting] = useState(false)

  const current = phrases[index % phrases.length]

  useEffect(() => {
    if (reduced) return

    // Each branch schedules exactly one step, so the effect re-runs per
    // character rather than holding an interval that has to be reasoned about.
    if (!deleting && length < current.length) {
      const timer = setTimeout(() => setLength(length + 1), TYPE_MS)
      return () => clearTimeout(timer)
    }

    if (!deleting && length === current.length) {
      const timer = setTimeout(() => setDeleting(true), HOLD_MS)
      return () => clearTimeout(timer)
    }

    if (deleting && length > 0) {
      const timer = setTimeout(() => setLength(length - 1), DELETE_MS)
      return () => clearTimeout(timer)
    }

    // Fully erased: pause on the empty line, then start the next phrase.
    const timer = setTimeout(() => {
      setDeleting(false)
      setIndex((value) => (value + 1) % phrases.length)
    }, GAP_MS)
    return () => clearTimeout(timer)
  }, [length, deleting, current, phrases.length, reduced])

  const visible = reduced ? phrases[0] : current.slice(0, length)

  return (
    <span className={cn('inline-flex items-baseline', className)}>
      {/* The accessible copy: every phrase, read once, never re-announced. */}
      <span className="sr-only">{phrases.join(', ')}</span>

      <span aria-hidden="true" className="inline-flex items-baseline">
        {visible}
        <span
          className={cn(
            'ml-1 inline-block w-[0.08em] self-stretch bg-current',
            // The caret holds still for anyone who asked for less movement —
            // it still marks the end of the line, it just does not flash.
            'animate-caret motion-reduce:animate-none',
            caretClassName,
          )}
        />
      </span>
    </span>
  )
}
