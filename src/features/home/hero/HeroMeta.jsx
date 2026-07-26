import { motion, useReducedMotion } from 'framer-motion'
import { easing } from '@/design-system/tokens'
import { cn } from '@/lib/cn'
import { Code, Eyebrow } from '@/components/ui'
import { profile } from '@/content'

const STACK = ['React', 'Next.js', 'TypeScript', 'Tailwind']

/**
 * The scroll cue: a accent filament travelling a hairline track.
 * It has a job — telling the visitor the page continues below the fold — so it
 * earns its loop. Stops entirely under reduced motion, where the static track
 * plus the label still read as an affordance.
 */
function ScrollCue() {
  const reduce = useReducedMotion()

  return (
    <div className="flex items-center gap-3">
      <Eyebrow>Scroll</Eyebrow>
      <span aria-hidden="true" className="relative block h-8 w-px overflow-hidden bg-border">
        {!reduce && (
          <motion.span
            className="absolute inset-x-0 top-0 block h-3 bg-accent-hover"
            initial={{ y: '-100%' }}
            animate={{ y: '800%' }}
            transition={{
              duration: 2.4,
              ease: easing.inOutQuart,
              repeat: Infinity,
              repeatDelay: 0.8,
            }}
          />
        )}
      </span>
    </div>
  )
}

/**
 * HeroMeta — the hairline rail that closes the section.
 *
 * Availability, stack, and the scroll affordance: the three facts a client looks
 * for after the headline lands. Editorial furniture, not decoration.
 *
 * @param {object} props
 * @param {import('framer-motion').Variants} props.variants - Reveal variant, staggered by the hero root.
 */
export function HeroMeta({ variants }) {
  return (
    <motion.div
      variants={variants}
      className={cn(
        'flex flex-col gap-6 border-t border-border pt-6',
        'sm:flex-row sm:items-center sm:justify-between sm:gap-8',
      )}
    >
      <div className="flex items-center gap-3">
        <span aria-hidden="true" className="size-1.5 rounded-full bg-accent-hover" />
        <Eyebrow>{profile.availability.status}</Eyebrow>
        <Code>{profile.location}</Code>
      </div>

      <ul className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {STACK.map((item) => (
          <li key={item} className="flex items-center gap-4">
            <Code>{item}</Code>
            {item !== STACK.at(-1) && (
              <span aria-hidden="true" className="h-px w-4 bg-border" />
            )}
          </li>
        ))}
      </ul>

      <div className="hidden lg:block">
        <ScrollCue />
      </div>
    </motion.div>
  )
}
