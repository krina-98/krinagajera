import { cn } from '@/lib/cn'
import { Code } from '@/components/ui'

/**
 * BrowserFrame — the chrome a product screenshot lives in.
 *
 * Restrained on purpose: hairline dots rather than traffic lights, and a mono
 * address instead of a full toolbar. It should read as a frame around the work,
 * not as an illustration of a browser.
 *
 * @param {object} props
 * @param {string} props.url - Address shown in the bar.
 * @param {React.ReactNode} props.children - The screen itself.
 * @param {string} [props.className] - Extra classes, merged last.
 */
export function BrowserFrame({ url, children, className }) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-lg border border-border bg-card',
        'shadow-lg transition-[border-color,box-shadow] duration-[var(--duration-base)] ease-standard',
        'group-hover:border-border-hover group-hover:shadow-accent',
        className,
      )}
    >
      <div className="flex items-center gap-3 border-b border-border px-4 py-3">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="size-2 rounded-full border border-border" />
          <span className="size-2 rounded-full border border-border" />
          <span className="size-2 rounded-full border border-border" />
        </span>
        <span className="min-w-0 flex-1 truncate rounded-sm bg-surface px-3 py-1">
          <Code className="text-text-muted">{url}</Code>
        </span>
      </div>

      <div aria-hidden="true" className="aspect-16/10 bg-surface p-5">
        {children}
      </div>
    </div>
  )
}
