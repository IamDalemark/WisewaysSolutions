"use client";

import { useToast } from "@/components/contexts/ToastContext";
import { useState } from "react";

const useSignInAdmin = () => {
  const { addToast } = useToast();
  const [loginLoading, setLoginLoading] = useState(false);
  const signInAdmin = async (email: string, password: string) => {
    setLoginLoading(true);
    try {
      const res = await fetch("/api/adminlogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        addToast(
          result.error instanceof Error
            ? result.error.message
            : "Failed to Login!",
          "error"
        );
      } else {
        localStorage.setItem("token", result.token);
        addToast("Login Successful!", "success");
        return { success: true };
      }
    } catch (err) {
      console.error("Login error:", err);
      addToast(
        err instanceof Error ? err.message : "Failed to Login!",
        "error"
      );
    } finally {
      setLoginLoading(false);
    }
  };

  return { signInAdmin, loginLoading };
};

export default useSignInAdmin;