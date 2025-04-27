"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useSignUp } from "@/app/hooks/auth/useSignUp";
import { UserData } from "@/types/users.type";
import { SignUpResult } from "@/types/auth.type";

interface ModalContextType {
  showSignUpModal: boolean;
  showLogInModal: boolean;
  openSignUpModal: () => void;
  closeSignUpModal: () => void;
  openLogInModal: () => void;
  closeLogInModal: () => void;
  handleScheduleAppointment: () => void;
  handleSignUp: () => Promise<SignUpResult>;
  handleLogIn: () => void;
  isLoading: boolean;
  signUpForm: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    showPassword: boolean;
  };
  loginForm: {
    email: string;
    password: string;
    showPassword: boolean;
  };
  setSignUpForm: React.Dispatch<
    React.SetStateAction<ModalContextType["signUpForm"]>
  >;
  setLoginForm: React.Dispatch<
    React.SetStateAction<ModalContextType["loginForm"]>
  >;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLogInModal, setShowLogInModal] = useState(false);

  const { signUp, signUpLoading } = useSignUp(); // Get signUp function and loading state from the custom hook
  const isLoggedIn = false; // Placeholder: Implement proper login state tracking

  // 🛠️ Form states
  const [signUpForm, setSignUpForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
  });

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const openSignUpModal = () => {
    setShowSignUpModal(true);
    setShowLogInModal(false);
  };

  const closeSignUpModal = () => {
    setShowSignUpModal(false);
  };

  const openLogInModal = () => {
    setShowLogInModal(true);
    setShowSignUpModal(false);
  };

  const closeLogInModal = () => setShowLogInModal(false);

  const handleScheduleAppointment = () => {
    if (isLoggedIn) {
      router.push("/booking");
    } else {
      openLogInModal();
    }
  };

  const handleSignUp = async () => {
    const { username, email, password } = signUpForm;
    const user: UserData = { username, email, password };

    try {
      // Set the loading state to true while the sign-up is in progress
      const result = await signUp(user);
      if (result.success) {
        closeSignUpModal();
        return result;
      } else {
        // console.error("Signup failed:", result.error);
        return result;
      }
    } catch (error) {
      console.error("Error during signup:", error);
      return { success: false, error: "Error during Sign Up." };
    }
  };

  const handleLogIn = async () => {
    // const { email, password } = loginForm;
  };

  return (
    <ModalContext.Provider
      value={{
        showSignUpModal,
        showLogInModal,
        openSignUpModal,
        closeSignUpModal,
        openLogInModal,
        closeLogInModal,
        handleScheduleAppointment,
        handleSignUp,
        handleLogIn,
        isLoading: signUpLoading, // Track loading state for signup
        signUpForm,
        loginForm,
        setSignUpForm,
        setLoginForm,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
