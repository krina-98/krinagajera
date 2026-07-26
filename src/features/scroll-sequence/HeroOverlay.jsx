import { cn } from '@/lib/cn'
import { Container, Eyebrow, Heading, Text } from '@/components/ui'
import { profile } from '@/content'
import { beats, heroLede } from '@/content/story'

/**
 * Where copy is allowed to sit.
 *
 * The render composes the desk centre-right and leaves the upper-left roughly
 * empty at every angle in the orbit, so the text column claims that space and
 * nothing else. Capped in `ch` as well as columns: a line of hero type running
 * under the monitor would undo the whole composition.
 */
const column = 'max-w-[34rem] lg:max-w-[38rem]'

/**
 * A beat sits in the same place every time so the reader's eye never has to
 * re-acquire it — only the words cross-fade.
 *
 * `absolute` and stacked: they overlap in time during a cross-fade, and laying
 * them out in flow would make each one push the others around as it appears.
 */
const slot = cn(
  'pointer-events-none absolute inset-x-0 top-0 flex h-full items-start pt-[22vh]',
  'sm:items-center sm:pt-0',
)

/**
 * HeroOverlay — the copy layer above the workstation canvas.
 *
 * Every beat is real DOM text: selectable, translatable, and readable by a
 * screen reader. The canvas carries no information that is not also written
 * here or in the sections below it.
 *
 * The timeline drives these by `data-beat`, so this file owns placement and
 * typography and `timeline.js` owns when. Neither needs to know the other's
 * business beyond the attribute name.
 *
 * @param {object} props
 * @param {boolean} props.staticLayout - Reduced motion: lay the hero out in
 *   normal flow and drop the narrated beats, whose content is repeated in full
 *   by the About and Skills sections.
 */
export function HeroOverlay({ staticLayout }) {
  const hero = (
    <div data-beat="hero" className={column}>
      <Eyebrow as="p">{profile.role}</Eyebrow>

      <Heading level={1} id="hero-name" size="display-lg" className="mt-5">
        {profile.name}
      </Heading>

      <Text size="lg" variant="secondary" className="mt-6 text-balance sm:text-xl">
        {heroLede}
      </Text>

      <Text size="sm" variant="muted" className="mt-4">
        {profile.location} · {profile.availability.status}
      </Text>
    </div>
  )

  if (staticLayout) {
    return (
      <Container size="wide" className="relative z-10 py-[12vh]">
        {hero}
      </Container>
    )
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      {/* A short wash under the text column only. The render is dark but not
          uniformly so, and hero type has to stay legible across 192 frames. */}
      <div
        aria-hidden="true"
        className={cn(
          'absolute inset-y-0 left-0 w-full lg:w-[58%]',
          'bg-[linear-gradient(100deg,var(--color-bg)_0%,rgba(13,12,10,0.72)_38%,transparent_100%)]',
        )}
      />

      <div className={slot}>
        <Container size="wide">{hero}</Container>
      </div>

      {beats.map((beat) => (
        <div key={beat.id} className={slot}>
          <Container size="wide">
            <div data-beat={beat.id} className={cn(column, 'invisible opacity-0')}>
              <Eyebrow as="p">{beat.eyebrow}</Eyebrow>
              <Text size="xl" className="mt-5 text-balance sm:text-2xl sm:leading-snug">
                {beat.line}
              </Text>
            </div>
          </Container>
        </div>
      ))}

      <ScrollCue />
    </div>
  )
}

/**
 * The scroll hint. A hairline that travels, not an animated chevron — the page
 * is about restraint and this is the first motion anyone sees.
 */
function ScrollCue() {
  return (
    <div
      data-scroll-cue
      className="pointer-events-none absolute inset-x-0 bottom-0 pb-[max(1.5rem,env(safe-area-inset-bottom))]"
    >
      <Container size="wide" className="flex items-center gap-4">
        <span
          aria-hidden="true"
          className={cn(
            'relative h-10 w-px overflow-hidden bg-border',
            'motion-safe:after:absolute motion-safe:after:inset-x-0 motion-safe:after:top-0',
            'motion-safe:after:h-1/2 motion-safe:after:bg-accent-hover',
            'motion-safe:after:animate-[scroll-cue_2.4s_var(--ease-in-out-quart)_infinite]',
          )}
        />
        <Eyebrow as="p">Scroll to explore</Eyebrow>
      </Container>
    </div>
  )
}
