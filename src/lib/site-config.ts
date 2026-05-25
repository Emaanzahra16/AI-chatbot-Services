export const siteConfig = {
  name: 'BotForge AI',
  shortName: 'BotForge',
  tagline: 'Forge intelligent conversations.',
  description:
    'BotForge AI is the enterprise platform to build, train, and deploy production-grade AI chatbots in minutes — with conversation memory, streaming, and analytics.',
  url: 'https://botforge.ai',
  ogImage: '/og.png',
  twitter: '@botforgeai',
  email: 'hello@botforge.ai',
  links: {
    twitter: 'https://twitter.com/botforgeai',
    github: 'https://github.com/botforgeai',
    linkedin: 'https://linkedin.com/company/botforgeai',
    discord: 'https://discord.gg/botforgeai',
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
