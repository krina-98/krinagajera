import { motion, useReducedMotion } from 'framer-motion'
import { revealMotion } from './motion'

/** Reveal once, slightly before the block is fully on screen. */
const VIEWPORT = { once: true, margin: '0px 0px -12% 0px' }

/**
 * Reveal — scroll-triggered entrance for a block of content.
 *
 * Wraps children in a stagger parent. Any `RevealItem` inside inherits the
 * sequence, so a section declares its choreography once at the top rather than
 * per element.
 *
 * @param {object} props
 * @param {React.ElementType} [props.as='div'] - Element to render.
 * @param {number} [props.distance=16] - Travel in px; ignored under reduced motion.
 * @param {string} [props.className] - Extra classes, merged by the caller's own `cn`.
 */
export function Reveal({ as = 'div', distance = 16, className, children, ...props }) {
  const reduce = useReducedMotion()
  const { group } = revealMotion(reduce, distance)
  const Tag = motion[as] ?? motion.div

  return (
    <Tag
      variants={group}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      className={className}
      {...props}
    >
      {children}
    </Tag>
  )
}

/**
 * RevealItem — one step of a `Reveal` sequence.
 *
 * Carries no viewport logic of its own; the parent drives it. Use for every
 * child that should arrive in order.
 */
export function RevealItem({ as = 'div', distance = 16, className, children, ...props }) {
  const reduce = useReducedMotion()
  const { item } = revealMotion(reduce, distance)
  const Tag = motion[as] ?? motion.div

  return (
    <Tag variants={item} className={className} {...props}>
      {children}
    </Tag>
  )
}
