import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { duration, easing } from '@/design-system/tokens'
import { seo } from '@/content/seo'

function setMeta(name, content, attribute = 'name') {
  if (!content) return

  let element = document.head.querySelector(`meta[${attribute}="${name}"]`)

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, name)
    document.head.appendChild(element)
  }

  element.setAttribute('content', content)
}

function setLink(rel, href) {
  if (!href) return

  let element = document.head.querySelector(`link[rel="${rel}"]`)

  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', rel)
    document.head.appendChild(element)
  }

  element.setAttribute('href', href)
}

/**
 * Page - the wrapper every route renders inside.
 *
 * Owns the document metadata and entrance motion for route changes. The SEO
 * work happens in the document head only, so page layout and visual styling do
 * not change.
 */
export function Page({ title, children }) {
  const location = useLocation()

  useEffect(() => {
    const pathname = location.pathname === '/' ? '/' : location.pathname.replace(/\/$/, '')
    const routeSeo = seo.routes[pathname] ?? seo.routes['/']
    const pageTitle = routeSeo.title || (title ? seo.titleTemplate.replace('%s', title) : seo.defaultTitle)
    const description = routeSeo.description || seo.defaultDescription
    const canonicalUrl = `${seo.siteUrl}${pathname === '/' ? '/' : pathname}`
    const keywords = seo.keywords.join(', ')

    document.title = pageTitle
    setMeta('description', description)
    setMeta('keywords', keywords)
    setMeta('robots', 'index, follow')
    setMeta('author', 'Krina Gajera')
    setMeta('og:title', pageTitle, 'property')
    setMeta('og:description', description, 'property')
    setMeta('og:url', canonicalUrl, 'property')
    setMeta('og:type', 'website', 'property')
    setMeta('og:site_name', seo.siteName, 'property')
    setMeta('og:locale', seo.locale, 'property')
    setMeta('twitter:card', 'summary')
    setMeta('twitter:title', pageTitle)
    setMeta('twitter:description', description)
    setLink('canonical', canonicalUrl)
  }, [location.pathname, title])

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: duration.slow, ease: easing.outExpo }}
    >
      {children}
    </motion.div>
  )
}
