/**
 * Section ids double as scroll targets, nav hrefs and the observer list that
 * drives active-link highlighting — one array, so they cannot drift apart.
 *
 * The hero is deliberately absent: it is the top of the page, reachable by the
 * wordmark, and listing it would put a link in the nav that scrolls to where
 * the reader already is.
 */
export const sections = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]
