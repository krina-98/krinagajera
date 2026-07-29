import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { AppProviders } from '@/app/AppProviders'
import { RootLayout } from '@/app/RootLayout'
import { Page } from '@/app/Page'
import { About, Contact, Hero, Projects, Resume, Skills } from '@/features/portfolio'

/**
 * The route table.
 *
 * The site is five pages plus a home. It used to be one long page split by
 * anchors; each section was already self-contained, so becoming a route each
 * cost them no changes at all — only this file, the layout and the nav.
 *
 * `Experience` is not routed. The résumé covers the same ground — employment
 * history and education — in the format a recruiter asks for anyway. The
 * component still exists and is still exported, so restoring it is one import,
 * one `<Route>` and one entry in `content/navigation.js`.
 *
 * `AnimatePresence` is keyed on `pathname` so the outgoing page can finish its
 * exit before the incoming one mounts. `mode="wait"` matters here: without it
 * both pages are in the document at once and the layout jumps as the taller of
 * the two pushes the footer around mid-transition.
 */
export default function App() {
  const location = useLocation()

  return (
    <AppProviders>
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route element={<RootLayout />}>
            <Route index element={<Page><Hero /></Page>} />
            <Route path="about" element={<Page title="About"><About /></Page>} />
            <Route path="skills" element={<Page title="Skills"><Skills /></Page>} />
            <Route path="projects" element={<Page title="Projects"><Projects /></Page>} />
            <Route path="resume" element={<Page title="Resume"><Resume /></Page>} />
            <Route path="contact" element={<Page title="Contact"><Contact /></Page>} />

            {/* Anything unrecognised goes home rather than showing a blank
                layout. A portfolio has no use for a 404 page. */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </AppProviders>
  )
}
