import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'
import { Code, Eyebrow, Heading, Text } from '@/components/ui'
import { Reveal, TextReveal } from '@/components/motion'
import { drawLine, viewport } from '@/design-system/motion'

/**
 * SectionHeader — the opening of every section below the hero.
 *
 * Written once so the page's rhythm cannot drift section to section: an index,
 * a kicker, a rule that draws itself across the full measure, a display heading
 * that rises out of a mask, and an optional standfirst set opposite it.
 *
 * The index numerals are the thread between the pages. Now that each section is
 * its own route they are the main thing saying these are chapters of one body
 * of work rather than five unrelated screens — which matters more, not less,
 * once the reader can no longer see them stacked.
 *
 * Composition of locked primitives only; no typography is invented here.
 *
 * @param {object} props
 * @param {string} props.index - Two-digit position, e.g. `'01'`.
 * @param {string} props.eyebrow - Accent kicker.
 * @param {string|string[]} props.title - Heading text. An array sets the line
 *   breaks explicitly, which is what the masked reveal animates against.
 * @param {string} props.id - Id for the heading, so the section can be `aria-labelledby` it.
 * @param {string} [props.lede] - One-paragraph standfirst.
 * @param {string} [props.className]
 */
export function SectionHeader({ index, eyebrow, title, id, lede, className }) {
  return (
    <div className={cn('relative', className)}>
      <Reveal className="flex items-center gap-4">
        <Code className="text-accent-hover">{index}</Code>
        <Eyebrow as="p">{eyebrow}</Eyebrow>
      </Reveal>

      {/* Draws left to right as the section arrives. `origin-left` is set here
          rather than in the variant because an underline and a timeline spine
          want different origins from the same `drawLine`. */}
      <motion.span
        aria-hidden="true"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={drawLine}
        className="mt-5 block h-px origin-left bg-border"
      />

      <div className="mt-7 grid gap-x-10 gap-y-5 sm:gap-y-6 lg:grid-cols-12">
        <div className="lg:col-span-6">
          {/* `semibold`, against the display default of `bold`. Bold is right
              for one h1 at the top of the page; repeated across five section
              titles it stops reading as emphasis and starts reading as weight. */}
          <Heading level={2} id={id} size="display-sm" weight="semibold">
            <TextReveal lines={title} delay={0.1} />
          </Heading>
        </div>

        {lede && (
          <Reveal delay={0.2} className="lg:col-span-5 lg:col-start-8 lg:self-end">
            <Text size="lg" variant="secondary">
              {lede}
            </Text>
          </Reveal>
        )}
      </div>
    </div>
  )
}
