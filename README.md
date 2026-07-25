# Portfolio — Dark Walnut + Bronze

A premium, interactive portfolio.
React 19 · Vite · Tailwind v4 · Framer Motion · Three.js / R3F / Drei · Leva.

## Getting started

```bash
npm install
npm run dev      # start dev server
npm run build    # production build
npm run preview  # preview the production build
npm run lint     # eslint
```

## Structure

```
src/
├─ app/                 # app shell: entry, root component, providers
│  ├─ main.jsx          # Vite entry — imports globals.css, renders <App/>
│  ├─ App.jsx           # thin root; router outlet mounts here (Phase 2)
│  └─ AppProviders.jsx  # single seam for app-wide context
│
├─ design-system/       # the visual foundation
│  ├─ styles/           # globals.css · theme.css (@theme tokens) · base.css
│  └─ tokens.js         # JS mirror of the tokens JS actually needs (colors, motion)
│
├─ features/            # self-contained product slices (home, work, contact...)
├─ components/          # cross-feature UI (our design + wrapped shadcn a11y primitives)
├─ three/               # 3D: canvas, scenes, meshes, R3F hooks
├─ assets/              # icons · images · models · textures · hdr
└─ lib/                 # framework-agnostic helpers (cn)
```

## Conventions

- **Imports:** absolute via the `@/` alias (`@/design-system/tokens`), never `../../..`.
- **Styling:** Tailwind utilities + CSS variables for the DOM; `tokens.js` for 3D/motion.
- **Tokens:** `theme.css` is the source of truth; `tokens.js` mirrors only what JS reads.
- **No magic values:** every color / size / duration comes from a token.
- **shadcn:** accessibility primitives only — never for visual identity.
