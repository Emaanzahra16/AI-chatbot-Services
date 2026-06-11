import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getToken } from 'next-auth/jwt';

export const runtime = 'nodejs';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * 🧠 ADMIN OVERVIEW API
 * SaaS metrics endpoint
 */
export async function GET(req: NextRequest) {
  try {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token?.sub) {
      return NextResponse.json(
        { ok: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const userId = token.sub;

    // 🔐 get org
    const { data: org } = await supabase
      .from('user_organizations')
      .select('organization_id')
      .eq('user_id', userId)
      .single();

    if (!org?.organization_id) {
      return NextResponse.json(
        { ok: false, error: 'No organization found' },
        { status: 403 }
      );
    }

    const orgId = org.organization_id;

    // 📊 fetch leads
    const { data: leads } = await supabase
      .from('leads')
      .select('id, status, lead_strength, created_at')
      .eq('organization_id', orgId);

    const totalLeads = leads?.length || 0;

    const hot = leads?.filter((l) => (l.lead_strength ?? 0) >= 70).length || 0;
    const warm = leads?.filter((l) => {
      const s = l.lead_strength ?? 0;
      return s >= 40 && s < 70;
    }).length || 0;
    const cold = totalLeads - hot - warm;

    const newLeads =
      leads?.filter((l) => l.status === 'new').length || 0;

    const contacted =
      leads?.filter((l) => l.status === 'contacted').length || 0;

    const qualified =
      leads?.filter((l) => l.status === 'qualified').length || 0;

    const closed =
      leads?.filter((l) => l.status === 'closed').length || 0;

    return NextResponse.json({
      ok: true,
      metrics: {
        totalLeads,
        hot,
        warm,
        cold,
        newLeads,
        contacted,
        qualified,
        closed,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err.message || 'Server error' },
      { status: 500 }
    );
  }
}