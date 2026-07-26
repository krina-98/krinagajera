import { Code, Heading, Section, Text } from '@/components/ui'
import { Reveal } from '@/components/motion'
import { experience } from '@/content'
import { SectionHeader } from '../SectionHeader'

/**
 * Experience — roles and study, as a ledger rather than a timeline.
 *
 * No connecting spine, no dots: with two entries a decorated timeline is
 * costume. A hairline per row and the period set apart in mono does the same
 * job and stays legible when the list grows.
 */
export function Experience() {
  return (
    <Section id="experience" spacing="lg" container="wide" aria-labelledby="experience-title">
      <SectionHeader
        id="experience-title"
        eyebrow="Experience"
        title="Where the work happened."
        lede="A year and a half at one company, four products, and the degree that ran alongside the first of them."
      />

      <ol className="mt-16">
        {experience.map((entry, index) => (
          <li key={entry.id}>
            <Reveal
              as="article"
              delay={index * 80}
              className="grid gap-x-10 gap-y-6 border-b border-border py-10 first:pt-0 lg:grid-cols-12"
            >
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

                <ul className="mt-7 grid gap-3">
                  {entry.notes.map((note) => (
                    <li key={note} className="flex gap-4">
                      <span
                        aria-hidden="true"
                        className="mt-2.5 h-px w-4 shrink-0 bg-accent-dark"
                      />
                      <Text size="sm" variant="secondary" className="max-w-[64ch]">
                        {note}
                      </Text>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  )
}
