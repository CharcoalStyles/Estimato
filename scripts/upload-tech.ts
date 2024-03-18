const {
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  SUPABASE_USER_EMAIL,
  SUPABASE_USER_PASSWORD,
} = process.env;

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { Database } from "../src/util/schema";

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error("SUPABASE_URL and SUPABASE_ANON_KEY must be set");
}

if (!SUPABASE_USER_EMAIL || !SUPABASE_USER_PASSWORD) {
  throw new Error("SUPABASE_USER_EMAIL and SUPABASE_USER_PASSWORD must be set");
}

(async () => {
  const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
  //sign in to supabase
  const { error: authError } = await supabase.auth.signInWithPassword({
    email: SUPABASE_USER_EMAIL,
    password: SUPABASE_USER_PASSWORD,
  });
  
  type Tech = {
    name: string;
    link: string;
  };

  if (authError) {
    console.error(authError);
    return;
  }

  const techs = JSON.parse(readFileSync("../tech.json", "utf-8")) as Tech[];

  console.log(techs[0]);

  const { data, error } = await supabase.from("tech").insert(techs);

  if (error) {
    console.error(error);
    return;
  }

  console.log(data);
})();
