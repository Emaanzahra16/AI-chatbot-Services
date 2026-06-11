import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await supabase.from('leads').insert([
    {
      name: 'Test User',
      email: 'test@example.com',
      company: 'Altivora',
      message: 'Hello from API',
      source: 'test-route',
    },
  ]).select();

  if (error) {
    return NextResponse.json({ ok: false, error: error.message });
  }

  return NextResponse.json({ ok: true, inserted: data });
}