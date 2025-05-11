import { useState } from "react";
import { UserData } from "@/types/users.type";
import { SignUpResult } from "@/types/auth.type";
import { supabase } from "@/lib/supabaseClient";
import { useToast } from "@/components/contexts/ToastContext";

export const useLogin = () => {
  const { addToast } = useToast();
  const [logInLoading, setLogInLoading] = useState(false);

  const logIn = async (userData: UserData): Promise<SignUpResult> => {
    setLogInLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: userData.email,
        password: userData.password,
      });

      if (error) {
        throw new Error(error.message || "Failed to Log In.");
      }

      console.log(data);
      addToast("Login Successful!", "success");
      return { success: true, user: data.user };
    } catch (error) {
      addToast("Failed to Log In.", "error");
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to Log In. Please try again.",
      };
    } finally {
      setLogInLoading(false);
    }
  };

  return { logIn, logInLoading };
};
