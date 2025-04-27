import { useState } from "react";
import { UserData } from "@/types/users.type";
import { SignUpResult } from "@/types/auth.type";
import { supabase } from "@/lib/supabaseClient";

export const useSignUp = () => {
  const [signUpLoading, setSignUpLoading] = useState(false);

  const signUp = async (userData: UserData): Promise<SignUpResult> => {
    setSignUpLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            username: userData.username, // store extra fields in metadata
          },
        },
      });

      if (error) {
        throw new Error(error.message || "Failed to Sign Up.");
      }

      if (data.user?.aud === "authenticated") {
        throw new Error("Email already in use!");
      }

      return { success: true, user: data.user };
    } catch (error) {
      //   console.error("Error Signing Up:", error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to Sign Up. Please try again.",
      };
    } finally {
      setSignUpLoading(false);
    }
  };

  return { signUp, signUpLoading };
};
