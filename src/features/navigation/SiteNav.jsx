import { useEffect, useId, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { cn } from '@/lib/cn'
import { Eyebrow } from '@/components/ui'
import { profile, routes } from '@/content'
import { duration, easing } from '@/design-system/tokens'

/** Where the bar stops floating and takes a surface of its own. */
const SETTLE_AT = 80

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-hover'

/** The indicator's spring. Stiff enough to arrive with the eye, not after it. */
const INDICATOR = { type: 'spring', stiffness: 380, damping: 32 }

const menuBar = cn(
  'absolute left-0 block h-px w-full bg-current',
  'transition-transform duration-[var(--duration-base)] ease-out-expo',
)

/**
 * Two bars that cross into a close glyph.
 *
 * CSS transitions rather than Framer, deliberately. `MotionConfig
 * reducedMotion="user"` strips transforms — including rotation — so a
 * Framer-driven version would leave a reduced-motion reader looking at an
 * unchanged hamburger with an open menu below it and no visible way to close
 * it. The global rule in `base.css` instead collapses this transition's
 * *duration*, so the icon still ends in the right state, just instantly.
 */
function MenuIcon({ open }) {
  return (
    <span aria-hidden="true" className="relative block size-5">
      <span className={cn(menuBar, 'top-1/2', open ? 'rotate-45' : '-translate-y-1')} />
      <span className={cn(menuBar, 'top-1/2', open ? '-rotate-45' : 'translate-y-1')} />
    </span>
  )
}

/**
 * SiteNav — the fixed bar.
 *
 * Restrained by design: no background at all at the top of a page, and only a
 * hairline and a blur once the reader has scrolled. A solid bar from the first
 * pixel would be the first thing anyone saw.
 *
 * Now route-driven rather than anchor-driven. `NavLink` owns the active state,
 * which is a genuine simplification — the old version ran an
 * IntersectionObserver over five section elements to work out which one the
 * reader was looking at. The router simply knows.
 *
 * The active indicator is one element moved between links by `layoutId`, not an
 * underline per link fading in and out. Framer animates it from wherever it was
 * to wherever it now belongs, so the mark travels along the bar and the nav
 * reads as one control rather than five.
 */
export function SiteNav() {
  const [settled, setSettled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  const panelId = useId()
  const toggle = useRef(null)

  /**
   * `useMotionValueEvent` rather than a scroll listener: Framer is already
   * subscribed to the scroll for `ScrollProgress` and `BackToTop`, so this
   * shares that one subscription. State is set only on the crossing, so
   * scrolling does not re-render the bar on every frame.
   */
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (value) => {
    const next = value > SETTLE_AT
    setSettled((current) => (current === next ? current : next))
  })

  /**
   * Any navigation closes the mobile panel — including a browser back button,
   * which no click handler on the links would ever catch.
   *
   * Adjusted during render rather than in an effect. React documents this as
   * the way to reset state when a value changes: it re-renders immediately,
   * before anything paints, so the panel never appears open on the new route.
   * The effect version renders the wrong state first and then corrects it, and
   * the lint rule flags it as the cascading render it is.
   */
  const [lastPath, setLastPath] = useState(pathname)
  if (pathname !== lastPath) {
    setLastPath(pathname)
    setOpen(false)
  }

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
        {/* A wordmark, not a logo, and the only route to home — which is why
            home is not also listed among the links. */}
        <Link to="/" className={cn('rounded-sm', focusRing)}>
          <Eyebrow className="transition-colors duration-[var(--duration-base)] ease-standard hover:text-accent">
            {profile.name}
          </Eyebrow>
          <span className="sr-only"> — {profile.role}, home</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          {/* Tightened from gap-7/9 when Home made this a six-item bar — at the
              `md` breakpoint the old spacing left the last link close to the
              wordmark. */}
          <ul className="flex items-center gap-6 lg:gap-8">
            {routes.map((route) => (
              <li key={route.to}>
                <DesktopLink route={route} />
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

      {/* Unmounted when closed rather than hidden: `AnimatePresence` holds it in
          the tree long enough to play the exit, and once that finishes the links
          are genuinely gone from the tab order and the accessibility tree —
          which `hidden` on a collapsed container only approximates. */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: duration.slow, ease: easing.outExpo }}
            className="overflow-hidden border-t border-border md:hidden"
          >
            <nav aria-label="Primary">
              <ul className="mx-auto w-full max-w-[var(--container-wide)] px-[var(--spacing-gutter)] py-2">
                {routes.map((route, index) => (
                  <motion.li
                    key={route.to}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: duration.base,
                      ease: easing.outExpo,
                      delay: 0.06 * index,
                    }}
                    className="border-b border-border last:border-b-0"
                  >
                    <NavLink
                      to={route.to}
                      end={route.end}
                      className={({ isActive }) =>
                        cn(
                          'block rounded-sm py-4 font-sans text-base',
                          'transition-colors duration-[var(--duration-base)] ease-standard',
                          isActive ? 'text-accent-hover' : 'text-text-secondary',
                          focusRing,
                        )
                      }
                    >
                      {route.label}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function DesktopLink({ route }) {
  return (
    <NavLink
      to={route.to}
      /* `end` on Home only. Without it React Router matches `/` as a prefix of
         every path, so Home would stay highlighted on every page — and the
         `layoutId` indicator would have two claimants and never settle. */
      end={route.end}
      className={({ isActive }) =>
        cn(
          'group relative block rounded-sm py-2 font-sans text-sm',
          'transition-colors duration-[var(--duration-base)] ease-standard',
          isActive ? 'text-text' : 'text-text-secondary hover:text-text',
          focusRing,
        )
      }
    >
      {({ isActive }) => (
        <>
          {route.label}

          {/* Only the active link renders the indicator; the shared `layoutId`
              is what makes Framer slide the one that exists to its new position
              rather than cross-fading two. */}
          {isActive && (
            <motion.span
              aria-hidden="true"
              layoutId="nav-indicator"
              transition={INDICATOR}
              className="absolute inset-x-0 -bottom-0.5 h-px bg-accent-hover"
            />
          )}

          {/* Hover affordance for the inactive links, so the bar still responds
              without competing with the indicator. */}
          {!isActive && (
            <span
              aria-hidden="true"
              className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-border-hover
                         transition-transform duration-[var(--duration-slow)] ease-out-expo
                         group-hover:scale-x-100"
            />
          )}
        </>
      )}
    </NavLink>
  )
}
