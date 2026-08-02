/**
 * Five shipped products. Everything here comes from the resume — no invented
 * clients, no invented numbers. Where there is no metric, the entry says what
 * was built instead of implying a result.
 *
 * Four are employer work; the fifth, MemoryOS, is personal and is the only one
 * that can carry links, because it is the only one that is hers to link. It is
 * placed last for chronology, not for rank — it is arguably the strongest entry
 * here, being the only full-stack build and the only one an outside panel judged.
 *
 * The employer is not named at project level. It is stated once, in
 * `experience.js`, which is the one place it belongs.
 *
 * Voice: plain, first-person, and deliberately short. These were cut down twice
 * — once out of a formal register, then again to roughly a third of that. Every
 * fact and number survived both passes; only words went. `problem` is one or two
 * sentences, `solution` two or three, and `summary` a single line.
 *
 * Keep new entries to that budget. Five case studies at the old length was a
 * wall of prose, and a recruiter skimming it read none of them.
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
      'A live cricket app where the score, the over and the commentary update the moment a ball is bowled.',
    problem:
      'Score, over, striker and commentary all arrive on one socket. Separate copies drift apart, and anything loading mid-over shows the wrong thing.',
    solution:
      'All match state in one Zustand store, so a socket message updates a single place and every component follows it. Lazy loading and code splitting took Lighthouse from 62 to 91 and cut the initial load by about 40%.',
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
      'Replies arrive a few characters at a time, as half-finished markdown with code inside. Rendered naively they flicker and break part-way through.',
    solution:
      'React Markdown renders the partial reply so it stays readable while still arriving. Monaco sits inside the conversation, so code previews in place rather than behind a link.',
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
      'Hundreds of properties cannot each be their own pin. Extraction finishes whenever the backend is ready. And two screens read the same deeply nested data, so they can disagree.',
    solution:
      'Clustered the map so a dense area reads as dense. Polled the extraction API so the screen shows real progress instead of a spinner that never moves. Put the nested data in Redux, so the document view and the chat read from one place.',
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
      'Four screens arrived as four separate Figma frames. Built one at a time, they end up as four dashboards that only look alike.',
    solution:
      'Worked from components rather than screens — pulled out the shapes that repeated, then assembled the screens from those. Context API for session. ARIA and keyboard navigation written in as I went, not audited in afterwards.',
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
  {
    id: 'memoryos',
    index: '05',
    name: 'MemoryOS',
    kind: 'AI document assistant',
    // 2026, not 2025. The repo's first and last commits are 18 and 19 July
    // 2026 — a Saturday and a Sunday — which matches the hackathon's 15–19
    // July 2026 window. Worth the check: this was the one date on the page
    // that could be verified against something other than memory.
    year: '2026',
    // Not "solo" — this was a team entry. Every commit in the repo is hers, so
    // the scope below is defensible; the team is not hers to erase.
    role: 'Frontend, backend, schema',
    preview: 'extraction',
    url: 'memoryos — document extraction',
    /**
     * The only entry with `links`, because it is the only project that is mine
     * to link. The other four are employer work: no public URL, no public repo.
     * That asymmetry is the reason this one earns its place on the page.
     */
    links: [
      { label: 'Live demo', href: 'https://memory-os-one-gray.vercel.app/' },
      { label: 'Source', href: 'https://github.com/krina-98/memory-os', icon: 'github' },
    ],
    summary:
      'Upload a document, get the fields that matter for that kind of document, then ask questions about your files.',
    problem:
      'Extractors pull the same fixed fields off everything. Right for a receipt, useless for a prescription.',
    /**
     * No claim here about auth or row-level security. That work exists locally
     * but is not in the deployed commit, so it is not in the live demo or the
     * public repo — and this page links both. Everything below is true of the
     * build a visitor actually meets. Add the scoping line back once it ships.
     */
    solution:
      'The model picks fields per document, with a regex fallback so a failed call still leaves usable metadata. OCR and PDF parsing run in the browser, and the AI key stays server-side in an edge function.',
    stack: ['React 19', 'TypeScript', 'Supabase', 'Postgres', 'Edge Functions', 'Tesseract.js'],
    metrics: [
      /**
       * The rank is the one number here that an outsider verified, so it leads.
       * TODO: add the field size once confirmed — "15th of 2,400" is a headline,
       * a bare "15th" is only half the claim.
       */
      { value: '15th place', label: 'OpenAI × NamasteDev Codex Hackathon' },
      { value: 'Per-document', label: 'fields, not a fixed schema' },
      { value: 'Server-side', label: 'AI key, never in the browser' },
    ],
    highlights: [
      'One extraction interface, an AI provider and a heuristic fallback behind it',
      'OCR and PDF parsing in the browser, lazy-loaded so they cost nothing upfront',
      'The provider key held server-side in an edge function, never sent to the client',
      'Grounded chat that answers from your documents and cites which ones',
    ],
  },
]
