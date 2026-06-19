import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function generateCEOInsight(leads: any[]) {
  const summary = leads.slice(0, 50).map((l) => ({
    name: l.name,
    email: l.email,
    priority: l.priority,
    message: l.message,
  }));

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content:
          'You are a SaaS CEO assistant. Analyze leads and give business decisions.',
      },
      {
        role: 'user',
        content: `
Analyze this SaaS lead data:

${JSON.stringify(summary, null, 2)}

Return:
1. Business health summary
2. Revenue potential
3. Risks
4. 3 actionable CEO decisions
        `,
      },
    ],
  });

  return completion.choices[0].message.content;
}