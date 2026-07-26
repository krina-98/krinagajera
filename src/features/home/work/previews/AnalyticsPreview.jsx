import { cn } from '@/lib/cn'

// Literal classes rather than computed heights: Tailwind sees them at build
// time, and the preview stays free of inline styles.
const BARS = [
  'h-[38%]', 'h-[52%]', 'h-[30%]', 'h-[61%]', 'h-[47%]', 'h-[72%]',
  'h-[55%]', 'h-[80%]', 'h-[66%]', 'h-[90%]', 'h-[74%]', 'h-[84%]',
]

const HIGHLIGHTED = BARS.length - 3

const POSITIONS = ['w-full', 'w-5/6', 'w-11/12', 'w-2/3', 'w-3/4', 'w-1/2']
const LEGEND = ['w-10', 'w-8', 'w-12']

/** A positions view: distribution bars against a grid, with a holdings ledger. */
export function AnalyticsPreview() {
  return (
    <div className="flex h-full gap-4">
      <div className="flex flex-[3] flex-col gap-2">
        <div className="relative flex-1 overflow-hidden rounded-sm border border-border bg-card">
          <div className="absolute inset-0 flex flex-col justify-between">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="h-px w-full bg-border" />
            ))}
          </div>

          <div className="absolute inset-0 flex items-end gap-1 p-2">
            {BARS.map((height, i) => (
              <span
                key={i}
                className={cn(
                  'flex-1 rounded-xs',
                  height,
                  i === HIGHLIGHTED ? 'bg-accent-hover' : 'bg-accent-dark',
                )}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          {LEGEND.map((width, i) => (
            <span key={i} className="flex items-center gap-1.5">
              <span
                className={cn(
                  'size-1.5 rounded-full',
                  i === 0 ? 'bg-accent-hover' : 'bg-card-hover',
                )}
              />
              <span className={cn('h-1 rounded-xs bg-card-hover', width)} />
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-[2] flex-col gap-2 border-l border-border pl-4">
        <span className="h-2 w-1/2 rounded-xs bg-accent-hover" />
        {POSITIONS.map((width, i) => (
          <span key={i} className={cn('h-1.5 rounded-xs bg-card-hover', width)} />
        ))}
        <span className="mt-auto h-1.5 w-2/5 rounded-xs bg-accent" />
      </div>
    </div>
  )
}
