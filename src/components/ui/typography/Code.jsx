import { forwardRef } from 'react'
import { cn } from '@/lib/cn'

/**
 * Relative sizing (`em`, not a scale step) is deliberate: mono glyphs read larger
 * than sans at the same px, and `Code` must sit inside `Text` of *any* size
 * without breaking the line's rhythm.
 */
const base = 'font-mono text-[0.9em] tracking-normal'

const variantStyles = {
  // Tech-stack labels, version numbers, metadata — reads as text, not a control.
  plain: 'text-text-secondary',
  // Inline code inside prose — needs a boundary so it stops reading as a word.
  chip: 'rounded-sm border border-border bg-card px-1.5 py-0.5 text-text',
}

/**
 * Code — monospace token for tech names, versions and metadata
 * ("React", "Three.js", "v0.185.1").
 *
 * Renders an inline `<code>`; `as="span"` drops the code semantics when the label
 * isn't literally code. Forwards its ref and any extra props.
 *
 * @param {object} props
 * @param {React.ElementType} [props.as='code'] - Element to render.
 * @param {'plain'|'chip'} [props.variant='plain'] - `plain` inherits the flow; `chip` adds a bordered surface.
 * @param {React.ReactNode} [props.children] - Code content.
 * @param {string} [props.className] - Extra classes, merged last (can override defaults).
 * @param {React.Ref<HTMLElement>} ref
 */
export const Code = forwardRef(function Code(
  { as: Tag = 'code', variant = 'plain', className, children, ...props },
  ref,
) {
  return (
    <Tag
      ref={ref}
      data-slot="code"
      className={cn(base, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  )
})

Code.displayName = 'Code'
