import { cn } from '@/lib/cn'
import { Code, Heading, Section, Text } from '@/components/ui'
import { Reveal, Stagger, StaggerItem } from '@/components/motion'
import { projects } from '@/content'
import { usePointerGlow } from '@/hooks'
import { SectionHeader } from '../SectionHeader'

/**
 * Projects — the four products, each as a problem and what she did about it.
 *
 * No screenshots and no cards. The products are internal, and the interesting
 * part is the reasoning, so the layout gives the prose the room a card would
 * have spent on a border. (A card grid was considered and dropped for exactly
 * one reason: a card is mostly image, and there are no shareable screenshots of
 * software nobody outside the company can log into. Empty cards would look
 * worse than no cards.)
 *
 * The identity rail sticks while its argument scrolls past. That is the point:
 * by the third paragraph of "Approach" the reader has usually forgotten which
 * of the four they are reading about, and a sticky index answers it without
 * them having to scroll back.
 */
export function Projects() {
  return (
    <Section id="projects" spacing="lg" container="wide" aria-labelledby="projects-title">
      <SectionHeader
        index="03"
        id="projects-title"
        eyebrow="Projects"
        title={['My recent work.']}
        lede="Here are a few of the projects I’ve worked on recently."
      />

      <div className="mt-10">
        {projects.map((project) => (
          <Project key={project.id} project={project} />
        ))}
      </div>
    </Section>
  )
}

function Project({ project }) {
  const { ref, onPointerMove } = usePointerGlow()

  return (
    <Reveal
      as="article"
      ref={ref}
      onPointerMove={onPointerMove}
      className={cn(
        'pointer-glow border-t border-border py-10 last:border-b sm:py-12',
        // Negative gutter then equal padding: the glow bleeds past the text
        // measure so it reads as light on the surface, not as a highlighted box.
        // The margin is written as an explicit calc because the minus sign has
        // to land inside it; a negated arbitrary utility emits an invalid
        // `-var(…)`. (Spelling that broken class out here is not an option —
        // Tailwind scans comments too, and would generate the broken rule.)
        'mx-[calc(var(--spacing-gutter)*-1)] px-[var(--spacing-gutter)]',
      )}
    >
      <div className="grid gap-x-10 gap-y-10 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <div className="lg:sticky lg:top-28">
            <Code className="text-3xl text-accent-hover/40 tabular-nums sm:text-4xl">
              {project.index}
            </Code>

            <Heading level={3} size="2xl" className="mt-3">
              {project.name}
            </Heading>

            <Text size="sm" variant="muted" className="mt-2">
              {project.kind}
            </Text>

            <Text
              size="xs"
              variant="muted"
              className="mt-6 font-mono tracking-wider uppercase"
            >
              {project.role} · {project.year}
            </Text>

            <ul className="mt-6 flex flex-wrap gap-1.5">
              {project.stack.map((tool) => (
                <li key={tool}>
                  <Code variant="chip" className="text-xs whitespace-nowrap text-text-secondary">
                    {tool}
                  </Code>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-8 lg:col-start-5">
          <Text size="xl" className="max-w-[54ch] text-balance">
            {project.summary}
          </Text>

          <dl className="mt-8 grid gap-8 sm:mt-10 sm:grid-cols-2 sm:gap-10">
            <Detail term="The problem">{project.problem}</Detail>
            <Detail term="What I did">{project.solution}</Detail>
          </dl>

          <Stagger
            as="ul"
            gap={0.09}
            className="mt-10 grid gap-8 border-t border-border pt-8 sm:grid-cols-3"
          >
            {project.metrics.map((metric) => (
              <StaggerItem as="li" key={metric.label} distance={14}>
                <Text
                  as="span"
                  className="block font-display text-2xl text-accent-hover tabular-nums"
                >
                  {metric.value}
                </Text>
                <Text size="xs" variant="muted" className="mt-1.5">
                  {metric.label}
                </Text>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </Reveal>
  )
}

function Detail({ term, children }) {
  return (
    <div>
      <dt>
        <Text as="span" size="xs" variant="muted" className="font-mono tracking-wider uppercase">
          {term}
        </Text>
      </dt>
      <dd className="mt-3">
        <Text size="sm" variant="secondary" className="max-w-[52ch]">
          {children}
        </Text>
      </dd>
    </div>
  )
}
