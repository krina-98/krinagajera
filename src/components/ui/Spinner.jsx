import { cn } from '@/lib/cn'

/**
 * Spinner — animated loading indicator. Inherits color via `currentColor` and
 * spins only when motion is allowed (reduced-motion users see it static).
 *
 * Decorative by default (no ARIA). When it is the *sole* loading signal, either
 * pass `role="status"` + an accessible label, or place it inside an element with
 * `aria-busy` (as `Button` does).
 *
 * @param {object} props
 * @param {string} [props.className] - Extra classes, merged last. Controls size, e.g. `size-4` / `size-[1.15em]`.
 */
export function Spinner({ className, ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn('size-4 motion-safe:animate-spin', className)}
      {...props}
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" className="opacity-25" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}
