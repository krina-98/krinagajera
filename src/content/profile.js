/**
 * The one place identity and contact details are written.
 * Everything here is factual — it has to survive a recruiter checking it.
 */
export const profile = {
  name: 'Krina Gajera',
  role: 'Frontend Developer',
  location: 'Surat, Gujarat',
  email: 'krinagajera988@gmail.com',
  phone: '+91 93132 63533',
  availability: {
    status: 'Open to frontend roles',
    detail: 'React, Next.js and TypeScript teams — remote or Surat / Ahmedabad.',
  },
  /**
   * Path to the résumé, served from `public/`. Null until the file exists —
   * every surface that offers it checks first, so an unset résumé renders no
   * link rather than a 404. Set this to e.g. '/krina-gajera-resume.pdf'.
   */
  resume: null,
  links: [
    { label: 'GitHub', href: 'https://github.com/krina-98', handle: 'github.com/krina-98' },
    {
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/krinagajera27',
      handle: 'in/krinagajera27',
    },
    { label: 'Email', href: 'mailto:krinagajera988@gmail.com', handle: 'krinagajera988@gmail.com' },
  ],
}

export const about = {
  lede: 'Most of what I have built moves while you are looking at it.',
  body: [
    'I am a frontend developer at Matlab Infotech in Surat, where I have spent the last year and a half on four products that share a problem: the data will not sit still. Live cricket commentary arriving over a socket. AI responses streaming token by token. Document extraction that finishes whenever it finishes and has to be polled until it does.',
    'That has pushed me somewhere specific. I think about state ownership before I think about components, because in a live interface the question is never "how do I render this" — it is "who is allowed to change this, and what happens to everything else when they do". Zustand for match state, Redux for nested extraction data, Context for sessions: three different answers because they were three different problems.',
    'The rest of my time goes on the parts that are easy to skip. Keyboard paths and ARIA on admin dashboards nobody demos. Jest and React Testing Library on components whose whole job is to re-render correctly. A Lighthouse score I took from 62 to 91 because 62 was embarrassing.',
  ],
  facts: [
    { label: 'Current', value: 'Frontend Developer, Matlab Infotech — since Jan 2025' },
    { label: 'Focus', value: 'Real-time interfaces, state architecture, accessibility, performance' },
    { label: 'Education', value: 'BE Computer Engineering, 2021–2025 — CGPA 8.49' },
    { label: 'Certification', value: 'Code Unnati Program, SAP & Edunet Foundation, 2023–2024' },
  ],
}
