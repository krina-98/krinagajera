export const experience = [
  {
    id: 'matlab',
    period: 'Jan 2025 — present',
    role: 'Frontend Developer',
    company: 'Matlab Infotech',
    context: 'Surat, Gujarat. Four products, Agile delivery, CI/CD on GitHub Actions.',
    notes: [
      'Shipped CrickEdge, Appinvento, Hobson and MoveWork — real-time, AI, mapping and admin surfaces',
      'React, Next.js and TypeScript throughout; Zustand, Redux and Context chosen per product',
      'Took a Lighthouse performance score from 62 to 91 with lazy loading and code splitting',
      'Wrote unit and component tests in Jest and React Testing Library for live-updating views',
    ],
  },
  /**
   * A hackathon placing is not employment, but it belongs on this timeline for
   * a reason none of the work above can match: it is the only line on the page
   * that someone outside verified. Everything else is self-reported.
   *
   * TODO: add the field size — "15th of 2,400 teams" is a claim, "15th" alone
   * leaves the reader to guess whether the field was forty people or four
   * thousand. If the number is small, drop the denominator rather than invent
   * a flattering framing.
   *
   * The number is not public: namastedev.com/hackathon returns 403 to anything
   * unauthenticated, and the leaderboard sits behind the login. It has to come
   * from Krina's own account.
   */
  {
    id: 'hackathon',
    period: 'July 2026',
    role: '15th place — MemoryOS',
    company: 'OpenAI × NamasteDev Codex Hackathon',
    context: 'A team entry, built over a weekend. Live, and the code is public.',
    notes: [
      'An AI document assistant that picks extraction fields per document type',
      'Full stack — React and TypeScript over Supabase Postgres, storage and edge functions',
      'The only project here with a public demo and repo, both linked under Work',
    ],
  },
  {
    id: 'education',
    period: '2021 — 2025',
    role: 'BE, Computer Engineering',
    company: 'Shree Swami Atmanand Saraswati Institute of Technology',
    // No grade. A CGPA is a number that can only count against you: strong
    // enough and nobody hires on it, weak enough and it filters you out before
    // anyone reads the work. It stays on the résumé, where it is asked for.
    context: 'Started building interfaces before the degree finished.',
    notes: [
      'Code Unnati Program, 2023–2024 — CSR initiative by SAP and Edunet Foundation',
      'Industry-oriented software development, problem solving and employability',
    ],
  },
]
