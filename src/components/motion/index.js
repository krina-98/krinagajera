/**
 * Public barrel for the motion layer.
 * Import from here: `import { Reveal, Stagger } from '@/components/motion'`.
 *
 * These are the only animation primitives the app has. A feature that reaches
 * for `framer-motion` directly is either doing something genuinely one-off
 * (the hero's scroll parallax) or is a missing primitive — check which.
 */
export { Reveal } from './Reveal'
export { Stagger, StaggerItem } from './Stagger'
export { TextReveal } from './TextReveal'
export { TypingText } from './TypingText'
export { Magnetic } from './Magnetic'
export { ScrollProgress } from './ScrollProgress'
export { BackToTop } from './BackToTop'
