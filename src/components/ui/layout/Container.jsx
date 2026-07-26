import { forwardRef } from 'react'
import { cn } from '@/lib/cn'

/**
 * The three measures the design language defines. Tokens are read directly
 * rather than through `max-w-content` / `px-gutter`, because tailwind-merge
 * cannot see `theme.css`: it treats those custom names as unknown classes, so a
 * width passed via `className` would sit alongside the default instead of
 * replacing it, and stylesheet order — not the call site — would decide the
 * winner. The arbitrary form keeps the override contract honest.
 */
const sizeStyles = {
  content: 'max-w-[var(--container-content)]',
  wide: 'max-w-[var(--container-wide)]',
  prose: 'max-w-[var(--container-prose)]',
}

/**
 * Centering and gutter — identical for every size.
 * `w-full` keeps the box full-width when it is a flex/grid child, where a
 * block element would otherwise shrink to its content.
 */
const base = 'mx-auto w-full px-[var(--spacing-gutter)]'

/**
 * Container — the single source of truth for content measure and horizontal
 * gutter. Nothing else in the app should write `max-w-*`, `mx-auto`, or `px-*`
 * for page layout.
 *
 * Owns horizontal space only: no vertical rhythm, background, or inner layout.
 * Compose those on the parent (`Section`) or on a child, never here.
 *
 * @param {object} props
 * @param {React.ElementType} [props.as='div'] - Element to render (`section`, `header`, `main`, `footer`, ...).
 * @param {'content'|'wide'|'prose'} [props.size='content'] - Maximum measure.
 * @param {React.ReactNode} [props.children]
 * @param {string} [props.className] - Extra classes, merged last (can override defaults, e.g. `px-0` for full-bleed).
 * @param {React.Ref<HTMLElement>} ref
 */
export const Container = forwardRef(function Container(
  { as: Tag = 'div', size = 'content', className, children, ...props },
  ref,
) {
  if (import.meta.env?.DEV && !sizeStyles[size]) {
    console.warn(`[Container] unknown \`size\`: ${size}. Using "content".`)
  }

  return (
    <Tag
      ref={ref}
      data-slot="container"
      className={cn(base, sizeStyles[size] ?? sizeStyles.content, className)}
      {...props}
    >
      {children}
    </Tag>
  )
})

Container.displayName = 'Container'
