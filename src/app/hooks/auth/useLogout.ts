import { useState } from "react";
import { LogOutResult } from "@/types/auth.type";
import { supabase } from "@/lib/supabaseClient";
import { useToast } from "@/components/contexts/ToastContext";

export const useLogout = () => {
  const { addToast } = useToast();
  const [logOutLoading, setLogOutLoading] = useState(false);

  const logOut = async (): Promise<LogOutResult> => {
    setLogOutLoading(true);
    try {
      const { error } = await supabase.auth.signOut({ scope: "local" });

      if (error) {
        throw new Error(error.message || "Failed to Log Out.");
      }

      addToast("Logged Out!", "success");
      return { success: true };
    } catch (error) {
      addToast("Failed to Log Out!", "error");
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to Log Out. Please try again.",
      };
    } finally {
      setLogOutLoading(false);
    }
  };

  return { logOut, logOutLoading };
};
