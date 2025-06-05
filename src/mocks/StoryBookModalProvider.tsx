import React, { ReactNode, useState, useContext } from "react";
import { ModalContext } from "@/components/contexts/ModalContext"; // Import the real context
import { LogInResult, SignUpResult } from "@/types/auth.type";

type ModalProps = {
  showSignUpModal?: boolean;
  showLogInModal?: boolean;
  isLoading?: boolean;
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  acceptedTerms?: boolean;
  showPassword?: boolean;
  validationErrors?: {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    acceptedTerms?: boolean;
    general?: string;
  };
};

interface StorybookModalProviderProps {
  children: ReactNode;
  modalProps: ModalProps;
  showValidationErrors?: boolean;
  validationErrors?: {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    acceptedTerms?: boolean;
    general?: string;
  };
  fromService?: string;
}

export const StorybookModalProvider = ({
  children,
  modalProps,
  showValidationErrors = false,
  validationErrors = {},
  fromService = "Any.",
}: StorybookModalProviderProps) => {
  // State for controlling modal visibility
  const [showSignUpModal, setShowSignUpModal] = useState(
    modalProps.showSignUpModal || false
  );
  const [showLogInModal, setShowLogInModal] = useState(
    modalProps.showLogInModal || false
  );

  const [signUpFormState, setSignUpFormState] = useState({
    username: modalProps.username || "",
    email: modalProps.email || "",
    password: modalProps.password || "",
    confirmPassword: modalProps.confirmPassword || "",
    acceptedTerms: modalProps.acceptedTerms || false,
  });

  const [loginFormState, setLoginFormState] = useState({
    email: modalProps.email || "",
    password: modalProps.password || "",
    showPassword: modalProps.showPassword || false,
  });

  // Mock functions with proper state management
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

  const closeLogInModal = () => {
    setShowLogInModal(false);
  };

  const mockHandleScheduleAppointment = () => {
    console.log("Mock: Schedule appointment clicked");
    // In storybook, just open login modal for demo
    openLogInModal();
  };

  // Mock signup function that will show errors when called
  const mockHandleSignUp = async (): Promise<SignUpResult> => {
    if (showValidationErrors) {
      return {
        success: false,
        error: validationErrors.general || "Sign up failed",
      };
    }

    // Simulate successful signup - switch to login modal
    openLogInModal();
    return { success: true };
  };

  // Mock login function that will show errors when called
  const mockHandleLogIn = async (): Promise<LogInResult> => {
    if (showValidationErrors) {
      return {
        success: false,
        error: validationErrors.general || "Authentication failed",
      };
    }

    // Simulate successful login - close modal
    closeLogInModal();
    console.log("Mock: User logged in, would navigate to /booking");
    return { success: true };
  };

  const mockHandleToResetPassword = () => {
    closeLogInModal();
    console.log("Mock: User reset password, would navigate to /resetpassword");
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
        handleToResetPassword: mockHandleToResetPassword,
        handleScheduleAppointment: mockHandleScheduleAppointment,
        handleSignUp: mockHandleSignUp,
        handleLogIn: mockHandleLogIn,
        signUpLoading: modalProps.isLoading || false,
        logInLoading: modalProps.isLoading || false,
        signUpForm: signUpFormState,
        loginForm: loginFormState,
        setSignUpForm: setSignUpFormState,
        setLoginForm: setLoginFormState,
        fromService,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

// Hook to use the real modal context (same as your app)
export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
