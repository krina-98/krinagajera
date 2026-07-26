import { cn } from '@/lib/cn'
import { Code, Eyebrow, Section, Text } from '@/components/ui'
import { profile } from '@/content'

const COLOPHON = ['React 19', 'Three.js', 'Framer Motion', 'Tailwind', 'Vite']

export function SiteFooter() {
  return (
    <Section as="footer" spacing="sm" container="wide">
      <div className="flex flex-col gap-8 border-t border-border pt-10">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-3">
            <Eyebrow>{profile.name} — {profile.role}</Eyebrow>
            <Text size="sm" variant="muted" className="max-w-xs">
              {profile.availability.status} from {profile.availability.from}.
            </Text>
          </div>

          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {profile.links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={cn(
                    'rounded-sm text-sm text-text-secondary',
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
        </div>

        <div
          className={cn(
            'flex flex-col gap-4 border-t border-border pt-6',
            'sm:flex-row sm:items-center sm:justify-between sm:gap-8',
          )}
        >
          <ul className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <li>
              <Code className="text-text-muted">Built with</Code>
            </li>
            {COLOPHON.map((tool) => (
              <li key={tool} className="flex items-center gap-3">
                <Code className="text-text-muted">{tool}</Code>
                {tool !== COLOPHON.at(-1) && (
                  <span aria-hidden="true" className="h-px w-3 bg-border" />
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-6">
            <Code className="text-text-muted">© 2026</Code>
            <a
              href="#top"
              className={cn(
                'group flex items-center gap-2 rounded-sm text-sm text-text-secondary',
                'transition-colors duration-[var(--duration-base)] ease-standard',
                'hover:text-accent-hover',
                'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-hover',
              )}
            >
              Back to top
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-4">
                <path
                  d="M12 19V5m0 0-5 5m5-5 5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </Section>
  )
}
