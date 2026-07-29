import { forwardRef } from 'react'
import { cn } from '@/lib/cn'
// Import the sibling directly, never through the package barrel (avoids cycles).
import { controlBase, controlContent, iconGlyph, linkVariants, resolveSizeClass } from './controlStyles'

/**
 * ActionLink — a navigation target that looks like a button.
 *
 * Every call to action on this page goes somewhere: a section anchor, a mailto,
 * an external profile. Those are links, and rendering them as `<button>` with
 * an onClick would cost middle-click, copy-link, open-in-new-tab and the
 * screen-reader announcement that says where it leads. So: a real `<a>`, styled
 * from the same recipe as `Button` (`controlStyles.js`).
 *
 * External targets get `rel="noreferrer noopener"` automatically when `target`
 * is `_blank` — the one security detail that is easy to forget per call site.
 *
 * For an in-app route, pass the router's `Link` as `as` and use `to` instead of
 * `href` — that keeps navigation client-side while the styling stays identical:
 *
 *   <ActionLink as={Link} to="/contact" variant="outline">Hire me</ActionLink>
 *
 * @param {object} props
 * @param {React.ElementType} [props.as='a'] - Element or component to render.
 * @param {string} [props.href] - Where it goes, for a plain anchor.
 * @param {'primary'|'secondary'|'outline'|'ghost'|'text'|'icon'} [props.variant='primary']
 * @param {'sm'|'md'|'lg'} [props.size='md'] - `md` is 44px (touch-target safe).
 * @param {React.ReactNode} [props.leftIcon] - Icon before the label (ignored for `icon`).
 * @param {React.ReactNode} [props.rightIcon] - Icon after the label (ignored for `icon`).
 * @param {string} [props.className] - Extra classes, merged last.
 * @param {React.Ref<HTMLAnchorElement>} ref
 */
export const ActionLink = forwardRef(function ActionLink(
  {
    as: Tag = 'a',
    href,
    variant = 'primary',
    size = 'md',
    leftIcon,
    rightIcon,
    target,
    rel,
    className,
    children,
    ...props
  },
  ref,
) {
  const isIcon = variant === 'icon'

  if (import.meta.env?.DEV && isIcon && !props['aria-label'] && !props['aria-labelledby']) {
    console.warn('[ActionLink] variant="icon" needs an `aria-label` for screen readers.')
  }

  return (
    <Tag
      ref={ref}
      href={href}
      target={target}
      rel={target === '_blank' ? (rel ?? 'noreferrer noopener') : rel}
      data-slot="action-link"
      className={cn(
        controlBase,
        linkVariants[variant] ?? linkVariants.primary,
        resolveSizeClass(variant, size),
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          'inline-flex items-center justify-center',
          isIcon ? iconGlyph[size] : controlContent[size],
        )}
      >
        {!isIcon && leftIcon && <span className="shrink-0">{leftIcon}</span>}
        {children}
        {!isIcon && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </span>
    </Tag>
  )
})

ActionLink.displayName = 'ActionLink'
