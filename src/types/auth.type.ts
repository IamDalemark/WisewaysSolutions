import { User } from "@supabase/supabase-js";

export type SignUpResult = {
  success: boolean;
  error?: string;
  user?: User | null;
};
