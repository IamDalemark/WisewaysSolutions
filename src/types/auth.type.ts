import { User } from "@supabase/supabase-js";

export type SignUpResult = {
  success: boolean;
  error?: string;
  user?: User | null;
};

export type LogInResult = {
  success: boolean;
  error?: string;
  user?: User | null;
};

export type LogOutResult = {
  success: boolean;
  error?: string;
};
