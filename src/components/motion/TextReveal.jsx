import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'
import { maskedLine, stagger, viewport } from '@/design-system/motion'

/**
 * TextReveal — display type rising line by line out of a mask.
 *
 * The signature entrance, and deliberately rationed: the hero headline, the
 * two or three section titles that carry the page. Used on body copy it stops
 * being a gesture and becomes a tic.
 *
 * Lines are passed in rather than wrapped automatically. Each one needs its own
 * clipping box to be masked, which means the break points have to be known
 * before render — so they are a typographic decision made at the call site, not
 * whatever the browser happens to do at 1043px wide.
 *
 * Renders spans only, so it composes inside `Heading` and keeps the heading
 * semantics where they belong:
 *
 *   <Heading level={1} size="display-lg">
 *     <TextReveal lines={hero.headline} />
 *   </Heading>
 *
 * @param {object} props
 * @param {string[]|string} props.lines - One entry per rendered line.
 * @param {number} [props.gap=0.1] - Seconds between lines.
 * @param {number} [props.delay=0] - Seconds before the first line.
 * @param {string} [props.className]
 */
export function TextReveal({ lines, gap = 0.1, delay = 0, className, ...props }) {
  const items = Array.isArray(lines) ? lines : [lines]

  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={stagger(gap, delay)}
      className={cn('block', className)}
      {...props}
    >
      {items.map((line, index) => (
        <span
          key={`${index}-${line}`}
          /* The mask. `pb`/`-mb` are equal and opposite: the padding grows the
             clip box far enough down to contain descenders (g, y, p), and the
             negative margin removes exactly that much from the layout again.
             Net effect on line rhythm: zero — the masked headline occupies the
             same box as an unmasked one, which is what keeps the display
             scale's tight leading honest.

             0.25em is sized to the deepest descender in the display face. Less
             than that (0.14em was the first guess) clips the tails; more than
             that is harmless but starts letting line n+1's clip box reach up
             into line n's territory. */
          className="block overflow-hidden pb-[0.25em] -mb-[0.25em]"
        >
          <motion.span variants={maskedLine} className="block">
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}
