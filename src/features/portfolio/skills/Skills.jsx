import { Code, Heading, Section } from '@/components/ui'
import { Reveal, Stagger, StaggerItem } from '@/components/motion'
import { technologyGroups } from '@/content'
import { SectionHeader } from '../SectionHeader'

/**
 * Skills — the stack as four groups of names.
 *
 * Scannable, not readable, and that is the point. Each entry used to carry a
 * sentence on how the tool was actually used; twenty-seven of those made the
 * lightest information on the site into the heaviest block on it. Nobody reads
 * a skills list top to bottom — they scan for the few names they arrived
 * looking for, and prose gets in the way of exactly that.
 *
 * The group label sits in its own column so the eye can drop straight to the
 * right row instead of reading the labels as part of the list.
 */
export function Skills() {
  return (
    <Section id="skills" spacing="lg" container="wide" aria-labelledby="skills-title">
      <SectionHeader
        index="02"
        id="skills-title"
        eyebrow="Skills"
        title={['What I work with.']}
        lede="Grouped by what each one is for. Everything here has shipped in production."
      />

      <div className="mt-10 divide-y divide-border border-y border-border">
        {technologyGroups.map((group, index) => (
          <Reveal key={group.id} delay={index * 0.06}>
            <div className="grid gap-x-10 gap-y-4 py-7 lg:grid-cols-12">
              <div className="lg:col-span-3">
                <Heading
                  level={3}
                  size="base"
                  className="font-mono tracking-wider text-text-muted uppercase"
                >
                  {group.title}
                </Heading>
              </div>

              <Stagger
                as="ul"
                gap={0.03}
                className="flex flex-wrap gap-2 lg:col-span-9"
              >
                {group.items.map((item) => (
                  <StaggerItem as="li" key={item} distance={8}>
                    <Code
                      variant="chip"
                      className="text-xs whitespace-nowrap text-text-secondary
                                 transition-colors duration-[var(--duration-base)] ease-standard
                                 hover:border-border-hover hover:text-accent-hover"
                    >
                      {item}
                    </Code>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
