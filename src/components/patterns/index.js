/**
 * Public barrel for composed patterns — arrangements of locked UI primitives
 * that more than one feature needs. Nothing here introduces new typography,
 * color or spacing; it only composes what the design system already defines.
 */
export { Reveal, RevealItem } from './Reveal'
export { SectionIntro } from './SectionIntro'
export { revealMotion, wipeMotion } from './motion'
export { anchorOffset } from './anchors'
