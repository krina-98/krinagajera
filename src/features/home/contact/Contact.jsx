import { cn } from '@/lib/cn'
import { Code, Eyebrow, Heading, Section, Text } from '@/components/ui'
import { anchorOffset, Reveal, RevealItem } from '@/components/patterns'
import { profile } from '@/content'

/**
 * The closing address. A real mailto rather than a form: the audience is people
 * who already write email for a living, and a form only adds a step and a
 * chance to lose the message.
 */
export function Contact() {
  return (
    <Section
      id="contact"
      spacing="xl"
      container="wide"
      className={anchorOffset}
      aria-labelledby="contact-title"
    >
      <Reveal>
        <div className="border-t border-border pt-10">
          <RevealItem className="flex items-center gap-4">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-accent-hover" />
            <Eyebrow>{profile.availability.status}</Eyebrow>
            <Code className="text-text-muted">{profile.availability.from}</Code>
          </RevealItem>

          <div className="mt-10 grid gap-x-8 gap-y-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <RevealItem>
                <Heading level={2} id="contact-title" size="display-md">
                  Tell me what has{' '}
                  <span className="text-accent-hover">stopped scaling</span>.
                </Heading>
              </RevealItem>

              <RevealItem className="mt-8">
                <Text size="lg" variant="secondary">
                  The useful first message is two paragraphs: what the interface does today, and
                  what it is stopping you from doing. I reply to everything within two working
                  days, including the ones I turn down.
                </Text>
              </RevealItem>

              <RevealItem className="mt-10">
                <a
                  href={`mailto:${profile.email}`}
                  className={cn(
                    'group inline-flex items-baseline gap-4 rounded-sm',
                    'font-display text-3xl font-semibold tracking-tight text-text sm:text-4xl',
                    'transition-colors duration-[var(--duration-base)] ease-standard',
                    'hover:text-accent-hover',
                    'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-hover',
                  )}
                >
                  {profile.email}
                  <span
                    aria-hidden="true"
                    className={cn(
                      'h-px w-10 self-center bg-accent-dark',
                      'transition-[width,background-color] duration-[var(--duration-slow)] ease-out-expo',
                      'group-hover:w-16 group-hover:bg-accent-hover',
                    )}
                  />
                </a>
              </RevealItem>
            </div>

            <RevealItem className="lg:col-span-4 lg:col-start-9">
              <Eyebrow as="h3">Elsewhere</Eyebrow>

              <ul className="mt-6 flex flex-col">
                {profile.links.map((link) => (
                  <li key={link.label} className="border-t border-border">
                    <a
                      href={link.href}
                      className={cn(
                        'group flex items-baseline justify-between gap-4 py-4',
                        'transition-colors duration-[var(--duration-base)] ease-standard',
                        'hover:text-accent-hover',
                        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-hover',
                      )}
                    >
                      <Text
                        size="sm"
                        weight="medium"
                        className="transition-colors group-hover:text-accent-hover"
                      >
                        {link.label}
                      </Text>
                      <Code className="text-text-muted transition-colors group-hover:text-accent-hover">
                        {link.handle}
                      </Code>
                    </a>
                  </li>
                ))}
              </ul>
            </RevealItem>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
