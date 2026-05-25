import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export const runtime = 'edge';

const LeadSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(200),
  company: z.string().max(120).optional(),
  message: z.string().min(1).max(2000),
  source: z.string().max(80).optional(),
});

export async function POST(req: NextRequest) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = LeadSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed', issues: parsed.error.flatten() }, { status: 400 });
  }

  // In production: persist via Prisma + send notification via Resend.
  // For now we log on the server and respond as success.
  console.log('[lead-capture]', parsed.data);

  return NextResponse.json(
    {
      ok: true,
      message: "Thanks — we got it. A real human will be in touch within one business day.",
    },
    { status: 200 },
  );
}
