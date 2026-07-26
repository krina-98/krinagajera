import { forwardRef } from 'react'
import { cn } from '@/lib/cn'

/**
 * The brand signature, expressed once: mono, uppercase, widest tracking, bronze.
 * No display/layout classes — spacing and stacking belong to the consumer.
 */
const eyebrow = cn(
  'font-mono text-xs font-medium uppercase',
  'tracking-widest',
  // bronze-hover, not bronze: at this size AA needs ≥4.5:1, and --color-bronze
  // lands at ~4.4:1 on --color-bg. bronze-hover clears it at ~6.7:1.
  'text-bronze-hover',
)

/**
 * Eyebrow — the small bronze kicker above a section heading
 * ("FEATURED PROJECTS", "ABOUT", "SELECTED WORK").
 *
 * Renders a `span` by default so it can sit inline or be wrapped freely; pass
 * `as="p"` when it stands alone as its own block. Forwards its ref and any extra
 * props (`id`, `aria-*`, ...).
 *
 * Purely visual by design — it carries no heading semantics, so the section's
 * real `Heading` stays the outline entry.
 *
 * @param {object} props
 * @param {React.ElementType} [props.as='span'] - Element to render.
 * @param {React.ReactNode} [props.children] - Label content (written in normal case; CSS uppercases it).
 * @param {string} [props.className] - Extra classes, merged last (can override defaults).
 * @param {React.Ref<HTMLElement>} ref
 */
export const Eyebrow = forwardRef(function Eyebrow(
  { as: Tag = 'span', className, children, ...props },
  ref,
) {
  return (
    <Tag ref={ref} data-slot="eyebrow" className={cn(eyebrow, className)} {...props}>
      {children}
    </Tag>
  )
})

Eyebrow.displayName = 'Eyebrow'
