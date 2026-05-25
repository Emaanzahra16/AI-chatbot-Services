import { NextRequest } from 'next/server';
import { generateResponse, streamTokens } from '@/lib/ai';
import type { ChatMessage } from '@/types';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

interface IncomingMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

/**
 * POST /api/chat
 *
 * Streams an assistant response as SSE-style events.
 * Format: `data: {"delta":"..."}\n\n`
 *
 * When OPENAI_API_KEY is present, this endpoint is structured so you can
 * swap in a real OpenAI stream with minimal changes (see commented block).
 */
export async function POST(req: NextRequest) {
  let body: { messages?: IncomingMessage[] };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const messages = (body.messages ?? []).filter(
    (m): m is IncomingMessage =>
      m && typeof m.content === 'string' && ['user', 'assistant', 'system'].includes(m.role),
  );

  if (messages.length === 0) {
    return new Response(JSON.stringify({ error: 'No messages provided' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Build internal message format
  const chatMessages: ChatMessage[] = messages.map((m, i) => ({
    id: `m_${i}`,
    role: m.role,
    content: m.content,
    createdAt: new Date().toISOString(),
  }));

  // -----------------------------------------------------------------
  // OpenAI integration (uncomment and remove simulator when you have a key):
  //
  // if (process.env.OPENAI_API_KEY) {
  //   const upstream = await fetch('https://api.openai.com/v1/chat/completions', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  //     },
  //     body: JSON.stringify({
  //       model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
  //       stream: true,
  //       messages: [
  //         { role: 'system', content: 'You are Forge, the concierge for BotForge AI.' },
  //         ...messages,
  //       ],
  //     }),
  //   });
  //   // Re-stream OpenAI's SSE through the same {delta} envelope below.
  // }
  // -----------------------------------------------------------------

  const replyText = generateResponse(chatMessages);

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of streamTokens(replyText)) {
          const evt = `data: ${JSON.stringify({ delta: chunk })}\n\n`;
          controller.enqueue(encoder.encode(evt));
        }
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
      } catch (err) {
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ error: 'stream_error' })}\n\n`),
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  });
}
