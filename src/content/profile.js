/**
 * The one place identity and contact details are written.
 * Everything here is factual — it has to survive a recruiter checking it.
 */
export const profile = {
  name: 'Krina Gajera',
  role: 'Frontend Developer',
  location: 'Surat, Gujarat',
  email: 'krinagajera988@gmail.com',
  /**
   * No phone number lives in this file. The site is public and a personal
   * number on a public page is scraped within days; email and LinkedIn are the
   * two routes in, and both are reversible if they ever start attracting spam.
   * Share the number directly once a conversation is underway.
   */
  /**
   * No geographic restriction here, deliberately. Naming the cities you will
   * work in reads as a limit on the candidate rather than a preference, and it
   * gives a recruiter a reason to stop reading before they have seen the work.
   * If location matters for a particular role, it is a conversation, not a
   * filter to publish.
   */
  availability: {
    status: 'Open to frontend roles',
    detail: 'React, Next.js and TypeScript teams.',
  },
  /**
   * Path to the résumé, served from `public/`. Set to null to remove it from
   * the site entirely — every surface that offers it checks first, so an unset
   * résumé renders no link rather than a 404.
   *
   * The filename is deliberately generic so swapping the file requires no code
   * change: drop a new PDF at `public/resume.pdf` and it is live.
   */
  resume: '/resume.pdf',
  /**
   * `icon` names an entry in `components/ui/icons.jsx` — the content layer
   * picks an icon without importing a component. `handle` is still here even
   * though the links now render as icons: it becomes the accessible name, so a
   * screen reader announces "GitHub, github.com/krina-98" rather than leaving
   * someone to guess where an unlabelled glyph goes.
   */
  links: [
    {
      label: 'GitHub',
      icon: 'github',
      href: 'https://github.com/krina-98',
      handle: 'github.com/krina-98',
    },
    {
      label: 'LinkedIn',
      icon: 'linkedin',
      href: 'https://linkedin.com/in/krinagajera27',
      handle: 'in/krinagajera27',
    },
    {
      label: 'Email',
      icon: 'email',
      href: 'mailto:krinagajera988@gmail.com',
      handle: 'krinagajera988@gmail.com',
    },
  ],
}

/**
 * Hero copy — a greeting, the rotating roles, and one call to action.
 *
 * Deliberately short. The hero used to carry an availability line, a role and
 * location, and a paragraph of description; all of it is still on the page, in
 * About and Contact, where a reader looking for it will actually be looking.
 */
export const hero = {
  greeting: 'Hi there, I am',
  /**
   * Cycled by the typing animation under the greeting.
   *
   * Worth a flag: everything else on this page — the projects, the skills, the
   * experience entry — is frontend. Nothing here evidences the M, E or N of
   * MERN (Mongo, Express, Node), so an interviewer who reads the title and then
   * the work will notice the gap. Either add a backend project to
   * `projects.js`, or narrow this to what the page already proves.
   */
  roles: ['MERN Stack Developer', 'Web Developer'],
  /**
   * One call to action, not two. A single destination is a decision already
   * made for the reader; a pair asks them to choose before they know anything.
   * It points at Contact — the page's only real conversion.
   */
  action: { label: 'Hire me', to: '/contact' },
}

/**
 * About — deliberately short, and deliberately about the work rather than the
 * record.
 *
 * There is no `facts` ledger any more. It listed the employer, the degree with
 * its CGPA, and a certification — a CV block transplanted onto a portfolio,
 * which is both the heaviest thing on the page and the least persuasive. A
 * grade says nothing a recruiter cannot get from the résumé, and naming a
 * current employer beside "open to roles" is a risk with no upside.
 *
 * What is left is the argument: the kind of problem, and how it is approached.
 * The employment history still lives in `experience.js`, where someone looking
 * for it will look.
 */
export const about = {
  greeting: ['Hi everyone,', 'I am Krina Gajera.'],
  /**
   * The whole introduction, in one line. There were two paragraphs here about
   * state ownership and live interfaces — good writing, wrong page. Anyone who
   * wants that argument gets it on Projects, next to the thing it built. About
   * is where a reader finds out there is a person behind the work, and that
   * does not take three hundred words.
   */
  lede: 'A frontend developer from Surat, India — currently building interfaces for a living.',

  /**
   * There is no interests list. Two versions were tried — a generic one
   * (games, travelling, doing nothing) and a work-adjacent one — and neither
   * earned its place. A hobby list is only worth printing when the hobbies are
   * genuinely yours and genuinely specific; anything short of that is filler
   * that a reader has to scroll past to reach the work.
   *
   * If real ones are ever added back: `interests: [{ emoji, label }]`, and the
   * grid in `About.jsx` handled 2 to 6 of them.
   */

  /**
   * Original, and specific to what she actually builds — an earlier draft of
   * this was lifted verbatim from the reference site, which is a bad look on a
   * page whose whole job is showing your own work.
   */
  quote:
    'The best part is still hitting refresh and finding something there that was not an hour ago.',
}
