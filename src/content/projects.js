/**
 * The four shipped products. Everything here comes from the resume — no
 * invented clients, no invented numbers. Where there is no metric, the entry
 * says what was built instead of implying a result.
 *
 * The employer is not named at project level. It is stated once, in
 * `experience.js`, which is the one place it belongs.
 *
 * Voice: plain and first-person. These were rewritten from a denser, more
 * formal register — the facts and the numbers are unchanged, but the sentences
 * are shorter and say "I built" rather than "was built". A recruiter skimming
 * four case studies should not have to work for the point of each one.
 *
 * `preview` is a leftover key from an earlier design that rendered each project
 * inside a mock browser frame. Nothing reads it now. Kept because it costs
 * nothing and the day a public case study needs an image, the slot is named.
 */
export const projects = [
  {
    id: 'crickedge',
    index: '01',
    name: 'CrickEdge',
    kind: 'Live cricket commentary',
    year: '2025',
    role: 'Frontend Developer',
    preview: 'live',
    url: 'crickedge — live commentary',
    summary:
      'A live cricket app where the score, the over and the commentary all update the moment a ball is bowled.',
    problem:
      'Everything on screen comes from the same socket — score, over, striker, bowler, commentary. If each component kept its own copy they would drift apart, and anything that loaded halfway through an over would show the wrong thing.',
    solution:
      'I kept all the match state in one Zustand store, so a socket message updates a single place and every component follows it. Each component reads only the part it needs, so a wicket falling does not re-render the whole page. I also added lazy loading and code splitting, which took the Lighthouse score from 62 to 91 and cut the initial load by about 40%.',
    stack: ['React', 'Next.js', 'TypeScript', 'Socket.IO', 'Zustand', 'Jest'],
    metrics: [
      { value: '62 → 91', label: 'Lighthouse score' },
      { value: '~40%', label: 'faster to load' },
      { value: 'Live', label: 'match state over sockets' },
    ],
    highlights: [
      'One Zustand store as the single source of match state',
      'Lazy loading and code splitting on the routes that carried the weight',
      'Jest and React Testing Library covering the live-updating views',
    ],
  },
  {
    id: 'appinvento',
    index: '02',
    name: 'Appinvento',
    kind: 'AI chat interface',
    year: '2025',
    role: 'Frontend Developer',
    preview: 'agent',
    url: 'appinvento — agent workspace',
    summary:
      'A chat interface for an AI agent that streams its answer as it writes, then shows you the code it produced.',
    problem:
      'The agent sends its reply a few characters at a time, and that reply is usually half-finished markdown with code inside it. Rendered naively it flickered, broke the markdown part-way through, or pushed people into another tab just to read the code.',
    solution:
      'I built it on assistant-ui and shadcn/ui, and rendered the streaming replies through React Markdown so partial text stays readable while it is still arriving. Monaco Editor sits inside the conversation itself, so code and files preview in place. Everything is a reusable, accessible component, because the same few shapes repeat constantly in a long chat.',
    stack: ['React', 'TypeScript', 'Tailwind', 'assistant-ui', 'shadcn/ui', 'Monaco Editor'],
    metrics: [
      { value: 'Streaming', label: 'markdown as it arrives' },
      { value: 'In-thread', label: 'code and file preview' },
      { value: 'Reusable', label: 'accessible chat components' },
    ],
    highlights: [
      'React Markdown handling partial content without breaking part-way',
      'Monaco embedded in the thread rather than behind a link',
      'A component set built for repetition across long conversations',
    ],
  },
  {
    id: 'hobson',
    index: '03',
    name: 'Hobson',
    kind: 'Property management platform',
    year: '2025',
    role: 'Frontend Developer',
    preview: 'map',
    url: 'hobson — portfolio map',
    summary:
      'A property platform with a map, documents that get read automatically, and an AI chat sitting over both.',
    problem:
      'Three hard parts at once. Hundreds of properties cannot each be their own pin. Document extraction finishes whenever the backend is ready, not when someone asks for it. And the extracted data is deeply nested and read by two different screens, so the two can easily disagree.',
    solution:
      'I clustered the map so a dense area reads as dense instead of a pile of overlapping markers. I polled the extraction API so the screen could show real progress instead of a spinner that never moves. And I put the nested data in Redux, so the document view and the chat always read from the same place.',
    stack: ['React', 'Redux', 'React Markdown', 'Google Maps', 'REST APIs'],
    metrics: [
      { value: 'Clustered', label: 'map at portfolio scale' },
      { value: 'Polled', label: 'extraction with real progress' },
      { value: 'One source', label: 'shared by chat and documents' },
    ],
    highlights: [
      'Map clustering so the map stays readable as the portfolio grows',
      'Polling that reports progress instead of hiding it',
      'Redux for genuinely shared, deeply nested data — not by default',
    ],
  },
  {
    id: 'movework',
    index: '04',
    name: 'MoveWork',
    kind: 'Job marketplace admin',
    year: '2025',
    role: 'Frontend Developer',
    preview: 'dashboard',
    url: 'movework — admin dashboard',
    summary:
      'An admin dashboard built from Figma designs, wired up to a REST backend, and usable without a mouse.',
    problem:
      'Admin screens add up fast — signing in, posting a job, searching jobs, managing users — and each one arrived as its own Figma frame. Built one at a time, they end up as four dashboards that only look alike.',
    solution:
      'I worked from components rather than screens: pulled out the shapes that repeated across the designs first, then assembled the screens from those. Context API handles sign-in and session, since that really is global and rarely changes. Accessibility went in as I wrote each component — ARIA labels, keyboard navigation, semantic HTML — because adding it afterwards across four screens costs far more.',
    stack: ['React', 'Context API', 'REST APIs', 'ARIA', 'Semantic HTML'],
    metrics: [
      { value: '4 screens', label: 'auth, posting, search, users' },
      { value: 'Keyboard', label: 'usable without a mouse' },
      { value: 'Reusable', label: 'components before screens' },
    ],
    highlights: [
      'Component-driven build, so four screens stayed one system',
      'Context API for session state — global, stable, not worth a store',
      'ARIA and semantic HTML written in, not audited in afterwards',
    ],
  },
]
