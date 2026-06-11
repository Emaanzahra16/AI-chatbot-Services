import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { generateCEOInsight } from '@/lib/ai/ceo';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  const { data: leads } = await supabase
    .from('leads')
    .select('*')
    .limit(100);

  const report = await generateCEOInsight(leads || []);

  await resend.emails.send({
    from: 'Altivora AI <reports@altivora.ai>',
    to: process.env.LEAD_NOTIFICATION_EMAIL!,
    subject: '📊 Daily CEO AI Report',
    text: report || '',
  });

  return NextResponse.json({ ok: true });
}