/**
 * The stack, grouped by what each tool is for.
 *
 * Names only. Every entry used to carry a sentence explaining how it was used
 * on the four products — "Zustand — CrickEdge match state, one writer, many
 * subscribers" — which was true and well written and completely unreadable at
 * twenty-seven of them. Nobody reads a skills list; they scan it for the three
 * or four names they came looking for, and prose actively slows that down.
 *
 * The reasoning is not lost. It moved to where it carries weight: each project
 * in `projects.js` explains what it used and why, next to the thing it built.
 *
 * Nothing here is aspirational. If it is on this page it has shipped.
 */
export const technologyGroups = [
  {
    id: 'core',
    title: 'Core',
    items: ['React', 'TypeScript', 'Next.js', 'JavaScript', 'HTML5', 'CSS3'],
  },
  {
    id: 'state',
    title: 'State & data',
    items: ['Zustand', 'Redux', 'Context API', 'React Query', 'Socket.IO', 'REST APIs'],
  },
  {
    id: 'interface',
    title: 'Interface',
    items: [
      'Tailwind CSS',
      'shadcn/ui',
      'assistant-ui',
      'Monaco Editor',
      'React Markdown',
      'React Router',
      'i18n',
    ],
  },
  {
    id: 'quality',
    title: 'Quality & tooling',
    items: [
      'Jest',
      'React Testing Library',
      'ARIA',
      'Lighthouse',
      'GitHub Actions',
      'Chrome DevTools',
      'Git & GitHub',
      'Postman',
    ],
  },
]
