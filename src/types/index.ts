export type ChatRole = 'user' | 'assistant' | 'system';

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: string;
}

export interface Conversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface PricingTier {
  id: 'starter' | 'pro' | 'enterprise';
  name: string;
  price: { monthly: number; yearly: number };
  description: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
  badge?: string;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  rating: number;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: { name: string; avatar: string; role: string };
  publishedAt: string;
  readTime: number;
  tags: string[];
  coverGradient: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
  color: string;
}

export interface AnalyticsMetric {
  label: string;
  value: string;
  change: number;
  trend: 'up' | 'down';
  spark: number[];
}
