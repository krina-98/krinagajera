import { about } from './profile'

/**
 * The copy narrated over the pinned workstation.
 *
 * Nothing here is new information. Each line is lifted verbatim from content
 * that already exists elsewhere in this folder, and the section further down
 * the page always carries the full version — the sequence is a trailer, not the
 * only place a fact appears. Sources are noted per beat so a future edit knows
 * what it has to stay in sync with.
 *
 * `id` matches the `data-beat` attribute the timeline animates.
 */
export const beats = [
  {
    id: 'about',
    eyebrow: 'About',
    // First sentence of `about.body[0]`, unchanged.
    line: 'I am a frontend developer at Matlab Infotech in Surat, where I have spent the last year and a half on four products that share a problem: the data will not sit still.',
  },
  {
    id: 'skills',
    eyebrow: 'Stack',
    // `experience[0].notes[1]`, unchanged.
    line: 'React, Next.js and TypeScript throughout; Zustand, Redux and Context chosen per product.',
  },
]

/** The opening statement. `about.lede` is already exactly one line long. */
export const heroLede = about.lede
