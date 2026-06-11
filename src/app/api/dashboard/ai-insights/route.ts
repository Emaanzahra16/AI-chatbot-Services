import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getToken } from 'next-auth/jwt';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: Request) {
  try {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token?.sub) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = token.sub;

    // Get org
    const { data: org } = await supabase
      .from('organization_members')
      .select('organization_id')
      .eq('user_id', userId)
      .single();

    const organizationId = org?.organization_id;

    if (!organizationId) {
      return NextResponse.json({ error: 'No organization' }, { status: 403 });
    }

    // Fetch leads
    const { data: leads } = await supabase
      .from('leads')
      .select('created_at, message, status')
      .eq('organization_id', organizationId);

    const safeLeads = leads || [];

    // =========================
    // 📊 BASIC METRICS
    // =========================
    const total = safeLeads.length;

    const hot = safeLeads.filter(l => l.status === 'hot').length;
    const warm = safeLeads.filter(l => l.status === 'warm').length;

    // last 24h vs previous
    const now = new Date();
    const last24h = safeLeads.filter(l =>
      new Date(l.created_at).getTime() > now.getTime() - 24 * 60 * 60 * 1000
    );

    const last48h = safeLeads.filter(l =>
      new Date(l.created_at).getTime() > now.getTime() - 48 * 60 * 60 * 1000 &&
      new Date(l.created_at).getTime() <= now.getTime() - 24 * 60 * 60 * 1000
    );

    const change =
      last48h.length === 0
        ? 100
        : ((last24h.length - last48h.length) / last48h.length) * 100;

    // =========================
    // 🧠 AI INSIGHTS ENGINE
    // =========================
    let insight = '';
    let recommendation = '';

    if (last24h.length > last48h.length) {
      insight =
        'Lead activity increased in the last 24 hours due to higher engagement.';
      recommendation =
        'Follow up hot leads immediately and check recent marketing campaigns.';
    } else if (last24h.length < last48h.length) {
      insight =
        'Lead activity dropped compared to previous period.';
      recommendation =
        'Review chatbot placement, ads, or website traffic sources.';
    } else {
      insight = 'Lead activity is stable.';
      recommendation = 'Maintain current strategy and optimize conversion flow.';
    }

    if (hot > total * 0.3) {
      insight += ' High number of hot leads detected.';
      recommendation += ' Prioritize sales outreach — conversion potential is strong.';
    }

    if (total === 0) {
      insight = 'No leads detected yet.';
      recommendation = 'Check chatbot integration and embed script.';
    }

    return NextResponse.json({
      metrics: {
        totalLeads: total,
        hotLeads: hot,
        warmLeads: warm,
        last24h: last24h.length,
        change: Number(change.toFixed(1)),
      },
      insight,
      recommendation,
    });

  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Server error' },
      { status: 500 }
    );
  }
}