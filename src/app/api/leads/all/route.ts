import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getToken } from 'next-auth/jwt';

export const runtime = 'nodejs';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * 🧠 SIMPLE AI LEAD SCORING
 */
function scoreLead(lead: any) {
  let score = 0;

  if (lead.email?.includes('@gmail')) score += 1;
  if (lead.company) score += 2;
  if (lead.message?.length > 50) score += 2;

  if ((lead.status ?? 'new') === 'closed') score += 3;
  if ((lead.status ?? 'new') === 'qualified') score += 4;

  if (score >= 6) return 'hot';
  if (score >= 3) return 'warm';
  return 'cold';
}

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req });

    if (!token?.sub) {
      return NextResponse.json(
        { ok: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const userId = token.sub;

    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[supabase-fetch-error]', error);

      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 }
      );
    }

    const leadsWithScore = (data ?? []).map((lead) => ({
      ...lead,
      score: scoreLead(lead),
    }));

    return NextResponse.json({
      ok: true,
      leads: leadsWithScore,
    });

  } catch (err: any) {
    console.error('[leads-fetch-error]', err);

    return NextResponse.json(
      {
        ok: false,
        error: err.message || 'Server error',
      },
      { status: 500 }
    );
  }
}