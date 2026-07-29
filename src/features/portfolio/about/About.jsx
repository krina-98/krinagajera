import { Section, Text } from '@/components/ui'
import { Reveal } from '@/components/motion'
import { about } from '@/content'
import { SectionHeader } from '../SectionHeader'

/**
 * About — the introduction.
 *
 * Short by successive subtraction. It has held, at various points, two
 * paragraphs on state architecture, a ledger of employer and degree and CGPA,
 * and a grid of hobbies. All of it came out, and the page is better for it:
 * everything removed was either said better elsewhere (the architecture
 * writing belongs on Projects, next to what it built) or was filler standing
 * between a reader and the work.
 *
 * What is left is a greeting, one line on what she does, and one line she
 * stands behind. If this page ever grows again it should be because there is
 * something true and specific to add — not to fill the space.
 */
export function About() {
  return (
    <Section id="about" spacing="lg" container="wide" aria-labelledby="about-title">
      <SectionHeader
        index="01"
        id="about-title"
        eyebrow="About"
        title={about.greeting}
        lede={about.lede}
      />

      <Reveal delay={0.15} className="mt-12">
        {/* The accent rule replaces quotation marks as the quoting device — a
            bar of bronze reads as "set apart" without the typographic noise of
            decorative glyphs at display size. */}
        <blockquote className="border-l-2 border-accent pl-6">
          <Text size="xl" className="max-w-[46ch] font-display text-text-secondary italic">
            {about.quote}
          </Text>
        </blockquote>
      </Reveal>
    </Section>
  )
}
