import { cn } from '@/lib/cn'
import { Code, Eyebrow, Heading, Text } from '@/components/ui'
import { Reveal, RevealItem } from '@/components/patterns'
import { usePointerGlow } from '@/hooks'
import { BrowserFrame } from './BrowserFrame'
import { previews } from './previews'

/** Labelled prose block — the case-study voice, used three times per project. */
function Detail({ label, children }) {
  return (
    <div>
      <Eyebrow as="h4">{label}</Eyebrow>
      <Text variant="secondary" className="mt-3">
        {children}
      </Text>
    </div>
  )
}

/**
 * ProjectRow — one case study.
 *
 * Alternates side by side so the page has a rhythm rather than a stack. The
 * preview leads on wide screens and follows the heading on narrow ones, because
 * on mobile the name should arrive before the picture.
 *
 * @param {object} props
 * @param {object} props.project - Entry from `@/content` projects.
 * @param {boolean} props.flipped - Put the preview on the right.
 */
export function ProjectRow({ project, flipped }) {
  const Preview = previews[project.preview]
  const { ref: glowRef, onPointerMove } = usePointerGlow()

  return (
    <Reveal as="article" className="group" aria-labelledby={`project-${project.id}`}>
      <div className="grid items-center gap-x-8 gap-y-10 lg:grid-cols-12">
        <RevealItem
          className={cn(
            'lg:col-span-7',
            flipped ? 'lg:order-2 lg:col-start-6' : 'lg:order-1',
          )}
        >
          <div ref={glowRef} onPointerMove={onPointerMove} className="relative isolate">
            <BrowserFrame url={project.url}>
              <Preview />
            </BrowserFrame>

            {/* Warm wash tracking the cursor — hover-only, so it never appears on touch. */}
            <span
              aria-hidden="true"
              className={cn(
                'pointer-events-none absolute inset-0 -z-10 rounded-lg opacity-0 blur-2xl',
                'transition-opacity duration-[var(--duration-slow)] ease-standard',
                'group-hover:opacity-100',
                'bg-[radial-gradient(320px_circle_at_var(--pointer-x,50%)_var(--pointer-y,50%),var(--color-glow),transparent_70%)]',
              )}
            />
          </div>
        </RevealItem>

        <div
          className={cn(
            'lg:col-span-4',
            flipped ? 'lg:order-1 lg:col-start-1' : 'lg:order-2 lg:col-start-9',
          )}
        >
          <RevealItem className="flex items-center gap-4">
            <Code className="text-text-muted">{project.index}</Code>
            <span aria-hidden="true" className="h-px w-6 bg-border" />
            <Eyebrow>{project.kind}</Eyebrow>
          </RevealItem>

          <RevealItem className="mt-6">
            <Heading level={3} id={`project-${project.id}`} size="4xl">
              {project.name}
            </Heading>
          </RevealItem>

          <RevealItem className="mt-5">
            <Text size="lg" variant="secondary">
              {project.summary}
            </Text>
          </RevealItem>

          <RevealItem className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-6">
            {project.metrics.map((metric) => (
              <div key={metric.label}>
                {/* Display type on a non-heading: `Text` always carries
                    font-sans, and tailwind-merge cannot see the custom family
                    to drop it, so the utilities are written directly here. */}
                <p className="font-display text-xl font-semibold tracking-tight text-accent-hover">
                  {metric.value}
                </p>
                <Text as="p" size="xs" variant="muted" className="mt-1.5">
                  {metric.label}
                </Text>
              </div>
            ))}
          </RevealItem>
        </div>
      </div>

      <div className="mt-14 grid gap-x-8 gap-y-10 border-t border-border pt-10 lg:grid-cols-12">
        <RevealItem className="lg:col-span-4">
          <Detail label="Problem">{project.problem}</Detail>
        </RevealItem>

        <RevealItem className="lg:col-span-4">
          <Detail label="Approach">{project.solution}</Detail>
        </RevealItem>

        <RevealItem className="lg:col-span-3 lg:col-start-10">
          <Eyebrow as="h4">What I built</Eyebrow>
          <ul className="mt-3 flex flex-col gap-3">
            {project.highlights.map((highlight) => (
              <li key={highlight} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-2.5 size-1 shrink-0 rounded-full bg-accent"
                />
                <Text size="sm" variant="secondary">
                  {highlight}
                </Text>
              </li>
            ))}
          </ul>
        </RevealItem>
      </div>

      <RevealItem
        className={cn(
          'mt-10 flex flex-col gap-4 border-t border-border pt-6',
          'sm:flex-row sm:items-baseline sm:justify-between sm:gap-8',
        )}
      >
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <Code>{project.role}</Code>
          <span aria-hidden="true" className="h-px w-4 bg-border" />
          <Code className="text-text-muted">{project.year}</Code>
        </div>

        <ul className="flex flex-wrap items-center gap-2">
          {project.stack.map((tool) => (
            <li key={tool}>
              <Code variant="chip">{tool}</Code>
            </li>
          ))}
        </ul>
      </RevealItem>
    </Reveal>
  )
}
