import { cn } from '@/lib/cn'
import { Code, Eyebrow, Heading, Section, Text } from '@/components/ui'
// `Heading` is used for the section title only; the email is a link, not an
// outline entry, so it is `Text` at a display size rather than a stray h3.
import { Reveal } from '@/components/motion'
import { profile } from '@/content'

const linkStyles = cn(
  'group inline-flex items-baseline gap-3 rounded-sm',
  'transition-colors duration-[var(--duration-base)] ease-standard',
  'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-hover',
)

/**
 * Contact — the closing address.
 *
 * Real links rather than a form. The audience already writes email for a
 * living, and a form only adds a step, a spam vector, and a way to lose the
 * message. Every route out of the page is a plain anchor.
 */
export function Contact() {
  return (
    <Section id="contact" spacing="xl" container="wide" aria-labelledby="contact-title">
      <Reveal className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <span aria-hidden="true" className="size-1.5 rounded-full bg-accent-hover" />
        <Eyebrow as="p">{profile.availability.status}</Eyebrow>
        <Code className="text-text-muted">{profile.availability.detail}</Code>
      </Reveal>

      <div className="mt-12 grid gap-x-10 gap-y-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal>
            <Heading level={2} id="contact-title" size="display-md">
              Let’s talk about what your interface has to keep up with.
            </Heading>
          </Reveal>

          <Reveal delay={80}>
            <Text size="lg" variant="secondary" className="mt-8 max-w-[52ch]">
              The useful first message is short: what the interface does today, and what it is
              stopping you from doing.
            </Text>
          </Reveal>

          <Reveal delay={140} className="mt-10">
            <a href={`mailto:${profile.email}`} className={cn(linkStyles, 'flex-wrap')}>
              <Text
                as="span"
                weight="medium"
                className={cn(
                  // Sized fluidly rather than from the body scale: this is the
                  // page's final call to action and it has to hold the column
                  // without wrapping the address awkwardly on a phone.
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
          <Reveal delay={100}>
            <Text as="h3" size="xs" variant="muted" className="font-mono tracking-wider uppercase">
              Elsewhere
            </Text>

            <ul className="mt-6 border-t border-border">
              {profile.links.map((link) => (
                <li key={link.label} className="border-b border-border">
                  <a
                    href={link.href}
                    {...(link.href.startsWith('http')
                      ? { target: '_blank', rel: 'noreferrer noopener' }
                      : {})}
                    className={cn(linkStyles, 'w-full justify-between py-4')}
                  >
                    <Text as="span" size="sm" weight="medium" className="text-text">
                      {link.label}
                    </Text>
                    <Text
                      as="span"
                      size="xs"
                      variant="muted"
                      className="text-right transition-colors group-hover:text-accent-hover"
                    >
                      {link.handle}
                    </Text>
                  </a>
                </li>
              ))}

              {/* Rendered only once `profile.resume` points at a real file. */}
              {profile.resume && (
                <li className="border-b border-border">
                  <a
                    href={profile.resume}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={cn(linkStyles, 'w-full justify-between py-4')}
                  >
                    <Text as="span" size="sm" weight="medium" className="text-text">
                      Résumé
                    </Text>
                    <Text
                      as="span"
                      size="xs"
                      variant="muted"
                      className="transition-colors group-hover:text-accent-hover"
                    >
                      PDF
                    </Text>
                  </a>
                </li>
              )}
            </ul>

            <dl className="mt-10 grid gap-4">
              <ContactFact term="Based in" value={profile.location} />
              <ContactFact term="Phone" value={profile.phone} href={`tel:${profile.phone.replace(/\s/g, '')}`} />
            </dl>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}

function ContactFact({ term, value, href }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt>
        <Text as="span" size="xs" variant="muted" className="font-mono tracking-wider uppercase">
          {term}
        </Text>
      </dt>
      <dd>
        {href ? (
          <a href={href} className={cn(linkStyles, 'text-sm text-text-secondary hover:text-accent-hover')}>
            <Text as="span" size="sm" variant="secondary">
              {value}
            </Text>
          </a>
        ) : (
          <Text as="span" size="sm" variant="secondary">
            {value}
          </Text>
        )}
      </dd>
    </div>
  )
}
