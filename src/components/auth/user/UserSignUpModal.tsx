"use client";

import { useState, useEffect } from "react";
import { useModal } from "@/components/contexts/ModalContext";
import { Loader2 } from "lucide-react";

interface UserSignUpModalProps {
  show: boolean;
  isLoading: boolean;

  // Props for Storybook/testing
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  showPassword?: boolean;
}

interface SignUpErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

const UserSignUpModal = ({
  show,
  isLoading,
  username = "",
  email = "",
  password = "",
  confirmPassword = "",
  showPassword = false,
}: UserSignUpModalProps) => {
  const {
    showSignUpModal,
    signUpLoading,
    signUpForm,
    setSignUpForm,
    handleSignUp: contextSignUp,
    closeSignUpModal,
    openLogInModal: contextOpenLogInModal,
  } = useModal(); // Use ModalContext

  const [errors, setErrors] = useState<SignUpErrors>({});

  useEffect(() => {
    setSignUpForm({
      username,
      email,
      password,
      confirmPassword,
      showPassword,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      signUpForm.username === "" &&
      signUpForm.email === "" &&
      signUpForm.password === "" &&
      signUpForm.confirmPassword === "" &&
      signUpForm.showPassword === false &&
      !show
    ) {
      setErrors({});
    }
  }, [signUpForm, show]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = (): SignUpErrors => {
    const newErrors: SignUpErrors = {};
    if (!signUpForm.username.trim())
      newErrors.username = "Username is required.";
    if (!signUpForm.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(signUpForm.email))
      newErrors.email = "Email is invalid.";
    if (!signUpForm.password) newErrors.password = "Password is required.";
    if (!signUpForm.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password.";
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

  if (!showSignUpModal && !show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-3xl shadow-lg p-8 max-w-md w-full relative border border-gray-200">
        <button
          onClick={closeSignUpModal}
          className="absolute top-4 right-4 text-teal-700 text-2xl font-bold"
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold text-center text-teal-700 mb-6">
          Create Account
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {errors.general && (
            <div className="text-red-500 text-center mb-2">
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
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username}</p>
            )}
          </div>

          <div>
            <label className="block text-teal-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={signUpForm.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full border border-gray-400 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-teal-300"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-teal-700 font-medium mb-1">
              Password
            </label>
            <input
              type={signUpForm.showPassword ? "text" : "password"}
              name="password"
              value={signUpForm.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full border border-gray-400 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-teal-300"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          <div>
            <label className="block text-teal-700 font-medium mb-1">
              Confirm Password
            </label>
            <input
              type={signUpForm.showPassword ? "text" : "password"}
              name="confirmPassword"
              value={signUpForm.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              className="w-full border border-gray-400 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-teal-300"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || signUpLoading}
            className="w-full bg-teal-700 hover:bg-teal-800 text-white font-medium py-2 rounded-xl transition flex items-center justify-center"
          >
            {isLoading || signUpLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSignUpModal;
