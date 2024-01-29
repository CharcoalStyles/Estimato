import { SupabaseClient, User, createClient } from "@supabase/supabase-js";
import { atom } from "jotai";
import { Database } from "./schema";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing env variables SUPABASE_URL and SUPABASE_ANON_KEY");
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

console.log("supabase", supabase);


const coreSupabaseAtom = atom(supabase);
export const supabaseAtom = atom((get) => get(coreSupabaseAtom));
export const currentUserAtom = atom<User | null>(null);
