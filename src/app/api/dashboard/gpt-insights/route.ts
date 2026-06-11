import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';
import { getToken } from 'next-auth/jwt';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

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

    // get organization
    const { data: org } = await supabase
      .from('organization_members')
      .select('organization_id')
      .eq('user_id', userId)
      .single();

    const organizationId = org?.organization_id;

    if (!organizationId) {
      return NextResponse.json({ error: 'No org found' }, { status: 403 });
    }

    // fetch leads
    const { data: leads } = await supabase
      .from('leads')
      .select('name,email,message,status,created_at')
      .eq('organization_id', organizationId)
      .order('created_at', { ascending: false })
      .limit(50);

    const safeLeads = leads || [];

    const hot = safeLeads.filter(l => l.status === 'hot').length;
    const warm = safeLeads.filter(l => l.status === 'warm').length;
    const total = safeLeads.length;

    // build context for GPT
    const prompt = `
You are a CEO-level AI business analyst.

Analyze this SaaS chatbot business:

TOTAL LEADS: ${total}
HOT LEADS: ${hot}
WARM LEADS: ${warm}

RECENT LEADS:
${safeLeads
  .slice(0, 10)
  .map(
    l =>
      `- ${l.name} | ${l.email} | ${l.message?.slice(0, 120)} | ${l.status}`
  )
  .join('\n')}

Give output in JSON ONLY:

{
  "summary": "...",
  "insight": "...",
  "growth_reason": "...",
  "risk": "...",
  "action_plan": ["...", "...", "..."],
  "priority_focus": "..."
}
`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are a senior SaaS CEO advisor analyzing startup metrics.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.6,
    });

    const text = response.choices[0]?.message?.content || '{}';

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = {
        summary: text,
        insight: '',
        growth_reason: '',
        risk: '',
        action_plan: [],
        priority_focus: '',
      };
    }

    return NextResponse.json(parsed);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Server error' },
      { status: 500 }
    );
  }
}