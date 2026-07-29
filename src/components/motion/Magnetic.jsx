import { useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { cn } from '@/lib/cn'

/** Loose enough to feel like attraction, damped enough never to wobble. */
const SPRING = { stiffness: 260, damping: 22, mass: 0.6 }

/**
 * Magnetic — a control that leans toward the cursor as it approaches.
 *
 * Reserved for the page's few real calls to action. It is a strong effect, and
 * on a grid of eight things it stops reading as attention and starts reading as
 * noise.
 *
 * The offset is written to motion values, never to state: the spring runs on
 * the compositor and React does not re-render while the pointer moves.
 *
 * Two guards, for two different reasons. `useReducedMotion` covers the reader
 * who asked the OS for less movement. The `pointerType` check covers touch,
 * where a tap would otherwise fire one pointermove and leave the control
 * permanently nudged off-centre with nothing to pull it back.
 *
 * @param {object} props
 * @param {number} [props.strength=0.3] - Fraction of the cursor's offset from
 *   centre that the control travels. Above ~0.4 it detaches from its own bounds.
 * @param {string} [props.className]
 */
export function Magnetic({ strength = 0.3, className, children, ...props }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, SPRING)
  const springY = useSpring(y, SPRING)

  const onPointerMove = (event) => {
    if (reduced || event.pointerType !== 'mouse') return

    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return

    x.set((event.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength)
  }

  const release = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={release}
      /* Focus and blur matter as much as the pointer here: a keyboard user
         tabbing through must not inherit an offset left behind by a mouse. */
      onBlur={release}
      style={{ x: springX, y: springY }}
      className={cn('inline-block', className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}
