/**
 * The four products shipped at Matlab Infotech. Everything here comes from the
 * resume — no invented clients, no invented numbers. Where there is no metric,
 * the entry says what was built instead of implying a result.
 *
 * `preview` names the composition rendered inside the browser frame — see
 * `features/home/work/previews`.
 */
export const projects = [
  {
    id: 'crickedge',
    index: '01',
    name: 'CrickEdge',
    kind: 'Real-time cricket commentary',
    year: '2025',
    role: 'Frontend Developer',
    preview: 'live',
    url: 'crickedge — live commentary',
    summary:
      'Ball-by-ball commentary that has to stay correct while a match is running and every component is watching the same socket.',
    problem:
      'Live commentary is a state problem wearing a UI costume. Score, over, striker, bowler and the commentary feed all change from one socket message, and every component that reads them has to agree — including the ones that mounted halfway through an over.',
    solution:
      'Kept match state in a single Zustand store as the one writer, so socket messages update one place and every subscriber follows. Components read only the slice they need, which stops a wicket falling from re-rendering the whole page. Then the load side: lazy loading and code splitting took Lighthouse from 62 to 91 and cut initial load by roughly 40%.',
    stack: ['React', 'Next.js', 'TypeScript', 'Socket.IO', 'Zustand', 'Jest'],
    metrics: [
      { value: '62 → 91', label: 'Lighthouse performance score' },
      { value: '~40%', label: 'faster initial load' },
      { value: 'Live', label: 'socket-driven match state' },
    ],
    highlights: [
      'Zustand as the single writer for match state across every live component',
      'Lazy loading and code splitting on the routes that carried the weight',
      'Jest and React Testing Library asserting that live-updating data renders correctly',
    ],
  },
  {
    id: 'appinvento',
    index: '02',
    name: 'Appinvento',
    kind: 'AI agentic chat interface',
    year: '2025',
    role: 'Frontend Developer',
    preview: 'agent',
    url: 'appinvento — agent workspace',
    summary:
      'A chat interface for an agent that streams its answer, then shows you the code it wrote.',
    problem:
      'Agent output is not a message, it is a sequence — partial markdown arriving token by token, sometimes containing a file the user needs to actually read. Rendering that naively either flickers, breaks the markdown mid-parse, or forces the user out to another tab to see the code.',
    solution:
      'Built the surface on assistant-ui and shadcn/ui, rendering streaming responses through React Markdown so partial content stays readable as it arrives. Embedded Monaco Editor directly in the thread so code and file contents preview in place. Every piece is a reusable, accessible component, because multi-turn agent interactions repeat the same few shapes endlessly.',
    stack: ['React', 'TypeScript', 'Tailwind', 'assistant-ui', 'shadcn/ui', 'Monaco Editor'],
    metrics: [
      { value: 'Streaming', label: 'markdown rendered as it arrives' },
      { value: 'In-thread', label: 'Monaco code and file preview' },
      { value: 'Multi-turn', label: 'reusable accessible agent components' },
    ],
    highlights: [
      'React Markdown handling partial content without breaking mid-parse',
      'Monaco embedded in the thread rather than behind a link',
      'A component set built for repetition across long agent conversations',
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
      'Property data on a map, documents extracted asynchronously, and an AI chat sitting over both.',
    problem:
      'Three hard parts at once. Hundreds of properties will not render as hundreds of pins. Document extraction returns whenever the backend is ready, not when the user asks. And the extracted data is deeply nested, read by both the document view and the chat, so two surfaces can disagree about the same document.',
    solution:
      'Clustered the map so density reads as density instead of as a pile of overlapping markers. Polled the extraction APIs so the interface could show progress rather than a frozen spinner. Put the nested dataset in Redux so document extraction and chat read from one predictable source — with that shape, the same state serving two very different views was the safer trade.',
    stack: ['React', 'Redux', 'React Markdown', 'Google Maps', 'REST APIs'],
    metrics: [
      { value: 'Clustered', label: 'map rendering at portfolio scale' },
      { value: 'Polled', label: 'async document extraction with real progress' },
      { value: 'One source', label: 'nested state shared by chat and documents' },
    ],
    highlights: [
      'Google Maps clustering so the map stays legible as the portfolio grows',
      'Polling that reports progress instead of hiding it behind a spinner',
      'Redux chosen for genuinely shared, deeply nested data — not by default',
    ],
  },
  {
    id: 'movework',
    index: '04',
    name: 'MoveWork',
    kind: 'Enterprise job marketplace',
    year: '2025',
    role: 'Frontend Developer',
    preview: 'dashboard',
    url: 'movework — admin dashboard',
    summary:
      'An admin dashboard built from Figma, wired to a REST backend, and usable without a mouse.',
    problem:
      'Marketplace admin surfaces multiply fast — authentication, job posting, job search, user management — and each one arrives as a fresh Figma frame. Built literally, that becomes four dashboards that only look like one.',
    solution:
      'Worked component-driven rather than screen-driven: pulled the repeated shapes out of the designs first, then assembled screens from them. Context API for authentication and session, since that is genuinely global and rarely changes. Accessibility built in as the components were written — ARIA labels, keyboard navigation, semantic HTML — because retrofitting it across four admin surfaces costs far more than doing it once.',
    stack: ['React', 'Context API', 'REST APIs', 'ARIA', 'Semantic HTML'],
    metrics: [
      { value: '4 surfaces', label: 'auth, posting, search, user management' },
      { value: 'Keyboard', label: 'full navigation without a mouse' },
      { value: 'Reusable', label: 'components extracted before screens assembled' },
    ],
    highlights: [
      'Component-driven build from Figma, so four surfaces stayed one system',
      'Context API for session state — global, stable, and not worth a store',
      'ARIA and semantic HTML written in, not audited in afterwards',
    ],
  },
]
