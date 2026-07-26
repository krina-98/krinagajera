import { motion } from 'framer-motion'
import { Button, Eyebrow, Heading, Text } from '@/components/ui'
import { profile } from '@/content'

/** In-page navigation. Global `scroll-behavior` (base.css) supplies the easing
 *  and already honours reduced motion, so no options are passed here. */
function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView()
}

function ArrowRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12h13m0 0-5-5m5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/**
 * HeroIntro — the reading side of the composition.
 *
 * Renders as a fragment: the grid column that positions it belongs to `Hero`,
 * so this component owns hierarchy and rhythm only, never placement.
 *
 * @param {object} props
 * @param {import('framer-motion').Variants} props.variants - Per-item reveal, staggered by the hero root.
 */
export function HeroIntro({ variants }) {
  return (
    <>
      <motion.div variants={variants} className="flex items-center gap-4">
        <span aria-hidden="true" className="h-px w-10 bg-accent" />
        <Eyebrow>
          {profile.name} — {profile.role}
        </Eyebrow>
      </motion.div>

      <motion.div variants={variants} className="mt-8">
        <Heading level={1} id="hero-title" size="display-md">
          I build interfaces that <span className="text-accent-hover">keep moving</span>.
        </Heading>
      </motion.div>

      <motion.div variants={variants} className="mt-8">
        <Text size="lg" variant="secondary">
          Frontend developer in Surat, working in React, Next.js and TypeScript. Most of what I
          ship updates while you are looking at it — live match commentary over a socket, agent
          responses streaming token by token, extraction jobs that finish whenever they finish.
        </Text>
      </motion.div>

      <motion.div variants={variants} className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-5">
        <Button size="lg" rightIcon={<ArrowRight />} onClick={() => scrollTo('work')}>
          See the work
        </Button>
        <Button variant="text" size="lg" onClick={() => scrollTo('contact')}>
          Get in touch
        </Button>
      </motion.div>
    </>
  )
}
