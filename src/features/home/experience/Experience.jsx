import { cn } from '@/lib/cn'
import { Code, Heading, Section, Text } from '@/components/ui'
import { anchorOffset, Reveal, RevealItem, SectionIntro } from '@/components/patterns'
import { experience } from '@/content'

/**
 * One post on the rail. The marker sits on the hairline rather than beside it,
 * so the column reads as a single continuous line with stops on it.
 */
function Entry({ entry, isLast }) {
  return (
    <RevealItem as="li" className="group relative grid gap-x-8 gap-y-4 lg:grid-cols-12">
      <div className="lg:col-span-3">
        <Code className="text-accent-hover">{entry.period}</Code>
      </div>

      <div
        className={cn(
          'relative lg:col-span-9 lg:pl-10',
          // The rail runs from just under this stop to the next one. The last
          // entry has nothing below it, so it draws no rail.
          !isLast &&
            'lg:before:absolute lg:before:top-3 lg:before:bottom-0 lg:before:left-0 lg:before:w-px lg:before:bg-border',
        )}
      >
        {/* Centred on the rail: the marker is 6px, the rail sits at x=0..1px. */}
        <span
          aria-hidden="true"
          className={cn(
            'absolute top-1.5 -left-[2.5px] hidden size-1.5 rounded-full bg-accent-dark lg:block',
            'transition-colors duration-[var(--duration-base)] ease-standard',
            'group-hover:bg-accent-hover',
          )}
        />

        <Heading level={3} size="2xl">
          {entry.role}
        </Heading>

        <div className="mt-2 flex flex-wrap items-baseline gap-x-3">
          <Text variant="accent" weight="medium">
            {entry.company}
          </Text>
          <Text size="sm" variant="muted">
            {entry.context}
          </Text>
        </div>

        <ul className={cn('mt-5 flex flex-col gap-2.5', isLast ? 'pb-0' : 'pb-12')}>
          {entry.notes.map((note) => (
            <li key={note} className="flex gap-3">
              <span aria-hidden="true" className="mt-2.5 size-1 shrink-0 rounded-full bg-border-hover" />
              <Text size="sm" variant="secondary">
                {note}
              </Text>
            </li>
          ))}
        </ul>
      </div>
    </RevealItem>
  )
}

export function Experience() {
  return (
    <Section
      id="experience"
      spacing="xl"
      container="wide"
      className={anchorOffset}
      aria-labelledby="experience-title"
    >
      <Reveal>
        <SectionIntro
          eyebrow="Experience"
          title="Eight years, mostly on the same problem."
          id="experience-title"
          marker="03 — 04"
          lede="Agency, startup, scale-up, independent. The through-line is interfaces that had to keep working after the people who built them moved on."
        />
      </Reveal>

      <Reveal>
        <ol className="mt-16 flex flex-col">
          {experience.map((entry, i) => (
            <Entry key={entry.id} entry={entry} isLast={i === experience.length - 1} />
          ))}
        </ol>
      </Reveal>
    </Section>
  )
}
