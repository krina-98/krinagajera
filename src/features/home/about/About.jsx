import { Code, Heading, Section, Text } from '@/components/ui'
import { anchorOffset, Reveal, RevealItem, SectionIntro } from '@/components/patterns'
import { about, profile } from '@/content'

export function About() {
  return (
    <Section
      id="about"
      spacing="xl"
      container="wide"
      className={anchorOffset}
      aria-labelledby="about-title"
    >
      <Reveal>
        <SectionIntro
          eyebrow="About"
          title="Design first, then engineering — in that order, and on purpose."
          id="about-title"
          marker="07 — 01"
        />
      </Reveal>

      <Reveal>
        <div className="mt-16 grid gap-x-8 gap-y-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <RevealItem>
              {/* Display type on a non-heading — see the note in Testimonials. */}
              <p className="font-display text-xl leading-snug text-balance text-text">
                {about.lede}
              </p>
            </RevealItem>

            <div className="mt-8 flex flex-col gap-6">
              {about.body.map((paragraph) => (
                <RevealItem key={paragraph.slice(0, 32)}>
                  <Text variant="secondary">{paragraph}</Text>
                </RevealItem>
              ))}
            </div>
          </div>

          <RevealItem className="lg:col-span-4 lg:col-start-9">
            <dl className="flex flex-col">
              {about.facts.map((fact) => (
                <div key={fact.label} className="border-t border-border py-5">
                  <dt>
                    <Code className="text-text-muted">{fact.label}</Code>
                  </dt>
                  <dd className="mt-2">
                    <Text size="sm">{fact.value}</Text>
                  </dd>
                </div>
              ))}

              <div className="border-t border-border py-5">
                <dt>
                  <Code className="text-text-muted">Based</Code>
                </dt>
                <dd className="mt-2">
                  <Text size="sm">{profile.location}</Text>
                </dd>
              </div>
            </dl>

            <div className="mt-6 border-t border-border pt-6">
              <Heading level={3} size="lg">
                {profile.availability.status}
              </Heading>
              <Text size="sm" variant="muted" className="mt-2">
                {profile.availability.detail} Next opening {profile.availability.from}.
              </Text>
            </div>
          </RevealItem>
        </div>
      </Reveal>
    </Section>
  )
}
