// Simulated AI engine. Drop-in replaceable with OpenAI/Anthropic later.
// The `streamResponse` function yields tokens at a realistic cadence so
// the UI can stream them just like a real LLM.

import type { ChatMessage } from '@/types';

export const suggestedPrompts = [
  'What can Altivora AI do?',
  'How does pricing work?',
  'Show me an integration example',
  'Is my data secure?',
  'Compare you to other platforms',
  'How fast can I deploy?',
];

const knowledgeBase: Array<{ keywords: string[]; reply: string }> = [
  {
    keywords: ['hello', 'hi', 'hey', 'sup', 'yo', 'howdy'],
    reply:
      "Hey there — I'm Altivora, Altivora AI's resident concierge. I can answer product questions, walk you through pricing, show you a code sample, or just chat. What brings you in today?",
  },
  {
    keywords: ['pricing', 'cost', 'price', 'plan', 'how much', 'expensive'],
    reply:
      "We charge per conversation, not per message. Starter is $29/mo for 1,000 conversations, Pro is $99/mo for 15,000, and Enterprise is custom. Annual plans get two months free. Want me to break down which plan fits your volume?",
  },
  {
    keywords: ['demo', 'try', 'test', 'play'],
    reply:
      "You're already in the demo — but if you want the full playground head to /demo. You can switch models, tweak the system prompt, and watch streaming token-by-token. The whole thing runs without an API key thanks to the simulator.",
  },
  {
    keywords: ['feature', 'what can you do', 'capabilities', 'do you do'],
    reply:
      "Three things, really: (1) we route across GPT-4o, Claude 3.5, Gemini, and your own fine-tunes; (2) we ground every answer in your docs with citations and a hallucination check; (3) we ship a memory layer that survives across sessions. Most teams go live in under an hour.",
  },
  {
    keywords: ['secure', 'security', 'privacy', 'gdpr', 'soc 2', 'soc2', 'data'],
    reply:
      "SOC 2 Type II, HIPAA-ready, and GDPR-native with EU data residency. Your data is never used to train models — ours or anyone else's. Enterprise plans include zero-retention routing, BYO keys, and audit logs streamed to your SIEM.",
  },
  {
    keywords: ['integrate', 'integration', 'sdk', 'api', 'webhook'],
    reply:
      "We ship typed SDKs for TypeScript, Python, Go, and Ruby. Native integrations include Slack, Intercom, Zendesk, Freshdesk, HubSpot, Salesforce, Notion, and Linear. Anything else, drop a webhook on a conversation event and you're set.",
  },
  {
    keywords: ['compare', 'vs', 'competitor', 'better than', 'alternative'],
    reply:
      "Honest answer: if you only need a chat widget for FAQs, off-the-shelf tools work. Where we win is when you need conversation memory, multi-model routing, voice, and the kind of analytics that survive a board meeting. We're the platform you grow into.",
  },
  {
    keywords: ['deploy', 'install', 'setup', 'how long', 'quickly'],
    reply:
      "From signup to live widget on your site: 7 minutes is the current median. Pick a template, paste your knowledge sources, drop the embed snippet, and you're live. If you have a Figma file we can match the design tokens automatically.",
  },
  {
    keywords: ['voice', 'phone', 'call', 'speak'],
    reply:
      "Voice agents are GA. Sub-700ms median latency, 40+ languages, native Twilio and Vonage support, custom voice cloning on enterprise. Most callers don't realize they're talking to AI — we ship a disclosure prompt for compliance.",
  },
  {
    keywords: ['hallucinate', 'hallucination', 'wrong', 'made up', 'accurate'],
    reply:
      "Four-layer defense: retrieval grounding, claim extraction, uncertainty surfacing, and human escalation when confidence drops. Production accuracy averages 98.4% — closer to 99.6% on grounded knowledge bots.",
  },
  {
    keywords: ['memory', 'remember', 'forget', 'history'],
    reply:
      "Yes — persistent memory across sessions, devices, and channels. Three tiers: hot (last 50 turns, sub-15ms), warm (90-day compressed profile), cold (full archive with vector retrieval). Users can ask the bot to forget and it actually does.",
  },
  {
    keywords: ['model', 'gpt', 'claude', 'gemini', 'llm'],
    reply:
      "All of them. GPT-4o, GPT-4o mini, Claude 3.5 Sonnet and Haiku, Gemini 1.5 Pro, Llama 3.1, Mistral Large, and any private fine-tune you bring. Our router picks the best model per turn — cuts cost about 64% without dropping quality.",
  },
  {
    keywords: ['language', 'languages', 'translate', 'multilingual'],
    reply:
      "95+ languages with locale-aware tone. The bot doesn't just translate — it transcreates. Idioms, register, cultural references, all handled. Your customer in Osaka and your customer in Lagos both get a bot that sounds native.",
  },
  {
    keywords: ['self-host', 'self host', 'on-prem', 'on prem', 'vpc'],
    reply:
      "Yes, Enterprise plans support full self-hosting via Terraform on AWS, GCP, or Azure. We also offer managed VPC deployments if you want the convenience without running the infra. The control plane and data plane separate cleanly.",
  },
  {
    keywords: ['support', 'help', 'contact'],
    reply:
      "I can answer most things right here. For anything I can't, Pro plans get 4-hour SLA on email, Enterprise gets 24/7 phone + Slack. You can also drop a note at /contact and someone human will pick it up within the hour during business hours.",
  },
  {
    keywords: ['thank', 'thanks', 'appreciate'],
    reply:
      "Anytime. If you want a deeper dive, the docs have working code samples for every SDK, and the /demo page lets you stress-test the model with your own prompts. Anything else on your mind?",
  },
  {
    keywords: ['who are you', 'what are you', 'are you human', 'are you ai'],
    reply:
      "I'm Forge — the in-product AI built on Altivora itself. Yes, I'm an AI. I'm running a simulated response engine right now so you can try the experience without an API key, but the same architecture is what powers production bots.",
  },
];

