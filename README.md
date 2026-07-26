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

## Design language (locked)

Theme: **Dark Walnut + Bronze** — *warm craftsmanship × engineered precision, held together by restraint.*

**Type stack**

- **Display:** Bricolage Grotesque — characterful contemporary grotesque, reserved for large moments.
- **Body:** Satoshi — precise, premium product sans (deliberately not Inter).
- **Mono:** JetBrains Mono — technical metadata, indices, tags.
- Eyebrows/overlines: mono or Satoshi, uppercase, `tracking-widest`, in bronze — the signature detail.
- Long-form text is constrained to the reading measure (`--container-prose`, ~65ch).

> Font files are not self-hosted yet — the system fallbacks in `theme.css` render until
> Bricolage Grotesque + Satoshi `.woff2` are added to `assets/` and declared.

**Foundational rules**

- **Radius:** slightly rounded — 8px controls, 12–16px cards. Never sharp, never soft.
- **Shadow:** flat by default; elevation comes from surface steps (`bg → surface → card → card-hover`);
  real shadows only for floating layers; bronze glow is rare and precious.
- **Motion:** confident, understated, expo/quart curves; every animation has a job (feedback,
  continuity, hierarchy, storytelling). No bounce, no decorative motion. Honor reduced-motion.
- **3D:** one hero moment + one signature piece; never behind text; progressive enhancement.
- **Contrast:** small bronze text must use `--color-bronze-hover` (~6:1), not `--color-bronze` (~4:1).
- **Semantic colors:** error/success/warning tokens to be added when forms/toasts arrive.

**Brand principles** — every component must pass all 11:

1. Restraint is luxury.
2. Whitespace is a feature, not empty space.
3. Motion must communicate — never decorate.
4. Every interaction feels intentional.
5. Hierarchy through space and scale, not boxes and lines.
6. Elevation comes from light and surface, not heavy shadows.
7. Bronze is an accent, not a coat of paint.
8. Content leads; effects serve.
9. Precision is the craft — alignment, rhythm, consistency.
10. Performance is design.
11. Negative space should attract attention before color does.
