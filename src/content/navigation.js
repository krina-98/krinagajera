/**
 * The nav links, in order.
 *
 * Home is listed explicitly. The wordmark also goes home, but a wordmark is a
 * convention rather than a signpost — plenty of people never learn it is
 * clickable, and on a multi-page site being unable to find the way back is a
 * dead end rather than a scroll.
 *
 * `end` marks a path that should only match exactly. Without it `/` counts as
 * active on every route, because React Router treats a `to` as a prefix — Home
 * would sit permanently highlighted alongside whichever page you were on.
 *
 * No `title` field: `App.jsx` declares the document title next to each route,
 * where the route and its component are already paired.
 */
export const routes = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/skills', label: 'Skills' },
  { to: '/projects', label: 'Projects' },
  { to: '/resume', label: 'Resume' },
  { to: '/contact', label: 'Contact' },
]
