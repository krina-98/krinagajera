/**
 * What the work adds up to. Every `evidence` line points at something in
 * `projects.js` — no claim here is unsupported.
 */
export const capabilities = [
  {
    id: 'realtime',
    index: '01',
    title: 'Real-time interfaces',
    what: 'Socket-driven state that stays consistent across every component watching it.',
    why: 'Live data breaks the usual assumptions: the user is not the one causing the change.',
    evidence: 'CrickEdge — Socket.IO + Zustand match state',
  },
  {
    id: 'state',
    index: '02',
    title: 'State architecture',
    what: 'Choosing between Zustand, Redux and Context on the shape of the data, not on habit.',
    why: 'Most re-render problems are state-shape problems that surfaced late.',
    evidence: 'Three products, three different stores, on purpose',
  },
  {
    id: 'streaming',
    index: '03',
    title: 'Streaming and async UI',
    what: 'Partial responses, polled results and progress that reflects what is actually happening.',
    why: 'An interface waiting on a backend should say so, not freeze.',
    evidence: 'Appinvento streaming markdown · Hobson polled extraction',
  },
  {
    id: 'performance',
    index: '04',
    title: 'Performance',
    what: 'Lazy loading, code splitting, and measuring before and after rather than guessing.',
    why: 'Load time is the first thing a user experiences and the easiest thing to neglect.',
    evidence: 'CrickEdge — Lighthouse 62 → 91, ~40% faster load',
  },
  {
    id: 'accessibility',
    index: '05',
    title: 'Accessibility',
    what: 'ARIA, keyboard paths and semantic HTML written as the component is written.',
    why: 'Retrofitting it across an admin product costs many times what building it in does.',
    evidence: 'MoveWork — keyboard-navigable admin dashboards',
  },
  {
    id: 'components',
    index: '06',
    title: 'Component architecture',
    what: 'Extracting the repeated shapes out of designs before assembling screens from them.',
    why: 'It is the difference between one system and four things that resemble each other.',
    evidence: 'MoveWork — component-driven build from Figma',
  },
  {
    id: 'testing',
    index: '07',
    title: 'Testing',
    what: 'Jest and React Testing Library aimed at the components most likely to break.',
    why: 'Live-updating components fail quietly; a test is the only thing that notices.',
    evidence: 'CrickEdge — render tests over live-updating data',
  },
]
