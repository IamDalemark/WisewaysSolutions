"use client";

import { useState, useEffect } from "react";
import { useModal } from "@/components/contexts/ModalContext";
import { Loader2 } from "lucide-react";
import TermsAndConditions from "./TermsAndConditions";

export interface UserSignUpModalProps {
  show: boolean;
  isLoading: boolean;

  // Props for Storybook/testing
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  showPassword?: boolean;
  showTerms?: boolean;
  acceptedTerms?: boolean;
  validationErrors?: {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
  };
}

interface SignUpErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
  acceptedTerms?: string;
}

const UserSignUpModal = ({
  show,
  isLoading,
  username = "",
  email = "",
  password = "",
  confirmPassword = "",
  showTerms = false,
  acceptedTerms = false,
  showPassword = false,
  validationErrors = {},
}: UserSignUpModalProps) => {
  const {
    showSignUpModal,
    signUpLoading,
    signUpForm,
    setSignUpForm,
    handleSignUp: contextSignUp,
    closeSignUpModal,
    openLogInModal: contextOpenLogInModal,
  } = useModal();

  const [errors, setErrors] = useState<SignUpErrors>({
    ...validationErrors,
  });

  const [showingTerms, setShowingTerms] = useState(showTerms);

  useEffect(() => {
    setSignUpForm({
      username: username || "",
      email: email || "",
      password: password || "",
      confirmPassword: confirmPassword || "",
      acceptedTerms: acceptedTerms || false,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username, email, password, confirmPassword, acceptedTerms]);

  useEffect(() => {
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    }
  }, [validationErrors]);

  useEffect(() => {
    if (
      signUpForm.username === "" &&
      signUpForm.email === "" &&
      signUpForm.password === "" &&
      signUpForm.confirmPassword === "" &&
      signUpForm.acceptedTerms === false &&
      !show
    ) {
      setShowingTerms(false);
      setErrors({});
    }
  }, [signUpForm, show]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target;

    setSignUpForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name as keyof SignUpErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): SignUpErrors => {
    const newErrors: SignUpErrors = {};
    if (!signUpForm.username.trim())
      newErrors.username = "Username is required.";
    if (!signUpForm.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(signUpForm.email))
      newErrors.email = "Please enter a valid email address.";
    if (!signUpForm.password) newErrors.password = "Password is required.";
    if (!signUpForm.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password.";
    if (!signUpForm.acceptedTerms)
      newErrors.acceptedTerms = "You need to accept the terms.";
    if (
      signUpForm.password &&
      signUpForm.confirmPassword &&
      signUpForm.password !== signUpForm.confirmPassword
    ) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    if (signUpForm.password && signUpForm.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const result = await contextSignUp();
    if (!result.success) {
      setErrors({ general: result.error });
    }
  };

  const handleAcceptTerms = () => {
    signUpForm.acceptedTerms = true;
    setShowingTerms(false);
  };

  if (!showSignUpModal && !show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        className="bg-white rounded-3xl shadow-lg p-8 max-w-md w-full relative border border-gray-200"
        data-cy="signup-modal"
      >
        <button
          onClick={closeSignUpModal}
          className="absolute top-4 right-4 text-teal-700 text-2xl font-bold"
          data-cy="close-signup-modal"
        >
          &times;
        </button>
        {showingTerms ? (
          <div data-cy="terms-modal">
            <TermsAndConditions
              onHandleAccept={handleAcceptTerms}
              onHandleCancel={() => setShowingTerms(false)}
            />
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-semibold text-center text-teal-700 mb-2">
              Create Account
            </h2>

            <form className="space-y-3" onSubmit={handleSubmit}>
              {errors.general && (
                <div
                  className="text-red-500 text-center mb-2"
                  data-cy="general-error"
                >
                  {errors.general}
                </div>
              )}
              <div>
                <label className="block text-teal-700 font-medium mb-1">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={signUpForm.username}
                  onChange={handleChange}
                  placeholder="Enter username"
                  className="w-full border border-gray-400 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-teal-300"
                  data-cy="username-input"
                />
                {errors.username && (
                  <p className="text-red-500 text-sm" data-cy="username-error">
                    {errors.username}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-teal-700 font-medium mb-1">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  value={signUpForm.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  className="w-full border border-gray-400 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-teal-300"
                  data-cy="email-input"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm" data-cy="email-error">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-teal-700 font-medium mb-1">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={signUpForm.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="w-full border border-gray-400 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-teal-300"
                  data-cy="password-input"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm" data-cy="password-error">
                    {errors.password}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-teal-700 font-medium mb-1">
                  Confirm Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={signUpForm.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  className="w-full border border-gray-400 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-teal-300"
                  data-cy="confirm-password-input"
                />
                {errors.confirmPassword && (
                  <p
                    className="text-red-500 text-sm"
                    data-cy="confirm-password-error"
                  >
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <div>
                <div className="gap-4 flex">
                  <input
                    type="checkbox"
                    name="acceptedTerms"
                    checked={signUpForm.acceptedTerms}
                    onChange={handleChange}
                    className="h-4 w-4 text-teal-600 border-gray-300 rounded max-w-6"
                    data-cy="terms-checkbox"
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium text-gray-700"
                  >
                    I agree to the{" "}
                    <button
                      type="button"
                      onClick={() => setShowingTerms(true)}
                      className="text-teal-700 font-semibold hover:underline"
                      data-cy="terms-link"
                    >
                      Terms and Services
                    </button>
                  </label>
                </div>

                {errors.acceptedTerms && (
                  <p className="text-red-500 text-sm" data-cy="terms-error">
                    {errors.acceptedTerms}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading || signUpLoading}
                className="w-full bg-teal-700 hover:bg-teal-800 text-white font-medium py-2 rounded-xl transition flex items-center justify-center"
                data-cy="signup-submit-btn"
              >
                {isLoading || signUpLoading ? (
                  <>
                    <Loader2
                      className="mr-2 h-4 w-4 animate-spin"
                      data-cy="loading-spinner"
                    />
                    Creating Account...
                  </>
                ) : (
                  "Sign Up"
                )}
              </button>
            </form>

            <hr className="my-4" />
            <div className="text-center text-sm text-teal-700">
              Already have an account?{" "}
              <button
                onClick={contextOpenLogInModal}
                className="font-semibold hover:underline"
                data-cy="login-link"
              >
                Log In
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserSignUpModal;
