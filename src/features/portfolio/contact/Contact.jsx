import { cn } from '@/lib/cn'
import { Code, DownloadIcon, Eyebrow, Heading, Section, Text, iconsByName } from '@/components/ui'
import { Reveal, Stagger, StaggerItem, TextReveal } from '@/components/motion'
import { profile } from '@/content'

const linkStyles = cn(
  'group inline-flex items-baseline gap-3 rounded-sm',
  'transition-colors duration-[var(--duration-base)] ease-standard',
  'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-hover',
)

/**
 * The icon links. Circular, bordered, and 48px — comfortably over the 44px
 * minimum touch target, which matters more here than anywhere else on the site
 * because an icon has no text to widen its hit area.
 */
const iconLinkStyles = cn(
  'grid size-12 place-items-center rounded-full border border-border text-text-secondary',
  'transition-[background-color,border-color,color,box-shadow,transform]',
  'duration-[var(--duration-base)] ease-standard',
  'hover:border-accent-hover hover:bg-card hover:text-accent-hover hover:shadow-glow',
  'motion-safe:hover:-translate-y-0.5',
  'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-hover',
)

/**
 * Contact — the closing address.
 *
 * Real links rather than a form. The audience already writes email for a
 * living, and a form only adds a step, a spam vector, and a way to lose the
 * message. Every route out of the page is a plain anchor.
 *
 * Email and LinkedIn are the only two routes offered. A phone number on a
 * public page gets scraped, and unlike an address it cannot quietly be changed
 * once it starts attracting calls — see the note in `content/profile.js`.
 */
export function Contact() {
  return (
    <Section id="contact" spacing="lg" container="wide" aria-labelledby="contact-title">
      <Reveal className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <span aria-hidden="true" className="size-1.5 rounded-full bg-accent-hover" />
        <Eyebrow as="p">{profile.availability.status}</Eyebrow>
        <Code className="text-text-muted">{profile.availability.detail}</Code>
      </Reveal>

      <div className="mt-10 grid gap-x-10 gap-y-10 sm:mt-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Heading level={2} id="contact-title" size="display-md">
            <TextReveal lines={['Let’s talk about what', 'your interface has to', 'keep up with.']} />
          </Heading>

          <Reveal delay={0.35}>
            <Text size="lg" variant="secondary" className="mt-8 max-w-[52ch]">
              The useful first message is short: what the interface does today, and what it is
              stopping you from doing.
            </Text>
          </Reveal>

          <Reveal delay={0.45} className="mt-10">
            <a href={`mailto:${profile.email}`} className={cn(linkStyles, 'flex-wrap')}>
              <Text
                as="span"
                weight="medium"
                className={cn(
                  // Sized fluidly rather than from the body scale: this is the
                  // page's final call to action and it has to hold the column
                  // without wrapping the address awkwardly on a narrow screen.
                  'text-[clamp(1.375rem,1rem+1.8vw,2.25rem)] leading-tight break-all text-accent-hover',
                  'underline decoration-transparent decoration-1 underline-offset-8',
                  'transition-[text-decoration-color] duration-[var(--duration-slow)] ease-standard',
                  'group-hover:decoration-accent-hover',
                )}
              >
                {profile.email}
              </Text>
            </a>
          </Reveal>
        </div>

        <div className="lg:col-span-4 lg:col-start-9">
          <Reveal direction="in" delay={0.2}>
            <Text as="h3" size="xs" variant="muted" className="font-mono tracking-wider uppercase">
              Elsewhere
            </Text>
          </Reveal>

          <Stagger as="ul" gap={0.08} delay={0.3} className="mt-6 flex flex-wrap gap-3">
            {profile.links.map((link) => {
              const Icon = iconsByName[link.icon]

              return (
                <StaggerItem as="li" key={link.label} distance={12}>
                  <a
                    href={link.href}
                    {...(link.href.startsWith('http')
                      ? { target: '_blank', rel: 'noreferrer noopener' }
                      : {})}
                    /* The label AND the handle: an icon on its own tells a
                       screen-reader user nothing, and "GitHub" alone does not
                       say which GitHub. `title` gives sighted users the same
                       information on hover. */
                    aria-label={`${link.label} — ${link.handle}`}
                    title={`${link.label} — ${link.handle}`}
                    className={iconLinkStyles}
                  >
                    <Icon className="size-5" />
                  </a>
                </StaggerItem>
              )
            })}

            {/* Rendered only once `profile.resume` points at a real file. */}
            {profile.resume && (
              <StaggerItem as="li" distance={12}>
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Résumé — opens the PDF in a new tab"
                  title="Résumé (PDF)"
                  className={iconLinkStyles}
                >
                  <DownloadIcon className="size-5" />
                </a>
              </StaggerItem>
            )}
          </Stagger>

          <Reveal delay={0.5}>
            <dl className="mt-8 flex items-baseline justify-between gap-4">
              <dt>
                <Text
                  as="span"
                  size="xs"
                  variant="muted"
                  className="font-mono tracking-wider uppercase"
                >
                  Based in
                </Text>
              </dt>
              <dd>
                <Text as="span" size="sm" variant="secondary">
                  {profile.location}
                </Text>
              </dd>
            </dl>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
