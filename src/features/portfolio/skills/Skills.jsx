import { Heading, Section, Text } from '@/components/ui'
import { Reveal } from '@/components/motion'
import { technologyGroups } from '@/content'
import { SectionHeader } from '../SectionHeader'

/**
 * Skills — the stack, grouped, with the note that a logo grid never carries.
 *
 * Each entry says how the tool is actually used on the four products. That is
 * the whole reason this is a list of sentences and not a wall of icons: the
 * useful information is "Zustand — CrickEdge match state, one writer, many
 * subscribers", not the Zustand logo.
 */
export function Skills() {
  return (
    <Section id="skills" spacing="lg" container="wide" aria-labelledby="skills-title">
      <SectionHeader
        id="skills-title"
        eyebrow="Skills"
        title="Chosen per problem, not by habit."
        lede="Nothing here is aspirational. If it is on this page it has shipped in production."
      />

      <div className="mt-16 grid gap-x-10 gap-y-16 md:grid-cols-2">
        {technologyGroups.map((group, index) => (
          <Reveal key={group.id} delay={(index % 2) * 80}>
            <Heading level={3} size="lg" className="font-mono tracking-wider uppercase">
              {group.title}
            </Heading>

            <dl className="mt-6 border-t border-border">
              {group.items.map((item) => (
                <div key={item.name} className="border-b border-border py-4">
                  <dt>
                    <Text as="span" size="sm" weight="medium">
                      {item.name}
                    </Text>
                  </dt>
                  <dd className="mt-1">
                    <Text size="sm" variant="muted" className="max-w-[52ch]">
                      {item.note}
                    </Text>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
