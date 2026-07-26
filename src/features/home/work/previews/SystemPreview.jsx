const SWATCHES = ['bg-accent-dark', 'bg-accent', 'bg-accent-hover', 'bg-card-hover', 'bg-surface']
const RAMP = ['h-3 w-1/2', 'h-2.5 w-2/5', 'h-2 w-1/3', 'h-1.5 w-1/4']
const SPACING = ['w-1', 'w-2', 'w-3', 'w-5', 'w-8', 'w-12']

/**
 * A design-system foundations page: palette, type ramp, controls, spacing scale.
 * Built from the same tokens it depicts, so it cannot drift from the real thing.
 */
export function SystemPreview() {
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex gap-1.5">
        {SWATCHES.map((swatch) => (
          <span key={swatch} className={`h-8 flex-1 rounded-sm ${swatch}`} />
        ))}
      </div>

      <div className="grid flex-1 grid-cols-2 gap-4">
        <div className="flex flex-col justify-center gap-2">
          {RAMP.map((step) => (
            <span key={step} className={`rounded-xs bg-card-hover ${step}`} />
          ))}
        </div>

        <div className="flex flex-col justify-center gap-2.5">
          <span className="h-6 w-20 rounded-sm bg-accent" />
          <span className="h-6 w-20 rounded-sm border border-border bg-card" />
          <span className="h-6 w-full rounded-sm border border-border" />
        </div>
      </div>

      <div className="flex items-end gap-1.5 border-t border-border pt-3">
        {SPACING.map((step) => (
          <span key={step} className={`h-2 rounded-xs bg-accent-dark ${step}`} />
        ))}
      </div>
    </div>
  )
}
