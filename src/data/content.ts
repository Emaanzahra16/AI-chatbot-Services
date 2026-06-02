import type { Feature, Service, Testimonial, FAQ, PricingTier } from '@/types';

export const features: Feature[] = [
  {
    icon: 'Sparkles',
    title: 'Multi-model intelligence',
    description:
      'Route between GPT-4o, Claude 3.5, Gemini, and your own fine-tunes — automatically picking the best model for each turn.',
  },
  {
    icon: 'Brain',
    title: 'Persistent memory',
    description:
      'Long-term conversation memory with vector retrieval. Your bot remembers customers across sessions, devices, and channels.',
  },
  {
    icon: 'Zap',
    title: 'Streaming responses',
    description:
      'Token-by-token delivery with sub-200ms time-to-first-token. Conversations feel alive, not robotic.',
  },
  {
    icon: 'Shield',
    title: 'SOC 2 + GDPR ready',
    description:
      'Enterprise-grade encryption at rest and in transit. EU data residency, audit logs, and SSO out of the box.',
  },
  {
    icon: 'BarChart3',
    title: 'Conversation analytics',
    description:
      'Sentiment, intent, drop-off, and CSAT — measured in real time across every chat. Export to your warehouse.',
  },
  {
    icon: 'Code2',
    title: 'Developer-first API',
    description:
      'Typed SDKs for JS, Python, Go, and Ruby. Webhooks, function calling, and a full OpenAPI spec.',
  },
  {
    icon: 'Globe',
    title: '95+ languages',
    description:
      'Native multilingual support with locale-aware tone. Translate, transcreate, and localize in one click.',
  },
  {
    icon: 'Workflow',
    title: 'Visual flow builder',
    description:
      'Drag-and-drop logic with deterministic fallbacks. Mix LLM reasoning with rule-based guardrails.',
  },
  {
    icon: 'Mic',
    title: 'Voice in & voice out',
    description:
      'Whisper-grade transcription paired with neural voices. Build phone bots, voice widgets, or in-car assistants.',
  },
];

export const services: Service[] = [
  {
    id: 'customer-support',
    icon: 'Headphones',
    title: 'Autonomous Support Agent',
    description:
      'A 24/7 tier-1 support agent that resolves 73% of tickets without a human touching them. Escalates with full context when it can\'t.',
    features: [
      'Zendesk, Intercom, Freshdesk native integrations',
      'Auto-tagging and routing by intent',
      'Multilingual with locale-aware tone',
      'CSAT-aware response calibration',
    ],
    color: 'from-violet-500 to-fuchsia-500',
  },
  {
    id: 'sales-assistant',
    icon: 'TrendingUp',
    title: 'Sales Co-Pilot',
    description:
      'Qualifies, books, and warms leads while your reps sleep. Talks like your top SDR and never forgets a follow-up.',
    features: [
      'BANT and MEDDIC scoring built in',
      'Calendar booking with timezone awareness',
      'CRM sync (Salesforce, HubSpot, Attio)',
      'A/B testing on every opener',
    ],
    color: 'from-cyan-500 to-blue-500',
  },
  {
    id: 'knowledge-base',
    icon: 'BookOpen',
    title: 'Knowledge Concierge',
    description:
      'Turn your docs, wikis, and PDFs into a single conversational interface. Always cited, never hallucinated.',
    features: [
      'Notion, Confluence, Google Drive, GitHub ingest',
      'Source citations on every answer',
      'Hallucination detection layer',
      'Per-document access control',
    ],
    color: 'from-emerald-500 to-cyan-500',
  },
  {
    id: 'voice-agents',
    icon: 'Phone',
    title: 'Voice Agents',
    description:
      'Phone bots that pass the human test. Sub-700ms turn latency with neural voices in 40+ languages.',
    features: [
      'Twilio, Vonage, and SIP support',
      'Real-time barge-in and interruption',
      'Custom voice cloning available',
      'Compliance recording and redaction',
    ],
    color: 'from-amber-500 to-pink-500',
  },
  {
    id: 'custom-llm',
    icon: 'Cpu',
    title: 'Custom Model Training',
    description:
      'We fine-tune a private model on your domain, your tone, and your data. Hosted on dedicated GPUs you control.',
    features: [
      'LoRA, QLoRA, and full fine-tunes',
      'Eval suite for regression tracking',
      'BYO infrastructure (AWS, GCP, Azure)',
      'Quarterly retraining included',
    ],
    color: 'from-rose-500 to-violet-500',
  },
  {
    id: 'analytics',
    icon: 'PieChart',
    title: 'Conversation Intelligence',
    description:
      'Mine every conversation for product insights, churn signals, and revenue opportunities your CS team will miss.',
    features: [
      'Topic clustering with weekly digests',
      'Churn-risk and upsell detection',
      'Warehouse sync (Snowflake, BigQuery, Redshift)',
      'Custom dashboards and alerts',
    ],
    color: 'from-blue-500 to-indigo-500',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Mira Okafor',
    role: 'VP of Customer Experience',
    company: 'Lumen Health',
    avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=mira&backgroundColor=8b5cf6',
    quote:
      'We replaced a 14-person tier-1 team with Altivora and CSAT actually went up six points. The thing genuinely sounds like our brand.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Daichi Watanabe',
    role: 'Head of Growth',
    company: 'Northwind Robotics',
    avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=daichi&backgroundColor=22d3ee',
    quote:
      'Pipeline up 41% in the first quarter. The sales co-pilot books meetings while we sleep and the leads show up actually qualified.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Elena Ferrari',
    role: 'CTO',
    company: 'Strato Logistics',
    avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=elena&backgroundColor=7c3aed',
    quote:
      'The SDK is the cleanest I\'ve used since Stripe. We shipped a custom-trained dispatch bot in 11 days, end to end.',
    rating: 5,
  },
  {
    id: '4',
    name: 'Marcus Beaumont',
    role: 'Founder & CEO',
    company: 'Tabula',
    avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=marcus&backgroundColor=06b6d4',
    quote:
      'We evaluated nine platforms. Altivora was the only one that didn\'t hallucinate on our compliance docs. That ended the search.',
    rating: 5,
  },
  {
    id: '5',
    name: 'Priya Krishnan',
    role: 'Director of Engineering',
    company: 'Vertex Capital',
    avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=priya&backgroundColor=a78bfa',
    quote:
      'Onboarded the entire firm in a weekend. The audit trail and SSO meant our security team didn\'t flinch — first time for an AI vendor.',
    rating: 5,
  },
  {
    id: '6',
    name: 'Theo Karlsson',
    role: 'Product Lead',
    company: 'Fjord Studios',
    avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=theo&backgroundColor=f472b6',
    quote:
      'The voice agent passes for human on roughly 80% of calls. We had to add a disclosure prompt for legal — that\'s the bar now.',
    rating: 5,
  },
];

