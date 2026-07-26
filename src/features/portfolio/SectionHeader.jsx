import { cn } from '@/lib/cn'
import { Eyebrow, Heading, Text } from '@/components/ui'
import { Reveal } from '@/components/motion'

/**
 * SectionHeader — the opening of every portfolio section.
 *
 * Written once so the page's rhythm cannot drift section to section: an accent
 * rule, a kicker, a display heading, and an optional standfirst set opposite it
 * on wide screens. A hairline closes it.
 *
 * Composition of locked primitives only — no typography is invented here.
 *
 * @param {object} props
 * @param {string} props.eyebrow - Accent kicker.
 * @param {string} props.title - Heading text.
 * @param {string} props.id - Id for the heading, so the section can be `aria-labelledby` it.
 * @param {string} [props.lede] - One-paragraph standfirst.
 * @param {string} [props.className]
 */
export function SectionHeader({ eyebrow, title, id, lede, className }) {
  return (
    <div className={cn('border-b border-border pb-10', className)}>
      <Reveal className="flex items-center gap-4">
        <span aria-hidden="true" className="h-px w-10 bg-accent" />
        <Eyebrow as="p">{eyebrow}</Eyebrow>
      </Reveal>

      <div className="mt-8 grid gap-x-10 gap-y-6 lg:grid-cols-12">
        <Reveal delay={60} className="lg:col-span-6">
          <Heading level={2} id={id} size="display-sm">
            {title}
          </Heading>
        </Reveal>

        {lede && (
          <Reveal delay={120} className="lg:col-span-5 lg:col-start-8 lg:self-end">
            <Text size="lg" variant="secondary">
              {lede}
            </Text>
          </Reveal>
        )}
      </div>
    </div>
  )
}
