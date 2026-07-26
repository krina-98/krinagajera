import { cn } from '@/lib/cn'
import { Code, Heading, Section, Text } from '@/components/ui'
import { anchorOffset, Reveal, RevealItem, SectionIntro } from '@/components/patterns'
import { technologyGroups } from '@/content'

/**
 * A tool card. No logo: a wordmark grid says what you have installed, whereas
 * the note says what you actually do with it — which is the part worth reading.
 */
function Tool({ tool }) {
  return (
    <li
      className={cn(
        'group flex flex-col gap-2 rounded-md border border-border bg-card p-5',
        'transition-[border-color,background-color,transform] duration-[var(--duration-base)] ease-standard',
        'hover:border-border-hover hover:bg-card-hover',
        'motion-safe:hover:-translate-y-0.5',
      )}
    >
      <div className="flex items-baseline justify-between gap-3">
        <Heading level={4} size="base">
          {tool.name}
        </Heading>
        <Code className="text-text-muted">{tool.since}</Code>
      </div>

      <Text size="sm" variant="muted">
        {tool.note}
      </Text>
    </li>
  )
}

function Group({ group }) {
  return (
    <RevealItem className="grid gap-x-8 gap-y-6 lg:grid-cols-12">
      <div className="lg:col-span-3">
        <Heading level={3} size="lg">
          {group.title}
        </Heading>
      </div>

      <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-9 xl:grid-cols-4">
        {group.items.map((tool) => (
          <Tool key={tool.name} tool={tool} />
        ))}
      </ul>
    </RevealItem>
  )
}

export function Tech() {
  return (
    <Section
      id="stack"
      spacing="xl"
      container="wide"
      className={anchorOffset}
      aria-labelledby="stack-title"
    >
      <Reveal>
        <SectionIntro
          eyebrow="Selected technologies"
          title="Tools, and what I use them for."
          id="stack-title"
          marker="05 — 15"
          lede="Every one of these has been in production on something I own. The year is when I started using it in earnest, not when I first tried it."
        />
      </Reveal>

      <Reveal>
        <div className="mt-16 flex flex-col gap-14">
          {technologyGroups.map((group) => (
            <Group key={group.id} group={group} />
          ))}
        </div>
      </Reveal>
    </Section>
  )
}
