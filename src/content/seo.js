import { profile, projects, technologyGroups } from '@/content'

const siteName = `${profile.name} Portfolio`
const siteUrl = 'https://krinagajera.com'

const coreKeywords = [
  'Krina Gajera',
  'Krina Gajera portfolio',
  'Frontend Developer Surat',
  'Frontend Developer Gujarat',
  'Frontend Developer India',
  'Frontend Developer portfolio',
  'Frontend Engineer portfolio',
  'React Developer Surat',
  'React Developer Gujarat',
  'React Developer India',
  'React.js Developer',
  'Next.js portfolio',
  'MERN Stack Developer',
  'MERN Developer portfolio',
  'Full Stack Developer portfolio',
  'Web Developer portfolio',
  'Web Developer Surat',
  'Web Developer Gujarat',
  'Web Application Developer',
  'React portfolio',
  'Next.js Developer',
  'TypeScript Developer',
  'JavaScript Developer',
  'UI Developer',
  'UI Engineer',
  'User Interface Developer',
  'Frontend Engineer',
  'Frontend Web Developer',
  'Responsive Web Design',
  'Single Page Application',
  'SPA Developer',
  'React Hooks',
  'React Router',
  'REST API Integration',
  'API Integration',
  'Real-time Web App',
  'AI Chat Interface',
  'Admin Dashboard Developer',
  'Dashboard UI Developer',
  'Property Management Platform',
  'Cricket App Developer',
  'Portfolio Website',
  'Personal Portfolio',
  'Hire Frontend Developer',
  'Frontend Developer Resume',
  'Computer Engineering Portfolio',
  'Zustand',
  'Redux',
  'Socket.IO',
  'Tailwind CSS',
  'accessibility',
  'Lighthouse performance',
]

const technologyKeywords = technologyGroups.flatMap((group) => group.items)
const projectKeywords = projects.flatMap((project) => [
  project.name,
  project.kind,
  ...project.stack,
])

export const seo = {
  siteName,
  siteUrl,
  locale: 'en_IN',
  defaultTitle: `${profile.name} - ${profile.role}`,
  titleTemplate: `%s - ${profile.name}`,
  defaultDescription:
    'Krina Gajera is a frontend developer in Surat, Gujarat building React, Next.js and TypeScript interfaces for real-time apps, AI chat products, dashboards and accessible web experiences.',
  keywords: Array.from(new Set([...coreKeywords, ...technologyKeywords, ...projectKeywords])),
  routes: {
    '/': {
      title: `${profile.name} - ${profile.role}`,
      description:
        'Portfolio of Krina Gajera, a frontend developer from Surat building React, Next.js, TypeScript and MERN stack web interfaces.',
    },
    '/about': {
      title: `About - ${profile.name}`,
      description:
        'Learn about Krina Gajera, a frontend developer from Surat, India focused on polished, performant and accessible web interfaces.',
    },
    '/skills': {
      title: `Skills - ${profile.name}`,
      description:
        'Frontend skills across React, Next.js, TypeScript, JavaScript, Zustand, Redux, Tailwind CSS, accessibility, testing and performance.',
    },
    '/projects': {
      title: `Projects - ${profile.name}`,
      description:
        'Selected frontend projects by Krina Gajera including CrickEdge, Appinvento, Hobson and MoveWork across real-time, AI, maps and admin dashboards.',
    },
    '/resume': {
      title: `Resume - ${profile.name}`,
      description:
        'Resume of Krina Gajera, frontend developer experienced with React, Next.js, TypeScript, testing, accessibility and web performance.',
    },
    '/contact': {
      title: `Contact - ${profile.name}`,
      description:
        'Contact Krina Gajera for frontend developer roles, React projects, TypeScript interfaces and modern web application work.',
    },
  },
}
