import { forwardRef } from 'react'
import { cn } from '@/lib/cn'

/** Body scale — mirrors the `--text-*` tokens; no display sizes (that's `Heading`). */
const sizeStyles = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
}

/** Text color roles. The only place body-copy colors are named. */
const variantStyles = {
  default: 'text-text',
  secondary: 'text-text-secondary',
  muted: 'text-text-muted',
  // bronze-hover, not bronze: the base bronze is ~4.4:1 on --color-bg (below AA).
  accent: 'text-bronze-hover',
}

const weightStyles = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
}

/** Shared across every variant: body family and wrap behaviour. */
const base = cn(
  'font-sans',
  // Body copy: avoid a lone word on the last line without balancing whole blocks.
  'text-pretty',
)

export const Text = forwardRef(function Text(
  { as: Tag = 'p', size = 'base', variant = 'default', weight = 'normal', className, children, ...props },
  ref,
) {
  return (
    <Tag
      ref={ref}
      data-slot="text"
      className={cn(base, sizeStyles[size], variantStyles[variant], weightStyles[weight], className)}
      {...props}
    >
      {children}
    </Tag>
  )
})

Text.displayName = 'Text'
