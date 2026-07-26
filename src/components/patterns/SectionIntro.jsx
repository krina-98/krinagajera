import { cn } from '@/lib/cn'
import { Code, Eyebrow, Heading, Text } from '@/components/ui'
import { RevealItem } from './Reveal'

/**
 * SectionIntro — the opening of every section: kicker, heading, optional lede,
 * closed by a hairline.
 *
 * Written once so the page's section rhythm cannot drift. Composition of locked
 * primitives only — it introduces no typography of its own.
 *
 * @param {object} props
 * @param {string} props.eyebrow - Accent kicker.
 * @param {string} props.title - Section heading text.
 * @param {string} props.id - Id for the heading, so the section can be `aria-labelledby` it.
 * @param {string} [props.lede] - One-paragraph standfirst.
 * @param {string} [props.marker] - Mono index shown opposite the kicker (e.g. "04 / 11").
 * @param {string} [props.className] - Extra classes, merged last.
 */
export function SectionIntro({ eyebrow, title, id, lede, marker, className }) {
  return (
    <div className={cn('border-b border-border pb-10', className)}>
      <RevealItem className="flex items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <span aria-hidden="true" className="h-px w-10 bg-accent" />
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
        {marker && <Code className="text-text-muted">{marker}</Code>}
      </RevealItem>

      <div className="mt-8 grid gap-x-8 gap-y-6 lg:grid-cols-12">
        <RevealItem className="lg:col-span-6">
          <Heading level={2} id={id} size="display-sm">
            {title}
          </Heading>
        </RevealItem>

        {lede && (
          <RevealItem className="lg:col-span-5 lg:col-start-8 lg:self-end">
            <Text size="lg" variant="secondary">
              {lede}
            </Text>
          </RevealItem>
        )}
      </div>
    </div>
  )
}
