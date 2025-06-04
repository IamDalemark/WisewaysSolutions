import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL_TEST!;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_TEST!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
