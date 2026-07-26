import { forwardRef } from 'react'
import { cn } from '@/lib/cn'
// Import siblings directly, never through the package barrel (avoids cycles).
import { Spinner } from './Spinner'

/** Shared across every variant: layout, shape, transitions, focus ring. */
const base = cn(
  'relative inline-flex select-none items-center justify-center',
  'font-sans font-semibold whitespace-nowrap',
  'rounded-md border border-transparent',
  // Only interactive properties transition — no layout thrash.
  'transition-[background-color,border-color,color,box-shadow,text-decoration-color,transform]',
  'ease-standard duration-[var(--duration-fast)]',
  // Replace the global outline with a ring that follows the border radius.
  'outline-none focus-visible:outline-none',
  'focus-visible:ring-2 focus-visible:ring-bronze-hover focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
)

/** Press feedback: a 1px nudge, only when motion is allowed and the button is
 * interactive. Single source of truth so every pressable variant stays in sync. */
const pressable = 'motion-safe:enabled:active:translate-y-px'

/**
 * Color treatments. `enabled:` scopes hover/active so disabled AND loading
 * buttons (both carry the native `disabled` attribute) stay inert.
 */
const variantStyles = {
  primary: cn(
    'bg-bronze text-bg',
    'enabled:hover:bg-bronze-hover enabled:hover:shadow-bronze',
    pressable,
  ),
  secondary: cn(
    'border-border bg-card text-text',
    'enabled:hover:border-border-hover enabled:hover:bg-card-hover',
    pressable,
  ),
  ghost: cn(
    'bg-transparent text-text-secondary',
    'enabled:hover:bg-card enabled:hover:text-text',
    pressable,
  ),
  text: cn(
    'rounded-sm bg-transparent text-bronze-hover',
    // Underline is revealed via decoration-color, so it fades instead of jumping.
    'underline decoration-transparent decoration-1 underline-offset-4',
    'enabled:hover:decoration-bronze-hover',
  ),
  // Icon-only: behaves like ghost, but square (dimensions from iconSizeStyles).
  icon: cn(
    'bg-transparent text-text-secondary',
    'enabled:hover:bg-card enabled:hover:text-text',
    pressable,
  ),
}

/** Contained variants (primary/secondary/ghost): height + horizontal padding + label size. */
const sizeStyles = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-5 text-sm', // 44px — meets the WCAG touch-target minimum
  lg: 'h-13 px-7 text-base',
}

/** Icon variant: square, no horizontal padding. */
const iconSizeStyles = {
  sm: 'h-9 w-9 text-sm',
  md: 'h-11 w-11 text-base',
  lg: 'h-13 w-13 text-base',
}

/** Text variant: no box, size only affects the label. */
const textSizeStyles = {
  sm: 'text-sm',
  md: 'text-sm',
  lg: 'text-base',
}

/** Inner row: gap between label and icons, plus glyph sizing that tracks the size. */
const contentStyles = {
  sm: 'gap-1.5 [&_svg]:size-4',
  md: 'gap-2 [&_svg]:size-4',
  lg: 'gap-2.5 [&_svg]:size-5',
}

/** Glyph sizing for the icon-only variant. */
const iconGlyphStyles = {
  sm: '[&_svg]:size-4',
  md: '[&_svg]:size-5',
  lg: '[&_svg]:size-5',
}

/**
 * Button — the foundational action element of the design system.
 *
 * Renders a semantic `<button>`; forwards its ref and any extra props
 * (`onClick`, `aria-*`, `form`, `name`, ...). Flat and monochrome by default;
 * only `primary` wears bronze.
 *
 * @param {object} props
 * @param {'primary'|'secondary'|'ghost'|'text'|'icon'} [props.variant='primary'] - Visual style. `icon` is square and icon-only.
 * @param {'sm'|'md'|'lg'} [props.size='md'] - Control size. `md` is 44px (touch-target safe).
 * @param {boolean} [props.isLoading=false] - Shows a spinner, preserves width, and marks the button busy + inert.
 * @param {boolean} [props.disabled=false] - Disables the button (also disabled while loading).
 * @param {React.ReactNode} [props.leftIcon] - Icon before the label (ignored for `icon` variant).
 * @param {React.ReactNode} [props.rightIcon] - Icon after the label (ignored for `icon` variant).
 * @param {'button'|'submit'|'reset'} [props.type='button'] - Native button type.
 * @param {React.ReactNode} [props.children] - Label content; for `icon` variant, the glyph itself.
 * @param {string} [props.className] - Extra classes, merged last (can override defaults).
 * @param {React.Ref<HTMLButtonElement>} ref
 */
export const Button = forwardRef(function Button(
  {
    variant = 'primary',
    size = 'md',
    isLoading = false,
    disabled = false,
    leftIcon,
    rightIcon,
    type = 'button',
    className,
    children,
    ...props
  },
  ref,
) {
  const isIcon = variant === 'icon'
  const isText = variant === 'text'
  const isDisabled = disabled || isLoading

  if (import.meta.env?.DEV && isIcon && !props['aria-label'] && !props['aria-labelledby']) {
    console.warn('[Button] variant="icon" needs an `aria-label` for screen readers.')
  }

  const sizeClass = isIcon ? iconSizeStyles[size] : isText ? textSizeStyles[size] : sizeStyles[size]

  return (
    <button
      ref={ref}
      type={type}
      data-slot="button"
      disabled={isDisabled}
      aria-busy={isLoading || undefined}
      className={cn(
        base,
        variantStyles[variant],
        sizeClass,
        // Loading stays full-strength (spinner shown); only true disabled dims.
        disabled && !isLoading && 'cursor-not-allowed opacity-60',
        isLoading && 'cursor-progress',
        className,
      )}
      {...props}
    >
      {isLoading && (
        <span className="absolute inset-0 grid place-items-center">
          <Spinner className="size-[1.15em]" aria-hidden="true" />
        </span>
      )}
      <span
        className={cn(
          'inline-flex items-center justify-center',
          isIcon ? iconGlyphStyles[size] : contentStyles[size],
          isLoading && 'opacity-0',
        )}
      >
        {!isIcon && leftIcon && <span className="shrink-0">{leftIcon}</span>}
        {children}
        {!isIcon && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </span>
    </button>
  )
})

Button.displayName = 'Button'
