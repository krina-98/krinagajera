import { cn } from '@/lib/cn'

/**
 * The shared visual recipe behind `Button` and `ActionLink`.
 *
 * The two exist because a `<button>` and an `<a>` are different elements with
 * different semantics — but a reader cannot tell them apart, so they must look
 * identical. Keeping both recipes in this one file is what makes that true:
 * they sit side by side, and a change to one that is not mirrored is visible in
 * the diff rather than discovered later on a page nobody rechecked.
 *
 * Colors are written out twice rather than composed from a shared palette.
 * That is forced, not sloppy: Tailwind extracts class names statically from
 * source, so `enabled:hover:bg-accent-hover` has to appear as a literal string.
 * A prefix applied at runtime produces a class that was never generated.
 */

/** Layout, shape, transitions and focus ring — identical for both elements. */
export const controlBase = cn(
  'relative inline-flex select-none items-center justify-center',
  'font-sans font-semibold whitespace-nowrap',
  'rounded-md border border-transparent',
  // Only interactive properties transition — no layout thrash.
  'transition-[background-color,border-color,color,box-shadow,text-decoration-color,transform]',
  'ease-standard duration-[var(--duration-fast)]',
  // Replace the global outline with a ring that follows the border radius.
  'outline-none focus-visible:outline-none',
  'focus-visible:ring-2 focus-visible:ring-accent-hover focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
)

/**
 * Press feedback: a 1px nudge, only when motion is allowed.
 *
 * Spelled out per element for the same static-extraction reason as the colors —
 * building `enabled:${pressNudge}` with a template literal produces a class
 * Tailwind never generated, so the style would silently do nothing.
 */
const buttonPress = 'motion-safe:enabled:active:translate-y-px'
const linkPress = 'motion-safe:active:translate-y-px'

/**
 * Button colors. `enabled:` scopes hover and press so that disabled AND loading
 * buttons — both of which carry the native `disabled` attribute — stay inert.
 */
export const buttonVariants = {
  primary: cn(
    'bg-accent text-bg',
    'enabled:hover:bg-accent-hover enabled:hover:shadow-accent',
    buttonPress,
  ),
  secondary: cn(
    'border-border bg-card text-text',
    'enabled:hover:border-border-hover enabled:hover:bg-card-hover',
    buttonPress,
  ),
  /**
   * A true outline: no fill at all, so the page shows through. Distinct from
   * `secondary`, which sits on a card surface, and from `ghost`, which has no
   * border.
   *
   * Hover brightens the border and raises a bronze glow, lifting the control
   * half a step off the page. No fill sweep and no colour flip — the whole
   * point of an outline is that it stays an outline. The lift is behind
   * `motion-safe`, so a reduced-motion reader still gets the border and glow;
   * they just do not get the movement.
   */
  outline: cn(
    'border-accent-dark bg-transparent text-accent-hover',
    'enabled:hover:border-accent-hover enabled:hover:shadow-glow',
    'motion-safe:enabled:hover:-translate-y-0.5',
    buttonPress,
  ),
  ghost: cn(
    'bg-transparent text-text-secondary',
    'enabled:hover:bg-card enabled:hover:text-text',
    buttonPress,
  ),
  text: cn(
    'rounded-sm bg-transparent text-accent-hover',
    // Underline is revealed via decoration-color, so it fades instead of jumping.
    'underline decoration-transparent decoration-1 underline-offset-4',
    'enabled:hover:decoration-accent-hover',
  ),
  // Icon-only: behaves like ghost, but square (dimensions from iconSizes).
  icon: cn(
    'bg-transparent text-text-secondary',
    'enabled:hover:bg-card enabled:hover:text-text',
    buttonPress,
  ),
}

/**
 * Link colors — the same treatments without `enabled:`.
 *
 * `:enabled` matches form controls only, so an `enabled:hover:` class on an
 * anchor silently never applies. A link has no disabled state to guard anyway:
 * an action that is unavailable should not be a link.
 */
export const linkVariants = {
  primary: cn('bg-accent text-bg', 'hover:bg-accent-hover hover:shadow-accent', linkPress),
  secondary: cn(
    'border-border bg-card text-text',
    'hover:border-border-hover hover:bg-card-hover',
    linkPress,
  ),
  outline: cn(
    'border-accent-dark bg-transparent text-accent-hover',
    'hover:border-accent-hover hover:shadow-glow',
    'motion-safe:hover:-translate-y-0.5',
    linkPress,
  ),
  ghost: cn('bg-transparent text-text-secondary', 'hover:bg-card hover:text-text', linkPress),
  text: cn(
    'rounded-sm bg-transparent text-accent-hover',
    'underline decoration-transparent decoration-1 underline-offset-4',
    'hover:decoration-accent-hover',
  ),
  icon: cn('bg-transparent text-text-secondary', 'hover:bg-card hover:text-text', linkPress),
}

/** Contained variants: height + horizontal padding + label size. */
export const controlSizes = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-5 text-sm', // 44px — meets the WCAG touch-target minimum
  lg: 'h-13 px-7 text-base',
}

/** Icon variant: square, no horizontal padding. */
export const iconSizes = {
  sm: 'h-9 w-9 text-sm',
  md: 'h-11 w-11 text-base',
  lg: 'h-13 w-13 text-base',
}

/** Text variant: no box, so size only affects the label. */
export const textSizes = {
  sm: 'text-sm',
  md: 'text-sm',
  lg: 'text-base',
}

/** Inner row: gap between label and icons, plus glyph sizing that tracks size. */
export const controlContent = {
  sm: 'gap-1.5 [&_svg]:size-4',
  md: 'gap-2 [&_svg]:size-4',
  lg: 'gap-2.5 [&_svg]:size-5',
}

/** Glyph sizing for the icon-only variant. */
export const iconGlyph = {
  sm: '[&_svg]:size-4',
  md: '[&_svg]:size-5',
  lg: '[&_svg]:size-5',
}

/**
 * Resolve the size class for a variant, which is the one piece of sizing logic
 * both elements need and neither should re-derive.
 */
export function resolveSizeClass(variant, size) {
  if (variant === 'icon') return iconSizes[size] ?? iconSizes.md
  if (variant === 'text') return textSizes[size] ?? textSizes.md
  return controlSizes[size] ?? controlSizes.md
}
