/**
 * Grouped rather than listed. `note` is how the tool is actually used on the
 * four products — the part a logo grid never tells you. Nothing here is
 * aspirational; if it is on this page it has shipped.
 */
export const technologyGroups = [
  {
    id: 'core',
    title: 'Core',
    items: [
      { name: 'React', note: 'Every product. Composition first, and knowing why a subtree re-rendered.' },
      { name: 'TypeScript', note: 'The contract between API responses and the components that read them.' },
      { name: 'Next.js', note: 'Routing and rendering strategy on CrickEdge and Appinvento.' },
      { name: 'JavaScript', note: 'ES6+. The platform under the framework.' },
      { name: 'HTML5', note: 'Semantic structure as the first accessibility decision.' },
      { name: 'CSS3', note: 'Layout and motion where a library would be overkill.' },
    ],
  },
  {
    id: 'state',
    title: 'State & data',
    items: [
      { name: 'Zustand', note: 'CrickEdge match state — one writer, many subscribers.' },
      { name: 'Redux', note: 'Hobson nested extraction data, shared by two very different views.' },
      { name: 'Context API', note: 'MoveWork auth and session — global, stable, rarely written.' },
      { name: 'React Query', note: 'Server cache kept separate from client state.' },
      { name: 'Socket.IO', note: 'The live channel behind ball-by-ball commentary.' },
      { name: 'REST APIs', note: 'Auth, search, posting, extraction — including polled endpoints.' },
    ],
  },
  {
    id: 'interface',
    title: 'Interface',
    items: [
      { name: 'Tailwind CSS', note: 'A token layer with a class syntax, on every product.' },
      { name: 'shadcn/ui', note: 'Base for the Appinvento agent surface.' },
      { name: 'assistant-ui', note: 'Thread and streaming primitives for agent chat.' },
      { name: 'Monaco Editor', note: 'Code and file preview embedded in the chat thread.' },
      { name: 'React Markdown', note: 'Streaming agent output that stays readable while partial.' },
      { name: 'React Router', note: 'Client routing where Next.js was not the shape.' },
      { name: 'i18n', note: 'Copy kept out of components from the start.' },
    ],
  },
  {
    id: 'quality',
    title: 'Quality & tooling',
    items: [
      { name: 'Jest', note: 'Unit and component tests, aimed where breakage is quiet.' },
      { name: 'React Testing Library', note: 'Asserting on what the user sees, not on internals.' },
      { name: 'ARIA', note: 'Labels and roles on admin surfaces nobody demos.' },
      { name: 'Lighthouse', note: 'The 62 → 91 measurement, before and after.' },
      { name: 'GitHub Actions', note: 'CI/CD pipelines for the team.' },
      { name: 'Chrome DevTools', note: 'Where performance work actually happens.' },
      { name: 'Git & GitHub', note: 'Small commits, readable history.' },
      { name: 'Postman', note: 'API contracts checked before the UI is written.' },
    ],
  },
]
