import { forwardRef } from 'react'
import { cn } from '@/lib/cn'
// Import siblings directly, never through the package barrel (avoids cycles).
import { Spinner } from './Spinner'
import { buttonVariants, controlBase, controlContent, iconGlyph, resolveSizeClass } from './controlStyles'

/**
 * Button — the foundational action element of the design system.
 *
 * Renders a semantic `<button>`; forwards its ref and any extra props
 * (`onClick`, `aria-*`, `form`, `name`, ...). Flat and monochrome by default;
 * only `primary` wears accent.
 *
 * For anything that navigates, reach for `ActionLink` instead — it shares this
 * component's exact appearance (see `controlStyles.js`) while staying a real
 * anchor. A button with an onClick that changes the URL loses middle-click,
 * copy-link, and the announcement telling a screen-reader user where it goes.
 *
 * @param {object} props
 * @param {'primary'|'secondary'|'outline'|'ghost'|'text'|'icon'} [props.variant='primary'] - Visual style. `outline` is border-only; `icon` is square and icon-only.
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
  const isDisabled = disabled || isLoading

  if (import.meta.env?.DEV && isIcon && !props['aria-label'] && !props['aria-labelledby']) {
    console.warn('[Button] variant="icon" needs an `aria-label` for screen readers.')
  }

  return (
    <button
      ref={ref}
      type={type}
      data-slot="button"
      disabled={isDisabled}
      aria-busy={isLoading || undefined}
      className={cn(
        controlBase,
        buttonVariants[variant] ?? buttonVariants.primary,
        resolveSizeClass(variant, size),
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
          isIcon ? iconGlyph[size] : controlContent[size],
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
