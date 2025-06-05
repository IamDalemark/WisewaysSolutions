import { User } from "@supabase/supabase-js";
import React, { createContext, useContext, ReactNode } from "react";

interface UserContextType {
  user: User | null;
  loading: boolean;
}

const StorybookUserContext = createContext<UserContextType | undefined>(
  undefined
);

interface StorybookUserProviderProps {
  children: ReactNode;
  user?: User | null;
  loading?: boolean;
}

export const StorybookUserProvider = ({
  children,
  user = null,
  loading = false,
}: StorybookUserProviderProps) => {
  return (
    <StorybookUserContext.Provider value={{ user, loading }}>
      {children}
    </StorybookUserContext.Provider>
  );
};

export const useStorybookUser = () => {
  const context = useContext(StorybookUserContext);
  if (!context) {
    throw new Error(
      "useStorybookUser must be used within a StorybookUserProvider"
    );
  }
  return context;
};
