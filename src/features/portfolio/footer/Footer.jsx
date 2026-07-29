import { Code, Section, Text } from '@/components/ui'
import { profile } from '@/content'

/** What the site is actually built with. Kept honest — it is a developer portfolio. */
const COLOPHON = ['React 19', 'Tailwind 4', 'Framer Motion', 'Vite']

/**
 * Footer — a single line: attribution and colophon.
 *
 * It used to carry a name-and-role block, the availability line, and a set of
 * GitHub / LinkedIn / Email links. All of that is gone. The footer renders on
 * every route, so anything in it is repeated six times across the site, and
 * none of it was doing work the rest of the page was not already doing better:
 * the nav carries the name, and Contact carries the links and the availability.
 *
 * Nothing is lost by removing them — the links live on `/contact`, which is
 * where someone who wants them is going.
 */
export function Footer() {
  return (
    <Section as="footer" spacing="sm" container="wide">
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
    </Section>
  )
}
