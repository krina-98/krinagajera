import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@/design-system/styles/globals.css'
import App from '@/app/App'

/**
 * `BrowserRouter`, not `HashRouter`: real URLs (`/projects`, not `/#/projects`)
 * are what gets shared, indexed and pasted into a job application.
 *
 * The cost is one line of host configuration — every deep link has to be
 * rewritten to `index.html`, or a hard refresh on `/projects` returns a 404
 * from the static host. See the deployment note in the README; on GitHub Pages
 * specifically this needs the 404.html fallback, since it cannot rewrite.
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
