import { useCallback, useRef } from 'react'

/**
 * A warm wash that tracks the cursor across a surface.
 *
 * Writes the pointer position straight to CSS custom properties on the element,
 * so the gradient follows at compositor speed and React never re-renders. The
 * consuming element reads `--pointer-x` / `--pointer-y` and toggles the wash on
 * its own `:hover`, which keeps the effect off touch devices for free.
 *
 * @returns {{ref: React.RefObject<HTMLElement>, onPointerMove: (event: React.PointerEvent) => void}}
 */
export function usePointerGlow() {
  const ref = useRef(null)

  const onPointerMove = useCallback((event) => {
    const el = ref.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    el.style.setProperty('--pointer-x', `${event.clientX - rect.left}px`)
    el.style.setProperty('--pointer-y', `${event.clientY - rect.top}px`)
  }, [])

  return { ref, onPointerMove }
}
