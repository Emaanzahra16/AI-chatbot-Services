import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const LIMITS: Record<string, number> = {
  starter: 50,
  pro: 500,
  enterprise: 5000,
};

export async function canCreateLead(userId: string) {
  // 1. get org
  const { data: org } = await supabase
    .from('organization_members')
    .select('organization_id')
    .eq('user_id', userId)
    .single();

  if (!org?.organization_id) return false;

  // 2. get plan
  const { data: orgData } = await supabase
    .from('organizations')
    .select('plan')
    .eq('id', org.organization_id)
    .single();

  const plan = orgData?.plan || 'starter';

  // 3. count leads this month
  const startOfMonth = new Date();
  startOfMonth.setDate(1);

  const { count } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true })
    .eq('organization_id', org.organization_id)
    .gte('created_at', startOfMonth.toISOString());

  const limit = LIMITS[plan] || 50;

  return (count || 0) < limit;
}