import { useState } from "react";
import { UserData } from "@/types/users.type";
import { SignUpResult } from "@/types/auth.type";
import { supabase } from "@/lib/supabaseClient";

export const useLogin = () => {
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
      return { success: true, user: data.user };
    } catch (error) {
      //   console.error("Error Signing Up:", error);
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
