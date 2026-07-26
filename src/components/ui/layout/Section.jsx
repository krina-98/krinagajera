import { forwardRef } from 'react'
import { cn } from '@/lib/cn'
// Import the sibling directly, never through the package barrel (avoids cycles).
import { Container } from './Container'

/**
 * Vertical rhythm — the whole page's pacing, in one place.
 *
 * `sm` and `md` are the two fluid section tokens; `lg` and `xl` are multiples of
 * `--spacing-section` rather than new raw values, so retuning that one token
 * rescales the entire ladder proportionally. Every step stays fluid (the tokens
 * are `clamp()`), so sections breathe with the viewport without breakpoints.
 *
 * Rendered range, min → max viewport:
 *   sm  2.5 → 5rem      md  4 → 9rem      lg  6 → 13.5rem      xl  8 → 18rem
 */
const spacingStyles = {
  sm: 'py-[var(--spacing-section-sm)]',
  md: 'py-[var(--spacing-section)]',
  lg: 'py-[calc(var(--spacing-section)*1.5)]',
  xl: 'py-[calc(var(--spacing-section)*2)]',
}

/**
 * Backgrounds — semantic surfaces only.
 *
 * `transparent` is the default so the body's ambient accent glow (base.css)
 * stays visible; painting `bg-bg` on every section would occlude it. Use
 * `default` deliberately when a section must occlude what sits behind it.
 */
const backgroundStyles = {
  default: 'bg-bg',
  surface: 'bg-surface',
  transparent: 'bg-transparent',
}

/**
 * Section — the only way to create a page section.
 *
 * Owns vertical rhythm, an optional surface, and semantics; delegates every
 * horizontal decision to `Container`. Anything inside — typography, grids,
 * cards, motion — is the caller's composition.
 *
 * @param {object} props
 * @param {React.ElementType} [props.as='section'] - Element to render (`section`, `main`, `header`, `footer`, `article`, ...).
 * @param {'sm'|'md'|'lg'|'xl'} [props.spacing='md'] - Vertical rhythm step.
 * @param {'default'|'surface'|'transparent'} [props.background='transparent'] - Surface treatment.
 * @param {'content'|'wide'|'prose'} [props.container='content'] - Measure passed to `Container`. Ignored when `fullWidth`.
 * @param {boolean} [props.fullWidth=false] - Skip `Container` entirely; children go edge-to-edge (3D canvas, immersive galleries).
 * @param {React.ReactNode} [props.children]
 * @param {string} [props.className] - Extra classes, merged last. Vertical/background overrides only — horizontal space belongs to `Container`.
 * @param {React.Ref<HTMLElement>} ref
 *
 * `id`, `aria-*` and the rest are forwarded. A `<section>` becomes a navigable
 * landmark only once it has an accessible name, so pass `aria-labelledby`
 * pointing at the section's `Heading` when it should appear in the landmark list.
 */
export const Section = forwardRef(function Section(
  {
    as: Tag = 'section',
    spacing = 'md',
    background = 'transparent',
    container,
    fullWidth = false,
    className,
    children,
    ...props
  },
  ref,
) {
  if (import.meta.env?.DEV) {
    if (!spacingStyles[spacing]) {
      console.warn(`[Section] unknown \`spacing\`: ${spacing}. Using "md".`)
    }
    if (!backgroundStyles[background]) {
      console.warn(`[Section] unknown \`background\`: ${background}. Using "transparent".`)
    }
    if (fullWidth && container !== undefined) {
      console.warn('[Section] `container` is ignored when `fullWidth` is set — pick one.')
    }
  }

  return (
    <Tag
      ref={ref}
      data-slot="section"
      className={cn(
        backgroundStyles[background] ?? backgroundStyles.transparent,
        spacingStyles[spacing] ?? spacingStyles.md,
        className,
      )}
      {...props}
    >
      {fullWidth ? children : <Container size={container ?? 'content'}>{children}</Container>}
    </Tag>
  )
})

Section.displayName = 'Section'
