import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'
import { fadeUp, stagger, viewport } from '@/design-system/motion'

/**
 * Stagger — a list whose items arrive in sequence.
 *
 * The container owns the timing and animates nothing itself; each `StaggerItem`
 * owns its own movement. That split is the whole point: an item can change how
 * it enters without the parent knowing, and the parent can retime the sequence
 * without touching any item.
 *
 * Only the container watches the viewport. Children inherit `hidden`/`visible`
 * through Framer's variant propagation, so a list of thirty items still costs
 * one IntersectionObserver, not thirty.
 *
 * @param {object} props
 * @param {React.ElementType} [props.as='div'] - Element to render.
 * @param {number} [props.gap=0.08] - Seconds between items.
 * @param {number} [props.delay=0] - Seconds before the first item.
 * @param {string} [props.className]
 */
export function Stagger({ as = 'div', gap = 0.08, delay = 0, className, children, ...props }) {
  const Tag = motion[as] ?? motion.div

  return (
    <Tag
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={stagger(gap, delay)}
      className={cn(className)}
      {...props}
    >
      {children}
    </Tag>
  )
}

/**
 * StaggerItem — one entry in a `Stagger`.
 *
 * Declares no trigger of its own. Dropping one outside a `Stagger` renders it
 * in the `hidden` state and leaves it there, which is loud enough to catch in
 * development and is why every call site keeps the two together.
 *
 * @param {object} props
 * @param {React.ElementType} [props.as='div'] - Element to render.
 * @param {number} [props.distance=20] - Rise in px. Keep small for inline items.
 * @param {string} [props.className]
 */
export function StaggerItem({ as = 'div', distance = 20, className, children, ...props }) {
  const Tag = motion[as] ?? motion.div

  return (
    <Tag variants={fadeUp(distance)} className={cn(className)} {...props}>
      {children}
    </Tag>
  )
}
