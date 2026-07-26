import { cn } from '@/lib/cn'
import { Code, Eyebrow, Section, Text } from '@/components/ui'
import { profile } from '@/content'

/** What the site is actually built with. Kept honest — it is a developer portfolio. */
const COLOPHON = ['React 19', 'GSAP ScrollTrigger', 'Canvas 2D', 'Tailwind 4', 'Vite']

export function Footer() {
  return (
    <Section as="footer" spacing="sm" container="wide">
      <div className="flex flex-col gap-10 border-t border-border pt-10">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-3">
            <Eyebrow as="p">
              {profile.name} — {profile.role}
            </Eyebrow>
            <Text size="sm" variant="muted" className="max-w-xs">
              {profile.availability.detail}
            </Text>
          </div>

          <nav aria-label="Elsewhere">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {profile.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    {...(link.href.startsWith('http')
                      ? { target: '_blank', rel: 'noreferrer noopener' }
                      : {})}
                    className={cn(
                      'rounded-sm font-sans text-sm text-text-secondary',
                      'transition-colors duration-[var(--duration-base)] ease-standard',
                      'hover:text-accent-hover',
                      'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-hover',
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <Text size="xs" variant="muted">
            © {profile.name}. {profile.location}.
          </Text>

          <ul className="flex flex-wrap gap-x-4 gap-y-1">
            {COLOPHON.map((item) => (
              <li key={item}>
                <Code className="text-xs text-text-muted">{item}</Code>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
