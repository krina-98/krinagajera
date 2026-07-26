import { cn } from '@/lib/cn'
import { Code, Heading, Section, Text } from '@/components/ui'
import { anchorOffset, Reveal, RevealItem, SectionIntro } from '@/components/patterns'
import { capabilities } from '@/content'

/**
 * One capability: what it is, why it matters to the person paying, and the
 * evidence. All three are always visible — hiding the payoff behind a hover
 * would make the section unreadable on touch and to a screen reader.
 */
function Capability({ item }) {
  return (
    <RevealItem
      as="li"
      className={cn(
        'group relative flex flex-col gap-4 border-t border-border py-8',
        'transition-colors duration-[var(--duration-base)] ease-standard',
        'hover:border-border-hover',
      )}
    >
      <div className="flex items-baseline gap-4">
        <Code className="text-text-muted">{item.index}</Code>
        <Heading level={3} size="xl">
          {item.title}
        </Heading>
      </div>

      <Text variant="secondary">{item.what}</Text>
      <Text size="sm" variant="muted">
        {item.why}
      </Text>

      <div className="mt-auto flex items-center gap-3 pt-2">
        <span
          aria-hidden="true"
          className={cn(
            'h-px w-6 bg-accent-dark',
            'transition-[width,background-color] duration-[var(--duration-slow)] ease-out-expo',
            'group-hover:w-10 group-hover:bg-accent-hover',
          )}
        />
        <Code className="text-accent-hover">{item.impact}</Code>
      </div>
    </RevealItem>
  )
}

export function Capabilities() {
  return (
    <Section
      id="capabilities"
      spacing="xl"
      container="wide"
      className={anchorOffset}
      aria-labelledby="capabilities-title"
    >
      <Reveal>
        <SectionIntro
          eyebrow="Capabilities"
          title="What I am actually hired to do."
          id="capabilities-title"
          marker="02 — 07"
          lede="Not a list of libraries. These are the seven problems teams keep bringing me, and what changed the last time I solved each one."
        />
      </Reveal>

      <Reveal>
        <ul className="mt-16 grid gap-x-12 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((item) => (
            <Capability key={item.id} item={item} />
          ))}
        </ul>
      </Reveal>
    </Section>
  )
}
