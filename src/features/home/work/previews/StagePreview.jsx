import { cn } from '@/lib/cn'

const MATERIALS = ['bg-accent-hover', 'bg-accent', 'bg-accent-dark', 'bg-card-hover']

/** A configurator stage: the piece under a warm wash, with material options. */
export function StagePreview() {
  return (
    <div className="flex h-full gap-4">
      <div className="relative flex-[3] overflow-hidden rounded-sm border border-border bg-card">
        <span className="absolute inset-x-[10%] top-[14%] bottom-[26%] rounded-full bg-[radial-gradient(circle_at_50%_45%,var(--color-glow),transparent_70%)] blur-xl" />

        {/* The piece: a seat plane on two legs, read as silhouette only. */}
        <span className="absolute inset-x-[26%] top-[42%] h-[9%] rounded-xs bg-accent" />
        <span className="absolute top-[30%] left-[27%] h-[13%] w-[6%] rounded-xs bg-accent-dark" />
        <span className="absolute top-[51%] left-[30%] h-[20%] w-[4%] rounded-xs bg-accent-dark" />
        <span className="absolute top-[51%] right-[30%] h-[20%] w-[4%] rounded-xs bg-accent-dark" />
        <span className="absolute inset-x-[24%] bottom-[16%] h-px bg-border-hover" />
      </div>

      <div className="flex flex-[2] flex-col gap-3 border-l border-border pl-4">
        <span className="h-2.5 w-3/4 rounded-xs bg-card-hover" />
        <span className="h-1.5 w-1/2 rounded-xs bg-card-hover" />

        <div className="mt-2 flex gap-2">
          {MATERIALS.map((material, i) => (
            <span
              key={material}
              className={cn(
                'size-6 rounded-sm',
                material,
                i === 0 && 'ring-1 ring-accent-hover ring-offset-2 ring-offset-surface',
              )}
            />
          ))}
        </div>

        <span className="mt-auto h-7 w-full rounded-sm bg-accent" />
      </div>
    </div>
  )
}
