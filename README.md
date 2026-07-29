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

## Routing

Six routes, one layout. Each page is a section component that used to live on a single
scrolling page — they were already self-contained, so becoming a route each cost them no
changes.

```
/            Hero
/about       About          /resume     Resume (PDF preview + download)
/skills      Skills         /contact    Contact
/projects    Projects       *           → redirect to /
```

- `content/navigation.js` is the single source for nav links, route order and tab titles.
- `app/RootLayout.jsx` holds the nav, footer, scroll-progress rail and back-to-top button,
  so they persist across navigation — that is what lets the nav indicator *slide* between
  links instead of blinking out and back.
- `app/Page.jsx` sets the document title and plays the entrance for every route.
- Scroll resets to the top on navigation. A client-side router does not do this for you.

> **Deploying:** this uses `BrowserRouter`, so real URLs (`/projects`, not `/#/projects`).
> Every static host needs one rule rewriting unknown paths to `index.html`, or a hard
> refresh on `/projects` 404s:
>
> - **Netlify** — add `public/_redirects` containing `/*  /index.html  200`
> - **Vercel** — add `vercel.json` with a rewrite of `/(.*)` → `/index.html`
> - **GitHub Pages** — cannot rewrite; either copy `dist/index.html` to `dist/404.html`
>   after building, or switch `main.jsx` to `HashRouter`.

## Motion

Framer Motion, wrapped in five primitives (`components/motion`). Features compose these
rather than importing `framer-motion` directly — reaching for the library in a feature
means either a genuinely one-off effect (the hero's scroll parallax) or a missing
primitive.

| Primitive | Use |
| --- | --- |
| `Reveal` | One block entering on scroll. The default. |
| `Stagger` / `StaggerItem` | A list arriving in sequence — one observer, not one per item. |
| `TextReveal` | Display type rising out of a mask. Rationed: hero + section titles. |
| `Magnetic` | Leans toward the cursor. Primary calls to action only. |
| `ScrollProgress` | The bronze hairline tracking read position. |

Variants live in `design-system/motion.js` and are built from `tokens.js`, so no duration
or easing is ever written at a call site.

**Reduced motion is handled once**, by `<MotionConfig reducedMotion="user">` in
`AppProviders`: Framer drops transforms and layout animations, keeps opacity. Two things
that config does *not* cover, and which therefore need handling by hand:

- **Motion values bound straight to `style`** (scroll parallax) bypass it entirely — collapse
  the travel with `useReducedMotion` yourself, as `Hero` does.
- **State that is communicated by transform** — the nav's menu/close icon is a CSS
  transition, not Framer, precisely because stripping its rotation would leave an open
  menu with no visible way to close it.

Scroll-*linked* motion (the experience spine, the progress rail) is left on: it maps 1:1
onto scroll position, so nothing happens that the reader did not directly cause.

## Design language (locked)

Theme: **Dark Walnut + Bronze** — *warm craftsmanship × engineered precision, held together by restraint.*

**Type stack — the native system font, no webfonts**

- **Display & body:** `system-ui` → San Francisco on Apple, Segoe UI on Windows, Roboto
  on Android. One family for both.
- **Mono:** `ui-monospace` → SF Mono / Consolas. Technical metadata, indices, tags.
- Eyebrows/overlines: mono, uppercase, `tracking-widest`, in bronze — the signature detail.
- Long-form text is constrained to the reading measure (`--container-prose`, ~65ch).

Nothing is downloaded, licensed, or requested from a CDN, so there is no flash of
fallback text and no third-party request before first paint. With one family doing both
display and body, hierarchy comes only from size, weight and space — which is what the
brand principles ask for anyway.

Two consequences worth knowing:

- `Heading` defaults to **bold** at the display steps and semibold below. System UI faces
  are optically lighter at large sizes than a purpose-built display face; semibold Segoe
  UI at 7rem reads thin.
- The type will not look pixel-identical across operating systems. That is the trade being
  made, and it is the same one GitHub and Stripe make.

`--font-display`, `--font-sans` and `--font-mono` are still separate tokens, so adding a
real display face later is a one-line edit in `theme.css` plus a declaration in
`design-system/styles/fonts.css`. No component names a font directly.

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