const fallbackReplies = [
  "That's a great question. Let me give you the short version: Altivora AI lets you build, deploy, and scale conversational agents with memory, multi-model routing, and grounded answers. Want me to go deeper on any of those?",
  "Tell me a bit more about your use case and I can point you to the right starting place — support, sales, knowledge base, or something custom?",
  "I want to make sure I give you a useful answer. Could you rephrase or share what you're trying to accomplish? I can also walk you through specific features if you'd like.",
  "Good question. Most teams arrive looking for one of three things: a support agent that resolves tickets, a sales bot that books meetings, or a knowledge layer over their docs. Any of those ring a bell?",
];

function pickReply(message: string): string {
  const m = message.toLowerCase().trim();
  for (const entry of knowledgeBase) {
    if (entry.keywords.some((k) => m.includes(k))) {
      return entry.reply;
    }
  }
  return fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];
}

export function generateResponse(messages: ChatMessage[]): string {
  const lastUser = [...messages].reverse().find((m) => m.role === 'user');
  if (!lastUser) return 'Hi! Ask me anything about Altivora AI.';
  return pickReply(lastUser.content);
}

// Stream tokens with realistic timing for typing effect
export async function* streamTokens(text: string, opts?: { tokensPerChunk?: number; delayMs?: number }) {
  const tokensPerChunk = opts?.tokensPerChunk ?? 2;
  const delayMs = opts?.delayMs ?? 35;
  const words = text.split(/(\s+)/); // preserve whitespace
  let buffer = '';
  let count = 0;
  for (const w of words) {
    buffer += w;
    count += 1;
    if (count >= tokensPerChunk) {
      yield buffer;
      buffer = '';
      count = 0;
      await new Promise((r) => setTimeout(r, delayMs + Math.random() * 25));
    }
  }
  if (buffer) yield buffer;
}
