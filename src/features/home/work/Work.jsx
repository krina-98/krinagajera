import { Section } from '@/components/ui'
import { anchorOffset, Reveal, SectionIntro } from '@/components/patterns'
import { projects } from '@/content'
import { ProjectRow } from './ProjectRow'

/**
 * Work — four case studies, told at length.
 *
 * Long on purpose: the audience is deciding whether to spend money, and a grid
 * of thumbnails does not answer the question they are actually asking.
 */
export function Work() {
  return (
    <Section
      id="work"
      spacing="xl"
      container="wide"
      className={anchorOffset}
      aria-labelledby="work-title"
    >
      <Reveal>
        <SectionIntro
          eyebrow="Selected work"
          title="Four problems worth the engineering."
          id="work-title"
          marker={`01 — 0${projects.length}`}
          lede="Each of these started as an interface that had stopped scaling. What follows is the problem as it was handed to me, what I changed, and what it moved."
        />
      </Reveal>

      <div className="mt-24 flex flex-col gap-32 lg:gap-40">
        {projects.map((project, i) => (
          <ProjectRow key={project.id} project={project} flipped={i % 2 === 1} />
        ))}
      </div>
    </Section>
  )
}
