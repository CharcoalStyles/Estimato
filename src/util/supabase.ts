import { createClient } from "@supabase/supabase-js";
import { atom } from "jotai";
import { Database } from "./schema";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing env variables SUPABASE_URL and SUPABASE_ANON_KEY");
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);


const coreSupabaseAtom = atom(supabase);
export const supabaseAtom = atom((get) => get(coreSupabaseAtom));
