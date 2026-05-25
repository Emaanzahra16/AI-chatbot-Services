import type { BlogPost } from '@/types';

export const blogPosts: BlogPost[] = [
  {
    slug: 'building-bots-that-remember',
    title: 'Building Bots That Actually Remember You',
    excerpt:
      'Most chatbots forget who you are between sessions. Here\'s how we built a memory layer that scales to millions of users without breaking the latency budget.',
    content: `
For three years, the dirty secret of conversational AI has been simple: nobody remembered you. You'd tell a bot your name on Monday, and on Tuesday it would greet you like a stranger. We thought this was fine. It wasn't.

## The cold-start problem

Every conversation that begins with "Hi, how can I help you?" is a tax on the user. They have to re-explain who they are, what they're building, and what they tried last week. The most expensive thing in conversational AI isn't tokens — it's the time users spend onboarding the same bot over and over.

So we built a memory layer. Not a transcript. Not a session cache. A real, durable, queryable model of who each user is and what they care about.

## The architecture

Three tiers, ordered by access frequency:

**Hot memory** — the last 50 turns, kept in a vector store with a 1-hour TTL. Sub-15ms retrieval. This is what makes a bot feel like it's listening *right now*.

**Warm memory** — everything from the past 90 days, compressed into a structured profile by a nightly distillation job. Personality, preferences, open tasks, unresolved questions.

**Cold memory** — the full history, stored in Postgres with embeddings in pgvector. Hit it for forensic questions like "what did we agree on six months ago?"

## The hard part wasn't storage

The hard part was forgetting. Memory without decay is a liability. We weight every memory by recency, frequency of recall, and the user's own feedback ("forget that"). Anything below a threshold gets archived. Anything explicitly marked as sensitive gets purged on schedule.

## What changed

Bots built on the new memory layer see a 4.2x increase in repeat engagement and a 31% drop in average conversation length — because users don't have to repeat themselves. That's the metric that matters.
    `,
    author: {
      name: 'Alina Voss',
      avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=alina',
      role: 'Co-founder & CTO',
    },
    publishedAt: '2026-04-18',
    readTime: 7,
    tags: ['Engineering', 'Memory', 'Architecture'],
    coverGradient: 'from-violet-600 via-fuchsia-500 to-cyan-500',
  },
  {
    slug: 'the-cost-of-hallucination',
    title: 'The Real Cost of Hallucination (And How to Pay Less of It)',
    excerpt:
      'A single hallucinated answer in a financial chatbot cost one of our customers $1.2M in a single afternoon. Here\'s the playbook we wrote in response.',
    content: `
The customer is a mid-market fintech. The bot confidently told a user that their account was insured up to a number that was, generously, fictional. The user posted it on X. The post went viral. The CFO called us at 9:47 PM.

We fixed it. Then we wrote this playbook.

## Hallucination isn't randomness

It's a confidence calibration failure. The model is just as certain about a hallucinated answer as a correct one — that's what makes it dangerous. The fix isn't a better model. It's a better confidence signal.

## Four layers of defense

**Retrieval grounding** — every factual claim must be backed by a source the bot retrieved. No source, no claim. The bot hedges instead.

**Claim extraction** — we parse the response, extract every factual claim, and verify each one against the retrieved corpus. Anything that doesn't match gets rewritten or removed.

**Uncertainty surfacing** — when the bot is genuinely unsure, it says so. "I'm not certain, but my best guess is X" beats a confident wrong answer every time.

**Human handoff** — anything classified as high-stakes (money, medical, legal) routes to a human if confidence drops below a tunable threshold. Most of our customers set it at 85%.

## The numbers

Production hallucination rate across the platform: 1.6%. On grounded knowledge bots: 0.4%. Customers who turn on all four layers see fewer than one hallucination per 10,000 conversations. That's the number we report at QBRs.
    `,
    author: {
      name: 'Renata Sokolov',
      avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=renata',
      role: 'Head of AI Safety',
    },
    publishedAt: '2026-03-22',
    readTime: 6,
    tags: ['Safety', 'Hallucination', 'Production'],
    coverGradient: 'from-rose-600 via-violet-500 to-blue-500',
  },
  {
    slug: 'voice-agents-passing-the-human-test',
    title: 'Voice Agents Are Quietly Passing the Human Test',
    excerpt:
      'Sub-700ms latency, neural voices, and real-time barge-in. We pulled the curtain back on what it takes to make a phone bot people don\'t hang up on.',
    content: `
Last quarter, one of our customers — a logistics company — disclosed in their compliance review that 78% of inbound callers did not realize they were speaking to an AI. That number is up from 11% eighteen months ago.

This is not because voices got better, though they did. It's because *the conversational fabric* got better.

## The latency budget

Humans expect a turn to take about 200 milliseconds. Anything longer feels off. Anything over 1.5 seconds, and they think you're not paying attention.

That 200ms has to fit transcription, model inference, and voice synthesis. Each one used to take longer than the whole budget. So we re-architected:

- Transcription is streamed, not batched. The model starts generating before the user finishes speaking.
- The LLM generates speakable chunks of 8-12 words at a time, not full responses.
- Voice synthesis starts on the first chunk and continues in parallel with generation.
- Barge-in is detected at the audio layer in under 80ms.

End to end: 640ms median, 880ms p95. Indistinguishable from a slightly-thinking human.

## What we got wrong

For a long time, we optimized for naturalness of voice. Wrong axis. What people actually notice is *rhythm* — the pauses, the "uh", the slight overlap when you agree. We added those back deliberately. Engagement went up.

## What's next

Phone bots that can be interrupted, redirected, and walked back. That's the next bar. We're shipping it in Q3.
    `,
    author: {
      name: 'Jonas Bek',
      avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=jonas',
      role: 'Voice Engineering Lead',
    },
    publishedAt: '2026-02-09',
    readTime: 5,
    tags: ['Voice', 'Engineering', 'Latency'],
    coverGradient: 'from-amber-500 via-rose-500 to-violet-600',
  },
  {
    slug: 'router-pattern-for-llms',
    title: 'The Router Pattern: Why We Stopped Picking One Model',
    excerpt:
      'GPT-4o for reasoning. Claude for writing. Gemini for vision. Haiku for the easy stuff. Here\'s how our router cut our LLM costs by 64% without losing quality.',
    content: `
For most of 2024, we picked one model per customer and ran every request through it. Simple, debuggable, and wildly inefficient.

A typical conversation contains six or seven distinct kinds of turns: greetings, classifications, retrievals, generations, summarizations, tool calls, and closings. Each one has a different difficulty curve. Sending all of them to GPT-4o is like paying a senior engineer to fix typos.

## The router

We trained a small classifier — 80M parameters, runs in 12ms — that looks at each incoming turn and decides which model should handle it. The features are simple: turn length, conversation depth, tool requirements, retrieved context size, and customer SLA tier.

Then the router picks. Easy classifications go to Haiku. Open-ended generation to GPT-4o or Sonnet. Vision tasks to Gemini. Tool calls to whichever model the customer benchmarked best on their own evals.

## The eval suite is the secret

A router is only as good as its evals. We run every conversation through a quality scorer afterward and use the disagreements to retrain the router weekly. Quality has not just held steady — it's gone *up*, because we're routing each turn to its best model, not a one-size-fits-all default.

## The numbers

Average cost per conversation: down 64%. p95 latency: down 22%. Customer-reported quality: up 4.1 points (on a 100-point scale). We left a lot of margin on the table for a year. We're not anymore.
    `,
    author: {
      name: 'Theo Park',
      avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=theopark',
      role: 'Principal Engineer',
    },
    publishedAt: '2026-01-14',
    readTime: 6,
    tags: ['Architecture', 'Cost', 'Models'],
    coverGradient: 'from-cyan-500 via-blue-500 to-indigo-600',
  },
  {
    slug: 'designing-trust-into-chat-interfaces',
    title: 'Designing Trust Into a Chat Interface',
    excerpt:
      'Trust isn\'t a feature you ship. It\'s an emergent property of dozens of small decisions. Here are the ones that matter most.',
    content: `
A chatbot is a stranger in a window. It asks for trust in the first three seconds, before it's earned any. Most bots squander that window with a cheery "Hi! How can I help you today? 👋" and lose the user before they type a word.

## The first second

Show the model's name and version. Show what it can and can't do. Show what data it has access to. Don't make people guess.

We A/B tested this and a transparent intro lifted engagement by 18%. The thing that increased trust wasn't friendliness — it was *legibility*.

## The middle

Cite sources inline, not in a footer. Use hedges when uncertain ("I think" / "based on what I have"). Show the bot typing, not because it's slow but because it's *thinking* — the typing indicator is a status signal, not a performance one.

When the bot needs to do something irreversible (cancel a subscription, send an email, charge a card), confirm. Always. Even if it slows things down.

## The end

Let users rate the conversation. Then *do* something with the ratings — visibly. "Thanks, that feedback retrained your bot." That sentence is worth more than any onboarding tour.

Trust accumulates one interaction at a time. The bots that get this right become the ones users open intentionally, not the ones they tolerate.
    `,
    author: {
      name: 'Mei-Lin Chen',
      avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=meilin',
      role: 'Head of Design',
    },
    publishedAt: '2025-12-03',
    readTime: 4,
    tags: ['Design', 'Trust', 'UX'],
    coverGradient: 'from-emerald-500 via-cyan-500 to-violet-500',
  },
  {
    slug: 'the-q1-product-update',
    title: 'The Q1 Product Update: Streaming, Memory, and the Forge SDK',
    excerpt:
      'Three months, twelve releases, and a few things we shipped quietly because they were too good to bury in a changelog.',
    content: `
We shipped a lot in Q1. Here's what mattered.

## Forge SDK 2.0

Typed clients for TypeScript, Python, Go, and Ruby. First-class streaming, function calling, and structured outputs. The TS package alone shed 38% of its bundle size after we dropped a vendored polyfill we no longer needed.

## Persistent memory

Long-term memory across sessions, now generally available on Pro and Enterprise. Vector retrieval is sub-15ms. Memory decay is tunable per chatbot. Users can ask the bot to "forget" anything and it actually does — verifiable in the audit log.

## Voice GA

Voice agents are out of beta. Sub-700ms median latency, 40+ languages, Twilio and Vonage native. The custom voice cloning add-on is rolling out to enterprise customers in waves through Q2.

## The router

Multi-model routing is on by default for all new accounts. Existing accounts can flip the switch in settings. Cost goes down, quality goes up. We're as suspicious of free lunches as anyone, but the numbers keep holding.

## What's next

Q2 is about giving operators more control: per-turn guardrails, custom hallucination detectors, and a much better eval workflow. If you want early access, hit reply.
    `,
    author: {
      name: 'Soren Mikkelsen',
      avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=soren',
      role: 'VP of Product',
    },
    publishedAt: '2025-11-10',
    readTime: 4,
    tags: ['Product', 'Changelog'],
    coverGradient: 'from-violet-500 via-pink-500 to-amber-500',
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}
