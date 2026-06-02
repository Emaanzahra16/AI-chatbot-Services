export const siteConfig = {
  name: 'Altivora AI',
  shortName: 'Altivora',
  tagline: 'Forge intelligent conversations.',
  description:
    'Altivora AI is the enterprise platform to build, train, and deploy production-grade AI chatbots in minutes — with conversation memory, streaming, and analytics.',
  url: 'https://altivora.ai',
  ogImage: '/og.png',
  twitter: '@altivoraai',
  email: 'hello@altivora.ai',
  links: {
    twitter: 'https://twitter.com/altivoraai',
    github: 'https://github.com/altivoraai',
    linkedin: 'https://linkedin.com/company/altivoraai',
    discord: 'https://discord.gg/altivoraai',
  },
  keywords: [
    'AI chatbot',
    'conversational AI',
    'GPT chatbot',
    'AI customer support',
    'chatbot builder',
    'enterprise AI',
    'LLM platform',
    'AI SaaS',
  ],
} as const;

export const navigation = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/demo', label: 'AI Demo' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
] as const;

export const footerNav = {
  product: [
    { href: '/services', label: 'Services' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/demo', label: 'Live Demo' },
    { href: '/dashboard', label: 'Dashboard' },
  ],
  company: [
    { href: '/about', label: 'About' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
    { href: '#', label: 'Careers' },
  ],
  resources: [
    { href: '#', label: 'Documentation' },
    { href: '#', label: 'API Reference' },
    { href: '#', label: 'Status' },
    { href: '#', label: 'Changelog' },
  ],
  legal: [
    { href: '#', label: 'Privacy' },
    { href: '#', label: 'Terms' },
    { href: '#', label: 'Security' },
    { href: '#', label: 'DPA' },
  ],
};
