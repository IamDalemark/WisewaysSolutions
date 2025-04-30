import React, { ReactNode, useState } from "react";
import { ModalContext } from "@/components/contexts/ModalContext";
import { LogInResult, SignUpResult } from "@/types/auth.type";

type ModalProps = {
  show: boolean;
  isLoading: boolean;
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  showPassword?: boolean;
  validationErrors?: {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
  };
};

interface StorybookModalProviderProps {
  children: ReactNode;
  modalProps: ModalProps;

  // Add specific validation error props
  showValidationErrors?: boolean;
  validationErrors?: {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
  };
}

export const StorybookModalProvider = ({
  children,
  modalProps,
  showValidationErrors = false,
  validationErrors = {},
}: StorybookModalProviderProps) => {
  const [signUpFormState, setSignUpFormState] = useState({
    username: modalProps.username || "",
    email: modalProps.email || "",
    password: modalProps.password || "",
    confirmPassword: modalProps.confirmPassword || "",
  });

  const [loginFormState, setLoginFormState] = useState({
    email: modalProps.email || "",
    password: modalProps.password || "",
    showPassword: modalProps.showPassword || false,
  });

  // Mock signup function that will show errors when called
  const mockHandleSignUp = async (): Promise<SignUpResult> => {
    if (showValidationErrors) {
      // For demo purposes, always show the validation errors when this flag is true
      return {
        success: false,
        error: validationErrors.general || "Sign up failed",
      };
    }

    return { success: true };
  };

  // Mock login function that will show errors when called
  const mockHandleLogIn = async (): Promise<LogInResult> => {
    if (showValidationErrors) {
      // For demo purposes, always show the validation errors when this flag is true
      return {
        success: false,
        error: validationErrors.general || "Authentication failed",
      };
    }

    return { success: true };
  };

  return (
    <ModalContext.Provider
      value={{
        showSignUpModal: modalProps.show || false,
        showLogInModal: false,
        openSignUpModal: () => {},
        closeSignUpModal: () => {},
        openLogInModal: () => {},
        closeLogInModal: () => {},
        handleScheduleAppointment: () => {},
        handleSignUp: mockHandleSignUp,
        handleLogIn: mockHandleLogIn,
        signUpLoading: modalProps.isLoading || false,
        logInLoading: false,
        signUpForm: signUpFormState,
        loginForm: loginFormState,
        setSignUpForm: setSignUpFormState,
        setLoginForm: setLoginFormState,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
