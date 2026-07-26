import { useEffect, useRef } from 'react'
import { cn } from '@/lib/cn'

/** Reveal once the block is comfortably on screen, not the moment it grazes it. */
const MARGIN = '0px 0px -12% 0px'

/**
 * Reveal — a one-shot entrance for a block of content as it scrolls in.
 *
 * Deliberately not GSAP: the pinned hero owns ScrollTrigger, and adding dozens
 * of extra triggers for what is a single fade would make every
 * `ScrollTrigger.refresh()` measurably more expensive for no visual gain. An
 * IntersectionObserver and two CSS classes cost nothing and cannot desync from
 * the pin.
 *
 * The transition itself lives in `base.css` under `[data-reveal]`, so the
 * reduced-motion override there applies without this component knowing about
 * it. The observer disconnects after firing — nothing re-hides on scroll up.
 *
 * @param {object} props
 * @param {React.ElementType} [props.as='div'] - Element to render.
 * @param {number} [props.delay=0] - Stagger, in ms. Keep small; this is a fade.
 * @param {string} [props.className]
 */
export function Reveal({ as: Tag = 'div', delay = 0, className, children, ...props }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Without the API the content must still be visible; failing closed here
    // would hide the entire page.
    if (typeof IntersectionObserver === 'undefined') {
      el.dataset.revealed = ''
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        entry.target.dataset.revealed = ''
        observer.disconnect()
      },
      { rootMargin: MARGIN },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      data-reveal=""
      style={delay ? { '--reveal-delay': `${delay}ms` } : undefined}
      className={cn(className)}
      {...props}
    >
      {children}
    </Tag>
  )
}
