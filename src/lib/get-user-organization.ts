import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * Get organization from REAL TABLE: organization_members
 */
export async function getUserOrganization(userId: string) {
  const { data, error } = await supabase
    .from('organization_members')
    .select('organization_id')
    .eq('user_id', userId)
    .single();

  if (error || !data?.organization_id) {
    console.error('[ORG ERROR]', error);
    return null;
  }

  return data.organization_id;
}