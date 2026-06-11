import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
import { getToken } from 'next-auth/jwt';
import { canCreateLead } from '@/lib/usage';
import { sendLeadEmail } from '@/lib/email';

export const runtime = 'nodejs';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const LeadSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  company: z.string().optional(),
  message: z.string().min(1),
});

/**
 * AI SCORING
 */
function scoreLead(lead: any) {
  let score = 0;

  const msg = lead.message.toLowerCase();

  if (msg.includes('price') || msg.includes('cost')) score += 20;
  if (msg.includes('demo')) score += 25;
  if (lead.company) score += 20;

  let priority = 'cold';
  if (score > 60) priority = 'hot';
  else if (score > 30) priority = 'warm';

  return { score, priority };
}

/**
 * GET LEADS
 */
export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token?.sub)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: org } = await supabase
    .from('organization_members')
    .select('organization_id')
    .eq('user_id', token.sub)
    .single();

  if (!org)
    return NextResponse.json({ error: 'No org' }, { status: 403 });

  const { data } = await supabase
    .from('leads')
    .select('*')
    .eq('organization_id', org.organization_id)
    .order('created_at', { ascending: false });

  return NextResponse.json({ leads: data || [] });
}

/**
 * POST LEAD
 */
export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = LeadSchema.safeParse(body);

  if (!parsed.success)
    return NextResponse.json({ error: 'Invalid' }, { status: 400 });

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token?.sub)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const allowed = await canCreateLead(token.sub, 'starter');

  if (!allowed)
    return NextResponse.json({ error: 'Limit reached' }, { status: 403 });

  const { data: org } = await supabase
    .from('organization_members')
    .select('organization_id')
    .eq('user_id', token.sub)
    .single();

  if (!org)
    return NextResponse.json({ error: 'No org' }, { status: 403 });

  const { data: lead } = await supabase
    .from('leads')
    .insert({
      ...parsed.data,
      user_id: token.sub,
      organization_id: org.organization_id,
      status: 'new',
    })
    .select()
    .single();

  const enriched = {
    ...lead,
    ...scoreLead(lead),
  };

  if (enriched.priority === 'hot') {
    await sendLeadEmail(enriched);
  }

  return NextResponse.json({ lead: enriched });
}