export const faqs: FAQ[] = [
  {
    question: 'How long does it take to deploy a chatbot?',
    answer:
      'Most teams ship their first production bot in under 30 minutes. We provide pre-trained templates for support, sales, and knowledge use cases, and the visual builder gets you from idea to live in a single sitting.',
  },
  {
    question: 'Which LLMs do you support?',
    answer:
      'GPT-4o, GPT-4o mini, Claude 3.5 Sonnet, Claude 3.5 Haiku, Gemini 1.5 Pro, Llama 3.1, Mistral Large, and any private fine-tune you bring. The router automatically picks the most cost-effective model that meets your quality bar.',
  },
  {
    question: 'Is my data used to train models?',
    answer:
      'Never. Your conversations and documents are encrypted at rest with per-tenant keys and are never used for model training — ours or any provider\'s. Enterprise plans include zero-retention routing through partner APIs.',
  },
  {
    question: 'Can I self-host Altivora?',
    answer:
      'Yes. Enterprise customers can deploy the full stack on their own AWS, GCP, or Azure tenancy with Terraform modules we provide. We also offer a managed VPC deployment for teams that want the convenience without the operational overhead.',
  },
  {
    question: 'What about hallucinations?',
    answer:
      'Every knowledge-grounded answer is run through our hallucination detector before it reaches the user. We compare claims against retrieved sources and either cite them, hedge, or escalate to a human. Production accuracy averages 98.4%.',
  },
  {
    question: 'Do you support voice and phone?',
    answer:
      'Absolutely. Voice agents speak in 40+ languages over Twilio, Vonage, or any SIP trunk with sub-700ms turn latency. We support custom voice cloning, real-time barge-in, and compliance-grade call recording.',
  },
  {
    question: 'How is pricing structured?',
    answer:
      'We charge per conversation, not per message — so a 200-turn deep dive costs the same as a 3-turn greeting. Enterprise plans include unlimited conversations and a flat platform fee. No per-seat charges, ever.',
  },
  {
    question: 'What happens if I cancel?',
    answer:
      'You keep access through the end of the billing period and can export every conversation, every prompt, and every fine-tune via the API. We don\'t hold your data hostage — that\'s in the contract.',
  },
];

export const pricingTiers: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: { monthly: 29, yearly: 290 },
    description: 'Everything an indie or small team needs to ship a great bot.',
    features: [
      '1,000 conversations / month',
      '3 chatbots',
      'GPT-4o mini & Claude Haiku',
      'Conversation memory (30 days)',
      'Email support',
      'Basic analytics',
      'Public widget embed',
    ],
    cta: 'Start free trial',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: { monthly: 99, yearly: 990 },
    description: 'For growing companies that need scale, integrations, and polish.',
    features: [
      '15,000 conversations / month',
      'Unlimited chatbots',
      'All frontier models (GPT-4o, Claude 3.5, Gemini)',
      'Persistent memory (unlimited)',
      'Voice agents (1,000 min/mo)',
      'Advanced analytics & exports',
      'CRM, helpdesk, and Slack integrations',
      'Priority support (4h SLA)',
    ],
    highlighted: true,
    badge: 'Most popular',
    cta: 'Start free trial',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: { monthly: 0, yearly: 0 },
    description: 'Custom infrastructure, dedicated success, and the legal paperwork your CISO needs.',
    features: [
      'Unlimited conversations',
      'Custom-trained private models',
      'Dedicated GPU infrastructure',
      'SOC 2 Type II, HIPAA, GDPR',
      'SSO/SAML + audit logs',
      'On-prem / VPC deployment',
      '99.99% uptime SLA',
      'Dedicated solutions architect',
      '24/7 phone + Slack support',
    ],
    cta: 'Talk to sales',
  },
];
