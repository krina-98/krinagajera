import { cn } from '@/lib/cn'

const TILES = ['w-2/3', 'w-1/2', 'w-3/5']
const ROWS = [
  { width: 'w-11/12', live: false },
  { width: 'w-4/5', live: true },
  { width: 'w-10/12', live: false },
  { width: 'w-3/4', live: false },
  { width: 'w-9/12', live: false },
]

/** A streaming inference monitor: KPI tiles, a live trace, and an event queue. */
export function DashboardPreview() {
  return (
    <div className="flex h-full gap-4">
      <div className="flex w-8 flex-col gap-2 border-r border-border pr-3">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={cn('h-1.5 rounded-full', i === 1 ? 'bg-accent' : 'bg-card-hover')}
          />
        ))}
      </div>

      <div className="flex flex-1 flex-col gap-3">
        <div className="grid grid-cols-3 gap-2">
          {TILES.map((width, i) => (
            <div key={i} className="rounded-sm border border-border bg-card p-2">
              <span className={cn('block h-2.5 rounded-xs bg-accent-hover', width)} />
              <span className="mt-1.5 block h-1 w-full rounded-xs bg-card-hover" />
            </div>
          ))}
        </div>

        <div className="relative flex-1 overflow-hidden rounded-sm border border-border bg-card">
          <svg
            viewBox="0 0 200 60"
            preserveAspectRatio="none"
            className="absolute inset-0 size-full"
          >
            <path
              d="M0 44 L18 40 L32 47 L48 26 L64 33 L82 18 L98 30 L116 12 L134 25 L152 20 L170 34 L186 28 L200 36"
              fill="none"
              stroke="var(--color-accent-hover)"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M0 44 L18 40 L32 47 L48 26 L64 33 L82 18 L98 30 L116 12 L134 25 L152 20 L170 34 L186 28 L200 36 L200 60 L0 60 Z"
              fill="var(--color-glow)"
            />
          </svg>
        </div>

        <div className="flex flex-col gap-1.5">
          {ROWS.map((row, i) => (
            <span
              key={i}
              className={cn(
                'h-1.5 rounded-xs',
                row.width,
                row.live ? 'bg-accent' : 'bg-card-hover',
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
