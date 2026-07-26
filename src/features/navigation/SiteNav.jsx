import { useEffect, useId, useRef, useState } from 'react'
import { cn } from '@/lib/cn'
import { Code, Eyebrow } from '@/components/ui'
import { profile, sections } from '@/content'
import { useActiveSection } from '@/hooks'
import { useSectionScroll } from './useSectionScroll'

/** Where the bar stops floating over the hero and takes a surface of its own. */
const SETTLE_AT = 80

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-hover'

function MenuIcon({ open }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5">
      <path
        d={open ? 'M6 6l12 12M18 6L6 18' : 'M4 8h16M4 16h16'}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

/**
 * SiteNav — the fixed bar.
 *
 * Restrained by design: no background at all over the hero, and only a hairline
 * and a blur once the reader is into the written sections. The workstation is
 * the hero; a solid bar sitting on top of it from the first pixel would be the
 * first thing anyone saw.
 *
 * Both the desktop list and the mobile panel render the same real anchors, so
 * the keyboard path, focus order and copy-link behaviour are identical.
 */
export function SiteNav() {
  const [settled, setSettled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(sections)
  const onNavigate = useSectionScroll()

  const panelId = useId()
  const toggle = useRef(null)

  useEffect(() => {
    let frame = 0

    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        setSettled(window.scrollY > SETTLE_AT)
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event) => {
      if (event.key !== 'Escape') return
      setOpen(false)
      // Escape must leave focus somewhere sensible, not on a hidden element.
      toggle.current?.focus()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  const closeAndNavigate = (event) => {
    setOpen(false)
    onNavigate(event)
  }

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-(--z-sticky)',
        'border-b transition-[background-color,border-color,backdrop-filter]',
        'duration-[var(--duration-slow)] ease-standard',
        settled || open
          ? 'border-border bg-bg/70 backdrop-blur-xl'
          : 'border-transparent bg-transparent',
      )}
    >
      <div
        className={cn(
          'mx-auto flex w-full max-w-[var(--container-wide)] items-center justify-between gap-6',
          'h-16 px-[var(--spacing-gutter)] sm:h-20',
        )}
      >
        <a href="#top" className={cn('flex items-center gap-3 rounded-sm', focusRing)}>
          <span
            aria-hidden="true"
            className="grid size-8 shrink-0 place-items-center rounded-sm border border-border-hover"
          >
            <Code className="text-accent-hover">K</Code>
          </span>
          <span className="hidden sm:block">
            <Eyebrow>
              {profile.name} — {profile.role}
            </Eyebrow>
          </span>
          <span className="sr-only sm:hidden">
            {profile.name} — {profile.role}
          </span>
        </a>

        <nav aria-label="Sections" className="hidden md:block">
          <ul className="flex items-center gap-7 lg:gap-9">
            {sections.map((section) => (
              <li key={section.id}>
                <NavLink
                  section={section}
                  active={active === section.id}
                  onNavigate={onNavigate}
                />
              </li>
            ))}
          </ul>
        </nav>

        <button
          ref={toggle}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setOpen((value) => !value)}
          className={cn(
            'grid size-11 place-items-center rounded-sm text-text-secondary md:hidden',
            'transition-colors duration-[var(--duration-fast)] ease-standard hover:text-text',
            focusRing,
          )}
        >
          <MenuIcon open={open} />
        </button>
      </div>

      {/* Kept mounted and collapsed by grid-template-rows rather than unmounted:
          the panel animates open and closed, and `hidden` on the content keeps
          the links out of the tab order and the a11y tree while collapsed. */}
      <div
        id={panelId}
        className={cn(
          'grid overflow-hidden border-t md:hidden',
          'transition-[grid-template-rows,border-color] duration-[var(--duration-slow)] ease-out-expo',
          open ? 'grid-rows-[1fr] border-border' : 'grid-rows-[0fr] border-transparent',
        )}
      >
        <div className="min-h-0">
          <nav aria-label="Sections" hidden={!open}>
            <ul className="mx-auto w-full max-w-[var(--container-wide)] px-[var(--spacing-gutter)] py-2">
              {sections.map((section) => (
                <li key={section.id} className="border-b border-border last:border-b-0">
                  <a
                    href={`#${section.id}`}
                    onClick={closeAndNavigate}
                    aria-current={active === section.id ? 'location' : undefined}
                    className={cn(
                      'block rounded-sm py-4 font-sans text-base',
                      'transition-colors duration-[var(--duration-base)] ease-standard',
                      active === section.id ? 'text-accent-hover' : 'text-text-secondary',
                      focusRing,
                    )}
                  >
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

function NavLink({ section, active, onNavigate }) {
  return (
    <a
      href={`#${section.id}`}
      onClick={onNavigate}
      aria-current={active ? 'location' : undefined}
      className={cn(
        'group relative block rounded-sm py-2 font-sans text-sm',
        'transition-colors duration-[var(--duration-base)] ease-standard',
        active ? 'text-text' : 'text-text-secondary hover:text-text',
        focusRing,
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
