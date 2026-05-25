# BotForge AI

A production-grade AI chatbot SaaS platform built with Next.js 14, React 18, TypeScript, and Tailwind CSS. Features a dark futuristic design with glassmorphism, streaming AI responses, a full marketing site, and an analytics dashboard.

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy environment variables
cp .env.example .env.local

# 3. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> **No database required to run.** All data is mocked in `src/data/`. The app works fully out of the box after `npm install`.

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_APP_URL` | No | Your deployment URL |
| `JWT_SECRET` | No | Secret for JWT signing |
| `DATABASE_URL` | No | PostgreSQL URL (only needed if using Prisma) |
| `OPENAI_API_KEY` | No | Swap in real AI responses (see below) |
| `STRIPE_SECRET_KEY` | No | Stripe billing integration |
| `STRIPE_WEBHOOK_SECRET` | No | Stripe webhooks |
| `RESEND_API_KEY` | No | Transactional email |

---

## Swapping in Real AI

The `/api/chat` route uses a local keyword-matching engine by default. To use real OpenAI streaming:

1. Set `OPENAI_API_KEY` in `.env.local`
2. Open `src/app/api/chat/route.ts`
3. Uncomment the OpenAI block (clearly marked) and remove the mock block above it

The SSE format (`data: {"delta":"..."}`) is identical — no frontend changes needed.

---

## Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage — Hero, Features, Live Demo, Pricing, Testimonials, FAQ, CTA |
| `/services` | Six service offerings with feature lists |
| `/pricing` | Pricing tiers + comparison table + FAQ |
| `/about` | Mission, values, timeline, team |
| `/contact` | Lead capture form → `/api/leads` |
| `/demo` | Full AI playground with model selector and system prompt editor |
| `/blog` | Blog index — featured post + grid |
| `/blog/[slug]` | Dynamic blog post with markdown renderer |
| `/login` | Auth UI (stub — redirects to dashboard) |
| `/signup` | Auth UI (stub — redirects to dashboard) |
| `/dashboard` | Analytics overview — stat cards, charts, conversations |
| `/dashboard/conversations` | Full conversation table with search and filters |
| `/dashboard/chatbots` | Bot management cards |
| `/dashboard/subscription` | Plan, usage meters, invoices, upgrade/downgrade |
| `/dashboard/settings` | Profile, API keys, team, integrations |

---

## API Routes

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/chat` | POST | SSE streaming chat. Accepts `messages`, optional `model`, `temperature`, `system`. |
| `/api/leads` | POST | Lead capture. Accepts `name`, `email`, `company`, `message`, `source`. |

---

## Project Structure

```
src/
├── app/                    # Next.js 14 App Router
│   ├── api/                # Edge runtime API routes
│   ├── dashboard/          # Protected dashboard (layout + 5 pages)
│   ├── blog/               # Blog index + dynamic [slug]
│   └── ...                 # All other pages
├── components/
│   ├── chatbot/            # Floating chatbot widget
│   ├── layout/             # Navbar, Footer
│   ├── sections/           # Homepage sections (7)
│   └── ui/                 # Design system components (7)
├── data/                   # Mock data (content, blog, dashboard)
├── lib/                    # Utils, AI engine, site config
└── types/                  # TypeScript interfaces
prisma/
└── schema.prisma           # DB schema (User, Chatbot, Conversation, Lead...)
```

---

## Tech Stack

- **Framework:** Next.js 14 (App Router, Edge Runtime)
- **UI:** React 18, Tailwind CSS 3.4, Framer Motion 11
- **Icons:** lucide-react
- **Toast:** react-hot-toast
- **Validation:** Zod
- **ORM:** Prisma 5 (PostgreSQL — optional for local dev)
- **Auth:** bcryptjs + jsonwebtoken (UI stubs included)
- **Payments:** Stripe-ready (keys in `.env`, UI implemented)
- **Email:** Resend-ready

---

## Using Prisma (Optional)

If you add a real PostgreSQL database:

```bash
# Generate the Prisma client (also runs automatically via postinstall)
npx prisma generate

# Run migrations
npx prisma migrate dev --name init
```

---

## Deploying to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Set your environment variables in the Vercel project dashboard. The app uses Edge Runtime on API routes for low latency globally.

---

## Design System

| Token | Value |
|-------|-------|
| Primary gradient | violet-500 → cyan-500 |
| Background | `ink-950` with radial gradient backdrop |
| Glassmorphism | `rgba(22,25,55,0.45)` + `blur(20px)` |
| Display font | Instrument Serif (italic accents) |
| Body font | Geist |
| Mono font | Geist Mono |

---

## License

MIT — use freely, attribution appreciated.
