import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'
import { profile } from '@/content'

/**
 * The boot log. Single tokens, because the panel is only about a fifth of the
 * frame — anything longer would need type too small to read. Short lines also
 * read more like a real boot than sentences would.
 *
 * Her actual stack: the reference mockup listed Node and MongoDB, neither of
 * which is on her resume, so neither is on her screen.
 */
const BOOT = ['initializing', 'react', 'next.js', 'typescript', 'socket', 'ready']

const FIRST_LINE_MS = 900
const LINE_MS = 260

/**
 * Panel footprint as a share of the 16:9 render, measured off the reference
 * frames and inset so text never rides onto the bezel. The orbit moves the
 * panel by 1–2%, which the inset absorbs.
 *
 * The parent is `aspect-video` and the render is 16:9, so the canvas cover
 * transform is the identity and these percentages map straight onto it. If the
 * slot ever stops being 16:9, this mapping has to be recomputed.
 */
const PANEL = 'left-[36.8%] top-[31.5%] w-[18%] h-[14.5%]'

function useBootLog(active, reduce) {
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    if (!active || reduce) return

    const timers = BOOT.map((_, i) =>
      setTimeout(() => setElapsed(i + 1), FIRST_LINE_MS + i * LINE_MS),
    )
    return () => timers.forEach(clearTimeout)
  }, [active, reduce])

  // Reduced motion skips the sequence rather than scheduling it away.
  return reduce ? BOOT.length : elapsed
}

/**
 * MonitorOverlay — the boot sequence, composited onto the black screen in the
 * render.
 *
 * Real DOM text rather than pixels baked into the frames: it stays crisp at any
 * size, it is readable by a screen reader, and the copy can change without
 * re-rendering 192 images.
 *
 * @param {object} props
 * @param {boolean} props.active - Start once the first frame has painted.
 * @param {boolean} props.reduce - Reduced motion: show the finished state.
 */
export function MonitorOverlay({ active, reduce }) {
  const visible = useBootLog(active, reduce)
  const done = visible >= BOOT.length

  return (
    <div
      className={cn(
        'pointer-events-none absolute overflow-hidden',
        PANEL,
        'font-mono text-[clamp(5px,0.62vw,11px)] leading-[1.5]',
        'transition-opacity duration-[var(--duration-slower)] ease-out-expo',
        active ? 'opacity-100' : 'opacity-0',
      )}
    >
      {done ? (
        <div className="flex h-full flex-col justify-center">
          <p className="font-display text-[1.9em] leading-tight font-semibold text-text">
            {profile.name}
          </p>
          <p className="mt-[0.4em] text-text-secondary">{profile.role}</p>
          <span aria-hidden="true" className="mt-[0.7em] block h-px w-[45%] bg-accent" />
        </div>
      ) : (
        <ul className="flex flex-col">
          {BOOT.slice(0, visible).map((line, i) => (
            <li key={line} className="flex gap-[0.5em]">
              <span aria-hidden="true" className="text-accent">
                ›
              </span>
              <span className={i === visible - 1 ? 'text-text' : 'text-text-muted'}>{line}</span>
              {i === visible - 1 && !reduce && (
                <span
                  aria-hidden="true"
                  className="ml-[0.1em] w-[0.5em] animate-pulse bg-accent-hover"
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
