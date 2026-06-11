// Simulated AI engine. Drop-in replaceable with OpenAI/Anthropic later.

import type { ChatMessage } from '@/types';

export const suggestedPrompts = [
  'What can Altivora AI do?',
  'How does pricing work?',
  'Show me an integration example',
  'Is my data secure?',
  'Compare you to other platforms',
  'How fast can I deploy?',
];

// 🧠 DETECT HIGH-INTENT SALES KEYWORDS
const salesTriggers = [
  'buy',
  'pricing',
  'price',
  'cost',
  'plan',
  'demo',
  'trial',
  'subscribe',
  'upgrade',
  'start',
  'enterprise',
];

// -------------------------------
// KNOWLEDGE BASE (UNCHANGED CORE)
// -------------------------------
const knowledgeBase: Array<{ keywords: string[]; reply: string }> = [
  {
    keywords: ['hello', 'hi', 'hey', 'sup', 'yo', 'howdy'],
    reply:
      "Hey there — I'm Altivora, your AI concierge. I can help you explore pricing, demos, integrations, or set up a full chatbot in minutes. What are you trying to build?",
  },
  {
    keywords: ['pricing', 'cost', 'price', 'plan', 'how much', 'expensive'],
    reply:
      "We charge per conversation, not per message. Starter is $29/mo for 1,000 conversations, Pro is $99/mo for 15,000, and Enterprise is custom. If you're evaluating, I can recommend the best plan based on your use case.",
  },
  {
    keywords: ['demo', 'try', 'test', 'play'],
    reply:
      "You're already in the demo. If you want a full experience, go to /demo where you can switch models, tweak system prompts, and see real-time streaming responses.",
  },
  {
    keywords: ['feature', 'what can you do', 'capabilities', 'do you do'],
    reply:
      "We provide multi-model routing (GPT, Claude, Gemini), persistent memory, and grounded answers with citations. Most teams deploy in under an hour.",
  },
  {
    keywords: ['secure', 'security', 'privacy', 'gdpr', 'soc 2', 'data'],
    reply:
      "We are GDPR-compliant, SOC2-ready, and never train models on your data. Enterprise supports zero-retention and full audit logs.",
  },
  {
    keywords: ['integrate', 'integration', 'sdk', 'api', 'webhook'],
    reply:
      "We offer SDKs for TypeScript, Python, Go, and REST APIs with webhooks. You can integrate in under 10 minutes.",
  },
  {
    keywords: ['compare', 'vs', 'competitor', 'better than'],
    reply:
      "Simple tools handle FAQs. We handle full AI systems: memory, routing, analytics, and automation. That's the difference.",
  },
  {
    keywords: ['deploy', 'install', 'setup', 'how long'],
    reply:
      "You can deploy in under 10 minutes using our embed script. No backend required.",
  },
  {
    keywords: ['voice', 'phone', 'call'],
    reply:
      "Voice agents are live with sub-700ms latency and multi-language support.",
  },
  {
    keywords: ['memory', 'remember'],
    reply:
      "Yes — persistent memory across sessions. Users can also request deletion anytime.",
  },
  {
    keywords: ['model', 'gpt', 'claude', 'gemini'],
    reply:
      "We support GPT-4o, Claude 3.5, Gemini, and route automatically for cost + quality.",
  },
  {
    keywords: ['support', 'help'],
    reply:
      "I can help instantly. For enterprise users, human support is also available 24/7.",
  },
  {
    keywords: ['thank', 'thanks'],
    reply:
      "Anytime — let me know if you want help setting up your first bot.",
  },
  {
    keywords: ['who are you'],
    reply:
      "I'm Altivora AI — a production-grade conversational assistant running a simulated engine for demo purposes.",
  },
];

// -------------------------------
// FALLBACK (IMPROVED, NOT RANDOM)
// -------------------------------
const fallbackReplies = [
  "I can help you set up an AI chatbot, compare pricing plans, or even deploy a working assistant in minutes. What are you trying to achieve?",
  "If you're exploring Altivora, I recommend starting with pricing or the demo — both show real capabilities in action.",
  "Most users come here to either build a support bot, a sales assistant, or an internal knowledge AI. Which one fits you?",
  "I can walk you through integrations, deployment, or enterprise setup depending on your goal.",
];

// -------------------------------
// SMART REPLY ENGINE (UPGRADED)
// -------------------------------
function pickReply(message: string): string {
  const m = message.toLowerCase().trim();

  // 🧠 1. SALES INTENT OVERRIDE (NEW)
  if (salesTriggers.some((k) => m.includes(k))) {
    return "Good question — most teams start with our Pro plan at $99/month. It includes 15,000 conversations, API access, and full automation. Want me to help you choose the right setup or start a free trial?";
  }

  // 🧠 2. NORMAL KNOWLEDGE BASE
  for (const entry of knowledgeBase) {
    if (entry.keywords.some((k) => m.includes(k))) {
      return entry.reply;
    }
  }

  // 🧠 3. SMART FALLBACK (NON-RANDOM ANYMORE)
  return fallbackReplies[0];
}

// -------------------------------
// PUBLIC API
// -------------------------------
export function generateResponse(messages: ChatMessage[]): string {
  const lastUser = [...messages].reverse().find((m) => m.role === 'user');
  if (!lastUser) return 'Hi! Ask me anything about Altivora AI.';
  return pickReply(lastUser.content);
}

// -------------------------------
// STREAM ENGINE (UNCHANGED, CLEANED)
// -------------------------------
export async function* streamTokens(
  text: string,
  opts?: { tokensPerChunk?: number; delayMs?: number }
) {
  const tokensPerChunk = opts?.tokensPerChunk ?? 2;
  const delayMs = opts?.delayMs ?? 35;

  const words = text.split(/(\s+)/);
  let buffer = '';
  let count = 0;

  for (const w of words) {
    buffer += w;
    count++;

    if (count >= tokensPerChunk) {
      yield buffer;
      buffer = '';
      count = 0;
      await new Promise((r) => setTimeout(r, delayMs + Math.random() * 25));
    }
  }

  if (buffer) yield buffer;
}