import { NextRequest } from 'next/server';
import { generateResponse, streamTokens } from '@/lib/ai';
import type { ChatMessage } from '@/types';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

interface IncomingMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

/* ================= SUPABASE ================= */
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/* ================= HELPERS ================= */

function extractEmail(text: string) {
  const match = text.match(/[\w.-]+@[\w.-]+\.\w+/);
  return match ? match[0] : null;
}

function extractName(text: string) {
  const cleaned = text.replace(/[\w.-]+@[\w.-]+\.\w+/, '').trim();
  const words = cleaned.split(' ').filter(Boolean);
  return words.length ? words.slice(0, 2).join(' ') : null;
}

function extractCompany(text: string) {
  const match = text.match(/company\s*(is|:)?\s*([a-zA-Z0-9 &]+)/i);
  return match?.[2]?.trim() || null;
}

/* ================= STEP 2 CRITICAL FIX ================= */
function getSessionId(messages: IncomingMessage[]) {
  const firstUserMsg =
    messages.find((m) => m.role === 'user')?.content || '';

  return (
    firstUserMsg.slice(0, 30).replace(/\s+/g, '_') +
    '_' +
    Date.now()
  );
}

/* ================= LEAD SCORE ================= */
function calculateLeadScore(text: string) {
  let score = 0;

  const highIntent = [
    'price',
    'pricing',
    'cost',
    'hire',
    'buy',
    'purchase',
    'demo',
    'integration',
    'api',
  ];

  const mediumIntent = ['chatbot', 'automation', 'business', 'website'];

  const lower = text.toLowerCase();

  highIntent.forEach((k) => {
    if (lower.includes(k)) score += 20;
  });

  mediumIntent.forEach((k) => {
    if (lower.includes(k)) score += 10;
  });

  return Math.min(score, 100);
}

/* ================= MAIN ================= */
export async function POST(req: NextRequest) {
  let body: { messages?: IncomingMessage[] };

  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
    });
  }

  const messages = (body.messages ?? []).filter(
    (m): m is IncomingMessage =>
      m &&
      typeof m.content === 'string' &&
      ['user', 'assistant', 'system'].includes(m.role)
  );

  if (!messages.length) {
    return new Response(JSON.stringify({ error: 'No messages provided' }), {
      status: 400,
    });
  }

  const chatMessages: ChatMessage[] = messages.map((m, i) => ({
    id: `m_${i}`,
    role: m.role,
    content: m.content,
    createdAt: new Date().toISOString(),
  }));

  const replyText = generateResponse(chatMessages);

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        let fullResponse = '';

        for await (const chunk of streamTokens(replyText)) {
          fullResponse += chunk;

          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ delta: chunk })}\n\n`)
          );
        }

        controller.enqueue(encoder.encode('data: [DONE]\n\n'));

        /* ================= CRM STEP 2 LOGIC ================= */

        try {
          const lastUser =
            [...messages]
              .reverse()
              .find((m) => m.role === 'user')?.content || '';

          const email = extractEmail(lastUser);
          const session_id = getSessionId(messages);

          const name = extractName(lastUser);
          const company = extractCompany(lastUser);

          const score = calculateLeadScore(lastUser);

          // 🔍 check by email OR session
          const { data: existing } = await supabase
            .from('leads')
            .select('*')
            .or(`email.eq.${email ?? ''},session_id.eq.${session_id}`)
            .maybeSingle();

          if (existing) {
            await supabase
              .from('leads')
              .update({
                last_message: lastUser,
                conversation_count: (existing.conversation_count || 0) + 1,
                score: Math.max(existing.score || 0, score),
                updated_at: new Date().toISOString(),
              })
              .eq('id', existing.id);
          } else {
            await supabase.from('leads').insert([
              {
                name: name || 'Unknown',
                email: email || null,
                company,
                session_id,
                message: lastUser,
                last_message: lastUser,
                conversation_count: 1,
                score,
                source: 'chatbot',
                status: score > 60 ? 'hot' : 'new',
              },
            ]);
          }
        } catch (err) {
          console.error('[CRM STEP 2 ERROR]', err);
        }

        /* =============================================== */
      } catch (err) {
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({ error: 'stream_error' })}\n\n`
          )
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}