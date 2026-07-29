import { forwardRef } from 'react'
import { cn } from '@/lib/cn'

/**
 * Visual scale — deliberately decoupled from `level`.
 * Semantics (which `h*` tag) and appearance (how big) are different concerns:
 * a page may need an `h2` that reads as hero-sized, or an `h1` that sits quietly.
 *
 * Tracking tightens as size grows — large display type needs negative tracking to
 * avoid looking loose; small headings need none.
 *
 * The display steps read their token directly instead of using the shorter
 * `text-display-*` utility. Reason: tailwind-merge cannot see `theme.css`, so it
 * mistakes an unknown `text-display-lg` for a text *color* — any color passed via
 * `className` would then silently delete the font size. The `length:` hint makes
 * the group unambiguous, so size and color survive together. The paired
 * `leading-*` is the line-height that the utility would have carried; a smaller
 * `text-*` from `className` correctly replaces both.
 */
const sizeStyles = {
  'display-xl': 'text-[length:var(--text-display-xl)] leading-[var(--text-display-xl--line-height)] tracking-tighter',
  'display-lg': 'text-[length:var(--text-display-lg)] leading-[var(--text-display-lg--line-height)] tracking-tighter',
  'display-md': 'text-[length:var(--text-display-md)] leading-[var(--text-display-md--line-height)] tracking-tighter',
  'display-sm': 'text-[length:var(--text-display-sm)] leading-[var(--text-display-sm--line-height)] tracking-tight',
  '5xl': 'text-5xl tracking-tight',
  '4xl': 'text-4xl tracking-tight',
  '3xl': 'text-3xl tracking-tight',
  '2xl': 'text-2xl tracking-tight',
  xl: 'text-xl tracking-tight',
  lg: 'text-lg tracking-normal',
  base: 'text-base tracking-normal',
}

/** Default size per level — the scale you get when `size` is omitted. */
const levelSizes = {
  1: 'display-sm',
  2: '4xl',
  3: '2xl',
  4: 'xl',
  5: 'lg',
  6: 'base',
}

const weightStyles = {
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
}

/** Shared across every heading: display family, primary text color, wrap behaviour. */
const base = cn(
  'font-display text-text',
  // Headings are short — balanced wrapping avoids a single orphaned word.
  'text-balance',
)

/**
 * Heading — the single source of heading typography.
 *
 * Renders a semantic `h1`–`h6` chosen by `level`; `size` overrides the visual
 * scale independently, so document outline order never has to be broken for
 * design reasons. Forwards its ref (animation targets) and any extra props (`id`,
 * `aria-*`, ...).
 *
 * @param {object} props
 * @param {1|2|3|4|5|6} [props.level=2] - Semantic heading level → renders `h1`…`h6`.
 * @param {keyof typeof sizeStyles} [props.size] - Visual scale. Defaults to the size mapped to `level`.
 * @param {'medium'|'semibold'|'bold'} [props.weight] - Defaults to `bold` at the
 *   display steps and `semibold` below them. Reason: the site runs on the
 *   native system stack, and system UI faces are optically lighter at large
 *   sizes than a purpose-built display face — semibold Segoe UI at 7rem reads
 *   thin where a display font would have held. Pass a value to override.
 * @param {React.ReactNode} [props.children] - Heading content.
 * @param {string} [props.className] - Extra classes, merged last (can override defaults).
 * @param {React.Ref<HTMLHeadingElement>} ref
 */
export const Heading = forwardRef(function Heading(
  { level = 2, size, weight, className, children, ...props },
  ref,
) {
  const isValidLevel = Number.isInteger(level) && level >= 1 && level <= 6
  const resolvedLevel = isValidLevel ? level : 2
  // An omitted size is the norm; an unknown one is a typo — both fall back here.
  const resolvedSize = size && sizeStyles[size] ? size : levelSizes[resolvedLevel]
  const resolvedWeight = weight ?? (resolvedSize.startsWith('display') ? 'bold' : 'semibold')

  if (import.meta.env?.DEV) {
    if (!isValidLevel) {
      console.warn(`[Heading] \`level\` must be an integer 1–6, received: ${level}. Using 2.`)
    }
    if (size && !sizeStyles[size]) {
      console.warn(`[Heading] unknown \`size\`: ${size}. Using the default for level ${resolvedLevel}.`)
    }
  }

  const Tag = `h${resolvedLevel}`

  return (
    <Tag
      ref={ref}
      data-slot="heading"
      className={cn(base, sizeStyles[resolvedSize], weightStyles[resolvedWeight], className)}
      {...props}
    >
      {children}
    </Tag>
  )
})

Heading.displayName = 'Heading'
