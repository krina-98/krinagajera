import { useCallback, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/cn'
import { FrameSequence } from '@/components/media'
import { MonitorOverlay } from './MonitorOverlay'
import { HOME_FRAME, WORKSTATION_FRAMES } from './frames'
import { useOrbitScrub } from './useOrbitScrub'

/**
 * Workstation — the hero visual.
 *
 * A pre-rendered orbit rather than a real-time scene. The render is far beyond
 * what a live WebGL pass could reach at this budget, and it costs one canvas
 * and a `drawImage` per frame instead of a scene graph.
 *
 * The monitor in the render is deliberately black, so the boot sequence is
 * composited over it as DOM — real text, selectable and readable, sitting in
 * the screen's footprint.
 */
export function Workstation() {
  const reduce = useReducedMotion()
  const [ready, setReady] = useState(false)

  const getIndex = useOrbitScrub(!reduce)
  const getFrame = useCallback(() => (reduce ? HOME_FRAME : getIndex()), [reduce, getIndex])

  const onProgress = useCallback((state) => setReady(state.ready), [])

  return (
    <div className="relative aspect-video w-full">
      <FrameSequence
        urls={WORKSTATION_FRAMES}
        getIndex={getFrame}
        onProgress={onProgress}
        alt="A walnut desk with an ultrawide monitor, mechanical keyboard and office chair, lit in a dark studio."
        className={cn(
          'transition-opacity duration-[var(--duration-slowest)] ease-out-expo',
          ready ? 'opacity-100' : 'opacity-0',
        )}
      />

      <MonitorOverlay active={ready} reduce={reduce} />
    </div>
  )
}
