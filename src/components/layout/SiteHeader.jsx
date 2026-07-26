import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion'
import { cn } from '@/lib/cn'
import { Button, Code, Eyebrow } from '@/components/ui'
import { profile, sections } from '@/content'
import { useActiveSection } from '@/hooks'

/** The point at which the bar stops floating over the hero and takes a surface. */
const SETTLE_AT = 24

function MenuIcon({ open }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={open ? 'M6 6l12 12M18 6L6 18' : 'M4 8h16M4 16h16'}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function NavLink({ section, active, onNavigate }) {
  return (
    <a
      href={`#${section.id}`}
      onClick={onNavigate}
      aria-current={active ? 'true' : undefined}
      className={cn(
        'group relative rounded-sm py-2 text-sm',
        'transition-colors duration-[var(--duration-base)] ease-standard',
        active ? 'text-text' : 'text-text-secondary hover:text-text',
        'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-hover',
      )}
    >
      {section.label}
      <span
        aria-hidden="true"
        className={cn(
          'absolute -bottom-0.5 left-0 h-px bg-accent-hover',
          'transition-[width] duration-[var(--duration-slow)] ease-out-expo',
          active ? 'w-full' : 'w-0 group-hover:w-full',
        )}
      />
    </a>
  )
}

/**
 * SiteHeader — the fixed bar, the reading-progress hairline, and the section
 * marker.
 *
 * Links are real anchors, so keyboard and middle-click behave and the smooth
 * scrolling comes from `base.css` — which already honours reduced motion.
 */
export function SiteHeader() {
  const [settled, setSettled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(sections)

  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })

  useMotionValueEvent(scrollY, 'change', (value) => {
    setSettled(value > SETTLE_AT)
  })

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-[var(--z-sticky)]',
        'transition-[background-color,border-color,backdrop-filter] duration-[var(--duration-slow)] ease-standard',
        settled || open
          ? 'border-b border-border bg-bg/80 backdrop-blur-md'
          : 'border-b border-transparent',
      )}
    >
      <div className="mx-auto flex h-20 w-full max-w-[var(--container-wide)] items-center justify-between gap-8 px-[var(--spacing-gutter)]">
        <a
          href="#top"
          className={cn(
            'flex items-center gap-3 rounded-sm',
            'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-hover',
          )}
        >
          <span
            aria-hidden="true"
            className="grid size-8 place-items-center rounded-sm border border-border-hover"
          >
            <Code className="text-accent-hover">K</Code>
          </span>
          <span className="hidden sm:block">
            <Eyebrow>{profile.name} — {profile.role}</Eyebrow>
          </span>
        </a>

        <nav aria-label="Sections" className="hidden items-center gap-8 lg:flex">
          {sections.map((section) => (
            <NavLink key={section.id} section={section} active={active === section.id} />
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            className="hidden sm:inline-flex"
            onClick={() => document.getElementById('contact')?.scrollIntoView()}
          >
            Start a conversation
          </Button>

          <Button
            variant="icon"
            size="sm"
            className="lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((value) => !value)}
          >
            <MenuIcon open={open} />
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="site-menu"
            aria-label="Sections"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-border lg:hidden"
          >
            <ul className="mx-auto flex w-full max-w-[var(--container-wide)] flex-col px-[var(--spacing-gutter)] py-2">
              {sections.map((section) => (
                <li key={section.id} className="border-b border-border last:border-b-0">
                  <a
                    href={`#${section.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === section.id ? 'true' : undefined}
                    className={cn(
                      'block rounded-sm py-4 text-sm',
                      active === section.id ? 'text-accent-hover' : 'text-text-secondary',
                      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-hover',
                    )}
                  >
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Reading progress. A hairline, on the header's own edge — a progress bar
          that draws attention to itself is measuring the wrong thing. */}
      <motion.span
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-accent-hover"
      />
    </header>
  )
}
