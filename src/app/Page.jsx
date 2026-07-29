import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { duration, easing } from '@/design-system/tokens'
import { profile } from '@/content'

/**
 * Page — the wrapper every route renders inside.
 *
 * Owns the two things that stop being automatic the moment a site becomes
 * multi-page:
 *
 * 1. The document title. On one long page the title is set once in `index.html`
 *    and never changes. Across routes it has to track the route, or every tab,
 *    bookmark and history entry says the same thing.
 * 2. The entrance. Without it a route change is an instant repaint, which reads
 *    as a flicker rather than as navigation. Deliberately short and small —
 *    this fires on every single navigation, so anything more elaborate would
 *    wear out within a minute of browsing.
 *
 * The transform is dropped under reduced motion by the `MotionConfig` in
 * `AppProviders`; the fade survives, which is enough to signal the change.
 */
export function Page({ title, children }) {
  useEffect(() => {
    document.title = title ? `${title} — ${profile.name}` : `${profile.name} — ${profile.role}`
  }, [title])

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: duration.slow, ease: easing.outExpo }}
    >
      {children}
    </motion.div>
  )
}
