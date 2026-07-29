import { GithubIcon, LinkedinIcon, MailIcon } from './icons'

/**
 * Name → component, so the content layer can pick an icon by string without
 * importing React components into `content/`. `profile.links[].icon` reads
 * from this.
 *
 * In its own module rather than alongside the icons: a `.jsx` file that exports
 * both components and a plain object breaks React Fast Refresh, which can only
 * hot-swap a module when everything it exports is a component. Splitting the
 * constant out keeps edits to the icons themselves live-reloading.
 */
export const iconsByName = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  email: MailIcon,
}
