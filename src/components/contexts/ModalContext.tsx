"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";
import { useSignUp } from "@/app/hooks/auth/useSignUp";
import { UserData } from "@/types/users.type";
import { LogInResult, SignUpResult } from "@/types/auth.type";
import { useLogin } from "@/app/hooks/auth/useLogin";
import { useUser } from "./UserContext";

interface ModalContextType {
  showSignUpModal: boolean;
  showLogInModal: boolean;
  openSignUpModal: () => void;
  closeSignUpModal: () => void;
  openLogInModal: () => void;
  closeLogInModal: () => void;
  handleToResetPassword: () => void;
  handleScheduleAppointment: () => void;
  handleSignUp: () => Promise<SignUpResult>;
  handleLogIn: () => Promise<LogInResult>;
  signUpLoading: boolean;
  logInLoading: boolean;
  fromService: string;
  signUpForm: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    acceptedTerms: boolean;
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

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLogInModal, setShowLogInModal] = useState(false);

  const { signUp, signUpLoading } = useSignUp();
  const { logIn, logInLoading } = useLogin();
  const [isBooking, setIsBooking] = useState(false);

  const { user, loading: userLoading } = useUser();
  const [isLoggedIn, setIsLoggedIn] = useState(user != null);
  const [fromService, setFromService] = useState<string>("Any.");

  useEffect(() => {
    // console.log('User Auth Data:', user);
    if (!userLoading && user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user, userLoading]);

  const [signUpForm, setSignUpForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptedTerms: false,
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
    resetFields();
  };

  const openLogInModal = () => {
    setShowLogInModal(true);
    setShowSignUpModal(false);
  };

  const closeLogInModal = () => {
    setShowLogInModal(false);
    resetFields();
  };

  const resetFields = () => {
    setSignUpForm({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptedTerms: false,
    });
    setLoginForm({
      email: "",
      password: "",
      showPassword: false,
    });
  };

  const handleScheduleAppointment = () => {
    if (userLoading) return;
    setIsBooking(false);
    const splitURL = window.location.href.split("/");
    const endOfURL = splitURL[splitURL.length - 1];
    setFromService(
      window.location.href.split("/")[3] === "services" ? endOfURL : "Any."
    );
    if (isLoggedIn) {
      router.push("/booking");
    } else {
      setIsBooking(true);
      openLogInModal();
    }
  };

  const handleSignUp = async () => {
    const { username, email, password } = signUpForm;
    const user: UserData = { username, email, password };

    try {
      const result = await signUp(user);
      if (result.success) {
        openLogInModal();
        return result;
      } else {
        return result;
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Error during Sign Up.",
      };
    }
  };

  const handleLogIn = async () => {
    const { email, password } = loginForm;
    const user = { email, password };

    try {
      const result = await logIn(user);
      if (result.success) {
        closeLogInModal();
        if (isBooking) {
          router.push("/booking");
        }
        return result;
      } else {
        // console.error("Log In failed:", result.error);
        return result;
      }
    } catch (error) {
      //   console.error("Error during log in:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Error during Log In.",
      };
    }
  };

  const handleToResetPassword = () => {
    closeLogInModal();
    router.push("/resetpassword");
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
        handleToResetPassword,
        signUpLoading,
        logInLoading,
        signUpForm,
        loginForm,
        setSignUpForm,
        setLoginForm,
        fromService,
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
