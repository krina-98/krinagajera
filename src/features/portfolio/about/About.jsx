import { Section, Text } from '@/components/ui'
import { Reveal } from '@/components/motion'
import { about } from '@/content'
import { SectionHeader } from '../SectionHeader'

/**
 * About — the introduction, in her own words.
 *
 * Two columns on wide screens: the prose keeps a readable measure on the left
 * while the facts sit apart on the right as a scannable ledger, so a recruiter
 * skimming and a reader reading are served by the same block.
 */
export function About() {
  return (
    <Section id="about" spacing="lg" container="wide" aria-labelledby="about-title">
      <SectionHeader
        id="about-title"
        eyebrow="About"
        title={about.lede}
        lede="Frontend developer, Surat. Real-time interfaces, state architecture, and the parts that are easy to skip."
      />

      <div className="mt-16 grid gap-x-10 gap-y-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          {about.body.map((paragraph, index) => (
            <Reveal key={paragraph.slice(0, 32)} delay={index * 60}>
              <Text size="lg" variant="secondary" className="max-w-[62ch] not-first:mt-6">
                {paragraph}
              </Text>
            </Reveal>
          ))}
        </div>

        <div className="lg:col-span-4 lg:col-start-9">
          <Reveal as="dl" className="grid gap-px bg-border">
            {about.facts.map((fact) => (
              <div key={fact.label} className="bg-bg py-5">
                <dt>
                  <Text as="span" size="xs" variant="muted" className="font-mono tracking-wider uppercase">
                    {fact.label}
                  </Text>
                </dt>
                <dd className="mt-2">
                  <Text size="sm">{fact.value}</Text>
                </dd>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
