import { createClient } from '@supabase/supabase-js';

// =========================
// ENV VARIABLES
// =========================
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// =========================
// SINGLETON CLIENT
// (prevents duplicate connections in Next.js hot reload)
// =========================
let supabaseInstance: ReturnType<typeof createClient> | null = null;

// =========================
// CREATE CLIENT FUNCTION
// =========================
function createSupabaseClient() {
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
    realtime: {
      params: {
        eventsPerSecond: 10,
      },
    },
  });
}

// =========================
// EXPORT CLIENT (SAFE)
// =========================
export const supabase = (() => {
  if (typeof window === 'undefined') {
    // Server-side safety (prevents accidental usage issues)
    return createSupabaseClient();
  }

  if (!supabaseInstance) {
    supabaseInstance = createSupabaseClient();
  }

  return supabaseInstance;
})();

// =========================
// OPTIONAL HELPERS (SAA READY)
// =========================

// health check (useful for SaaS monitoring later)
export async function checkSupabaseConnection() {
  const { error } = await supabase.from('leads').select('id').limit(1);
  return !error;
}