import { cn } from '@/lib/cn'
import { Code, Heading, Section, Text } from '@/components/ui'
import { Reveal } from '@/components/motion'
import { projects } from '@/content'
import { SectionHeader } from '../SectionHeader'

/**
 * Projects — the four products, each as a problem and what was done about it.
 *
 * No screenshots and no cards. The products are internal and the interesting
 * part is the reasoning, so the layout gives the prose the room a card would
 * have spent on a border: index and metrics in a narrow rail, the argument in a
 * wide column.
 */
export function Projects() {
  return (
    <Section id="projects" spacing="lg" container="wide" aria-labelledby="projects-title">
      <SectionHeader
        id="projects-title"
        eyebrow="Selected projects"
        title="Four products that would not sit still."
        lede="Shipped at Matlab Infotech. Where there is no metric, the entry says what was built rather than implying a result."
      />

      <div className="mt-16">
        {projects.map((project) => (
          <Project key={project.id} project={project} />
        ))}
      </div>
    </Section>
  )
}

function Project({ project }) {
  return (
    <Reveal as="article" className="border-b border-border py-14 first:pt-0">
      <div className="grid gap-x-10 gap-y-8 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <Code className="text-accent-hover">{project.index}</Code>

          <Heading level={3} size="2xl" className="mt-4">
            {project.name}
          </Heading>

          <Text size="sm" variant="muted" className="mt-2">
            {project.kind}
          </Text>

          <Text size="xs" variant="muted" className="mt-6 font-mono tracking-wider uppercase">
            {project.role} · {project.year}
          </Text>
        </div>

        <div className="lg:col-span-8 lg:col-start-5">
          <Text size="lg" className="max-w-[60ch]">
            {project.summary}
          </Text>

          <dl className="mt-10 grid gap-8 sm:grid-cols-2">
            <Detail term="Problem">{project.problem}</Detail>
            <Detail term="Approach">{project.solution}</Detail>
          </dl>

          <ul className="mt-10 grid gap-6 border-t border-border pt-8 sm:grid-cols-3">
            {project.metrics.map((metric) => (
              <li key={metric.label}>
                <Text as="span" size="xl" className="font-display text-accent-hover">
                  {metric.value}
                </Text>
                <Text size="xs" variant="muted" className="mt-1">
                  {metric.label}
                </Text>
              </li>
            ))}
          </ul>

          <ul className="mt-8 flex flex-wrap gap-x-2 gap-y-2">
            {project.stack.map((tool) => (
              <li key={tool}>
                <Code
                  variant="chip"
                  className={cn('text-xs text-text-secondary', 'whitespace-nowrap')}
                >
                  {tool}
                </Code>
              </li>
            ))}
          </ul>
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
