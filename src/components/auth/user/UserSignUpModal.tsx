"use client";
import { useState } from "react";
import { UserData } from "@/types/users.type";
import { SignUpResult } from "@/types/auth.type";

interface UserSignupModalProps {
  show: boolean;
  isLoading: boolean;
  onClose: () => void;
  onOpenLogIn: () => void;
  onSignUp:
    | (({ username, email, password }: UserData) => Promise<SignUpResult>)
    | (() => void);
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
  passwordNotEqual?: string;
}

const UserSignUpModal = ({
  show,
  onClose,
  onOpenLogIn,
  onSignUp,
  isLoading,
  username,
  email,
  password,
  confirmPassword,
  showPassword,
}: UserSignupModalProps) => {
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newConfirmPassword, setNewConfirmPassword] = useState("");

  const [errors, setErrors] = useState<SignUpErrors>({});

  const handleOnSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSignUp) {
      const newErrors = validate();
      setErrors(newErrors);
      if (Object.keys(newErrors).length === 0) {
        const result = await onSignUp({
          username: newUsername,
          email: newEmail,
          password: newPassword,
        });
        if (result!.error) {
          setErrors({ email: result!.error });
        }
      }
    }
  };

  const validate = (): SignUpErrors => {
    const errors: SignUpErrors = {};
    if (!newUsername.trim()) errors.username = "Username is required";
    if (!newEmail.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(newEmail)) errors.email = "Email is invalid";
    if (!newPassword.trim()) errors.password = "Password is required";
    if (!newConfirmPassword.trim())
      errors.confirmPassword = "Please confirm your password.";
    if (newPassword && newConfirmPassword) {
      if (newPassword !== newConfirmPassword)
        errors.passwordNotEqual = "Your passwords do not match.";
      else if (newPassword.length < 6)
        errors.passwordNotEqual = "Password should be 6 or more characters.";
    }
    return errors;
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-3xl shadow-lg p-8 max-w-md w-full relative border border-gray-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-teal-700 text-2xl font-bold"
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold text-center text-teal-700 mb-6">
          Create Account
        </h2>
        <form className="space-y-4" onSubmit={handleOnSignUp}>
          <div>
            <label className="block text-teal-700 font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              className="w-full border border-gray-400 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-teal-300"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setNewUsername(e.target.value.trim())}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>
          <div>
            <label className="block text-teal-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full border border-gray-400 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-teal-300"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setNewEmail(e.target.value.trim())}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <label className="block text-teal-700 font-medium mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full border border-gray-400 rounded-md px-4 py-2 pr-10 outline-none focus:ring-2 focus:ring-teal-300"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
              {/* <button
                type="button"
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button> */}
            </div>
          </div>
          <div>
            <label className="block text-teal-700 font-medium mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full border border-gray-400 rounded-md px-4 py-2 pr-10 outline-none focus:ring-2 focus:ring-teal-300"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setNewConfirmPassword(e.target.value)}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
              {errors.passwordNotEqual && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.passwordNotEqual}
                </p>
              )}
              {/* <button
                type="button"
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button> */}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="terms" className="w-4 h-4" />
            <label htmlFor="terms" className="text-teal-700 text-sm">
              Accept{" "}
              <a href="#" className="text-teal-500 underline">
                Terms and Conditions
              </a>
            </label>
          </div>
          {isLoading ? (
            <div className="flex w-full bg-teal-700 hover:bg-teal-800 text-white font-medium py-2 rounded-xl transition justify-center items-center">
              Signing Up...
            </div>
          ) : (
            <button
              type="submit"
              className="w-full bg-teal-700 hover:bg-teal-800 text-white font-medium py-2 rounded-xl transition"
            >
              Create Account
            </button>
          )}
        </form>
        <hr className="my-4" />
        <div className="text-center text-sm text-teal-700">
          Already have an account?{" "}
          <button
            onClick={onOpenLogIn}
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
