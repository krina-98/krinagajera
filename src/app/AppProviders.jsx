import { MotionConfig } from 'framer-motion'
import { easing } from '@/design-system/tokens'

/**
 * App-wide context. Currently one provider, and it earns its place.
 *
 * `reducedMotion="user"` is the single reduced-motion decision for the entire
 * site: Framer drops every transform, scale and layout animation while keeping
 * opacity, for anyone whose OS asks for less movement. Handling it here rather
 * than per-component means a new animation is accessible by default instead of
 * by remembering — the failure mode of the per-component approach is silent.
 *
 * The default transition sets the house easing, so a component that animates
 * without naming a curve still moves in the site's voice.
 */
export function AppProviders({ children }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ ease: easing.outExpo }}>
      {children}
    </MotionConfig>
  )
}
