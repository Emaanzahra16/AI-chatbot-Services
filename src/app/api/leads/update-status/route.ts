import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
import { getToken } from 'next-auth/jwt';

export const runtime = 'nodejs';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// validation
const Schema = z.object({
  id: z.string().min(1),
  status: z.enum(['new', 'contacted', 'qualified', 'closed']),
});

export async function POST(req: NextRequest) {
  try {
    // 🔐 AUTH CHECK (IMPORTANT FIX)
    const token = await getToken({ req });

    if (!token?.sub) {
      return NextResponse.json(
        { ok: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await req.json();

    const parsed = Schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Invalid input',
          issues: parsed.error.flatten(),
        },
        { status: 400 }
      );
    }

    const { id, status } = parsed.data;

    // 🔐 ONLY UPDATE OWNER'S LEAD
    const { data, error } = await supabase
      .from('leads')
      .update({ status })
      .eq('id', id)
      .eq('user_id', token.sub) // IMPORTANT SAAS SECURITY
      .select()
      .single();

    if (error) {
      console.error('[supabase-update-error]', error);

      return NextResponse.json(
        {
          ok: false,
          error: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      lead: data,
    });
  } catch (err) {
    console.error('[update-status-error]', err);

    return NextResponse.json(
      {
        ok: false,
        error: 'Server error',
      },
      { status: 500 }
    );
  }
}