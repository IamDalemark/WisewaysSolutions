"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { User } from "@supabase/auth-helpers-react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

interface UserContextType {
  user: User | null;
  loading: boolean;
  error?: string | null;
  changingPassword: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth event:", event);
      if (session?.user) {
        setUser(session.user);
      }
      setLoading(false);
      if (event === "PASSWORD_RECOVERY") {
        setChangingPassword(true);
        router.replace("/resetpassword");
      } else if (event === "SIGNED_OUT") {
        setUser(null);
      }
    });

    const { subscription } = data;

    return () => {
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        error: user ? null : "Error fetching user.",
        changingPassword,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
