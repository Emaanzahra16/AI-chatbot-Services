import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getToken } from 'next-auth/jwt';
import { generateCEOInsight } from '@/lib/ai/ceo';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: any) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token?.sub) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data: org } = await supabase
    .from('organization_members')
    .select('organization_id')
    .eq('user_id', token.sub)
    .single();

  const { data: leads } = await supabase
    .from('leads')
    .select('*')
    .eq('organization_id', org?.organization_id)
    .limit(50);

  const report = await generateCEOInsight(leads || []);

  return NextResponse.json({ report });
}