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

interface UserContextType {
  user: User | null;
  loading: boolean;
  error?: string | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth event:", event);
      if (session?.user) {
        setUser(session.user);
      }
      setLoading(false);
    });
    const { subscription } = data;

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        error: user ? null : "Error fetching user.",
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
