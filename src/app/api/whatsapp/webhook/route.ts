 export async function POST(req: Request) {
  const body = await req.json();

  const message = body.message?.toLowerCase() || '';

  let reply = "Hi 👋 Thanks for contacting Altivora AI.";

  if (message.includes('price')) {
    reply = "Our plans start from $29/month. Want a free demo?";
  }

  if (message.includes('demo')) {
    reply = "Great! I can set up a free AI demo for your business in 24 hours.";
  }

  return Response.json({ reply });
}