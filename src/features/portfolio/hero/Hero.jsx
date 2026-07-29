import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ActionLink, Container, Heading, Text } from '@/components/ui'
import { Reveal, TypingText } from '@/components/motion'
import { hero, profile } from '@/content'
import deskIllustration from '@/assets/images/krina-desk.webp'

/**
 * Hero — a greeting, the roles, and the illustration.
 *
 * Stripped to four things: who she is, what she does, one way to act on it, and
 * the picture. The availability pill, the role/location line and the descriptive
 * paragraph were all cut — everything they said is still on the page, in About
 * and Contact, where a reader who wants it will actually be looking for it.
 *
 * Two columns from `lg` up. Below that they stack, image last: on a phone the
 * greeting should be the first thing on screen, not a picture to scroll past.
 *
 * Carries `id="top"` so the nav wordmark has a real target.
 */
export function Hero() {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  /**
   * The illustration drifts a little slower than the page, which is what gives
   * the section depth. `MotionConfig reducedMotion="user"` does not reach a
   * motion value bound straight to `style`, so the travel is collapsed by hand.
   */
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const artY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -48])
  const glowY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 110])

  return (
    <section
      id="top"
      ref={ref}
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pt-28 pb-8 sm:pt-32 sm:pb-12"
    >
      <motion.div
        aria-hidden="true"
        style={{ y: glowY }}
        className="pointer-events-none absolute inset-x-0 -top-1/3 -z-10 h-[130%]
                   bg-[radial-gradient(42rem_28rem_at_28%_34%,var(--color-glow),transparent_70%)]"
      />

      <Container size="wide">
        <div className="grid items-center gap-x-12 gap-y-12 lg:grid-cols-12">
          {/* order-1/order-2 controls the stacked mobile sequence; from `lg` the
              grid columns take over and order stops mattering. */}
          <div className="order-1 lg:col-span-7">
            <Reveal>
              <Heading level={1} id="hero-title" size="display-md" className="max-w-[16ch]">
                <span className="block text-text-secondary">{hero.greeting}</span>
                {profile.name}
              </Heading>
            </Reveal>

            {/* Not a heading: it is a rotating label, and putting a cycling
                string in the document outline would make the outline lie. */}
            <Reveal delay={0.35}>
              <Text
                as="p"
                className="mt-5 font-display text-2xl font-semibold text-accent-hover sm:text-3xl"
              >
                <TypingText phrases={hero.roles} />
              </Text>
            </Reveal>

            <Reveal delay={0.55} className="mt-10">
              {/* No `Magnetic` here any more. Pulling the control toward the
                  cursor meant the thing you were aiming at moved while you
                  aimed at it — clever once, irritating every time after. The
                  hover now lives in the `outline` variant instead: the border
                  brightens and a bronze glow raises it half a step, so the
                  button responds without going anywhere. */}
              <ActionLink
                as={Link}
                to={hero.action.to}
                variant="outline"
                size="lg"
                /* Pill. The extra horizontal padding keeps the label off the
                   curve — at `rounded-full` the default `px-7` crowds it. */
                className="rounded-full px-8"
              >
                {hero.action.label}
              </ActionLink>
            </Reveal>
          </div>

          <motion.div style={{ y: artY }} className="order-2 lg:col-span-5">
            <Reveal direction="none" delay={0.25}>
              <img
                src={deskIllustration}
                alt="Illustration of Krina at her desk, writing code on a desktop machine."
                width={1200}
                height={800}
                /* `eager` + high priority: this is the largest element on the
                   first screen, so lazy-loading it would delay the LCP it is
                   responsible for rather than help anything. */
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="w-full rounded-lg"
              />
            </Reveal>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
