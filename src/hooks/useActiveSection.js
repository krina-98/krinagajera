import { useEffect, useState } from 'react'

/**
 * Which section the reader is currently in, for nav highlighting.
 *
 * Uses a band across the upper third of the viewport rather than element
 * visibility: with sections this tall, several are on screen at once, and the
 * one under the reader's eye is the one that should be marked — not whichever
 * happens to be most visible.
 *
 * @param {Array<{id: string}>} items - Sections in document order.
 * @returns {string|null} The active section id.
 */
export function useActiveSection(items) {
  const [active, setActive] = useState(null)

  useEffect(() => {
    const elements = items
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-25% 0px -70% 0px' },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [items])

  return active
}
