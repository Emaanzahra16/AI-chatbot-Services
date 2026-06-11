import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    // 🔐 AUTH CHECK
    const token = await getToken({ req });

    if (!token?.sub) {
      return NextResponse.json(
        { ok: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await req.json();

    const { name, email, company, message } = body;

    if (!message) {
      return NextResponse.json(
        { ok: false, error: 'Missing message' },
        { status: 400 }
      );
    }

    // 🧠 SIMPLE MOCK AI SUMMARY (no OpenAI yet)
    const summary = `
Lead Summary:
- Name: ${name}
- Email: ${email}
- Company: ${company ?? 'N/A'}
- Intent: ${message.length > 50 ? 'High interest' : 'Low interest'}
- Priority: ${message.includes('urgent') ? 'HIGH' : 'NORMAL'}
    `.trim();

    return NextResponse.json({
      ok: true,
      summary,
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: 'Server error' },
      { status: 500 }
    );
  }
}