import { motion, useReducedMotion } from 'framer-motion'
import { Container, Section } from '@/components/ui'
import { cn } from '@/lib/cn'
import { HeroIntro } from './HeroIntro'
import { HeroMeta } from './HeroMeta'
import { heroMotion } from './motion'

/**
 * A single warm wash behind the object side of the composition — the light the
 * 3D piece will eventually sit in. One source, low alpha, no second gradient:
 * `base.css` already lays an ambient glow across the page.
 */
function HeroLight() {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute -z-10 aspect-square w-[70%] rounded-full blur-3xl',
        'top-1/2 -right-[15%] -translate-y-1/2',
        'bg-[radial-gradient(circle,var(--color-glow),transparent_70%)]',
      )}
    />
  )
}

/**
 * Hero — the portfolio's opening statement.
 *
 * Asymmetric by construction: the reading side takes six columns, the object
 * side five, and the twelfth is left empty on purpose. The stage sits a beat
 * lower than the headline so the two sides balance by weight rather than by
 * matching their top edges.
 *
 * Composed entirely from locked primitives — `Section` sets the rhythm,
 * `Container` sets the measure, typography sets the hierarchy. This file adds
 * placement and choreography, nothing else.
 */
export function Hero() {
  const reduce = useReducedMotion()
  const { group, rise } = heroMotion(reduce)

  return (
    <Section
      fullWidth
      spacing="md"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh flex-col overflow-hidden pt-20"
    >
      <HeroLight />

      <motion.div
        variants={group}
        initial="hidden"
        animate="visible"
        className="flex flex-1 flex-col justify-between gap-10"
      >
        <Container size="wide" className="flex flex-1 items-center">
          <div className="grid w-full grid-cols-1 items-center gap-y-12 lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-5">
              <HeroIntro variants={rise} />
            </div>
          </div>
        </Container>

        <Container size="wide">
          <HeroMeta variants={rise} />
        </Container>
      </motion.div>
    </Section>
  )
}
