import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Code, Heading, Section, Text } from '@/components/ui'
import { Reveal, Stagger, StaggerItem } from '@/components/motion'
import { experience } from '@/content'
import { SectionHeader } from '../SectionHeader'

/** Damped just enough that the spine trails the scroll instead of tracking it exactly. */
const SPINE_SPRING = { stiffness: 140, damping: 30, restDelta: 0.001 }

/**
 * Experience — roles and study, on a spine that draws as you read down it.
 *
 * The spine is the section's whole idea: it turns two entries into a single
 * continuous span of time rather than two unrelated blocks. Bronze fills the
 * hairline in step with the scroll, so how far down the line you are is how far
 * through the history you are.
 *
 * Note the difference from the hero's parallax. That moved content at a rate
 * the reader did not ask for, so it is disabled under reduced motion. This maps
 * one-to-one onto scroll position — it is a position indicator, like a
 * scrollbar, and nothing happens that the reader did not directly cause.
 */
export function Experience() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const scaleY = useSpring(scrollYProgress, SPINE_SPRING)

  return (
    <Section id="experience" spacing="lg" container="wide" aria-labelledby="experience-title">
      <SectionHeader
        index="02"
        id="experience-title"
        eyebrow="Experience"
        title={['Where the work', 'happened.']}
        lede="A year and a half at one company, four products, and the degree that ran alongside the first of them."
      />

      <div ref={ref} className="relative mt-10 pl-7 sm:pl-12">
        {/* The unfilled track. */}
        <span aria-hidden="true" className="absolute top-2 bottom-2 left-0 w-px bg-border" />
        {/* The filled length. Separate element so the track stays visible behind it. */}
        <motion.span
          aria-hidden="true"
          style={{ scaleY }}
          className="absolute top-2 bottom-2 left-0 w-px origin-top bg-accent-hover"
        />

        <ol>
          {experience.map((entry) => (
            <li key={entry.id} className="relative not-first:mt-12">
              {/* The node, pulled back onto the spine. Sized to cover the line
                  so the spine appears to pass behind it rather than through it. */}
              <span
                aria-hidden="true"
                className="absolute top-2 -left-7 size-2 -translate-x-1/2 rounded-full
                           bg-accent-hover ring-4 ring-bg sm:-left-12"
              />

              <Reveal as="article" className="grid gap-x-10 gap-y-6 lg:grid-cols-12">
                <div className="lg:col-span-3">
                  <Code className="text-text-muted">{entry.period}</Code>
                </div>

                <div className="lg:col-span-9">
                  <Heading level={3} size="2xl">
                    {entry.role}
                  </Heading>

                  <Text variant="accent" className="mt-2 font-medium">
                    {entry.company}
                  </Text>

                  <Text size="sm" variant="muted" className="mt-3 max-w-[60ch]">
                    {entry.context}
                  </Text>

                  <Stagger as="ul" gap={0.07} className="mt-7 grid gap-3">
                    {entry.notes.map((note) => (
                      <StaggerItem as="li" key={note} distance={12} className="flex gap-4">
                        <span
                          aria-hidden="true"
                          className="mt-2.5 h-px w-4 shrink-0 bg-accent-dark"
                        />
                        <Text size="sm" variant="secondary" className="max-w-[64ch]">
                          {note}
                        </Text>
                      </StaggerItem>
                    ))}
                  </Stagger>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
