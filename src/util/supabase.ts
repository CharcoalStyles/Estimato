import { createClient } from '@supabase/supabase-js';
import { SupabaseClient } from '@supabase/supabase-js';


let supabase: SupabaseClient | null = null;

export const getSupabase = (): SupabaseClient => {
  if (!supabase) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Missing env variables SUPABASE_URL and SUPABASE_ANON_KEY');
    }

    supabase = createClient(supabaseUrl, supabaseAnonKey);
  }

  return supabase;
};