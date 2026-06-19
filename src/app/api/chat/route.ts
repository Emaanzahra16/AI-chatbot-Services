import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

const SYSTEM_PROMPT = `You are the friendly AI assistant for "AI Services" — a Barcelona-based AI consultancy helping businesses implement AI agents, automation, and data analytics.

SERVICES:
1. 🤖 Conversational AI Agents with RAG — custom agents trained on the client's knowledge base, answering with accurate citations. Integrations: WhatsApp, web, API.
2. ⚙️ Process Automation with n8n — connecting tools (HubSpot, Slack, Notion, Google Workspace, etc.) and automating repetitive workflows.
3. 📊 Data Analytics — real-time custom dashboards, anomaly detection, predictive analytics, automated reporting.

KEY INFO:
- Email: ai.servicios.chatbot@gmail.com
- WhatsApp: +34 624 280 211
- Location: Barcelona, Spain (fully remote friendly)
- Pricing: from €5,000 for basic solutions, from €12,000 for complete projects
- Timeline: prototype in 15 days, production in 21 days
- Infrastructure: 100% EU-hosted, GDPR compliant, end-to-end encrypted
- Free 30-minute diagnostic consultation available

PERSONALITY:
- Always respond in the SAME LANGUAGE the user writes in (Spanish, English, Catalan, French, etc.)
- Be warm, concise, and professional
- Encourage scheduling the free diagnostic when relevant
- Keep responses under 150 words unless more detail is needed
- Never invent facts or prices beyond what is listed above`;

export async function POST(req: NextRequest) {
  let body: { messages?: { role: string; content: string }[] };

  try {
    body = await req.json();
  } catch {
    return errorStream('Invalid request.');
  }

  const messages = (body.messages ?? []).filter(
    (m) => m && typeof m.content === 'string' && ['user', 'assistant'].includes(m.role)
  );

  if (!messages.length) {
    return errorStream('No messages provided.');
  }

  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    console.error('[chat] GROQ_API_KEY is not set in .env');
    return errorStream(
      'El asistente no está configurado. ' +
      'Contáctanos: ai.servicios.chatbot@gmail.com o WhatsApp +34 624 280 211.'
    );
  }

  try {
    // Groq is OpenAI-compatible — same request format, different base URL & model
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile', // best free model on Groq
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages.map(({ role, content }) => ({ role, content })),
        ],
        stream: true,
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('[chat] Groq error:', res.status, err);
      return errorStream(
        'Hubo un problema técnico. Contáctanos por WhatsApp: +34 624 280 211.'
      );
    }

    const encoder = new TextEncoder();

    // Groq uses the same SSE format as OpenAI
    const stream = new ReadableStream({
      async start(controller) {
        const reader  = res.body!.getReader();
        const decoder = new TextDecoder();

        try {
          while (true) {
            const { value, done } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });

            for (const line of chunk.split('\n')) {
              const trimmed = line.trim();
              if (!trimmed.startsWith('data:')) continue;

              const payload = trimmed.slice(5).trim();
              if (payload === '[DONE]') {
                controller.enqueue(encoder.encode('data: [DONE]\n\n'));
                continue;
              }

              try {
                const parsed = JSON.parse(payload);
                const delta  = parsed.choices?.[0]?.delta?.content;
                if (typeof delta === 'string') {
                  controller.enqueue(
                    encoder.encode(`data: ${JSON.stringify({ delta })}\n\n`)
                  );
                }
              } catch {
                // skip malformed chunk
              }
            }
          }
        } catch (e) {
          console.error('[chat] Stream error:', e);
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
  } catch (err) {
    console.error('[chat] Fetch error:', err);
    return errorStream(
      'Perdí la conexión. Contáctanos: ai.servicios.chatbot@gmail.com'
    );
  }
}

function errorStream(text: string): Response {
  const encoder = new TextEncoder();
  const stream  = new ReadableStream({
    start(c) {
      c.enqueue(encoder.encode(`data: ${JSON.stringify({ delta: text })}\n\n`));
      c.enqueue(encoder.encode('data: [DONE]\n\n'));
      c.close();
    },
  });
  return new Response(stream, {
    headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' },
  });
}
