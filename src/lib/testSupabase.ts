import { createClient } from "@supabase/supabase-js";

const testSupabaseUrl = process.env.TEST_SUPABASE_URL!;
const testSupabaseAnonKey = process.env.TEST_SUPABASE_ANON_KEY!;

export const testSupabase = createClient(testSupabaseUrl, testSupabaseAnonKey);
