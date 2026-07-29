import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'
import { fade, fadeIn, fadeUp, viewport } from '@/design-system/motion'

const variantsByDirection = {
  up: fadeUp,
  in: fadeIn,
}

/**
 * Reveal — the default entrance for a single block of content.
 *
 * The workhorse: one block, one trigger, fires once. For a list whose items
 * should arrive in sequence, use `Stagger` instead — thirty `Reveal`s with
 * hand-tuned delays is thirty observers doing a parent's job.
 *
 * @param {object} props
 * @param {React.ElementType} [props.as='div'] - Element to render.
 * @param {'up'|'in'|'none'} [props.direction='up'] - `up` rises, `in` slides
 *   from the side, `none` fades in place for content that must not shift.
 * @param {number} [props.distance=20] - Travel in px. Ignored by `none`.
 * @param {number} [props.delay=0] - Seconds, not milliseconds — this layer
 *   speaks Framer's units so nothing has to convert at the call site.
 * @param {string} [props.className]
 */
export function Reveal({
  as = 'div',
  direction = 'up',
  distance = 20,
  delay = 0,
  className,
  children,
  ...props
}) {
  const Tag = motion[as] ?? motion.div

  const base = direction === 'none' ? fade : (variantsByDirection[direction] ?? fadeUp)(distance)

  // Delay is folded into the variant rather than passed as a `transition` prop
  // so it cannot silently replace the easing the variant already carries.
  const variants = delay
    ? { ...base, visible: { ...base.visible, transition: { ...base.visible.transition, delay } } }
    : base

  return (
    <Tag
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={variants}
      className={cn(className)}
      {...props}
    >
      {children}
    </Tag>
  )
}
